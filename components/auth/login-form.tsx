"use client";

import { useActionState } from "react";
import { login, type LoginResult } from "@/app/login/actions";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState: LoginResult = {};
export function LoginForm() {
  const [state, action, pending] = useActionState(login, initialState);
  return <form action={action} className="space-y-5" noValidate>
    {state.error && <Alert variant="error">{state.error}</Alert>}
    <label className="block text-sm font-medium text-ink" htmlFor="email">Email<Input className="mt-2" id="email" name="email" type="email" autoComplete="email" required /></label>
    <label className="block text-sm font-medium text-ink" htmlFor="password">Password<Input className="mt-2" id="password" name="password" type="password" autoComplete="current-password" required /></label>
    <Button className="w-full" type="submit" disabled={pending}>{pending ? "Signing in…" : "Sign in"}</Button>
  </form>;
}
