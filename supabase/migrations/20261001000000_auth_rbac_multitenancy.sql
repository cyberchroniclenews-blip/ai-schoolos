-- AI SchoolOS security foundation. Apply with `supabase db push`.
create extension if not exists "pgcrypto";

create table public.schools (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 160),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text, avatar_url text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.roles (
  id uuid primary key default gen_random_uuid(),
  key text not null unique check (key in ('super_admin','school_admin','teacher','parent','student')),
  name text not null, description text, is_global_role boolean not null default false
);
create table public.permissions (
  id uuid primary key default gen_random_uuid(),
  key text not null unique check (key ~ '^[a-z0-9_]+:[a-z0-9_]+$'), description text
);
create table public.role_permissions (
  role_id uuid not null references public.roles(id) on delete cascade,
  permission_id uuid not null references public.permissions(id) on delete cascade,
  primary key (role_id, permission_id)
);
create table public.school_memberships (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references public.schools(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role_id uuid not null references public.roles(id) on delete restrict,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique nulls not distinct (school_id, user_id, role_id)
);
create or replace function public.enforce_membership_tenant() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.school_id is null and not exists (select 1 from public.roles where id = new.role_id and is_global_role) then
    raise exception 'Only global roles can have a null school_id';
  end if;
  return new;
end; $$;
create trigger enforce_membership_tenant before insert or update on public.school_memberships for each row execute procedure public.enforce_membership_tenant();
create index school_memberships_school_user_idx on public.school_memberships (school_id, user_id);
create index school_memberships_user_idx on public.school_memberships (user_id);

insert into public.roles (key, name, description, is_global_role) values
 ('super_admin','Super Admin','Platform-wide administrator', true), ('school_admin','Principal / School Admin','School administrator', false),
 ('teacher','Teacher','Teaching staff', false), ('parent','Parent','Parent or guardian', false), ('student','Student','Student account', false)
on conflict (key) do nothing;

-- New users receive a profile automatically; memberships are provisioned only by trusted server jobs.
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin insert into public.profiles (id, full_name, avatar_url) values (new.id, new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'avatar_url') on conflict (id) do nothing; return new; end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create or replace function public.is_super_admin() returns boolean language sql stable security definer set search_path = public as $$
 select exists (select 1 from public.school_memberships m join public.roles r on r.id=m.role_id where m.user_id=auth.uid() and m.school_id is null and r.key='super_admin'); $$;
create or replace function public.has_school_role(target_school_id uuid, allowed_roles text[]) returns boolean language sql stable security definer set search_path = public as $$
 select public.is_super_admin() or exists (select 1 from public.school_memberships m join public.roles r on r.id=m.role_id where m.user_id=auth.uid() and m.school_id=target_school_id and r.key = any(allowed_roles)); $$;
create or replace function public.has_school_permission(target_school_id uuid, requested_permission text) returns boolean language sql stable security definer set search_path = public as $$
 select public.is_super_admin() or exists (select 1 from public.school_memberships m join public.role_permissions rp on rp.role_id=m.role_id join public.permissions p on p.id=rp.permission_id where m.user_id=auth.uid() and m.school_id=target_school_id and p.key=requested_permission); $$;

alter table public.schools enable row level security;
alter table public.profiles enable row level security;
alter table public.roles enable row level security;
alter table public.permissions enable row level security;
alter table public.role_permissions enable row level security;
alter table public.school_memberships enable row level security;

create policy "members can read their school" on public.schools for select using (public.has_school_role(id, array['school_admin','teacher','parent','student']));
create policy "super admins manage schools" on public.schools for all using (public.is_super_admin()) with check (public.is_super_admin());
create policy "users read own profile" on public.profiles for select using (id = auth.uid() or public.is_super_admin());
create policy "users update own profile" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy "authenticated users read role catalog" on public.roles for select using (auth.role() = 'authenticated');
create policy "authenticated users read permissions" on public.permissions for select using (auth.role() = 'authenticated');
create policy "authenticated users read role permissions" on public.role_permissions for select using (auth.role() = 'authenticated');
create policy "users read own memberships" on public.school_memberships for select using (user_id = auth.uid() or public.is_super_admin());
create policy "school admins read school memberships" on public.school_memberships for select using (public.has_school_role(school_id, array['school_admin']));
create policy "super admins manage memberships" on public.school_memberships for all using (public.is_super_admin()) with check (public.is_super_admin());

-- Template for every future school-owned table:
-- alter table public.example enable row level security;
-- create policy "tenant read" on public.example for select using (public.has_school_permission(school_id, 'example:read'));
-- create policy "tenant write" on public.example for insert with check (public.has_school_permission(school_id, 'example:write'));
-- create policy "tenant update" on public.example for update using (public.has_school_permission(school_id, 'example:write')) with check (public.has_school_permission(school_id, 'example:write'));
