type Props = {
  /** Inline / card-sized; default fills the viewport (AuthGuard, etc.). */
  compact?: boolean
  /** Small spinner for tight panels. */
  inline?: boolean
  /** Dark theme matching launch/auth pages. */
  theme?: "default" | "launch"
}

export default function Loader({ compact = false, inline = false, theme = "default" }: Props) {
  const wrapClass = inline
    ? " loader-wrap--inline"
    : compact
      ? " loader-wrap--compact"
      : ""
  const themeClass = theme === "launch" ? " loader-wrap--launch" : ""
  return (
    <div className={`loader-wrap${wrapClass}${themeClass}`}>
      <div className="loader-spinner" aria-hidden />
      <style jsx>{`
        .loader-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          width: 100%;
          background: var(--app-bg);
        }
        .loader-wrap--compact {
          min-height: 12rem;
          background: transparent;
        }
        .loader-wrap--inline {
          min-height: 0;
          width: auto;
          background: transparent;
        }
        .loader-spinner {
          width: 2.25rem;
          height: 2.25rem;
          border: 3px solid var(--app-border);
          border-top-color: var(--app-primary);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        .loader-wrap--compact .loader-spinner {
          width: 1.75rem;
          height: 1.75rem;
          border-width: 2px;
        }
        .loader-wrap--inline .loader-spinner {
          width: 1.25rem;
          height: 1.25rem;
          border-width: 2px;
        }
        .loader-wrap--launch {
          background: #080b0b;
        }
        .loader-wrap--launch .loader-spinner {
          border-color: #1c2424;
          border-top-color: #00cfbd;
        }
        .loader-wrap--launch.loader-wrap--compact,
        .loader-wrap--launch.loader-wrap--inline {
          background: transparent;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
