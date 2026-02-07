import React from "react";
import html2pdf from "html2pdf.js";

export default function DownloadPDF({
  user = null,
  onReviewTrigger = null,
}) {

  const handleDownload = () => {
    const container = document.getElementById("resumeContainer");
    if (!container) return;

    const checkboxes = container.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(cb => (cb.style.display = "none"));

    const clone = container.cloneNode(true);

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

        // 🔒 SAFE REVIEW TRIGGER
        setTimeout(() => {
          const canTrigger =
            typeof onReviewTrigger === "function" &&
            !localStorage.getItem("reviewSubmitted");

          if (canTrigger) {
            console.log("✅ triggering review popup safely");
            onReviewTrigger();
          } else {
            console.log("ℹ️ review trigger skipped", {
              onReviewTrigger,
              submitted: localStorage.getItem("reviewSubmitted"),
            });
          }
        }, 600);
      });
  };

  return (
    <button onClick={handleDownload} className="download-btn">
      Download PDF
    </button>
  );
}
