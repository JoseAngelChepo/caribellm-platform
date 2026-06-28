type LaunchEyebrowProps = {
  children: React.ReactNode
}

export default function LaunchEyebrow({ children }: LaunchEyebrowProps) {
  return (
    <p className="eyebrow">
      {children}
      <style jsx>{`
        .eyebrow {
          font-family: var(--app-mono);
          font-size: 11px;
          color: var(--launch-accent);
          letter-spacing: 0.12em;
          text-transform: lowercase;
          margin: 0 0 10px;
        }
      `}</style>
    </p>
  )
}
