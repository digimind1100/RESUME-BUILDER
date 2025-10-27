// utils/paginateSkillsEntries.js
export function paginateSkillsEntries({
  containerEl,   // right column element (skills box container)
  topSectionEl,  // job title / heading section ref
  workBoxEl,     // Work box ref
  entryList,     // array of skills
}) {
  if (!containerEl || !topSectionEl || !Array.isArray(entryList)) {
    return { page1: [], page2: [], breakY: null };
  }

  const MAX_HEIGHT = 1250; // total usable height
  const containerRect = containerEl.getBoundingClientRect();

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
  tempDiv.style.width = `${Math.round(containerRect.width)}px`;
  tempDiv.style.padding = `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`;
  tempDiv.style.boxSizing = "border-box";
  tempDiv.style.left = "-9999px";
  tempDiv.style.top = "-9999px";
  document.body.appendChild(tempDiv);

  // clone top section (remove old skill entries if any)
  const topClone = topSectionEl.cloneNode(true);
  topClone.querySelectorAll(".skill-item").forEach((n) => n.remove());
  tempDiv.appendChild(topClone);

  // calculate available height by subtracting work box height
  let workHeight = 0;
  if (workBoxEl) {
    const workClone = workBoxEl.cloneNode(true);
    workClone.style.position = "absolute";
    workClone.style.visibility = "hidden";
    tempDiv.appendChild(workClone);
    workHeight = workClone.getBoundingClientRect().height;
    workClone.remove();
  }

  const availableHeight = MAX_HEIGHT - workHeight;

  const fit = [];
  let overflow = [];

  for (let i = 0; i < entryList.length; i++) {
    const skillItem = entryList[i];
    // ✅ Normalize skill structure
    const normalizedSkill = (() => {
      const skillObj = skillItem?.skill || skillItem;
      return {
        title:
          typeof skillObj === "object"
            ? skillObj.title || skillObj.text || "Skill"
            : skillObj,
        selected: skillObj?.selected ?? false,
      };
    })();

    const testEl = document.createElement("div");
    testEl.className = "skill-item flex items-start mb-2";
    testEl.style.boxSizing = "border-box";
    testEl.innerHTML = `
      <input type="checkbox" style="display:none" ${
        normalizedSkill.selected ? "checked" : ""
      } />
      <span class="bullet ml-1">•</span>
      <div class="skill-text flex-1">${normalizedSkill.title}</div>
    `;
    topClone.appendChild(testEl);

    const totalHeight = tempDiv.getBoundingClientRect().height - workHeight;
    if (totalHeight <= availableHeight) {
      fit.push({ skill: normalizedSkill, idx: i });
    } else {
      overflow = entryList.slice(i).map((e, j) => {
        const s = e?.skill || e;
        return {
          skill: {
            title:
              typeof s === "object"
                ? s.title || s.text || "Skill"
                : s,
            selected: s?.selected ?? false,
          },
          idx: i + j,
        };
      });
      break;
    }
  }

  document.body.removeChild(tempDiv);

  return { page1: fit, page2: overflow, breakY: availableHeight };
}
