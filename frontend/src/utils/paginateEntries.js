export function paginateEntries({
  containerEl,
  topSectionEl,
  entryList,
}) {
  if (!containerEl || !topSectionEl || !Array.isArray(entryList)) {
    return { page1: [], page2: [], breakY: null, hideSkillsOnPage2: false };
  }

  const containerRect = containerEl.getBoundingClientRect();

  // 🔥 Use real height instead of hardcoded 960
  const MAX_HEIGHT = containerRect.height;

  const style = window.getComputedStyle(containerEl);
  const paddingTop = parseFloat(style.paddingTop) || 0;
  const paddingBottom = parseFloat(style.paddingBottom) || 0;

  const usableHeight = MAX_HEIGHT - paddingTop - paddingBottom;

  const tempDiv = document.createElement("div");
  tempDiv.style.position = "absolute";
  tempDiv.style.visibility = "hidden";
  tempDiv.style.width = `${Math.round(containerRect.width)}px`;
  tempDiv.style.boxSizing = "border-box";
  tempDiv.style.padding = style.padding;
  tempDiv.style.left = "-9999px";
  tempDiv.style.top = "-9999px";

  document.body.appendChild(tempDiv);

  const topClone = topSectionEl.cloneNode(true);
  tempDiv.appendChild(topClone);

  const fit = [];
  let overflow = [];

  for (let i = 0; i < entryList.length; i++) {
    const edu = entryList[i];

    const testEl = document.createElement("div");
    testEl.className = "education-entry-qr border p-2 my-2 rounded";
    testEl.style.boxSizing = "border-box";
    testEl.innerHTML = `
      <div class="education-details">
        <p class="edu-school">${edu.school || ""}</p>
        <p class="edu-degree">${edu.degree || ""}</p>
        <p class="edu-year">${edu.year || ""}</p>
      </div>
    `;

    topClone.appendChild(testEl);

    const totalHeight = topClone.getBoundingClientRect().height;

    if (totalHeight <= usableHeight) {
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

  return {
    page1: fit,
    page2: overflow,
    breakY: usableHeight,
    hideSkillsOnPage2: overflow.length > 0,
  };
}
