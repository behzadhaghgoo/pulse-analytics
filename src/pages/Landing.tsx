import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight, BarChart3, Zap, Shield, GitBranch, Bell, Users,
  Check, Star, ChevronDown, Sparkles,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const features = [
  { icon: BarChart3, title: "Real-time dashboards", desc: "Every metric that matters, updated the moment it changes. No refresh, no lag." },
  { icon: Zap, title: "Instant funnels", desc: "Build conversion funnels in seconds and see exactly where users drop off." },
  { icon: Users, title: "Cohort retention", desc: "Track how each week of signups sticks around, side by side, over time." },
  { icon: GitBranch, title: "Version tracking", desc: "Tie metric shifts to the exact release that caused them, automatically." },
  { icon: Bell, title: "Smart alerts", desc: "Get pinged in Slack the instant a KPI moves outside its expected band." },
  { icon: Shield, title: "SOC 2 & GDPR", desc: "Enterprise-grade security and data residency, on by default from day one." },
];

const logos = ["Northloop", "Corvid", "Relay", "Atlas", "Driftly", "Nova"];

const tiers = [
  { name: "Free", monthly: 0, annual: 0, blurb: "For side projects and early tinkering.",
    features: ["Up to 10k events / mo", "3 dashboards", "7-day data history", "Community support"], cta: "Start on Free", highlight: false },
  { name: "Pro", monthly: 49, annual: 39, blurb: "For teams that are starting to scale.",
    features: ["Up to 1M events / mo", "Unlimited dashboards", "1-year data history", "Funnels & cohorts", "Slack alerts", "Priority support"], cta: "Start on Pro", highlight: true },
  { name: "Scale", monthly: 499, annual: 399, blurb: "For companies that live in the data.",
    features: ["Unlimited events", "SSO & SAML", "Unlimited history", "Data residency", "SOC 2 report", "Dedicated engineer"], cta: "Start on Scale", highlight: false },
];

const faqs = [
  { q: "How long does setup take?", a: "Most teams are live in under ten minutes. Drop in the snippet or install an SDK, and events start flowing immediately." },
  { q: "Can I import my existing data?", a: "Yes. We offer one-click imports from the major analytics tools plus a bulk API for historical backfills." },
  { q: "Is there a free plan?", a: "Always. The Free tier covers 10k events a month with no time limit and no credit card required." },
  { q: "Where is my data stored?", a: "In your choice of US or EU region. Scale customers can pin data residency and sign a DPA." },
  { q: "Do you support SSO?", a: "SSO and SAML come with the Scale plan, along with SCIM provisioning and audit logs." },
];

export default function Landing() {
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const navigate = useNavigate();
  const startOn = (plan: "Free" | "Pro" | "Scale") => {
    try { localStorage.setItem("pulse.plan", JSON.stringify(plan)); } catch { /* ignore */ }
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-grid">
        <div className="glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-40 text-center">
          <div className="animate-fade-up mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
            <Sparkles className="h-3.5 w-3.5 text-brand-300" />
            Now with AI-powered anomaly detection
          </div>
          <h1 className="animate-fade-up mx-auto max-w-4xl text-balance text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
            Analytics for teams that{" "}
            <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-fuchsia-400 bg-clip-text text-transparent">
              actually ship
            </span>
          </h1>
          <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Pulse turns your product events into decisions. Growth, retention, and revenue —
            in one dashboard your whole team will actually open.
          </p>
          <div className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/dashboard"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200 sm:w-auto"
            >
              Open live demo
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#features"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
            >
              See features
            </a>
          </div>
          <p className="mt-5 text-xs text-zinc-500">No credit card · Free forever tier · Live in 10 minutes</p>

          {/* Product preview */}
          <div className="animate-fade-up relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -inset-x-8 -top-8 bottom-0 -z-10 rounded-3xl bg-gradient-to-b from-brand-500/20 to-transparent blur-2xl" />
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d14] shadow-2xl shadow-black/60">
              <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-500/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <span className="h-3 w-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs text-zinc-500">app.pulse.io/dashboard</span>
              </div>
              <HeroPreview />
            </div>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="border-y border-white/5 py-10">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-xs uppercase tracking-widest text-zinc-600">Trusted by fast-moving teams</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {logos.map((l) => (
              <span key={l} className="text-lg font-semibold tracking-tight text-zinc-600 transition hover:text-zinc-400">
                {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Everything, in one calm surface</h2>
          <p className="mt-4 text-zinc-400">Stop stitching together five tools. Pulse gives you the full picture without the busywork.</p>
        </div>
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="group bg-[#0a0a0f] p-8 transition hover:bg-[#0d0d16]">
              <span className="inline-grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-brand-300 transition group-hover:border-brand-500/40 group-hover:text-brand-200">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Simple, honest pricing</h2>
          <p className="mt-4 text-zinc-400">Start free. Upgrade when it pays for itself.</p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 p-1 text-sm">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-4 py-1.5 transition ${!annual ? "bg-white text-zinc-900" : "text-zinc-400"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`rounded-full px-4 py-1.5 transition ${annual ? "bg-white text-zinc-900" : "text-zinc-400"}`}
            >
              Annual <span className="text-brand-400">-20%</span>
            </button>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                t.highlight ? "border-brand-500/50 bg-gradient-to-b from-brand-950/40 to-[#0a0a0f]" : "border-white/10 bg-white/[0.02]"
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-8 inline-flex items-center gap-1 rounded-full bg-brand-600 px-3 py-1 text-xs font-medium text-white">
                  <Star className="h-3 w-3" /> Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-white">{t.name}</h3>
              <p className="mt-1 text-sm text-zinc-400">{t.blurb}</p>
              <div className="mt-6 flex items-end gap-1">
                <span className="text-4xl font-bold tracking-tight text-white">${annual ? t.annual : t.monthly}</span>
                <span className="mb-1 text-sm text-zinc-500">/mo</span>
              </div>
              <button
                onClick={() => startOn(t.name as "Free" | "Pro" | "Scale")}
                className={`mt-6 rounded-xl px-4 py-3 text-center text-sm font-semibold transition ${
                  t.highlight ? "bg-white text-zinc-900 hover:bg-zinc-200" : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {t.cta}
              </button>
              <ul className="mt-8 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
        <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">Questions, answered</h2>
        <div className="mt-12 divide-y divide-white/5 rounded-2xl border border-white/10 bg-white/[0.02]">
          {faqs.map((f, i) => (
            <div key={f.q}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-medium text-white">{f.q}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-zinc-500 transition ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && <p className="px-6 pb-5 text-sm leading-relaxed text-zinc-400">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-900/50 via-[#0d0d16] to-[#0a0a0f] px-8 py-16 text-center">
          <div className="glow pointer-events-none absolute inset-0" />
          <h2 className="relative mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to see your product clearly?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-zinc-400">
            Join the teams that stopped guessing. Open the live demo — no signup required.
          </p>
          <Link
            to="/dashboard"
            className="group relative mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
          >
            Explore the dashboard
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* tiny inline preview of the dashboard for the hero */
function HeroPreview() {
  const bars = [42, 58, 36, 71, 64, 88, 52, 76, 60, 94, 70, 82];
  return (
    <div className="grid gap-4 p-5 sm:grid-cols-[160px_1fr]">
      <div className="hidden flex-col gap-2 sm:flex">
        {["Overview", "Funnels", "Retention", "Revenue", "Settings"].map((s, i) => (
          <div key={s} className={`rounded-lg px-3 py-2 text-left text-xs ${i === 0 ? "bg-brand-600/20 text-brand-200" : "text-zinc-500"}`}>
            {s}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-3">
          {[["MRR", "$48.2k"], ["Users", "9,412"], ["Churn", "1.7%"]].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-left">
              <p className="text-[10px] uppercase tracking-wide text-zinc-500">{k}</p>
              <p className="mt-1 text-lg font-semibold text-white">{v}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
          <div className="flex h-28 items-end gap-1.5">
            {bars.map((b, i) => (
              <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-brand-600/40 to-brand-400/80" style={{ height: `${b}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
