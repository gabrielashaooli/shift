import { createFileRoute } from "@tanstack/react-router";

import { ServicePage, type ServiceContent } from "@/components/shift/ServicePage";

const title = "Software de facturación a la medida | SHIFT";
const description =
  "Sistemas de facturación para empresas en México: emisión y control de comprobantes, lectura de facturas de proveedores con inteligencia artificial, conciliación y reportes.";
const url = "https://shiftsoftware.com.mx/software-de-facturacion";

export const Route = createFileRoute("/software-de-facturacion")({
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
  label: "Facturación y cobranza",
  title: "Software de facturación conectado a tu operación.",
  intro: [
    "Facturar no es el problema: el problema es todo lo que pasa alrededor. Capturar a mano lo que ya estaba en un pedido, perseguir comprobantes de proveedores, cuadrar pagos contra facturas y armar el reporte de cobranza revisando correos uno por uno.",
    "Construimos el sistema que conecta esas piezas: lo que se vendió, lo que se facturó y lo que se cobró viven en el mismo lugar, sin volver a escribir los datos.",
  ],
  includes: [
    {
      title: "De pedido a factura, sin recapturar",
      line: "La factura se genera desde el pedido que ya existe en el sistema. Menos errores de dedo y menos notas de crédito.",
    },
    {
      title: "Facturas de proveedores leídas por IA",
      line: "El sistema lee el PDF, extrae proveedor, RFC, fechas e importes, y los deja listos para revisión.",
    },
    {
      title: "Conciliación de pagos",
      line: "Cruce entre lo facturado y lo depositado, con las diferencias señaladas para que alguien las revise.",
    },
    {
      title: "Estado de cuenta por cliente",
      line: "Qué debe cada cliente, desde cuándo, y qué ya se le cobró. Sin armar el reporte a mano.",
    },
    {
      title: "Recordatorios automáticos",
      line: "Avisos de vencimiento al cliente y alertas internas cuando una factura lleva demasiado tiempo sin pago.",
    },
    {
      title: "Reportes para contabilidad",
      line: "La información en el formato que tu contador necesita, exportable cuando la pida.",
    },
  ],
  signals: [
    "Los datos de un pedido se vuelven a teclear para poder facturar.",
    "La cobranza se revisa abriendo correos y buscando comprobantes en carpetas.",
    "Nadie sabe con certeza cuánto se debe cobrar este mes sin armar un reporte manual.",
    "Las facturas de proveedores se capturan a mano, una por una.",
    "Cuadrar pagos contra facturas toma días al cierre de mes.",
  ],
  related: [
    { to: "/sistema-de-inventarios", label: "Sistema de inventarios" },
    { to: "/automatizacion-de-procesos", label: "Automatización de procesos" },
    { to: "/software-a-la-medida-cdmx", label: "Software a la medida en CDMX" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Desarrollo de software de facturación a la medida",
  serviceType: "Software de facturación",
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
