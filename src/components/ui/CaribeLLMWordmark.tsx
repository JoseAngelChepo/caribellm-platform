import Link from "next/link"
import { brandContent } from "@/content/brand"

const { brand } = brandContent

type CaribeLLMWordmarkProps = {
  href?: string
  className?: string
  ariaLabel?: string
}

export default function CaribeLLMWordmark({
  href = "/",
  className = "",
  ariaLabel = "CaribeLLM archipielago — inicio",
}: CaribeLLMWordmarkProps) {
  const content = (
    <>
      {brand.prefix}
      <span className="wordmark-accent">{brand.accent}</span>
      <span className="wordmark-sep">/</span>
      {brand.sub}
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
