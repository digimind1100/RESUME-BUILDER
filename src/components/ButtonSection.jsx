import React from "react";
import "./ButtonSection.css";
import DownloadPDF from "./DownloadPDF";
import DownloadWord from "./DownloadWord";

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

        <DownloadWord
          formData={formData}
          selectedEducations={selectedEducations}
          workExperiences={workExperiences}
          skills={skills}
          jobTitle={jobTitle}
        />

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
