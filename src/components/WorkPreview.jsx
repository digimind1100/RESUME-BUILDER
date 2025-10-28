import React from "react";
import "./PreviewPanel.css";

export default function WorkPreview({
  workList = [],
  toggleWorkCheckbox,
  handleDeleteSelectedWork,
  isEditing,
}) {
  return (
    <div className="preview-box work-box mb-6">
      {/* ==== Header Section ==== */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold border-b pb-2">Work Experience</h2>
        {workList.length > 0 && (
          <button
            onClick={handleDeleteSelectedWork}
            className="delete-btn text-red-600 text-sm font-semibold"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            Delete Selected
          </button>
        )}
      </div>

      {/* ==== Work Entries ==== */}
      {workList.length > 0 ? (
        workList.map((entry, idx) => {
          const work = entry.work || entry; // ✅ Handles nested { work: {...} } or flat objects
          const id = work.id ?? idx;
          const checked = !!work.checked;

          // Display text logic (company, title, or fallback)
          const display =
            typeof work === "object"
              ? work.text || work.title || work.company || "Work"
              : work;

          return (
            <div
              id={`work-item-${id}`} // ✅ Required for paginateWorkEntries.js height measurement
              key={`work-${id}`}
              className="work-entry flex items-start mb-2"
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
            >
              {/* Checkbox & bullet */}
              <div className="checkbox-bullet-wrapper flex items-center mr-2">
                <input
                  type="checkbox"
                  className="work-checkbox"
                  checked={checked}
                  onChange={() =>
                    typeof toggleWorkCheckbox === "function" &&
                    toggleWorkCheckbox(id)
                  }
                />
                <span className="bullet ml-1">•</span>
              </div>

              {/* Work text */}
              <div className="work-text flex-1">{display}</div>
            </div>
          );
        })
      ) : (
        <p className="text-sm text-gray-500 italic">
          No work experiences added yet.
        </p>
      )}
    </div>
  );
}
