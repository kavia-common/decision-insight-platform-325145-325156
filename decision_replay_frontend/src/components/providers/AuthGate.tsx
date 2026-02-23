"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";

/**
 * PUBLIC_INTERFACE
 * AuthGate protects app routes that require authentication.
 *
 * Behavior:
 * - While auth is bootstrapping (loading=true), renders a lightweight loading state.
 * - If unauthenticated, redirects to /login with a `next` parameter so the user can
 *   return to their original destination after signing in.
 * - If authenticated, renders children.
 */
export function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { token, loading } = useAuth();

  useEffect(() => {
    // Wait until AuthProvider has checked localStorage and (optionally) /auth/me.
    if (loading) return;

    // No Bearer token means we should not allow navigation into protected pages.
    if (!token) {
      const next = encodeURIComponent(pathname || "/app/dashboard");
      router.replace(`/login?next=${next}`);
    }
  }, [loading, token, router, pathname]);

  if (loading) {
    return <div className="text-sm text-gray-600">Loading…</div>;
  }

  // While redirecting, render nothing to avoid flashing protected UI.
  if (!token) return null;

  return <>{children}</>;
}
