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

  const wordmarkClass = `wordmark ${className}`.trim()

  const styles = (
    <style jsx global>{`
      .wordmark {
        font-family: var(--app-mono);
        font-size: 13px;
        font-weight: 500;
        color: var(--launch-text);
        text-decoration: none;
        letter-spacing: -0.01em;
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }

      .wordmark :global(.wordmark-mark) {
        flex-shrink: 0;
      }

      .wordmark :global(.wordmark-text) {
        line-height: 1;
      }

      .wordmark:hover {
        text-decoration: none;
        color: var(--launch-text);
      }

      .wordmark-accent {
        color: var(--launch-accent);
      }

      .wordmark-sep {
        color: var(--launch-dim, var(--launch-muted));
        font-weight: 400;
        margin: 0 1px;
      }
    `}</style>
  )

  if (href) {
    return (
      <>
        <Link href={href} className={wordmarkClass} aria-label={ariaLabel}>
          {content}
        </Link>
        {styles}
      </>
    )
  }

  return (
    <>
      <span className={wordmarkClass} aria-label={ariaLabel}>
        {content}
      </span>
      {styles}
    </>
  )
}
