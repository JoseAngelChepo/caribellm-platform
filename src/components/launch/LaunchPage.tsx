"use client"

import AppHeader from "@/components/layout/AppHeader"
import LaunchCodeSection from "@/components/launch/sections/LaunchCodeSection"
import LaunchFooter from "@/components/launch/sections/LaunchFooter"
import LaunchHeroSection from "@/components/launch/sections/LaunchHeroSection"
import LaunchParticipateSection from "@/components/launch/sections/LaunchParticipateSection"
import LaunchPhasesSection from "@/components/launch/sections/LaunchPhasesSection"
import LaunchTerminalSection from "@/components/launch/sections/LaunchTerminalSection"
import { layoutContent } from "@/config/layout"
import { launchContent } from "@/content/launch"

const { header } = launchContent

export default function LaunchPage() {
  return (
    <div className="page">
      <AppHeader variant="public" logoHref="#inicio" navLinks={[...header.nav]} />

      <div className="wrap">
        <LaunchHeroSection />
        <LaunchTerminalSection />
        <LaunchParticipateSection />
        <LaunchPhasesSection />
        <LaunchCodeSection />
        <LaunchFooter />
      </div>

      <style jsx>{`
        .page {
          --launch-bg: #080b0b;
          --launch-surface: #0f1414;
          --launch-border: #1c2424;
          --launch-text: #e8edec;
          --launch-muted: #8aaba7;
          --launch-accent: #00cfbd;
          --launch-dim: #008f82;
          --launch-green: #22c55e;

          --launch-body-size: 16px;
          --launch-lede-size: 18px;
          --launch-prose-width: 42rem;
          --launch-prose-leading: 1.75;
          --launch-section-y: 96px;

          min-height: 100vh;
          background: var(--launch-bg);
          color: var(--launch-text);
          font-family: var(--app-font);
          font-size: var(--launch-body-size);
          line-height: var(--launch-prose-leading);
        }

        .wrap {
          max-width: ${layoutContent.publicMaxWidth}px;
          margin: 0 auto;
          padding: 0 ${layoutContent.paddingX}px;
        }
      `}</style>
    </div>
  )
}
