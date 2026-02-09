import React, { useState } from "react";
import "./ButtonSection.css";
import { downloadResumeAndTriggerReview } from "./DownloadPDF";
import { useReview } from "../context/ReviewContext";
import ReviewPopup from "./ReviewPopup"; // adjust path if needed

export default function ButtonSection({
  isEditing,
  setIsEditing,
  handleDeleteSelected,
  formData,
  selectedEducations,
  workExperiences,
  skills,
  jobTitle,
}) {
  const { triggerReview } = useReview();
  const [showReviewPopup, setShowReviewPopup] = useState(false);

  // 👉 called when user clicks Download
  const handleDownloadClick = () => {
    const hasReviewed = localStorage.getItem("hasReviewed");

    if (!hasReviewed) {
      setShowReviewPopup(true); // show popup first
      return;
    }

    // already reviewed → direct download
    downloadResumeAndTriggerReview({
      onReviewTrigger: triggerReview,
    });
  };

  // 👉 called AFTER successful review submit
  const handleReviewSuccess = () => {
    localStorage.setItem("hasReviewed", "true");
    setShowReviewPopup(false);

    // continue original download flow
    downloadResumeAndTriggerReview({
      onReviewTrigger: triggerReview,
    });
  };

  return (
    <>
      <div className="button-section-container button-section">
        <div className="button-section-inner">
          {/* ✅ ONE Download button only */}
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

      {/* ✅ Review Popup */}
      {showReviewPopup && (
        <ReviewPopup
          onClose={() => setShowReviewPopup(false)}
          onSuccess={handleReviewSuccess}
        />
      )}
    </>
  );
}
