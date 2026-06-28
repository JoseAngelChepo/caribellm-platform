import Link from "next/link"
import CaribeLLMMark from "@/components/ui/CaribeLLMMark"
import { brandContent } from "@/content/brand"

const { brand } = brandContent

type CaribeLLMWordmarkProps = {
  href?: string
  className?: string
  ariaLabel?: string
  showMark?: boolean
  markSize?: number
}

export default function CaribeLLMWordmark({
  href = "/",
  className = "",
  ariaLabel = "CaribeLLM archipielago — inicio",
  showMark = true,
  markSize = 22,
}: CaribeLLMWordmarkProps) {
  const content = (
    <>
      {showMark ? <CaribeLLMMark size={markSize} className="wordmark-mark" /> : null}
      <span className="wordmark-text">
        {brand.prefix}
        <span className="wordmark-accent">{brand.accent}</span>
        <span className="wordmark-sep">/</span>
        {brand.sub}
      </span>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={`wordmark ${className}`.trim()} aria-label={ariaLabel}>
        {content}
      </Link>
    )
  }

  return (
    <span className={`wordmark ${className}`.trim()} aria-label={ariaLabel}>
      {content}
    </span>
  )
}
