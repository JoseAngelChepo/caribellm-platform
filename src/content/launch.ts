export type LaunchPhaseStatus = "launching" | "building" | "planned"

export type LaunchPillar = {
  code: string
  title: string
  description: string
}

export type LaunchStage = {
  id: number
  label: string
  description: string
  status: LaunchPhaseStatus
}

export type LaunchTerminalLine = {
  label: string
  value: string
}

export const launchContent = {
  brand: {
    prefix: "caribe",
    accent: "LLM",
    sub: "archipielago",
  },
  hero: {
    prompt: "caribellm@archipielago:~$",
    title: "IA accesible,",
    titleAccent: "construida en ",
    titleAccentHighlight: "comunidad.",
    lede:
      "Acceso gratuito a modelos de IA para quienes construyen herramientas para Venezuela y el Caribe. Contribuye cómputo desde tu navegador o laptop, usa la API compatible con OpenAI — todo open source.",
    primaryCta: "Ver fases",
    secondaryCta: "Código abierto",
    tags: ["Go gateway", "WebLLM", "libp2p", "Apache 2.0"],
  },
  terminal: {
    title: "ventana de lanzamiento — fase 1",
    statusLines: [
      { label: "gateway:", value: "ready" },
      { label: "api:", value: "openai-compatible" },
      { label: "nodes:", value: "browser + native" },
      { label: "license:", value: "apache-2.0" },
    ] satisfies LaunchTerminalLine[],
  },
  mission: {
    id: "objetivo",
    eyebrow: "cómo funciona",
    title: "Cómputo compartido,",
    titleAccent: "inferencia accesible.",
    lede:
      "Cada dispositivo que se une aporta capacidad de inferencia. El gateway enruta requests y coordina la red entre nodos.",
    pillars: [
      {
        code: "// nodes",
        title: "Red colaborativa",
        description:
          "Nodos browser (WebLLM) y clientes nativos (Rust + libp2p) procesan requests. Más participantes activos, más capacidad para todos.",
      },
      {
        code: "// stack",
        title: "100% open source",
        description:
          "Gateway Go, API NestJS, frontend Next.js, nodos Rust. Apache 2.0 — auditable, extensible, sin lock-in de ningún proveedor.",
      },
      {
        code: "// api",
        title: "Compatible con OpenAI",
        description:
          "POST /v1/chat/completions con el mismo formato. Apunta tu SDK existente a api.caribellm.com y funciona sin cambios.",
      },
    ] satisfies LaunchPillar[],
  },
  phases: {
    id: "fases",
    eyebrow: "roadmap",
    title: "Tres fases hacia",
    titleAccent: "la red completa.",
    lede: "Cada fase desbloquea una capacidad nueva. Así crece CaribeLLM.",
    note: "Cada nodo que se une es capacidad compartida para la región.",
    stages: [
      {
        id: 1,
        label: "Router centralizado",
        description: "Acceso inmediato a modelos de calidad vía API.",
        status: "launching",
      },
      {
        id: 2,
        label: "Red colaborativa",
        description:
          "La comunidad aporta cómputo desde el navegador o su laptop. Contribuyes capacidad.",
        status: "planned",
      },
      {
        id: 3,
        label: "Red híbrida",
        description:
          "La inferencia corre primero entre nodos de la comunidad. Los modelos en la nube quedan como respaldo cuando hace falta.",
        status: "planned",
      },
    ] satisfies LaunchStage[],
  },
  footer: {
    github: "https://github.com/caribellm",
    copyright: "© {year} CaribeLLM. Open source bajo Apache 2.0.",
    links: [
      { label: "Objetivo", href: "#objetivo" },
      { label: "Fases", href: "#fases" },
      { label: "GitHub ↗", href: "https://github.com/caribellm", external: true },
    ],
  },
} as const
