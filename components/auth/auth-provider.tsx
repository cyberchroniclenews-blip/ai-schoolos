"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AuthContext } from "@/types/auth";

const AuthContextValue = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthContext>({ user: null, profile: null, memberships: [], activeMembership: null, isLoading: true, error: null });
  useEffect(() => {
    let active = true;
    fetch("/api/auth/session", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to restore your session.");
        return response.json() as Promise<Omit<AuthContext, "isLoading" | "error">>;
      })
      .then((data) => active && setState({ ...data, isLoading: false, error: null }))
      .catch(() => active && setState((current) => ({ ...current, isLoading: false, error: "Unable to restore your session." })));
    return () => { active = false; };
  }, []);
  return <AuthContextValue.Provider value={state}>{children}</AuthContextValue.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContextValue);
  if (!context) throw new Error("useAuth must be used within AuthProvider.");
  return context;
}
