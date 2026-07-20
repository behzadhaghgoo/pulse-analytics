import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {
  LayoutDashboard, Filter, Repeat, DollarSign, Settings, Search,
  Bell, ArrowUpRight, ArrowDownRight, TrendingUp,
} from "lucide-react";
import Logo from "../components/Logo";
import Sparkline from "../components/Sparkline";
import { buildSeries, buildKpis, channels, plans, activity, type RangeKey } from "../data/mock";

const nav = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: Filter, label: "Funnels" },
  { icon: Repeat, label: "Retention" },
  { icon: DollarSign, label: "Revenue" },
  { icon: Settings, label: "Settings" },
];

const ranges: RangeKey[] = ["7d", "30d", "90d"];

const planBadge: Record<string, string> = {
  Free: "bg-zinc-700/40 text-zinc-300",
  Pro: "bg-brand-500/20 text-brand-200",
  Scale: "bg-fuchsia-500/20 text-fuchsia-200",
};

export default function Dashboard() {
  const [range, setRange] = useState<RangeKey>("30d");
  const series = useMemo(() => buildSeries(range), [range]);
  const kpis = useMemo(() => buildKpis(series), [series]);

  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-white/5 bg-[#0b0b12] p-4 lg:flex">
        <Link to="/" className="px-2 py-2">
          <Logo />
        </Link>
        <nav className="mt-6 flex flex-col gap-1">
          {nav.map((n) => (
            <button
              key={n.label}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                n.active ? "bg-white/5 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <n.icon className="h-4 w-4" />
              {n.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto rounded-xl border border-brand-500/20 bg-brand-950/30 p-4">
          <p className="text-sm font-medium text-white">You are on Pro</p>
          <p className="mt-1 text-xs text-zinc-400">Upgrade to Scale for SSO and unlimited history.</p>
          <button className="mt-3 w-full rounded-lg bg-white px-3 py-2 text-xs font-semibold text-zinc-900 transition hover:bg-zinc-200">
            Upgrade
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="flex items-center gap-4 border-b border-white/5 px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold text-white">Overview</h1>
            <p className="text-xs text-zinc-500">Welcome back, Behzad — here is how Pulse is doing.</p>
          </div>
          <div className="ml-auto hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 sm:flex">
            <Search className="h-4 w-4 text-zinc-500" />
            <input placeholder="Search metrics…" className="w-40 bg-transparent text-sm text-zinc-200 placeholder-zinc-600 outline-none" />
          </div>
          <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 transition hover:text-white">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-400" />
          </button>
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-fuchsia-500 text-sm font-semibold text-white">
            B
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Range selector */}
          <div className="mb-6 flex items-center justify-between">
            <div className="inline-flex rounded-lg border border-white/10 bg-white/5 p-1 text-sm">
              {ranges.map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`rounded-md px-3 py-1.5 transition ${range === r ? "bg-white text-zinc-900" : "text-zinc-400 hover:text-white"}`}
                >
                  Last {r}
                </button>
              ))}
            </div>
            <span className="hidden items-center gap-1.5 text-xs text-zinc-500 sm:inline-flex">
              <TrendingUp className="h-3.5 w-3.5 text-brand-400" /> Live · updated just now
            </span>
          </div>

          {/* KPI cards */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map((k) => {
              const up = k.delta >= 0;
              const good = k.label === "Churn" ? !up : up;
              return (
                <div key={k.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="flex items-start justify-between">
                    <p className="text-sm text-zinc-400">{k.label}</p>
                    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${good ? "text-emerald-400" : "text-red-400"}`}>
                      {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                      {Math.abs(k.delta)}%
                    </span>
                  </div>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-white">{k.value}</p>
                  <Sparkline data={k.spark} className="mt-3 h-9 w-full" stroke={good ? "#34d399" : "#f87171"} />
                </div>
              );
            })}
          </div>

          {/* Charts row */}
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-white">Revenue & users</h3>
                <span className="text-xs text-zinc-500">Last {range}</span>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={series} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gUsr" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#e879f9" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#e879f9" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="label" tick={{ fill: "#71717a", fontSize: 11 }} tickLine={false} axisLine={false} minTickGap={24} />
                    <YAxis tick={{ fill: "#71717a", fontSize: 11 }} tickLine={false} axisLine={false} width={48} />
                    <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "#e4e4e7" }} cursor={{ stroke: "rgba(255,255,255,0.1)" }} />
                    <Area type="monotone" dataKey="revenue" stroke="#818cf8" strokeWidth={2} fill="url(#gRev)" />
                    <Area type="monotone" dataKey="users" stroke="#e879f9" strokeWidth={2} fill="url(#gUsr)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <h3 className="mb-4 font-semibold text-white">Plan mix</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={plans} dataKey="value" nameKey="name" innerRadius={52} outerRadius={78} paddingAngle={3} stroke="none">
                      {plans.map((p) => (
                        <Cell key={p.name} fill={p.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 space-y-2">
                {plans.map((p) => (
                  <div key={p.name} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-zinc-400">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.color }} />
                      {p.name}
                    </span>
                    <span className="font-medium text-zinc-200">{p.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Channels + Activity */}
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <h3 className="mb-4 font-semibold text-white">Signups by channel</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={channels} layout="vertical" margin={{ left: 8, right: 8 }}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="channel" tick={{ fill: "#a1a1aa", fontSize: 12 }} tickLine={false} axisLine={false} width={64} />
                    <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                    <Bar dataKey="signups" radius={[0, 6, 6, 0]} barSize={18}>
                      {channels.map((_, i) => (
                        <Cell key={i} fill={`rgba(129,140,248,${1 - i * 0.14})`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-white">Recent activity</h3>
                <button className="text-xs text-brand-400 transition hover:text-brand-300">View all</button>
              </div>
              <div className="-mx-2 overflow-x-auto">
                <table className="w-full min-w-[520px] text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wide text-zinc-600">
                      <th className="px-2 py-2 font-medium">User</th>
                      <th className="px-2 py-2 font-medium">Action</th>
                      <th className="px-2 py-2 font-medium">Plan</th>
                      <th className="px-2 py-2 text-right font-medium">Amount</th>
                      <th className="px-2 py-2 text-right font-medium">When</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {activity.map((a) => (
                      <tr key={a.id} className="transition hover:bg-white/[0.02]">
                        <td className="px-2 py-3">
                          <div className="font-medium text-zinc-100">{a.user}</div>
                          <div className="text-xs text-zinc-500">{a.email}</div>
                        </td>
                        <td className="px-2 py-3 text-zinc-300">{a.action}</td>
                        <td className="px-2 py-3">
                          <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${planBadge[a.plan]}`}>{a.plan}</span>
                        </td>
                        <td className="px-2 py-3 text-right font-medium text-zinc-200">
                          {a.amount ? `$${a.amount}` : "—"}
                        </td>
                        <td className="px-2 py-3 text-right text-xs text-zinc-500">{a.when}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const tooltipStyle = {
  background: "#12121a",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 10,
  fontSize: 12,
  color: "#e4e4e7",
} as const;
