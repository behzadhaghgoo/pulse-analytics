import { useMemo, useState } from "react";
import { funnelSteps } from "../../data/mock";

const segments = [
  { key: "all", label: "All users", factor: 1 },
  { key: "new", label: "New users", factor: 0.62 },
  { key: "returning", label: "Returning", factor: 0.38 },
] as const;

export default function Funnels() {
  const [seg, setSeg] = useState<(typeof segments)[number]["key"]>("all");
  const factor = segments.find((s) => s.key === seg)!.factor;

  const steps = useMemo(
    () => funnelSteps.map((s) => ({ ...s, users: Math.round(s.users * factor) })),
    [factor]
  );
  const top = steps[0].users;
  const overall = ((steps[steps.length - 1].users / top) * 100).toFixed(1);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-lg border border-white/10 bg-white/5 p-1 text-sm">
          {segments.map((s) => (
            <button key={s.key} onClick={() => setSeg(s.key)}
              className={`rounded-md px-3 py-1.5 transition ${seg === s.key ? "bg-white text-zinc-900" : "text-zinc-400 hover:text-white"}`}>
              {s.label}
            </button>
          ))}
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2 text-sm">
          <span className="text-zinc-400">Overall conversion </span>
          <span className="font-semibold text-brand-300">{overall}%</span>
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((s, i) => {
          const pct = (s.users / top) * 100;
          const stepConv = i === 0 ? 100 : (s.users / steps[i - 1].users) * 100;
          const drop = i === 0 ? 0 : 100 - stepConv;
          return (
            <div key={s.name} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-white">{i + 1}. {s.name}</span>
                <span className="text-zinc-400">
                  {s.users.toLocaleString()} <span className="text-zinc-600">users</span>
                </span>
              </div>
              <div className="h-9 w-full overflow-hidden rounded-lg bg-white/5">
                <div className="flex h-full items-center justify-end rounded-lg bg-gradient-to-r from-brand-600 to-brand-400 pr-3 text-xs font-semibold text-white transition-all"
                  style={{ width: `${Math.max(pct, 6)}%` }}>
                  {pct.toFixed(0)}%
                </div>
              </div>
              {i > 0 && (
                <p className="mt-2 text-xs text-zinc-500">
                  {stepConv.toFixed(1)}% continued from previous
                  <span className="text-red-400"> · {drop.toFixed(1)}% dropped off</span>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
