// WorkPagination.jsx
import React from "react";

export default function WorkPagination({ workExperiences = [], toggleWorkCheckbox, isEditing }) {
  if (!Array.isArray(workExperiences) || workExperiences.length === 0) {
    return <p className="text-gray-500">No work experience added yet.</p>;
  }

  return (
    <div className="preview-box work-box mb-6">
      <h3 className="section-heading">Work Experience</h3>
      {workExperiences.map((work, index) => (
        <div key={work.id || index} className="work-entry flex items-start mb-2">
          {/* Checkbox + bullet */}
          <div className="checkbox-bullet-wrapper flex items-center mr-2">
            {isEditing && (
              <input
                type="checkbox"
                className="work-checkbox"
                checked={!!work.selected}
                onChange={() =>
                  typeof toggleWorkCheckbox === "function" ? toggleWorkCheckbox(index) : null
                }
              />
            )}
            <span className="bullet ml-1">•</span>
          </div>

          {/* Work text */}
          <div className="work-text flex-1">
            {typeof work === "object" ? work.text || "Work Item" : work}
          </div>
        </div>
      ))}
    </div>
  );
}
