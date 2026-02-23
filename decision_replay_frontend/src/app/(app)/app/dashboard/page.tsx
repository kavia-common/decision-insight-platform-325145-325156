import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatsCard } from "@/components/ui/StatsCard";
import { DecisionsTable } from "@/features/decisions/DecisionsTable";
import { getDashboardSummary } from "@/lib/api/stubs";

export default async function DashboardPage() {
  const summary = await getDashboardSummary();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your decision activity, outcomes, and insight signals."
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/app/decisions/new"
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              New decision
            </Link>
            <Link
              href="/app/similarity"
              className="rounded-xl border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
            >
              Similarity search
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Decisions logged"
          value={summary.decisionsCount.toString()}
          hint="All-time"
        />
        <StatsCard
          title="Outcomes tracked"
          value={summary.outcomesCount.toString()}
          hint="All-time"
        />
        <StatsCard
          title="Avg quality score"
          value={summary.avgQualityScore.toFixed(1)}
          hint="Last 30 days"
        />
        <StatsCard
          title="Bias flags"
          value={summary.biasFlags.toString()}
          hint="Last 30 days"
          tone="warn"
        />
      </div>

      <div className="card">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">
              Recent decisions
            </h2>
            <Link
              href="/app/decisions"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              View all
            </Link>
          </div>

          <div className="mt-4">
            <DecisionsTable />
          </div>
        </div>
      </div>
    </div>
  );
}
