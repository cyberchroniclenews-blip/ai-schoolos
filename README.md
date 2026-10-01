# AI SchoolOS

Phase 2 establishes Supabase authentication, least-privilege RBAC, and database-enforced school tenant isolation. Business modules are intentionally not included.

## Local setup

1. Copy `.env.example` to `.env.local` and fill in your Supabase project URL and **anon** key.
2. Install dependencies with `npm install`, then run `npm run dev`.
3. Authenticate using an email/password user created in Supabase Auth. The app stores access and refresh tokens in secure, HTTP-only cookies.
4. Apply the schema migration with the Supabase CLI:
   ```bash
   supabase link --project-ref <project-ref>
   supabase db push
   ```
   Or run `supabase/migrations/20261001000000_auth_rbac_multitenancy.sql` in the Supabase SQL editor.

## Required Supabase configuration

- Enable Email/Password sign-in in **Authentication → Providers**.
- Add local and production redirect URLs in **Authentication → URL Configuration** before enabling email confirmation or OAuth.
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are browser-safe. The anon key is constrained by RLS.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only and is not needed by the web request path. Keep it out of `.env.example` values, source control, client bundles, and `NEXT_PUBLIC_*` variables.

## Authentication and authorization

`app/login/actions.ts` exchanges credentials with Supabase Auth and writes only HTTP-only, same-site session cookies. Server pages call `requireUser`; client state comes from `/api/auth/session` and exposes loading/error/authenticated states. The shell offers server-action logout.

Roles are `super_admin`, `school_admin` (Principal), `teacher`, `parent`, and `student`. Roles map to granular `resource:action` permissions through `role_permissions`. Add permissions and assignments through a trusted server-side provisioning workflow; do not grant them from a browser client.

## Multi-tenancy and RLS

School-specific memberships carry a `school_id`; global Super Admin memberships are the sole exception. The migration enables RLS on all foundation tables and provides `has_school_role(school_id, roles)` and `has_school_permission(school_id, permission)` helpers. Every future school-owned table **must** include a non-null `school_id`, enable RLS, and use these helpers for select/insert/update/delete policies (a policy template is included in the migration). This database boundary—not hidden navigation—is what prevents School A from reading School B data.

## Validation

```bash
npm run lint
npm run typecheck
npm run build
```
