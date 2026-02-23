export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500" />
            <span className="text-lg font-semibold text-gray-900">
              Decision Replay
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Log decisions, track outcomes, and learn from patterns.
          </p>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">{children}</div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Built for privacy-first decision intelligence.
        </p>
      </div>
    </div>
  );
}
