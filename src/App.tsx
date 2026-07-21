import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import Funnels from "./pages/dashboard/Funnels";
import Retention from "./pages/dashboard/Retention";
import Revenue from "./pages/dashboard/Revenue";
import Settings from "./pages/dashboard/Settings";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="funnels" element={<Funnels />} />
        <Route path="retention" element={<Retention />} />
        <Route path="revenue" element={<Revenue />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}
