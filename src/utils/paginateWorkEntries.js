export function paginateWorkEntries({ containerEl, topSectionEl, entryList }) {
  const MAX_HEIGHT = 2400; // your updated limit
  const page1 = [];
  const page2 = [];

  if (!containerEl || !entryList.length) {
return {
  page1,
  page2,
  includeSkillsOnPage1: page2.length === 0, // ✅ if only one page, show Skills on page1
  includeSkillsOnPage2: page2.length > 0,   // ✅ if we have page2, move Skills there
};

  }

  let usedHeight = topSectionEl?.offsetHeight || 0;

  for (let i = 0; i < entryList.length; i++) {
    const el = containerEl.querySelector(`#work-item-${entryList[i].id}`);
    const entryHeight = el?.offsetHeight || 160;

    if (usedHeight + entryHeight <= MAX_HEIGHT) {
      page1.push({ work: entryList[i], idx: i });
      usedHeight += entryHeight;
    } else {
      page2.push({ work: entryList[i], idx: i });
    }
  }

  // ✅ If any content goes to page2, remove skills from page1
  const includeSkillsOnPage1 = page2.length === 0;
  const includeSkillsOnPage2 = page2.length > 0;

  return { page1, page2, includeSkillsOnPage2, includeSkillsOnPage1 };
}
