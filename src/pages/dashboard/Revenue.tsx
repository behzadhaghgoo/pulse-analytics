import { useMemo } from "react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, ReferenceLine,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { buildSeries, movements } from "../../data/mock";
import { tooltipStyle } from "../../components/dashboard/chartStyle";

export default function Revenue() {
  const series = useMemo(() => buildSeries("90d"), []);
  const data = useMemo(
    () => movements.map((m) => ({ ...m, churnNeg: -m.churn, net: m.newMrr + m.expansion - m.churn })),
    []
  );
  const totalNet = data.reduce((s, m) => s + m.net, 0);
  const lastNet = data[data.length - 1].net;

  return (
    <div>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          ["Net new MRR (6mo)", `$${(totalNet / 1000).toFixed(1)}k`],
          ["This month net", `$${(lastNet / 1000).toFixed(1)}k`],
          ["Avg monthly churn", `$${Math.round(movements.reduce((s, m) => s + m.churn, 0) / movements.length).toLocaleString()}`],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <p className="text-sm text-zinc-400">{k}</p>
            <p className="mt-1 text-2xl font-semibold text-white">{v}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <h3 className="mb-4 font-semibold text-white">Revenue trend (90d)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="gRev2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.5} /><stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="label" tick={{ fill: "#71717a", fontSize: 11 }} tickLine={false} axisLine={false} minTickGap={28} />
                <YAxis tick={{ fill: "#71717a", fontSize: 11 }} tickLine={false} axisLine={false} width={48} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "#e4e4e7" }} cursor={{ stroke: "rgba(255,255,255,0.1)" }} />
                <Area type="monotone" dataKey="revenue" stroke="#818cf8" strokeWidth={2} fill="url(#gRev2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <h3 className="mb-1 font-semibold text-white">MRR movements</h3>
          <div className="mb-3 flex gap-4 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-emerald-400" />New</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-brand-400" />Expansion</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-red-400" />Churn</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 6, right: 6, left: -18, bottom: 0 }} stackOffset="sign">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="label" tick={{ fill: "#71717a", fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: "#71717a", fontSize: 11 }} tickLine={false} axisLine={false} width={48} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                <ReferenceLine y={0} stroke="rgba(255,255,255,0.15)" />
                <Bar dataKey="newMrr" name="New" stackId="a" fill="#34d399" radius={[3, 3, 0, 0]} />
                <Bar dataKey="expansion" name="Expansion" stackId="a" fill="#818cf8" />
                <Bar dataKey="churnNeg" name="Churn" stackId="a" fill="#f87171" radius={[0, 0, 3, 3]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
