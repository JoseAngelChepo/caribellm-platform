import LaunchSection from "@/components/launch/LaunchSection"
import LaunchSectionIntro from "@/components/launch/LaunchSectionIntro"
import { launchContent } from "@/content/launch"

const { phases, statusLabels } = launchContent

export default function LaunchPhasesSection() {
  return (
    <LaunchSection id={phases.id} ariaLabelledBy="phases-title">
      <LaunchSectionIntro title={phases.title} titleId="phases-title" />

      <div className="phases">
        {phases.stages.map((stage) => (
          <article key={stage.id} className="phase">
            <span className="phase-status">{statusLabels[stage.status]}</span>
            <h3>{stage.label}</h3>
            <p>{stage.description}</p>
          </article>
        ))}
      </div>

      <style jsx>{`
        .phases {
          border: 1px solid var(--launch-border);
        }

        .phase {
          padding: 22px 24px;
          border-bottom: 1px solid var(--launch-border);
        }

        .phase:last-child {
          border-bottom: none;
        }

        .phase-status {
          display: block;
          font-size: 12px;
          color: var(--launch-muted);
          margin-bottom: 8px;
        }

        .phase:first-child .phase-status {
          color: var(--launch-accent);
        }

        h3 {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 6px;
        }

        p {
          font-size: var(--launch-body-size);
          color: var(--launch-muted);
          line-height: var(--launch-prose-leading);
          margin: 0;
          max-width: 36rem;
        }
      `}</style>
    </LaunchSection>
  )
}
