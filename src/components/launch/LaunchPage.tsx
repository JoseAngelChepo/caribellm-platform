"use client"

import AppHeader from "@/components/layout/AppHeader"
import LaunchContainer from "@/components/launch/LaunchContainer"
import LaunchFaqSection from "@/components/launch/sections/LaunchFaqSection"
import LaunchFooter from "@/components/launch/sections/LaunchFooter"
import LaunchHeroSection from "@/components/launch/sections/LaunchHeroSection"
import LaunchPhasesSection from "@/components/launch/sections/LaunchPhasesSection"
import LaunchUseSection from "@/components/launch/sections/LaunchUseSection"
import { launchContent } from "@/content/launch"

const { header } = launchContent

export default function LaunchPage() {
  return (
    <div className="page launch-theme">
      <AppHeader variant="public" logoHref="#inicio" navLinks={[...header.nav]} />

      <LaunchContainer>
        <LaunchHeroSection />
        <LaunchUseSection />
        <LaunchPhasesSection />
        <LaunchFaqSection />
        <LaunchFooter />
      </LaunchContainer>

      <style jsx>{`
        .page {
          min-height: 100vh;
          font-family: var(--app-font);
          font-size: var(--launch-body-size);
          line-height: var(--launch-prose-leading);
        }
      `}</style>
    </div>
  )
}
