"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api/client";

type User = {
  id: string;
  email: string;
  name?: string;
};

type SignInInput = { email: string; password: string };
type SignUpInput = { email: string; password: string; name: string };

type AuthContextValue = {
  user: User | null;
  token: string | null;
  loading: boolean;
  signIn: (input: SignInInput) => Promise<void>;
  signUp: (input: SignUpInput) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "dr.auth.token";

/**
 * PUBLIC_INTERFACE
 * useAuth exposes auth state and actions (signIn/signUp/signOut).
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const existing = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      setToken(existing);

      if (existing) {
        try {
          const me = await api.me();
          setUser({
            id: me.id,
            email: me.email,
            name: me.displayName ?? me.username ?? undefined,
          });
        } catch {
          // Token invalid or backend unreachable; clear token.
          localStorage.removeItem(STORAGE_KEY);
          setToken(null);
          setUser(null);
        }
      }

      setLoading(false);
    };

    bootstrap();
  }, []);

  async function signIn(input: SignInInput) {
    const res = await api.signIn(input);
    localStorage.setItem(STORAGE_KEY, res.token);
    setToken(res.token);
    setUser(res.user);
  }

  async function signUp(input: SignUpInput) {
    const res = await api.signUp(input);
    localStorage.setItem(STORAGE_KEY, res.token);
    setToken(res.token);
    setUser(res.user);
  }

  function signOut() {
    // Best-effort revoke on backend (if a wrapper exists). API client will include Authorization automatically.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const maybeApi: any = api as any;
    if (typeof maybeApi.logout === "function") {
      maybeApi.logout().catch(() => {});
    }

    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setUser(null);
  }

  const value = useMemo<AuthContextValue>(
    () => ({ user, token, loading, signIn, signUp, signOut }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
