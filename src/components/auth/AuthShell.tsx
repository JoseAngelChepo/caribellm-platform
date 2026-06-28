"use client"

type AuthShellProps = {
  children: React.ReactNode
}

export default function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="auth-shell launch-theme launch-theme--dashboard">
      <main className="auth-main">
        <div className="auth-card">{children}</div>
      </main>

      <style jsx>{`
        .auth-shell {
          min-height: 100vh;
          background: var(--launch-bg);
          color: var(--launch-text);
          font-family: var(--app-font);
          font-size: 15px;
          line-height: 1.6;
        }

        .auth-main {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 24px;
        }

        .auth-card {
          width: 100%;
          max-width: 420px;
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
          font-size: clamp(1.75rem, 4vw, 2rem);
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.15;
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
          padding: 11px 12px;
          font-family: var(--app-font);
          font-size: 14px;
          color: var(--launch-text);
          background: var(--launch-bg);
          border: 1px solid var(--launch-border);
          border-radius: 0;
          outline: none;
          transition:
            border-color 0.15s ease,
            box-shadow 0.15s ease;
        }

        .auth-shell :global(.auth-input::placeholder) {
          color: var(--launch-muted);
        }

        .auth-shell :global(.auth-input:focus) {
          border-color: var(--launch-accent);
          box-shadow: 0 0 0 1px rgba(0, 207, 189, 0.25);
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
          .auth-shell :global(.auth-row) {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
