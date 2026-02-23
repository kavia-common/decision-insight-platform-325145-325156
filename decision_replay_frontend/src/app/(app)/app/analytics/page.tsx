import { PageHeader } from "@/components/ui/PageHeader";
import { AnalyticsDashboard } from "@/features/analytics/AnalyticsDashboard";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        subtitle="Trends in decisions, outcomes, quality scores, and bias signals."
      />
      <AnalyticsDashboard />
    </div>
  );
}
