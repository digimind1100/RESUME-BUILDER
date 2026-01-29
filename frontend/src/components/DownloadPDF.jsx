import React from "react";
import html2pdf from "html2pdf.js";

export default function DownloadPDF() {
  const handleDownload = () => {
    const container = document.getElementById("resumeContainer");
    if (!container) return;

    // Hide checkboxes
    const checkboxes = container.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((cb) => (cb.style.display = "none"));

    // Hide theme selector temporarily
    const themeSelector = container.querySelector(".theme-selector");
    if (themeSelector) themeSelector.style.display = "none";

    // Clone container
    // Clone container
const clone = container.cloneNode(true);

/* ⭐ CRITICAL: attach clone SAFELY */
clone.style.position = "absolute";
clone.style.top = "0";
clone.style.left = "0";
clone.style.width = "210mm";
clone.style.minHeight = "297mm";
clone.style.background = "#fff";

/* invisible but renderable */
clone.style.opacity = "0";
clone.style.pointerEvents = "none";
clone.style.zIndex = "-1";

document.body.appendChild(clone);


    // Restore in DOM
    if (themeSelector) themeSelector.style.display = "";

    // Remove ButtonSection
    const buttonSection = clone.querySelector(".button-section");
    if (buttonSection) buttonSection.remove();

    // Add header
    const header = document.createElement("div");
    header.style.width = "100%";
    header.style.borderBottom = "2px solid #000";
    header.style.marginBottom = "1px";
    header.style.textAlign = "center";
    header.style.fontWeight = "bold";
    header.style.fontSize = "14px";
    clone.prepend(header);

    // Add footer
    const footer = document.createElement("div");
    footer.style.width = "100%";
    footer.style.position = "relative";
    footer.style.marginTop = "3px";
    const line = document.createElement("div");
    line.style.width = "100%";
    line.style.borderTop = "1px solid #000";

    // High-resolution, print-optimized options
    const opt = {
      margin: [10, 8, 10, 8],
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 1 }, // highest image quality
      html2canvas: {
        scale: 4, // 🔥 higher DPI (default was 2)
        useCORS: true,
        letterRendering: true,
        backgroundColor: "#ffffff", // ensures white background
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        compress: false, // 🔥 prevents text compression, keeps crispness
      },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    // Generate PDF
    html2pdf()
      .set(opt)
      .from(clone)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        const totalPages = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);

          // Header line
          pdf.setDrawColor(0);
          pdf.setLineWidth(0.5);
          pdf.line(10, 10, 200, 10);

          // Footer line
          pdf.line(10, 287, 200, 287);

          // Page numbering
          pdf.setFontSize(10);
          pdf.text(`Page ${i} of ${totalPages}`, 182, 291);
        }
      })
      .save()
      .finally(() => {
        // Restore checkboxes
        checkboxes.forEach((cb) => (cb.style.display = ""));
      });
  };

  return (
    <button onClick={handleDownload} className="download-btn">
      Download PDF
    </button>
  );
}
