import React from "react";
import "./ButtonSection.css";
import { downloadResumeAndTriggerReview } from "./DownloadPDF";
import { useReview } from "../context/ReviewContext";

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

  const handleDownloadClick = () => {
    downloadResumeAndTriggerReview({
      onReviewTrigger: triggerReview,
    });
  };

  return (
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
  );
}
