import { clsx } from "clsx";

export function StatsCard({
  title,
  value,
  hint,
  tone = "info",
}: {
  title: string;
  value: string;
  hint?: string;
  tone?: "info" | "warn";
}) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-700">{title}</div>
          <div
            className={clsx(
              "h-2.5 w-2.5 rounded-full",
              tone === "warn" ? "bg-red-500" : "bg-cyan-500"
            )}
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 text-2xl font-semibold text-gray-900">{value}</div>
        {hint ? <div className="mt-1 text-xs text-gray-500">{hint}</div> : null}
      </div>
    </div>
  );
}
