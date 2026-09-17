// Nitro deriva el nombre del Worker del repo/package y la config de vite no
// expone esa opción, así que se corrige después del build para que el deploy
// caiga en el Worker "shift" que ya existe en Cloudflare y no cree uno nuevo.
import { readFile, writeFile } from "node:fs/promises";

const WORKER_NAME = "shift";
const CONFIG = ".output/server/wrangler.json";

const raw = await readFile(CONFIG, "utf8").catch(() => {
  throw new Error(`No se encontró ${CONFIG}. ¿Corrió "vite build" antes?`);
});

const config = JSON.parse(raw);
if (config.name === WORKER_NAME) {
  console.log(`[worker-name] ya era "${WORKER_NAME}"`);
} else {
  const previous = config.name;
  config.name = WORKER_NAME;
  await writeFile(CONFIG, `${JSON.stringify(config, null, 2)}\n`);
  console.log(`[worker-name] "${previous}" -> "${WORKER_NAME}"`);
}
