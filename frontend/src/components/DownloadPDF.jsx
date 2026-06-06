import html2pdf from "html2pdf.js";
import { trackResumeDownload } from "../services/statsService";

export async function downloadResumeAndTriggerReview({
  element,
  downloadType = "ai",
} = {}) {
  const container = element || document.getElementById("resumeContainer");

  if (!container) return false;

  const checkboxes = container.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((cb) => (cb.style.display = "none"));

  const opt = {
    margin: [10, 8, 10, 8],
    filename: "resume.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    },
    pagebreak: { mode: ["avoid-all", "css", "legacy"] },
  };

  try {
    await html2pdf()
      .set(opt)
      .from(container)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        if (pdf.internal.getNumberOfPages() > 1) {
          pdf.deletePage(1);
        }

        const totalPages = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setDrawColor(0);
          pdf.setLineWidth(0.5);
          pdf.line(10, 10, 200, 10);
          pdf.line(10, 287, 200, 287);
          pdf.setFontSize(10);
          pdf.text(`Page ${i} of ${totalPages}`, 182, 291);
        }
      })
      .save();

    await trackResumeDownload(downloadType);
    return true;
  } finally {
    checkboxes.forEach((cb) => (cb.style.display = ""));
  }
}

export const downloadResumePDF = downloadResumeAndTriggerReview;
