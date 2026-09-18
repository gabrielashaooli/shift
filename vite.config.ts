import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  resolve: {
    // Una sola copia de React y del runtime de TanStack en el bundle: con dos,
    // la instancia que envía la llamada al servidor no es la que procesa la
    // respuesta, y la promesa termina sin datos y sin error.
    dedupe: [
      "react",
      "react-dom",
      "@tanstack/react-router",
      "@tanstack/react-start",
      "@tanstack/react-query",
      "seroval",
    ],
  },
  build: {
    rolldownOptions: {
      // Los módulos cloudflare:* los provee el runtime del Worker, no el bundle.
      external: [/^cloudflare:/],
    },
  },
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    // server.entry apunta a src/server.ts, el wrapper SSR que captura errores.
    // nitro construye a partir de ahí.
    tanstackStart({ server: { entry: "server" } }),
    viteReact(),
    // Sin preset explícito nitro usa node-server y no emite el wrangler.json
    // que necesita el deploy a Cloudflare Workers.
    nitro({ preset: "cloudflare-module" }),
  ],
});
