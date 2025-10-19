import React from "react";
import "./ButtonSection.css"; 
import DownloadPDF from "./DownloadPDF"; 

export default function ButtonSection({ isEditing, setIsEditing, onDeleteSelected }) {
  return (
    <div className="button-section-container">
      <div className="button-section-inner">
        <DownloadPDF />

        <button className="common-btn" disabled>
          Download Word Doc
        </button>

   <button
  className="common-btn"
  onClick={() => setIsEditing(prev => !prev)}
>
  {isEditing ? "Lock Preview" : "Edit Preview"}
</button>


        {/* ✅ Activated Delete Selected */}
        <button 
          className="common-btn" 
          onClick={onDeleteSelected}
        >
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
}
