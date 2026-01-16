import React from "react";
import "./PreviewPanel.css";

export default function SkillsPreview({
  skillsList = [],
  toggleSkillCheckbox,
  handleDeleteSelectedSkills,
  isEditing,
}) {
  return (
    <div className="preview-box skills-box mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold border-b pb-2">Skills</h2>
        {skillsList.length > 0 && (
          <button
            onClick={handleDeleteSelectedSkills}
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

      {skillsList.length > 0 ? (
        skillsList.map((skill, idx) => {
          const key = skill.id ?? `skill-${idx}`;
          const checked = !!skill.checked;
          const display =
            typeof skill === "object" ? skill.text || skill.title || "Skill" : skill;

          return (
            <div
              key={key}
              className="skill-entry flex items-start mb-2"
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
            >
              <div className="checkbox-bullet-wrapper flex items-center mr-2">
                <input
                  type="checkbox"
                  className="skill-checkbox"
                  checked={checked}
                  onChange={() =>
                    typeof toggleSkillCheckbox === "function" &&
                    toggleSkillCheckbox(skill.id ?? idx)
                  }
                />
                <span className="bullet ml-1">•</span>
              </div>

              <div className="skill-text flex-1">{display}</div>
            </div>
          );
        })
      ) : (
        <p className="text-sm text-gray-500 italic">No skills added yet.</p>
      )}
    </div>
  );
}
