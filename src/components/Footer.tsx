import Logo from "./Logo";

const cols = [
  { title: "Product", items: ["Features", "Pricing", "Changelog", "Integrations", "Status"] },
  { title: "Company", items: ["About", "Careers", "Blog", "Customers", "Contact"] },
  { title: "Resources", items: ["Docs", "API reference", "Guides", "Community", "Security"] },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0f]">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-zinc-500">
              Product analytics that actually make sense. Track growth, retention, and revenue in one clean place.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold text-white">{c.title}</h4>
              <ul className="mt-4 space-y-3">
                {c.items.map((i) => (
                  <li key={i}>
                    <a href="#" className="text-sm text-zinc-500 transition hover:text-zinc-300">
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-sm text-zinc-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Pulse Analytics, Inc. All rights reserved.</p>
          <p className="text-zinc-600">Built by Mana · a demo app</p>
        </div>
      </div>
    </footer>
  );
}
