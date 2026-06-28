import LaunchCard from "@/components/launch/LaunchCard"
import LaunchSection from "@/components/launch/LaunchSection"
import LaunchSectionIntro from "@/components/launch/LaunchSectionIntro"
import { launchContent } from "@/content/launch"
import type { LaunchLink, LaunchUseBlock } from "@/content/launch"
import Link from "next/link"

const { use } = launchContent

function BlockIcon({ icon }: { icon: LaunchUseBlock["icon"] }) {
  if (icon === "node") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="5" r="2.4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="5" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="19" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M10.4 6.8 6.6 16M13.6 6.8 17.4 16M7.4 18h9.2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8.5 8 5 12l3.5 4M15.5 8l3.5 4-3.5 4M13.5 5l-3 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BlockLink({ link }: { link: LaunchLink }) {
  const isExternal = link.external || link.href.startsWith("http")
  if (isExternal) {
    return (
      <a href={link.href} className="block-link" target="_blank" rel="noopener noreferrer">
        {link.label}
        <span aria-hidden="true">→</span>
      </a>
    )
  }
  return (
    <Link href={link.href} className="block-link">
      {link.label}
      <span aria-hidden="true">→</span>
    </Link>
  )
}

export default function LaunchUseSection() {
  return (
    <LaunchSection id={use.id} ariaLabelledBy="use-title">
      <LaunchSectionIntro
        eyebrow={use.eyebrow}
        title={use.title}
        titleId="use-title"
        lede={use.lede}
      />

      <div className="router-panel">
        <div className="pool">
          <span className="pool-amount">{use.pool.amount}</span>
          <span className="pool-label">{use.pool.label}</span>
        </div>
        <div className="models">
          <p className="models-title">{use.models.title}</p>
          <ul className="models-list">
            {use.models.items.map((model) => (
              <li key={model} className="model-chip">
                {model}
              </li>
            ))}
          </ul>
          <p className="models-note">{use.models.note}</p>
        </div>
      </div>

      <div className="blocks">
        {use.blocks.map((block, i) => (
          <LaunchCard key={block.title} className={`use-card use-card--${i === 0 ? "teal" : "warm"}`}>
            <span className="use-icon" aria-hidden="true">
              <BlockIcon icon={block.icon} />
            </span>
            <h3>{block.title}</h3>
            <p>{block.description}</p>
            {block.links && block.links.length > 0 ? (
              <div className="block-links">
                {block.links.map((link) => (
                  <BlockLink key={link.label} link={link} />
                ))}
              </div>
            ) : null}
          </LaunchCard>
        ))}
      </div>

      <style jsx>{`
        .router-panel {
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
          margin-bottom: 20px;
          border: 1px solid var(--launch-border);
          border-radius: var(--launch-radius);
          background: linear-gradient(
            180deg,
            var(--launch-surface) 0%,
            var(--launch-bg-elevated) 100%
          );
          box-shadow: var(--launch-shadow-md);
          overflow: hidden;
        }

        .pool {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 10px;
          padding: 34px 30px;
          border-right: 1px solid var(--launch-border);
          background: var(--launch-warm-soft);
        }

        .pool-amount {
          font-family: var(--app-title-font);
          font-size: clamp(40px, 5vw, 56px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.02em;
          color: var(--launch-warm);
        }

        .pool-label {
          font-size: 14px;
          line-height: 1.55;
          color: var(--launch-muted);
          max-width: 18rem;
        }

        .models {
          padding: 34px 30px;
        }

        .models-title {
          margin: 0 0 16px;
          font-family: var(--app-mono);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--launch-faint);
        }

        .models-list {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          list-style: none;
          margin: 0 0 16px;
          padding: 0;
        }

        .model-chip {
          font-family: var(--app-mono);
          font-size: 13px;
          color: var(--launch-text);
          padding: 7px 12px;
          border: 1px solid var(--launch-border-strong);
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.22);
        }

        .models-note {
          margin: 0;
          font-size: 13px;
          color: var(--launch-muted);
        }

        .blocks {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .blocks :global(.use-card) {
          position: relative;
          padding: 34px 30px;
          transition:
            transform 0.2s ease,
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .blocks :global(.use-card:hover) {
          transform: translateY(-4px);
          box-shadow: var(--launch-shadow-lg);
        }

        .blocks :global(.use-card--teal:hover) {
          border-color: rgba(20, 214, 194, 0.4);
        }

        .blocks :global(.use-card--warm:hover) {
          border-color: rgba(255, 157, 108, 0.4);
        }

        .use-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          margin-bottom: 20px;
          border-radius: var(--launch-radius-sm);
          border: 1px solid var(--launch-border);
        }

        .use-icon :global(svg) {
          width: 22px;
          height: 22px;
        }

        .blocks :global(.use-card--teal) .use-icon {
          color: var(--launch-accent);
          background: var(--launch-accent-soft);
          border-color: rgba(20, 214, 194, 0.25);
        }

        .blocks :global(.use-card--warm) .use-icon {
          color: var(--launch-warm);
          background: var(--launch-warm-soft);
          border-color: rgba(255, 157, 108, 0.25);
        }

        h3 {
          font-family: var(--app-title-font);
          font-size: 21px;
          font-weight: 600;
          letter-spacing: -0.01em;
          margin: 0 0 10px;
          color: var(--launch-text);
        }

        p {
          font-size: var(--launch-body-size);
          color: var(--launch-muted);
          line-height: var(--launch-prose-leading);
          margin: 0 0 20px;
        }

        .block-links {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }

        .block-links :global(.block-link) {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 600;
          color: var(--launch-accent);
          text-decoration: none;
          transition: gap 0.18s ease;
        }

        .block-links :global(.block-link:hover) {
          gap: 10px;
          text-decoration: none;
        }

        @media (max-width: 820px) {
          .router-panel {
            grid-template-columns: 1fr;
          }
          .pool {
            border-right: none;
            border-bottom: 1px solid var(--launch-border);
          }
          .blocks {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </LaunchSection>
  )
}
