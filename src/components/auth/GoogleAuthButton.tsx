type Props = {
  text: string
  onClick: () => void
  variant?: "default" | "launch"
}

export default function GoogleAuthButton({ text, onClick, variant = "default" }: Props) {
  const launchClass = variant === "launch" ? " btn-google--launch" : ""
  return (
    <button className={`btn-google${launchClass}`} type="button" onClick={onClick}>
      <img
        className="btn-google__icon"
        src="/google-icon.png"
        alt=""
        width={20}
        height={20}
        aria-hidden
      />
      <span>{text}</span>
      <style jsx>{`
        .btn-google {
          width: 100%;
          padding: 0.625rem 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.625rem;
          font-family: var(--app-font);
          font-size: 0.9375rem;
          font-weight: 500;
          color: var(--app-text);
          background: var(--app-surface);
          border: 1px solid var(--app-border-strong);
          border-radius: var(--app-radius);
          cursor: pointer;
          transition:
            background 0.15s ease,
            border-color 0.15s ease,
            box-shadow 0.15s ease;
        }
        .btn-google:hover {
          background: var(--app-surface-muted);
          border-color: var(--app-border-strong);
          box-shadow: var(--app-shadow-sm);
        }
        .btn-google--launch {
          color: #e8edec;
          background: #080b0b;
          border: 1px solid #1c2424;
          border-radius: 0;
        }
        .btn-google--launch:hover {
          background: #0f1414;
          border-color: #4a5a58;
          box-shadow: none;
        }
        .btn-google__icon {
          width: 20px;
          height: 20px;
          object-fit: contain;
          flex-shrink: 0;
        }
      `}</style>
    </button>
  )
}
