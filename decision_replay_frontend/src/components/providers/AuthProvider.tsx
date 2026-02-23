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
    const existing = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    setToken(existing);
    // Backend /me not implemented yet; we keep a stub user for demo if token exists.
    if (existing) {
      setUser({ id: "me", email: "user@example.com", name: "You" });
    }
    setLoading(false);
  }, []);

  async function signIn(input: SignInInput) {
    // When backend is ready: call api.signIn and store returned token.
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
