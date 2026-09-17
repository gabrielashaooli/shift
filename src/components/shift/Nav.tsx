import { useLang } from "@/lib/i18n";
import { Wordmark } from "./Wordmark";

export function Nav() {
  const { lang, setLang, t } = useLang();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-10">
        <a href="#top" className="flex items-center gap-3">
          <Wordmark className="text-xl" />
        </a>

        <nav className="flex items-center gap-6">
          <a href="#capabilities" className="mono-label nav-link hidden hover:text-foreground md:block">
            {t.capLabel}
          </a>
          <a href="#systems" className="mono-label nav-link hidden hover:text-foreground md:block">
            {t.navWork}
          </a>
          <a href="#scan" className="mono-label nav-link hidden hover:text-foreground md:block">
            {t.navScan}
          </a>

          <div className="flex items-center gap-3">
            {(["en", "es"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`border-b pb-1 font-mono text-[11px] tracking-widest uppercase transition-colors ${
                  lang === l ? "border-signal text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <a
            href="#contact"
            className="nav-link hidden border-b border-foreground pb-1 font-mono text-[11px] tracking-widest uppercase transition-colors hover:text-signal md:block"
          >
            {t.navContact}
          </a>
        </nav>
      </div>
    </header>
  );
}
