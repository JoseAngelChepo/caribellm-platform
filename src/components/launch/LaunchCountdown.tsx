"use client"

import { useEffect, useState } from "react"
import { launchContent } from "@/content/launch"
import {
  getLaunchCountdownState,
  getRemainingMs,
  padTimeUnit,
  splitRemainingMs,
} from "@/lib/launch-countdown"

const { terminal } = launchContent

function useLaunchCountdown() {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const launch = getLaunchCountdownState(new Date(now))
  const remainingMs = getRemainingMs(launch.targetMs, now)
  const { h, m, s } = splitRemainingMs(remainingMs)

  return {
    ...launch,
    h,
    m,
    s,
    done: launch.phase === "ended",
  }
}

export default function LaunchCountdown() {
  const { h, m, s, done } = useLaunchCountdown()
  const zero = "00"
  const hh = done ? zero : padTimeUnit(h)
  const mm = done ? zero : padTimeUnit(m)
  const ss = done ? zero : padTimeUnit(s)

  return (
    <div className="hero-terminal" role={done ? "status" : "timer"} aria-live="polite">
      <div className="t-bar">
        <div className="t-dots" aria-hidden="true">
          <span className="t-dot live" />
          <span className="t-dot" />
          <span className="t-dot" />
        </div>
        <span className="t-title">{terminal.title}</span>
      </div>

      <div
        className="countdown"
        aria-label={
          done
            ? "Lanzamiento en vivo"
            : `${h} horas, ${m} minutos, ${s} segundos`
        }
      >
        <div className="c-row" aria-hidden="true">
          <div className="c-unit">
            <span className="c-num">{hh}</span>
            <span className="c-lbl">horas</span>
          </div>
          <span className="c-sep">:</span>
          <div className="c-unit">
            <span className="c-num">{mm}</span>
            <span className="c-lbl">min</span>
          </div>
          <span className="c-sep">:</span>
          <div className="c-unit">
            <span className="c-num">{ss}</span>
            <span className="c-lbl">seg</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-terminal {
          width: 100%;
          max-width: 640px;
          margin: 0 auto 20px;
        }
        .t-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .t-dots {
          display: flex;
          gap: 6px;
        }
        .t-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--launch-border);
        }
        .t-dot.live {
          background: var(--launch-green);
        }
        .t-title {
          font-family: var(--app-mono);
          font-size: 11px;
          color: var(--launch-muted);
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }
        .countdown {
          display: flex;
          justify-content: center;
        }
        .c-row {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 8px;
        }
        .c-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          min-width: 88px;
        }
        .c-num {
          font-family: var(--app-mono);
          font-size: clamp(64px, 14vw, 112px);
          font-weight: 500;
          color: var(--launch-text);
          line-height: 1;
          letter-spacing: -0.02em;
          font-variant-numeric: tabular-nums;
          font-feature-settings: "tnum";
          min-width: 2.5ch;
          text-align: center;
        }
        .c-sep {
          font-family: var(--app-mono);
          font-size: clamp(48px, 10vw, 80px);
          font-weight: 300;
          color: var(--launch-muted);
          line-height: 1;
          opacity: 0.4;
          user-select: none;
          padding: 0 4px;
          margin-top: 0.04em;
        }
        .c-lbl {
          font-family: var(--app-mono);
          font-size: 10px;
          color: var(--launch-muted);
          text-transform: uppercase;
          letter-spacing: 0.14em;
          text-align: center;
          line-height: 1;
        }
        @media (max-width: 640px) {
          .c-row {
            gap: 4px;
          }
          .c-unit {
            min-width: 68px;
            gap: 3px;
          }
          .c-sep {
            padding: 0 2px;
          }
        }
      `}</style>
    </div>
  )
}
