import { AppShell } from "@/components/shell/AppShell";
import { AuthGate } from "@/components/providers/AuthGate";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <AppShell>{children}</AppShell>
    </AuthGate>
  );
}
