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
    title: "Inferencia compartida",
    titleLine2: "para Venezuela y el Caribe.",
    lede: "API compatible con OpenAI. Gratis para quien construye en la región.",
    primaryCta: { label: "Crear cuenta", href: "/sign-up" },
    // secondaryCta: { label: "GitHub", href: "https://github.com/caribellm", external: true as const },
  },
  use: {
    id: "uso",
    title: "Dos formas de participar",
    blocks: [
      {
        title: "Usa la API",
        description: "Registro, API key, cambias OPENAI_BASE_URL. El resto igual.",
        links: [{ label: "Crear cuenta", href: "/sign-up" }],
      },
      {
        title: "Corre un nodo",
        description: "WebLLM en una pestaña. Sin instalar nada. Opcional.",
        links: [{ label: "Abrir /node", href: "/node" }],
      },
    ] satisfies LaunchUseBlock[],
  },
  phases: {
    id: "fases",
    title: "Dónde estamos",
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
    items: [
      {
        question: "¿Cuánto cuesta?",
        answer: "Nada, por ahora. Pensado para quien construye para la región.",
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
