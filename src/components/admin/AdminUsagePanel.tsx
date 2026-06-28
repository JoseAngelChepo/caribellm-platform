"use client"

import { useCallback, useEffect, useState } from "react"
import Loader from "@/components/ui/Loader"
import type { AdminUsageSummaryResponse, AdminUsageUserRow } from "@/data/api/server"
import { useServices } from "@/data/providers/ServicesProvider"
import { formatCredits } from "@/lib/formatCredits"
import { toast } from "@/lib/toast"

function formatUsd(value: number): string {
  return new Intl.NumberFormat("es-VE", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(value)
}

function formatCount(value: number): string {
  return new Intl.NumberFormat("es-VE").format(value)
}

function formatTokens(value: number): string {
  if (value >= 1_000_000) {
    return `${new Intl.NumberFormat("es-VE", { maximumFractionDigits: 1 }).format(value / 1_000_000)}M`
  }
  if (value >= 1_000) {
    return `${new Intl.NumberFormat("es-VE", { maximumFractionDigits: 1 }).format(value / 1_000)}k`
  }
  return formatCount(value)
}

function formatDate(iso: string | null): string {
  if (!iso) return "—"
  return new Intl.DateTimeFormat("es-VE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso))
}

function displayName(user: AdminUsageUserRow): string {
  const full = `${user.firstName} ${user.lastName}`.trim()
  return full || user.username || user.email || user.userId
}

export default function AdminUsagePanel() {
  const { services } = useServices()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [summary, setSummary] = useState<AdminUsageSummaryResponse | null>(null)
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null)

  const loadUsage = useCallback(
    async (options?: { silent?: boolean }) => {
      if (options?.silent) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      try {
        const data = await services.getAdminUsageSummary()
        setSummary(data)
        setLastUpdatedAt(new Date())
      } catch {
        toast.error("No se pudo cargar el consumo global")
      } finally {
        setLoading(false)
        setRefreshing(false)
      }
    },
    [services],
  )

  useEffect(() => {
    void loadUsage()
  }, [loadUsage])

  useEffect(() => {
    const onFocus = () => {
      void loadUsage({ silent: true })
    }
    window.addEventListener("focus", onFocus)
    return () => window.removeEventListener("focus", onFocus)
  }, [loadUsage])

  if (loading) {
    return (
      <div className="admin-panel-loading">
        <Loader compact theme="launch" />
      </div>
    )
  }

  if (!summary) {
    return <p className="admin-empty">No hay datos de consumo disponibles.</p>
  }

  const { totals, dailyUsage, modelUsage, userUsage } = summary
  const tokenTotal = totals.totalInputTokens + totals.totalOutputTokens
  const creditPoolTotal = totals.creditsAvailable + totals.creditsUsed
  const missingTokens = totals.requestsWithMissingTokens ?? 0

  return (
    <div className="admin-usage">
      <div className="admin-usage-toolbar">
        <p className="admin-meta">
          {totals.activeUsers} usuario{totals.activeUsers === 1 ? "" : "s"} con actividad ·{" "}
          {totals.walletCount} wallets
          {lastUpdatedAt ? (
            <> · actualizado {formatDate(lastUpdatedAt.toISOString())}</>
          ) : null}
        </p>
        <button
          type="button"
          className="admin-btn-ghost"
          disabled={refreshing}
          onClick={() => void loadUsage({ silent: true })}
        >
          {refreshing ? "Actualizando…" : "Actualizar"}
        </button>
      </div>

      {missingTokens > 0 ? (
        <p className="admin-usage-warn" role="status">
          {missingTokens} request{missingTokens === 1 ? "" : "s"} sin tokens reportados por el
          gateway (0 in / 0 out). Reinicia el gateway y vuelve a probar; las inferencias sí
          cuentan aunque los tokens no se muevan.
        </p>
      ) : null}

      <section className="admin-metrics" aria-label="Resumen global">
        <div className="admin-metric admin-metric--accent">
          <span className="admin-metric-label">Consumidos</span>
          <span className="admin-metric-value">{formatCredits(totals.creditsUsed)}</span>
          <span className="admin-metric-detail">{totals.creditsUsedPct}% del pool</span>
        </div>
        <div className="admin-metric">
          <span className="admin-metric-label">Disponibles</span>
          <span className="admin-metric-value">{formatCredits(totals.creditsAvailable)}</span>
          <span className="admin-metric-detail">Pool {formatCredits(creditPoolTotal)}</span>
        </div>
        <div className="admin-metric">
          <span className="admin-metric-label">Inferencias</span>
          <span className="admin-metric-value">{formatCount(totals.inferenceCount)}</span>
          <span className="admin-metric-detail">requests totales</span>
        </div>
        <div className="admin-metric">
          <span className="admin-metric-label">Tokens</span>
          <span className="admin-metric-value">{formatTokens(tokenTotal)}</span>
          <span className="admin-metric-detail">
            {formatTokens(totals.totalInputTokens)} in · {formatTokens(totals.totalOutputTokens)} out
          </span>
        </div>
        <div className="admin-metric">
          <span className="admin-metric-label">Costo proveedor</span>
          <span className="admin-metric-value">{formatUsd(totals.providerCostUsd)}</span>
          <span className="admin-metric-detail">
            Recibidos {formatCredits(totals.creditsReceived)}
          </span>
        </div>
      </section>

      <section className="admin-card">
        <h2 className="admin-card-title">Últimos 7 días</h2>
        <div className="admin-bars">
          {dailyUsage.map((day) => (
            <div key={day.key} className="admin-bar-col">
              <div className="admin-bar-track" title={`${formatCredits(day.credits)} · ${day.requests} req`}>
                <div className="admin-bar-fill" style={{ height: `${Math.max(day.pct, day.credits > 0 ? 4 : 0)}%` }} />
              </div>
              <span className="admin-bar-label">{day.label}</span>
              <span className="admin-bar-value">{formatCredits(day.credits)}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="admin-split">
        <section className="admin-card">
          <h2 className="admin-card-title">Por modelo</h2>
          {modelUsage.length === 0 ? (
            <p className="admin-empty">Sin consumo por modelo todavía.</p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Modelo</th>
                    <th>Créditos</th>
                    <th>Requests</th>
                    <th>Tokens</th>
                  </tr>
                </thead>
                <tbody>
                  {modelUsage.map((row) => (
                    <tr key={row.model}>
                      <td className="admin-mono">{row.model}</td>
                      <td>{formatCredits(row.credits)}</td>
                      <td>{formatCount(row.requests)}</td>
                      <td className="admin-muted">
                        {formatTokens(row.inputTokens)} / {formatTokens(row.outputTokens)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="admin-card">
          <h2 className="admin-card-title">Por usuario</h2>
          {userUsage.length === 0 ? (
            <p className="admin-empty">Ningún usuario ha consumido créditos aún.</p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Consumido</th>
                    <th>Disponible</th>
                    <th>Requests</th>
                    <th>Tokens</th>
                    <th>Última actividad</th>
                  </tr>
                </thead>
                <tbody>
                  {userUsage.map((row) => (
                    <tr key={row.userId}>
                      <td>
                        <p className="admin-user-name">{displayName(row)}</p>
                        <p className="admin-user-meta">{row.email || row.userId}</p>
                        {row.lastModel ? (
                          <p className="admin-user-meta">último: {row.lastModel}</p>
                        ) : null}
                      </td>
                      <td>{formatCredits(row.creditsUsed)}</td>
                      <td>{formatCredits(row.creditsAvailable)}</td>
                      <td>{formatCount(row.inferenceCount)}</td>
                      <td className="admin-muted">
                        {formatTokens(row.totalInputTokens + row.totalOutputTokens)}
                        <span className="admin-token-split">
                          {" "}
                          ({formatTokens(row.totalInputTokens)} in ·{" "}
                          {formatTokens(row.totalOutputTokens)} out)
                        </span>
                      </td>
                      <td className="admin-date">{formatDate(row.lastActivityAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <style jsx>{`
        .admin-panel-loading {
          display: flex;
          justify-content: center;
          padding: 80px 0;
        }

        .admin-empty {
          margin: 0;
          color: var(--launch-muted);
          font-size: 14px;
        }

        .admin-usage-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
        }

        .admin-meta {
          margin: 0;
          font-size: 13px;
          color: var(--launch-muted);
        }

        .admin-usage-warn {
          margin: 0 0 16px;
          padding: 12px 14px;
          border: 1px solid rgba(248, 113, 113, 0.35);
          background: rgba(248, 113, 113, 0.06);
          color: var(--launch-text);
          font-size: 13px;
          line-height: 1.45;
        }

        .admin-token-split {
          display: block;
          font-size: 11px;
          margin-top: 2px;
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
          margin-bottom: 16px;
        }

        .admin-card-title {
          margin: 0 0 16px;
          font-size: 14px;
          font-weight: 600;
          color: var(--launch-text);
        }

        .admin-bars {
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          gap: 10px;
          align-items: end;
        }

        .admin-bar-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          min-width: 0;
        }

        .admin-bar-track {
          width: 100%;
          max-width: 48px;
          height: 120px;
          background: var(--launch-bg);
          border: 1px solid var(--launch-border);
          display: flex;
          align-items: flex-end;
        }

        .admin-bar-fill {
          width: 100%;
          background: var(--launch-accent);
          min-height: 0;
          transition: height 0.2s ease;
        }

        .admin-bar-label {
          font-family: var(--app-mono);
          font-size: 10px;
          color: var(--launch-muted);
          text-transform: uppercase;
        }

        .admin-bar-value {
          font-size: 10px;
          color: var(--launch-text);
          text-align: center;
        }

        .admin-split {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 16px;
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
          padding: 10px 8px;
          border-bottom: 1px solid var(--launch-border);
          text-align: left;
          vertical-align: top;
        }

        .admin-table th {
          font-family: var(--app-mono);
          font-size: 10px;
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

        .admin-date,
        .admin-muted {
          color: var(--launch-muted);
          white-space: nowrap;
        }

        .admin-mono {
          font-family: var(--app-mono);
          font-size: 12px;
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
          flex-shrink: 0;
        }

        .admin-btn-ghost:hover:not(:disabled) {
          border-color: var(--launch-muted);
        }

        .admin-btn-ghost:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 960px) {
          .admin-split {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .admin-bars {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  )
}
