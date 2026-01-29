import React from "react";
import html2pdf from "html2pdf.js";

export default function DownloadPDF() {
  const handleDownload = () => {
    const container = document.getElementById("resumeContainer") ||
     document.getElementById("coverLetterContainer");
    if (!container) return;

    // ------- FIX QR CODE: Convert canvas → image before PDF -------
    const qrCanvas = container.querySelector("canvas");
    let qrImgElement = null;

    if (qrCanvas) {
      const qrDataURL = qrCanvas.toDataURL("image/png");
      qrImgElement = document.createElement("img");
      qrImgElement.src = qrDataURL;
      qrImgElement.style.width = "190px";
      qrImgElement.style.height = "190px";

      qrCanvas.replaceWith(qrImgElement); // Replace canvas with image
    }

    // Hide checkboxes
    const checkboxes = container.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((cb) => (cb.style.display = "none"));

    // Hide theme selector temporarily
    const themeSelector = container.querySelector(".theme-selector");
    if (themeSelector) themeSelector.style.display = "none";

   
const clone = container.cloneNode(true);

/* ⭐ CRITICAL FIX */
clone.style.position = "absolute";
clone.style.top = "0";
clone.style.left = "0";
clone.style.width = "210mm";
clone.style.minHeight = "297mm";
clone.style.background = "#fff";

/* hide visually but keep layout */
clone.style.opacity = "0";
clone.style.pointerEvents = "none";

document.body.appendChild(clone);

    // Restore in DOM
    if (themeSelector) themeSelector.style.display = "";

    // Restore original QR canvas after cloning to avoid UI impact
    if (qrCanvas && qrImgElement) {
      qrImgElement.replaceWith(qrCanvas);
    }

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

    // PDF Options
    const opt = {
      margin: [10, 8, 10, 8],
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 4,
        useCORS: true,
        letterRendering: true,
        backgroundColor: "#ffffff",
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        compress: false,
      },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    html2pdf()
  .set(opt)
  .from(clone)
  .toPdf()
  .get("pdf")
  .then((pdf) => {
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(10);
      pdf.text(`Page ${i} of ${totalPages}`, 182, 291);
    }
  })
  .save()
  .finally(() => {
    checkboxes.forEach((cb) => (cb.style.display = ""));
    if (clone.parentNode) clone.parentNode.removeChild(clone);
  });


  };

  return (
    <button onClick={handleDownload} className="download-btn">
      Download PDF
    </button>
  );
}
