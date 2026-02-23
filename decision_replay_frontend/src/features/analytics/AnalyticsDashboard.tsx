"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const decisionsTrend = [
  { month: "Sep", decisions: 2, quality: 6.4 },
  { month: "Oct", decisions: 3, quality: 7.1 },
  { month: "Nov", decisions: 4, quality: 7.2 },
  { month: "Dec", decisions: 3, quality: 7.6 },
  { month: "Jan", decisions: 5, quality: 7.4 },
  { month: "Feb", decisions: 6, quality: 7.8 },
];

export function AnalyticsDashboard() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <div className="card xl:col-span-2">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Decisions & quality trend
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Stubbed chart; will reflect real analytics once backend is implemented.
              </p>
            </div>
            <div className="rounded-xl bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
              Last 6 months
            </div>
          </div>

          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={decisionsTrend} margin={{ left: 8, right: 8, top: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="decisionsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="qualityFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(17,24,39,0.08)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} />
                <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid rgba(17,24,39,0.10)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="decisions"
                  stroke="#3b82f6"
                  fill="url(#decisionsFill)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="quality"
                  stroke="#06b6d4"
                  fill="url(#qualityFill)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h2 className="text-sm font-semibold text-gray-900">Key takeaways</h2>
          <div className="mt-3 space-y-3 text-sm text-gray-700">
            <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
              <div className="text-xs font-semibold text-gray-600">Momentum</div>
              <div className="mt-1">
                You’re logging more decisions recently; outcome coverage lags behind.
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
              <div className="text-xs font-semibold text-gray-600">Quality</div>
              <div className="mt-1">
                Quality trend is improving; add explicit alternatives to reduce tunnel vision.
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
              <div className="text-xs font-semibold text-gray-600">Bias</div>
              <div className="mt-1">
                Bias flags cluster around high-uncertainty categories (career/finance).
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
