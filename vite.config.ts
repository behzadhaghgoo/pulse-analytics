import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Base path for GitHub Pages project site.
export default defineConfig({
  base: "/pulse-analytics/",
  plugins: [react()],
});
