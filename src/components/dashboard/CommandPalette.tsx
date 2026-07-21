import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, CornerDownLeft } from "lucide-react";
import { searchIndex } from "../../data/mock";
import { useDashboard } from "../../lib/store";

export default function CommandPalette() {
  const { paletteOpen, setPaletteOpen } = useDashboard();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return searchIndex;
    return searchIndex.filter((i) => i.label.toLowerCase().includes(s) || i.hint.toLowerCase().includes(s));
  }, [q]);

  useEffect(() => {
    if (paletteOpen) {
      setQ(""); setActive(0);
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [paletteOpen]);

  useEffect(() => { setActive(0); }, [q]);

  if (!paletteOpen) return null;

  const go = (path: string) => { setPaletteOpen(false); navigate(path); };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { e.preventDefault(); setPaletteOpen(false); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); if (results[active]) go(results[active].path); }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]" onKeyDown={onKey}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setPaletteOpen(false)} />
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#12121a] shadow-2xl shadow-black/70">
        <div className="flex items-center gap-3 border-b border-white/5 px-4">
          <Search className="h-4 w-4 text-zinc-500" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search sections and metrics…"
            className="w-full bg-transparent py-4 text-sm text-zinc-100 placeholder-zinc-600 outline-none"
          />
          <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-zinc-500">esc</kbd>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-zinc-500">No matches for “{q}”.</p>
          ) : (
            results.map((r, i) => (
              <button
                key={r.label + r.path}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(r.path)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                  i === active ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
                }`}
              >
                <span className="flex-1">
                  <span className="block text-sm font-medium text-zinc-100">{r.label}</span>
                  <span className="block text-xs text-zinc-500">{r.hint}</span>
                </span>
                {i === active && <CornerDownLeft className="h-4 w-4 text-zinc-500" />}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
