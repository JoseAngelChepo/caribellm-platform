"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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
  const showAdminLink = stateService && isLoggedIn && isAdminRole(role)
  const onAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/")

  const onLogout = async () => {
    await services.logout()
    router.replace("/sign-in")
  }

  return (
    <header
      className={`app-header app-header--${position} app-header--${props.variant} ${className}`.trim()}
      style={{ "--app-header-max": `${maxWidth}px` } as React.CSSProperties}
    >
      <div className="app-header-inner">
        <CaribeLLMWordmark href={logoHref} className="app-header-logo" />

        {props.variant === "public" && props.navLinks && props.navLinks.length > 0 ? (
          <ul className="app-header-nav">
            {props.navLinks.map((link) => (
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
              <button type="button" className="app-header-btn-ghost" onClick={() => void onLogout()}>
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
              <Link href="/sign-in" className="app-header-signin">
                {header.loginLabel}
              </Link>
              <Link href="/sign-up" className="app-header-btn-primary">
                {header.signupLabel}
              </Link>
            </>
          )}
        </div>
      </div>

      <style jsx global>{`
        .wordmark {
          font-family: var(--app-mono);
          font-size: 13px;
          font-weight: 500;
          color: var(--launch-text);
          text-decoration: none;
          letter-spacing: -0.01em;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .wordmark :global(.wordmark-mark) {
          flex-shrink: 0;
        }

        .wordmark :global(.wordmark-text) {
          line-height: 1;
        }

        .wordmark:hover {
          text-decoration: none;
          color: var(--launch-text);
        }

        .wordmark-accent {
          color: var(--launch-accent);
        }

        .wordmark-sep {
          color: var(--launch-dim, var(--launch-muted));
          font-weight: 400;
          margin: 0 1px;
        }
      `}</style>

      <style jsx>{`
        .app-header {
          --launch-bg: #080b0b;
          --launch-border: #1c2424;
          --launch-text: #e8edec;
          --launch-muted: #8aaba7;
          --launch-accent: #00cfbd;
          --launch-dim: #008f82;

          top: 0;
          z-index: 100;
          background: rgba(8, 11, 11, 0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--launch-border);
        }

        .app-header--fixed {
          position: fixed;
          inset: 0 0 auto 0;
          background: var(--launch-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
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
          color: #080b0b;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          padding: 7px 14px;
          border: none;
          transition: background 0.15s;
        }

        .app-header-actions :global(.app-header-btn-primary:hover) {
          background: var(--launch-dim);
          color: #fff;
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

        @media (max-width: 640px) {
          .app-header-nav {
            display: none;
          }

          .app-header-actions :global(.app-header-signin) {
            display: none;
          }

          .app-header-user {
            display: none;
          }
        }
      `}</style>
    </header>
  )
}
