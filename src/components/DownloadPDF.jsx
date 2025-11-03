import React from "react";
import html2pdf from "html2pdf.js";

export default function DownloadPDF() {
  const handleDownload = () => {
    // ✅ Only include PreviewPanel, exclude ButtonSection
    const container = document.getElementById("resumeContainer");
    if (!container) return;

    // Hide checkboxes before export
    const checkboxes = container.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((cb) => (cb.style.display = "none"));

    // Clone container for PDF
    const clone = container.cloneNode(true);

    // ✅ Remove ButtonSection from clone (if present)
    const buttonSection = clone.querySelector(".button-section");
    if (buttonSection) buttonSection.remove();

    // ✅ Remove Theme Selector (so it doesn’t print in PDF)
    const themeSelector = clone.querySelector(".theme-selector-container");
    if (themeSelector) themeSelector.remove();

    // Add header
    const header = document.createElement("div");
    header.style.width = "100%";
    header.style.borderBottom = "2px solid #000";
    header.style.marginBottom = "1px";
    header.style.textAlign = "center";
    header.style.fontWeight = "bold";
    header.style.fontSize = "14px";
    clone.prepend(header);

    // Add footer container
    const footer = document.createElement("div");
    footer.style.width = "100%";
    footer.style.position = "relative";
    footer.style.marginTop = "3px";

    const line = document.createElement("div");
    line.style.width = "100%";
    line.style.borderTop = "1px solid #000";

    // ✅ PDF options
    const opt = {
      margin: [10, 8, 10, 8], // top, left, bottom, right in mm
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    // ✅ Generate PDF and draw header/footer on each page
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

          // Page numbering (bottom right)
          pdf.setFontSize(10);
          pdf.text(`Page ${i} of ${totalPages}`, 182, 291);
        }
      })
      .save()
      .finally(() => checkboxes.forEach((cb) => (cb.style.display = "")));
  };

  return (
    <button onClick={handleDownload} className="download-btn">
      Download PDF
    </button>
  );
}
