import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/shift/SiteHeader";

const title = "Preguntas frecuentes sobre desarrollo de software a la medida | SHIFT";
const description =
  "Cuánto cuesta y cuánto tarda un sistema a la medida, qué pasa con el sistema que ya tienes, cómo se migra la información y cómo trabaja SHIFT con empresas en México.";
const url = "https://shiftsoftware.com.mx/preguntas-frecuentes";

export const Route = createFileRoute("/preguntas-frecuentes")({
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

// Respuestas directas y verificables. Son las que buscadores y asistentes
// citan textualmente, así que se escriben para responder, no para vender.
const faqs: { q: string; a: string }[] = [
  {
    q: "¿Qué tipo de sistemas desarrolla SHIFT?",
    a: "Sistemas internos para la operación de una empresa: control de inventarios, pedidos, facturación y cobranza, reportes, portales para clientes y aplicaciones para equipos que trabajan en campo. También automatización de procesos y lectura de documentos con inteligencia artificial. Todo se programa alrededor del proceso del cliente, en vez de adaptar un software comercial.",
  },
  {
    q: "¿Cuánto cuesta un sistema a la medida?",
    a: "Depende del alcance, por eso el precio se define después de revisar la operación y se cierra por proyecto, no por hora. Antes de cotizar se identifica qué procesos se van a resolver y en qué orden, para que el primer entregable sea el que más tiempo libera.",
  },
  {
    q: "¿Cuánto tarda en estar listo?",
    a: "Varía según el alcance. El enfoque es entregar primero el proceso más crítico funcionando, y de ahí seguir por etapas, en lugar de esperar meses hasta tener el sistema completo. Así la empresa empieza a usarlo mientras el resto se construye.",
  },
  {
    q: "¿Puedo ver algo funcionando antes de contratar?",
    a: "Sí. SHIFT construye una versión funcional del proceso que más duele, con el caso real de la empresa, para que el cliente la pruebe antes de comprometerse. No es una presentación ni un diseño: es el sistema corriendo.",
  },
  {
    q: "¿Qué pasa con el sistema que ya tengo?",
    a: "Se puede reemplazar sin detener la operación. Se migra la información histórica y los dos sistemas corren en paralelo hasta que el nuevo está probado, de modo que no haya un día sin poder facturar, surtir o cobrar.",
  },
  {
    q: "¿Trabajan con empresas fuera de la Ciudad de México?",
    a: "Sí. SHIFT tiene sede en Ciudad de México y atiende empresas en toda la República Mexicana. El trabajo se coordina de forma remota y presencial según lo requiera el proyecto.",
  },
  {
    q: "¿Qué significa automatizar un proceso con inteligencia artificial?",
    a: "En la práctica, que el software haga el trabajo de lectura y captura que hoy hace una persona: leer facturas o remisiones en PDF y extraer proveedor, fechas e importes; clasificar correos y solicitudes; transcribir llamadas; o sacar datos de conversaciones de WhatsApp para escribirlos en el sistema. No reemplaza el criterio de nadie, elimina la transcripción manual.",
  },
  {
    q: "¿Quién construye los sistemas?",
    a: "Sofía y Gabriela, las fundadoras, diseñan y programan cada sistema. No hay relevos entre quien tiene la conversación con el cliente y quien escribe el código.",
  },
  {
    q: "¿En qué se diferencia de comprar un software ya hecho?",
    a: "Un software comercial resuelve el caso promedio y obliga a la empresa a adaptarse a él; las excepciones terminan resolviéndose en hojas de cálculo aparte. Un sistema a la medida se construye sobre el proceso real, incluidas esas excepciones, que muchas veces son justo lo que distingue a la empresa.",
  },
  {
    q: "¿Cómo empieza un proyecto?",
    a: "Con una conversación sobre la operación: dónde se pierden horas y en qué se atora el equipo. De ahí sale qué se automatiza, qué se conecta y qué hay que construir. El contacto es info@shiftsoftware.com.mx o WhatsApp al 55 1080 7509.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
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
            <p className="mono-label">Preguntas frecuentes</p>
            <h1 className="display-xl mt-8 max-w-3xl text-[1.9rem] leading-[1.15] sm:text-[2.4rem] md:text-[3rem]">
              Lo que preguntan las empresas antes de construir su sistema.
            </h1>
          </div>
        </section>

        <section className="border-t border-border py-16 md:py-24">
          <div className="mx-auto max-w-[1100px] px-6 md:px-10">
            <dl className="max-w-3xl divide-y divide-border">
              {faqs.map((f) => (
                <div key={f.q} className="py-8 first:pt-0">
                  <dt className="display-xl text-[1.15rem] md:text-[1.35rem]">{f.q}</dt>
                  <dd className="mt-4 text-lg leading-relaxed text-muted-foreground">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="border-t border-border py-16 md:py-24">
          <div className="mx-auto max-w-[1100px] px-6 md:px-10">
            <p className="mono-label">Servicios</p>
            <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              {[
                ["/software-a-la-medida-cdmx", "Software a la medida en CDMX"],
                ["/sistema-de-inventarios", "Sistema de inventarios"],
                ["/software-de-facturacion", "Software de facturación"],
                ["/automatizacion-de-procesos", "Automatización de procesos"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-[0.9375rem] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
