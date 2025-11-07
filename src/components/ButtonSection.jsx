import React from "react";
import "./ButtonSection.css";
import DownloadPDF from "./DownloadPDF";


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
  return (
    <div className="button-section-container button-section">
      <div className="button-section-inner">
        <DownloadPDF />

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
