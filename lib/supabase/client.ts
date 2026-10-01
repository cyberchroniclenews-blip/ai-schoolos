"use client";

import { env, isSupabaseConfigured } from "@/lib/env";

export class SupabaseConfigurationError extends Error {}

function requireConfig() {
  if (!isSupabaseConfigured || !env.supabaseUrl || !env.supabaseAnonKey) {
    throw new SupabaseConfigurationError("Supabase is not configured for this environment.");
  }
  return { url: env.supabaseUrl, anonKey: env.supabaseAnonKey };
}

/** Browser-safe Auth boundary. It never receives service-role credentials. */
export const supabaseBrowser = {
  async signInWithPassword(email: string, password: string) {
    const { url, anonKey } = requireConfig();
    const response = await fetch(`${url}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: { apikey: anonKey, "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error("Unable to sign in with those credentials.");
    return response.json() as Promise<{ access_token: string; refresh_token: string }>;
  },
};
