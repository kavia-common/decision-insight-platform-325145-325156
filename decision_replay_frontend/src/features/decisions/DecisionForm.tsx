"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { api } from "@/lib/api/client";
import { useToast } from "@/components/providers/ToastProvider";

const schema = z.object({
  title: z.string().min(3),
  context: z.string().min(10),
  expectedOutcome: z.string().min(5),
  status: z.enum(["open", "closed"]).default("open"),
});

export function DecisionForm({
  mode,
  decisionId,
  onSaved,
}: {
  mode: "create" | "edit";
  decisionId?: string;
  onSaved: (id: string) => void;
}) {
  const { push } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [expectedOutcome, setExpectedOutcome] = useState("");
  const [status, setStatus] = useState<"open" | "closed">("open");

  useEffect(() => {
    if (mode !== "edit" || !decisionId) return;
    let mounted = true;
    api.getDecision(decisionId).then((d) => {
      if (!mounted) return;
      setTitle(d.title);
      setContext(d.context);
      setExpectedOutcome(d.expectedOutcome);
      setStatus(d.status === "closed" ? "closed" : "open");
    });
    return () => {
      mounted = false;
    };
  }, [mode, decisionId]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = schema.safeParse({ title, context, expectedOutcome, status });
    if (!parsed.success) {
      setError("Please fill out title/context/expected outcome (context min 10 chars).");
      return;
    }

    setLoading(true);
    try {
      if (mode === "create") {
        const res = await api.createDecision(parsed.data);
        push({ title: "Decision created", message: "You can now add outcomes and insights." });
        onSaved(res.id);
      } else {
        if (!decisionId) throw new Error("Missing decisionId");
        await api.updateDecision(decisionId, parsed.data);
        push({ title: "Saved", message: "Decision updated." });
        onSaved(decisionId);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label className="block">
        <div className="text-sm font-medium text-gray-900">Context</div>
        <textarea
          className="mt-2 w-full min-h-[120px] rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="What situation led to this decision? Constraints, stakeholders, assumptions…"
        />
      </label>
      <label className="block">
        <div className="text-sm font-medium text-gray-900">Expected outcome</div>
        <textarea
          className="mt-2 w-full min-h-[90px] rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
          value={expectedOutcome}
          onChange={(e) => setExpectedOutcome(e.target.value)}
          placeholder="What does success look like? What are leading indicators?"
        />
      </label>

      {mode === "edit" ? (
        <label className="block">
          <div className="text-sm font-medium text-gray-900">Status</div>
          <select
            className="mt-2 w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
            value={status}
            onChange={(e) => setStatus(e.target.value === "closed" ? "closed" : "open")}
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </label>
      ) : null}

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="flex items-center gap-2">
        <Button type="submit" loading={loading}>
          {mode === "create" ? "Create decision" : "Save changes"}
        </Button>
        <div className="text-xs text-gray-500">
          Backend endpoints are stubbed until Express implementation lands.
        </div>
      </div>
    </form>
  );
}
