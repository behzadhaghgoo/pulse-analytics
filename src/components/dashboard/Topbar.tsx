import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, Settings, CreditCard, LogOut, Check } from "lucide-react";
import { useDashboard, initials, firstName } from "../../lib/store";
import { notifications } from "../../data/mock";

export default function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const navigate = useNavigate();
  const { name, plan, unread, readIds, markAllRead, markRead, setPaletteOpen, setPlanOpen } = useDashboard();
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeAll = () => { setNotifOpen(false); setMenuOpen(false); };

  return (
    <header className="relative z-30 flex items-center gap-4 border-b border-white/5 px-6 py-4">
      <div className="min-w-0">
        <h1 className="text-lg font-semibold text-white">{title}</h1>
        {subtitle && <p className="truncate text-xs text-zinc-500">{subtitle}</p>}
      </div>

      {/* Search -> command palette */}
      <button
        onClick={() => setPaletteOpen(true)}
        className="ml-auto hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-400 transition hover:text-white sm:flex"
      >
        <Search className="h-4 w-4" />
        <span>Search…</span>
        <kbd className="ml-2 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-zinc-500">⌘K</kbd>
      </button>

      {/* Notifications */}
      <div className="relative sm:ml-0 ml-auto">
        <button
          onClick={() => { setMenuOpen(false); setNotifOpen((o) => !o); }}
          className="relative grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 transition hover:text-white"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          {unread > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-400" />}
        </button>
        {notifOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={closeAll} />
            <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-xl border border-white/10 bg-[#12121a] shadow-2xl shadow-black/60">
              <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
                <span className="text-sm font-semibold text-white">Notifications</span>
                <button onClick={markAllRead} className="text-xs text-brand-400 transition hover:text-brand-300">
                  Mark all read
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((n) => {
                  const isRead = readIds.includes(n.id);
                  return (
                    <button
                      key={n.id}
                      onClick={() => markRead(n.id)}
                      className="flex w-full gap-3 border-b border-white/5 px-4 py-3 text-left transition last:border-0 hover:bg-white/[0.03]"
                    >
                      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${isRead ? "bg-transparent" : "bg-brand-400"}`} />
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-zinc-100">{n.title}</span>
                        <span className="block text-xs text-zinc-500">{n.body}</span>
                        <span className="mt-0.5 block text-[11px] text-zinc-600">{n.time}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {/* User menu */}
      <div className="relative">
        <button
          onClick={() => { setNotifOpen(false); setMenuOpen((o) => !o); }}
          className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-fuchsia-500 text-sm font-semibold text-white"
          aria-label="Account menu"
        >
          {initials(name)}
        </button>
        {menuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={closeAll} />
            <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#12121a] shadow-2xl shadow-black/60">
              <div className="border-b border-white/5 px-4 py-3">
                <p className="text-sm font-medium text-white">{firstName(name)}</p>
                <p className="text-xs text-zinc-500">On the {plan} plan</p>
              </div>
              <MenuItem icon={Settings} label="Settings" onClick={() => { closeAll(); navigate("/dashboard/settings"); }} />
              <MenuItem icon={CreditCard} label="Change plan" onClick={() => { closeAll(); setPlanOpen(true); }} />
              <div className="my-1 h-px bg-white/5" />
              <MenuItem icon={LogOut} label="Sign out" onClick={() => { closeAll(); navigate("/"); }} danger />
            </div>
          </>
        )}
      </div>
    </header>
  );
}

function MenuItem({ icon: Icon, label, onClick, danger }: { icon: typeof Check; label: string; onClick: () => void; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition hover:bg-white/[0.04] ${danger ? "text-red-400" : "text-zinc-200"}`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}
