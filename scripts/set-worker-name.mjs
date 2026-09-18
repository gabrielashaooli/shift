// Ajusta el wrangler.json que genera nitro:
//  - El nombre del Worker: nitro lo deriva del repo y el deploy crearía uno
//    nuevo en vez de actualizar el Worker "shift" que ya existe en Cloudflare.
//  - La conexión con Workers AI, que es la que corre el Intelligence Scan.
import { readFile, writeFile } from "node:fs/promises";

const WORKER_NAME = "shift";
const CONFIG = ".output/server/wrangler.json";

const raw = await readFile(CONFIG, "utf8").catch(() => {
  throw new Error(`No se encontró ${CONFIG}. ¿Corrió "vite build" antes?`);
});

const config = JSON.parse(raw);
const changes = [];

if (config.name !== WORKER_NAME) {
  changes.push(`nombre "${config.name}" -> "${WORKER_NAME}"`);
  config.name = WORKER_NAME;
}

if (config.ai?.binding !== "AI") {
  config.ai = { binding: "AI" };
  changes.push("conexión AI agregada");
}

if (changes.length === 0) {
  console.log("[worker-config] sin cambios");
} else {
  await writeFile(CONFIG, `${JSON.stringify(config, null, 2)}\n`);
  console.log(`[worker-config] ${changes.join(", ")}`);
}
