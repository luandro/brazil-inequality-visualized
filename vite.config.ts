import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to ' ' to consume all env variables from .env files
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // Set base path for GitHub Pages deployment
    // In production, use VITE_BASE_PATH if set, otherwise use hardcoded repo name
    // In development, use / for local dev server
    base: mode === 'production'
      ? (env.VITE_BASE_PATH || '/brazil-inequality-visualized/')
      : '/',

    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
