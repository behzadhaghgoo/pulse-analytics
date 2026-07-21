import { X, Check, Star } from "lucide-react";
import { useDashboard } from "../../lib/store";
import { PLAN_PRICE, type Plan } from "../../data/mock";

const TIERS: { name: Plan; blurb: string; features: string[]; highlight?: boolean }[] = [
  { name: "Free", blurb: "For side projects.", features: ["10k events / mo", "3 dashboards", "7-day history"] },
  { name: "Pro", blurb: "For growing teams.", features: ["1M events / mo", "Unlimited dashboards", "Funnels & cohorts", "Slack alerts"], highlight: true },
  { name: "Scale", blurb: "For data-driven companies.", features: ["Unlimited events", "SSO & SAML", "Unlimited history", "Dedicated engineer"] },
];

export default function PlanModal() {
  const { planOpen, setPlanOpen, plan, setPlan } = useDashboard();
  if (!planOpen) return null;

  const choose = (p: Plan) => { setPlan(p); setPlanOpen(false); };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setPlanOpen(false)} />
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d14] shadow-2xl shadow-black/70">
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Choose your plan</h2>
            <p className="text-xs text-zinc-500">You are currently on {plan}. Changes apply instantly in this demo.</p>
          </div>
          <button onClick={() => setPlanOpen(false)} className="grid h-8 w-8 place-items-center rounded-lg text-zinc-400 transition hover:bg-white/5 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="grid gap-4 p-6 sm:grid-cols-3">
          {TIERS.map((t) => {
            const current = t.name === plan;
            return (
              <div key={t.name} className={`flex flex-col rounded-xl border p-5 ${t.highlight ? "border-brand-500/50 bg-brand-950/20" : "border-white/10 bg-white/[0.02]"}`}>
                {t.highlight && (
                  <span className="mb-2 inline-flex w-fit items-center gap-1 rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-medium text-white">
                    <Star className="h-3 w-3" /> Popular
                  </span>
                )}
                <h3 className="text-base font-semibold text-white">{t.name}</h3>
                <p className="mt-0.5 text-xs text-zinc-500">{t.blurb}</p>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-2xl font-bold text-white">${PLAN_PRICE[t.name]}</span>
                  <span className="mb-1 text-xs text-zinc-500">/mo</span>
                </div>
                <button
                  disabled={current}
                  onClick={() => choose(t.name)}
                  className={`mt-4 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    current
                      ? "cursor-default border border-white/10 bg-transparent text-zinc-500"
                      : t.highlight
                      ? "bg-white text-zinc-900 hover:bg-zinc-200"
                      : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  {current ? "Current plan" : `Switch to ${t.name}`}
                </button>
                <ul className="mt-4 space-y-2">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-zinc-300">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-400" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
