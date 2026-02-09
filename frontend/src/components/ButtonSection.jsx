import React from "react";
import "./ButtonSection.css";
import { downloadResumeAndTriggerReview } from "./DownloadPDF";

export default function ButtonSection({
  isEditing,
  setIsEditing,
  handleDeleteSelected,
}) {
  const handleDownloadClick = () => {
    downloadResumeAndTriggerReview();
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
