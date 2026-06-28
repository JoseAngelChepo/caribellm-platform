import LaunchSection from "@/components/launch/LaunchSection"
import LaunchSectionIntro from "@/components/launch/LaunchSectionIntro"
import { launchContent } from "@/content/launch"
import type { LaunchLink } from "@/content/launch"

const { participate } = launchContent

function BlockLink({ link }: { link: LaunchLink }) {
  const isPlaceholder = link.href === "#"
  const className = `block-link${isPlaceholder ? " block-link--muted" : ""}`

  if (isPlaceholder) {
    return <span className={className}>{link.label}</span>
  }

  if (link.external || link.href.startsWith("http")) {
    return (
      <a href={link.href} className={className} target="_blank" rel="noopener noreferrer">
        {link.label}
      </a>
    )
  }

  return (
    <a href={link.href} className={className}>
      {link.label}
    </a>
  )
}

export default function LaunchParticipateSection() {
  return (
    <LaunchSection id={participate.id} ariaLabelledBy="participate-title">
      <LaunchSectionIntro
        eyebrow={participate.eyebrow}
        title={participate.title}
        titleId="participate-title"
      />

      <div className="blocks">
        {participate.blocks.map((block) => (
          <article key={block.title} className="block">
            <h3>{block.title}</h3>
            <p className="body-text">{block.description}</p>
            {block.links && block.links.length > 0 ? (
              <div className="block-links">
                {block.links.map((link) => (
                  <BlockLink key={link.label} link={link} />
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>

      <style jsx>{`
        .blocks {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .block {
          padding: 32px 28px;
          border: 1px solid var(--launch-border);
          background: var(--launch-surface);
        }

        .block h3 {
          font-size: 17px;
          font-weight: 600;
          letter-spacing: -0.015em;
          margin: 0 0 14px;
        }

        .block :global(.body-text) {
          margin-bottom: 18px;
        }

        .block-links {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 18px;
        }

        .block-links :global(.block-link) {
          font-family: var(--app-mono);
          font-size: 13px;
          color: var(--launch-accent);
          text-decoration: none;
        }

        .block-links :global(.block-link:hover) {
          text-decoration: underline;
        }

        .block-links :global(.block-link--muted) {
          color: var(--launch-muted);
          cursor: default;
        }

        @media (max-width: 820px) {
          .blocks {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </LaunchSection>
  )
}
