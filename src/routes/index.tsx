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

function Index() {
  return (
    <LangProvider>
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
