import { Wordmark } from "./Wordmark";

export type ServiceContent = {
  /** Etiqueta corta arriba del título. */
  label: string;
  /** H1 de la página. Es lo que Google muestra y lo primero que se lee. */
  title: string;
  /** Uno o dos párrafos que explican el servicio sin rodeos. */
  intro: string[];
  /** Qué incluye el servicio. */
  includes: { title: string; line: string }[];
  /** Señales de que la empresa necesita esto. */
  signals: string[];
  /** Enlaces a los otros servicios, para que no queden páginas aisladas. */
  related: { to: string; label: string }[];
};

export function ServicePage({ content }: { content: ServiceContent }) {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-6 md:px-10">
          <a href="/" className="flex items-center gap-3">
            <Wordmark className="text-xl" />
          </a>
          <nav className="flex items-center gap-6">
            <a href="/" className="text-[0.9375rem] text-muted-foreground transition-colors hover:text-foreground">Inicio</a>
            <a
              href="mailto:info@shiftsoftware.com.mx"
              className="border-b border-foreground pb-1 text-[0.9375rem] transition-colors hover:border-signal hover:text-signal"
            >
              Hablemos
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="pt-40 pb-20 md:pt-52 md:pb-28">
          <div className="mx-auto max-w-[1100px] px-6 md:px-10">
            <p className="mono-label">{content.label}</p>
            <h1 className="display-xl mt-8 max-w-3xl text-[1.9rem] leading-[1.15] sm:text-[2.4rem] md:text-[3rem]">
              {content.title}
            </h1>
            <div className="mt-8 max-w-2xl space-y-5">
              {content.intro.map((p) => (
                <p key={p.slice(0, 24)} className="text-lg leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href="https://wa.me/525510807509"
                target="_blank"
                rel="noreferrer"
                className="border-b border-foreground pb-1 text-[0.9375rem] transition-colors hover:border-signal hover:text-signal"
              >
                Escríbenos por WhatsApp
              </a>
              <a href="/#scan" className="text-[0.9375rem] text-muted-foreground transition-colors hover:text-foreground">Analizar mi proceso</a>
            </div>
          </div>
        </section>

        <section className="border-t border-border py-20 md:py-28">
          <div className="mx-auto max-w-[1100px] px-6 md:px-10">
            <p className="mono-label">Qué incluye</p>
            <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-2">
              {content.includes.map((item) => (
                <div key={item.title} className="bg-background p-6 md:p-8">
                  <h2 className="display-xl text-lg md:text-xl">{item.title}</h2>
                  <p className="mt-3 text-muted-foreground">{item.line}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-[1100px] px-6 md:px-10">
            <p className="mono-label">Señales de que lo necesitas</p>
            <ul className="mt-10 max-w-3xl space-y-4">
              {content.signals.map((s) => (
                <li key={s.slice(0, 24)} className="flex gap-4 text-lg leading-relaxed">
                  <span aria-hidden className="text-signal">
                    —
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-border py-20 md:py-28">
          <div className="mx-auto max-w-[1100px] px-6 md:px-10">
            <h2 className="display-xl max-w-2xl text-[1.6rem] md:text-[2.1rem]">
              Cuéntanos qué proceso te está costando más tiempo.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Vemos tu operación, te decimos qué se puede resolver y en cuánto tiempo.
            </p>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              <a
                href="https://wa.me/525510807509"
                target="_blank"
                rel="noreferrer"
                className="border-b border-foreground pb-1 text-[0.9375rem] transition-colors hover:border-signal hover:text-signal"
              >
                WhatsApp
              </a>
              <a
                href="mailto:info@shiftsoftware.com.mx"
                className="border-b border-border pb-1 text-[0.9375rem] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                info@shiftsoftware.com.mx
              </a>
            </div>

            <div className="mt-20 border-t border-border pt-8">
              <p className="mono-label">Otros servicios</p>
              <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                {content.related.map((r) => (
                  <li key={r.to}>
                    <a href={r.to} className="text-[0.9375rem] text-muted-foreground transition-colors hover:text-foreground">{r.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
