"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { api } from "@/lib/api/client";

type Row = { id: string; title: string; createdAt: string; status: string };

export function DecisionsTable() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api
      .listDecisions()
      .then((r) => {
        if (mounted) setRows(r);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

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

  const table = useReactTable({ data: rows, columns, getCoreRowModel: getCoreRowModel() });

  if (loading) {
    return <div className="text-sm text-gray-600">Loading decisions…</div>;
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
                <th key={h.id} className="px-3 text-left text-xs font-semibold text-gray-600">
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((r) => (
            <tr key={r.id} className="rounded-2xl border border-[var(--border)] bg-white">
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
