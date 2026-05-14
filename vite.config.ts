import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
    }),
  ],
});
