const MEXICO_TZ = "America/Mexico_City"
const LAUNCH_HOUR = 18 // 6 PM
const LAUNCH_DURATION_MS = 4 * 60 * 60 * 1000

export type LaunchPhase = "before" | "active" | "ended"

export type LaunchCountdownState = {
  phase: LaunchPhase
  targetMs: number
  eyebrow: string
  timezoneLabel: string
}

function getMexicoDateParts(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: MEXICO_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })

  const parts = formatter.formatToParts(date)
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0)

  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour"),
  }
}

/** America/Mexico_City is fixed at UTC-6 (no DST). */
function mexicoLocalToUtcMs(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute = 0,
  second = 0,
) {
  return Date.UTC(year, month - 1, day, hour + 6, minute, second)
}

export function getLaunchCountdownState(now = new Date()): LaunchCountdownState {
  const { year, month, day } = getMexicoDateParts(now)
  const startMs = mexicoLocalToUtcMs(year, month, day, LAUNCH_HOUR)
  const endMs = startMs + LAUNCH_DURATION_MS
  const nowMs = now.getTime()

  if (nowMs < startMs) {
    return {
      phase: "before",
      targetMs: startMs,
      eyebrow: "Lanzamos en",
      timezoneLabel: "Hoy 6:00 PM · Ciudad de México",
    }
  }

  if (nowMs < endMs) {
    return {
      phase: "active",
      targetMs: endMs,
      eyebrow: "Ventana de lanzamiento",
      timezoneLabel: "",
    }
  }

  return {
    phase: "ended",
    targetMs: endMs,
    eyebrow: "En vivo",
    timezoneLabel: "Lanzamiento completado · Ciudad de México",
  }
}

export function getRemainingMs(targetMs: number, now = Date.now()) {
  return Math.max(0, targetMs - now)
}

export function splitRemainingMs(ms: number) {
  const d = Math.floor(ms / 86_400_000)
  const h = Math.floor((ms % 86_400_000) / 3_600_000)
  const m = Math.floor((ms % 3_600_000) / 60_000)
  const s = Math.floor((ms % 60_000) / 1_000)
  return { d, h, m, s }
}

export function padTimeUnit(value: number) {
  return String(value).padStart(2, "0")
}
