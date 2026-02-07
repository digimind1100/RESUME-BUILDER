import React, { useState } from "react";
import html2pdf from "html2pdf.js";
import Toast from "./Toast";
import { useReview } from "../context/ReviewContext";

export default function DownloadPDF({ user, onReviewTrigger })  {
  // ✅ FIXED: consistent state name

  console.log("onReviewTrigger =", onReviewTrigger);

const [toast, setToast] = useState(false);
const { triggerReview, allowReviewAfterDownload } = useReview();
allowReviewAfterDownload();
setTimeout(() => {
  triggerReview();
}, 600);

  const submitReview = async (data) => {
  await fetch("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  setToast(true);
  setTimeout(() => setToast(false), 3000);
};
  const handleDownload = () => {
    const container = document.getElementById("resumeContainer");
    if (!container) return;

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
.save();

// restore UI
checkboxes.forEach(cb => (cb.style.display = ""));

// ensure popup after download
setTimeout(() => {
  if (!localStorage.getItem("reviewSubmitted")) {
    if (typeof onReviewTrigger === "function") {
  onReviewTrigger();
}
 // 🔥 parent handles modal
  }
}, 600);



  };

  return (
    <>
      <button onClick={handleDownload} className="download-btn">
        Download PDF
      </button>


{toast && (
  <Toast message="Your review has been submitted for approval" />
)}


    </>
  );
}
