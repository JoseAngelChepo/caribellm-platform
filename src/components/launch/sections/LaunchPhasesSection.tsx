import LaunchSection from "@/components/launch/LaunchSection"
import LaunchSectionIntro from "@/components/launch/LaunchSectionIntro"
import { launchContent } from "@/content/launch"

const { phases, statusLabels } = launchContent

export default function LaunchPhasesSection() {
  return (
    <LaunchSection id={phases.id} ariaLabelledBy="phases-title">
      <LaunchSectionIntro
        eyebrow={phases.eyebrow}
        title={phases.title}
        titleId="phases-title"
        lede={phases.lede}
      />

      <ol className="timeline">
        {phases.stages.map((stage) => (
          <li key={stage.id} className={`phase phase--${stage.status}`}>
            <div className="phase-marker" aria-hidden="true">
              <span className="phase-dot" />
            </div>
            <div className="phase-body">
              <span className="phase-status">{statusLabels[stage.status]}</span>
              <h3>{stage.label}</h3>
              <p>{stage.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <style jsx>{`
        .timeline {
          list-style: none;
          margin: 0;
          padding: 0;
          counter-reset: phase;
        }

        .phase {
          position: relative;
          display: grid;
          grid-template-columns: 36px 1fr;
          gap: 20px;
          padding-bottom: 36px;
        }

        .phase:last-child {
          padding-bottom: 0;
        }

        .phase-marker {
          position: relative;
          display: flex;
          justify-content: center;
          padding-top: 4px;
        }

        /* Connector line between markers */
        .phase:not(:last-child) .phase-marker::after {
          content: "";
          position: absolute;
          top: 22px;
          bottom: -36px;
          width: 1px;
          background: linear-gradient(
            180deg,
            var(--launch-border-strong),
            var(--launch-border)
          );
        }

        .phase-dot {
          position: relative;
          z-index: 1;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--launch-bg-elevated);
          border: 2px solid var(--launch-border-strong);
        }

        .phase--launching .phase-dot {
          border-color: var(--launch-accent);
          background: var(--launch-accent);
          box-shadow: 0 0 0 5px var(--launch-accent-soft);
        }

        .phase--building .phase-dot {
          border-color: var(--launch-warm);
          background: var(--launch-warm);
        }

        .phase-body {
          padding-bottom: 2px;
        }

        .phase-status {
          display: inline-block;
          font-family: var(--app-mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--launch-faint);
          margin-bottom: 8px;
        }

        .phase--launching .phase-status {
          color: var(--launch-accent);
        }

        .phase--building .phase-status {
          color: var(--launch-warm);
        }

        h3 {
          font-family: var(--app-title-font);
          font-size: 20px;
          font-weight: 600;
          letter-spacing: -0.01em;
          margin: 0 0 6px;
          color: var(--launch-text);
        }

        p {
          font-size: var(--launch-body-size);
          color: var(--launch-muted);
          line-height: var(--launch-prose-leading);
          margin: 0;
          max-width: 38rem;
        }
      `}</style>
    </LaunchSection>
  )
}
