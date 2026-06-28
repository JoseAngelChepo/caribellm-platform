"use client"

import { useCallback, useEffect, useState } from "react"
import Loader from "@/components/ui/Loader"
import type { AdminUser } from "@/data/api/server"
import { useServices } from "@/data/providers/ServicesProvider"
import { toast } from "@/lib/toast"

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "—"
  return new Intl.DateTimeFormat("es-VE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso))
}

function displayName(user: AdminUser): string {
  const full = `${user.firstName} ${user.lastName}`.trim()
  return full || user.username || user.email
}

export default function AdminUsersPanel() {
  const { services } = useServices()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [users, setUsers] = useState<AdminUser[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const limit = 20

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearch(searchInput.trim())
      setPage(1)
    }, 300)
    return () => window.clearTimeout(timer)
  }, [searchInput])

  const loadUsers = useCallback(
    async (options?: { silent?: boolean }) => {
      if (options?.silent) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      try {
        const result = await services.listAdminUsers({
          page,
          limit,
          search: search || undefined,
        })
        setUsers(result.items)
        setTotal(result.total)
      } catch {
        toast.error("No se pudo cargar la lista de usuarios")
      } finally {
        setLoading(false)
        setRefreshing(false)
      }
    },
    [page, search, services],
  )

  useEffect(() => {
    void loadUsers()
  }, [loadUsers])

  const patchUser = async (
    userId: string,
    patch: Parameters<typeof services.updateAdminUser>[1],
    successMessage: string,
  ) => {
    setUpdatingId(userId)
    try {
      const updated = await services.updateAdminUser(userId, patch)
      setUsers((prev) => prev.map((item) => (item.id === userId ? updated : item)))
      toast.success(successMessage)
    } catch {
      toast.error("No se pudo actualizar el usuario")
    } finally {
      setUpdatingId(null)
    }
  }

  const onToggleApiKeyAccess = async (user: AdminUser) => {
    setUpdatingId(user.id)
    try {
      const updated = await services.setAdminUserApiKeyAccess(user.id, !user.canCreateApiKeys)
      setUsers((prev) => prev.map((item) => (item.id === user.id ? updated : item)))
      toast.success(updated.canCreateApiKeys ? "Acceso a API keys habilitado" : "Acceso a API keys revocado")
    } catch {
      toast.error("No se pudo cambiar el acceso a API keys")
    } finally {
      setUpdatingId(null)
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / limit))

  if (loading) {
    return (
      <div className="admin-panel-loading">
        <Loader compact theme="launch" />
      </div>
    )
  }

  return (
    <section className="admin-card">
      <div className="admin-toolbar">
        <input
          className="admin-input"
          type="search"
          placeholder="Buscar por email, nombre o usuario…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          aria-label="Buscar usuarios"
        />
        <button
          type="button"
          className="admin-btn-ghost"
          disabled={refreshing}
          onClick={() => void loadUsers({ silent: true })}
        >
          {refreshing ? "Actualizando…" : "Actualizar"}
        </button>
      </div>

      <p className="admin-meta">{total} usuario{total === 1 ? "" : "s"} registrados</p>

      {users.length === 0 ? (
        <p className="admin-empty">No hay usuarios que coincidan con la búsqueda.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>API keys</th>
                <th>Registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const busy = updatingId === user.id
                return (
                  <tr key={user.id}>
                    <td>
                      <p className="admin-user-name">{displayName(user)}</p>
                      <p className="admin-user-meta">{user.email}</p>
                      <p className="admin-user-meta">@{user.username}</p>
                    </td>
                    <td>
                      <select
                        className="admin-select"
                        value={user.role}
                        disabled={busy}
                        onChange={(e) =>
                          void patchUser(
                            user.id,
                            { role: e.target.value as "user" | "admin" },
                            "Rol actualizado",
                          )
                        }
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                    <td>
                      <span className={`admin-badge${user.isActive ? " admin-badge--ok" : ""}`}>
                        {user.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`admin-badge${user.canCreateApiKeys ? " admin-badge--ok" : ""}`}
                      >
                        {user.canCreateApiKeys ? "Permitido" : "Bloqueado"}
                      </span>
                    </td>
                    <td className="admin-date">{formatDate(user.createdAt)}</td>
                    <td>
                      <div className="admin-row-actions">
                        <button
                          type="button"
                          className="admin-btn-ghost"
                          disabled={busy}
                          onClick={() =>
                            void patchUser(
                              user.id,
                              { isActive: !user.isActive },
                              user.isActive ? "Usuario desactivado" : "Usuario activado",
                            )
                          }
                        >
                          {user.isActive ? "Desactivar" : "Activar"}
                        </button>
                        <button
                          type="button"
                          className="admin-btn-ghost"
                          disabled={busy}
                          onClick={() => void onToggleApiKeyAccess(user)}
                        >
                          {user.canCreateApiKeys ? "Revocar API" : "Permitir API"}
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
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

      <style jsx>{`
        .admin-panel-loading {
          display: flex;
          justify-content: center;
          padding: 80px 0;
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

        .admin-date {
          color: var(--launch-muted);
          white-space: nowrap;
        }

        .admin-badge {
          display: inline-flex;
          align-items: center;
          padding: 3px 8px;
          font-family: var(--app-mono);
          font-size: 10px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--launch-muted);
          border: 1px solid var(--launch-border);
        }

        .admin-badge--ok {
          color: var(--launch-accent);
          border-color: rgba(0, 207, 189, 0.35);
          background: rgba(0, 207, 189, 0.06);
        }

        .admin-select {
          background: var(--launch-bg);
          border: 1px solid var(--launch-border);
          color: var(--launch-text);
          font-size: 12px;
          padding: 6px 8px;
        }

        .admin-row-actions {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 120px;
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
    </section>
  )
}
