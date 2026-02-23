import { PageHeader } from "@/components/ui/PageHeader";
import { DecisionDetail } from "@/features/decisions/DecisionDetail";

/**
 * PUBLIC_INTERFACE
 * generateStaticParams is required for Next.js static export when using dynamic routes.
 * For now, we return a small stub set so `next export` can build. Replace with real
 * decision IDs once backend provides a build-time accessible listing endpoint.
 */
export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  return [{ id: "stub-1" }, { id: "stub-2" }, { id: "stub-3" }];
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DecisionDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Decision"
        subtitle="Review context, track outcomes, and inspect bias/quality signals."
      />
      <DecisionDetail decisionId={id} />
    </div>
  );
}
