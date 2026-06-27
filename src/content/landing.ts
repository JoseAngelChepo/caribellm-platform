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
    signupLabel: "Comenzar",
    dashboardLabel: "Dashboard",
  },
  hero: {
    eyebrow: "Acceso anticipado abierto",
    title: "Inferencia distribuida, construida en comunidad.",
    lede:
      "CaribeLLM conecta laptops y navegadores en una red P2P que comparte cómputo para inferencia de LLMs. API compatible con OpenAI, stack open source, créditos por contribuir.",
    primaryCta: { label: "Comenzar por $5", href: "/sign-up" },
    secondaryCta: { label: "Cómo funciona", href: "#how-it-works" },
  },
  problem: {
    id: "problem",
    eyebrow: "El problema",
    title: "La inferencia de calidad sigue siendo centralizada y cara",
    lede:
      "Los mejores modelos viven detrás de APIs costosas en USD, con un solo punto de fallo y sin forma de que la comunidad aporte cómputo a cambio de acceso.",
    items: [
      {
        title: "Costo por token",
        description:
          "GPT-4o y Claude cobran tarifas pensadas para empresas en el norte global. Difícil de escalar para equipos pequeños en Venezuela y el Caribe.",
      },
      {
        title: "Un solo proveedor",
        description:
          "Tu app depende de la disponibilidad de OpenAI o Anthropic. Si el servicio cae o cambia precios, no tienes alternativa inmediata.",
      },
      {
        title: "Cómputo ocioso",
        description:
          "Millones de GPUs y CPUs en laptops y PCs están idle la mayor parte del día. Ese cómputo no se aprovecha para inferencia comunitaria.",
      },
    ] satisfies LandingBullet[],
  },
  solution: {
    id: "solution",
    eyebrow: "La solución",
    title: "Una red P2P donde cada nodo suma capacidad",
    lede:
      "CaribeLLM/archipielago distribuye requests entre un gateway Go, nodos browser (WebLLM) y clientes nativos (Rust + libp2p). Más nodos activos, más throughput para todos.",
    highlights: [
      "API compatible con OpenAI — apunta tu app a api.caribellm.com sin cambiar código",
      "Nodos browser sin instalación: WebLLM corre en tu pestaña y acumula créditos",
      "Mixture-of-Agents: el swarm coordinator enruta cada request al nodo más apto",
    ],
  },
  howItWorks: {
    id: "how-it-works",
    eyebrow: "Cómo funciona",
    title: "De cuenta a nodo en tres pasos",
    steps: [
      {
        step: "01",
        title: "Crea tu cuenta",
        description:
          "Regístrate y deposita $5 — recibes $10 en créditos. El pool inicial financia inferencia mientras la red colaborativa crece.",
      },
      {
        step: "02",
        title: "Llama la API",
        description:
          "Usa GPT-4o, Claude y modelos open-source vía POST /v1/chat/completions. Mismo formato que OpenAI, misma librería cliente.",
      },
      {
        step: "03",
        title: "Corre un nodo",
        description:
          "Abre el nodo browser o instala el cliente nativo. Tu GPU/CPU procesa requests de otros usuarios y ganas créditos automáticamente.",
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
          "Proxy ultrarrápido a OpenAI/Anthropic con validación de créditos, rate limiting en Redis y deducción async post-request.",
      },
      {
        title: "Red P2P con libp2p",
        description:
          "DHT + GossipSub + WebRTC para descubrimiento y comunicación entre nodos. Mismo enfoque que Hyperspace e IPFS.",
      },
      {
        title: "Nodos browser con WebLLM",
        description:
          "Inferencia local en el navegador con modelos cuantizados. Cero instalación — abre una pestaña y contribuyes.",
      },
      {
        title: "Créditos transparentes",
        description:
          "Wallets en PostgreSQL, transacciones ACID. Contribuyes cómputo, recibes créditos. Todo auditable en el dashboard.",
      },
    ] satisfies LandingBullet[],
  },
  socialProof: {
    eyebrow: "Fase 1 en marcha",
    title: "Router centralizado hoy, red colaborativa mañana",
    stats: [
      { value: "$5", label: "Para comenzar — recibes $10 en créditos" },
      { value: "2×", label: "Multiplicador de créditos en acceso anticipado" },
      { value: "0", label: "Instalación para el nodo browser" },
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
        question: "¿Por qué $5 para comenzar?",
        answer:
          "El depósito inicial cubre los costos reales de inferencia en Fase 1 (proxy a OpenAI/Anthropic) y filtra abuso del pool comunitario. Recibes el doble en créditos.",
      },
      {
        question: "¿Qué modelos puedo usar?",
        answer:
          "Fase 1: GPT-4o, GPT-4o-mini, Claude Sonnet, Claude Haiku vía el gateway. Fase 2: modelos open-source (Llama, Mistral, etc.) corriendo en nodos de la red.",
      },
      {
        question: "¿Cómo contribuyo cómputo?",
        answer:
          "Abre /node en tu navegador — WebLLM carga un modelo cuantizado y procesa requests de la red. Para mayor rendimiento, instala el cliente nativo (Rust + Tauri).",
      },
      {
        question: "¿Es seguro correr un nodo?",
        answer:
          "Los nodos solo procesan tokens de texto en sandbox. No acceden a tus archivos ni ven datos de otros usuarios. Tráfico encriptado end-to-end.",
      },
    ] satisfies LandingFaqItem[],
  },
  finalCta: {
    title: "Únete como early adopter",
    lede:
      "Los primeros usuarios reciben créditos adicionales conforme la red P2P crece. Corre un nodo, usa la API, o ambos.",
    primaryCta: { label: "Comenzar por $5", href: "/sign-up" },
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
