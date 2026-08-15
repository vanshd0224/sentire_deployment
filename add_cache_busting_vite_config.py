import os

vite_config_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\vite.config.ts"

new_vite_config = """import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash]-${Date.now()}.js`,
        chunkFileNames: `assets/[name]-[hash]-${Date.now()}.js`,
        assetFileNames: `assets/[name]-[hash]-${Date.now()}[extname]`
      }
    }
  }
});
"""

with open(vite_config_path, 'w', encoding='utf-8') as f:
    f.write(new_vite_config)

print("SUCCESS: Updated vite.config.ts with timestamped build filenames for 100% cache busting")
