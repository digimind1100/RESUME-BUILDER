import html2pdf from "html2pdf.js";

/**
 * Universal Download + Review Controller
 *
 * Modes:
 * 1️⃣ AI Templates → Download first, then trigger review
 * 2️⃣ Normal Templates → Trigger review first, then download
 */
export function downloadResumeAndTriggerReview({
  element,
  onReviewTrigger,
  mode = "ai", // "ai" or "normal"
}) {
  const container =
    element || document.getElementById("resumeContainer");

  if (!container) return;

  const startDownload = () => {
    // Hide checkboxes
    const checkboxes = container.querySelectorAll(
      "input[type='checkbox']"
    );
    checkboxes.forEach((cb) => (cb.style.display = "none"));

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
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
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
        checkboxes.forEach((cb) => (cb.style.display = ""));
      });
  };

  // ===============================
  // MODE 1️⃣ AI TEMPLATES
  // ===============================
  if (mode === "ai") {
    startDownload();

    setTimeout(() => {
      if (
        typeof onReviewTrigger === "function" &&
        !localStorage.getItem("reviewSubmitted")
      ) {
        onReviewTrigger();
      }
    }, 600);

    return;
  }

  // ===============================
  // MODE 2️⃣ NORMAL TEMPLATES
  // ===============================
  if (!localStorage.getItem("reviewSubmitted")) {
    if (typeof onReviewTrigger === "function") {
      onReviewTrigger(() => {
        localStorage.setItem("reviewSubmitted", "true");
        startDownload();
      });
    }
    return;
  }

  startDownload();
}

/* ✅ BACKWARD COMPATIBILITY */
export const downloadResumePDF = downloadResumeAndTriggerReview;
