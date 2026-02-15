import html2pdf from "html2pdf.js";

export function downloadResumeAndTriggerReview({
  element,
  onReviewTrigger,
}) {
  const container =
    element || document.getElementById("resumeContainer");

  if (!container) return;

  // Hide checkboxes
  const checkboxes = container.querySelectorAll(
    "input[type='checkbox']"
  );
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

  html2pdf()
    .set(opt)
    .from(container) // 🔥 USE REAL DOM (NO CLONE)
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
    .save()
    .finally(() => {
      checkboxes.forEach((cb) => (cb.style.display = ""));

      // 🔥 Trigger review AFTER download (AI logic)
      setTimeout(() => {
        if (
          typeof onReviewTrigger === "function" &&
          !localStorage.getItem("reviewSubmitted")
        ) {
          onReviewTrigger();
        }
      }, 600);
    });
}

/* ✅ BACKWARD COMPATIBILITY */
export const downloadResumePDF = downloadResumeAndTriggerReview;
