"use client"

import { launchContent } from "@/content/launch"
import type { LaunchPhaseStatus } from "@/content/launch"

const { brand, hero, mission, phases, footer } = launchContent

const statusLabels: Record<LaunchPhaseStatus, string> = {
  launching: "En lanzamiento",
  building: "En construcción",
  planned: "Planificado",
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

export default function LaunchPage() {
  const year = new Date().getFullYear()

  return (
    <div className="page">
      <nav className="nav" aria-label="Principal">
        <div className="nav-inner">
          <a href="#inicio" className="nav-logo" aria-label="CaribeLLM archipielago — inicio">
            {brand.prefix}
            <span className="a">{brand.accent}</span>
            <span className="s">/</span>
            {brand.sub}
          </a>
          <ul className="nav-links">
            <li>
              <a href={`#${mission.id}`}>objetivo</a>
            </li>
            <li>
              <a href={`#${phases.id}`}>fases</a>
            </li>
            <li>
              <a
                href={footer.github}
                className="gh"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub&nbsp;↗
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="wrap">
        {/* ── HERO ── */}
        <section className="hero" id="inicio" aria-labelledby="launch-title">
          <h1 id="launch-title">
            <span className="title-line">{hero.title}</span>
            <span className="title-line title-accent">
              {hero.titleAccent}
              <span className="title-highlight">{hero.titleAccentHighlight}</span>
            </span>
          </h1>

          <p className="hero-sub">{hero.lede}</p>

          <div className="hero-actions">
            <a href={`#${phases.id}`} className="btn-primary">
              {hero.primaryCta}
            </a>
            <a
              href={footer.github}
              className="btn-ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
              {hero.secondaryCta}
            </a>
          </div>

          <div className="hero-stack">
            {hero.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* ── TERMINAL DEMO ── */}
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

        {/* ── MISSION ── */}
        <section id={mission.id} className="section" aria-labelledby="mission-title">
          <p className="eyebrow">{mission.eyebrow}</p>
          <h2 id="mission-title">
            {mission.title}
            <br />
            {mission.titleAccent}
          </h2>
          <p className="section-sub">{mission.lede}</p>

          <div className="features">
            {mission.pillars.map((pillar) => (
              <article key={pillar.title} className="feature">
                <div className="f-code">{pillar.code}</div>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── PHASES ── */}
        <section id={phases.id} className="section section-last" aria-labelledby="phases-title">
          <p className="eyebrow">{phases.eyebrow}</p>
          <h2 id="phases-title">
            {phases.title}
            <br />
            {phases.titleAccent}
          </h2>
          <p className="section-sub">{phases.lede}</p>

          {phases.stages.map((stage) => (
            <article key={stage.id} className="phase">
              <div className={`ph-num ${stage.status === "launching" ? "active" : ""}`}>
                {String(stage.id).padStart(2, "0")}
              </div>
              <div>
                <span
                  className={`badge ${
                    stage.status === "launching" ? "badge-live" : "badge-planned"
                  }`}
                >
                  {statusLabels[stage.status]}
                </span>
                <h3>{stage.label}</h3>
                <p>{stage.description}</p>
              </div>
            </article>
          ))}

          <p className="roadmap-note">
            <span aria-hidden="true">{"// "}</span>
            {phases.note}
          </p>
        </section>

        <footer className="footer">
          <span className="footer-copy">
            {footer.copyright.replace("{year}", String(year))}
          </span>
          <div className="footer-links">
            {footer.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...("external" in link && link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            ))}
          </div>
        </footer>
      </div>

      <style jsx>{`
        .page {
          --launch-bg: #080b0b;
          --launch-surface: #0f1414;
          --launch-border: #1c2424;
          --launch-text: #e8edec;
          --launch-muted: #8aaba7;
          --launch-accent: #00cfbd;
          --launch-dim: #008f82;
          --launch-green: #22c55e;

          min-height: 100vh;
          background: var(--launch-bg);
          color: var(--launch-text);
          font-family: var(--app-font);
          font-size: 15px;
          line-height: 1.6;
        }

        /* ── NAV ── */
        .nav {
          position: fixed;
          inset: 0 0 auto 0;
          z-index: 100;
          background: var(--launch-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--launch-border);
        }

        .nav-inner {
          max-width: 760px;
          margin: 0 auto;
          padding: 0 24px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-logo {
          font-family: var(--app-mono);
          font-size: 13px;
          font-weight: 500;
          color: var(--launch-text);
          text-decoration: none;
          letter-spacing: -0.01em;
        }

        .nav-logo :global(.a) {
          color: var(--launch-accent);
        }

        /* "/" rendered as intentional typographic mark */
        .nav-logo :global(.s) {
          color: var(--launch-dim);
          font-weight: 400;
          margin: 0 1px;
        }

        .nav-links {
          display: flex;
          gap: 28px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-links a {
          color: var(--launch-muted);
          text-decoration: none;
          font-size: 13px;
          transition: color 0.15s;
        }

        .nav-links a:hover {
          color: var(--launch-text);
          text-decoration: none;
        }

        .nav-links :global(.gh) {
          color: var(--launch-text);
          font-weight: 500;
        }

        /* ── LAYOUT ── */
        .wrap {
          max-width: 760px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ── HERO ── */
        .hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding-top: 120px;
          padding-bottom: 72px;
          border-bottom: 1px solid var(--launch-border);
        }

        .hero h1 {
          display: flex;
          flex-direction: column;
          gap: 0.06em;
          font-family: var(--app-title-font);
          font-size: clamp(40px, 6.5vw, 72px);
          font-weight: 700;
          line-height: 1.04;
          letter-spacing: -0.035em;
          margin: 0 auto 24px;
          max-width: 680px;
        }

        .hero h1 :global(.title-line) {
          display: block;
        }

        .hero h1 :global(.title-accent) {
          color: var(--launch-text);
          font-weight: 600;
        }

        .hero h1 :global(.title-highlight) {
          color: var(--launch-accent);
          font-weight: 700;
        }

        .hero-sub {
          font-size: 17px;
          color: var(--launch-muted);
          line-height: 1.65;
          max-width: 500px;
          margin: 0 auto 36px;
        }

        .hero-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 40px;
        }

        .btn-primary {
          background: var(--launch-accent);
          color: #080b0b;
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          padding: 11px 22px;
          display: inline-block;
          transition: background 0.15s;
        }

        .btn-primary:hover {
          background: var(--launch-dim);
          color: #fff;
          text-decoration: none;
        }

        .btn-ghost {
          background: transparent;
          color: var(--launch-text);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          padding: 10px 22px;
          border: 1px solid var(--launch-border);
          display: inline-flex;
          align-items: center;
          gap: 7px;
          transition: border-color 0.15s;
        }

        .btn-ghost:hover {
          border-color: var(--launch-muted);
          text-decoration: none;
        }

        .hero-stack {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .tag {
          font-family: var(--app-mono);
          font-size: 11px;
          color: var(--launch-muted);
          background: var(--launch-surface);
          border: 1px solid var(--launch-border);
          padding: 3px 9px;
          letter-spacing: 0.02em;
        }

        /* ── TERMINAL DEMO ── */
        .term-demo {
          max-width: 560px;
          margin: 48px auto 0;
          background: var(--launch-surface);
          border: 1px solid var(--launch-border);
          overflow: hidden;
        }

        .term-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
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
          font-size: 11px;
          color: var(--launch-muted);
          margin-left: 4px;
          letter-spacing: 0.06em;
        }

        .term-body {
          padding: 16px 18px 18px;
        }

        .term-line {
          font-family: var(--app-mono);
          font-size: 13px;
          line-height: 1.8;
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

        /* ── SECTIONS ── */
        .section {
          padding: 72px 0;
          border-bottom: 1px solid var(--launch-border);
        }

        .section-last {
          border-bottom: none;
        }

        .eyebrow {
          font-family: var(--app-mono);
          font-size: 11px;
          color: var(--launch-accent);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin: 0 0 10px;
        }

        .section h2 {
          font-size: clamp(26px, 4vw, 40px);
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.1;
          margin: 0 0 12px;
          max-width: 520px;
        }

        .section-sub {
          font-size: 15px;
          color: var(--launch-muted);
          max-width: 440px;
          line-height: 1.7;
          margin: 0 0 44px;
        }

        /* ── FEATURES GRID ── */
        .features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border: 1px solid var(--launch-border);
        }

        .feature {
          padding: 24px 20px;
          border-right: 1px solid var(--launch-border);
        }

        .feature:last-child {
          border-right: none;
        }

        .f-code {
          font-family: var(--app-mono);
          font-size: 11px;
          color: var(--launch-accent);
          margin-bottom: 14px;
          letter-spacing: 0.02em;
        }

        .feature h3 {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.01em;
          margin: 0 0 8px;
        }

        .feature p {
          font-size: 13px;
          color: var(--launch-muted);
          line-height: 1.65;
          margin: 0;
        }

        /* ── PHASES ── */
        .phase {
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 16px;
          padding: 16px 0;
          border-top: 1px solid var(--launch-border);
          align-items: start;
        }

        .phase:last-of-type {
          border-bottom: 1px solid var(--launch-border);
        }

        .ph-num {
          font-family: var(--app-mono);
          font-size: 12px;
          color: var(--launch-border);
          padding-top: 6px;
          font-feature-settings: "tnum";
        }

        .ph-num.active {
          color: var(--launch-accent);
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--app-mono);
          font-size: 10px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 3px 8px;
          margin-bottom: 8px;
        }

        .badge-live {
          background: rgba(0, 207, 189, 0.08);
          color: var(--launch-accent);
          border: 1px solid rgba(0, 207, 189, 0.2);
        }

        .badge-live::before {
          content: "";
          width: 5px;
          height: 5px;
          background: var(--launch-accent);
          border-radius: 50%;
          flex-shrink: 0;
        }

        .badge-planned {
          background: transparent;
          color: var(--launch-muted);
          border: 1px solid var(--launch-border);
        }

        .phase h3 {
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.015em;
          margin: 0 0 4px;
        }

        .phase p {
          font-size: 13px;
          color: var(--launch-muted);
          line-height: 1.65;
          margin: 0;
        }

        .roadmap-note {
          margin: 24px 0 0;
          font-family: var(--app-mono);
          font-size: 12px;
          color: var(--launch-muted);
        }

        .roadmap-note span {
          color: var(--launch-accent);
        }

        /* ── FOOTER ── */
        .footer {
          padding: 32px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--launch-border);
        }

        .footer-copy {
          font-family: var(--app-mono);
          font-size: 12px;
          color: var(--launch-muted);
        }

        .footer-links {
          display: flex;
          gap: 24px;
        }

        .footer-links a {
          font-size: 12px;
          color: var(--launch-muted);
          text-decoration: none;
          transition: color 0.15s;
        }

        .footer-links a:hover {
          color: var(--launch-text);
          text-decoration: none;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 640px) {
          .nav-links {
            gap: 18px;
          }

          .term-demo {
            margin-top: 36px;
          }

          .term-line {
            font-size: 12px;
          }

          .features {
            grid-template-columns: 1fr;
          }

          .feature {
            border-right: none;
            border-bottom: 1px solid var(--launch-border);
          }

          .feature:last-child {
            border-bottom: none;
          }

          .footer {
            flex-direction: column;
            gap: 20px;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  )
}
