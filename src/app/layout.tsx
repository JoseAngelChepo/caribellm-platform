import type { Metadata } from "next"
import { Providers } from "@/app/providers"
import { appFont, appMonoFont, appTitleFont } from "@/config/fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "CaribeLLM",
    template: "%s · CaribeLLM",
  },
  description:
    "Red P2P colaborativa de inferencia LLM para Venezuela y el Caribe. API compatible con OpenAI, stack open source.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${appFont.variable} ${appTitleFont.variable} ${appMonoFont.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
