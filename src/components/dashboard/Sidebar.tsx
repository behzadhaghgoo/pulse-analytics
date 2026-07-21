import { NavLink } from "react-router-dom";
import { LayoutDashboard, Filter, Repeat, DollarSign, Settings } from "lucide-react";
import Logo from "../Logo";
import { useDashboard } from "../../lib/store";

const nav = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/funnels", label: "Funnels", icon: Filter },
  { to: "/dashboard/retention", label: "Retention", icon: Repeat },
  { to: "/dashboard/revenue", label: "Revenue", icon: DollarSign },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const { plan, setPlanOpen } = useDashboard();
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-white/5 bg-[#0b0b12] p-4 lg:flex">
      <NavLink to="/" className="px-2 py-2">
        <Logo />
      </NavLink>
      <nav className="mt-6 flex flex-col gap-1">
        {nav.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                isActive ? "bg-white/5 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <n.icon className="h-4 w-4" />
            {n.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-xl border border-brand-500/20 bg-brand-950/30 p-4">
        {plan === "Scale" ? (
          <>
            <p className="text-sm font-medium text-white">You are on Scale</p>
            <p className="mt-1 text-xs text-zinc-400">You have everything Pulse offers.</p>
            <button
              onClick={() => setPlanOpen(true)}
              className="mt-3 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
            >
              Manage plan
            </button>
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-white">You are on {plan}</p>
            <p className="mt-1 text-xs text-zinc-400">
              {plan === "Free" ? "Upgrade for funnels, cohorts and alerts." : "Upgrade to Scale for SSO and unlimited history."}
            </p>
            <button
              onClick={() => setPlanOpen(true)}
              className="mt-3 w-full rounded-lg bg-white px-3 py-2 text-xs font-semibold text-zinc-900 transition hover:bg-zinc-200"
            >
              Upgrade
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
