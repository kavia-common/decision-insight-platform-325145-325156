import { PageHeader } from "@/components/ui/PageHeader";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Profile, privacy, and integrations." />
      <div className="card">
        <div className="card-body">
          <div className="text-sm text-gray-700">
            Settings UI will be expanded as authentication/roles land in the backend.
          </div>
          <div className="mt-4 rounded-2xl border border-[var(--border)] bg-white p-4 text-sm text-gray-600">
            Environment wiring: API base is read from <code>NEXT_PUBLIC_API_BASE</code>.
          </div>
        </div>
      </div>
    </div>
  );
}
