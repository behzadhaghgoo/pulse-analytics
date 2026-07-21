export type RangeKey = "7d" | "30d" | "90d";
export type Plan = "Free" | "Pro" | "Scale";

export type SeriesPoint = { label: string; revenue: number; users: number };
export type ChannelPoint = { channel: string; signups: number };
export type PlanSlice = { name: string; value: number; color: string };
export type Activity = {
  id: number; user: string; email: string; action: string;
  plan: Plan; amount: number; when: string;
};

function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
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
    const d = new Date(); d.setDate(d.getDate() - i);
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
  { id: 8, user: "Owen Park", email: "owen@ping.io", action: "Started trial", plan: "Pro", amount: 0, when: "6h ago" },
  { id: 9, user: "Mia Chen", email: "mia@quanta.co", action: "Upgraded to Pro", plan: "Pro", amount: 49, when: "8h ago" },
  { id: 10, user: "Raj Patel", email: "raj@loomlabs.com", action: "Added a payment method", plan: "Free", amount: 0, when: "11h ago" },
  { id: 11, user: "Elle Dubois", email: "elle@verve.fr", action: "Upgraded to Scale", plan: "Scale", amount: 499, when: "14h ago" },
  { id: 12, user: "Sam Ortega", email: "sam@delta.mx", action: "Renewed annually", plan: "Pro", amount: 470, when: "1d ago" },
];

export function buildKpis(series: SeriesPoint[]) {
  const rev = series.reduce((s, p) => s + p.revenue, 0);
  const usr = series[series.length - 1]?.users ?? 0;
  const spark = (key: "revenue" | "users") => series.map((p) => p[key]);
  return [
    { label: "MRR", value: `$${(rev / 1000).toFixed(1)}k`, delta: 12.4, spark: spark("revenue"), path: "/dashboard/revenue" },
    { label: "Active users", value: usr.toLocaleString(), delta: 8.1, spark: spark("users"), path: "/dashboard/retention" },
    { label: "Conversion", value: "4.9%", delta: 0.6, spark: spark("revenue").map((v) => v * 0.6), path: "/dashboard/funnels" },
    { label: "Churn", value: "1.7%", delta: -0.4, spark: spark("users").map((v) => v * 0.4), path: "/dashboard/retention" },
  ];
}

/* ---- Funnels ---- */
export type FunnelStep = { name: string; users: number };
export const funnelSteps: FunnelStep[] = [
  { name: "Visited site", users: 12480 },
  { name: "Signed up", users: 3120 },
  { name: "Activated", users: 1880 },
  { name: "Subscribed", users: 612 },
  { name: "Retained 30d", users: 498 },
];

/* ---- Cohort retention ---- */
export type Cohort = { label: string; size: number; retention: number[] };
export function buildCohorts(): Cohort[] {
  const out: Cohort[] = [];
  for (let i = 7; i >= 0; i--) {
    const weeks = 8 - i; // oldest cohort (i=7) has 1 week, newest (i=0) has 8
    const decay = 0.72 + (7 - i) * 0.012;
    const d = new Date(); d.setDate(d.getDate() - i * 7);
    const ret: number[] = [];
    for (let w = 0; w < weeks; w++) ret.push(w === 0 ? 100 : Math.round(100 * Math.pow(decay, w)));
    out.push({ label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }), size: 180 + i * 46, retention: ret });
  }
  return out.reverse(); // newest first
}

/* ---- Revenue movements (last 6 months) ---- */
export type Movement = { label: string; newMrr: number; expansion: number; churn: number };
export const movements: Movement[] = [
  { label: "Feb", newMrr: 6200, expansion: 1800, churn: 1400 },
  { label: "Mar", newMrr: 7100, expansion: 2100, churn: 1250 },
  { label: "Apr", newMrr: 6800, expansion: 2600, churn: 1600 },
  { label: "May", newMrr: 8300, expansion: 3100, churn: 1450 },
  { label: "Jun", newMrr: 9100, expansion: 3600, churn: 1700 },
  { label: "Jul", newMrr: 10200, expansion: 4200, churn: 1550 },
];

/* ---- Notifications ---- */
export type Notif = { id: number; title: string; body: string; time: string; kind: "billing" | "team" | "alert" | "system" };
export const notifications: Notif[] = [
  { id: 1, title: "Revenue up 12%", body: "MRR crossed $48k this week, your best on record.", time: "2m ago", kind: "alert" },
  { id: 2, title: "New Scale customer", body: "Ava Thornton upgraded to the Scale plan.", time: "1h ago", kind: "billing" },
  { id: 3, title: "Teammate invited", body: "Diego Alvarez added 3 teammates to your workspace.", time: "1h ago", kind: "team" },
  { id: 4, title: "Churn alert cleared", body: "Weekly churn dropped back under 2%.", time: "5h ago", kind: "alert" },
  { id: 5, title: "Invoice paid", body: "Your July invoice of $49 was paid successfully.", time: "1d ago", kind: "billing" },
  { id: 6, title: "Weekly digest ready", body: "Your Monday summary across all metrics is ready.", time: "1d ago", kind: "system" },
];

/* ---- Command palette / search index ---- */
export type SearchItem = { label: string; hint: string; path: string };
export const searchIndex: SearchItem[] = [
  { label: "Overview", hint: "Dashboard home", path: "/dashboard" },
  { label: "Funnels", hint: "Conversion steps", path: "/dashboard/funnels" },
  { label: "Retention", hint: "Cohort retention", path: "/dashboard/retention" },
  { label: "Revenue", hint: "MRR & movements", path: "/dashboard/revenue" },
  { label: "Settings", hint: "Profile, plan & notifications", path: "/dashboard/settings" },
  { label: "MRR", hint: "Open Revenue", path: "/dashboard/revenue" },
  { label: "Churn", hint: "Open Retention", path: "/dashboard/retention" },
  { label: "Conversion", hint: "Open Funnels", path: "/dashboard/funnels" },
];

export const PLAN_PRICE: Record<Plan, number> = { Free: 0, Pro: 49, Scale: 499 };
