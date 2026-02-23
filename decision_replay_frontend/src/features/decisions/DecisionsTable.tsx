"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { api } from "@/lib/api/client";
import { useAuth } from "@/components/providers/AuthProvider";

type Row = { id: string; title: string; createdAt: string; status: string };

export function DecisionsTable() {
  const router = useRouter();
  const { token, loading: authLoading } = useAuth();

  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    // Don't call protected endpoints until we know auth state.
    if (authLoading) return;

    // If we have no token, the AuthGate will redirect; avoid calling /decisions.
    if (!token) {
      setLoading(false);
      return;
    }

    setError(null);
    setLoading(true);

    api
      .listDecisions()
      .then((r) => {
        if (!mounted) return;

        // Backend uses snake_case; map into the table row shape.
        setRows(
          r.map((d) => ({
            id: d.id,
            title: d.title,
            status: d.status,
            createdAt:
              d.created_at ?? d.decision_date ?? new Date().toISOString(),
          }))
        );
      })
      .catch((e) => {
        const message = e instanceof Error ? e.message : "Unable to load decisions.";
        // Gracefully handle 401s even if routing/guarding changes in the future.
        if (typeof message === "string" && message.includes("API error 401")) {
          router.replace(`/login?next=${encodeURIComponent("/app/decisions")}`);
          return;
        }
        if (mounted) setError(message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [authLoading, token, router]);

  const columns = useMemo<ColumnDef<Row>[]>(
    () => [
      {
        header: "Title",
        accessorKey: "title",
        cell: (ctx) => (
          <Link
            className="text-sm font-medium text-blue-700 hover:text-blue-800"
            href={`/app/decisions/${ctx.row.original.id}`}
          >
            {String(ctx.getValue())}
          </Link>
        ),
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (ctx) => (
          <span className="rounded-xl bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
            {String(ctx.getValue())}
          </span>
        ),
      },
      {
        header: "Created",
        accessorKey: "createdAt",
        cell: (ctx) => (
          <span className="text-sm text-gray-600">
            {new Date(String(ctx.getValue())).toLocaleDateString()}
          </span>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return <div className="text-sm text-gray-600">Loading decisions…</div>;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--border)] p-6 text-sm text-gray-600">
        No decisions yet. Create your first decision to start tracking outcomes.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h) => (
                <th
                  key={h.id}
                  className="px-3 text-left text-xs font-semibold text-gray-600"
                >
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((r) => (
            <tr
              key={r.id}
              className="rounded-2xl border border-[var(--border)] bg-white"
            >
              {r.getVisibleCells().map((c) => (
                <td key={c.id} className="px-3 py-3 align-middle">
                  {flexRender(c.column.columnDef.cell, c.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
