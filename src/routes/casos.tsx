import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/shift/SiteHeader";

const title = "Casos: sistemas a la medida en operación | SHIFT";
const description =
  "Tres sistemas construidos por SHIFT y en uso hoy: automatización de pedidos entre sucursales, reemplazo de un sistema de administración inmobiliaria y rastreo de muestras físicas.";
const url = "https://shiftsoftware.com.mx/casos";

export const Route = createFileRoute("/casos")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_MX" },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: Page,
});

// Los tres sistemas que SHIFT tiene en operación. Los datos salen de lo que
// ya publicaba el sitio; no se agregan cifras que no estén verificadas.
const cases = [
  {
    system: "SINAI",
    kind: "Automatización de pedidos",
    figure: "30 min",
    figureNote: "por ciclo semanal de pedidos, antes un día completo",
    before:
      "Cada semana había que juntar a mano las solicitudes de cuatro sucursales, consolidarlas y armar desde ahí los pedidos a proveedores. El proceso ocupaba un día entero y cualquier solicitud que llegara tarde obligaba a rehacer la consolidación.",
    built:
      "Una sola vista semanal donde las cuatro sucursales registran lo que necesitan. Desde esa vista se generan los pedidos a proveedores, ya agrupados y sin recapturar nada.",
    result:
      "El ciclo semanal pasó de un día a treinta minutos, y las solicitudes dejaron de perderse entre correos y mensajes.",
  },
  {
    system: "VIDARQ",
    kind: "Administración inmobiliaria",
    figure: "Sistema anterior → plataforma",
    figureNote: "reemplazado sin detener la operación",
    before:
      "La administración corría sobre un sistema anterior que ya no daba para más, con documentos y pagos resueltos por fuera. Cambiarlo implicaba el riesgo de dejar la operación parada durante la transición.",
    built:
      "Una plataforma que concentra obras, clientes y proveedores, con pagos digitales y generación automática de documentos. La migración se hizo con los dos sistemas corriendo en paralelo hasta que el nuevo quedó probado.",
    result:
      "El sistema anterior se reemplazó por completo sin un solo día de operación detenida.",
  },
  {
    system: "TAG · Muestras",
    kind: "Rastreo de muestras físicas",
    figure: "158",
    figureNote: "muestras físicas rastreadas",
    before:
      "El control de muestras vivía repartido entre Smartsheet, conversaciones de WhatsApp y etiquetas escritas a mano. Saber dónde estaba una muestra concreta implicaba preguntar.",
    built:
      "Una plataforma con máquina de estados —cada muestra avanza por etapas definidas—, folios automáticos e impresión de etiquetas desde el mismo sistema.",
    result:
      "158 muestras rastreadas en una sola herramienta, con historial de por dónde pasó cada una y quién la movió.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Casos de SHIFT",
  description,
  url,
  about: cases.map((c) => ({
    "@type": "CreativeWork",
    name: `${c.system} — ${c.kind}`,
    abstract: c.result,
  })),
};

function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main>
        <section className="pt-40 pb-16 md:pt-52 md:pb-20">
          <div className="mx-auto max-w-[1100px] px-6 md:px-10">
            <p className="mono-label">Casos</p>
            <h1 className="display-xl mt-8 max-w-3xl text-[1.9rem] leading-[1.15] sm:text-[2.4rem] md:text-[3rem]">
              Tres sistemas construidos sobre operaciones reales.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              No son prototipos ni demostraciones: son sistemas que empresas usan hoy para operar todos
              los días.
            </p>
          </div>
        </section>

        {cases.map((c) => (
          <section key={c.system} className="border-t border-border py-16 md:py-24">
            <div className="mx-auto max-w-[1100px] px-6 md:px-10">
              <div className="grid gap-12 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16">
                <div>
                  <p className="mono-label">{c.kind}</p>
                  <h2 className="display-xl mt-4 text-[1.5rem] md:text-[1.9rem]">{c.system}</h2>
                  <p className="display-xl mt-8 text-[2rem] leading-tight md:text-[2.4rem]">{c.figure}</p>
                  <p className="mono-label mt-2">{c.figureNote}</p>
                </div>

                <div className="space-y-8">
                  <div>
                    <p className="mono-label">Cómo estaba antes</p>
                    <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{c.before}</p>
                  </div>
                  <div>
                    <p className="mono-label">Qué construimos</p>
                    <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{c.built}</p>
                  </div>
                  <div>
                    <p className="mono-label">Qué cambió</p>
                    <p className="mt-3 text-lg leading-relaxed">{c.result}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="border-t border-border py-16 md:py-24">
          <div className="mx-auto max-w-[1100px] px-6 md:px-10">
            <h2 className="display-xl max-w-2xl text-[1.6rem] md:text-[2.1rem]">
              ¿Tu operación se parece a alguno de estos?
            </h2>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              <a
                href="https://wa.me/525510807509"
                target="_blank"
                rel="noreferrer"
                className="border-b border-foreground pb-1 text-[0.9375rem] transition-colors hover:border-signal hover:text-signal"
              >
                Escríbenos por WhatsApp
              </a>
              <a
                href="mailto:info@shiftsoftware.com.mx"
                className="border-b border-border pb-1 text-[0.9375rem] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                info@shiftsoftware.com.mx
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
