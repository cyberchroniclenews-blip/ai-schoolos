"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { env, isSupabaseConfigured } from "@/lib/env";

export class SupabaseConfigurationError extends Error {}

let browserClient: SupabaseClient | undefined;

/**
 * Returns the browser Auth client. The publishable key is safe in the browser;
 * access to data remains constrained by the user's JWT and database RLS.
 */
export function createSupabaseBrowserClient(): SupabaseClient {
  if (!isSupabaseConfigured || !env.supabaseUrl || !env.supabasePublishableKey) {
    throw new SupabaseConfigurationError("Supabase is not configured for this environment.");
  }

  browserClient ??= createBrowserClient(env.supabaseUrl, env.supabasePublishableKey);
  return browserClient;
}
