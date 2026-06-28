import LaunchButton from "@/components/launch/LaunchButton"
import LaunchTerminalDemo from "@/components/launch/LaunchTerminalDemo"
import { launchContent } from "@/content/launch"

const { hero } = launchContent

export default function LaunchHeroSection() {
  return (
    <section className="hero" id="inicio" aria-labelledby="launch-title">
      <div className="hero-grid">
        <div className="hero-copy">
          <h1 id="launch-title">
            {hero.title}
            <span className="title-line">{hero.titleLine2}</span>
          </h1>

          <p className="hero-lede">{hero.lede}</p>

          <div className="hero-actions">
            <LaunchButton href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
            </LaunchButton>
            {/* GitHub CTA — ver secondaryCta en launch.ts */}
          </div>
        </div>

        <div className="hero-demo">
          <LaunchTerminalDemo />
        </div>
      </div>

      <style jsx>{`
        .hero {
          padding: 112px 0 80px;
          border-bottom: 1px solid var(--launch-border);
        }

        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(300px, 440px);
          gap: 64px;
          align-items: center;
        }

        .hero-copy {
          text-align: left;
        }

        .hero h1 {
          font-family: var(--app-title-font);
          font-size: clamp(34px, 3.8vw, 52px);
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -0.028em;
          color: var(--launch-text);
          margin: 0 0 18px;
          max-width: 14em;
        }

        .title-line {
          display: block;
        }

        .hero-lede {
          font-size: var(--launch-lede-size);
          color: var(--launch-muted);
          line-height: 1.6;
          margin: 0 0 32px;
          max-width: 28rem;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px 20px;
        }

        .hero-demo {
          width: 100%;
        }

        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
            align-items: start;
          }

          .hero h1 {
            max-width: none;
          }

          .hero-lede {
            max-width: none;
          }
        }

        @media (max-width: 640px) {
          .hero {
            padding-top: 96px;
            padding-bottom: 56px;
          }

          .hero-actions :global(.launch-btn--primary) {
            width: 100%;
          }
        }
      `}</style>
    </section>
  )
}
