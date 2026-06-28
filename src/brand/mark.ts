/**
 * CaribeLLM brand mark — Caribbean swell.
 * Single crest stroke + undertow. Coordinates on a 0.5 grid for crisp raster export.
 */
export const brandMarkColor = "#00cfbd"

export const brandMarkViewBox = "0 0 32 32"

/** One continuous crest with curling lip — no self-overlap (avoids muddy strokes). */
export const brandMarkCrest = {
  d: "M3 21.5C8 21.5 10 12 16 10C22 8 29 11 29.5 16C30 19.5 26 20.5 24 19C25.5 15 27.5 12 27 11",
  width: 3.5,
}

export const brandMarkUndertow = {
  d: "M4 25Q16 23 28 25",
  width: 2.75,
}

export const brandMarkStrokes = [brandMarkCrest, brandMarkUndertow] as const

export function brandMarkSvgString(color = brandMarkColor): string {
  const crest = `<path d="${brandMarkCrest.d}" stroke="${color}" stroke-width="${brandMarkCrest.width}" stroke-linecap="round" stroke-linejoin="miter" stroke-miterlimit="4" fill="none"/>`
  const undertow = `<path d="${brandMarkUndertow.d}" stroke="${color}" stroke-width="${brandMarkUndertow.width}" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="4" fill="none"/>`

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${brandMarkViewBox}" fill="none" shape-rendering="geometricPrecision" role="img" aria-label="CaribeLLM">${crest}${undertow}</svg>`
}
