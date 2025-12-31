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
    // Set base path for deployment
    // Defaults to '/' for most providers (Vercel, Netlify, custom domains)
    // Set VITE_BASE_PATH for subpath deployments (e.g., GitHub Pages: /repo-name/)
    base: env.VITE_BASE_PATH || '/',

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
