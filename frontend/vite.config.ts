import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
    // Preload the font files (Archivo, and Instrument Serif for the italic
    // accent words) so text is laid out once, in the right font. Without it
    // the page first rendered in a fallback and then re-shaped and
    // re-laid-out every line when a font arrived (~0.8s of main thread on a
    // mid-range phone, right in the middle of the hero).
    {
      name: "preload-archivo",
      apply: "build",
      transformIndexHtml: {
        order: "post",
        handler(html, ctx) {
          const fonts = Object.keys(ctx.bundle ?? {}).filter((f) =>
            /archivo-latin(-ext)?-standard-normal-[\w-]+\.woff2$|instrument-serif-latin-400-(normal|italic)-[\w-]+\.woff2$/.test(f),
          );
          const tags = fonts
            .map((f) => `<link rel="preload" as="font" type="font/woff2" href="/${f}" crossorigin>`)
            .join("\n    ");
          return tags ? html.replace("</title>", `</title>\n    ${tags}`) : html;
        },
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    minify: "esbuild",
    sourcemap: false,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        entryFileNames: "assets/app-v20-[hash].js",
        chunkFileNames: "assets/chunk-[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
        manualChunks: {
          vendor: ["react", "react-dom"],
          firebase: ["firebase/app", "firebase/auth"],
        },
      },
    },
  },
});
