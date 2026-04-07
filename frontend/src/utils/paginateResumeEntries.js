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

    const el = containerEl.querySelector(`#entry-${entry.id}`);
    if (!el) continue;

    const style = window.getComputedStyle(el);

    const height =
      el.getBoundingClientRect().height +
      parseFloat(style.marginTop) +
      parseFloat(style.marginBottom);

    if (page1.length === 0) {
      page1.push(entry);
      usedHeight += height;
      continue;
    }

    if (usedHeight + height <= pageHeight) {
      page1.push(entry);
      usedHeight += height;
    } else {
      page2.push(...entries.slice(i));
      break;
    }
  }

  return { page1, page2 };
}