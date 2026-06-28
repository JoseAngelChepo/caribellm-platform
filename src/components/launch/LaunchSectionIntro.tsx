import LaunchEyebrow from "@/components/launch/LaunchEyebrow"

type LaunchSectionIntroProps = {
  eyebrow?: string
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
      {eyebrow ? <LaunchEyebrow>{eyebrow}</LaunchEyebrow> : null}
      <h2 id={titleId}>{title}</h2>
      {lede ? <p className="intro-lede">{lede}</p> : null}

      <style jsx>{`
        .intro {
          margin-bottom: 40px;
        }

        h2 {
          font-family: var(--app-title-font);
          font-size: var(--launch-text-h2);
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin: 0 0 12px;
          max-width: 20em;
        }

        .intro-lede {
          font-size: var(--launch-body-size);
          color: var(--launch-muted);
          max-width: var(--launch-prose-width);
          line-height: var(--launch-prose-leading);
          margin: 0;
        }
      `}</style>
    </header>
  )
}
