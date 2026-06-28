import LaunchSection from "@/components/launch/LaunchSection"
import LaunchSectionIntro from "@/components/launch/LaunchSectionIntro"
import { launchContent } from "@/content/launch"

const { faq } = launchContent

export default function LaunchFaqSection() {
  return (
    <LaunchSection id={faq.id} ariaLabelledBy="faq-title">
      <LaunchSectionIntro eyebrow={faq.eyebrow} title={faq.title} titleId="faq-title" />

      <dl className="faq-list">
        {faq.items.map((item) => (
          <div key={item.question} className="faq-item">
            <dt>
              <span className="faq-q" aria-hidden="true">
                ?
              </span>
              {item.question}
            </dt>
            <dd>{item.answer}</dd>
          </div>
        ))}
      </dl>

      <style jsx>{`
        .faq-list {
          margin: 0;
          max-width: 44rem;
        }

        .faq-item {
          padding: 26px 0;
          border-top: 1px solid var(--launch-border);
        }

        .faq-item:first-child {
          border-top: none;
          padding-top: 0;
        }

        dt {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--app-title-font);
          font-size: 19px;
          font-weight: 600;
          letter-spacing: -0.01em;
          margin: 0 0 10px;
          color: var(--launch-text);
        }

        .faq-q {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          font-family: var(--app-mono);
          font-size: 13px;
          font-weight: 700;
          color: var(--launch-accent);
          background: var(--launch-accent-soft);
        }

        dd {
          margin: 0 0 0 38px;
          font-size: var(--launch-body-size);
          color: var(--launch-muted);
          line-height: var(--launch-prose-leading);
        }

        @media (max-width: 480px) {
          dd {
            margin-left: 0;
          }
        }
      `}</style>
    </LaunchSection>
  )
}
