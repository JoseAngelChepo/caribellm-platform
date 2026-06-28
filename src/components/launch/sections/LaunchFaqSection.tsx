import LaunchSection from "@/components/launch/LaunchSection"
import { launchContent } from "@/content/launch"

const { faq } = launchContent

export default function LaunchFaqSection() {
  return (
    <LaunchSection id={faq.id} ariaLabel="Preguntas">
      <dl className="faq-list">
        {faq.items.map((item) => (
          <div key={item.question} className="faq-item">
            <dt>{item.question}</dt>
            <dd>{item.answer}</dd>
          </div>
        ))}
      </dl>

      <style jsx>{`
        .faq-list {
          margin: 0;
          max-width: 40rem;
        }

        .faq-item {
          padding: 20px 0;
          border-bottom: 1px solid var(--launch-border);
        }

        .faq-item:first-child {
          border-top: 1px solid var(--launch-border);
        }

        dt {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 6px;
          color: var(--launch-text);
        }

        dd {
          margin: 0;
          font-size: var(--launch-body-size);
          color: var(--launch-muted);
          line-height: var(--launch-prose-leading);
        }
      `}</style>
    </LaunchSection>
  )
}
