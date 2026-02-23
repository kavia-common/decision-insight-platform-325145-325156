import { PageHeader } from "@/components/ui/PageHeader";
import { BiasQualityPanel } from "@/features/insights/BiasQualityPanel";

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Bias & quality insights"
        subtitle="Spot cognitive bias patterns and strengthen decision quality over time."
      />
      <BiasQualityPanel />
    </div>
  );
}
