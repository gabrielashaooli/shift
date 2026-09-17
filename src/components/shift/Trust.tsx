import { useT } from "@/lib/i18n";

export function Trust() {
  const t = useT();

  return (
    <section className="border-t border-border bg-surface py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="max-w-3xl">
          <p className="mono-label">{t.teamLabel}</p>
          <h3 className="display-xl mt-6 text-[6vw] md:text-[2.4vw]">{t.teamTitle}</h3>
          <p className="mt-6 text-lg text-muted-foreground">{t.teamBody}</p>
        </div>
      </div>
    </section>
  );
}
