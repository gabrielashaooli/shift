// Aislado en un .server.ts para poder importar "cloudflare:workers" de forma
// estática: el runtime del Worker no resuelve imports dinámicos de sus módulos
// internos. scan.functions.ts carga este archivo con import() dentro del
// handler, que sí es válido por ser un módulo local del bundle.
import { env } from "cloudflare:workers";

// Gratis, incluido en Cloudflare. Es de los pocos modelos de Workers AI con
// modo JSON, que permite validar la respuesta contra un esquema.
const MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";

type Schema = Record<string, unknown>;

function parseResponse(response: unknown): unknown {
  if (typeof response !== "string") return response;
  try {
    return JSON.parse(response);
  } catch {
    // Algún modelo envuelve el JSON en prosa o en un bloque de código.
    const start = response.indexOf("{");
    const end = response.lastIndexOf("}");
    if (start < 0 || end <= start) throw new Error("La respuesta no traía JSON");
    return JSON.parse(response.slice(start, end + 1));
  }
}

export async function runOnWorkersAI(
  system: string,
  user: string,
  jsonSchema: Schema,
): Promise<unknown> {
  if (!env.AI) throw new Error("Falta la conexión AI del Worker");

  const messages = [
    { role: "system", content: system },
    { role: "user", content: user },
  ];

  try {
    const out = await env.AI.run(MODEL, {
      messages,
      max_tokens: 2048,
      response_format: { type: "json_schema", json_schema: jsonSchema },
    });
    return parseResponse(out.response);
  } catch (error) {
    // Si el modelo rechaza el esquema, se reintenta pidiendo el JSON en el
    // prompt y validando después, que es igual de seguro pero más tolerante.
    console.error("scan: falló el modo JSON, reintentando sin esquema", error);
    const out = await env.AI.run(MODEL, { messages, max_tokens: 2048 });
    return parseResponse(out.response);
  }
}
