"use client"

import AppHeader from "@/components/layout/AppHeader"
import { layoutContent } from "@/config/layout"

type DashboardShellProps = {
  children: React.ReactNode
}

export default function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="dash-shell launch-theme launch-theme--dashboard">
      <AppHeader variant="dashboard" />

      <main className="dash-main">{children}</main>

      <style jsx>{`
        .dash-shell {
          min-height: 100vh;
          background: var(--launch-bg);
          color: var(--launch-text);
          font-family: var(--app-font);
          font-size: 15px;
          line-height: 1.6;
        }

        .dash-main {
          max-width: ${layoutContent.dashboardMaxWidth}px;
          margin: 0 auto;
          padding: 40px ${layoutContent.paddingX}px 80px;
        }
      `}</style>
    </div>
  )
}
