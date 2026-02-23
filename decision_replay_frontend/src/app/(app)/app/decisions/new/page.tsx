"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { DecisionForm } from "@/features/decisions/DecisionForm";

export default function NewDecisionPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <PageHeader
        title="New decision"
        subtitle="Capture the decision, context, and what success looks like."
      />

      <div className="card">
        <div className="card-body">
          <DecisionForm
            mode="create"
            onSaved={(id) => router.push(`/app/decisions/${id}`)}
          />
        </div>
      </div>
    </div>
  );
}
