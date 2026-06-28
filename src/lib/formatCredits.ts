/** Créditos como unidad con valor — 2 decimales, punto decimal, prefijo $. */
export function formatCredits(value: number): string {
  return `$${value.toFixed(2)}`
}
