// paginateSkillsEntries.js
// Move overflowed Skills from Page 1 → Page 2 when Work+Skills height > 950
// Smooth, no jerking, top-to-bottom

import React, { memo } from "react";

export function paginateSkillsEntries(
  workRef,        // ref to .preview-box.work-box
  skillsRef,      // ref to .preview-box.skills-box
  page1Skills,    // Skills currently on Page 1
  page2Skills,    // Skills currently on Page 2
  setPage1Skills, // setter for Page 1 Skills
  setPage2Skills  // setter for Page 2 Skills
) {
  if (!workRef?.current || !skillsRef?.current) return;

  const PAGE_HEIGHT_LIMIT = 950;

  const workHeight = workRef.current.getBoundingClientRect().height || 0;
  const skillsHeight = skillsRef.current.getBoundingClientRect().height || 0;
  const combinedHeight = workHeight + skillsHeight;

  // Use requestAnimationFrame to prevent jerking
  let rafId = null;
  const safeUpdate = (fn) => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => fn());
  };

  // --- OVERFLOW: Move last skill from Page1 → Page2
  if (combinedHeight > PAGE_HEIGHT_LIMIT && page1Skills.length > 0) {
    const lastSkill = page1Skills[page1Skills.length - 1];

    if (!page2Skills.includes(lastSkill)) {
      safeUpdate(() => {
        setPage1Skills((prev) => prev.slice(0, -1));
        setPage2Skills((prev) => [...prev, lastSkill]); // append at END → top-to-bottom flow
      });
    }
  }

  // --- EXTRA SPACE: Bring first skill back from Page2 → Page1
  else if (combinedHeight < PAGE_HEIGHT_LIMIT - 150 && page2Skills.length > 0) {
    const firstFromPage2 = page2Skills[0];

    safeUpdate(() => {
      setPage2Skills((prev) => prev.slice(1));
      setPage1Skills((prev) => [...prev, firstFromPage2]); // append at END → top-to-bottom
    });
  }
}

export default memo(paginateSkillsEntries);
