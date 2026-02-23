"use client";

import { clsx } from "clsx";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
};

export function Input({ label, hint, className, ...rest }: Props) {
  return (
    <label className="block">
      {label ? <div className="text-sm font-medium text-gray-900">{label}</div> : null}
      {hint ? <div className="mt-1 text-xs text-gray-500">{hint}</div> : null}
      <input
        className={clsx(
          "mt-2 w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm text-gray-900 outline-none ring-0 placeholder:text-gray-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100",
          className
        )}
        {...rest}
      />
    </label>
  );
}
