import { createFileRoute } from "@tanstack/react-router";

import { Capabilities } from "@/components/shift/Capabilities";
import { Contrast } from "@/components/shift/Contrast";
import { FinalCta } from "@/components/shift/FinalCta";
import { Process } from "@/components/shift/Process";
import { Ticker } from "@/components/shift/Ticker";
import { Hero } from "@/components/shift/Hero";
import { Nav } from "@/components/shift/Nav";
import { Scan } from "@/components/shift/Scan";
import { Systems } from "@/components/shift/Systems";
import { Trust } from "@/components/shift/Trust";
import { LangProvider } from "@/lib/i18n";

const title = "SHIFT — We build a working demo of your process before you pay";
const description =
  "Custom internal systems, apps, AI automation and ERP replacement, built on your operation. Run the SHIFT Intelligence Scan and get a process map, findings and a blueprint.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LangProvider>
      <Nav />
      <main>
        <Hero />
        <Ticker />
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
