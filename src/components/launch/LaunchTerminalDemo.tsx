export default function LaunchTerminalDemo() {
  return (
    <div className="term" aria-label="Ejemplo de integración">
      <div className="term-bar" aria-hidden="true">
        <span className="term-dot dot-r" />
        <span className="term-dot dot-y" />
        <span className="term-dot dot-g" />
        <span className="term-label">bash</span>
      </div>
      <div className="term-body">
        <p className="term-line">
          <span className="term-prompt">$</span>
          <span className="term-cmd">{" export OPENAI_BASE_URL="}</span>
          <span className="term-url">{"https://api.caribellm.com"}</span>
        </p>
        <p className="term-line">
          <span className="term-prompt">$</span>
          <span className="term-comment">{" # tu SDK de OpenAI funciona igual"}</span>
        </p>
      </div>

      <style jsx>{`
        .term {
          margin: 0;
          background: var(--launch-surface);
          border: 1px solid var(--launch-border);
          overflow: hidden;
        }

        .term-bar {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 11px 14px;
          border-bottom: 1px solid var(--launch-border);
          background: rgba(255, 255, 255, 0.02);
        }

        .term-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          flex-shrink: 0;
          opacity: 0.9;
        }

        .dot-r {
          background: #e0443e;
        }

        .dot-y {
          background: #dea123;
        }

        .dot-g {
          background: #3fb950;
        }

        .term-label {
          font-family: var(--app-mono);
          font-size: 11px;
          color: var(--launch-muted);
          margin-left: 2px;
          letter-spacing: 0.05em;
        }

        .term-body {
          padding: 18px 16px 20px;
        }

        .term-line {
          font-family: var(--app-mono);
          font-size: 13px;
          line-height: 1.85;
          margin: 0;
          white-space: pre;
          overflow-x: auto;
        }

        .term-prompt {
          color: var(--launch-green);
          font-weight: 600;
          user-select: none;
        }

        .term-cmd {
          color: var(--launch-text);
        }

        .term-url {
          color: var(--launch-accent);
        }

        .term-comment {
          color: var(--launch-muted);
        }

        @media (max-width: 640px) {
          .term-line {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  )
}
