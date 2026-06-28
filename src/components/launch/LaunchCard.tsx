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
          border-radius: var(--launch-radius);
          background: linear-gradient(180deg, var(--launch-surface) 0%, var(--launch-bg-elevated) 100%);
          box-shadow: var(--launch-shadow-md);
        }
      `}</style>
    </article>
  )
}
