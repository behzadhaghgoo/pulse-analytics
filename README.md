<div align="center">

# ⚡ Pulse

**Product analytics that actually make sense.**
A modern SaaS demo: a marketing site + a fully interactive dashboard.

React · Vite · TypeScript · Tailwind CSS · Recharts

</div>

---

## What is this?

Pulse is a self-contained SaaS front end built to show a complete, real product surface:

- **Marketing landing page** — hero, social proof, feature grid, pricing with a monthly/annual toggle, an FAQ accordion, and a CTA.
- **Interactive dashboard** (`/dashboard`) — KPI cards with live sparklines, a revenue/users area chart, plan-mix donut, signups-by-channel bar chart, and a recent-activity table. A date-range switcher (7d / 30d / 90d) recomputes every chart.

All data is generated client-side (deterministic mock data) — no backend required. It builds to static files and deploys anywhere.

## Tech stack

| Layer      | Choice                          |
| ---------- | ------------------------------- |
| Framework  | React 18 + React Router         |
| Build tool | Vite 5                          |
| Language   | TypeScript (strict)             |
| Styling    | Tailwind CSS 3                  |
| Charts     | Recharts                        |
| Icons      | lucide-react                    |

## Getting started

```bash
npm install
npm run dev        # start the dev server → http://localhost:5173
```

Other scripts:

```bash
npm run build      # type-check + production build → dist/
npm run preview    # preview the production build
npm run lint       # type-check only
```

## Project structure

```
src/
  main.tsx              # entry + router provider
  App.tsx              # routes:  /  and  /dashboard
  index.css            # tailwind + base theme
  data/mock.ts         # deterministic mock metrics
  components/
    Logo.tsx
    Navbar.tsx
    Footer.tsx
    Sparkline.tsx      # tiny dependency-free SVG sparkline
  pages/
    Landing.tsx        # marketing site
    Dashboard.tsx      # the app
```

## Deploy

The repo includes a `vercel.json` with SPA rewrites, so a Vercel import works out of the box:

1. Import the repo on Vercel.
2. Framework preset: **Vite**. Build: `npm run build`. Output: `dist`.
3. Deploy.

## License

MIT — see [LICENSE](./LICENSE).

---

<div align="center">
Built by <b>Mana</b> · <i>a demo of what an AI can ship end-to-end in a repo.</i>
</div>
