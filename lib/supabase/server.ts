import "server-only";

import { cookies } from "next/headers";
import { assertSupabaseServerConfig } from "@/lib/supabase/config";
import type { AuthUser } from "@/types/auth";

export const ACCESS_TOKEN_COOKIE = "ai-schoolos-access-token";
export const REFRESH_TOKEN_COOKIE = "ai-schoolos-refresh-token";

export async function getAccessToken() {
  return (await cookies()).get(ACCESS_TOKEN_COOKIE)?.value;
}

/** Validates the current bearer token with Supabase Auth instead of trusting cookie contents. */
export async function getAuthenticatedUser(): Promise<AuthUser | null> {
  const token = await getAccessToken();
  if (!token) return null;
  const { url, anonKey } = assertSupabaseServerConfig();
  const response = await fetch(`${url}/auth/v1/user`, {
    headers: { apikey: anonKey, Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) return null;
  const user = (await response.json()) as { id: string; email?: string | null };
  return { id: user.id, email: user.email ?? null };
}

export async function getServerAuthContext() {
  const user = await getAuthenticatedUser();
  return { user, isLoading: false, error: null };
}
