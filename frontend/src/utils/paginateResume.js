export function paginateResume({
  containerEl,
  sections,
}) {
  if (!containerEl || !sections) {
    return { page1: {}, page2: {} };
  }

  const MAX_HEIGHT = 1000; // ✅ FIXED

  const rect = containerEl.getBoundingClientRect();

  const tempDiv = document.createElement("div");
  tempDiv.style.position = "absolute";
  tempDiv.style.visibility = "hidden";
  tempDiv.style.width = `${rect.width}px`;
  tempDiv.style.left = "-9999px";
  tempDiv.style.top = "-9999px";

  document.body.appendChild(tempDiv);

  let page1 = {};
  let page2 = {};
  let currentHeight = 0;

  for (const key in sections) {
    const sectionData = sections[key];

    const clone = sectionData.cloneNode(true);
    tempDiv.appendChild(clone);

    const height = tempDiv.getBoundingClientRect().height;

    if (height <= MAX_HEIGHT) {
      page1[key] = sectionData;
      currentHeight = height;
    } else {
      tempDiv.removeChild(clone);
      page2[key] = sectionData;
    }
  }

  document.body.removeChild(tempDiv);

  return { page1, page2 };
}