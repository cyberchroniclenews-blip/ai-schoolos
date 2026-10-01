"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { assertSupabaseServerConfig } from "@/lib/supabase/config";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/supabase/server";

export type LoginResult = { error?: string };

export async function login(_: LoginResult, formData: FormData): Promise<LoginResult> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email address and password." };
  try {
    const { url, anonKey } = assertSupabaseServerConfig();
    const response = await fetch(`${url}/auth/v1/token?grant_type=password`, {
      method: "POST", headers: { apikey: anonKey, "Content-Type": "application/json" }, body: JSON.stringify({ email, password }), cache: "no-store",
    });
    if (!response.ok) return { error: "Invalid email or password." };
    const session = (await response.json()) as { access_token: string; refresh_token: string; expires_in: number };
    const cookieStore = await cookies();
    const options = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/", maxAge: session.expires_in };
    cookieStore.set(ACCESS_TOKEN_COOKIE, session.access_token, options);
    cookieStore.set(REFRESH_TOKEN_COOKIE, session.refresh_token, { ...options, maxAge: 60 * 60 * 24 * 30 });
  } catch {
    return { error: "Authentication is unavailable. Check the Supabase configuration." };
  }
  redirect("/");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_COOKIE);
  cookieStore.delete(REFRESH_TOKEN_COOKIE);
  redirect("/login");
}
