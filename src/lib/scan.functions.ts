import { createServerFn } from "@tanstack/react-start";
// zod/v4 (no "zod") porque zodOutputFormat del SDK de Anthropic tipa contra v4.
// zod 3.25+ expone ambos; este es el único archivo del proyecto que usa zod.
import { z } from "zod/v4";

const Input = z.object({
  company: z.string().trim().min(1).max(200),
  what: z.string().trim().min(1).max(1500),
  pain: z.string().trim().min(1).max(1500),
  lang: z.enum(["en", "es"]),
});

// El esquema que la API valida por nosotros. Se mantiene plano a propósito:
// los rangos (4 hallazgos, 2-5 automatizaciones, etc.) viven en el prompt y se
// acotan abajo, porque el subconjunto estricto de JSON Schema no garantiza
// respetar cada refinement de zod.
const ScanSchema = z.object({
  map: z.array(z.string()),
  findings: z.array(
    z.object({
      kind: z.string(),
      title: z.string(),
      detail: z.string(),
    }),
  ),
  blueprint: z.object({
    automations: z.number().int(),
    connections: z.number().int(),
    customSystems: z.number().int(),
    hoursMin: z.number().int(),
    hoursMax: z.number().int(),
  }),
  summary: z.string(),
});

export type ScanResult = z.infer<typeof ScanSchema>;

const MODEL = "claude-opus-5";

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, Number.isFinite(n) ? Math.round(n) : min));

export const runScan = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Input.parse(input))
  .handler(async ({ data }): Promise<ScanResult> => {
    // Import diferido: este archivo se empaqueta también para el cliente y el
    // SDK no debe viajar al navegador (ni la API key, obviamente).
    const [{ default: Anthropic }, { zodOutputFormat }] = await Promise.all([
      import("@anthropic-ai/sdk"),
      import("@anthropic-ai/sdk/helpers/zod"),
    ]);

    const apiKey = process.env["ANTHROPIC_API_KEY"];
    if (!apiKey) throw new Error("Missing ANTHROPIC_API_KEY");

    const language = data.lang === "es" ? "Spanish" : "English";

    const system = `You are SHIFT's operations analyst. SHIFT builds operating systems for businesses through AI, automation and custom software.
Given a short description of a company and its most painful process, produce a concise, specific, senior-level operational analysis.
Write all human-readable text in ${language}. Be concrete and industry-specific; never generic marketing language.

Shape of the answer:
- map: 6 to 8 short process step labels, 1-3 words each, in operational order.
- findings: exactly 4 items. "kind" must be one of "Manual bottleneck detected", "Automation opportunity", "AI opportunity" or "Custom software opportunity", translated to ${language}. "title" is a short phrase, "detail" is one sentence.
- blueprint: automations 2-5, connections 1-4, customSystems 0-2, and an hoursMin/hoursMax range of hours saved per month (hoursMin < hoursMax).
- summary: one sentence describing the shift this company would gain.`;

    const user = `Company / website: ${data.company}
What the company does: ${data.what}
Most painful process: ${data.pain}`;

    const client = new Anthropic({ apiKey });

    let parsed: ScanResult | null;
    try {
      const response = await client.messages.parse({
        model: MODEL,
        max_tokens: 16000,
        system,
        messages: [{ role: "user", content: user }],
        output_config: {
          effort: "medium",
          format: zodOutputFormat(ScanSchema),
        },
      });

      if (response.stop_reason === "refusal") {
        console.error("scan refused", response.stop_details);
        throw new Error("REFUSED");
      }

      parsed = response.parsed_output;
    } catch (error) {
      if (error instanceof Anthropic.AuthenticationError) {
        console.error("scan auth failed — revisa ANTHROPIC_API_KEY", error);
      } else if (error instanceof Anthropic.RateLimitError) {
        console.error("scan rate limited", error);
      } else {
        console.error("scan failed", error);
      }
      throw error;
    }

    if (!parsed) throw new Error("The model returned an unreadable response");

    // El modelo puede devolver el rango invertido; la UI lo pinta como
    // "hoursMin–hoursMax" sin revisarlo, así que se ordena aquí.
    const hoursA = clamp(parsed.blueprint.hoursMin, 0, 10000);
    const hoursB = clamp(parsed.blueprint.hoursMax, 0, 10000);

    const result: ScanResult = {
      map: parsed.map.slice(0, 8).map(String),
      findings: parsed.findings.slice(0, 4).map((f) => ({
        kind: String(f.kind),
        title: String(f.title),
        detail: String(f.detail),
      })),
      blueprint: {
        automations: clamp(parsed.blueprint.automations, 2, 5),
        connections: clamp(parsed.blueprint.connections, 1, 4),
        customSystems: clamp(parsed.blueprint.customSystems, 0, 2),
        hoursMin: Math.min(hoursA, hoursB),
        hoursMax: Math.max(hoursA, hoursB),
      },
      summary: String(parsed.summary),
    };

    // Guardar el lead es best-effort: si Supabase no está configurado todavía,
    // el scan igual se le entrega al visitante.
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      await supabaseAdmin.from("scans").insert({
        company: data.company,
        what: data.what,
        pain: data.pain,
        lang: data.lang,
        result,
      });
    } catch (e) {
      console.error("scan save failed", e);
    }

    return result;
  });
