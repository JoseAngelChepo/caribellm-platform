type LaunchCardProps = {
  children: React.ReactNode
  className?: string
}

export default function LaunchCard({ children, className = "" }: LaunchCardProps) {
  return (
    <article className={`launch-card ${className}`.trim()}>
      {children}
      <style jsx>{`
        .launch-card {
          padding: 32px 28px;
          border: 1px solid var(--launch-border);
          background: var(--launch-surface);
        }
      `}</style>
    </article>
  )
}
