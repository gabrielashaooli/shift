import { createFileRoute } from "@tanstack/react-router";

import { ServicePage, type ServiceContent } from "@/components/shift/ServicePage";

const title = "Desarrollo de software a la medida en CDMX | SHIFT";
const description =
  "Desarrollo de software a la medida en Ciudad de México: sistemas internos, aplicaciones para operación en campo, integración y reemplazo de sistemas heredados sin detener la operación.";
const url = "https://shiftsoftware.com.mx/software-a-la-medida-cdmx";

export const Route = createFileRoute("/software-a-la-medida-cdmx")({
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

const content: ServiceContent = {
  label: "Desarrollo a la medida · Ciudad de México",
  title: "Software construido para tu empresa, no adaptado a la fuerza.",
  intro: [
    "Los sistemas comerciales resuelven el caso promedio. El problema es que ninguna operación real es promedio: siempre hay un cliente que se factura distinto, un permiso que solo cierta persona da o un proceso que la empresa hace mejor que nadie y por eso vende.",
    "Desarrollamos desde Ciudad de México sistemas internos hechos para cómo trabaja tu empresa, con sus excepciones incluidas. Atendemos clientes en todo México.",
  ],
  includes: [
    {
      title: "Sistemas internos completos",
      line: "La plataforma que hoy vive repartida entre hojas de cálculo: operación diaria, catálogos, permisos por rol y reportes en vivo.",
    },
    {
      title: "Aplicaciones para campo",
      line: "Para equipos que trabajan fuera de la oficina: captura desde el celular, evidencia fotográfica y funcionamiento sin señal.",
    },
    {
      title: "Reemplazo de sistemas heredados",
      line: "Migramos la información histórica y operamos ambos sistemas en paralelo hasta que el nuevo esté probado. Sin apagones.",
    },
    {
      title: "Integración entre plataformas",
      line: "Conectamos lo que ya usas para que la información deje de pasarse a mano de un sistema a otro.",
    },
    {
      title: "Portal para tus clientes",
      line: "Para que consulten sus pedidos, documentos o estatus sin tener que llamar y preguntar.",
    },
    {
      title: "Capacitación e implementación",
      line: "Acompañamos la puesta en marcha con el equipo que va a usar el sistema todos los días.",
    },
  ],
  signals: [
    "El sistema que compraron no hace lo que la empresa realmente necesita, y lo van resolviendo con Excel aparte.",
    "La operación depende de archivos que solo una persona sabe mantener.",
    "El sistema actual es tan viejo que nadie quiere tocarlo por miedo a romperlo.",
    "Cada área tiene su propia herramienta y los datos no coinciden entre ellas.",
    "Crecer significa contratar más gente para capturar, no vender más con la misma estructura.",
  ],
  related: [
    { to: "/sistema-de-inventarios", label: "Sistema de inventarios" },
    { to: "/software-de-facturacion", label: "Software de facturación" },
    { to: "/automatizacion-de-procesos", label: "Automatización de procesos" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Desarrollo de software a la medida",
  serviceType: "Desarrollo de software a la medida",
  description,
  url,
  areaServed: [
    { "@type": "City", name: "Ciudad de México" },
    { "@type": "Country", name: "México" },
  ],
  provider: { "@type": "Organization", name: "ShiftSoftware", url: "https://shiftsoftware.com.mx/" },
};

function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ServicePage content={content} />
    </>
  );
}
