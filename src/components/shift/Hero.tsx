import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { useT } from "@/lib/i18n";




const positions: [number, number][] = [
  [8, 18],
  [72, 12],
  [24, 68],
  [58, 74],
  [14, 44],
  [80, 52],
  [40, 22],
  [66, 34],
  [30, 86],
  [86, 80],
  [50, 52],
  [4, 76],
];

const systemPositions: [number, number][] = [
  [14, 24], [38, 24], [62, 24], [86, 24],
  [14, 50], [38, 50], [62, 50], [86, 50],
  [14, 76], [38, 76], [62, 76], [86, 76],
];

export function Hero() {
  const t = useT();
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(reduced ? 3 : 0);

  useEffect(() => {
    if (reduced) return;
    if (phase >= 3) {
      // Hold the settled hero, then replay the intro sequence.
      const restart = setTimeout(() => setPhase(0), 12000);
      return () => clearTimeout(restart);
    }
    const dwell = phase === 0 ? 3400 : phase === 1 ? 3200 : 3000;
    const timer = setTimeout(() => setPhase(phase + 1), dwell);
    return () => clearTimeout(timer);
  }, [phase, reduced]);

  const connected = phase >= 1;

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-16">
      {/* Scattered business signals resolve into one legible operating system. */}
      <motion.div
        aria-hidden
        className="hero-system-grid pointer-events-none absolute inset-0"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: phase >= 3 ? 0.22 : phase >= 1 ? 1 : 0.4, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      />

      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {[24, 50, 76].map((y, row) => (
          <motion.path
            key={`row-${y}`}
            d={`M 14 ${y} H 86`}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.12"
            vectorEffect="non-scaling-stroke"
            className="text-foreground/25"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: connected ? 1 : 0, opacity: phase >= 3 ? 0.12 : connected ? 1 : 0 }}
            transition={{ duration: 1.1, delay: row * 0.14, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
        {[14, 38, 62, 86].map((x, column) => (
          <motion.path
            key={`column-${x}`}
            d={`M ${x} 24 V 76`}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.12"
            vectorEffect="non-scaling-stroke"
            className="text-foreground/25"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: phase >= 2 ? 1 : 0, opacity: phase >= 3 ? 0.12 : phase >= 2 ? 1 : 0 }}
            transition={{ duration: 0.9, delay: column * 0.1, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </svg>

      {/* what we do field (desktop only: on mobile it clutters the hero) */}
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
        {t.heroFragments.map((f: string, i: number) => {
          const [x, y] = positions[i] ?? ([50, 50] as [number, number]);
          const [cx, cy] = systemPositions[i] ?? ([50, 50] as [number, number]);
          return (
            <motion.span
              key={f}
              initial={{ opacity: 0 }}
              animate={{
                opacity: phase >= 3 ? 0.1 : connected ? 0.78 : [0, 0.9, 0.25, 0.8],
                left: `${connected ? cx : x}%`,
                top: `${connected ? cy : y}%`,
                scale: connected ? 1 : 0.94,
              }}
              transition={{
                duration: connected ? 1.1 : 0.9,
                delay: connected ? i * 0.03 : i * 0.08,
                ease: "easeOut",
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 border border-foreground/25 bg-background px-2 py-1 font-mono text-[9px] tracking-widest whitespace-nowrap text-foreground uppercase"
            >
              {f}
            </motion.span>
          );
        })}
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1400px] flex-col justify-center px-5 md:px-10">
        <AnimatePresence mode="wait">
          {phase < 3 ? (
            <motion.p
              key={phase}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45 }}
              className="display-xl max-w-4xl text-[5vw] md:whitespace-nowrap md:text-[3.2vw]"
            >
              {phase === 0 ? t.heroSeq1 : phase === 1 ? t.heroSeq2 : t.heroSeq3}
            </motion.p>
          ) : (
            <motion.div
              key="settled"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center text-center"
            >
              <motion.p
                className="mono-label md:whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {t.heroKicker}
              </motion.p>

              <div className="mt-6 flex justify-center overflow-hidden">
                {"SHIFT".split("").map((letter, i) => (
                  <motion.span
                    key={letter + i}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="display-xl text-[14vw] leading-[0.85] md:text-[10vw]"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="display-xl mt-8 max-w-5xl text-[5.5vw] md:text-[2.8vw]"
              >
                {t.heroTitle}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.62, duration: 0.6 }}
                className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl"
              >
                {t.heroSub}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="mono-label mt-6"
              >
                {t.heroServices}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.74, duration: 0.6 }}
                className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-5"
              >
                <a
                  href="#scan"
                  className="group inline-flex items-center gap-3 border-b-2 border-signal pb-2 font-mono text-[11px] tracking-widest uppercase transition-colors hover:text-signal"
                >
                  {t.heroCta}
                  <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </a>
                <a
                  href="#systems"
                  className="group inline-flex items-center gap-3 border-b border-foreground pb-2 font-mono text-[11px] tracking-widest uppercase transition-colors hover:text-signal"
                >
                  {t.heroCta2}
                  <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-y-1">↓</span>
                </a>
              </motion.div>
            </motion.div>

          )}
        </AnimatePresence>

        {phase < 3 && !reduced && (
          <button
            onClick={() => setPhase(3)}
            className="mono-label absolute right-5 bottom-10 hover:text-foreground md:right-10"
          >
            {t.heroSkip} →
          </button>
        )}
      </div>
    </section>
  );
}
