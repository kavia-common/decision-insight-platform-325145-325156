"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api/client";
import { DecisionForm } from "@/features/decisions/DecisionForm";

export function DecisionDetail({ decisionId }: { decisionId: string }) {
  const [decision, setDecision] = useState<{
    id: string;
    title: string;
    context: string;
    expectedOutcome: string;
    createdAt: string;
    status: string;
  } | null>(null);

  useEffect(() => {
    let mounted = true;
    api.getDecision(decisionId).then((d) => {
      if (mounted) setDecision(d);
    });
    return () => {
      mounted = false;
    };
  }, [decisionId]);

  if (!decision) {
    return <div className="text-sm text-gray-600">Loading decision…</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="card">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Decision ID</div>
              <div className="text-sm font-medium text-gray-900">{decision.id}</div>
            </div>
            <div className="rounded-xl bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
              {decision.status}
            </div>
          </div>

          <div className="mt-4">
            <DecisionForm
              mode="edit"
              decisionId={decision.id}
              onSaved={() => {
                api.getDecision(decisionId).then(setDecision);
              }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="card">
          <div className="card-body">
            <h3 className="text-sm font-semibold text-gray-900">Outcomes</h3>
            <p className="mt-1 text-sm text-gray-600">
              Track outcome events over time (e.g., 1 week, 1 month, 6 months).
            </p>
            <div className="mt-4 rounded-2xl border border-dashed border-[var(--border)] p-4 text-sm text-gray-600">
              Outcomes CRUD UI will be wired once backend endpoints are implemented.
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 className="text-sm font-semibold text-gray-900">Bias & quality signals</h3>
            <p className="mt-1 text-sm text-gray-600">
              Detect bias patterns and compute a decision-quality score.
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3">
              <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
                <div className="text-xs font-semibold text-gray-600">Quality score (stub)</div>
                <div className="mt-1 text-2xl font-semibold text-gray-900">7.6</div>
                <div className="mt-1 text-sm text-gray-600">
                  Strong clarity; add explicit success metrics for even better calibration.
                </div>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
                <div className="text-xs font-semibold text-gray-600">Bias flags (stub)</div>
                <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
                  <li>Optimism bias: confidence outweighs evidence.</li>
                  <li>Availability heuristic: recent experience dominates weighting.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
