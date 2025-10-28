export function paginateWorkEntries({ containerEl, topSectionEl, entryList }) {
  const MAX_HEIGHT = 850;
  const page1 = [];
  const page2 = [];

  if (!containerEl || !entryList.length) {
    return {
      page1,
      page2,
      includeSkillsOnPage1: true,
      includeSkillsOnPage2: false,
    };
  }

  let usedHeight = topSectionEl?.offsetHeight || 0;

  for (let i = 0; i < entryList.length; i++) {
    const el = containerEl.querySelector(`#work-item-${entryList[i].id}`);
    // ✅ use scrollHeight instead of offsetHeight
    const entryHeight = el?.scrollHeight || el?.offsetHeight || 160;

    // ✅ compare against fixed max content height (963)
    if (usedHeight + entryHeight <= MAX_HEIGHT) {
      page1.push({ work: entryList[i], idx: i });
      usedHeight += entryHeight;
    } else {
      page2.push({ work: entryList[i], idx: i });
    }
  }

  const includeSkillsOnPage1 = page2.length === 0;
  const includeSkillsOnPage2 = page2.length > 0;

  return { page1, page2, includeSkillsOnPage1, includeSkillsOnPage2 };
}
