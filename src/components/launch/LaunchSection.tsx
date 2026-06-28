type LaunchSectionProps = {
  id?: string
  ariaLabelledBy?: string
  ariaLabel?: string
  className?: string
  children: React.ReactNode
}

export default function LaunchSection({
  id,
  ariaLabelledBy,
  ariaLabel,
  className = "",
  children,
}: LaunchSectionProps) {
  return (
    <section
      id={id}
      className={`launch-section ${className}`.trim()}
      {...(ariaLabelledBy ? { "aria-labelledby": ariaLabelledBy } : {})}
      {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
    >
      {children}
      <style jsx>{`
        .launch-section {
          padding: var(--launch-section-y) 0;
          border-bottom: 1px solid var(--launch-border);
        }

        .launch-section :global(.body-text) {
          font-size: var(--launch-body-size);
          color: var(--launch-muted);
          line-height: var(--launch-prose-leading);
          margin: 0;
        }
      `}</style>
    </section>
  )
}
