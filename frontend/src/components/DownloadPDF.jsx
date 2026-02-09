import html2pdf from "html2pdf.js";

/**
 * AI Templates flow:
 * PDF downloads FIRST
 * Review modal opens AFTER (same as old behavior)
 */
export function downloadResumeAndTriggerReview({ onReviewTrigger } = {}) {
  console.log("🟢 DownloadPDF function CALLED");

  const container = document.getElementById("resumeContainer");
  if (!container) {
    console.warn("❌ resumeContainer NOT found");
    return;
  }

  const checkboxes = container.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach(cb => (cb.style.display = "none"));

  const clone = container.cloneNode(true);

  const header = document.createElement("div");
  header.style.width = "100%";
  header.style.borderBottom = "2px solid #000";
  header.style.marginBottom = "1px";
  header.style.textAlign = "center";
  header.style.fontWeight = "bold";
  header.style.fontSize = "14px";
  clone.prepend(header);

  const opt = {
    margin: [10, 8, 10, 8],
    filename: "resume.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  html2pdf()
    .set(opt)
    .from(clone)
    .save()
    .finally(() => {
      // restore UI
      checkboxes.forEach(cb => (cb.style.display = ""));

      // ⭐ OPEN REVIEW MODAL AFTER PDF (AI templates)
      if (typeof onReviewTrigger === "function") {
        console.log("⭐ Opening review modal after PDF");
        onReviewTrigger();
      }
    });
}
