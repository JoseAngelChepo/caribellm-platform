import Link from "next/link"

type LaunchButtonProps = {
  href: string
  children: React.ReactNode
  variant?: "primary" | "secondary" | "ghost"
  size?: "md" | "lg"
  inverted?: boolean
  external?: boolean
  className?: string
}

export default function LaunchButton({
  href,
  children,
  variant = "primary",
  size = "md",
  inverted = false,
  external = false,
  className = "",
}: LaunchButtonProps) {
  const classes = [
    "launch-btn",
    `launch-btn--${variant}`,
    `launch-btn--${size}`,
    inverted ? "launch-btn--inverted" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const content = external || href.startsWith("http") ? (
    <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )

  return (
    <>
      {content}
      <style jsx global>{`
        .launch-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: var(--app-font);
          font-weight: 600;
          text-decoration: none;
          border: 1px solid transparent;
          border-radius: 9px;
          cursor: pointer;
          transition:
            background 0.15s ease,
            color 0.15s ease,
            border-color 0.15s ease;
          white-space: nowrap;
        }

        .launch-btn:hover {
          text-decoration: none;
        }

        .launch-btn--md {
          font-size: 14px;
          padding: 10px 18px;
          min-height: 42px;
        }

        .launch-btn--lg {
          font-size: 15px;
          padding: 12px 22px;
          min-height: 46px;
        }

        .launch-btn--primary {
          background: var(--launch-accent);
          color: #04100f;
          border-color: var(--launch-accent);
        }

        .launch-btn--primary:hover {
          background: #2ee3d0;
          border-color: #2ee3d0;
          color: #04100f;
        }

        .launch-btn--secondary {
          background: transparent;
          color: var(--launch-text);
          border-color: var(--launch-border-strong);
        }

        .launch-btn--secondary:hover {
          border-color: var(--launch-accent);
          color: var(--launch-text);
        }

        .launch-btn--ghost {
          background: transparent;
          color: var(--launch-muted);
          border-color: transparent;
          font-weight: 500;
          padding-left: 0;
          padding-right: 0;
          min-height: auto;
        }

        .launch-btn--ghost:hover {
          color: var(--launch-text);
        }

        .launch-btn--ghost.launch-btn--lg {
          font-size: 15px;
        }

        .launch-btn--inverted.launch-btn--primary {
          background: var(--launch-text);
          color: var(--launch-bg);
          border-color: var(--launch-text);
        }

        .launch-btn--inverted.launch-btn--primary:hover {
          background: var(--launch-accent);
          color: #080b0b;
          border-color: var(--launch-accent);
        }

        .launch-btn--inverted.launch-btn--secondary {
          background: transparent;
          color: var(--launch-text);
          border-color: rgba(232, 237, 236, 0.35);
        }

        .launch-btn--inverted.launch-btn--secondary:hover {
          border-color: var(--launch-text);
        }
      `}</style>
    </>
  )
}
