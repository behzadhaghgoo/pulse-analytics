import { useMemo } from "react";
import { buildCohorts } from "../../data/mock";

function cell(ret: number) {
  const a = 0.08 + (ret / 100) * 0.85;
  return { background: `rgba(129,140,248,${a.toFixed(3)})`, color: ret > 45 ? "#fff" : "#c7d2fe" };
}

export default function Retention() {
  const cohorts = useMemo(() => buildCohorts(), []);
  const maxWeeks = Math.max(...cohorts.map((c) => c.retention.length));
  const weekCols = Array.from({ length: maxWeeks }, (_, i) => i);

  // average retention per week across cohorts that have that week
  const avg = weekCols.map((w) => {
    const vals = cohorts.map((c) => c.retention[w]).filter((v): v is number => typeof v === "number");
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  });

  return (
    <div>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          ["Week 1 retention", `${avg[1] ?? "-"}%`],
          ["Week 4 retention", `${avg[4] ?? "-"}%`],
          ["Cohorts tracked", `${cohorts.length}`],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <p className="text-sm text-zinc-400">{k}</p>
            <p className="mt-1 text-2xl font-semibold text-white">{v}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <h3 className="mb-4 font-semibold text-white">Weekly cohort retention</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-separate border-spacing-1 text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-zinc-600">
                <th className="px-2 py-1 text-left font-medium">Cohort</th>
                <th className="px-2 py-1 text-right font-medium">Users</th>
                {weekCols.map((w) => <th key={w} className="px-2 py-1 text-center font-medium">W{w}</th>)}
              </tr>
            </thead>
            <tbody>
              {cohorts.map((c) => (
                <tr key={c.label}>
                  <td className="px-2 py-1 text-left text-zinc-300">{c.label}</td>
                  <td className="px-2 py-1 text-right text-zinc-500">{c.size}</td>
                  {weekCols.map((w) => {
                    const v = c.retention[w];
                    if (typeof v !== "number") return <td key={w} className="px-2 py-1" />;
                    return (
                      <td key={w} className="rounded-md px-2 py-1.5 text-center text-xs font-medium tabular-nums" style={cell(v)}>
                        {v}%
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <td className="px-2 pt-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">Average</td>
                <td />
                {avg.map((v, w) => (
                  <td key={w} className="px-2 pt-3 text-center text-xs font-semibold text-brand-300 tabular-nums">{v}%</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
