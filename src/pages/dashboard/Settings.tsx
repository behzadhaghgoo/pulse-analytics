import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import Toggle from "../../components/dashboard/Toggle";
import { useDashboard } from "../../lib/store";
import { PLAN_PRICE } from "../../data/mock";

function Row({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="text-xs text-zinc-500">{desc}</p>
      </div>
      {children}
    </div>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const {
    name, setName, plan, setPlanOpen,
    emailNotif, setEmailNotif, pushNotif, setPushNotif, weeklyDigest, setWeeklyDigest,
  } = useDashboard();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Profile */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h3 className="text-base font-semibold text-white">Profile</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs text-zinc-400">Full name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-brand-500/50"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs text-zinc-400">Email (read-only in demo)</span>
            <input
              value="behzad@pulse.io"
              readOnly
              className="w-full cursor-not-allowed rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-zinc-500 outline-none"
            />
          </label>
        </div>
        <p className="mt-3 text-xs text-zinc-500">Your name updates the greeting and avatar instantly, and is saved on this device.</p>
      </section>

      {/* Plan */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h3 className="text-base font-semibold text-white">Plan &amp; billing</h3>
        <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div>
            <p className="text-sm font-medium text-white">{plan} plan</p>
            <p className="text-xs text-zinc-500">
              {PLAN_PRICE[plan] === 0 ? "Free forever" : `$${PLAN_PRICE[plan]} / month`}
            </p>
          </div>
          <button
            onClick={() => setPlanOpen(true)}
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
          >
            Change plan
          </button>
        </div>
      </section>

      {/* Notifications */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h3 className="text-base font-semibold text-white">Notifications</h3>
        <div className="mt-2 divide-y divide-white/5">
          <Row title="Email alerts" desc="Get emailed when a KPI moves out of band."><Toggle on={emailNotif} onChange={setEmailNotif} label="Email alerts" /></Row>
          <Row title="Push notifications" desc="Real-time pushes in your browser."><Toggle on={pushNotif} onChange={setPushNotif} label="Push notifications" /></Row>
          <Row title="Weekly digest" desc="A Monday summary across every metric."><Toggle on={weeklyDigest} onChange={setWeeklyDigest} label="Weekly digest" /></Row>
        </div>
      </section>

      {/* Sign out */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-white/[0.05]"
      >
        <LogOut className="h-4 w-4" /> Sign out
      </button>
    </div>
  );
}
