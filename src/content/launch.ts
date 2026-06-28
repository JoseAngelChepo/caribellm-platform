import { brandContent } from "@/content/brand"

export type LaunchPhaseStatus = "launching" | "building" | "planned"

export type LaunchNavItem = {
  label: string
  href: string
  external?: boolean
  className?: string
}

export type LaunchLink = {
  label: string
  href: string
  external?: boolean
}

export type LaunchUseBlock = {
  icon: "api" | "node"
  title: string
  description: string
  links?: LaunchLink[]
}

export type LaunchFaqItem = {
  question: string
  answer: string
}

export type LaunchStage = {
  id: number
  label: string
  description: string
  status: LaunchPhaseStatus
}

export const launchContent = {
  ...brandContent,
  header: {
    nav: [
      { label: "uso", href: "#uso" },
      { label: "fases", href: "#fases" },
      // {
      //   label: "GitHub ↗",
      //   href: "https://github.com/caribellm",
      //   external: true,
      //   className: "gh app-header-nav-link",
      // },
    ] satisfies LaunchNavItem[],
  },
  hero: {
    prompt: "caribellm@archipielago:~$",
    titleLead: "Inferencia compartida para",
    titleHighlight: "Venezuela y el Caribe",
    lede: "Una API compatible con OpenAI, sostenida por la comunidad. Cambias una línea en tu código y tu proyecto corre sobre la red.",
    primaryCta: { label: "Crear cuenta", href: "/sign-up" },
    secondaryCta: { label: "Cómo funciona", href: "#uso" },
    tags: ["compatible con OpenAI", "gratis para la región", "open source"],
  },
  use: {
    id: "uso",
    eyebrow: "cómo funciona",
    title: "Un router de modelos para build4venezuela",
    lede: "CaribeLLM provee inferencia a los proyectos que forman parte de build4venezuela.com. Conectas tu cliente de OpenAI a nuestra URL y usas los modelos directamente, sin abrir cuenta con cada proveedor.",
    pool: {
      amount: "$100",
      label: "Pool que estamos cubriendo para los proyectos, por ahora.",
    },
    models: {
      title: "Modelos disponibles hoy",
      note: "Compatibles 1:1 con la API de OpenAI.",
      items: ["gpt-4o-mini", "gpt-4.1-mini", "gpt-4.1-nano", "gpt-5-mini", "gpt-5-nano"],
    },
    blocks: [
      {
        icon: "api",
        title: "Usa la API",
        description:
          "Te registras, generas una API key y apuntas tu cliente de OpenAI a CaribeLLM. El resto de tu código queda igual.",
        links: [{ label: "Crear cuenta", href: "/sign-up" }],
      },
      {
        icon: "node",
        title: "Corre un nodo",
        description:
          "Aporta capacidad libre desde el navegador con WebLLM. Sin instalar nada. Opcional, pero suma a la red.",
        links: [{ label: "Abrir /node", href: "/node" }],
      },
    ] satisfies LaunchUseBlock[],
  },
  phases: {
    id: "fases",
    eyebrow: "hoja de ruta",
    title: "Un proyecto que crece por fases",
    lede: "Estamos en la primera fase. Esto es lo que funciona hoy y hacia dónde va.",
    stages: [
      {
        id: 1,
        label: "Router compartido",
        description: "Acceso a modelos vía gateway. Es lo que hay hoy.",
        status: "launching",
      },
      {
        id: 2,
        label: "Nodos de la comunidad",
        description: "Cómputo desde browser o laptop.",
        status: "planned",
      },
      {
        id: 3,
        label: "Red distribuida",
        description: "Inferencia entre nodos; cloud como respaldo.",
        status: "planned",
      },
    ] satisfies LaunchStage[],
  },
  faq: {
    id: "faq",
    eyebrow: "preguntas",
    title: "Lo esencial, claro",
    items: [
      {
        question: "¿Cuánto cuesta?",
        answer: "Por ahora nada: estamos cubriendo un pool de 100 USD para los proyectos de build4venezuela.",
      },
      {
        question: "¿Qué cambio en mi código?",
        answer: "La URL base: api.caribellm.com. Mismo formato que OpenAI.",
      },
    ] satisfies LaunchFaqItem[],
  },
  statusLabels: {
    launching: "Ahora",
    building: "En curso",
    planned: "Después",
  } satisfies Record<LaunchPhaseStatus, string>,
  footer: {
    // github: {
    //   label: "github.com/caribellm",
    //   href: "https://github.com/caribellm",
    //   external: true,
    // },
    copyright: "© {year} CaribeLLM",
  },
} as const
