import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const BACKEND_URL = "https://fnujxmowqespahszeluq.supabase.co";
const BACKEND_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZudWp4bW93cWVzcGFoc3plbHVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0NTk3ODIsImV4cCI6MjA4MjAzNTc4Mn0.Zd4EPLk1vo3o2LAwYnqglE7XCgWTTvsLok0zYQyEgr4";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
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
  define: {
    "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(BACKEND_URL),
    "import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY": JSON.stringify(BACKEND_PUBLISHABLE_KEY),
  },
}));
