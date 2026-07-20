export type RangeKey = "7d" | "30d" | "90d";

export type SeriesPoint = { label: string; revenue: number; users: number };
export type ChannelPoint = { channel: string; signups: number };
export type PlanSlice = { name: string; value: number; color: string };
export type Activity = {
  id: number;
  user: string;
  email: string;
  action: string;
  plan: "Free" | "Pro" | "Scale";
  amount: number;
  when: string;
};

// deterministic pseudo-random so the charts look organic but stable
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const RANGE_DAYS: Record<RangeKey, number> = { "7d": 7, "30d": 30, "90d": 90 };

export function buildSeries(range: RangeKey): SeriesPoint[] {
  const days = RANGE_DAYS[range];
  const rnd = mulberry32(days === 7 ? 7 : days === 30 ? 31 : 97);
  const step = days <= 7 ? 1 : days <= 30 ? 2 : 6;
  const out: SeriesPoint[] = [];
  let rev = 4200 + days * 40;
  let usr = 820 + days * 8;
  for (let i = days; i >= 0; i -= step) {
    rev += (rnd() - 0.42) * 900;
    usr += (rnd() - 0.4) * 90;
    const d = new Date();
    d.setDate(d.getDate() - i);
    out.push({
      label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      revenue: Math.max(1200, Math.round(rev)),
      users: Math.max(400, Math.round(usr)),
    });
  }
  return out;
}

export const channels: ChannelPoint[] = [
  { channel: "Organic", signups: 1284 },
  { channel: "Referral", signups: 942 },
  { channel: "Paid", signups: 731 },
  { channel: "Social", signups: 588 },
  { channel: "Email", signups: 402 },
];

export const plans: PlanSlice[] = [
  { name: "Free", value: 58, color: "#3f3f46" },
  { name: "Pro", value: 31, color: "#6366f1" },
  { name: "Scale", value: 11, color: "#a5b4fc" },
];

export const activity: Activity[] = [
  { id: 1, user: "Ava Thornton", email: "ava@northloop.io", action: "Upgraded to Scale", plan: "Scale", amount: 499, when: "2m ago" },
  { id: 2, user: "Marcus Reed", email: "m.reed@fig.dev", action: "Started trial", plan: "Pro", amount: 0, when: "14m ago" },
  { id: 3, user: "Priya Nair", email: "priya@corvid.app", action: "Upgraded to Pro", plan: "Pro", amount: 49, when: "38m ago" },
  { id: 4, user: "Diego Alvarez", email: "diego@nova.gg", action: "Invited 3 teammates", plan: "Scale", amount: 0, when: "1h ago" },
  { id: 5, user: "Sana Malik", email: "sana@driftly.co", action: "Renewed annually", plan: "Pro", amount: 470, when: "2h ago" },
  { id: 6, user: "Tom Becker", email: "tom@relay.sh", action: "Downgraded to Free", plan: "Free", amount: 0, when: "3h ago" },
  { id: 7, user: "Lena Fox", email: "lena@atlas.build", action: "Upgraded to Scale", plan: "Scale", amount: 499, when: "5h ago" },
];

// KPI cards derive from the series so the numbers move with the range
export function buildKpis(series: SeriesPoint[]) {
  const rev = series.reduce((s, p) => s + p.revenue, 0);
  const usr = series[series.length - 1]?.users ?? 0;
  const spark = (key: "revenue" | "users") => series.map((p) => p[key]);
  return [
    { label: "MRR", value: `$${(rev / 1000).toFixed(1)}k`, delta: 12.4, spark: spark("revenue") },
    { label: "Active users", value: usr.toLocaleString(), delta: 8.1, spark: spark("users") },
    { label: "Conversion", value: "4.9%", delta: 0.6, spark: spark("revenue").map((v) => v * 0.6) },
    { label: "Churn", value: "1.7%", delta: -0.4, spark: spark("users").map((v) => v * 0.4) },
  ];
}
