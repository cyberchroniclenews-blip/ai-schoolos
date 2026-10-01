import "server-only";

import { supabaseServerConfig } from "@/lib/supabase/config";

/**
 * Deliberately server-only escape hatch for provisioning/administration jobs.
 * Do not import this from routes or components serving end users; RLS is bypassed.
 */
export function getSupabaseAdminHeaders() {
  const key = supabaseServerConfig.serviceRoleKey;
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY is required for server-side administration.");
  return { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
}
