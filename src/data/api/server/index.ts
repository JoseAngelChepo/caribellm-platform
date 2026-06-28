import type { AxiosInstance } from "axios"
import auth from "@/data/api/server/auth"
import { normalizeAuthMeUser } from "./normalizeAuthMeUser"

export { normalizeAuthMeUser } from "./normalizeAuthMeUser"

export interface AuthSessionPayload {
  access_token: string
  refresh_token: string
  user: Record<string, unknown>
}

type LoginPayload = { email: string; password: string }
type SignUpPayload = {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
}

/** GET /auth/username/availability — public, no exceptions from backend. */
export type UsernameAvailabilityResponse = {
  username: string
  valid: boolean
  available: boolean
  reason?: string
}

export type WalletResponse = {
  id: string
  userId: string
  credits: number
  lifetimePaid: number
  createdAt: string
  updatedAt: string
}

export type TransactionResponse = {
  id: string
  type: "TOPUP" | "USAGE" | "BONUS" | "REFUND" | string
  credits: number
  usdAmount?: number | null
  description: string
  model?: string | null
  inputTokens?: number | null
  outputTokens?: number | null
  requestId?: string | null
  createdAt: string
}

export type ApiKeyListItem = {
  id: string
  name: string
  prefix: string
  lastFourChars: string
  lastUsedAt: string | null
  createdAt: string
}

export type CreateApiKeyResponse = ApiKeyListItem & { key: string }

export type AdminUser = {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  role: "user" | "admin" | string
  isActive: boolean
  isEmailVerified: boolean
  authProvider: string
  accountTier: string
  canCreateApiKeys: boolean
  createdAt?: string
  lastLogin?: string | null
}

export type AdminUserListResult = {
  items: AdminUser[]
  total: number
  page: number
  limit: number
}

export type AdminUserDetail = AdminUser & {
  credits: number | null
  activeApiKeys: number
  apiKeys: ApiKeyListItem[]
}

export type AdminUpdateUserPayload = {
  role?: "user" | "admin"
  isActive?: boolean
  canCreateApiKeys?: boolean
  accountTier?: string
  firstName?: string
  lastName?: string
  isEmailVerified?: boolean
}

export type AdminListUsersParams = {
  page?: number
  limit?: number
  search?: string
  canCreateApiKeys?: boolean
}

export type AdminUsageUserRow = {
  userId: string
  email: string
  username: string
  firstName: string
  lastName: string
  creditsAvailable: number
  creditsUsed: number
  inferenceCount: number
  totalInputTokens: number
  totalOutputTokens: number
  providerCostUsd: number
  lastActivityAt: string | null
  lastModel: string | null
}

export type AdminUsageSummaryResponse = {
  totals: {
    creditsAvailable: number
    creditsUsed: number
    creditsReceived: number
    lifetimePaid: number
    providerCostUsd: number
    inferenceCount: number
    totalInputTokens: number
    totalOutputTokens: number
    walletCount: number
    activeUsers: number
    creditsUsedPct: number
    requestsWithMissingTokens?: number
  }
  dailyUsage: Array<{
    key: string
    label: string
    credits: number
    requests: number
    pct: number
  }>
  modelUsage: Array<{
    model: string
    credits: number
    requests: number
    inputTokens: number
    outputTokens: number
    pct: number
  }>
  userUsage: AdminUsageUserRow[]
}

export type AdminWalletRow = {
  id: string
  userId: string
  email: string
  username: string
  firstName: string
  lastName: string
  credits: number
  lifetimePaid: number
  createdAt: string
  updatedAt: string
}

export type AdminWalletListParams = {
  page?: number
  limit?: number
  search?: string
}

export type AdminWalletListResult = {
  items: AdminWalletRow[]
  total: number
  page: number
  limit: number
  totals: {
    walletCount: number
    totalCredits: number
    totalLifetimePaid: number
  }
}

export type UsageSummaryResponse = {
  creditsAvailable: number
  creditsUsed: number
  creditsReceived: number
  providerCostUsd: number
  inferenceCount: number
  totalInputTokens: number
  totalOutputTokens: number
  lastModel: string | null
  lastActivityAt: string | null
  creditsUsedPct: number
  dailyUsage: Array<{
    key: string
    label: string
    credits: number
    requests: number
    pct: number
  }>
  modelUsage: Array<{
    model: string
    credits: number
    requests: number
    inputTokens: number
    outputTokens: number
    pct: number
  }>
  creditSources: Array<{ id: string; label: string; value: number }>
}

export type ServicesApi = {
  signUp: (data: SignUpPayload) => Promise<AuthSessionPayload>
  login: (data: LoginPayload) => Promise<AuthSessionPayload>
  getUser: () => Promise<Record<string, unknown> | null>
  logout: () => Promise<unknown>
  checkUsernameAvailability: (username: string) => Promise<UsernameAvailabilityResponse>
  getWallet: () => Promise<WalletResponse>
  getUsageSummary: () => Promise<UsageSummaryResponse>
  getTransactions: (limit?: number) => Promise<TransactionResponse[]>
  listApiKeys: () => Promise<ApiKeyListItem[]>
  createApiKey: (name?: string) => Promise<CreateApiKeyResponse>
  revokeApiKey: (id: string) => Promise<void>
  listAdminUsers: (params?: AdminListUsersParams) => Promise<AdminUserListResult>
  getAdminUser: (id: string) => Promise<AdminUserDetail>
  updateAdminUser: (id: string, data: AdminUpdateUserPayload) => Promise<AdminUser>
  setAdminUserApiKeyAccess: (id: string, canCreateApiKeys: boolean) => Promise<AdminUser>
  getAdminUsageSummary: () => Promise<AdminUsageSummaryResponse>
  listAdminWallets: (params?: AdminWalletListParams) => Promise<AdminWalletListResult>
}

function createServices(api: AxiosInstance): ServicesApi {
  return {
    signUp: (data) =>
      api.post("/auth/register", data).then((r) => r.data as AuthSessionPayload),
    checkUsernameAvailability: (username) =>
      api
        .get<UsernameAvailabilityResponse>("/auth/username/availability", {
          params: { username },
        })
        .then((r) => r.data),
    login: (data) =>
      api.post("/auth/login", data).then((r) => r.data as AuthSessionPayload),
    getUser: () =>
      api.get("/users/me").then((r) => {
        const normalized = normalizeAuthMeUser(r.data ?? null)
        if (normalized == null || typeof normalized !== "object" || Array.isArray(normalized)) {
          return null
        }
        return normalized as Record<string, unknown>
      }),
    logout: () => {
      const refreshToken = auth.getRefreshToken()
      if (!refreshToken) return Promise.resolve()
      return api.post("/auth/logout", { refresh_token: refreshToken })
    },
    getWallet: () => api.get("/credits/wallet").then((r) => r.data as WalletResponse),
    getUsageSummary: () =>
      api.get("/credits/usage/summary").then((r) => r.data as UsageSummaryResponse),
    getTransactions: (limit = 20) =>
      api
        .get<TransactionResponse[]>("/credits/transactions", { params: { limit } })
        .then((r) => r.data),
    listApiKeys: () => api.get<ApiKeyListItem[]>("/api-keys").then((r) => r.data),
    createApiKey: (name) =>
      api.post("/api-keys", { name }).then((r) => r.data as CreateApiKeyResponse),
    revokeApiKey: (id) => api.delete(`/api-keys/${id}`).then(() => undefined),
    listAdminUsers: (params) =>
      api.get<AdminUserListResult>("/admin/users", { params }).then((r) => r.data),
    getAdminUser: (id) =>
      api.get<AdminUserDetail>(`/admin/users/${id}`).then((r) => r.data),
    updateAdminUser: (id, data) =>
      api.patch<AdminUser>(`/admin/users/${id}`, data).then((r) => r.data),
    setAdminUserApiKeyAccess: (id, canCreateApiKeys) =>
      api
        .patch<AdminUser>(`/admin/users/${id}/api-key-access`, { canCreateApiKeys })
        .then((r) => r.data),
    getAdminUsageSummary: () =>
      api.get<AdminUsageSummaryResponse>("/admin/usage/summary").then((r) => r.data),
    listAdminWallets: (params) =>
      api.get<AdminWalletListResult>("/admin/wallets", { params }).then((r) => r.data),
  }
}

export default createServices
