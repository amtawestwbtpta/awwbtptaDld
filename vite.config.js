import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // allows "@/..." imports
      "@modules": path.resolve(__dirname, "src/modules"), // optional
      "@context": path.resolve(__dirname, "src/context"), // optional
    },
  },
});
