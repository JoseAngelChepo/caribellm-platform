"use client"

import type { DashboardStats, UsageOverview } from "@/lib/dashboardStats"
import { formatCredits } from "@/lib/formatCredits"

function formatTokens(value: number): string {
  if (value >= 1_000_000) {
    return `${new Intl.NumberFormat("es-VE", { maximumFractionDigits: 1 }).format(value / 1_000_000)}M`
  }
  if (value >= 1_000) {
    return `${new Intl.NumberFormat("es-VE", { maximumFractionDigits: 1 }).format(value / 1_000)}k`
  }
  return new Intl.NumberFormat("es-VE").format(value)
}

function formatCount(value: number): string {
  return new Intl.NumberFormat("es-VE").format(value)
}

type UsagePanelProps = {
  stats: DashboardStats
  usage: UsageOverview
  onConfigureApi: () => void
}

type MetricProps = {
  label: string
  value: string
  detail?: string
  accent?: boolean
}

function Metric({ label, value, detail, accent }: MetricProps) {
  return (
    <div className={`usage-metric${accent ? " usage-metric--accent" : ""}`}>
      <span className="usage-metric-label">{label}</span>
      <span className="usage-metric-value">{value}</span>
      {detail ? <span className="usage-metric-detail">{detail}</span> : null}
    </div>
  )
}

export default function UsagePanel({ stats, usage, onConfigureApi }: UsagePanelProps) {
  const creditPoolTotal = stats.creditsAvailable + stats.creditsUsed
  const tokenTotal = stats.totalInputTokens + stats.totalOutputTokens
  const inputPct =
    tokenTotal > 0 ? Math.round((stats.totalInputTokens / tokenTotal) * 100) : 0
  const outputPct = tokenTotal > 0 ? 100 - inputPct : 0

  const creditSources = usage.creditSources.filter((s) => s.id !== "used")
  const hasActivity = stats.inferenceCount > 0 || tokenTotal > 0

  return (
    <div className="usage-panel" role="tabpanel" id="dash-panel-usage" aria-labelledby="dash-tab-usage">
      {/* ── Balance principal ── */}
      <section className="usage-balance" aria-label="Balance de créditos">
        <div className="usage-balance-main">
          <p className="usage-balance-label">Disponibles</p>
          <p className="usage-balance-value usage-num">{formatCredits(stats.creditsAvailable)}</p>
        </div>

        <div className="usage-pool">
          <div
            className="usage-pool-track"
            role="progressbar"
            aria-valuenow={usage.creditsUsedPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${usage.creditsUsedPct}% del pool consumido`}
          >
            <div className="usage-pool-used" style={{ width: `${usage.creditsUsedPct}%` }} />
          </div>
          <div className="usage-pool-legend">
            <span>
              <strong className="usage-num">{formatCredits(stats.creditsUsed)}</strong>
              <span className="usage-pool-muted"> consumidos</span>
              <span className="usage-pool-pct"> · {usage.creditsUsedPct}%</span>
            </span>
            <span>
              <strong className="usage-num">{formatCredits(creditPoolTotal)}</strong>
              <span className="usage-pool-muted"> en tu pool</span>
            </span>
          </div>
        </div>

        {creditSources.length > 0 ? (
          <ul className="usage-sources" aria-label="Origen de créditos">
            {creditSources.map((source) => (
              <li key={source.id}>
                <span className={`usage-source-dot usage-source-dot--${source.tone}`} aria-hidden />
                <span className="usage-source-label">{source.label}</span>
                <span className="usage-source-value usage-num">{formatCredits(source.value)}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      {/* ── Métricas clave ── */}
      <section className="usage-metrics" aria-label="Resumen de actividad">
        <Metric
          label="Inferencias"
          value={formatCount(stats.inferenceCount)}
          detail={hasActivity ? "solicitudes procesadas" : "sin actividad aún"}
        />
        <Metric
          label="Tokens"
          value={tokenTotal > 0 ? formatTokens(tokenTotal) : "—"}
          detail={
            tokenTotal > 0
              ? `${formatTokens(stats.totalInputTokens)} entrada · ${formatTokens(stats.totalOutputTokens)} salida`
              : undefined
          }
          accent={tokenTotal > 0}
        />
        <Metric
          label="Modelo reciente"
          value={stats.lastModel ?? "—"}
          detail={stats.lastModel ? "última inferencia" : undefined}
        />
      </section>

      {/* ── Actividad semanal ── */}
      <section className="usage-section" aria-labelledby="usage-week-title">
        <h2 className="usage-section-title" id="usage-week-title">
          Últimos 7 días
        </h2>
        <div className="usage-week-chart">
          {usage.dailyUsage.map((day) => {
            const barHeight = Math.max(day.pct, day.credits > 0 ? 6 : 0)
            const isPeak = day.pct >= 100 && day.credits > 0
            return (
              <div key={day.key} className={`usage-week-col${isPeak ? " usage-week-col--peak" : ""}`}>
                <span className="usage-week-credits usage-num">
                  {day.credits > 0 ? formatCredits(day.credits) : "·"}
                </span>
                <div className="usage-week-bar-wrap">
                  <div className="usage-week-bar" style={{ height: `${barHeight}%` }} />
                </div>
                <span className="usage-week-day">{day.label}</span>
                {day.requests > 0 ? (
                  <span className="usage-week-req">{day.requests} req</span>
                ) : (
                  <span className="usage-week-req usage-week-req--empty" aria-hidden>
                    —
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Tokens (solo si hay datos) ── */}
      {tokenTotal > 0 ? (
        <section className="usage-section" aria-labelledby="usage-tokens-title">
          <h2 className="usage-section-title" id="usage-tokens-title">
            Distribución de tokens
          </h2>
          <div className="usage-token-split">
            <div className="usage-token-block">
              <span className="usage-token-label">Entrada</span>
              <span className="usage-token-value usage-num">{formatTokens(stats.totalInputTokens)}</span>
              <span className="usage-token-pct">{inputPct}%</span>
            </div>
            <div className="usage-token-divider" aria-hidden />
            <div className="usage-token-block">
              <span className="usage-token-label">Salida</span>
              <span className="usage-token-value usage-num">{formatTokens(stats.totalOutputTokens)}</span>
              <span className="usage-token-pct">{outputPct}%</span>
            </div>
          </div>
          <div className="usage-token-track" aria-hidden>
            <div className="usage-token-fill usage-token-fill--input" style={{ width: `${inputPct}%` }} />
            <div className="usage-token-fill usage-token-fill--output" style={{ width: `${outputPct}%` }} />
          </div>
        </section>
      ) : null}

      {/* ── Modelos ── */}
      {usage.modelUsage.length > 0 ? (
        <section className="usage-section" aria-labelledby="usage-models-title">
          <h2 className="usage-section-title" id="usage-models-title">
            Por modelo
          </h2>
          <div className="usage-table-wrap">
            <table className="usage-table">
              <thead>
                <tr>
                  <th scope="col">Modelo</th>
                  <th scope="col" className="usage-th-num">
                    Créditos
                  </th>
                  <th scope="col" className="usage-th-num">
                    Req.
                  </th>
                  <th scope="col" className="usage-th-num">
                    Tokens
                  </th>
                </tr>
              </thead>
              <tbody>
                {usage.modelUsage.map((row) => (
                  <tr key={row.model}>
                    <td className="usage-td-model">{row.model}</td>
                    <td className="usage-td-num usage-num">{formatCredits(row.credits)}</td>
                    <td className="usage-td-num usage-num">{formatCount(row.requests)}</td>
                    <td className="usage-td-num usage-num usage-td-tokens">
                      {formatTokens(row.inputTokens + row.outputTokens)}
                      <span className="usage-td-sub">
                        {formatTokens(row.inputTokens)} in · {formatTokens(row.outputTokens)} out
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {/* ── Empty state ── */}
      {!hasActivity ? (
        <div className="usage-empty">
          <p className="usage-empty-text">
            Aún no hay inferencias registradas. Crea una clave API y haz tu primera solicitud.
          </p>
          <button type="button" className="usage-empty-btn" onClick={onConfigureApi}>
            Ir a API
          </button>
        </div>
      ) : null}

      <style jsx>{`
        .usage-panel {
          display: flex;
          flex-direction: column;
          gap: 20px;
          animation: usage-in 0.18s ease;
        }

        @keyframes usage-in {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .usage-panel :global(.usage-num) {
          font-variant-numeric: tabular-nums;
          font-feature-settings: "tnum";
        }

        /* ── Balance ── */
        .usage-balance {
          background: var(--launch-surface);
          border: 1px solid rgba(0, 207, 189, 0.2);
          padding: 28px 28px 24px;
        }

        .usage-balance-label {
          margin: 0 0 6px;
          font-family: var(--app-mono);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--launch-muted);
        }

        .usage-balance-value {
          margin: 0 0 24px;
          font-family: var(--app-title-font);
          font-size: clamp(2.5rem, 6vw, 3.5rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1;
          color: var(--launch-accent);
          font-variant-numeric: tabular-nums;
        }

        .usage-pool-track {
          height: 6px;
          background: rgba(0, 207, 189, 0.12);
          overflow: hidden;
        }

        .usage-pool-used {
          height: 100%;
          background: var(--launch-muted);
          transition: width 0.4s ease;
        }

        .usage-pool-legend {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          margin-top: 10px;
          font-size: 13px;
          color: var(--launch-text);
        }

        .usage-pool-legend strong {
          font-family: var(--app-mono);
          font-weight: 600;
        }

        .usage-pool-muted {
          color: var(--launch-muted);
        }

        .usage-pool-pct {
          font-family: var(--app-mono);
          font-size: 12px;
          color: var(--launch-muted);
        }

        .usage-sources {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 20px;
          list-style: none;
          margin: 20px 0 0;
          padding: 16px 0 0;
          border-top: 1px solid var(--launch-border);
        }

        .usage-sources li {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
        }

        .usage-source-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .usage-source-dot--success {
          background: var(--launch-success);
        }

        .usage-source-dot--muted {
          background: #4a5a58;
        }

        .usage-source-label {
          color: var(--launch-muted);
        }

        .usage-source-value {
          font-family: var(--app-mono);
          font-weight: 600;
          color: var(--launch-text);
        }

        /* ── Metrics row ── */
        .usage-metrics {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1px;
          background: var(--launch-border);
          border: 1px solid var(--launch-border);
        }

        .usage-metrics :global(.usage-metric) {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 18px 20px;
          background: var(--launch-surface);
          min-height: 88px;
        }

        .usage-metrics :global(.usage-metric--accent .usage-metric-value) {
          color: var(--launch-accent);
        }

        .usage-metrics :global(.usage-metric-label) {
          display: block;
          font-family: var(--app-mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--launch-muted);
        }

        .usage-metrics :global(.usage-metric-value) {
          display: block;
          font-family: var(--app-title-font);
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--launch-text);
          font-variant-numeric: tabular-nums;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .usage-metrics :global(.usage-metric-detail) {
          display: block;
          font-size: 12px;
          color: var(--launch-muted);
          line-height: 1.4;
        }

        /* ── Sections ── */
        .usage-section {
          background: var(--launch-surface);
          border: 1px solid var(--launch-border);
          padding: 22px 24px 24px;
        }

        .usage-section-title {
          margin: 0 0 20px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--launch-text);
        }

        /* ── Week chart ── */
        .usage-week-chart {
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          gap: 6px;
          align-items: end;
        }

        .usage-week-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          min-width: 0;
        }

        .usage-week-credits {
          font-family: var(--app-mono);
          font-size: 10px;
          font-weight: 600;
          color: var(--launch-muted);
          min-height: 14px;
          line-height: 1;
        }

        .usage-week-col--peak .usage-week-credits {
          color: var(--launch-accent);
        }

        .usage-week-bar-wrap {
          width: 100%;
          height: 100px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .usage-week-bar {
          width: 100%;
          max-width: 32px;
          min-height: 2px;
          background: rgba(0, 207, 189, 0.25);
          transition: height 0.35s ease;
        }

        .usage-week-col--peak .usage-week-bar {
          background: var(--launch-accent);
        }

        .usage-week-day {
          font-family: var(--app-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--launch-muted);
        }

        .usage-week-req {
          font-size: 10px;
          color: var(--launch-muted);
          min-height: 14px;
        }

        .usage-week-req--empty {
          visibility: hidden;
        }

        /* ── Token split ── */
        .usage-token-split {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 20px;
          align-items: center;
          margin-bottom: 16px;
        }

        .usage-token-block {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .usage-token-block:last-child {
          text-align: right;
        }

        .usage-token-label {
          font-size: 12px;
          color: var(--launch-muted);
        }

        .usage-token-value {
          font-family: var(--app-title-font);
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--launch-text);
        }

        .usage-token-pct {
          font-family: var(--app-mono);
          font-size: 11px;
          color: var(--launch-muted);
        }

        .usage-token-divider {
          width: 1px;
          height: 48px;
          background: var(--launch-border);
        }

        .usage-token-track {
          display: flex;
          height: 4px;
          overflow: hidden;
          background: var(--launch-bg);
        }

        .usage-token-fill--input {
          background: var(--launch-accent);
        }

        .usage-token-fill--output {
          background: #4a5a58;
        }

        /* ── Table ── */
        .usage-table-wrap {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .usage-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }

        .usage-table th {
          padding: 0 12px 12px 0;
          font-family: var(--app-mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-align: left;
          color: var(--launch-muted);
          border-bottom: 1px solid var(--launch-border);
        }

        .usage-table th:last-child,
        .usage-table td:last-child {
          padding-right: 0;
        }

        .usage-th-num {
          text-align: right;
        }

        .usage-table td {
          padding: 14px 12px 14px 0;
          vertical-align: top;
          border-bottom: 1px solid var(--launch-border);
        }

        .usage-table tbody tr:last-child td {
          border-bottom: none;
          padding-bottom: 0;
        }

        .usage-td-model {
          font-weight: 500;
          color: var(--launch-text);
          max-width: 180px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .usage-td-num {
          text-align: right;
          font-family: var(--app-mono);
          font-weight: 600;
          color: var(--launch-text);
          white-space: nowrap;
        }

        .usage-td-tokens {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }

        .usage-td-sub {
          font-size: 10px;
          font-weight: 400;
          color: var(--launch-muted);
        }

        /* ── Empty ── */
        .usage-empty {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          padding: 16px 20px;
          border: 1px dashed var(--launch-border);
          background: rgba(255, 255, 255, 0.02);
        }

        .usage-empty-text {
          margin: 0;
          font-size: 13px;
          color: var(--launch-muted);
          max-width: 480px;
        }

        .usage-empty-btn {
          flex-shrink: 0;
          background: transparent;
          border: 1px solid var(--launch-accent);
          color: var(--launch-accent);
          font-size: 12px;
          font-weight: 600;
          padding: 8px 14px;
          cursor: pointer;
          transition:
            background 0.15s,
            color 0.15s;
        }

        .usage-empty-btn:hover {
          background: var(--launch-accent);
          color: var(--launch-bg);
        }

        @media (max-width: 768px) {
          .usage-metrics {
            grid-template-columns: 1fr;
          }

          .usage-balance {
            padding: 22px 20px 20px;
          }

          .usage-token-split {
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }

          .usage-token-divider {
            display: none;
          }

          .usage-token-block:last-child {
            text-align: left;
          }

          .usage-table th:nth-child(3),
          .usage-table td:nth-child(3) {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .usage-week-credits {
            font-size: 9px;
          }

          .usage-week-bar-wrap {
            height: 72px;
          }
        }
      `}</style>
    </div>
  )
}
