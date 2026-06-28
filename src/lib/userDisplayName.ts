export function userDisplayName(user: Record<string, unknown> | null): string {
  if (!user) return "Usuario"
  const first = user.firstName
  const last = user.lastName
  if (typeof first === "string" || typeof last === "string") {
    const name = [first, last].filter(Boolean).join(" ")
    if (name.length > 0) return name
  }
  const username = user.username
  if (typeof username === "string" && username.length > 0) return `@${username}`
  const email = user.email
  if (typeof email === "string" && email.length > 0) return email.split("@")[0] ?? email
  return "Usuario"
}
