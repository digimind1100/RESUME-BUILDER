// paginateSkillsEntries.js
// Move overflowed Skills from Page 1 → Page 2 when Work+Skills height > 950
// Smooth, no jerking, top-to-bottom

import React, { memo } from "react";

export function paginateSkillsEntries(
  workRef,
  skillsRef,
  page1Skills,
  page2Skills,
  setPage1Skills,
  setPage2Skills
) {
  if (!workRef?.current || !skillsRef?.current) return;

  const PAGE_HEIGHT_LIMIT = 950;
  const MINIMUM_SKILLS_SECTION_HEIGHT = 160; // header + safe space

  const workRect = workRef.current.getBoundingClientRect();
  const skillsRect = skillsRef.current.getBoundingClientRect();

  const workHeight = workRect.height || 0;
  const skillsHeight = skillsRect.height || 0;

  const combinedHeight = workHeight + skillsHeight;

  let rafId = null;
  const safeUpdate = (fn) => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => fn());
  };

  // 🔥 CASE 1: Skills starts too low → move ALL skills to page 2
  if (
    workHeight > PAGE_HEIGHT_LIMIT - MINIMUM_SKILLS_SECTION_HEIGHT &&
    page1Skills.length > 0
  ) {
    safeUpdate(() => {
      setPage2Skills(page1Skills);
      setPage1Skills([]);
    });
    return;
  }

  // 🔥 CASE 2: Normal overflow → move last skill
  if (combinedHeight > PAGE_HEIGHT_LIMIT && page1Skills.length > 0) {
    const lastSkill = page1Skills[page1Skills.length - 1];

    if (!page2Skills.includes(lastSkill)) {
      safeUpdate(() => {
        setPage1Skills((prev) => prev.slice(0, -1));
        setPage2Skills((prev) => [...prev, lastSkill]);
      });
    }
  }

  // 🔥 CASE 3: Extra space → bring skill back
  else if (
    combinedHeight < PAGE_HEIGHT_LIMIT - 150 &&
    page2Skills.length > 0
  ) {
    const firstFromPage2 = page2Skills[0];

    safeUpdate(() => {
      setPage2Skills((prev) => prev.slice(1));
      setPage1Skills((prev) => [...prev, firstFromPage2]);
    });
  }
}


export default memo(paginateSkillsEntries);
