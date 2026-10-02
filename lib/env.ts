/** Browser-safe configuration only. Server secrets stay unexported. */
export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabasePublishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
} as const;

export const isSupabaseConfigured = Boolean(env.supabaseUrl && env.supabasePublishableKey);
