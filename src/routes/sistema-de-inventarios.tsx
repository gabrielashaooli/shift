import { createFileRoute } from "@tanstack/react-router";

import { ServicePage, type ServiceContent } from "@/components/shift/ServicePage";

const title = "Sistema de inventarios a la medida | SHIFT";
const description =
  "Desarrollamos sistemas de inventario para empresas en México: existencias en tiempo real, entradas y salidas, múltiples almacenes, alertas de mínimos y captura desde el celular.";
const url = "https://shiftsoftware.com.mx/sistema-de-inventarios";

export const Route = createFileRoute("/sistema-de-inventarios")({
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
  label: "Sistemas de inventario",
  title: "Sistema de inventarios hecho para cómo trabaja tu empresa.",
  intro: [
    "El inventario deja de cuadrar cuando vive en varias hojas de cálculo que cada quien actualiza cuando puede. Se vende lo que ya no hay, se compra lo que sobra y nadie sabe con certeza qué existencia real hay hasta que alguien va a contar al almacén.",
    "Construimos el sistema de inventarios sobre tu operación, no sobre un modelo genérico: tus almacenes, tus unidades de medida, tus reglas de cuándo algo se aparta, se surte o se devuelve.",
  ],
  includes: [
    {
      title: "Existencias en tiempo real",
      line: "Cada entrada, salida y traspaso queda registrado al momento. Una sola cifra de existencia, visible para todo el equipo.",
    },
    {
      title: "Varios almacenes y sucursales",
      line: "Control por ubicación, traspasos entre almacenes y visibilidad consolidada de toda la empresa.",
    },
    {
      title: "Captura desde el celular",
      line: "Recepción, conteo y surtido desde el teléfono, con escaneo de códigos. Funciona aunque no haya señal y sincroniza después.",
    },
    {
      title: "Alertas de mínimos",
      line: "El sistema avisa antes de que se agote un artículo y puede generar la orden de compra al proveedor.",
    },
    {
      title: "Trazabilidad por folio o lote",
      line: "Saber dónde está cada pieza, quién la movió y cuándo. Útil para auditorías y para aclaraciones con clientes.",
    },
    {
      title: "Reportes de rotación",
      line: "Qué se mueve, qué está detenido y cuánto capital tienes parado en almacén.",
    },
  ],
  signals: [
    "El inventario del sistema no coincide con lo que hay físicamente en el almacén.",
    "Se venden productos que ya estaban agotados, y el cliente se entera después.",
    "Alguien dedica horas cada semana a consolidar existencias de varias sucursales.",
    "Las entradas se capturan dos veces: una en papel y otra al sistema.",
    "No hay forma rápida de saber cuánto dinero está detenido en mercancía sin rotación.",
  ],
  related: [
    { to: "/software-de-facturacion", label: "Software de facturación" },
    { to: "/automatizacion-de-procesos", label: "Automatización de procesos" },
    { to: "/software-a-la-medida-cdmx", label: "Software a la medida en CDMX" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Desarrollo de sistemas de inventario a la medida",
  serviceType: "Sistema de inventarios",
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
