import React, { useEffect, useRef, useState } from "react";

/**
 * SkillsPagination
 * - skills: array from parent
 * - isEditing: boolean
 * - toggleSkillCheckbox: function(index)
 * - pageLimit: optional px threshold (default 1016)
 *
 * Works exactly like WorkPagination but for skills.
 */
export default function SkillsPagination({
  skills = [],
  isEditing = false,
  toggleSkillCheckbox,
  pageLimit = 1016,
}) {
  const measurerRef = useRef(null);
  const [page1Skills, setPage1Skills] = useState([]); // [{ skill, idx }]
  const [page2Skills, setPage2Skills] = useState([]);

  useEffect(() => {
    if (!Array.isArray(skills) || skills.length === 0) {
      setPage1Skills([]);
      setPage2Skills([]);
      return;
    }

    const timer = setTimeout(() => {
      if (!measurerRef.current) {
        setPage1Skills(skills.map((s, i) => ({ skill: s, idx: i })));
        setPage2Skills([]);
        return;
      }

      const children = Array.from(measurerRef.current.children);
      let total = 0;
      const p1 = [];
      const p2 = [];

      children.forEach((child, idx) => {
        const rect = child.getBoundingClientRect();
        const h = rect.height;
        const gap = 8;
        if (total + h + gap <= pageLimit) {
          total += h + gap;
          p1.push({ skill: skills[idx], idx });
        } else {
          p2.push({ skill: skills[idx], idx });
        }
      });

      setPage1Skills(p1);
      setPage2Skills(p2);
    }, 60);

    return () => clearTimeout(timer);
  }, [skills, isEditing, pageLimit]);

  return (
    <>
      {/* hidden measurer */}
      <div
        aria-hidden
        ref={measurerRef}
        style={{
          position: "absolute",
          left: -99999,
          top: 0,
          width: "100%",
          pointerEvents: "none",
          visibility: "hidden",
          zIndex: -1,
        }}
      >
        <div className={`preview-box skills-box mb-6 ${isEditing ? "editable-box" : ""}`}>
          <h2 className="text-lg font-bold mb-3 border-b pb-2">Skills</h2>

          {skills.map((skill, index) => (
            <div key={skill?.id ?? index} className="skill-item flex items-start mb-2">
              <div className="checkbox-bullet-wrapper flex items-center mr-2">
                <input type="checkbox" readOnly />
                <span className="bullet ml-1">•</span>
              </div>
              <div className="skill-text flex-1">
                {typeof skill === "object" ? skill.title || skill.text || "Skill" : skill}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VISIBLE PAGE 1 */}
      <div className={`preview-box skills-box mb-6 ${isEditing ? "editable-box" : ""}`}>
        <h2 className="text-lg font-bold mb-3 border-b pb-2">Skills</h2>

        {page1Skills.length > 0 ? (
          page1Skills.map(({ skill, idx }) => (
            <div
              key={skill?.id ?? idx}
              className="skill-item flex items-start mb-2"
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
            >
              <div className="checkbox-bullet-wrapper flex items-center mr-2">
                <input
                  type="checkbox"
                  className="skill-checkbox"
                  checked={!!skill?.selected}
                  onChange={() =>
                    typeof toggleSkillCheckbox === "function" ? toggleSkillCheckbox(idx) : null
                  }
                />
                <span className="bullet ml-1">•</span>
              </div>

              <div className="skill-text flex-1">
                {typeof skill === "object" ? skill.title || skill.text || "Skill" : skill}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 italic">No skills added yet.</p>
        )}
      </div>

      {/* VISIBLE PAGE 2 */}
      {page2Skills.length > 0 && (
        <div className="preview-box skills-box mb-6">
          <h3 className="section-heading">Skills (Page 2)</h3>
          {page2Skills.map(({ skill, idx }) => (
            <div key={skill?.id ?? idx} className="skill-item flex items-start mb-2">
              <div className="checkbox-bullet-wrapper flex items-center mr-2">
                <input
                  type="checkbox"
                  className="skill-checkbox"
                  checked={!!skill?.selected}
                  onChange={() =>
                    typeof toggleSkillCheckbox === "function" ? toggleSkillCheckbox(idx) : null
                  }
                />
                <span className="bullet ml-1">•</span>
              </div>
              <div className="skill-text flex-1">
                {typeof skill === "object" ? skill.title || skill.text || "Skill" : skill}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
