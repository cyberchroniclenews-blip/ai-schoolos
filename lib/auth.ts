import "server-only";

import { redirect } from "next/navigation";
import { assertSupabaseServerConfig } from "@/lib/supabase/config";
import { getAccessToken, getAuthenticatedUser } from "@/lib/supabase/server";
import type { CoreRole } from "@/types/auth";

export async function requireUser() {
  const user = await getAuthenticatedUser();
  if (!user) redirect("/login");
  return user;
}

async function authorizeRpc(functionName: "has_school_role" | "has_school_permission", body: Record<string, unknown>) {
  const token = await getAccessToken();
  if (!token) return false;
  const { url, anonKey } = assertSupabaseServerConfig();
  const response = await fetch(`${url}/rest/v1/rpc/${functionName}`, {
    method: "POST",
    headers: { apikey: anonKey, Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body), cache: "no-store",
  });
  return response.ok && (await response.json()) === true;
}

/** Enforces a tenant-specific role on the server before a route/action proceeds. */
export async function requireRole(schoolId: string, roles: readonly CoreRole[]) {
  await requireUser();
  if (!(await authorizeRpc("has_school_role", { target_school_id: schoolId, allowed_roles: roles }))) redirect("/unauthorized");
}

/** Enforces a tenant permission on the server; RLS independently enforces the same boundary for data. */
export async function requirePermission(schoolId: string, permission: string) {
  await requireUser();
  if (!(await authorizeRpc("has_school_permission", { target_school_id: schoolId, requested_permission: permission }))) redirect("/unauthorized");
}
