import { Link } from "react-router-dom";
import { Github } from "lucide-react";
import Logo from "./Logo";

const REPO = "https://github.com/behzadhaghgoo/pulse-analytics";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0f]">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-zinc-500">
              Product analytics that actually make sense. Track growth, retention, and revenue in one clean place.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Product</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="#features" className="text-zinc-500 transition hover:text-zinc-300">Features</a></li>
              <li><a href="#pricing" className="text-zinc-500 transition hover:text-zinc-300">Pricing</a></li>
              <li><a href="#faq" className="text-zinc-500 transition hover:text-zinc-300">FAQ</a></li>
              <li><Link to="/dashboard" className="text-zinc-500 transition hover:text-zinc-300">Live demo</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Project</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={REPO} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-zinc-500 transition hover:text-zinc-300">
                  <Github className="h-4 w-4" /> Source on GitHub
                </a>
              </li>
              <li>
                <a href={REPO + "/blob/main/LICENSE"} target="_blank" rel="noreferrer" className="text-zinc-500 transition hover:text-zinc-300">
                  MIT License
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-sm text-zinc-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Pulse Analytics. A demo app.</p>
          <p className="text-zinc-600">Built by Mana</p>
        </div>
      </div>
    </footer>
  );
}
