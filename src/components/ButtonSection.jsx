import React from "react";
import "./ButtonSection.css"; // custom styling for button area
import DownloadPDF from "./DownloadPDF"; // separate file handling PDF logic

const ButtonSection = () => {

    return (
        <div className="flex justify-center items-center py-4">
            <DownloadPDF />
            {/* === Future Buttons (placeholders for future expansion) === */}
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

    );
}

<ButtonSection>
  <DownloadPDF />
</ButtonSection>

export default ButtonSection