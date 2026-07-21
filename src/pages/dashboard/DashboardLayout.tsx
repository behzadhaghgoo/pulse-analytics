import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import CommandPalette from "../../components/dashboard/CommandPalette";
import PlanModal from "../../components/dashboard/PlanModal";
import { DashboardProvider, useDashboard, firstName } from "../../lib/store";

function meta(path: string, name: string): { title: string; subtitle: string } {
  switch (path) {
    case "/dashboard/funnels": return { title: "Funnels", subtitle: "Where users drop off on the way to paid." };
    case "/dashboard/retention": return { title: "Retention", subtitle: "How each cohort of signups sticks around." };
    case "/dashboard/revenue": return { title: "Revenue", subtitle: "MRR, growth and the movements behind it." };
    case "/dashboard/settings": return { title: "Settings", subtitle: "Your profile, plan and notifications." };
    default: return { title: "Overview", subtitle: `Welcome back, ${firstName(name)} — here is how Pulse is doing.` };
  }
}

function Shell() {
  const { pathname } = useLocation();
  const { name, setPaletteOpen } = useDashboard();
  const { title, subtitle } = meta(pathname, name);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setPaletteOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0f]">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={title} subtitle={subtitle} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
      <CommandPalette />
      <PlanModal />
    </div>
  );
}

export default function DashboardLayout() {
  return (
    <DashboardProvider>
      <Shell />
    </DashboardProvider>
  );
}
