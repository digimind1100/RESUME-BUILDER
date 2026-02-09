import React from "react";
import "./ButtonSection.css";
import { downloadResumePDF } from "./DownloadPDF";
import { useReview } from "../context/ReviewContext";

export default function ButtonSection({
  isEditing,
  setIsEditing,
  handleDeleteSelected,
}) {
  const { triggerReview } = useReview();

  const handleDownloadClick = () => {
    const hasReviewed = localStorage.getItem("hasReviewed");

    // ⭐ First time → show popup
    if (!hasReviewed) {
      triggerReview({
        onSuccess: () => {
          localStorage.setItem("hasReviewed", "true");
          downloadResumePDF(); // 👈 PDF AFTER review
        },
      });
      return;
    }

    // ✅ Already reviewed
    downloadResumePDF();
  };

  return (
    <div className="button-section-container button-section">
      <div className="button-section-inner">
        <button className="common-btn" onClick={handleDownloadClick}>
          Download PDF
        </button>

        <button
          className="common-btn"
          onClick={() => setIsEditing(prev => !prev)}
        >
          {isEditing ? "Lock Preview" : "Edit Preview"}
        </button>

        <button className="common-btn" onClick={handleDeleteSelected}>
          Delete Selected
        </button>
      </div>
    </div>
  );
}
