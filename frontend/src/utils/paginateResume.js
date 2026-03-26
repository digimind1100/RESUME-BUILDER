export function paginateResume({
  containerEl,
  sections,
}) {
  if (!containerEl || !sections) {
    return { page1: {}, page2: {} };
  }

  const rect = containerEl.getBoundingClientRect();
  const MAX_HEIGHT = 812;

  const tempDiv = document.createElement("div");
  tempDiv.style.position = "absolute";
  tempDiv.style.visibility = "hidden";
  tempDiv.style.width = `${rect.width}px`;
  tempDiv.style.left = "-9999px";
  tempDiv.style.top = "-9999px";

  document.body.appendChild(tempDiv);

  let page1 = {};
  let page2 = {};

  tempDiv.innerHTML = ""; // important

  for (const key in sections) {
    const sectionData = sections[key];

    const clone = sectionData.cloneNode(true);
    tempDiv.appendChild(clone);

    const totalHeight = tempDiv.getBoundingClientRect().height;

    if (totalHeight <= MAX_HEIGHT) {
      page1[key] = sectionData;
    } else {
      tempDiv.removeChild(clone); // remove overflow
      page2[key] = sectionData;
    }
  }

  document.body.removeChild(tempDiv);

  return { page1, page2 };
}