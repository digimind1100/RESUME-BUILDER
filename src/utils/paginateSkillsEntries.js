// utils/paginateSkillsEntries.js
const MAX_HEIGHT = 600; // Skills usable height

export function paginateSkillsEntries({
  containerEl,   // right column element (skills box container)
  topSectionEl,  // job title / heading section ref
  entryList,     // array of skills
}) {
  if (!containerEl || !topSectionEl || !Array.isArray(entryList)) {
    return { page1: [], page2: [], breakY: null };
  }

  const rightRect = containerEl.getBoundingClientRect();

  // get computed paddings
  const style = window.getComputedStyle(containerEl);
  const padding = {
    top: parseFloat(style.paddingTop) || 0,
    right: parseFloat(style.paddingRight) || 0,
    bottom: parseFloat(style.paddingBottom) || 0,
    left: parseFloat(style.paddingLeft) || 0,
  };

  // hidden clone container
  const tempDiv = document.createElement("div");
  tempDiv.style.position = "absolute";
  tempDiv.style.visibility = "hidden";
  tempDiv.style.width = `${Math.round(rightRect.width)}px`;
  tempDiv.style.padding = `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`;
  tempDiv.style.boxSizing = "border-box";
  tempDiv.style.left = "-9999px";
  tempDiv.style.top = "-9999px";
  document.body.appendChild(tempDiv);

  // clone top section (remove old skill entries if any)
  const topClone = topSectionEl.cloneNode(true);
  topClone.querySelectorAll(".skill-item").forEach((n) => n.remove());
  tempDiv.appendChild(topClone);

  const fit = [];
  let overflow = [];

  for (let i = 0; i < entryList.length; i++) {
    const skill = entryList[i];
    const testEl = document.createElement("div");
    testEl.className = "skill-item flex items-start mb-2";
    testEl.style.boxSizing = "border-box";
    testEl.innerHTML = `
      <input type="checkbox" style="display:none" />
      <span class="bullet ml-1">•</span>
      <div class="skill-text flex-1">${typeof skill === "object" ? (skill.title || skill.text || "Skill") : skill}</div>
    `;

    topClone.appendChild(testEl);

    const totalHeight = tempDiv.getBoundingClientRect().height;
    if (totalHeight <= MAX_HEIGHT) {
      fit.push({ skill, idx: i });
    } else {
      overflow = entryList.slice(i).map((e, j) => ({ skill: e, idx: i + j }));
      break;
    }
  }

  document.body.removeChild(tempDiv);

  return { page1: fit, page2: overflow, breakY: MAX_HEIGHT };
}
