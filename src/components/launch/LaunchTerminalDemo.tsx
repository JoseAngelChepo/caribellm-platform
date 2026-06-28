"use client"

import { useEffect, useRef, useState } from "react"

const BASE_URL = "https://api.caribellm.com/v1"
const COPY_TEXT = `export OPENAI_BASE_URL=${BASE_URL}`

export default function LaunchTerminalDemo() {
  const [step, setStep] = useState(0)
  const [copied, setCopied] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (reduceMotion) {
      setStep(5)
      return
    }
    const delays = [450, 950, 1500, 2150, 2600]
    delays.forEach((d, i) => {
      timers.current.push(setTimeout(() => setStep(i + 1), d))
    })
    const list = timers.current
    return () => list.forEach(clearTimeout)
  }, [])

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(COPY_TEXT)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="term" aria-label="Ejemplo de integración con la API de CaribeLLM">
      <div className="term-bar">
        <span className="term-dots" aria-hidden="true">
          <span className="term-dot dot-r" />
          <span className="term-dot dot-y" />
          <span className="term-dot dot-g" />
        </span>
        <span className="term-title">tu-proyecto — bash</span>
        <button type="button" className="term-copy" onClick={onCopy}>
          {copied ? "copiado ✓" : "copiar"}
        </button>
      </div>

      <div className="term-body">
        <p className="term-line">
          <span className="term-prompt">$</span>
          <span className="term-cmd">export OPENAI_BASE_URL=</span>
          <span className="term-url">{BASE_URL}</span>
        </p>

        {step >= 1 ? (
          <p className="term-line term-reveal">
            <span className="term-prompt">$</span>
            <span className="term-cmd">python app.py</span>
          </p>
        ) : null}

        {step >= 2 ? (
          <p className="term-line term-reveal term-comment">
            <span className="term-prompt term-prompt--ghost">›</span>
            conectando con la red CaribeLLM…
          </p>
        ) : null}

        {step >= 3 ? (
          <p className="term-line term-reveal">
            <span className="term-ok">✓</span>
            <span className="term-muted">listo · modelo</span>
            <span className="term-model">gpt-4o-mini</span>
          </p>
        ) : null}

        {step >= 4 ? (
          <p className="term-line term-reveal term-response">
            <span className="term-quote">“Hola desde el Caribe.”</span>
            {step < 5 ? <span className="term-cursor" aria-hidden="true" /> : null}
          </p>
        ) : null}

        {step >= 5 ? (
          <p className="term-line term-reveal term-meta">
            <span className="term-faint"># mismo SDK de OpenAI, sin cambiar nada más</span>
          </p>
        ) : null}
      </div>

      <style jsx>{`
        .term {
          position: relative;
          margin: 0;
          width: 100%;
          background: linear-gradient(180deg, #0d1516 0%, #0a1011 100%);
          border: 1px solid var(--launch-border-strong);
          border-radius: var(--launch-radius);
          overflow: hidden;
          box-shadow: var(--launch-shadow-lg), var(--launch-glow-teal);
        }

        .term::before {
          content: "";
          position: absolute;
          inset: 0 0 auto 0;
          height: 1px;
          background: var(--launch-gradient);
          opacity: 0.7;
        }

        .term-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-bottom: 1px solid var(--launch-border);
          background: rgba(255, 255, 255, 0.015);
        }

        .term-dots {
          display: inline-flex;
          gap: 7px;
        }

        .term-dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .dot-r {
          background: #ff5f57;
        }
        .dot-y {
          background: #febc2e;
        }
        .dot-g {
          background: #28c840;
        }

        .term-title {
          font-family: var(--app-mono);
          font-size: 12px;
          color: var(--launch-faint);
          margin-right: auto;
          letter-spacing: 0.01em;
        }

        .term-copy {
          font-family: var(--app-mono);
          font-size: 11px;
          letter-spacing: 0.03em;
          color: var(--launch-muted);
          background: transparent;
          border: 1px solid var(--launch-border);
          border-radius: var(--launch-radius-pill);
          padding: 4px 12px;
          cursor: pointer;
          transition:
            color 0.15s,
            border-color 0.15s,
            background 0.15s;
        }

        .term-copy:hover {
          color: var(--launch-accent);
          border-color: var(--launch-accent);
          background: var(--launch-accent-soft);
        }

        .term-body {
          padding: 22px 20px 26px;
          min-height: 230px;
        }

        .term-line {
          font-family: var(--app-mono);
          font-size: 13.5px;
          line-height: 2;
          margin: 0;
          white-space: pre-wrap;
          word-break: break-word;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 7px;
        }

        .term-reveal {
          animation: term-in 0.32s ease both;
        }

        @keyframes term-in {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .term-prompt {
          color: var(--launch-accent);
          font-weight: 600;
          user-select: none;
        }

        .term-prompt--ghost {
          color: var(--launch-faint);
        }

        .term-cmd {
          color: var(--launch-text);
        }

        .term-url {
          color: var(--launch-warm);
        }

        .term-comment {
          color: var(--launch-faint);
        }

        .term-ok {
          color: var(--launch-green);
          font-weight: 700;
        }

        .term-muted {
          color: var(--launch-muted);
        }

        .term-model {
          color: var(--launch-accent);
        }

        .term-response {
          margin-top: 4px;
        }

        .term-quote {
          color: var(--launch-gold);
          font-size: 14px;
        }

        .term-meta {
          margin-top: 6px;
        }

        .term-faint {
          color: var(--launch-faint);
        }

        .term-cursor {
          display: inline-block;
          width: 8px;
          height: 16px;
          background: var(--launch-accent);
          transform: translateY(2px);
          animation: term-blink 1.1s step-end infinite;
        }

        @keyframes term-blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        @media (max-width: 640px) {
          .term-body {
            padding: 18px 16px 22px;
            min-height: 210px;
          }
          .term-line {
            font-size: 12.5px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .term-reveal {
            animation: none;
          }
          .term-cursor {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}
