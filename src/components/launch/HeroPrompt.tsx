"use client"

import { useEffect, useState } from "react"

type HeroPromptProps = {
  text: string
}

export default function HeroPrompt({ text }: HeroPromptProps) {
  const [displayed, setDisplayed] = useState("")

  useEffect(() => {
    let index = 0
    let timeoutId: ReturnType<typeof setTimeout>

    const type = () => {
      setDisplayed(text.slice(0, index))
      index += 1
      if (index <= text.length) {
        const delay = index === 1 ? 700 : 58 + Math.random() * 22
        timeoutId = setTimeout(type, delay)
      }
    }

    timeoutId = setTimeout(type, 400)
    return () => clearTimeout(timeoutId)
  }, [text])

  return (
    <p className="hero-prompt" aria-label={text}>
      <span>{displayed}</span>
      <span className="cursor" aria-hidden="true" />
      <style jsx>{`
        .hero-prompt {
          font-family: var(--app-mono);
          font-size: 13px;
          color: var(--launch-accent);
          margin: 4px 0 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 20px;
        }
        .cursor {
          display: inline-block;
          width: 8px;
          height: 15px;
          background: var(--launch-accent);
          margin-left: 3px;
          vertical-align: middle;
          animation: blink 1.1s step-end infinite;
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .cursor {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </p>
  )
}
