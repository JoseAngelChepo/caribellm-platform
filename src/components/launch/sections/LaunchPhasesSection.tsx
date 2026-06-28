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

      <div className="phases">
        {phases.stages.map((stage) => (
          <article key={stage.id} className="phase">
            <div className={`ph-num ${stage.status === "launching" ? "active" : ""}`}>
              {String(stage.id).padStart(2, "0")}
            </div>
            <div className="phase-content">
              <span
                className={`badge ${
                  stage.status === "launching" ? "badge-live" : "badge-planned"
                }`}
              >
                {statusLabels[stage.status]}
              </span>
              <h3>{stage.label}</h3>
              <p className="body-text">{stage.description}</p>
            </div>
          </article>
        ))}
      </div>

      <style jsx>{`
        .phases {
          border: 1px solid var(--launch-border);
        }

        .phase {
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 24px;
          padding: 28px 28px 28px 20px;
          border-bottom: 1px solid var(--launch-border);
          align-items: start;
        }

        .phase:last-child {
          border-bottom: none;
        }

        .ph-num {
          font-family: var(--app-mono);
          font-size: 13px;
          color: var(--launch-border);
          padding-top: 8px;
          font-feature-settings: "tnum";
        }

        .ph-num.active {
          color: var(--launch-accent);
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--app-mono);
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 4px 10px;
          margin-bottom: 12px;
        }

        .badge-live {
          background: rgba(0, 207, 189, 0.08);
          color: var(--launch-accent);
          border: 1px solid rgba(0, 207, 189, 0.2);
        }

        .badge-live::before {
          content: "";
          width: 5px;
          height: 5px;
          background: var(--launch-accent);
          border-radius: 50%;
          flex-shrink: 0;
        }

        .badge-planned {
          background: transparent;
          color: var(--launch-muted);
          border: 1px solid var(--launch-border);
        }

        .phase h3 {
          font-size: 17px;
          font-weight: 600;
          letter-spacing: -0.015em;
          margin: 0 0 10px;
        }

        .phase-content :global(.body-text) {
          max-width: 38rem;
        }

        @media (max-width: 640px) {
          .phase {
            grid-template-columns: 40px 1fr;
            gap: 16px;
            padding: 24px 20px;
          }
        }
      `}</style>
    </LaunchSection>
  )
}
