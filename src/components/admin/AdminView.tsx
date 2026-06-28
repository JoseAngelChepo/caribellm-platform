"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo } from "react"
import AdminUsagePanel from "@/components/admin/AdminUsagePanel"
import AdminUsersPanel from "@/components/admin/AdminUsersPanel"
import AdminWalletsPanel from "@/components/admin/AdminWalletsPanel"

const ADMIN_TABS = [
  { id: "users", label: "Usuarios" },
  { id: "wallets", label: "Wallets" },
  { id: "usage", label: "Uso" },
] as const

type AdminTab = (typeof ADMIN_TABS)[number]["id"]

const DEFAULT_ADMIN_TAB: AdminTab = "users"

function parseAdminTab(value: string | null): AdminTab {
  if (value && ADMIN_TABS.some((tab) => tab.id === value)) {
    return value as AdminTab
  }
  return DEFAULT_ADMIN_TAB
}

export default function AdminView() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTab = useMemo(() => parseAdminTab(searchParams.get("tab")), [searchParams])

  const setActiveTab = useCallback(
    (tab: AdminTab) => {
      const params = new URLSearchParams(searchParams.toString())
      if (tab === DEFAULT_ADMIN_TAB) {
        params.delete("tab")
      } else {
        params.set("tab", tab)
      }
      const query = params.toString()
      router.replace(query ? `/admin?${query}` : "/admin", { scroll: false })
    },
    [router, searchParams],
  )

  return (
    <div className="admin">
      <header className="admin-hero">
        <div className="admin-hero-head">
          <div>
            <p className="admin-kicker">Panel de administración</p>
            <h1 className="admin-title">Administración</h1>
          </div>
          <div className="admin-hero-actions">
            <Link href="/dashboard" className="admin-link">
              Volver al dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="admin-tabs-wrap">
        <div className="admin-tabs" role="tablist" aria-label="Secciones de administración">
          {ADMIN_TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`admin-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`admin-panel-${tab.id}`}
                className={`admin-tab${isActive ? " admin-tab--active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {activeTab === "users" ? (
        <div role="tabpanel" id="admin-panel-users" aria-labelledby="admin-tab-users">
          <AdminUsersPanel />
        </div>
      ) : null}

      {activeTab === "usage" ? (
        <div role="tabpanel" id="admin-panel-usage" aria-labelledby="admin-tab-usage">
          <AdminUsagePanel />
        </div>
      ) : null}

      {activeTab === "wallets" ? (
        <div role="tabpanel" id="admin-panel-wallets" aria-labelledby="admin-tab-wallets">
          <AdminWalletsPanel />
        </div>
      ) : null}

      <style jsx>{`
        .admin-hero {
          margin-bottom: 20px;
        }

        .admin-hero-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
        }

        .admin-kicker {
          margin: 0 0 6px;
          font-family: var(--app-mono);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--launch-muted);
        }

        .admin-title {
          margin: 0;
          font-family: var(--app-title-font);
          font-size: clamp(1.75rem, 4vw, 2.25rem);
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.1;
        }

        .admin-hero-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .admin-link {
          color: var(--launch-muted);
          text-decoration: none;
          font-size: 12px;
          padding: 6px 10px;
        }

        .admin-link:hover {
          color: var(--launch-text);
          text-decoration: none;
        }

        .admin-tabs-wrap {
          margin-bottom: 20px;
          border-bottom: 1px solid var(--launch-border);
        }

        .admin-tabs {
          display: flex;
          gap: 4px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .admin-tabs::-webkit-scrollbar {
          display: none;
        }

        .admin-tab {
          display: inline-flex;
          align-items: center;
          flex-shrink: 0;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
          padding: 10px 14px;
          font-family: var(--app-mono);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: var(--launch-muted);
          cursor: pointer;
          transition:
            color 0.15s,
            border-color 0.15s;
        }

        .admin-tab:hover {
          color: var(--launch-text);
        }

        .admin-tab--active {
          color: var(--launch-accent);
          border-bottom-color: var(--launch-accent);
        }

        @media (max-width: 900px) {
          .admin-hero-head {
            flex-direction: column;
          }

          .admin-hero-actions {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
