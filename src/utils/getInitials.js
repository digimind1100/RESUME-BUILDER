// src/utils/getInitials.js
export function getInitials(fullName = "") {
  if (!fullName) return "";

  const parts = fullName.trim().split(/\s+/);

  // One word name → first letter
  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }

  // Two or more words → first letter of first two words
  return (
    parts[0][0].toUpperCase() +
    parts[1][0].toUpperCase()
  );
}
