"use client"

import { useEffect, useRef } from "react"

type AnimatedNetworkBackgroundProps = {
  /** Visual density of nodes; scales with viewport area. */
  density?: number
  className?: string
}

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  warm: boolean
}

/**
 * Signature motif: a slow constellation of compute "nodes" (the shared
 * network / archipelago). Self-contained — delete this file and its single
 * import in the hero to remove it entirely. Honors prefers-reduced-motion.
 */
export default function AnimatedNetworkBackground({
  density = 1,
  className = "",
}: AnimatedNetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    let width = 0
    let height = 0
    let dpr = 1
    let nodes: Node[] = []
    let raf = 0

    const TEAL = "20, 214, 194"
    const WARM = "255, 157, 108"
    const LINK_DIST = 150

    const seed = () => {
      const area = width * height
      const count = Math.min(64, Math.max(14, Math.round((area / 26000) * density)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        warm: Math.random() < 0.16,
      }))
    }

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i]
        if (!a) continue
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j]
          if (!b) continue
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.16
            ctx.strokeStyle = `rgba(${TEAL}, ${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (const n of nodes) {
        const color = n.warm ? WARM : TEAL
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.warm ? 2.4 : 1.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color}, 0.85)`
        ctx.shadowColor = `rgba(${color}, 0.9)`
        ctx.shadowBlur = n.warm ? 10 : 7
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    const tick = () => {
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1
      }
      draw()
      raf = requestAnimationFrame(tick)
    }

    resize()
    if (reduceMotion) {
      draw()
    } else {
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener("resize", resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [density])

  return (
    <div className={`net-bg ${className}`.trim()} aria-hidden="true">
      <canvas ref={canvasRef} className="net-canvas" />
      <style jsx>{`
        .net-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
          mask-image: radial-gradient(120% 90% at 50% 30%, #000 30%, transparent 78%);
          -webkit-mask-image: radial-gradient(
            120% 90% at 50% 30%,
            #000 30%,
            transparent 78%
          );
        }
        .net-canvas {
          display: block;
        }
      `}</style>
    </div>
  )
}
