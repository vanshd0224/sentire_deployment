import os

vite_config_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\vite.config.ts"

clean_config = """import path from "path";
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
});
"""

with open(vite_config_path, 'w', encoding='utf-8') as f:
    f.write(clean_config)

print("SUCCESS: Removed memory-crashing viteSingleFile plugin from vite.config.ts!")
