import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "es";

const copy = {
  en: {
    navScan: "Intelligence Scan",
    navWork: "Cases",
    navContact: "Talk to us",
    heroSeq1: "What eats your hours today, solved in one system.",
    heroSeq2: "See your system before you start.",
    heroSeq3: "A working demo built around your process.",
    heroTitle: "We build a working demo of your process. You test it before you pay.",
    heroSub:
      "Demo before you pay: we show you a working demo of what your system would look like, built on your operation.",
    heroServices: "WEB SYSTEMS · APPS · AI AUTOMATION · LEGACY",
    heroKicker: "We build operating systems for businesses",
    heroCta: "Analyze my business",
    heroCta2: "See the systems",
    heroSkip: "Skip",
    capLabel: "What we build",
    heroFragments: [
      "CUSTOM SYSTEMS",
      "AI AUTOMATION",
      "FIELD APPS",
      "LEGACY MIGRATION",
      "YOUR OWN ERP",
      "PURCHASE ORDERS",
      "INVOICES READ BY AI",
      "LIVE INVENTORY",
      "DASHBOARDS & REPORTS",
      "CLIENT PORTAL",
      "RECONCILIATION",
      "SYSTEM INTEGRATION",
    ],
    caps: [
      {
        word: "Systems",
        line: "The internal platform that today lives in spreadsheets: day-to-day operations, catalogs, roles and live reporting.",
        items: ["Operational management", "Client & supplier catalogs", "Roles and permissions", "Live dashboards", "Client portal"],
      },
      {
        word: "AI",
        line: "Software that reads what your team reads today: invoices, PDFs, emails and WhatsApp threads, and writes the result into the system.",
        items: ["Read invoices and PDFs", "Classify emails and requests", "Fill documents automatically", "Assistant over your documents", "Transcribe calls and notes", "Extract data from WhatsApp"],
      },
      {
        word: "Automation",
        line: "Work that runs on its own: orders, alerts, reports and field capture — with or without signal.",
        items: ["Automatic purchase orders", "Alerts and approvals", "Scheduled reports", "Mobile capture, works offline", "Photo evidence on site", "Code & folio scanning"],
      },
      {
        word: "ERP",
        line: "Your own ERP, or the old one replaced without stopping the operation: we migrate data and run both systems in parallel until the new one is ready.",
        items: ["Historical data migration", "Parallel operation, no downtime", "Same business logic, open data", "Team training"],
      },
    ],
    proofLabel: "Success cases",
    proofTitle: "Systems built around real operations.",
    proofReplacedLabel: "What it replaced",
    proof: [
      {
        name: "Orders",
        kind: "Order automation",
        figure: "30 min",
        figureNote: "per weekly order cycle, from 1 day",
        replaced: "Branch requests collected by hand across four locations.",
        line: "Requests from four branches concentrated in a single weekly view, generating supplier orders from there.",
      },
      {
        name: "Real estate",
        kind: "Real estate management",
        figure: "Legacy → platform",
        figureNote: "replaced without stopping the operation",
        replaced: "A legacy real estate management system.",
        line: "Digital payments, automatic documents and projects, clients and suppliers in one place.",
      },
      {
        name: "Physical samples",
        kind: "Physical sample tracking",
        figure: "158",
        figureNote: "physical samples tracked",
        replaced: "Smartsheet, WhatsApp and handwritten labels.",
        line: "One platform with a state machine, automatic folios and printed labels.",
      },
    ],
    scanLabel: "SHIFT Intelligence Scan",
    scanTitle: "Three answers about your operation, in 90 seconds.",
    scanSub: "Answer three questions and the scan returns:",
    scanDeliverables: [
      ["Process map", "Your operation drawn step by step, from lead to reconciliation."],
      ["Findings", "Where the process breaks, repeats itself or waits on someone."],
      ["The plan", "What to automate, what to connect and what to build."],
    ] as [string, string][],
    scanCompany: "Company or website",
    scanCompanyPh: "acme.com — industrial distribution",
    scanWhat: "What does the company do?",
    scanWhatPh: "We distribute industrial equipment to 300+ clients across Mexico.",
    scanPain: "Which process causes the most friction?",
    scanPainPh: "Quotes and purchase orders are built by hand in Excel and validated over WhatsApp.",
    scanRun: "Run the scan",
    scanRunning: "Analyzing your operation",
    scanAgain: "Run another scan",
    scanMap: "Business intelligence map",
    scanFindings: "Findings",
    scanBlueprint: "Your SHIFT blueprint",
    scanAutos: "automation opportunities",
    scanConnects: "systems worth connecting",
    scanBuilds: "custom system opportunity",
    scanHours: "hrs/month recoverable",
    scanBuildCta: "Build this with SHIFT",
    scanError: "The scan couldn't run. Please try again.",
    scanSteps: ["Reading operation", "Mapping process", "Detecting bottlenecks", "Drafting blueprint"],
    scanIdleMap: ["Lead", "Quote", "Approval", "Order", "Operations", "Invoice", "Reconciliation"],
    baLabel: "Before / after",
    baTitle: "What takes you hours today, solved in one system.",
    baBefore: "Before SHIFT",
    baAfter: "After SHIFT",
    contrast: [
      ["Excel", "One system", "Files only one person knows how to maintain.", "One source of truth the whole team uses."],
      ["WhatsApp", "Auditable status", "Decisions buried in chats.", "Every status change recorded and traceable."],
      ["Paper", "Digital capture", "Labels and files captured twice.", "Captured once, from the phone, in the field."],
      ["Legacy", "Modern platform", "Systems nobody wants to touch.", "The same business logic, data you can read."],
    ] as [string, string, string, string][],
    processLabel: "How we work — four steps, no commitment up front",
    process: [
      ["We understand", "We look at the real operation: where hours are lost and where the team gets stuck."],
      ["Demo before you pay", "We show you a working demo of what your system would look like. Functional and on your case, not a generic mockup."],
      ["You see, test, decide", "With the system running in front of you, not in a presentation."],
      ["We implement", "Data migration, setup and training, at a closed price per project."],
    ] as [string, string][],
    trustLabel: "Why SHIFT",
    trust: [
      ["Two people build it", "Sofía and Gabriela write the system. There is no team handoff between the call and the code."],
      ["Nothing is adapted", "We don't configure a SaaS. The system follows your process, including the exceptions."],
      ["Three systems in operation", "SINAI, VIDARQ and TAG · Samples are running today."],
    ] as [string, string][],
    teamLabel: "Who builds it",
    teamTitle: "Sofía & Gabriela — co-founders.",
    teamBody:
      "We build custom internal systems from Mexico City. The two of us design and build every system, from the first conversation to the day it goes live.",
    panelTitle: "Invoice read by AI",
    panelStep: "Step",
    panelInbox: "Inbox",
    panelExtracted: "Extracted data",
    panelFields: {
      supplier: "Supplier",
      rfc: "Tax ID",
      date: "Date",
      subtotal: "Subtotal",
      tax: "VAT",
      total: "Total",
    },
    panelStatus: ["Received", "Read", "Reconciled"],
    panelDisclaimer: "Illustrative example · fictional data",
    ctaTitle: "Tell us which process eats the most time.",
    ctaSub:
      "Write to us on WhatsApp, or fill in the three fields of the Scan. We answer the same day.",
    ctaScan: "Analyze my business",
    ctaTalk: "WhatsApp Sofía",
    ctaTalk2: "WhatsApp Gabriela",
    ctaMail: "Email us",
    footer: "Software agency · Mexico City",

  },
  es: {
    navScan: "Intelligence Scan",
    navWork: "Casos",
    navContact: "Hablemos",
    heroSeq1: "Lo que hoy te quita horas, resuelto en un sistema.",
    heroSeq2: "Ves tu sistema antes de empezar.",
    heroSeq3: "Una demo funcional sobre tu proceso.",
    heroTitle: "Cambiamos la forma en la que opera tu empresa.",
    heroSub:
      "Demo antes de pagar: te enseñamos una demo funcional de cómo quedaría tu sistema, construida sobre tu operación.",
    heroServices: "SISTEMAS WEB · APPS · AUTOMATIZACIÓN CON IA · LEGACY",
    heroKicker: "Construimos sistemas operativos para empresas",
    heroCta: "Analizar mi empresa",
    heroCta2: "Ver los sistemas",
    heroSkip: "Saltar",
    capLabel: "Qué hacemos",
    heroFragments: [
      "SISTEMAS A LA MEDIDA",
      "AUTOMATIZACIÓN CON IA",
      "APPS EN CAMPO",
      "MIGRACIÓN DE SISTEMAS ANTERIORES",
      "ERP PROPIO",
      "ÓRDENES DE COMPRA",
      "FACTURAS LEÍDAS POR IA",
      "INVENTARIO EN VIVO",
      "TABLEROS Y REPORTES",
      "PORTAL DE CLIENTES",
      "CONCILIACIÓN",
      "INTEGRACIÓN DE SISTEMAS",
    ],
    caps: [
      {
        word: "Sistemas",
        line: "La plataforma interna que hoy vive en hojas de cálculo: gestión del día a día, catálogos, roles y reportes en vivo.",
        items: ["Gestión operativa", "Catálogos de clientes y proveedores", "Roles y permisos", "Tableros en vivo", "Portal para tus clientes"],
      },
      {
        word: "IA",
        line: "Software que lee lo que hoy lee tu equipo: facturas, PDFs, correos y conversaciones de WhatsApp, y escribe el resultado en el sistema.",
        items: ["Leer facturas y PDFs", "Clasificar correos y solicitudes", "Llenar documentos solos", "Asistente sobre tus documentos", "Transcribir llamadas y notas", "Extraer datos de WhatsApp"],
      },
      {
        word: "Automatización",
        line: "Trabajo que corre solo: órdenes, alertas, reportes y captura en campo, con o sin señal.",
        items: ["Órdenes de compra automáticas", "Alertas y aprobaciones", "Reportes programados", "Captura desde el celular, sin señal", "Fotos y evidencia en sitio", "Escaneo de códigos y folios"],
      },
      {
        word: "ERP",
        line: "Tu propio ERP, o cambiar el sistema anterior sin detener la operación: migramos datos y corremos ambos sistemas en paralelo hasta que el nuevo esté listo.",
        items: ["Migración de datos histórica", "Operación en paralelo, sin apagones", "Misma lógica, datos abiertos", "Capacitación al equipo"],
      },
    ],
    proofLabel: "Casos de éxito",
    proofTitle: "Sistemas construidos sobre operaciones reales.",
    proofReplacedLabel: "Qué reemplazó",
    proof: [
      {
        name: "Pedidos",
        kind: "Automatización de pedidos",
        figure: "30 min",
        figureNote: "por ciclo semanal de pedidos, antes 1 día",
        replaced: "Solicitudes de cuatro sucursales juntadas a mano.",
        line: "Concentramos las solicitudes de cuatro sucursales en una sola vista semanal y generamos los pedidos a proveedores desde ahí.",
      },
      {
        name: "Administración inmobiliaria",
        kind: "Administración inmobiliaria",
        figure: "Sistema anterior → plataforma",
        figureNote: "reemplazado sin parar la operación",
        replaced: "Un sistema anterior de administración inmobiliaria.",
        line: "Pagos digitales, documentos automáticos y obras, clientes y proveedores en un solo lugar.",
      },
      {
        name: "Muestras físicas",
        kind: "Rastreo de muestras físicas",
        figure: "158",
        figureNote: "muestras físicas rastreadas",
        replaced: "Smartsheet, WhatsApp y etiquetas escritas a mano.",
        line: "Una sola plataforma con máquina de estados, folios automáticos e impresión de etiquetas.",
      },
    ],
    scanLabel: "SHIFT Intelligence Scan",
    scanTitle: "Tres respuestas sobre tu operación, en 90 segundos.",
    scanSub: "Contestas tres preguntas y el scan devuelve:",
    scanDeliverables: [
      ["Mapa de proceso", "Tu operación dibujada paso a paso, del prospecto a la conciliación."],
      ["Hallazgos", "Dónde se rompe el proceso, se repite o espera a alguien."],
      ["El plan", "Qué automatizar, qué conectar y qué construir."],
    ] as [string, string][],
    scanCompany: "Empresa o sitio web",
    scanCompanyPh: "acme.com — distribución industrial",
    scanWhat: "¿Qué hace la empresa?",
    scanWhatPh: "Distribuimos equipo industrial a más de 300 clientes en México.",
    scanPain: "¿Qué proceso genera más fricción?",
    scanPainPh: "Las cotizaciones y órdenes de compra se hacen a mano en Excel y se validan por WhatsApp.",
    scanRun: "Ejecutar el scan",
    scanRunning: "Analizando tu operación",
    scanAgain: "Ejecutar otro scan",
    scanMap: "Mapa de inteligencia del negocio",
    scanFindings: "Hallazgos",
    scanBlueprint: "Tu plan de trabajo",
    scanAutos: "oportunidades de automatización",
    scanConnects: "sistemas que vale conectar",
    scanBuilds: "oportunidad de sistema a medida",
    scanHours: "hrs/mes recuperables",
    scanBuildCta: "Construir esto con SHIFT",
    scanError: "No se pudo ejecutar el scan. Inténtalo de nuevo.",
    scanSteps: ["Leyendo la operación", "Mapeando el proceso", "Detectando cuellos de botella", "Redactando el plan"],
    scanIdleMap: ["Prospecto", "Cotización", "Aprobación", "Pedido", "Operación", "Factura", "Conciliación"],
    baLabel: "Antes / después",
    baTitle: "Lo que hoy te quita horas, resuelto en un sistema.",
    baBefore: "Antes de SHIFT",
    baAfter: "Después de SHIFT",
    contrast: [
      ["Excel", "Un solo sistema", "Archivos que sólo una persona sabe mantener.", "Una sola fuente de verdad para todo el equipo."],
      ["WhatsApp", "Estatus auditable", "Decisiones enterradas en chats.", "Cada cambio de estatus queda registrado y se puede rastrear."],
      ["Papel", "Captura digital", "Etiquetas y expedientes capturados dos veces.", "Se captura una sola vez, desde el celular, en campo."],
      ["Sistema anterior", "Plataforma moderna", "Sistemas que nadie quiere tocar.", "La misma lógica de negocio, con datos que sí puedes leer."],
    ] as [string, string, string, string][],
    processLabel: "Cómo trabajamos — cuatro pasos, sin compromiso previo",
    process: [
      ["Entendemos", "Vemos la operación real: dónde se pierden horas y dónde se traba el equipo."],
      ["Demo antes de pagar", "Te enseñamos una demo funcional de cómo quedaría tu sistema. Funcional y sobre tu caso, no un mockup genérico."],
      ["Ves, pruebas, decides", "Con el sistema corriendo enfrente, no en una presentación."],
      ["Implementamos", "Migración de datos, configuración y capacitación, con precio cerrado por proyecto."],
    ] as [string, string][],
    trustLabel: "Por qué SHIFT",
    trust: [
      ["Lo construimos nosotras dos", "Sofía y Gabriela escribimos el sistema. No hay entrega entre la llamada y el código."],
      ["Nada se adapta", "No configuramos un SaaS. El sistema sigue tu proceso, incluidas las excepciones."],
      ["Tres sistemas en operación", "SINAI, VIDARQ y TAG · Samples funcionan hoy."],
    ] as [string, string][],
    teamLabel: "Quién lo construye",
    teamTitle: "Sofía y Gabriela — cofundadoras.",
    teamBody:
      "Construimos sistemas internos a la medida desde Ciudad de México. Nosotras dos diseñamos y construimos cada sistema, desde la primera conversación hasta el día que entra en operación.",
    panelTitle: "Factura leída por IA",
    panelStep: "Paso",
    panelInbox: "Entrada",
    panelExtracted: "Datos extraídos",
    panelFields: {
      supplier: "Proveedor",
      rfc: "RFC",
      date: "Fecha",
      subtotal: "Subtotal",
      tax: "IVA",
      total: "Total",
    },
    panelStatus: ["Recibida", "Leída", "Conciliada"],
    panelDisclaimer: "Ejemplo ilustrativo · datos ficticios",
    ctaTitle: "Cuéntanos qué proceso te quita más tiempo.",
    ctaSub:
      "Escríbenos por WhatsApp, o llena los tres campos del Scan. Contestamos el mismo día.",
    ctaScan: "Analizar mi empresa",
    ctaTalk: "WhatsApp Sofía",
    ctaTalk2: "WhatsApp Gabriela",
    ctaMail: "Escríbenos",
    footer: "Agencia de software · CDMX",

  },
} as const;

export type Copy = (typeof copy)["en"];

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Copy }>({
  lang: "en",
  setLang: () => {},
  t: copy.en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    const saved = window.localStorage.getItem("shift-lang");
    if (saved === "es" || saved === "en") setLang(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("shift-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t: copy[lang] as unknown as Copy }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

export function useT() {
  return useContext(LangContext).t;
}
