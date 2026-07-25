import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Standalone docs site. Consumes @flow/* from node_modules like any external consumer —
// no workspace resolution, no source-exports. This is the contract with the DS repo.
export default defineConfig({
  plugins: [react()],
  server: { port: 5183 },
});
