import HeroPrompt from "@/components/launch/HeroPrompt"
import { launchContent } from "@/content/launch"

const { hero } = launchContent

export default function LaunchHeroSection() {
  return (
    <section className="hero" id="inicio" aria-labelledby="launch-title">
      <div className="hero-inner">
        <HeroPrompt text={hero.prompt} />

        <h1 id="launch-title">
          <span className="title-main">{hero.title}</span>
          <span className="title-second">
            {hero.titleAccent}
            <span className="title-highlight">{hero.titleAccentHighlight}</span>
          </span>
        </h1>

        <div className="hero-copy">
          <p className="hero-lede">{hero.lede}</p>
          <p className="hero-lede">{hero.ledeContinued}</p>
        </div>

        <nav className="hero-links" aria-label="Enlaces principales">
          {hero.links.map((link, index) => (
            <span key={link.href} className="hero-link-wrap">
              {index > 0 ? <span className="hero-link-sep" aria-hidden="true">·</span> : null}
              {link.external || link.href.startsWith("http") ? (
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="hero-link">
                  {link.label}
                </a>
              ) : (
                <a href={link.href} className="hero-link">
                  {link.label}
                </a>
              )}
            </span>
          ))}
        </nav>

        <div className="hero-stack" aria-label="Etiquetas">
          {hero.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hero {
          display: flex;
          justify-content: center;
          padding: 120px 0 88px;
          border-bottom: 1px solid var(--launch-border);
        }

        .hero-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
          max-width: 44rem;
        }

        .hero-inner :global(.hero-prompt) {
          justify-content: center;
          margin-bottom: 28px;
        }

        .hero h1 {
          font-family: var(--app-title-font);
          font-size: clamp(40px, 5.5vw, 68px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.032em;
          margin: 0 0 28px;
          width: 100%;
        }

        .title-main,
        .title-second {
          display: block;
        }

        .title-second {
          color: var(--launch-text);
          font-weight: 600;
        }

        .title-highlight {
          color: var(--launch-accent);
          font-weight: 700;
        }

        .hero-copy {
          display: grid;
          gap: 12px;
          width: 100%;
          margin-bottom: 32px;
        }

        .hero-lede {
          font-size: var(--launch-lede-size);
          color: var(--launch-muted);
          line-height: var(--launch-prose-leading);
          margin: 0;
        }

        .hero-links {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 6px 18px;
          margin-bottom: 32px;
        }

        .hero-link-wrap {
          display: inline-flex;
          align-items: center;
          gap: 18px;
        }

        .hero-link-sep {
          color: var(--launch-border);
          font-family: var(--app-mono);
          font-size: 13px;
          user-select: none;
        }

        .hero-link {
          font-size: 15px;
          font-weight: 500;
          color: var(--launch-text);
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-color: var(--launch-border);
          transition:
            color 0.15s,
            text-decoration-color 0.15s;
        }

        .hero-link:hover {
          color: var(--launch-accent);
          text-decoration-color: var(--launch-accent);
        }

        .hero-stack {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .tag {
          font-family: var(--app-mono);
          font-size: 12px;
          color: var(--launch-muted);
          background: var(--launch-surface);
          border: 1px solid var(--launch-border);
          padding: 5px 11px;
          letter-spacing: 0.02em;
        }

        @media (max-width: 640px) {
          .hero {
            padding-top: 100px;
            padding-bottom: 64px;
          }

          .hero-inner {
            max-width: 100%;
          }

          .hero h1 {
            font-size: clamp(34px, 9vw, 44px);
            margin-bottom: 22px;
          }

          .hero-copy {
            gap: 10px;
            margin-bottom: 24px;
          }
        }
      `}</style>
    </section>
  )
}
