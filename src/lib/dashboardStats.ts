import type {
  ApiKeyListItem,
  TransactionResponse,
  UsageSummaryResponse,
  WalletResponse,
} from "@/data/api/server"

export type DashboardStats = {
  creditsAvailable: number
  lifetimePaidUsd: number
  creditsUsed: number
  creditsReceived: number
  inferenceCount: number
  activeApiKeys: number
  totalInputTokens: number
  totalOutputTokens: number
  lastModel: string | null
  lastActivityAt: string | null
  walletCreatedAt: string | null
  providerCostUsd?: number
}

export type UsageSegment = {
  id: string
  label: string
  value: number
  tone: "accent" | "danger" | "success" | "muted"
}

export type ModelUsageRow = {
  model: string
  credits: number
  requests: number
  inputTokens: number
  outputTokens: number
  pct: number
}

export type DailyUsageRow = {
  key: string
  label: string
  credits: number
  requests: number
  pct: number
}

export type UsageOverview = {
  creditPool: UsageSegment[]
  creditSources: UsageSegment[]
  tokenSplit: UsageSegment[]
  modelUsage: ModelUsageRow[]
  dailyUsage: DailyUsageRow[]
  creditsUsedPct: number
}

function pctOf(value: number, total: number): number {
  if (total <= 0) return 0
  return Math.min(100, Math.round((value / total) * 1000) / 10)
}

function maxOf(values: number[]): number {
  return values.length > 0 ? Math.max(...values) : 0
}

export function computeDashboardStats(
  wallet: WalletResponse | null,
  transactions: TransactionResponse[],
  apiKeys: ApiKeyListItem[],
): DashboardStats {
  let creditsUsed = 0
  let creditsReceived = 0
  let inferenceCount = 0
  let totalInputTokens = 0
  let totalOutputTokens = 0

  for (const tx of transactions) {
    if (tx.type === "USAGE") {
      inferenceCount += 1
      creditsUsed += Math.abs(tx.credits)
      totalInputTokens += tx.inputTokens ?? 0
      totalOutputTokens += tx.outputTokens ?? 0
    } else if (tx.credits > 0) {
      creditsReceived += tx.credits
    }
  }

  const lastUsage = transactions.find((tx) => tx.type === "USAGE")

  return {
    creditsAvailable: wallet?.credits ?? 0,
    lifetimePaidUsd: wallet?.lifetimePaid ?? 0,
    creditsUsed,
    creditsReceived,
    inferenceCount,
    activeApiKeys: apiKeys.length,
    totalInputTokens,
    totalOutputTokens,
    lastModel: lastUsage?.model ?? null,
    lastActivityAt: transactions[0]?.createdAt ?? null,
    walletCreatedAt: wallet?.createdAt ?? null,
  }
}

export function computeUsageOverview(
  stats: DashboardStats,
  transactions: TransactionResponse[],
): UsageOverview {
  const creditTotal = stats.creditsAvailable + stats.creditsUsed
  const creditPool: UsageSegment[] = [
    {
      id: "available",
      label: "Disponibles",
      value: stats.creditsAvailable,
      tone: "accent",
    },
    {
      id: "used",
      label: "Consumidos",
      value: stats.creditsUsed,
      tone: "danger",
    },
  ]

  let bonusCredits = 0
  let topupCredits = 0
  const modelMap = new Map<string, ModelUsageRow>()

  for (const tx of transactions) {
    if (tx.type === "BONUS" && tx.credits > 0) {
      bonusCredits += tx.credits
    }
    if (tx.type === "TOPUP" && tx.credits > 0) {
      topupCredits += tx.credits
    }
    if (tx.type === "USAGE") {
      const model = tx.model?.trim() || "Desconocido"
      const existing = modelMap.get(model) ?? {
        model,
        credits: 0,
        requests: 0,
        inputTokens: 0,
        outputTokens: 0,
        pct: 0,
      }
      existing.credits += Math.abs(tx.credits)
      existing.requests += 1
      existing.inputTokens += tx.inputTokens ?? 0
      existing.outputTokens += tx.outputTokens ?? 0
      modelMap.set(model, existing)
    }
  }

  const creditSources: UsageSegment[] = [
    { id: "bonus", label: "Bono", value: bonusCredits, tone: "success" },
    { id: "topup", label: "Recargas", value: topupCredits, tone: "muted" },
    { id: "used", label: "Consumidos", value: stats.creditsUsed, tone: "danger" },
  ].filter((s) => s.value > 0) as UsageSegment[]

  const tokenSplit: UsageSegment[] = [
    {
      id: "input",
      label: "Entrada",
      value: stats.totalInputTokens,
      tone: "accent",
    },
    {
      id: "output",
      label: "Salida",
      value: stats.totalOutputTokens,
      tone: "muted",
    },
  ]

  const modelUsage = [...modelMap.values()]
    .sort((a, b) => b.credits - a.credits)
    .map((row) => ({
      ...row,
      pct: pctOf(row.credits, maxOf([...modelMap.values()].map((m) => m.credits))),
    }))

  const dayMap = new Map<string, DailyUsageRow>()
  const now = new Date()
  for (let i = 6; i >= 0; i -= 1) {
    const d = new Date(now)
    d.setDate(now.getDate() - i)
    d.setHours(0, 0, 0, 0)
    const key = d.toISOString().slice(0, 10)
    const label = new Intl.DateTimeFormat("es-VE", { weekday: "short" }).format(d)
    dayMap.set(key, { key, label, credits: 0, requests: 0, pct: 0 })
  }

  for (const tx of transactions) {
    if (tx.type !== "USAGE") continue
    const key = new Date(tx.createdAt).toISOString().slice(0, 10)
    const row = dayMap.get(key)
    if (!row) continue
    row.credits += Math.abs(tx.credits)
    row.requests += 1
  }

  const dailyRows = [...dayMap.values()]
  const dailyMax = maxOf(dailyRows.map((d) => d.credits))
  const dailyUsage = dailyRows.map((row) => ({
    ...row,
    pct: pctOf(row.credits, dailyMax || 1),
  }))

  return {
    creditPool,
    creditSources,
    tokenSplit,
    modelUsage,
    dailyUsage,
    creditsUsedPct: pctOf(stats.creditsUsed, creditTotal || 1),
  }
}

/** Maps server-side usage summary (full history) into dashboard view models. */
export function mapUsageSummary(
  summary: UsageSummaryResponse,
  wallet: WalletResponse,
  apiKeys: ApiKeyListItem[],
): { stats: DashboardStats; usage: UsageOverview } {
  const toneBySource: Record<string, UsageSegment["tone"]> = {
    bonus: "success",
    topup: "muted",
  };

  return {
    stats: {
      creditsAvailable: summary.creditsAvailable,
      lifetimePaidUsd: wallet.lifetimePaid,
      creditsUsed: summary.creditsUsed,
      creditsReceived: summary.creditsReceived,
      inferenceCount: summary.inferenceCount,
      activeApiKeys: apiKeys.length,
      totalInputTokens: summary.totalInputTokens,
      totalOutputTokens: summary.totalOutputTokens,
      lastModel: summary.lastModel,
      lastActivityAt: summary.lastActivityAt,
      walletCreatedAt: wallet.createdAt,
      providerCostUsd: summary.providerCostUsd,
    },
    usage: {
      creditPool: [
        {
          id: "available",
          label: "Disponibles",
          value: summary.creditsAvailable,
          tone: "accent",
        },
        {
          id: "used",
          label: "Consumidos",
          value: summary.creditsUsed,
          tone: "danger",
        },
      ],
      creditSources: summary.creditSources.map((s) => ({
        id: s.id,
        label: s.label,
        value: s.value,
        tone: toneBySource[s.id] ?? "muted",
      })),
      tokenSplit: [
        {
          id: "input",
          label: "Entrada",
          value: summary.totalInputTokens,
          tone: "accent",
        },
        {
          id: "output",
          label: "Salida",
          value: summary.totalOutputTokens,
          tone: "muted",
        },
      ],
      modelUsage: summary.modelUsage,
      dailyUsage: summary.dailyUsage,
      creditsUsedPct: summary.creditsUsedPct,
    },
  }
}

const TIER_LABELS: Record<string, string> = {
  free: "Acceso anticipado",
  paid: "Pagado",
}

export function accountTierLabel(tier: unknown): string {
  if (typeof tier !== "string") return "Acceso anticipado"
  return TIER_LABELS[tier] ?? tier
}
