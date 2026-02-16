// utils/paginateEntries.js

export function paginateEntries({
  containerEl,   // left column element
  topSectionEl,  // profile + dob + heading section ref
  entryList,     // array of educations
}) {
  if (!containerEl || !topSectionEl || !Array.isArray(entryList)) {
    return { page1: [], page2: [], breakY: null, hideSkillsOnPage2: false };
  }

  // 🔥 Dynamically calculate usable height
  const leftRect = containerEl.getBoundingClientRect();
  const topRect = topSectionEl.getBoundingClientRect();

  const MAX_HEIGHT = leftRect.height - topRect.height;

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
  tempDiv.style.width = `${Math.round(leftRect.width)}px`;
  tempDiv.style.padding = `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`;
  tempDiv.style.boxSizing = "border-box";
  tempDiv.style.left = "-9999px";
  tempDiv.style.top = "-9999px";

  document.body.appendChild(tempDiv);

  // clone top section (profile + QR + heading)
  const topClone = topSectionEl.cloneNode(true);
  topClone.querySelectorAll(".education-entry, .education-entry-qr").forEach((n) => n.remove());
  tempDiv.appendChild(topClone);

  const fit = [];
  let overflow = [];

  for (let i = 0; i < entryList.length; i++) {
    const edu = entryList[i];

    const testEl = document.createElement("div");
    testEl.className = "education-entry-qr border p-2 rounded";
    testEl.style.boxSizing = "border-box";
    testEl.style.marginBottom = "8px";

    testEl.innerHTML = `
      <div class="education-details">
        <p class="edu-school">${edu.school || ""}</p>
        <p class="edu-degree">${edu.degree || ""}</p>
        <p class="edu-year">${edu.year || ""}</p>
      </div>
    `;

    topClone.appendChild(testEl);

    const totalHeight = tempDiv.getBoundingClientRect().height;

    // 🔥 small safety buffer (-5px) to prevent visual overlap
    if (totalHeight <= MAX_HEIGHT - 5) {
      fit.push({ edu, idx: i });
    } else {
      overflow = entryList.slice(i).map((e, j) => ({
        edu: e,
        idx: i + j,
      }));
      break;
    }
  }

  document.body.removeChild(tempDiv);

  const hideSkillsOnPage2 = overflow.length > 0;

  return {
    page1: fit,
    page2: overflow,
    breakY: MAX_HEIGHT,
    hideSkillsOnPage2,
  };
}
