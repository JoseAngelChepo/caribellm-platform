export default function LaunchTerminalSection() {
  return (
    <div className="term-wrap">
      <div className="term-demo" aria-label="Ejemplo de integración">
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
          <p className="term-line term-comment-line">
            <span className="term-prompt">$</span>
            <span className="term-comment">{" # tu código de OpenAI funciona igual"}</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        .term-wrap {
          padding: 56px 0 72px;
        }

        .term-demo {
          max-width: 600px;
          margin: 0 auto;
          background: var(--launch-surface);
          border: 1px solid var(--launch-border);
          overflow: hidden;
        }

        .term-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--launch-border);
          background: rgba(255, 255, 255, 0.02);
        }

        .term-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .dot-r {
          background: #ff5f57;
        }

        .dot-y {
          background: #ffbd2e;
        }

        .dot-g {
          background: #28ca41;
        }

        .term-label {
          font-family: var(--app-mono);
          font-size: 12px;
          color: var(--launch-muted);
          margin-left: 4px;
          letter-spacing: 0.06em;
        }

        .term-body {
          padding: 20px 22px 22px;
        }

        .term-line {
          font-family: var(--app-mono);
          font-size: 14px;
          line-height: 1.9;
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
          .term-wrap {
            padding: 40px 0 56px;
          }

          .term-line {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  )
}
