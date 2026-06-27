import LaunchPage from "@/components/launch/LaunchPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CaribeLLM — Inferencia distribuida para el Caribe",
  description:
    "Red P2P colaborativa de LLMs para Venezuela y el Caribe. API compatible con OpenAI, nodos browser con WebLLM, stack open source.",
  openGraph: {
    title: "CaribeLLM — Inferencia distribuida, construida en comunidad.",
    description:
      "Contribuye cómputo, accede a modelos vía API. Gateway Go, libp2p, WebLLM — todo open source.",
    type: "website",
  },
}

export default function HomePage() {
  return <LaunchPage />
}
