import { createFileRoute } from "@tanstack/react-router";

import { Capabilities } from "@/components/shift/Capabilities";
import { Contrast } from "@/components/shift/Contrast";
import { FinalCta } from "@/components/shift/FinalCta";
import { Process } from "@/components/shift/Process";
import { Hero } from "@/components/shift/Hero";
import { Nav } from "@/components/shift/Nav";
import { Scan } from "@/components/shift/Scan";
import { Systems } from "@/components/shift/Systems";
import { Trust } from "@/components/shift/Trust";
import { LangProvider } from "@/lib/i18n";

// El mercado es México: el título y la descripción que ve Google van en
// español y nombran lo que la gente busca, no el eslogan interno.
const title = "SHIFT · Software y sistemas a la medida en México";
const description =
  "Desarrollamos sistemas a la medida, apps y automatización para empresas en México: pedidos, inventarios, facturación y reportes. Te mostramos una demo funcional de tu proceso antes de que pagues.";
const url = "https://shiftsoftware.com.mx/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:locale", content: "es_MX" },
      { property: "og:site_name", content: "SHIFT" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: Index,
});

// Datos estructurados: conectan el sitio con el Perfil de Empresa para que
// Google trate ambos como el mismo negocio. Los datos coinciden con los del
// perfil (nombre, teléfono y ubicación); no se inventa nada que no esté ahí.
const mapsUrl =
  "https://www.google.com/maps/place/ShiftSoftware/@19.3873751,-99.252799,17z/data=!4m6!3m5!1s0x85d2013f8cfbfb2f:0x8620397e91400076!8m2!3d19.3873751!4d-99.252799!16s%2Fg%2F11nk68nj56";

const organization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ShiftSoftware",
  alternateName: "SHIFT",
  url,
  description,
  email: "info@shiftsoftware.com.mx",
  telephone: "+525510807509",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cuajimalpa de Morelos",
    addressRegion: "CDMX",
    postalCode: "05100",
    addressCountry: "MX",
  },
  geo: { "@type": "GeoCoordinates", latitude: 19.3873751, longitude: -99.252799 },
  hasMap: mapsUrl,
  sameAs: [mapsUrl],
  areaServed: { "@type": "Country", name: "México" },
  knowsLanguage: ["es-MX", "en"],
};

function Index() {
  return (
    <LangProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <Nav />
      <main>
        <Hero />
        <Capabilities />
        <Contrast />
        <Process />
        <Scan />
        <Systems />
        <Trust />
        <FinalCta />
      </main>
    </LangProvider>
  );
}
