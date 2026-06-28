import LaunchEyebrow from "@/components/launch/LaunchEyebrow"

type LaunchSectionIntroProps = {
  eyebrow: string
  title: string
  titleId: string
  lede?: string
}

export default function LaunchSectionIntro({
  eyebrow,
  title,
  titleId,
  lede,
}: LaunchSectionIntroProps) {
  return (
    <header className="intro">
      <LaunchEyebrow>{eyebrow}</LaunchEyebrow>
      <h2 id={titleId}>{title}</h2>
      {lede ? <p className="intro-lede">{lede}</p> : null}

      <style jsx>{`
        .intro {
          margin-bottom: 56px;
        }

        h2 {
          font-family: var(--app-title-font);
          font-size: clamp(28px, 4.2vw, 44px);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin: 0 0 16px;
          max-width: 16em;
        }

        .intro-lede {
          font-size: var(--launch-lede-size);
          color: var(--launch-muted);
          max-width: var(--launch-prose-width);
          line-height: var(--launch-prose-leading);
          margin: 0;
        }
      `}</style>
    </header>
  )
}
