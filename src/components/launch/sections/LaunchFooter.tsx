import { launchContent } from "@/content/launch"

const { conversation, footer } = launchContent

export default function LaunchFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-conversation">
        <p>{conversation.line}</p>
        <a
          href={conversation.github.href}
          className="footer-github"
          target="_blank"
          rel="noopener noreferrer"
        >
          {conversation.github.label} ↗
        </a>
      </div>
      <p className="footer-copy">{footer.copyright.replace("{year}", String(year))}</p>

      <style jsx>{`
        .footer {
          padding: 64px 0 40px;
          border-top: 1px solid var(--launch-border);
        }

        .footer-conversation {
          margin-bottom: 36px;
          max-width: var(--launch-prose-width);
        }

        .footer-conversation p {
          font-size: var(--launch-lede-size);
          color: var(--launch-muted);
          line-height: var(--launch-prose-leading);
          margin: 0 0 14px;
        }

        .footer-github {
          font-family: var(--app-mono);
          font-size: 14px;
          color: var(--launch-accent);
          text-decoration: none;
        }

        .footer-github:hover {
          text-decoration: underline;
        }

        .footer-copy {
          font-family: var(--app-mono);
          font-size: 13px;
          color: var(--launch-muted);
          margin: 0;
        }
      `}</style>
    </footer>
  )
}
