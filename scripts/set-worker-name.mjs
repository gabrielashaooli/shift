// Ajusta el wrangler.json que genera nitro:
//  - Nombre del Worker: nitro lo deriva del repo y el deploy crearía uno nuevo
//    en vez de actualizar el Worker "shift" que ya existe en Cloudflare.
//  - Conexión con Workers AI, que es la que corre el Intelligence Scan.
//  - Rutas del dominio: el dominio estaba servido por un proyecto de Pages sin
//    acceso a la IA; con estas rutas lo atiende el Worker.
//  - workers.dev y preview_urls: sin declararlos, el deploy los desactiva y
//    las URLs de vista previa de cada rama dejan de responder.
import { readFile, writeFile } from "node:fs/promises";

const WORKER_NAME = "shift";
const CONFIG = ".output/server/wrangler.json";
const ZONE = "shiftsoftware.com.mx";

const raw = await readFile(CONFIG, "utf8").catch(() => {
  throw new Error(`No se encontró ${CONFIG}. ¿Corrió "vite build" antes?`);
});

const config = JSON.parse(raw);

config.name = WORKER_NAME;
config.ai = { binding: "AI" };
config.routes = [
  { pattern: `${ZONE}/*`, zone_name: ZONE },
  { pattern: `www.${ZONE}/*`, zone_name: ZONE },
];
config.workers_dev = true;
config.preview_urls = true;
// Sin esto, Cloudflare redirige /archivo.html a /archivo, y el verificador de
// Google pide que su archivo responda 200 en la ruta exacta.
config.assets = { ...(config.assets ?? {}), html_handling: "none" };

await writeFile(CONFIG, `${JSON.stringify(config, null, 2)}\n`);
console.log(`[worker-config] "${WORKER_NAME}" con IA, rutas de ${ZONE} y vistas previa activas`);
