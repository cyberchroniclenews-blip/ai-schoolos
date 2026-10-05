import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { assertSupabaseServerConfig } from "@/lib/supabase/config";

import type {
  AuthUser,
  Membership,
  Profile,
  Role,
  School,
} from "@/types/auth";

export const ACTIVE_SCHOOL_ID_COOKIE = "ai-schoolos-active-school-id";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  const { url, publishableKey } = assertSupabaseServerConfig();

  return createServerClient(url, publishableKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),

      setAll: (cookiesToSet) => {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Server Components cannot always persist refreshed cookies.
          // Middleware will persist them for the next request.
        }
      },
    },
  });
}

export async function getAuthenticatedUser(): Promise<AuthUser | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  return {
    id: user.id,
    email: user.email ?? null,
  };
}

type MembershipRow = {
  id: string;
  school_id: string | null;
  user_id: string;
  role_id: string;
  created_at: string;
  updated_at: string;

  role:
    | {
        id: string;
        key: Role["key"];
        name: string;
        description: string | null;
      }[]
    | null;

  school:
    | {
        id: string;
        name: string;
        slug: string;
        created_at: string;
        updated_at: string;
      }[]
    | null;
};

function toMembership(row: MembershipRow): Membership {
  const roleRow = row.role?.[0] ?? null;
  const schoolRow = row.school?.[0] ?? null;

  if (!roleRow) {
    throw new Error("Membership is missing its role.");
  }

  const role: Role = roleRow;

  const school: School | null = schoolRow
    ? {
        id: schoolRow.id,
        name: schoolRow.name,
        slug: schoolRow.slug,
        createdAt: schoolRow.created_at,
        updatedAt: schoolRow.updated_at,
      }
    : null;

  return {
    id: row.id,
    schoolId: row.school_id,
    userId: row.user_id,
    roleId: row.role_id,
    role,
    school,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getServerAuthContext() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      user: null,
      profile: null,
      memberships: [],
      activeMembership: null,
      isLoading: false,
      error: null,
    };
  }

  const [
    { data: profileRow, error: profileError },
    { data: membershipRows, error: membershipsError },
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, full_name, avatar_url, created_at, updated_at")
      .eq("id", user.id)
      .maybeSingle(),

    supabase
      .from("school_memberships")
      .select(
        "id, school_id, user_id, role_id, created_at, updated_at, role:roles(id, key, name, description), school:schools(id, name, slug, created_at, updated_at)",
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: true }),
  ]);

  if (profileError || membershipsError) {
    throw profileError ?? membershipsError;
  }

  const profile: Profile | null = profileRow
    ? {
        id: profileRow.id,
        fullName: profileRow.full_name,
        email: user.email ?? null,
        avatarUrl: profileRow.avatar_url,
        createdAt: profileRow.created_at,
        updatedAt: profileRow.updated_at,
      }
    : null;

  const memberships = (
    (membershipRows ?? []) as unknown as MembershipRow[]
  ).map(toMembership);

  const requestedSchoolId = (await cookies())
    .get(ACTIVE_SCHOOL_ID_COOKIE)
    ?.value;

  const activeMembership =
    memberships.find(
      (membership) => membership.schoolId === requestedSchoolId,
    ) ??
    memberships.find((membership) => membership.schoolId !== null) ??
    null;

  return {
    user: {
      id: user.id,
      email: user.email ?? null,
    },
    profile,
    memberships,
    activeMembership,
    isLoading: false,
    error: null,
  };
} 