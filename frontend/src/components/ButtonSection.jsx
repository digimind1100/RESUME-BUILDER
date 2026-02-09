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

  const handleDownloadClick = async () => {
    try {
      // 🔥 PDF download + Review flow
      await downloadResumeAndTriggerReview({
        onReviewTrigger: triggerReview,
      });
    } catch (err) {
      console.error("❌ Download / Review error:", err);
    }
  };

  return (
    <div className="button-section-container button-section">
      <div className="button-section-inner">
        {/* 📄 DOWNLOAD PDF */}
        <button className="common-btn" onClick={handleDownloadClick}>
          Download PDF
        </button>

        {/* ✏️ EDIT / LOCK */}
        <button
          className="common-btn"
          onClick={() => setIsEditing(prev => !prev)}
        >
          {isEditing ? "Lock Preview" : "Edit Preview"}
        </button>

        {/* 🗑️ DELETE */}
        <button className="common-btn" onClick={handleDeleteSelected}>
          Delete Selected
        </button>
      </div>
    </div>
  );
}
