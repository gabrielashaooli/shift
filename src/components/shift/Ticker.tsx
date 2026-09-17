import { motion } from "motion/react";

import { useT } from "@/lib/i18n";

export function Ticker() {
  const t = useT();
  const items = t.heroFragments.slice(0, 6);
  const row = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden border-y border-border bg-surface py-3">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="mono-label flex items-center gap-10">
            {item}
            <span className="text-signal">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
