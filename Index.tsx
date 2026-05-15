import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  Brain,
  Code2,
  BarChart3,
  Shield,
  Instagram,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

// ─── Design Tokens ───────────────────────────────────────────────────────────
const C = {
  bg: "#0a0a0f",
  bgCard: "rgba(255,255,255,0.035)",
  blue: "#274dd7",
  blueLight: "#4d6de8",
  orange: "#e06b30",
  text: "#f0f0f5",
  muted: "rgba(240,240,245,0.5)",
  border: "rgba(255,255,255,0.07)",
  borderHover: "rgba(255,255,255,0.14)",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  "Nosotros", "Servicios", "Proceso", "Casos", "Precios", "FAQ", "Contacto",
];

const MARQUEE_ITEMS = [
  "AI Solutions", "Custom Software", "Data Analytics",
  "Automatización inteligente", "Machine Learning", "Ciberseguridad",
];

const CAPABILITIES = [
  {
    icon: Brain,
    title: "Inteligencia Artificial",
    description:
      "Modelos de ML, NLP, visión por computadora y automatización cognitiva aplicada a procesos reales.",
    accent: C.blue,
  },
  {
    icon: Code2,
    title: "Desarrollo de Software",
    description:
      "Plataformas web, apps móviles, APIs y sistemas a medida con arquitectura escalable.",
    accent: C.orange,
  },
  {
    icon: BarChart3,
    title: "Ciencia de Datos",
    description:
      "Dashboards, modelos predictivos, análisis avanzado y pipelines de datos en tiempo real.",
    accent: C.blue,
  },
  {
    icon: Shield,
    title: "Ciberseguridad",
    description:
      "Desarrollo seguro, auditorías, control de acceso y protección de infraestructura cloud.",
    accent: C.orange,
  },
];

const STATS = [
  { value: 48, suffix: "hrs", label: "para entregarte una propuesta técnica" },
  { value: 4, suffix: "", label: "áreas de especialidad" },
  { value: 100, suffix: "%", label: "remoto · CDMX & LATAM" },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useCountUp(target: number, duration: number, start: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [start, target, duration]);
  return value;
}

function useInView(threshold = 0.35) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function StatCard({
  stat,
  visible,
  delay,
}: {
  stat: (typeof STATS)[0];
  visible: boolean;
  delay: number;
}) {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [visible, delay]);
  const count = useCountUp(stat.value, 2200, started);

  return (
    <div
      style={{
        padding: "2.5rem 2rem",
        borderRadius: "16px",
        border: `1px solid ${C.border}`,
        backgroundColor: C.bgCard,
        backdropFilter: "blur(12px)",
        textAlign: "center",
        transition: "border-color 0.3s, transform 0.3s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = C.borderHover;
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = C.border;
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          fontSize: "clamp(3rem, 6vw, 4.5rem)",
          fontWeight: 900,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          marginBottom: "0.75rem",
          background: `linear-gradient(135deg, ${C.blue}, ${C.orange})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {count}
        {stat.suffix}
      </div>
      <div style={{ fontSize: "0.9375rem", color: C.muted, lineHeight: 1.55 }}>
        {stat.label}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { ref: statsRef, visible: statsVisible } = useInView();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        backgroundColor: C.bg,
        color: C.text,
        fontFamily: "'Inter', sans-serif",
        overflowX: "hidden",
        minHeight: "100vh",
      }}
    >
      {/* ── Global styles ──────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0,0) scale(1); }
          33%       { transform: translate(28px,-18px) scale(1.06); }
          66%       { transform: translate(-18px,12px) scale(0.96); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(39,77,215,0.4); }
          70%  { transform: scale(1);    box-shadow: 0 0 0 10px rgba(39,77,215,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(39,77,215,0); }
        }

        .shift-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 2rem;
          border-radius: 10px;
          background: ${C.blue};
          color: #fff;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .shift-btn-primary:hover {
          background: ${C.blueLight};
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(39,77,215,0.38);
        }

        .shift-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 2rem;
          border-radius: 10px;
          background: rgba(255,255,255,0.03);
          color: ${C.text};
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          border: 1px solid ${C.border};
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
        }
        .shift-btn-ghost:hover {
          background: rgba(255,255,255,0.07);
          border-color: ${C.borderHover};
          transform: translateY(-2px);
        }

        .shift-nav-link {
          color: ${C.muted};
          font-size: 0.875rem;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s;
        }
        .shift-nav-link:hover { color: ${C.text}; }

        .shift-cap-card {
          padding: 2rem;
          border-radius: 16px;
          border: 1px solid ${C.border};
          background: ${C.bgCard};
          backdrop-filter: blur(12px);
          transition: border-color 0.3s, background 0.3s, transform 0.3s, box-shadow 0.3s;
          cursor: default;
        }
        .shift-cap-card:hover {
          transform: translateY(-5px);
        }

        .text-gradient {
          background: linear-gradient(135deg, ${C.blue} 30%, ${C.orange} 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .fade-up-1 { animation: fadeUp 0.65s ease both; animation-delay: 0.1s; }
        .fade-up-2 { animation: fadeUp 0.65s ease both; animation-delay: 0.25s; }
        .fade-up-3 { animation: fadeUp 0.65s ease both; animation-delay: 0.42s; }
        .fade-up-4 { animation: fadeUp 0.65s ease both; animation-delay: 0.58s; }
        .fade-up-5 { animation: fadeUp 0.65s ease both; animation-delay: 0.72s; }

        @media (max-width: 768px) {
          .shift-about-grid  { grid-template-columns: 1fr !important; }
          .shift-hero-stats  { gap: 2rem !important; }
          .shift-nav-desktop { display: none !important; }
          .shift-hamburger   { display: block !important; }
          .shift-footer-row  { flex-direction: column !important; align-items: flex-start !important; gap: 1rem !important; }
        }
        @media (min-width: 769px) {
          .shift-hamburger { display: none !important; }
          .shift-mobile-menu { display: none !important; }
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════════
          NAVBAR
      ═══════════════════════════════════════════════════════════════════ */}
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 200,
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2.5rem",
          backgroundColor: scrolled ? "rgba(10,10,15,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(22px)" : "none",
          borderBottom: scrolled ? `1px solid ${C.border}` : "none",
          transition: "background 0.3s, backdrop-filter 0.3s, border-color 0.3s",
        }}
      >
        {/* Logo */}
        <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <span style={{ fontWeight: 900, fontSize: "1.35rem", letterSpacing: "-0.03em", color: C.text }}>
            Shift<span style={{ color: C.orange }}>.</span>
          </span>
        </a>

        {/* Desktop links */}
        <div
          className="shift-nav-desktop"
          style={{ display: "flex", gap: "2rem", alignItems: "center" }}
        >
          {NAV_LINKS.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="shift-nav-link">
              {l}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="https://wa.me/525566287425"
          target="_blank"
          rel="noopener noreferrer"
          className="shift-btn-primary shift-nav-desktop"
          style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem" }}
        >
          <MessageCircle size={15} />
          Hablar por WhatsApp
        </a>

        {/* Hamburger */}
        <button
          className="shift-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none", border: "none", color: C.text,
            cursor: "pointer", padding: "0.5rem",
          }}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="shift-mobile-menu"
          style={{
            position: "fixed",
            top: "64px", left: 0, right: 0,
            zIndex: 199,
            backgroundColor: "rgba(10,10,15,0.97)",
            backdropFilter: "blur(24px)",
            borderBottom: `1px solid ${C.border}`,
            padding: "1rem 2.5rem 2rem",
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "0.875rem 0",
                color: C.muted,
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: 500,
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              {l}
            </a>
          ))}
          <a
            href="https://wa.me/525566287425"
            target="_blank"
            rel="noopener noreferrer"
            className="shift-btn-primary"
            style={{ marginTop: "1.5rem", justifyContent: "center", width: "100%" }}
          >
            <MessageCircle size={18} />
            Hablar por WhatsApp
          </a>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "9rem 2rem 5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid pattern */}
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Blue blob */}
        <div
          aria-hidden
          style={{
            position: "absolute", top: "12%", left: "8%",
            width: "520px", height: "520px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(39,77,215,0.18) 0%, transparent 68%)",
            animation: "blob 9s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
        {/* Orange blob */}
        <div
          aria-hidden
          style={{
            position: "absolute", bottom: "8%", right: "6%",
            width: "420px", height: "420px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(224,107,48,0.13) 0%, transparent 68%)",
            animation: "blob 11s ease-in-out infinite reverse",
            pointerEvents: "none",
          }}
        />

        {/* Eyebrow badge */}
        <div
          className="fade-up-1"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.4rem 1.1rem",
            borderRadius: "100px",
            border: `1px solid ${C.border}`,
            backgroundColor: "rgba(255,255,255,0.03)",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: C.muted,
            textTransform: "uppercase",
            marginBottom: "2rem",
            position: "relative",
          }}
        >
          <span
            style={{
              width: "7px", height: "7px",
              borderRadius: "50%",
              backgroundColor: C.orange,
              display: "inline-block",
              animation: "pulseRing 2s ease-in-out infinite",
            }}
          />
          AI, Data & Software Studio · CDMX
        </div>

        {/* Headline */}
        <h1
          className="fade-up-2"
          style={{
            fontSize: "clamp(2.8rem, 8.5vw, 7.5rem)",
            fontWeight: 900,
            lineHeight: 0.97,
            letterSpacing: "-0.035em",
            maxWidth: "960px",
            marginBottom: "1.75rem",
            position: "relative",
          }}
        >
          Sistemas que{" "}
          <span className="text-gradient">transforman</span>
          {" "}la operación{" "}
          <br />
          de tu negocio.
        </h1>

        {/* Subtitle */}
        <p
          className="fade-up-3"
          style={{
            fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
            color: C.muted,
            maxWidth: "560px",
            lineHeight: 1.75,
            marginBottom: "3rem",
            position: "relative",
          }}
        >
          Diseñamos e implementamos software inteligente, sistemas con IA y
          soluciones de datos para empresas que buscan eficiencia operativa y
          tecnología que escala.
        </p>

        {/* CTAs */}
        <div
          className="fade-up-4"
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "5rem",
            position: "relative",
          }}
        >
          <a href="#contacto" className="shift-btn-primary">
            <MessageCircle size={18} />
            Agendar consulta gratis
          </a>
          <a href="#servicios" className="shift-btn-ghost">
            Ver servicios
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Hero stats */}
        <div
          className="fade-up-5 shift-hero-stats"
          style={{
            display: "flex",
            gap: "4rem",
            flexWrap: "wrap",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {[
            { val: "48hrs", label: "propuesta técnica" },
            { val: "4", label: "áreas de especialidad" },
            { val: "100%", label: "remoto" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "2.25rem",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  marginBottom: "0.4rem",
                  background: `linear-gradient(135deg, ${C.blue}, ${C.orange})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.val}
              </div>
              <div style={{ fontSize: "0.8125rem", color: C.muted, fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SERVICES MARQUEE
      ═══════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          overflow: "hidden",
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
          padding: "1.375rem 0",
          backgroundColor: "rgba(255,255,255,0.015)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "max-content",
            animation: "marquee 28s linear infinite",
          }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0 2.5rem",
                fontSize: "0.8125rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: i % 2 === 0 ? C.muted : C.text,
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ color: C.orange, fontSize: "0.9rem" }}>✦</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          ABOUT / CAPABILITIES
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        id="nosotros"
        style={{ padding: "9rem 2.5rem", maxWidth: "1200px", margin: "0 auto" }}
      >
        {/* Header grid */}
        <div
          className="shift-about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
            marginBottom: "5rem",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-block",
                padding: "0.3rem 0.9rem",
                borderRadius: "100px",
                border: `1px solid rgba(224,107,48,0.3)`,
                fontSize: "0.72rem",
                fontWeight: 700,
                color: C.orange,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              Quiénes somos
            </div>
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 3.75rem)",
                fontWeight: 900,
                lineHeight: 1.07,
                letterSpacing: "-0.035em",
              }}
            >
              Tecnología que impulsa{" "}
              <span className="text-gradient">decisiones estratégicas.</span>
            </h2>
          </div>

          <div style={{ paddingTop: "2.5rem" }}>
            <p
              style={{
                fontSize: "1.125rem",
                color: C.muted,
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              Somos un AI, Data & Software Studio en Ciudad de México. Ingenieras
              especializadas en inteligencia artificial, ciencia de datos y
              ciberseguridad que diseñamos e implementamos sistemas de alto impacto.
            </p>
            <a href="#servicios" className="shift-btn-ghost" style={{ fontSize: "0.9375rem" }}>
              Ver todos los servicios
              <ArrowRight size={15} />
            </a>
          </div>
        </div>

        {/* Capability cards */}
        <div
          id="servicios"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <div
                key={i}
                className="shift-cap-card"
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = cap.accent + "55";
                  el.style.background = "rgba(255,255,255,0.06)";
                  el.style.boxShadow = `0 24px 64px ${cap.accent}18`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = C.border;
                  el.style.background = C.bgCard;
                  el.style.boxShadow = "none";
                }}
              >
                {/* Icon container */}
                <div
                  style={{
                    width: "50px", height: "50px",
                    borderRadius: "12px",
                    backgroundColor: cap.accent + "1a",
                    border: `1px solid ${cap.accent}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.375rem",
                  }}
                >
                  <Icon size={22} color={cap.accent} strokeWidth={1.75} />
                </div>

                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    letterSpacing: "-0.015em",
                    marginBottom: "0.75rem",
                    color: C.text,
                  }}
                >
                  {cap.title}
                </h3>
                <p style={{ fontSize: "0.9375rem", color: C.muted, lineHeight: 1.68 }}>
                  {cap.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          STATS / PROOF SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: "9rem 2.5rem",
          background: `
            radial-gradient(ellipse 80% 60% at 20% 50%, rgba(39,77,215,0.1) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 50%, rgba(224,107,48,0.07) 0%, transparent 60%),
            ${C.bg}
          `,
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div
          ref={statsRef}
          style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-block",
              padding: "0.3rem 0.9rem",
              borderRadius: "100px",
              border: `1px solid rgba(39,77,215,0.3)`,
              fontSize: "0.72rem",
              fontWeight: 700,
              color: C.blue,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "2rem",
            }}
          >
            Resultados
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.75rem)",
              fontWeight: 900,
              lineHeight: 1.07,
              letterSpacing: "-0.035em",
              marginBottom: "1rem",
            }}
          >
            No vendemos software.
            <br />
            <span className="text-gradient">Resolvemos operaciones.</span>
          </h2>

          <p
            style={{
              fontSize: "1.125rem",
              color: C.muted,
              marginBottom: "5rem",
              lineHeight: 1.75,
              maxWidth: "520px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Cada proyecto empieza con un diagnóstico real de tu negocio.
          </p>

          {/* Stat cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.5rem",
              marginBottom: "4rem",
            }}
          >
            {STATS.map((stat, i) => (
              <StatCard key={i} stat={stat} visible={statsVisible} delay={i * 220} />
            ))}
          </div>

          {/* CTA */}
          <a href="#contacto" className="shift-btn-primary" style={{ fontSize: "1.0625rem", padding: "1rem 2.75rem" }}>
            Agendar diagnóstico gratis
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════════ */}
      <footer
        id="contacto"
        className="shift-footer-row"
        style={{
          padding: "3rem 2.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.25rem",
          borderTop: `1px solid ${C.border}`,
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <span style={{ fontWeight: 900, fontSize: "1.35rem", letterSpacing: "-0.03em" }}>
            Shift<span style={{ color: C.orange }}>.</span>
          </span>
        </a>

        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {["Aviso de privacidad", "Términos"].map((l) => (
            <a
              key={l}
              href="#"
              style={{
                color: C.muted,
                fontSize: "0.875rem",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = C.text)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = C.muted)}
            >
              {l}
            </a>
          ))}
          <span style={{ color: C.muted, fontSize: "0.875rem" }}>
            © 2026 Shift. CDMX, México.
          </span>
        </div>

      </footer>
    </div>
  );
};

export default Index;
