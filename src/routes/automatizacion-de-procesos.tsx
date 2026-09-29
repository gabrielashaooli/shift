import { createFileRoute } from "@tanstack/react-router";

import { ServicePage, type ServiceContent } from "@/components/shift/ServicePage";

const title = "Automatización de procesos empresariales | SHIFT";
const description =
  "Automatizamos procesos de empresas en México: órdenes de compra, aprobaciones, reportes programados, lectura de documentos con inteligencia artificial y captura en campo desde el celular.";
const url = "https://shiftsoftware.com.mx/automatizacion-de-procesos";

export const Route = createFileRoute("/automatizacion-de-procesos")({
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
  label: "Automatización e inteligencia artificial",
  title: "El trabajo repetitivo lo hace el sistema.",
  intro: [
    "En casi toda empresa hay personas capaces dedicando horas a tareas que no requieren criterio: copiar datos de un correo a una hoja, armar el mismo reporte cada lunes, perseguir una aprobación por WhatsApp o capturar facturas que llegaron en PDF.",
    "Automatizamos esas tareas dentro de tu propio sistema. No vendemos una herramienta genérica que hay que adaptar: programamos el flujo tal como ocurre en tu operación, incluyendo las excepciones.",
  ],
  includes: [
    {
      title: "Órdenes de compra automáticas",
      line: "Cuando el inventario baja del mínimo, el sistema arma la orden con el proveedor correcto y la deja lista para autorizar.",
    },
    {
      title: "Aprobaciones con rastro",
      line: "Quién autorizó qué y cuándo, registrado. Se acaban las decisiones enterradas en conversaciones.",
    },
    {
      title: "Documentos leídos por IA",
      line: "Facturas, remisiones y contratos en PDF: el sistema extrae los datos y los escribe donde corresponde.",
    },
    {
      title: "Reportes programados",
      line: "El reporte que alguien arma cada semana llega solo, a la hora que definas, con los números del sistema.",
    },
    {
      title: "Captura en campo",
      line: "Formatos, fotos y evidencia desde el celular, incluso sin señal. La información sincroniza al recuperar conexión.",
    },
    {
      title: "Conexión entre sistemas",
      line: "Que lo que se registra en un lado aparezca en el otro, sin que alguien lo pase a mano.",
    },
  ],
  signals: [
    "Alguien dedica varias horas a la semana a copiar información de un lado a otro.",
    "Las aprobaciones se piden por WhatsApp y después nadie encuentra quién autorizó.",
    "El mismo reporte se arma manualmente cada semana o cada mes.",
    "Los datos de documentos en PDF se capturan a mano en el sistema.",
    "Cuando alguien se va de vacaciones, su proceso se detiene porque solo esa persona sabe hacerlo.",
  ],
  related: [
    { to: "/sistema-de-inventarios", label: "Sistema de inventarios" },
    { to: "/software-de-facturacion", label: "Software de facturación" },
    { to: "/software-a-la-medida-cdmx", label: "Software a la medida en CDMX" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Automatización de procesos empresariales",
  serviceType: "Automatización de procesos",
  description,
  url,
  areaServed: { "@type": "Country", name: "México" },
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
