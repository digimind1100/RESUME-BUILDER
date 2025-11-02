// paginateSkillsEntries.js
let lastCombinedHeight = 0; // module-level variable to track last height

export function paginateSkillsEntries(
  workRef,
  skillsRef,
  page1Skills,
  page2Skills,
  setPage1Skills,
  setPage2Skills
) {
  if (!workRef?.current || !skillsRef?.current) return;

  const combinedHeight =
    workRef.current.getBoundingClientRect().height +
    skillsRef.current.getBoundingClientRect().height;

  const PAGE_HEIGHT_LIMIT = 950;

  // ✅ Only act if combinedHeight increased past limit and has changed
  if (combinedHeight > PAGE_HEIGHT_LIMIT && combinedHeight !== lastCombinedHeight) {
    lastCombinedHeight = combinedHeight;

    if (page1Skills.length > 0) {
      const lastSkill = page1Skills[page1Skills.length - 1];

      const isAlreadyOnPage2 = page2Skills.includes(lastSkill);
      if (!isAlreadyOnPage2) {
        const updatedPage1 = page1Skills.slice(0, -1);
        const updatedPage2 = [...page2Skills, lastSkill];

        setPage1Skills(updatedPage1);
        setPage2Skills(updatedPage2);
      }
    }
  }

  // ✅ Reset lastCombinedHeight if below limit to allow new moves later
  if (combinedHeight <= PAGE_HEIGHT_LIMIT) lastCombinedHeight = 0;
}
