import glob from "glob";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const htmlFiles = glob.sync("**/*.html", {
  ignore: ["node_modules/**", "dist/**"],
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: htmlFiles,
    },
  },
});
