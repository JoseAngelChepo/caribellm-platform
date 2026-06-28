import { layoutContent } from "@/config/layout"

type LaunchContainerProps = {
  children: React.ReactNode
  narrow?: boolean
  className?: string
}

export default function LaunchContainer({
  children,
  narrow = false,
  className = "",
}: LaunchContainerProps) {
  return (
    <div className={`launch-container ${narrow ? "launch-container--narrow" : ""} ${className}`.trim()}>
      {children}
      <style jsx>{`
        .launch-container {
          max-width: ${layoutContent.publicMaxWidth}px;
          margin: 0 auto;
          padding: 0 ${layoutContent.paddingX}px;
        }

        .launch-container--narrow {
          max-width: 44rem;
        }
      `}</style>
    </div>
  )
}
