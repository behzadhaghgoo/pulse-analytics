import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { notifications, type Plan } from "../data/mock";

export function usePersistent<T>(key: string, initial: T) {
  const [val, setVal] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw != null ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* ignore quota */ }
  }, [key, val]);
  return [val, setVal] as const;
}

type Ctx = {
  // persisted
  plan: Plan; setPlan: (p: Plan) => void;
  name: string; setName: (n: string) => void;
  emailNotif: boolean; setEmailNotif: (b: boolean) => void;
  pushNotif: boolean; setPushNotif: (b: boolean) => void;
  weeklyDigest: boolean; setWeeklyDigest: (b: boolean) => void;
  readIds: number[]; markAllRead: () => void; markRead: (id: number) => void;
  unread: number;
  // ephemeral UI
  planOpen: boolean; setPlanOpen: (b: boolean) => void;
  paletteOpen: boolean; setPaletteOpen: (b: boolean) => void;
};

const DashCtx = createContext<Ctx | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = usePersistent<Plan>("pulse.plan", "Pro");
  const [name, setName] = usePersistent<string>("pulse.name", "Behzad Haghgoo");
  const [emailNotif, setEmailNotif] = usePersistent<boolean>("pulse.notif.email", true);
  const [pushNotif, setPushNotif] = usePersistent<boolean>("pulse.notif.push", false);
  const [weeklyDigest, setWeeklyDigest] = usePersistent<boolean>("pulse.notif.digest", true);
  const [readIds, setReadIds] = usePersistent<number[]>("pulse.notif.read", []);
  const [planOpen, setPlanOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const markAllRead = () => setReadIds(notifications.map((n) => n.id));
  const markRead = (id: number) => setReadIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  const unread = notifications.filter((n) => !readIds.includes(n.id)).length;

  return (
    <DashCtx.Provider
      value={{
        plan, setPlan, name, setName,
        emailNotif, setEmailNotif, pushNotif, setPushNotif, weeklyDigest, setWeeklyDigest,
        readIds, markAllRead, markRead, unread,
        planOpen, setPlanOpen, paletteOpen, setPaletteOpen,
      }}
    >
      {children}
    </DashCtx.Provider>
  );
}

export function useDashboard() {
  const c = useContext(DashCtx);
  if (!c) throw new Error("useDashboard must be used within DashboardProvider");
  return c;
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || "there";
}
