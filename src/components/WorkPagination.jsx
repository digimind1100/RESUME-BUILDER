import React from "react";

export default function WorkPagination({
  workList,
  workBoxRef,
  toggleWorkCheckbox,
  isEditing,
}) {
  if (!workList || workList.length === 0) return null;

  return (
    <div ref={workBoxRef}>
      {workList.map((work, index) => (
        <div
          key={work.id || index}
          className="work-item mb-3"
          contentEditable={isEditing}
          suppressContentEditableWarning={true}
        >
          <div className="checkbox-bullet-wrapper flex items-center mb-1">
            <input
              type="checkbox"
              className="work-checkbox mr-2"
              checked={!!work.selected}
              onChange={() =>
                typeof toggleWorkCheckbox === "function"
                  ? toggleWorkCheckbox(index)
                  : null
              }
            />
            <span className="bullet">•</span>
          </div>
          <div className="work-text ml-4">
            {typeof work === "object"
              ? work.title || work.text || "Work Experience"
              : work}
          </div>
        </div>
      ))}
    </div>
  );
}
