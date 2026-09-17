import { motion } from "motion/react";

import { useT } from "@/lib/i18n";

export function Process() {
  const t = useT();

  return (
    <section className="border-t border-border py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <p className="mono-label">{t.processLabel}</p>
        <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-4">
          {t.process.map(([step, line], i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="bg-background p-6 md:p-8"
            >
              <span className="mono-label text-signal">0{i + 1}</span>
              <h3 className="display-xl mt-4 text-xl md:text-2xl">{step}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{line}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
