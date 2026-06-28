import LaunchSection from "@/components/launch/LaunchSection"
import LaunchSectionIntro from "@/components/launch/LaunchSectionIntro"
import { launchContent } from "@/content/launch"

const { code } = launchContent

export default function LaunchCodeSection() {
  return (
    <LaunchSection id={code.id} ariaLabelledBy="code-title" className="code-section">
      <LaunchSectionIntro
        eyebrow={code.eyebrow}
        title={code.title}
        titleId="code-title"
        lede={code.lede}
      />

      <p className="pending-note">{code.pendingNote}</p>

      <ul className="repo-list">
        {code.repos.map((repo) => (
          <li key={repo.slug}>
            <a
              href={repo.href}
              className={`repo-link${repo.pending ? " repo-link--pending" : ""}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="repo-slug">{repo.slug}</span>
              <span className="repo-desc">{repo.description}</span>
            </a>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .pending-note {
          font-family: var(--app-mono);
          font-size: 13px;
          color: var(--launch-muted);
          margin: -24px 0 32px;
          max-width: var(--launch-prose-width);
          line-height: 1.7;
        }

        .repo-list {
          list-style: none;
          margin: 0;
          padding: 0;
          border: 1px solid var(--launch-border);
        }

        .repo-list li {
          border-bottom: 1px solid var(--launch-border);
        }

        .repo-list li:last-child {
          border-bottom: none;
        }

        .repo-link {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: baseline;
          gap: 12px 24px;
          padding: 20px 24px;
          text-decoration: none;
          transition: background 0.15s;
        }

        .repo-link:hover {
          background: var(--launch-surface);
          text-decoration: none;
        }

        .repo-link--pending {
          opacity: 0.75;
        }

        .repo-slug {
          font-family: var(--app-mono);
          font-size: 14px;
          color: var(--launch-accent);
        }

        .repo-desc {
          font-size: 15px;
          color: var(--launch-muted);
          text-align: right;
        }

        @media (max-width: 640px) {
          .repo-link {
            grid-template-columns: 1fr;
            gap: 6px;
          }

          .repo-desc {
            text-align: left;
          }
        }
      `}</style>
    </LaunchSection>
  )
}
