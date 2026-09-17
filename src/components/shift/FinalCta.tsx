import { useT } from "@/lib/i18n";
import { Wordmark } from "./Wordmark";

export function FinalCta() {
  const t = useT();

  return (
    <section id="contact" className="border-t border-border py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <h2 className="display-xl text-[11vw] md:text-[7vw]">{t.ctaTitle}</h2>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground">{t.ctaSub}</p>

        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-5">
          <a
            href="https://wa.me/525510807509"
            target="_blank"
            rel="noreferrer"
            className="border-b-2 border-signal pb-2 font-mono text-[11px] tracking-widest uppercase transition-colors hover:text-signal"
          >
            {t.ctaTalk}
          </a>
          <a
            href="https://wa.me/525566287424"
            target="_blank"
            rel="noreferrer"
            className="border-b border-foreground pb-2 font-mono text-[11px] tracking-widest uppercase transition-colors hover:text-signal"
          >
            {t.ctaTalk2}
          </a>
          <a
            href="#scan"
            className="border-b-2 border-signal pb-2 font-mono text-[11px] tracking-widest uppercase transition-colors hover:text-signal"
          >
            {t.ctaScan}
          </a>
          <a
            href="mailto:shiftsoftwaremx@gmail.com"
            className="border-b border-border pb-2 font-mono text-[11px] tracking-widest text-muted-foreground uppercase transition-colors hover:border-foreground hover:text-foreground"
          >
            {t.ctaMail}
          </a>

        </div>

        <footer className="mt-28 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8">
          <Wordmark className="text-lg" />
          <p className="mono-label">
            {t.footer} ·{" "}
            <a href="https://shift.com.mx" target="_blank" rel="noreferrer" className="hover:text-foreground">
              shift.com.mx
            </a>
          </p>
          <p className="mono-label">© {new Date().getFullYear()} SHIFT</p>
        </footer>
      </div>
    </section>
  );
}
