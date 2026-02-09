import html2pdf from "html2pdf.js";
import { useReview } from "../context/ReviewContext";

/**
 * Utility function
 * Called from Download button
 * DOES NOT render UI
 */
export function downloadResumeAndTriggerReview() {
  console.log("🟢 DownloadPDF function CALLED");

  const { triggerReview } = useReview();
  const hasReviewed = localStorage.getItem("hasReviewed");

  // ⭐ STEP 1: If NOT reviewed → show popup FIRST
  if (!hasReviewed) {
    console.log("⭐ User not reviewed → opening review popup");

    triggerReview({
      onSuccess: () => {
        console.log("✅ Review submitted → continue PDF download");
        localStorage.setItem("hasReviewed", "true");
        startPDFDownload(); // 👈 continue after review
      },
    });

    return; // ⛔ STOP here, do not download yet
  }

  // ✅ STEP 2: Already reviewed → direct download
  startPDFDownload();
}

/* ======================================================
   ⬇️⬇️ DO NOT TOUCH BELOW (PDF LOGIC UNCHANGED)
   ====================================================== */

function startPDFDownload() {
  const container = document.getElementById("resumeContainer");
  if (!container) {
    console.warn("❌ resumeContainer NOT found");
    return;
  }

  console.log("✅ resumeContainer found");

  // Hide checkboxes
  const checkboxes = container.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach(cb => (cb.style.display = "none"));

  // Clone container
  const clone = container.cloneNode(true);

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

  console.log("🟡 Starting html2pdf...");

  html2pdf()
    .set(opt)
    .from(clone)
    .toPdf()
    .get("pdf")
    .then((pdf) => {
      console.log("🟢 PDF generated");

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
      console.log("🟢 PDF saved");

      // Restore UI
      checkboxes.forEach(cb => (cb.style.display = ""));
    });
}
