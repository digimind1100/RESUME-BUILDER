import React from "react";
import "./ButtonSection.css"; // custom styling for button area
import DownloadPDF from "./DownloadPDF"; // ✅ keep this import!

const ButtonSection = () => {
  return (
    <div className="button-section-container">
      <div className="button-section-inner">
        <DownloadPDF />
        <button className="common-btn" disabled>
          Download Word Doc
        </button>
        <button className="common-btn" disabled>
          Edit Preview
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

export default ButtonSection;
