import { launchContent } from "@/content/launch"

const { footer } = launchContent

export default function LaunchFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <p className="footer-copy">{footer.copyright.replace("{year}", String(year))}</p>

      <style jsx>{`
        .footer {
          padding: 48px 0 32px;
          border-top: 1px solid var(--launch-border);
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
