export function paginateResumeEntries({
  containerEl,
  entries,
  pageHeight = 1122,
}) {
  if (!containerEl || !Array.isArray(entries)) {
    return { page1: [], page2: [] };
  }

  let usedHeight = 0;
  const page1 = [];
  const page2 = [];

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];

    // 🔑 Each entry must exist in DOM with this ID
    const el = containerEl.querySelector(`#entry-${entry.id}`);

    if (!el) continue;

    // 🔥 Accurate height
    const height = el.getBoundingClientRect().height;

    // 🧠 Force first item (avoid empty page)
    if (page1.length === 0) {
      page1.push(entry);
      usedHeight += height;
      continue;
    }

    // ✅ If fits → stay on page 1
    if (usedHeight + height <= pageHeight) {
      page1.push(entry);
      usedHeight += height;
    } else {
      // ❌ Overflow → rest goes to page 2
      page2.push(...entries.slice(i));
      break;
    }
  }

  return { page1, page2 };
}