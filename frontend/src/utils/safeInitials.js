export function safeInitials(name) {
  if (!name || typeof name !== "string") return "?";

  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) return "?";

  return words
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join("");
}
