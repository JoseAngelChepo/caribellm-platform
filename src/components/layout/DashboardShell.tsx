"use client"

import AppHeader from "@/components/layout/AppHeader"
import { layoutContent } from "@/config/layout"

type DashboardShellProps = {
  children: React.ReactNode
}

export default function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="dash-shell">
      <AppHeader variant="dashboard" />

      <main className="dash-main">{children}</main>

      <style jsx>{`
        .dash-shell {
          --launch-bg: #080b0b;
          --launch-surface: #0f1414;
          --launch-border: #1c2424;
          --launch-text: #e8edec;
          --launch-muted: #4a5a58;
          --launch-accent: #00cfbd;
          --launch-dim: #008f82;
          --launch-danger: #f87171;
          --launch-success: #22c55e;

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
