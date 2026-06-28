import CaribeLLMMark from "@/components/ui/CaribeLLMMark"
import { launchContent } from "@/content/launch"

const { footer, hero } = launchContent

export default function LaunchFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-brand">
        <CaribeLLMMark size={30} className="footer-mark" />
        <span className="footer-name">CaribeLLM</span>
      </div>
      <p className="footer-tag">{hero.titleLead} Venezuela y el Caribe.</p>
      <p className="footer-copy">{footer.copyright.replace("{year}", String(year))}</p>

      <style jsx>{`
        .footer {
          padding: 64px 0 48px;
          text-align: center;
        }

        .footer-brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
          color: var(--launch-accent);
        }

        .footer-name {
          font-family: var(--app-mono);
          font-size: 15px;
          font-weight: 600;
          color: var(--launch-text);
        }

        .footer-tag {
          margin: 0 0 18px;
          font-size: 14px;
          color: var(--launch-muted);
        }

        .footer-copy {
          font-family: var(--app-mono);
          font-size: 12px;
          color: var(--launch-faint);
          margin: 0;
        }
      `}</style>
    </footer>
  )
}
