import { motion, useReducedMotion } from "motion/react";

import { useT } from "@/lib/i18n";

export function Hero() {
  const t = useT();
  const reduced = useReducedMotion();

  // Una sola entrada suave, sin secuencias ni bucles: el contenido está desde
  // el primer segundo, que es lo que espera alguien que llega a leer.
  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="top" className="pt-40 pb-24 md:pt-56 md:pb-36">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <motion.p {...enter(0)} className="mono-label">
          {t.heroKicker}
        </motion.p>

        <motion.h1
          {...enter(0.06)}
          className="display-xl mt-8 max-w-3xl text-[2rem] leading-[1.12] sm:text-[2.6rem] md:text-[3.4rem]"
        >
          {t.heroTitle}
        </motion.h1>

        <motion.p
          {...enter(0.12)}
          className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
        >
          {t.heroSub}
        </motion.p>

        <motion.div {...enter(0.18)} className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href="#scan"
            className="group inline-flex items-center gap-2 border-b border-foreground pb-1 text-[0.9375rem] transition-colors hover:border-signal hover:text-signal"
          >
            {t.heroCta}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#systems"
            className="text-[0.9375rem] text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.heroCta2}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
