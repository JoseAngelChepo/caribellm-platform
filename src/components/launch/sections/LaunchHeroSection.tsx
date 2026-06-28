import AnimatedNetworkBackground from "@/components/launch/AnimatedNetworkBackground"
import HeroPrompt from "@/components/launch/HeroPrompt"
import LaunchButton from "@/components/launch/LaunchButton"
import LaunchTerminalDemo from "@/components/launch/LaunchTerminalDemo"
import { launchContent } from "@/content/launch"

const { hero } = launchContent

export default function LaunchHeroSection() {
  return (
    <section className="hero" id="inicio" aria-labelledby="launch-title">
      <AnimatedNetworkBackground className="hero-net" />

      <div className="hero-inner">
        <HeroPrompt text={hero.prompt} />

        <h1 id="launch-title">
          {hero.titleLead} <span className="title-highlight">{hero.titleHighlight}</span>
        </h1>

        <p className="hero-lede">{hero.lede}</p>

        <div className="hero-actions">
          <LaunchButton href={hero.primaryCta.href} size="lg">
            {hero.primaryCta.label}
          </LaunchButton>
          <LaunchButton href={hero.secondaryCta.href} variant="secondary" size="lg">
            {hero.secondaryCta.label}
          </LaunchButton>
        </div>

        <ul className="hero-tags" aria-label="Características">
          {hero.tags.map((tag) => (
            <li key={tag} className="hero-tag">
              {tag}
            </li>
          ))}
        </ul>

        <div className="hero-demo">
          <LaunchTerminalDemo />
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          padding: 152px 0 92px;
          overflow: hidden;
        }

        .hero :global(.hero-net) {
          z-index: 0;
        }

        .hero-inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 50rem;
          margin: 0 auto;
        }

        .hero-inner :global(.hero-prompt) {
          justify-content: center;
          margin-bottom: 26px;
        }

        .hero h1 {
          font-family: var(--app-title-font);
          font-size: var(--launch-text-display);
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: var(--launch-text);
          margin: 0 0 22px;
          max-width: 16em;
          text-wrap: balance;
        }

        .title-highlight {
          background: var(--launch-gradient);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }

        .hero-lede {
          font-size: var(--launch-lede-size);
          color: var(--launch-muted);
          line-height: 1.6;
          margin: 0 auto 34px;
          max-width: 34rem;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 26px;
        }

        .hero-tags {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 9px;
          list-style: none;
          margin: 0 0 64px;
          padding: 0;
        }

        .hero-tag {
          font-family: var(--app-mono);
          font-size: 12.5px;
          color: var(--launch-muted);
          letter-spacing: 0.01em;
          padding: 6px 13px;
          border: 1px solid var(--launch-border);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.015);
        }

        .hero-demo {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }

        @media (max-width: 640px) {
          .hero {
            padding: 124px 0 64px;
          }
          .hero h1 {
            letter-spacing: -0.02em;
          }
          .hero-lede {
            font-size: 16px;
          }
          .hero-actions :global(.launch-btn) {
            width: 100%;
          }
          .hero-tags {
            margin-bottom: 44px;
          }
        }
      `}</style>
    </section>
  )
}
