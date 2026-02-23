"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { api } from "@/lib/api/client";

export default function SimilarityPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<
    Array<{ id: string; title: string; score: number; summary?: string }>
  >([]);
  const [error, setError] = useState<string | null>(null);

  async function runSearch() {
    setError(null);
    setLoading(true);
    try {
      const data = await api.similaritySearch({ query, limit: 8 });
      setResults(data.results);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Search failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Similarity search"
        subtitle="Find past decisions that resemble your current situation."
      />

      <div className="card">
        <div className="card-body">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto] md:items-end">
            <Input
              label="Search query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., 'should I switch roles to a startup?'"
            />
            <Button onClick={runSearch} loading={loading}>
              Search
            </Button>
          </div>

          {error ? (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div className="mt-6 space-y-3">
            {results.map((r) => (
              <div
                key={r.id}
                className="rounded-2xl border border-[var(--border)] bg-white p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {r.title}
                    </div>
                    {r.summary ? (
                      <div className="mt-1 text-sm text-gray-600">
                        {r.summary}
                      </div>
                    ) : null}
                  </div>
                  <div className="rounded-xl bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                    {(r.score * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            ))}
            {results.length === 0 ? (
              <div className="text-sm text-gray-600">
                Run a search to see similar decisions.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
