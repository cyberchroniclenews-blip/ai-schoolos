import "server-only";

import { createClient } from "@supabase/supabase-js";
import { supabaseServerConfig } from "@/lib/supabase/config";

/**
 * Deliberately server-only escape hatch for provisioning/administration jobs.
 * Never import this into user request paths because it bypasses RLS.
 */
export function createSupabaseAdminClient() {
  const { url, serviceRoleKey } = supabaseServerConfig;
  if (!url || !serviceRoleKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is required for server-side administration.");
  return createClient(url, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
}
