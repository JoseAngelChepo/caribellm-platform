"use client"

import Link from "next/link"
import AnimatedNetworkBackground from "@/components/launch/AnimatedNetworkBackground"
import CaribeLLMMark from "@/components/ui/CaribeLLMMark"

type AuthShellProps = {
  children: React.ReactNode
}

export default function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="auth-shell launch-theme">
      <AnimatedNetworkBackground className="auth-net" density={0.7} />

      <main className="auth-main">
        <div className="auth-stack">
          <Link href="/" className="auth-brand" aria-label="CaribeLLM — inicio">
            <CaribeLLMMark size={26} className="auth-brand-mark" />
            <span className="auth-brand-name">CaribeLLM</span>
          </Link>

          <div className="auth-card">{children}</div>
        </div>
      </main>

      <style jsx>{`
        .auth-shell {
          position: relative;
          min-height: 100vh;
          color: var(--launch-text);
          font-family: var(--app-font);
          font-size: 15px;
          line-height: 1.6;
          overflow: hidden;
        }

        .auth-shell :global(.auth-net) {
          z-index: 0;
        }

        .auth-main {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 24px;
        }

        .auth-stack {
          width: 100%;
          max-width: 420px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .auth-brand {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: var(--launch-accent);
          text-decoration: none;
        }

        .auth-brand-name {
          font-family: var(--app-mono);
          font-size: 14px;
          font-weight: 600;
          color: var(--launch-text);
        }

        .auth-card {
          position: relative;
          width: 100%;
          padding: 36px 32px;
          background: linear-gradient(
            180deg,
            var(--launch-surface) 0%,
            var(--launch-bg-elevated) 100%
          );
          border: 1px solid var(--launch-border-strong);
          border-radius: var(--launch-radius);
          box-shadow: var(--launch-shadow-lg);
          overflow: hidden;
        }

        .auth-card::before {
          content: "";
          position: absolute;
          inset: 0 0 auto 0;
          height: 1px;
          background: var(--launch-gradient);
          opacity: 0.8;
        }

        /* —— Form primitives (shared by SignInForm / SignUpForm) —— */
        .auth-shell :global(.auth-form) {
          width: 100%;
        }

        .auth-shell :global(.auth-eyebrow) {
          font-family: var(--app-mono);
          font-size: 12px;
          color: var(--launch-accent);
          letter-spacing: 0.04em;
          margin: 0 0 12px;
        }

        .auth-shell :global(.auth-title) {
          margin: 0 0 8px;
          font-family: var(--app-title-font);
          font-size: clamp(1.85rem, 4vw, 2.15rem);
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.12;
          color: var(--launch-text);
        }

        .auth-shell :global(.auth-lede) {
          margin: 0 0 28px;
          font-size: 15px;
          color: var(--launch-muted);
          line-height: 1.65;
        }

        .auth-shell :global(.auth-fields) {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .auth-shell :global(.auth-row) {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .auth-shell :global(.auth-input) {
          width: 100%;
          padding: 12px 13px;
          font-family: var(--app-font);
          font-size: 14px;
          color: var(--launch-text);
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid var(--launch-border);
          border-radius: var(--launch-radius-sm);
          outline: none;
          transition:
            border-color 0.15s ease,
            box-shadow 0.15s ease;
        }

        .auth-shell :global(.auth-input::placeholder) {
          color: var(--launch-faint);
        }

        .auth-shell :global(.auth-input:focus) {
          border-color: var(--launch-accent);
          box-shadow: 0 0 0 3px var(--launch-accent-soft);
        }

        .auth-shell :global(.auth-error) {
          margin: 6px 0 0;
          color: var(--launch-danger);
          font-size: 12px;
          line-height: 1.4;
        }

        .auth-shell :global(.auth-hint) {
          margin: 6px 0 0;
          font-size: 12px;
          line-height: 1.4;
          color: var(--launch-muted);
        }

        .auth-shell :global(.auth-hint--ok) {
          color: var(--launch-success);
        }

        .auth-shell :global(.auth-hint--warn) {
          color: var(--launch-danger);
        }

        .auth-shell :global(.auth-hint--muted) {
          font-family: var(--app-mono);
          font-size: 11px;
        }

        .auth-shell :global(.auth-root-error) {
          margin-top: 4px;
          padding: 10px 12px;
          font-size: 13px;
          color: var(--launch-danger);
          border-radius: var(--launch-radius-sm);
          background: rgba(248, 113, 113, 0.08);
          border: 1px solid rgba(248, 113, 113, 0.25);
        }

        .auth-shell :global(.auth-password-wrap) {
          position: relative;
        }

        .auth-shell :global(.auth-password-wrap .auth-input) {
          padding-right: 2.75rem;
        }

        .auth-shell :global(.auth-password-toggle) {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border: 0;
          background: none;
          color: var(--launch-muted);
          cursor: pointer;
        }

        .auth-shell :global(.auth-password-toggle:hover) {
          color: var(--launch-text);
        }

        .auth-shell :global(.auth-divider) {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0 16px;
          font-family: var(--app-mono);
          font-size: 11px;
          color: var(--launch-muted);
          text-transform: lowercase;
        }

        .auth-shell :global(.auth-divider::before),
        .auth-shell :global(.auth-divider::after) {
          content: "";
          flex: 1;
          height: 1px;
          background: var(--launch-border);
        }

        .auth-shell :global(.auth-footer) {
          display: block;
          width: 100%;
          margin-top: 20px;
          padding: 0;
          border: 0;
          background: none;
          font-size: 13px;
          color: var(--launch-muted);
          cursor: pointer;
          text-align: center;
        }

        .auth-shell :global(.auth-footer:hover) {
          color: var(--launch-accent);
          text-decoration: underline;
        }

        .auth-shell :global(.auth-form--centered) {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .auth-shell :global(.auth-form--centered .auth-lede) {
          margin-bottom: 20px;
        }

        @media (max-width: 480px) {
          .auth-card {
            padding: 30px 22px;
          }
          .auth-shell :global(.auth-row) {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
