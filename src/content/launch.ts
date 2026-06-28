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

export type LaunchParticipateBlock = {
  title: string
  description: string
  links?: LaunchLink[]
}

export type LaunchRepo = {
  slug: string
  description: string
  href: string
  pending?: boolean
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
      { label: "participar", href: "#participar" },
      { label: "fases", href: "#fases" },
      { label: "código", href: "#codigo" },
      {
        label: "GitHub ↗",
        href: "https://github.com/caribellm",
        external: true,
        className: "gh app-header-nav-link",
      },
    ] satisfies LaunchNavItem[],
  },
  hero: {
    prompt: "caribellm@archipielago:~$",
    title: "Una red de cómputo compartida",
    titleAccent: "para la ",
    titleAccentHighlight: "comunidad de la región.",
    lede:
      "CaribeLLM es un proyecto comunitario y open source para compartir acceso a IA en Venezuela y el Caribe.",
    ledeContinued:
      "Quienes pueden, aportan cómputo desde su laptop o navegador. Quienes lo necesitan, lo usan para construir. Entre más gente participa, mejor funciona para todos.",
    links: [
      { label: "Cómo participar", href: "#participar" },
      {
        label: "Ver el código",
        href: "https://github.com/caribellm",
        external: true,
      },
    ] satisfies LaunchLink[],
    tags: ["comunitario", "open source", "P2P"],
  },
  participate: {
    id: "participar",
    eyebrow: "cómo participar",
    title: "Dos formas de sumarse",
    blocks: [
      {
        title: "Aporta cómputo",
        description:
          "Si tienes una laptop o un navegador con capacidad libre, puedes correr un nodo. Procesa requests de la red cuando está disponible. Cada nodo suma capacidad para todos.",
        links: [
          { label: "Abrir /node", href: "/node" },
          {
            label: "Cliente nativo (pendiente)",
            href: "#",
          },
        ],
      },
      {
        title: "Usa la red",
        description:
          "Si estás construyendo algo para la comunidad, puedes conectar tu proyecto a la red para tus inferencias. Es compatible con la API de OpenAI: apuntas tu cliente a la URL de la red y funciona.",
        links: [{ label: "Ir al dashboard", href: "/dashboard" }],
      },
    ] satisfies LaunchParticipateBlock[],
  },
  phases: {
    id: "fases",
    eyebrow: "en qué punto está",
    title: "Un proyecto temprano, creciendo por fases",
    lede: "Estamos en la primera fase. Esto es lo que funciona hoy y hacia dónde va.",
    stages: [
      {
        id: 1,
        label: "Router compartido",
        description:
          "Donde estamos hoy: acceso a modelos para que los proyectos de la comunidad puedan empezar.",
        status: "launching",
      },
      {
        id: 2,
        label: "Aporte de la comunidad",
        description:
          "Quienes quieran suman su cómputo desde el navegador o su laptop, y la red empieza a sostenerse con esos aportes.",
        status: "planned",
      },
      {
        id: 3,
        label: "Red distribuida",
        description:
          "La inferencia corre sobre todo entre nodos de la comunidad, y los servicios en la nube quedan como respaldo.",
        status: "planned",
      },
    ] satisfies LaunchStage[],
  },
  code: {
    id: "codigo",
    eyebrow: "open source",
    title: "El código es de todos",
    lede:
      "Se puede revisar, mejorar y adaptar. La licencia de cada repo figura en su archivo LICENSE; la intención es Apache 2.0.",
    pendingNote:
      "[pendiente] Los repos aún no están públicos en GitHub. Los enlaces se activarán cuando se publiquen.",
    repos: [
      {
        slug: "caribellm-gateway",
        description: "gateway en Go",
        href: "https://github.com/caribellm/caribellm-gateway",
        pending: true,
      },
      {
        slug: "caribellm-services",
        description: "API en NestJS",
        href: "https://github.com/caribellm/caribellm-services",
        pending: true,
      },
      {
        slug: "caribellm-platform",
        description: "frontend en Next.js",
        href: "https://github.com/caribellm/caribellm-platform",
        pending: true,
      },
    ] satisfies LaunchRepo[],
  },
  conversation: {
    line: "El proyecto vive en GitHub. Issues, discusiones y aportes pasan por ahí.",
    github: {
      label: "github.com/caribellm",
      href: "https://github.com/caribellm",
      external: true,
    },
  },
  statusLabels: {
    launching: "En lanzamiento",
    building: "En construcción",
    planned: "Planificado",
  } satisfies Record<LaunchPhaseStatus, string>,
  footer: {
    copyright: "© {year} CaribeLLM. Proyecto comunitario open source.",
  },
} as const
