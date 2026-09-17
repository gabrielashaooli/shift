import { motion } from "motion/react";

import { useT } from "@/lib/i18n";

export function Systems() {
  const t = useT();

  return (
    <section id="systems" className="border-t border-border py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <p className="mono-label">{t.proofLabel}</p>
        <h2 className="display-xl mt-6 max-w-3xl text-[5vw] md:text-[2.6vw]">{t.proofTitle}</h2>

        <div className="mt-16 grid grid-cols-[minmax(0,1fr)] gap-px border border-border bg-border md:grid-cols-3">
          {t.proof.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col bg-background p-6 md:p-8"
            >
              <p className="display-xl text-[9vw] leading-[0.95] break-words md:text-[3vw]">
                {p.figure}
              </p>
              <p className="mono-label mt-3 text-signal">{p.figureNote}</p>

              <h3 className="display-xl mt-10 text-2xl md:text-3xl">{p.name}</h3>
              <p className="mt-4 text-muted-foreground">{p.line}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
