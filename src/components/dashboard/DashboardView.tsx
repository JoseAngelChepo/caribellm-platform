"use client"

import axios from "axios"
import { useCallback, useEffect, useMemo, useState } from "react"
import Loader from "@/components/ui/Loader"
import UsagePanel from "@/components/dashboard/UsagePanel"
import type {
  ApiKeyListItem,
  CreateApiKeyResponse,
  TransactionResponse,
  UsageSummaryResponse,
  WalletResponse,
} from "@/data/api/server"
import { useServices } from "@/data/providers/ServicesProvider"
import { NEXT_PUBLIC_GATEWAY_URL } from "@/config/env"
import {
  accountTierLabel,
  computeDashboardStats,
  computeUsageOverview,
  mapUsageSummary,
} from "@/lib/dashboardStats"
import { toast } from "@/lib/toast"
import { formatCredits } from "@/lib/formatCredits"
import { userDisplayName } from "@/lib/userDisplayName"

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

function maskKey(item: ApiKeyListItem): string {
  return `${item.prefix}…${item.lastFourChars}`
}

function readString(user: Record<string, unknown> | null, key: string): string | null {
  const value = user?.[key]
  return typeof value === "string" && value.length > 0 ? value : null
}

const DASHBOARD_TABS = [
  { id: "usage", label: "Uso" },
  { id: "api", label: "API" },
  { id: "account", label: "Cuenta" },
] as const

type DashboardTab = (typeof DASHBOARD_TABS)[number]["id"]

export default function DashboardView() {
  const { user, services } = useServices()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [wallet, setWallet] = useState<WalletResponse | null>(null)
  const [usageSummary, setUsageSummary] = useState<UsageSummaryResponse | null>(null)
  const [transactions, setTransactions] = useState<TransactionResponse[]>([])
  const [apiKeys, setApiKeys] = useState<ApiKeyListItem[]>([])
  const [newKeyName, setNewKeyName] = useState("")
  const [creatingKey, setCreatingKey] = useState(false)
  const [revealedKey, setRevealedKey] = useState<CreateApiKeyResponse | null>(null)
  const [revokingId, setRevokingId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<DashboardTab>("usage")

  const loadDashboard = useCallback(
    async (options?: { silent?: boolean }) => {
      if (options?.silent) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      try {
        const walletData = await services.getWallet()
        setWallet(walletData)
        const [summary, txs, keys] = await Promise.all([
          services.getUsageSummary().catch(() => null),
          services.getTransactions(50).catch(() => [] as TransactionResponse[]),
          services.listApiKeys(),
        ])
        setUsageSummary(summary)
        setTransactions(txs)
        setApiKeys(keys)
      } catch {
        toast.error("No se pudo cargar el dashboard")
      } finally {
        setLoading(false)
        setRefreshing(false)
      }
    },
    [services],
  )

  useEffect(() => {
    void loadDashboard()
  }, [loadDashboard])

  const stats = useMemo(() => {
    if (usageSummary && wallet) {
      return mapUsageSummary(usageSummary, wallet, apiKeys).stats
    }
    return computeDashboardStats(wallet, transactions, apiKeys)
  }, [usageSummary, wallet, transactions, apiKeys])

  const usage = useMemo(() => {
    if (usageSummary && wallet) {
      return mapUsageSummary(usageSummary, wallet, apiKeys).usage
    }
    return computeUsageOverview(
      computeDashboardStats(wallet, transactions, apiKeys),
      transactions,
    )
  }, [usageSummary, wallet, transactions, apiKeys])

  const onCreateKey = async () => {
    setCreatingKey(true)
    try {
      const created = await services.createApiKey(newKeyName.trim() || undefined)
      setRevealedKey(created)
      setNewKeyName("")
      setApiKeys((prev) => [
        {
          id: created.id,
          name: created.name,
          prefix: created.prefix,
          lastFourChars: created.lastFourChars,
          lastUsedAt: null,
          createdAt: created.createdAt,
        },
        ...prev,
      ])
      toast.success("Clave API creada")
      setActiveTab("api")
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 403) {
        toast.error("Solicita el acceso en Discord.")
      } else {
        toast.error("No se pudo crear la clave API")
      }
    } finally {
      setCreatingKey(false)
    }
  }

  const onCopyKey = async (key: string) => {
    try {
      await navigator.clipboard.writeText(key)
      toast.success("Copiada al portapapeles")
    } catch {
      toast.error("No se pudo copiar")
    }
  }

  const onRevokeKey = async (id: string) => {
    setRevokingId(id)
    try {
      await services.revokeApiKey(id)
      setApiKeys((prev) => prev.filter((k) => k.id !== id))
      toast.success("Clave API revocada")
    } catch {
      toast.error("No se pudo revocar la clave")
    } finally {
      setRevokingId(null)
    }
  }

  const onCopyGateway = async () => {
    try {
      await navigator.clipboard.writeText(NEXT_PUBLIC_GATEWAY_URL)
      toast.success("URL del gateway copiada")
    } catch {
      toast.error("No se pudo copiar")
    }
  }

  const onCopySnippet = async () => {
    const snippet = `curl ${NEXT_PUBLIC_GATEWAY_URL}/v1/chat/completions \\
  -H "Authorization: Bearer <tu_clave_api>" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"gpt-4o-mini","messages":[{"role":"user","content":"Hola"}]}'`
    try {
      await navigator.clipboard.writeText(snippet)
      toast.success("Ejemplo cURL copiado")
    } catch {
      toast.error("No se pudo copiar")
    }
  }

  if (loading) {
    return (
      <div className="dash-loading">
        <Loader compact theme="launch" />
      </div>
    )
  }

  const greeting = userDisplayName(user)
  const email = readString(user, "email")
  const username = readString(user, "username")
  const tier = accountTierLabel(user?.accountTier)
  const readyForInference = apiKeys.length > 0

  return (
    <div className="dash">
      <header className="dash-hero">
        <div className="dash-hero-head">
          <h1 className="dash-title">Hola, {greeting}</h1>
          <button
            type="button"
            className="dash-btn-ghost"
            disabled={refreshing}
            onClick={() => void loadDashboard({ silent: true })}
          >
            {refreshing ? "Actualizando…" : "Actualizar"}
          </button>
        </div>
        <div className="dash-status-row">
          {!readyForInference ? (
            <span className="dash-pill">Crea una clave API para empezar</span>
          ) : null}
          {stats.lastActivityAt ? (
            <span className="dash-meta">Última actividad · {formatDate(stats.lastActivityAt)}</span>
          ) : null}
        </div>
      </header>

      <div className="dash-tabs-wrap">
        <div className="dash-tabs" role="tablist" aria-label="Secciones del dashboard">
          {DASHBOARD_TABS.map((tab) => {
            const isActive = activeTab === tab.id
            const badge = tab.id === "api" && apiKeys.length > 0 ? apiKeys.length : null
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`dash-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`dash-panel-${tab.id}`}
                className={`dash-tab${isActive ? " dash-tab--active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                {badge != null ? <span className="dash-tab-badge">{badge}</span> : null}
              </button>
            )
          })}
        </div>
      </div>

      {activeTab === "usage" ? (
        <UsagePanel
          stats={stats}
          usage={usage}
          onConfigureApi={() => setActiveTab("api")}
        />
      ) : null}

      {activeTab === "api" ? (
        <div
          className="dash-panel"
          role="tabpanel"
          id="dash-panel-api"
          aria-labelledby="dash-tab-api"
        >
          <section className="dash-card" aria-labelledby="quickstart-title">
        <div className="dash-card-head">
          <h2 className="dash-card-title" id="quickstart-title">
            Inicio rápido
          </h2>
          <div className="dash-card-actions">
            <button type="button" className="dash-btn-ghost" onClick={() => void onCopyGateway()}>
              Copiar URL
            </button>
            <button type="button" className="dash-btn-ghost" onClick={() => void onCopySnippet()}>
              Copiar cURL
            </button>
          </div>
        </div>
        <p className="dash-card-lede">Apunta tu cliente OpenAI al gateway de CaribeLLM:</p>
        <pre className="dash-code">
          <code>{`base_url = "${NEXT_PUBLIC_GATEWAY_URL}/v1"\nauthorization = "Bearer <tu_clave_api>"`}</code>
        </pre>
        <p className="dash-card-lede dash-card-lede--spaced">
          Ejemplo con cURL (reemplaza la clave API):
        </p>
        <pre className="dash-code dash-code--compact">
          <code>{`curl ${NEXT_PUBLIC_GATEWAY_URL}/v1/chat/completions \\
  -H "Authorization: Bearer <tu_clave_api>" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"gpt-4o-mini","messages":[{"role":"user","content":"Hola"}]}'`}</code>
        </pre>
      </section>

      <section className="dash-card" aria-labelledby="keys-title">
        <div className="dash-card-head">
          <h2 className="dash-card-title" id="keys-title">
            Claves API
          </h2>
        </div>

        {revealedKey ? (
          <div className="dash-key-reveal">
            <p className="dash-key-warn">Copia tu clave ahora — no se volverá a mostrar.</p>
            <code className="dash-key-value">{revealedKey.key}</code>
            <div className="dash-key-actions">
              <button
                type="button"
                className="dash-btn-primary"
                onClick={() => void onCopyKey(revealedKey.key)}
              >
                Copiar clave
              </button>
              <button type="button" className="dash-btn-ghost" onClick={() => setRevealedKey(null)}>
                Entendido
              </button>
            </div>
          </div>
        ) : null}

        <div className="dash-key-form">
          <input
            className="dash-input"
            type="text"
            placeholder="Nombre (opcional)"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            maxLength={80}
          />
          <button
            type="button"
            className="dash-btn-primary"
            disabled={creatingKey}
            onClick={() => void onCreateKey()}
          >
            {creatingKey ? "Creando…" : "Nueva clave"}
          </button>
        </div>

        {apiKeys.length === 0 ? (
          <p className="dash-empty">Aún no tienes claves API. Crea una para empezar.</p>
        ) : (
          <ul className="dash-key-list">
            {apiKeys.map((key) => (
              <li key={key.id} className="dash-key-item">
                <div>
                  <p className="dash-key-name">{key.name}</p>
                  <p className="dash-key-mask">{maskKey(key)}</p>
                  <p className="dash-key-meta">
                    Creada {formatDate(key.createdAt)}
                    {key.lastUsedAt ? ` · Último uso ${formatDate(key.lastUsedAt)}` : " · Sin uso aún"}
                  </p>
                </div>
                <button
                  type="button"
                  className="dash-btn-danger"
                  disabled={revokingId === key.id}
                  onClick={() => void onRevokeKey(key.id)}
                >
                  {revokingId === key.id ? "…" : "Revocar"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
        </div>
      ) : null}

      {activeTab === "account" ? (
        <div
          className="dash-panel"
          role="tabpanel"
          id="dash-panel-account"
          aria-labelledby="dash-tab-account"
        >
          <section className="dash-card" aria-labelledby="profile-title">
            <h2 className="dash-card-title" id="profile-title">
              Perfil
            </h2>
            <dl className="dash-dl dash-dl--inline">
              <div className="dash-dl-row">
                <dt>Nombre</dt>
                <dd>{greeting}</dd>
              </div>
              <div className="dash-dl-row">
                <dt>Correo</dt>
                <dd>{email ?? "—"}</dd>
              </div>
              <div className="dash-dl-row">
                <dt>Usuario</dt>
                <dd>{username ? `@${username}` : "—"}</dd>
              </div>
              <div className="dash-dl-row">
                <dt>Plan</dt>
                <dd>{tier}</dd>
              </div>
            </dl>
          </section>

          <section className="dash-card" aria-labelledby="wallet-title">
            <h2 className="dash-card-title" id="wallet-title">
              Monedero y créditos
            </h2>
            <dl className="dash-dl dash-dl--inline">
              <div className="dash-dl-row">
                <dt>Disponibles</dt>
                <dd className="dash-accent-value">{formatCredits(stats.creditsAvailable)}</dd>
              </div>
              <div className="dash-dl-row">
                <dt>Recibidos</dt>
                <dd>{formatCredits(stats.creditsReceived)}</dd>
              </div>
              <div className="dash-dl-row">
                <dt>Consumidos</dt>
                <dd>{formatCredits(stats.creditsUsed)}</dd>
              </div>
              <div className="dash-dl-row">
                <dt>Depositado</dt>
                <dd>{formatUsd(stats.lifetimePaidUsd)}</dd>
              </div>
              <div className="dash-dl-row">
                <dt>Monedero desde</dt>
                <dd>{stats.walletCreatedAt ? formatDate(stats.walletCreatedAt) : "—"}</dd>
              </div>
              {stats.lastActivityAt ? (
                <div className="dash-dl-row">
                  <dt>Última actividad</dt>
                  <dd>{formatDate(stats.lastActivityAt)}</dd>
                </div>
              ) : null}
            </dl>
            <p className="dash-card-note">5 créditos de inicio al registrarte.</p>
          </section>

          <section className="dash-card" aria-labelledby="access-title">
            <h2 className="dash-card-title" id="access-title">
              Acceso
            </h2>
            <dl className="dash-dl dash-dl--inline">
              <div className="dash-dl-row">
                <dt>Claves API activas</dt>
                <dd>{stats.activeApiKeys}</dd>
              </div>
              {!readyForInference ? (
                <div className="dash-dl-row">
                  <dt>Estado</dt>
                  <dd>Sin clave API</dd>
                </div>
              ) : null}
            </dl>
            {!readyForInference ? (
              <button type="button" className="dash-btn-primary dash-btn-inline" onClick={() => setActiveTab("api")}>
                Crear clave API
              </button>
            ) : null}
          </section>
        </div>
      ) : null}

      <style jsx>{`
        .dash-loading {
          display: flex;
          justify-content: center;
          padding: 80px 0;
        }

        .dash-hero {
          margin-bottom: 28px;
        }

        .dash-hero-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 8px;
        }

        .dash-title {
          margin: 0;
          font-family: var(--app-title-font);
          font-size: clamp(1.75rem, 4vw, 2.25rem);
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.1;
        }

        .dash-status-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
        }

        .dash-pill {
          display: inline-flex;
          align-items: center;
          padding: 4px 10px;
          font-family: var(--app-mono);
          font-size: 11px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--launch-muted);
          border: 1px solid var(--launch-border);
        }

        .dash-pill--ok {
          color: var(--launch-accent);
          border-color: rgba(0, 207, 189, 0.35);
          background: rgba(0, 207, 189, 0.06);
        }

        .dash-meta {
          font-size: 12px;
          color: var(--launch-muted);
        }

        .dash-tabs-wrap {
          margin-bottom: 20px;
          border-bottom: 1px solid var(--launch-border);
        }

        .dash-tabs {
          display: flex;
          gap: 4px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .dash-tabs::-webkit-scrollbar {
          display: none;
        }

        .dash-tab {
          display: inline-flex;
          align-items: center;
          gap: 8px;
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

        .dash-tab:hover {
          color: var(--launch-text);
        }

        .dash-tab--active {
          color: var(--launch-accent);
          border-bottom-color: var(--launch-accent);
        }

        .dash-tab-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 18px;
          height: 18px;
          padding: 0 5px;
          font-size: 10px;
          font-weight: 700;
          color: var(--launch-bg);
          background: var(--launch-muted);
          border-radius: 999px;
        }

        .dash-tab--active .dash-tab-badge {
          background: var(--launch-accent);
        }

        .dash-panel {
          animation: dash-panel-in 0.18s ease;
        }

        @keyframes dash-panel-in {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dash-dl--inline .dash-dl-row {
          display: grid;
          grid-template-columns: 140px 1fr;
          text-align: left;
        }

        .dash-dl--inline .dash-dl-row dd {
          text-align: left;
        }

        .dash-accent-value {
          color: var(--launch-accent);
          font-family: var(--app-title-font);
          font-size: 1.1rem;
        }

        .dash-card-note {
          margin: 16px 0 0;
          padding-top: 14px;
          border-top: 1px solid var(--launch-border);
          font-size: 13px;
          color: var(--launch-muted);
        }

        .dash-btn-inline {
          margin-top: 16px;
        }

        .dash-card {
          background: var(--launch-surface);
          border: 1px solid var(--launch-border);
          padding: 24px;
          margin-bottom: 16px;
        }

        .dash-card-label {
          font-family: var(--app-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--launch-muted);
          margin: 0 0 8px;
        }

        .dash-card-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
        }

        .dash-card-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .dash-card-title {
          margin: 0 0 12px;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: -0.015em;
        }

        .dash-card-head .dash-card-title {
          margin-bottom: 0;
        }

        .dash-card-lede {
          margin: 0 0 12px;
          font-size: 14px;
          color: var(--launch-muted);
        }

        .dash-card-lede--spaced {
          margin-top: 16px;
        }

        .dash-dl {
          margin: 0;
        }

        .dash-dl-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          padding: 10px 0;
          border-top: 1px solid var(--launch-border);
        }

        .dash-dl-row:first-child {
          border-top: none;
          padding-top: 0;
        }

        .dash-dl-row dt {
          margin: 0;
          font-size: 13px;
          color: var(--launch-muted);
        }

        .dash-dl-row dd {
          margin: 0;
          font-size: 13px;
          font-weight: 600;
          text-align: right;
        }

        .dash-mono {
          font-family: var(--app-mono);
          font-size: 12px;
          font-weight: 500;
        }

        .dash-code {
          margin: 0;
          padding: 14px 16px;
          background: var(--launch-bg);
          border: 1px solid var(--launch-border);
          overflow-x: auto;
        }

        .dash-code--compact {
          margin-top: 0;
        }

        .dash-code code {
          font-family: var(--app-mono);
          font-size: 12px;
          line-height: 1.6;
          color: var(--launch-text);
          white-space: pre;
        }

        .dash-key-form {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }

        .dash-input {
          flex: 1;
          min-width: 0;
          padding: 10px 12px;
          font-size: 14px;
          color: var(--launch-text);
          background: var(--launch-bg);
          border: 1px solid var(--launch-border);
          outline: none;
        }

        .dash-input:focus {
          border-color: var(--launch-accent);
        }

        .dash-input::placeholder {
          color: var(--launch-muted);
        }

        .dash-btn-primary {
          flex-shrink: 0;
          background: var(--launch-accent);
          color: #080b0b;
          border: 1px solid var(--launch-accent);
          font-size: 13px;
          font-weight: 700;
          padding: 10px 16px;
          cursor: pointer;
          transition: background 0.15s;
        }

        .dash-btn-primary:hover:not(:disabled) {
          background: var(--launch-dim);
          border-color: var(--launch-dim);
          color: #fff;
        }

        .dash-btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .dash-btn-ghost {
          background: transparent;
          color: var(--launch-text);
          border: 1px solid var(--launch-border);
          font-size: 12px;
          font-weight: 500;
          padding: 6px 12px;
          cursor: pointer;
        }

        .dash-btn-ghost:hover:not(:disabled) {
          border-color: var(--launch-muted);
        }

        .dash-btn-ghost:disabled {
          opacity: 0.6;
          cursor: wait;
        }

        .dash-btn-danger {
          background: transparent;
          color: var(--launch-danger);
          border: 1px solid rgba(248, 113, 113, 0.35);
          font-size: 12px;
          padding: 6px 10px;
          cursor: pointer;
          flex-shrink: 0;
        }

        .dash-btn-danger:hover:not(:disabled) {
          background: rgba(248, 113, 113, 0.08);
        }

        .dash-btn-danger:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .dash-key-reveal {
          margin-bottom: 16px;
          padding: 16px;
          background: rgba(0, 207, 189, 0.06);
          border: 1px solid rgba(0, 207, 189, 0.25);
        }

        .dash-key-warn {
          margin: 0 0 10px;
          font-size: 13px;
          color: var(--launch-accent);
        }

        .dash-key-value {
          display: block;
          margin: 0 0 12px;
          padding: 10px 12px;
          font-family: var(--app-mono);
          font-size: 12px;
          word-break: break-all;
          background: var(--launch-bg);
          border: 1px solid var(--launch-border);
        }

        .dash-key-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .dash-empty {
          margin: 0;
          font-size: 14px;
          color: var(--launch-muted);
        }

        .dash-key-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .dash-key-item {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          padding: 14px 0;
          border-top: 1px solid var(--launch-border);
        }

        .dash-key-item:first-child {
          border-top: none;
          padding-top: 0;
        }

        .dash-key-name {
          margin: 0 0 2px;
          font-size: 14px;
          font-weight: 600;
        }

        .dash-key-mask {
          margin: 0 0 4px;
          font-family: var(--app-mono);
          font-size: 12px;
          color: var(--launch-accent);
        }

        .dash-key-meta {
          margin: 0;
          font-size: 12px;
          color: var(--launch-muted);
        }

        @media (max-width: 900px) {
          .dash-key-form {
            flex-direction: column;
          }

          .dash-btn-primary {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
