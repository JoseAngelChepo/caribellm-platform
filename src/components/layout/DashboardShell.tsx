"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { launchContent } from "@/content/launch"
import { useServices } from "@/data/providers/ServicesProvider"
import { userDisplayName } from "@/lib/userDisplayName"

const { brand } = launchContent

type DashboardShellProps = {
  children: React.ReactNode
}

export default function DashboardShell({ children }: DashboardShellProps) {
  const router = useRouter()
  const { user, services } = useServices()
  const name = userDisplayName(user)

  const onLogout = async () => {
    await services.logout()
    router.replace("/sign-in")
  }

  return (
    <div className="dash-shell">
      <header className="dash-header">
        <div className="dash-header-inner">
          <Link href="/" className="dash-logo">
            {brand.prefix}
            <span className="logo-accent">{brand.accent}</span>
            <span className="logo-sep">/</span>
            {brand.sub}
          </Link>
          <div className="dash-header-actions">
            <span className="dash-user">{name}</span>
            <button type="button" className="dash-signout" onClick={() => void onLogout()}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

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

        .dash-header {
          position: sticky;
          top: 0;
          z-index: 40;
          background: rgba(8, 11, 11, 0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--launch-border);
        }

        .dash-header-inner {
          max-width: 1040px;
          margin: 0 auto;
          padding: 0 24px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .dash-logo {
          font-family: var(--app-mono);
          font-size: 13px;
          font-weight: 500;
          color: var(--launch-text);
          text-decoration: none;
          letter-spacing: -0.01em;
        }

        .dash-logo .logo-accent {
          color: var(--launch-accent);
        }

        .dash-logo .logo-sep {
          color: var(--launch-muted);
        }

        .dash-logo:hover {
          text-decoration: none;
          color: var(--launch-text);
        }

        .dash-header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .dash-user {
          font-size: 13px;
          color: var(--launch-muted);
          max-width: 180px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .dash-signout {
          background: transparent;
          border: 1px solid var(--launch-border);
          color: var(--launch-text);
          font-size: 12px;
          font-weight: 500;
          padding: 6px 12px;
          cursor: pointer;
          transition: border-color 0.15s;
        }

        .dash-signout:hover {
          border-color: var(--launch-muted);
        }

        .dash-main {
          max-width: 1040px;
          margin: 0 auto;
          padding: 40px 24px 80px;
        }

        @media (max-width: 640px) {
          .dash-user {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}
