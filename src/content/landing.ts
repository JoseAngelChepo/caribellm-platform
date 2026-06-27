/**
 * CaribeLLM landing page copy.
 * Wire to i18n (src/messages/*.json) for ES/EN localization.
 */

export type LandingNavItem = { label: string; href: string }
export type LandingBullet = { title: string; description: string }
export type LandingStep = { step: string; title: string; description: string }
export type LandingFaqItem = { question: string; answer: string }

export const landingContent = {
  brand: {
    name: "CaribeLLM",
  },
  header: {
    nav: [
      { label: "Problema", href: "#problem" },
      { label: "Solución", href: "#solution" },
      { label: "Cómo funciona", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
    ] satisfies LandingNavItem[],
    loginLabel: "Entrar",
    signupLabel: "Empezar gratis",
    dashboardLabel: "Dashboard",
  },
  hero: {
    eyebrow: "Acceso abierto · gratis para builders",
    title: "IA accesible, construida en comunidad.",
    lede:
      "CaribeLLM da acceso gratuito a modelos de IA vía una API compatible con OpenAI, sobre una red de cómputo comunitario. Hecha para quienes construyen herramientas para Venezuela y el Caribe.",
    primaryCta: { label: "Obtén tu API key", href: "/sign-up" },
    secondaryCta: { label: "Cómo funciona", href: "#how-it-works" },
  },
  problem: {
    id: "problem",
    eyebrow: "El problema",
    title: "Tu herramienta necesita un LLM. Pagarlo no debería frenarte.",
    lede:
      "Construir un bot de WhatsApp, un sistema de triage o una página que combate rumores casi siempre significa llamar a un modelo por debajo. Y ahí aparece la fricción.",
    items: [
      {
        title: "Pago en USD, contra reloj",
        description:
          "Las APIs de calidad cobran en dólares con tarjeta internacional. Cuando construyes gratis y urgente, sacar tu tarjeta personal para pagar tokens no es opción.",
      },
      {
        title: "Un solo proveedor",
        description:
          "Tu herramienta depende de que OpenAI o Anthropic estén disponibles y accesibles desde tu región. Si eso falla, no hay plan B inmediato.",
      },
      {
        title: "Cómputo ocioso",
        description:
          "Miles de laptops en la comunidad están idle la mayor parte del día. Ese cómputo puede sostener inferencia para los proyectos que más lo necesitan.",
      },
    ] satisfies LandingBullet[],
  },
  solution: {
    id: "solution",
    eyebrow: "La solución",
    title: "Una API gratuita, sostenida por una red P2P",
    lede:
      "CaribeLLM distribuye requests entre un gateway Go, nodos browser (WebLLM) y clientes nativos (Rust + libp2p). Apuntas tu app a la API y funciona; sumas tu laptop a la red y aportas capacidad.",
    highlights: [
      "API compatible con OpenAI — apunta tu app a api.caribellm.com sin cambiar una línea de código",
      "Nodos browser sin instalación: WebLLM corre en una pestaña y procesa requests de la red",
      "El coordinador enruta cada request al nodo más apto para responderlo",
    ],
  },
  howItWorks: {
    id: "how-it-works",
    eyebrow: "Cómo funciona",
    title: "De cuenta a la red en tres pasos",
    steps: [
      {
        step: "01",
        title: "Crea tu cuenta",
        description:
          "Regístrate gratis y obtén tu API key. Sin tarjeta, sin pago — pensado para que empieces a construir hoy mismo.",
      },
      {
        step: "02",
        title: "Llama la API",
        description:
          "Usa modelos de calidad vía POST /v1/chat/completions. Mismo formato que OpenAI, misma librería cliente — solo cambias la URL base.",
      },
      {
        step: "03",
        title: "Suma tu nodo",
        description:
          "Abre el nodo browser y tu laptop empieza a procesar requests de la red. Cada nodo que se une es más capacidad para todos los proyectos de la comunidad.",
      },
    ] satisfies LandingStep[],
  },
  features: {
    id: "features",
    eyebrow: "Stack técnico",
    title: "Open source de punta a punta",
    items: [
      {
        title: "Gateway en Go",
        description:
          "Proxy ultrarrápido a los modelos con rate limiting en Redis y enrutamiento async. Pensado para latencia baja desde la región.",
      },
      {
        title: "Red P2P con libp2p",
        description:
          "DHT + GossipSub + WebRTC para descubrimiento y comunicación entre nodos. El mismo enfoque que usan IPFS y otras redes distribuidas.",
      },
      {
        title: "Nodos browser con WebLLM",
        description:
          "Inferencia local en el navegador con modelos cuantizados. Cero instalación — abres una pestaña y contribuyes.",
      },
      {
        title: "Todo auditable",
        description:
          "Stack abierto bajo Apache 2.0: gateway, API, frontend y nodos. Sin lock-in, sin caja negra — puedes revisar y extender cada pieza.",
      },
    ] satisfies LandingBullet[],
  },
  socialProof: {
    eyebrow: "Fase 1 en marcha",
    title: "Router centralizado hoy, red colaborativa en camino",
    stats: [
      { value: "Gratis", label: "Para builders de la comunidad" },
      { value: "1 línea", label: "Cambias la URL base y tu SDK funciona" },
      { value: "0", label: "Instalación para sumar el nodo browser" },
    ],
    quote: {
      text: "Cada laptop que se une es un servidor más para la región.",
      attribution: "CaribeLLM — Junio 2026",
    },
  },
  faq: {
    id: "faq",
    eyebrow: "FAQ",
    title: "Preguntas frecuentes",
    items: [
      {
        question: "¿Es gratis?",
        answer:
          "Sí. El acceso a la API es gratuito para quienes construyen herramientas para la comunidad. Más adelante habrá dinámicas para sostener el cómputo, pero el foco hoy es que puedas construir sin fricción.",
      },
      {
        question: "¿Qué modelos puedo usar?",
        answer:
          "Fase 1: modelos de calidad accesibles vía el gateway compatible con OpenAI. Fase 2: modelos open-source (Llama, Mistral, etc.) corriendo directamente en los nodos de la red.",
      },
      {
        question: "¿Cómo sumo mi laptop a la red?",
        answer:
          "Abre /node en tu navegador — WebLLM carga un modelo cuantizado y tu equipo empieza a procesar requests de la red. Para mayor rendimiento, instala el cliente nativo (Rust + Tauri).",
      },
      {
        question: "¿Es seguro correr un nodo?",
        answer:
          "Los nodos solo procesan tokens de texto en sandbox. No acceden a tus archivos ni ven datos de otros usuarios, y el tráfico va encriptado end-to-end.",
      },
    ] satisfies LandingFaqItem[],
  },
  finalCta: {
    title: "Construye con la red, no contra el costo",
    lede:
      "Si estás haciendo algo para Venezuela y el Caribe, la API es tuya. Úsala en tu proyecto, suma tu laptop a la red, o ambas.",
    primaryCta: { label: "Obtén tu API key", href: "/sign-up" },
    secondaryCta: { label: "Entrar", href: "/sign-in" },
  },
  footer: {
    tagline: "Red colaborativa de inferencia para Venezuela y el Caribe.",
    links: [
      { label: "Privacidad", href: "#" },
      { label: "Términos", href: "#" },
      { label: "GitHub", href: "https://github.com/caribellm" },
      { label: "Contacto", href: "#" },
    ] satisfies LandingNavItem[],
    copyright: "© {year} CaribeLLM. Open source bajo licencia Apache 2.0.",
  },
} as const
