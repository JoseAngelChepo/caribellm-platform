import LaunchCard from "@/components/launch/LaunchCard"
import LaunchSection from "@/components/launch/LaunchSection"
import LaunchSectionIntro from "@/components/launch/LaunchSectionIntro"
import { launchContent } from "@/content/launch"
import type { LaunchLink } from "@/content/launch"
import Link from "next/link"

const { use } = launchContent

function BlockLink({ link }: { link: LaunchLink }) {
  if (link.external || link.href.startsWith("http")) {
    return (
      <a href={link.href} className="block-link" target="_blank" rel="noopener noreferrer">
        {link.label}
      </a>
    )
  }

  return (
    <Link href={link.href} className="block-link">
      {link.label}
    </Link>
  )
}

export default function LaunchUseSection() {
  return (
    <LaunchSection id={use.id} ariaLabelledBy="use-title">
      <LaunchSectionIntro title={use.title} titleId="use-title" />

      <div className="blocks">
        {use.blocks.map((block) => (
          <LaunchCard key={block.title}>
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
        .blocks {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .blocks :global(.launch-card) {
          padding: 28px 24px;
        }

        h3 {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 8px;
        }

        p {
          font-size: var(--launch-body-size);
          color: var(--launch-muted);
          line-height: var(--launch-prose-leading);
          margin: 0 0 16px;
        }

        .block-links :global(.block-link) {
          font-size: 14px;
          font-weight: 500;
          color: var(--launch-accent);
          text-decoration: none;
        }

        .block-links :global(.block-link:hover) {
          text-decoration: underline;
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
