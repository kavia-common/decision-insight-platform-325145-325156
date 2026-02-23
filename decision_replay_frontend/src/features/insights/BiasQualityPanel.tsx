export function BiasQualityPanel() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <div className="card xl:col-span-2">
        <div className="card-body">
          <h2 className="text-sm font-semibold text-gray-900">Bias patterns</h2>
          <p className="mt-1 text-sm text-gray-600">
            Aggregated bias patterns will appear here once the backend analyzer is implemented.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
              <div className="text-xs font-semibold text-gray-600">Most common bias</div>
              <div className="mt-1 text-base font-semibold text-gray-900">Confirmation bias</div>
              <div className="mt-1 text-sm text-gray-600">
                You tend to overweight supporting evidence; add a “disconfirming evidence” section.
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
              <div className="text-xs font-semibold text-gray-600">High-impact category</div>
              <div className="mt-1 text-base font-semibold text-gray-900">Career</div>
              <div className="mt-1 text-sm text-gray-600">
                Most bias flags occur in career decisions; consider pre-mortems.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h2 className="text-sm font-semibold text-gray-900">Quality checklist</h2>
          <p className="mt-1 text-sm text-gray-600">
            A lightweight rubric to improve decision quality consistently.
          </p>

          <div className="mt-4 space-y-2 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" readOnly checked />
              <span>Captured context and constraints</span>
            </div>
            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" readOnly />
              <span>Listed assumptions and confidence levels</span>
            </div>
            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" readOnly />
              <span>Defined measurable success criteria</span>
            </div>
            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" readOnly />
              <span>Added pre-mortem and alternative options</span>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-[var(--border)] bg-blue-50 p-4 text-sm text-blue-800">
            Backend endpoints for bias detection and scoring will populate this with real evaluations.
          </div>
        </div>
      </div>
    </div>
  );
}
