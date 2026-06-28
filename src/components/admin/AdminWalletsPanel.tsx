"use client"

import { useCallback, useEffect, useState } from "react"
import Loader from "@/components/ui/Loader"
import type { AdminWalletListResult, AdminWalletRow } from "@/data/api/server"
import { useServices } from "@/data/providers/ServicesProvider"
import { formatCredits } from "@/lib/formatCredits"
import { toast } from "@/lib/toast"

function formatUsd(value: number): string {
  return new Intl.NumberFormat("es-VE", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value)
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("es-VE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso))
}

function displayName(wallet: AdminWalletRow): string {
  const full = `${wallet.firstName} ${wallet.lastName}`.trim()
  return full || wallet.username || wallet.email || wallet.userId
}

export default function AdminWalletsPanel() {
  const { services } = useServices()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [wallets, setWallets] = useState<AdminWalletRow[]>([])
  const [total, setTotal] = useState(0)
  const [totals, setTotals] = useState<AdminWalletListResult["totals"] | null>(null)
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")
  const limit = 20

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearch(searchInput.trim())
      setPage(1)
    }, 300)
    return () => window.clearTimeout(timer)
  }, [searchInput])

  const loadWallets = useCallback(
    async (options?: { silent?: boolean }) => {
      if (options?.silent) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      try {
        const result = await services.listAdminWallets({
          page,
          limit,
          search: search || undefined,
        })
        setWallets(result.items)
        setTotal(result.total)
        setTotals(result.totals)
      } catch {
        toast.error("No se pudo cargar la lista de wallets")
      } finally {
        setLoading(false)
        setRefreshing(false)
      }
    },
    [page, search, services],
  )

  useEffect(() => {
    void loadWallets()
  }, [loadWallets])

  const totalPages = Math.max(1, Math.ceil(total / limit))

  if (loading) {
    return (
      <div className="admin-panel-loading">
        <Loader compact theme="launch" />
      </div>
    )
  }

  return (
    <div className="admin-wallets">
      {totals ? (
        <section className="admin-metrics" aria-label="Resumen de wallets">
          <div className="admin-metric admin-metric--accent">
            <span className="admin-metric-label">Créditos totales</span>
            <span className="admin-metric-value">{formatCredits(totals.totalCredits)}</span>
            <span className="admin-metric-detail">en {totals.walletCount} wallets</span>
          </div>
          <div className="admin-metric">
            <span className="admin-metric-label">Depositado</span>
            <span className="admin-metric-value">{formatUsd(totals.totalLifetimePaid)}</span>
            <span className="admin-metric-detail">lifetime paid</span>
          </div>
          <div className="admin-metric">
            <span className="admin-metric-label">Wallets</span>
            <span className="admin-metric-value">{totals.walletCount}</span>
            <span className="admin-metric-detail">
              {search ? "coinciden con la búsqueda" : "registrados"}
            </span>
          </div>
        </section>
      ) : null}

      <section className="admin-card">
        <div className="admin-toolbar">
          <input
            className="admin-input"
            type="search"
            placeholder="Buscar por email, nombre o usuario…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-label="Buscar wallets"
          />
          <button
            type="button"
            className="admin-btn-ghost"
            disabled={refreshing}
            onClick={() => void loadWallets({ silent: true })}
          >
            {refreshing ? "Actualizando…" : "Actualizar"}
          </button>
        </div>

        <p className="admin-meta">{total} wallet{total === 1 ? "" : "s"}</p>

        {wallets.length === 0 ? (
          <p className="admin-empty">No hay wallets que coincidan con la búsqueda.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Disponibles</th>
                  <th>Depositado</th>
                  <th>Creado</th>
                  <th>Actualizado</th>
                </tr>
              </thead>
              <tbody>
                {wallets.map((wallet) => (
                  <tr key={wallet.id}>
                    <td>
                      <p className="admin-user-name">{displayName(wallet)}</p>
                      <p className="admin-user-meta">{wallet.email || wallet.userId}</p>
                      {wallet.username ? (
                        <p className="admin-user-meta">@{wallet.username}</p>
                      ) : null}
                    </td>
                    <td className="admin-credits">{formatCredits(wallet.credits)}</td>
                    <td>{formatUsd(wallet.lifetimePaid)}</td>
                    <td className="admin-date">{formatDate(wallet.createdAt)}</td>
                    <td className="admin-date">{formatDate(wallet.updatedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 ? (
          <div className="admin-pagination">
            <button
              type="button"
              className="admin-btn-ghost"
              disabled={page <= 1 || refreshing}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
            >
              Anterior
            </button>
            <span className="admin-page-label">
              Página {page} de {totalPages}
            </span>
            <button
              type="button"
              className="admin-btn-ghost"
              disabled={page >= totalPages || refreshing}
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            >
              Siguiente
            </button>
          </div>
        ) : null}
      </section>

      <style jsx>{`
        .admin-panel-loading {
          display: flex;
          justify-content: center;
          padding: 80px 0;
        }

        .admin-metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 12px;
          margin-bottom: 16px;
        }

        .admin-metric {
          border: 1px solid var(--launch-border);
          background: var(--launch-surface);
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .admin-metric--accent {
          border-color: rgba(0, 207, 189, 0.35);
          background: rgba(0, 207, 189, 0.04);
        }

        .admin-metric-label {
          font-family: var(--app-mono);
          font-size: 10px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--launch-muted);
        }

        .admin-metric-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--launch-text);
          line-height: 1.2;
        }

        .admin-metric--accent .admin-metric-value {
          color: var(--launch-accent);
        }

        .admin-metric-detail {
          font-size: 11px;
          color: var(--launch-muted);
        }

        .admin-card {
          border: 1px solid var(--launch-border);
          background: var(--launch-surface);
          padding: 20px;
        }

        .admin-toolbar {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }

        .admin-meta {
          margin: 0 0 16px;
          font-size: 13px;
          color: var(--launch-muted);
        }

        .admin-input {
          flex: 1;
          min-width: 220px;
          max-width: 420px;
          background: var(--launch-bg);
          border: 1px solid var(--launch-border);
          color: var(--launch-text);
          font-size: 14px;
          padding: 10px 12px;
        }

        .admin-input:focus {
          outline: none;
          border-color: var(--launch-accent);
        }

        .admin-empty {
          margin: 0;
          color: var(--launch-muted);
          font-size: 14px;
        }

        .admin-table-wrap {
          overflow-x: auto;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }

        .admin-table th,
        .admin-table td {
          padding: 12px 10px;
          border-bottom: 1px solid var(--launch-border);
          text-align: left;
          vertical-align: top;
        }

        .admin-table th {
          font-family: var(--app-mono);
          font-size: 11px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--launch-muted);
          font-weight: 500;
        }

        .admin-user-name {
          margin: 0 0 4px;
          font-weight: 600;
          color: var(--launch-text);
        }

        .admin-user-meta {
          margin: 0;
          color: var(--launch-muted);
          font-size: 12px;
        }

        .admin-credits {
          font-weight: 600;
          color: var(--launch-accent);
          white-space: nowrap;
        }

        .admin-date {
          color: var(--launch-muted);
          white-space: nowrap;
        }

        .admin-pagination {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 16px;
        }

        .admin-page-label {
          font-size: 12px;
          color: var(--launch-muted);
        }

        .admin-btn-ghost {
          background: transparent;
          border: 1px solid var(--launch-border);
          color: var(--launch-text);
          font-size: 12px;
          font-weight: 500;
          padding: 6px 12px;
          cursor: pointer;
          transition: border-color 0.15s;
        }

        .admin-btn-ghost:hover:not(:disabled) {
          border-color: var(--launch-muted);
        }

        .admin-btn-ghost:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  )
}
