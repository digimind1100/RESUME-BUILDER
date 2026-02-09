import React from "react";
import "./ButtonSection.css";
import { downloadResumeAndTriggerReview } from "./DownloadPDF";
import { useReview } from "../context/ReviewContext";

export default function ButtonSection({
  isEditing,
  setIsEditing,
  handleDeleteSelected,
}) {
  const { triggerReview } = useReview();

  const handleDownloadClick = () => {
    const hasReviewed = localStorage.getItem("hasReviewed");

    if (!hasReviewed) {
      // ✅ open EXISTING review popup (context-based)
      triggerReview({
        onSuccess: () => {
          localStorage.setItem("hasReviewed", "true");

          // continue download after review
          downloadResumeAndTriggerReview({
            onReviewTrigger: triggerReview,
          });
        },
      });

      return;
    }

    // already reviewed → direct download
    downloadResumeAndTriggerReview({
      onReviewTrigger: triggerReview,
    });
  };

  return (
    <div className="button-section-container button-section">
      <div className="button-section-inner">
        <button className="common-btn" onClick={handleDownloadClick}>
          Download PDF
        </button>

        <button
          className="common-btn"
          onClick={() => setIsEditing((prev) => !prev)}
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
