export function paginateResume({ containerEl, sections }) {
  if (!containerEl || !sections) {
    return { page1: {}, page2: {} };
  }

  const PAGE_HEIGHT = 812;

  let page1 = {};
  let page2 = {};

  let currentHeight = 0;

  sections.forEach((section) => {
    const el = section.ref?.current;
    if (!el) return;

    const height = el.offsetHeight;

    if (currentHeight + height <= PAGE_HEIGHT) {
      page1[section.key] = section.component;
      currentHeight += height;
    } else {
      page2[section.key] = section.component;
    }
  });

  return { page1, page2 };
}