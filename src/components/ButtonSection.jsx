import React from "react";
import "./ButtonSection.css"; // custom styling for button area
import DownloadPDF from "./DownloadPDF"; // ✅ keep this import!

export default function ButtonSection({  isEditing, setIsEditing }) {
  return (
    <div className="button-section-container">
      <div className="button-section-inner">
        <DownloadPDF />
        <button className="common-btn" disabled>
          Download Word Doc
        </button>
       <button
        className="common-btn"
        onClick={() => setIsEditing(prev => !prev)}  // ✅ yeh sahi tarika
      >
        {isEditing ? "Lock Preview" : "Edit Preview"}
      </button>
        <button className="common-btn" disabled>
          Delete Selected
        </button>
        <button className="common-btn" disabled>
          Add Work Experience
        </button>
        <button className="common-btn" disabled>
          Add Skills
        </button>
        <button className="common-btn" disabled>
          Refresh
        </button>
      </div>
    </div>
  );
};


