import { useT } from "@/lib/i18n";
import { Wordmark } from "./Wordmark";

export function FinalCta() {
  const t = useT();

  return (
    <section id="contact" className="border-t border-border py-28 md:py-40">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <h2 className="display-xl text-[2.25rem] md:text-[3.2rem]">{t.ctaTitle}</h2>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground">{t.ctaSub}</p>

        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-5">
          <a
            href="https://wa.me/525510807509"
            target="_blank"
            rel="noreferrer"
            className="border-b-2 border-signal pb-2 text-[0.9375rem] transition-colors hover:text-signal"
          >
            {t.ctaTalk}
          </a>
          <a
            href="https://wa.me/525566287424"
            target="_blank"
            rel="noreferrer"
            className="border-b border-foreground pb-2 text-[0.9375rem] transition-colors hover:text-signal"
          >
            {t.ctaTalk2}
          </a>
          <a
            href="#scan"
            className="border-b-2 border-signal pb-2 text-[0.9375rem] transition-colors hover:text-signal"
          >
            {t.ctaScan}
          </a>
          <a
            href="mailto:info@shiftsoftware.com.mx"
            className="border-b border-border pb-2 text-[0.9375rem] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            {t.ctaMail}
          </a>

        </div>

        {/* Enlaces a las páginas de servicio: es como Google llega a ellas y
            como el visitante encuentra el detalle de cada cosa. */}
        <nav className="mt-24 border-t border-border pt-8">
          <p className="mono-label">Servicios</p>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            {[
              ["/sistema-de-inventarios", "Sistema de inventarios"],
              ["/software-de-facturacion", "Software de facturación"],
              ["/automatizacion-de-procesos", "Automatización de procesos"],
              ["/software-a-la-medida-cdmx", "Software a la medida en CDMX"],
            ].map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-[0.9375rem] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <footer className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8">
          <Wordmark className="text-lg" />
          <p className="mono-label">
            {t.footer} ·{" "}
            <a href="https://shiftsoftware.com.mx" target="_blank" rel="noreferrer" className="hover:text-foreground">
              shiftsoftware.com.mx
            </a>
          </p>
          <p className="mono-label">© {new Date().getFullYear()} SHIFT</p>
        </footer>
      </div>
    </section>
  );
}
