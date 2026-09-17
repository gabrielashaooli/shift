import { motion } from "motion/react";

import { useT } from "@/lib/i18n";

export function Capabilities() {
  const t = useT();

  return (
    <section
      id="capabilities"
      className="overflow-hidden border-t border-border py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <p className="mono-label">{t.capLabel}</p>

        <div className="mt-16 space-y-24 md:space-y-36">
          {t.caps.map((cap, i) => (
            <motion.div
              key={cap.word}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.6 }}
              className="grid gap-8 md:grid-cols-[1.15fr_1fr] md:items-end"
            >
              <div className="min-w-0">
                <span className="mono-label">0{i + 1}</span>
                <h3 className="display-xl mt-4 leading-[0.82] tracking-normal">
                  <motion.span
                    initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block max-w-full whitespace-nowrap"
                    style={{
                      fontSize: `clamp(2rem, ${Math.min(56 / cap.word.length, 11)}vw, 5rem)`,
                    }}
                  >
                    {cap.word}
                  </motion.span>
                </h3>

              </div>
              <div>
                <p className="text-lg text-muted-foreground">{cap.line}</p>
                <ul className="mt-6 border-t border-border">
                  {cap.items.map((item) => (
                    <li
                      key={item}
                      className="border-b border-border py-3 font-mono text-xs tracking-widest uppercase"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
