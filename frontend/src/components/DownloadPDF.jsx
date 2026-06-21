import html2pdf from "html2pdf.js";
import { uploadResumePdfCopy } from "../services/resumePdfCopyService";

export async function downloadResumeAndTriggerReview({
  element,
  downloadType = "ai",
  templateId = "resume-builder",
  fileName = "resume.pdf",
} = {}) {
  const container = element || document.getElementById("resumeContainer");

  if (!container) return false;

  const checkboxes = container.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((cb) => (cb.style.display = "none"));

  const opt = {
    margin: [10, 8, 10, 8],
    filename: fileName,
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
    const worker = html2pdf()
      .set(opt)
      .from(container)
      .toPdf();

    await worker.get("pdf").then((pdf) => {
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
    });

    const pdfBlob = await worker.outputPdf("blob");

    await uploadResumePdfCopy({
      pdfBlob,
      fileName,
      templateId,
      downloadType,
    });

    await worker.save();

    return true;
  } finally {
    checkboxes.forEach((cb) => (cb.style.display = ""));
  }
}

export const downloadResumePDF = downloadResumeAndTriggerReview;
