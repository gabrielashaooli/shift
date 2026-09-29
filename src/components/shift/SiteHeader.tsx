import { Wordmark } from "./Wordmark";

/** Encabezado de las páginas internas: vuelve al inicio y deja el contacto a
 *  la mano, sin los anclajes de la portada, que aquí no existirían. */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-6 md:px-10">
        <a href="/" className="flex items-center gap-3">
          <Wordmark className="text-xl" />
        </a>
        <nav className="flex items-center gap-6">
          <a
            href="/"
            className="text-[0.9375rem] text-muted-foreground transition-colors hover:text-foreground"
          >
            Inicio
          </a>
          <a
            href="mailto:info@shiftsoftware.com.mx"
            className="border-b border-foreground pb-1 text-[0.9375rem] transition-colors hover:border-signal hover:text-signal"
          >
            Hablemos
          </a>
        </nav>
      </div>
    </header>
  );
}
