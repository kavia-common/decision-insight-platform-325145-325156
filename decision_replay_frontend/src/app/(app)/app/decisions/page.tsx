import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { DecisionsTable } from "@/features/decisions/DecisionsTable";

export default function DecisionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Decisions"
        subtitle="Log decisions with context, assumptions, and intended outcomes."
        actions={
          <Link
            href="/app/decisions/new"
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            New decision
          </Link>
        }
      />

      <div className="card">
        <div className="card-body">
          <DecisionsTable />
        </div>
      </div>
    </div>
  );
}
