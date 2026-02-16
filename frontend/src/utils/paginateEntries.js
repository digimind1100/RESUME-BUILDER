// utils/paginateEntries.js

export function paginateEntries({
  containerEl,
  topSectionEl,
  entryList,
}) {
  if (!containerEl || !topSectionEl || !Array.isArray(entryList)) {
    return { page1: [], page2: [], breakY: null, hideSkillsOnPage2: false };
  }

  const containerRect = containerEl.getBoundingClientRect();

  // Create hidden measuring container
  const tempDiv = document.createElement("div");
  tempDiv.style.position = "absolute";
  tempDiv.style.visibility = "hidden";
  tempDiv.style.width = `${containerRect.width}px`;
  tempDiv.style.left = "-9999px";
  tempDiv.style.top = "-9999px";
  tempDiv.style.boxSizing = "border-box";

  document.body.appendChild(tempDiv);

  // Clone top section
  const topClone = topSectionEl.cloneNode(true);
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

    // 🔥 Precise boundary check
    const cloneRect = topClone.getBoundingClientRect();
    const leftBottom = containerRect.bottom;

    if (cloneRect.bottom <= leftBottom - 5) {
      fit.push({ edu, idx: i });
    } else {
      overflow = entryList.slice(i).map((e, j) => ({
        edu: e,
        idx: i + j,
      }));
      break;
    }
  } // ✅ properly close loop

  document.body.removeChild(tempDiv);

  return {
    page1: fit,
    page2: overflow,
    breakY: containerRect.height,
    hideSkillsOnPage2: overflow.length > 0,
  };
}
