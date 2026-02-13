import html2pdf from "html2pdf.js";

/**
 * Utility hook-style function.
 * Does NOT render any button.
 * Called from existing Download button.
 */
export function downloadResumeAndTriggerReview({
  onReviewTrigger,
}) {
  const container = document.getElementById("resumeContainer");
  if (!container) return;

  // Hide checkboxes
  const checkboxes = container.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach(cb => (cb.style.display = "none"));

  // Clone container
 const clone = container.cloneNode(true);

// Attach clone temporarily to DOM (hidden)
clone.style.position = "fixed";
clone.style.left = "-9999px";
clone.style.top = "0";
document.body.appendChild(clone);


  // Add header
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
    pagebreak: { mode: ["avoid-all", "css", "legacy"] },
  };

  html2pdf()
    .set(opt)
    .from(clone)
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
    if (clone && clone.parentNode) {
      clone.parentNode.removeChild(clone);
    }

      // 🔒 SAFE review trigger (AI templates)
      setTimeout(() => {
        if (
          typeof onReviewTrigger === "function" &&
          !localStorage.getItem("reviewSubmitted")
        ) {
          console.log("🔥 Calling triggerReview()");
          onReviewTrigger();
        }
      }, 600);
    });
}

/* ✅ BACKWARD COMPATIBILITY — DO NOT REMOVE */
export const downloadResumePDF = downloadResumeAndTriggerReview;
