import { motion } from "motion/react";

import { useT } from "@/lib/i18n";

export function Contrast() {
  const t = useT();

  return (
    <section id="problem" className="border-t border-border bg-surface py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <p className="mono-label">{t.baLabel}</p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="display-xl mt-8 max-w-4xl text-[7vw] md:text-[3.4vw]"
        >
          {t.baTitle}
        </motion.h2>

        <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-10">
          <span className="mono-label justify-self-end">{t.baBefore}</span>
          <span className="w-10 md:w-20" />
          <span className="mono-label text-signal">{t.baAfter}</span>
        </div>

        <div className="mt-6 border-t border-border">
          {t.contrast.map(([from, to, beforeLine, afterLine], i) => (
            <motion.div
              key={from}
              initial="rest"
              whileInView="shifted"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-border py-6 md:gap-10 md:py-8"
            >
              <motion.div
                variants={{
                  rest: { opacity: 1, x: 0 },
                  shifted: { opacity: 0.4, x: -14 },
                }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="text-right"
              >
                <span className="display-xl inline-block text-[5vw] text-muted-foreground md:text-[2.2vw]">
                  <span className="relative inline-block">
                    {from}
                    <motion.span
                      aria-hidden
                      variants={{ rest: { scaleX: 0 }, shifted: { scaleX: 1 } }}
                      transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                      className="absolute top-1/2 right-0 left-0 h-[2px] origin-left bg-muted-foreground/60"
                    />
                  </span>
                </span>
                <p className="mt-2 text-sm text-muted-foreground">{beforeLine}</p>
              </motion.div>

              <span className="relative flex h-[2px] w-10 items-center md:w-20">
                <motion.span
                  variants={{ rest: { scaleX: 0 }, shifted: { scaleX: 1 } }}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.12 }}
                  className="h-[2px] w-full origin-left bg-signal"
                />
              </span>

              <motion.div
                variants={{ rest: { opacity: 0, x: -18 }, shifted: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.6, delay: 0.42 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="display-xl text-[5vw] md:text-[2.2vw]">{to}</span>
                <p className="mt-2 text-sm text-muted-foreground">{afterLine}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
