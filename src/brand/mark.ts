/**
 * CaribeLLM brand mark — Caribbean swell.
 * A breaking wave with a curling lip + a lower undertow.
 * Reads as sea at favicon size; the curl gives it a ownable silhouette.
 */
export const brandMarkColor = "#00cfbd"

export const brandMarkViewBox = "0 0 32 32"

export const brandMarkStrokes = [
  {
    d: "M3 21C6.5 21 8.5 13.5 14 11C19.5 8.5 26.5 10 28.5 15.5C30 18.5 27.5 21 24 19.5C20.5 18 21.5 13.5 27.5 12",
    width: 2.75,
  },
  {
    d: "M24.5 19.5C26.5 17.5 27.5 14.5 27 12.5",
    width: 2.1,
  },
  {
    d: "M4 24.75Q16 22.25 28 24.75",
    width: 2,
  },
] as const

export function renderBrandMarkSvg(color = brandMarkColor): string {
  const paths = brandMarkStrokes
    .map(
      (stroke) =>
        `<path d="${stroke.d}" stroke="${color}" stroke-width="${stroke.width}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
    )
    .join("")

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${brandMarkViewBox}" fill="none" role="img" aria-label="CaribeLLM">${paths}</svg>`
}
