"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import CaribeLLMWordmark from "@/components/ui/CaribeLLMWordmark"
import { brandContent } from "@/content/brand"
import { layoutContent } from "@/config/layout"
import { useServices } from "@/data/providers/ServicesProvider"
import { isAdminRole } from "@/lib/roles"
import { userDisplayName } from "@/lib/userDisplayName"

const { header } = brandContent

export type AppHeaderNavLink = {
  label: string
  href: string
  external?: boolean
  className?: string
}

type AppHeaderBaseProps = {
  maxWidth?: number
  position?: "sticky" | "fixed"
  logoHref?: string
  className?: string
}

type AppHeaderPublicProps = AppHeaderBaseProps & {
  variant: "public"
  navLinks?: AppHeaderNavLink[]
}

type AppHeaderDashboardProps = AppHeaderBaseProps & {
  variant: "dashboard"
}

export type AppHeaderProps = AppHeaderPublicProps | AppHeaderDashboardProps

export default function AppHeader(props: AppHeaderProps) {
  const {
    maxWidth =
      props.variant === "dashboard"
        ? layoutContent.dashboardMaxWidth
        : layoutContent.publicMaxWidth,
    position = props.variant === "dashboard" ? "sticky" : "fixed",
    logoHref = "/",
    className = "",
  } = props

  const router = useRouter()
  const pathname = usePathname() ?? "/"
  const { user, isLoggedIn, role, stateService, services } = useServices()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = props.variant === "public" ? props.navLinks : undefined
  const showAdminLink = stateService && isLoggedIn && isAdminRole(role)
  const onAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/")

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }

    document.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const onLogout = async () => {
    await services.logout()
    router.replace("/sign-in")
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header
        className={`app-header app-header--${position} app-header--${props.variant} ${className}`.trim()}
        style={{ "--app-header-max": `${maxWidth}px` } as React.CSSProperties}
      >
        <div className="app-header-inner">
          <CaribeLLMWordmark href={logoHref} className="app-header-logo" />

          {navLinks && navLinks.length > 0 ? (
            <ul className="app-header-nav app-header-nav--desktop">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      className={link.className ?? "app-header-nav-link"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <a href={link.href} className={link.className ?? "app-header-nav-link"}>
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="app-header-actions">
            {props.variant === "dashboard" ? (
              <>
                {showAdminLink && !onAdminRoute ? (
                  <Link href="/admin" className="app-header-btn-ghost-link">
                    {header.adminLabel}
                  </Link>
                ) : null}
                {onAdminRoute ? (
                  <Link href="/dashboard" className="app-header-btn-ghost-link">
                    {header.dashboardLabel}
                  </Link>
                ) : null}
                <span className="app-header-user">{userDisplayName(user)}</span>
                <button
                  type="button"
                  className="app-header-btn-ghost"
                  onClick={() => void onLogout()}
                >
                  {header.logoutLabel}
                </button>
              </>
            ) : stateService && isLoggedIn ? (
              <>
                {showAdminLink && !onAdminRoute ? (
                  <Link href="/admin" className="app-header-btn-ghost-link">
                    {header.adminLabel}
                  </Link>
                ) : null}
                <Link href="/dashboard" className="app-header-btn-primary">
                  {header.dashboardLabel}
                </Link>
              </>
            ) : (
              <>
                <Link href="/sign-in" className="app-header-signin app-header-signin--desktop">
                  {header.loginLabel}
                </Link>
                <Link href="/sign-up" className="app-header-btn-primary">
                  {header.signupLabel}
                </Link>
              </>
            )}

            {navLinks && navLinks.length > 0 ? (
              <button
                type="button"
                className="app-header-menu-btn"
                aria-expanded={menuOpen}
                aria-controls="app-header-mobile-menu"
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span className="menu-bar" />
                <span className="menu-bar" />
                <span className="menu-bar" />
              </button>
            ) : null}
          </div>
        </div>
      </header>

      {navLinks && navLinks.length > 0 ? (
        <div
          id="app-header-mobile-menu"
          className={`app-header-mobile ${menuOpen ? "app-header-mobile--open" : ""}`}
          aria-hidden={!menuOpen}
        >
          <button
            type="button"
            className="app-header-mobile-backdrop"
            aria-label="Cerrar menú"
            onClick={closeMenu}
          />
          <div className="app-header-mobile-panel">
            <ul className="app-header-mobile-nav">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      className={link.className ?? "app-header-mobile-link"}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <a
                      href={link.href}
                      className={link.className ?? "app-header-mobile-link"}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            {props.variant === "public" && !(stateService && isLoggedIn) ? (
              <div className="app-header-mobile-actions">
                <Link href="/sign-in" className="app-header-mobile-signin" onClick={closeMenu}>
                  {header.loginLabel}
                </Link>
                <Link href="/sign-up" className="app-header-mobile-cta" onClick={closeMenu}>
                  {header.signupLabel}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      <style jsx>{`
        .app-header {
          top: 0;
          z-index: 100;
          background: rgba(7, 11, 12, 0.72);
          backdrop-filter: blur(16px) saturate(140%);
          -webkit-backdrop-filter: blur(16px) saturate(140%);
          border-bottom: 1px solid var(--launch-border);
        }

        .app-header--fixed {
          position: fixed;
          inset: 0 0 auto 0;
        }

        .app-header--sticky {
          position: sticky;
        }

        .app-header-inner {
          max-width: var(--app-header-max);
          margin: 0 auto;
          padding: 0 ${layoutContent.paddingX}px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .app-header-inner :global(.app-header-logo) {
          flex-shrink: 0;
        }

        .app-header-nav {
          display: flex;
          gap: 28px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .app-header-nav :global(.app-header-nav-link) {
          color: var(--launch-muted);
          text-decoration: none;
          font-size: 13px;
          transition: color 0.15s;
        }

        .app-header-nav :global(.app-header-nav-link:hover) {
          color: var(--launch-text);
          text-decoration: none;
        }

        .app-header-nav :global(.gh) {
          color: var(--launch-text);
          font-weight: 500;
        }

        .app-header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          margin-left: auto;
        }

        .app-header--public .app-header-actions {
          margin-left: 0;
        }

        .app-header-user {
          font-size: 13px;
          color: var(--launch-muted);
          max-width: 180px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .app-header-actions :global(.app-header-signin) {
          color: var(--launch-muted);
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          padding: 6px 10px;
          transition: color 0.15s;
        }

        .app-header-actions :global(.app-header-signin:hover) {
          color: var(--launch-text);
          text-decoration: none;
        }

        .app-header-actions :global(.app-header-btn-primary) {
          background: var(--launch-accent);
          color: #04100f;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          padding: 8px 15px;
          border: 1px solid var(--launch-accent);
          border-radius: 8px;
          transition:
            background 0.15s,
            border-color 0.15s;
        }

        .app-header-actions :global(.app-header-btn-primary:hover) {
          background: #2ee3d0;
          border-color: #2ee3d0;
          color: #04100f;
          text-decoration: none;
        }

        .app-header-btn-ghost {
          background: transparent;
          border: 1px solid var(--launch-border);
          color: var(--launch-text);
          font-size: 12px;
          font-weight: 500;
          padding: 6px 12px;
          cursor: pointer;
          transition: border-color 0.15s;
        }

        .app-header-btn-ghost:hover {
          border-color: var(--launch-muted);
        }

        .app-header-actions :global(.app-header-btn-ghost-link) {
          background: transparent;
          border: 1px solid var(--launch-border);
          color: var(--launch-text);
          text-decoration: none;
          font-size: 12px;
          font-weight: 500;
          padding: 6px 12px;
          transition: border-color 0.15s;
        }

        .app-header-actions :global(.app-header-btn-ghost-link:hover) {
          border-color: var(--launch-muted);
          text-decoration: none;
        }

        .app-header-menu-btn {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 44px;
          height: 44px;
          padding: 0;
          margin: 0 -8px 0 4px;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .menu-bar {
          display: block;
          width: 18px;
          height: 2px;
          background: var(--launch-text);
          margin: 0 auto;
        }

        .app-header-mobile {
          position: fixed;
          inset: 0;
          z-index: 200;
          pointer-events: none;
          visibility: hidden;
        }

        .app-header-mobile--open {
          pointer-events: auto;
          visibility: visible;
        }

        .app-header-mobile-backdrop {
          position: absolute;
          inset: 0;
          border: none;
          background: rgba(5, 9, 10, 0.78);
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .app-header-mobile--open .app-header-mobile-backdrop {
          opacity: 1;
        }

        .app-header-mobile-panel {
          position: absolute;
          top: 0;
          right: 0;
          width: min(320px, 100%);
          height: 100%;
          background: var(--launch-surface);
          border-left: 1px solid var(--launch-border);
          padding: 72px 24px 32px;
          transform: translateX(100%);
          transition: transform 0.22s ease-out;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .app-header-mobile--open .app-header-mobile-panel {
          transform: translateX(0);
        }

        .app-header-mobile-nav {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 4px;
        }

        .app-header-mobile-nav :global(.app-header-mobile-link) {
          display: block;
          padding: 12px 0;
          font-size: 15px;
          color: var(--launch-text);
          text-decoration: none;
          border-bottom: 1px solid var(--launch-border);
        }

        .app-header-mobile-nav :global(.gh) {
          font-weight: 500;
        }

        .app-header-mobile-actions {
          display: grid;
          gap: 10px;
          margin-top: auto;
        }

        .app-header-mobile-actions :global(.app-header-mobile-signin) {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          color: var(--launch-muted);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          border: 1px solid var(--launch-border);
        }

        .app-header-mobile-actions :global(.app-header-mobile-cta) {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          background: var(--launch-accent);
          color: #04100f;
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          border-radius: 8px;
        }

        @media (max-width: 768px) {
          .app-header-nav--desktop {
            display: none;
          }

          .app-header-menu-btn {
            display: flex;
          }

          .app-header-actions :global(.app-header-signin--desktop) {
            display: none;
          }

          .app-header-user {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
