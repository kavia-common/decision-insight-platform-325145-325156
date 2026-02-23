"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, Brain, LayoutDashboard, LogOut, Search, Settings, SquarePen } from "lucide-react";
import { clsx } from "clsx";
import { useAuth } from "@/components/providers/AuthProvider";

const nav = [
  { href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/decisions", label: "Decisions", icon: SquarePen },
  { href: "/app/similarity", label: "Similarity", icon: Search },
  { href: "/app/insights", label: "Insights", icon: Brain },
  { href: "/app/analytics", label: "Analytics", icon: BarChart3 },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  return (
    <div className="app-shell">
      <aside className="hidden lg:flex flex-col border-r border-[var(--border)] bg-white">
        <div className="px-5 py-4">
          <Link href="/app/dashboard" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500" />
            <div>
              <div className="text-sm font-semibold text-gray-900">Decision Replay</div>
              <div className="text-xs text-gray-500">Decision intelligence</div>
            </div>
          </Link>
        </div>

        <nav className="px-3 py-2 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm",
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon size={18} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto p-3">
          <div className="rounded-2xl border border-[var(--border)] bg-white p-3">
            <div className="text-xs text-gray-500">Signed in as</div>
            <div className="mt-1 text-sm font-medium text-gray-900">
              {user?.name ?? user?.email ?? "Guest"}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
                onClick={() => router.push("/app/settings")}
                type="button"
              >
                <Settings size={16} />
                Settings
              </button>
              <button
                className="flex items-center justify-center rounded-xl bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-black"
                onClick={() => {
                  signOut();
                  router.push("/login");
                }}
                type="button"
                aria-label="Sign out"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <Link
                href="/app/decisions/new"
                className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                New decision
              </Link>
              <span className="hidden sm:inline text-xs text-gray-500">
                Tip: use <span className="kbd">/</span> to search (coming soon)
              </span>
            </div>
            <div className="text-sm text-gray-600">
              {user ? `Hi, ${user.name ?? user.email}` : "Guest mode"}
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl min-w-0 px-4 py-6">{children}</main>
      </div>
    </div>
  );
}
