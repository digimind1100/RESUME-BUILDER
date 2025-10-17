import React, { useEffect, useRef, useState } from "react";
import "./PreviewPanel.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from "react-icons/fa";
import { paginateEntries } from "../utils/paginateEntries";

const WORK_SHIFT_THRESHOLD = 825; // Logic #1 threshold

export default function PreviewPanel({
  formData,
  selectedEducations,
  handleCheckboxChange,
  jobTitle,
  workExperiences = [],
  deleteWorkExperience,
  skills = [],
  deleteSkill,
  selectedSkills,
  isEditing,
  toggleWorkCheckbox,
  toggleSkillCheckbox,
}) {
  const leftRef = useRef(null);
  const topSectionRef = useRef(null);

  // Refs for work/skills boxes (to measure)
  const workBoxRef = useRef(null);
  const skillsBoxRef = useRef(null);

  const [page1Education, setPage1Education] = useState([]);
  const [page2Education, setPage2Education] = useState([]);
  const [pageBreakY, setPageBreakY] = useState(null);

  // Whether to move entire Skills box to Page 2 (Logic #1)
  const [moveSkillsToPage2, setMoveSkillsToPage2] = useState(false);

  const localToggleCheckbox = (globalIndex) => {
    if (typeof handleCheckboxChange === "function") {
      handleCheckboxChange(globalIndex);
    }
  };

  // --- Education pagination (unchanged) ---
  useEffect(() => {
    const eduList = Array.isArray(formData.education) ? formData.education : [];
    if (eduList.length === 0) {
      setPage1Education([]);
      setPage2Education([]);
      setPageBreakY(null);
      return;
    }

    const timer = setTimeout(() => {
      const { page1, page2, breakY } = paginateEntries({
        containerEl: leftRef.current,
        topSectionEl: topSectionRef.current,
        entryList: eduList,
      });

      setPage1Education(page1);
      setPage2Education(page2);
      setPageBreakY(breakY);
    }, 140);

    return () => clearTimeout(timer);
  }, [formData]);

  // --- Logic #1: watch work box height and move skills to page2 if threshold exceeded ---
  useEffect(() => {
    const check = () => {
      if (!workBoxRef.current) {
        setMoveSkillsToPage2(false);
        return;
      }
      const workHeight = workBoxRef.current.getBoundingClientRect().height;
      // console.log("Work height:", workHeight);
      setMoveSkillsToPage2(workHeight > WORK_SHIFT_THRESHOLD);
    };

    // initial check
    check();

    // Observe resize of work box so height changes (typing) trigger recalculation
    let ro;
    if (typeof ResizeObserver !== "undefined" && workBoxRef.current) {
      ro = new ResizeObserver(() => {
        check();
      });
      ro.observe(workBoxRef.current);
    }

    // also check on window resize
    window.addEventListener("resize", check);

    return () => {
      if (ro && ro.disconnect) ro.disconnect();
      window.removeEventListener("resize", check);
    };
  }, [workExperiences, skills, isEditing, jobTitle, formData?.fullName]);

  return (
    <>
      {/* PAGE 1 */}
      <div className="preview-section" style={{ position: "relative" }}>
        {/* LEFT SIDE */}
        <div
          className="preview-left"
          ref={leftRef}
          style={{ boxSizing: "border-box", position: "relative" }}
        >
          {pageBreakY != null && (
            <div
              style={{
                pointerEvents: "none",
                position: "absolute",
                top: `${pageBreakY}px`,
                left: 0,
                right: 0,
                height: "2px",
                background: "red",
                zIndex: 9999,
                opacity: 0.6,
              }}
            />
          )}

          <div ref={topSectionRef}>
            <div className="profile-pic-wrapper">
              <img
                id="profilePicPreview"
                src={formData?.profilePic || "https://via.placeholder.com/120"}
                alt="Profile"
              />
            </div>

            <h2 className="preview-name">{formData?.fullName || "Your Name"}</h2>

            <div className="contact-info">
              <div className="icon-block">
                <FaEnvelope className="icon" />
                <p>{formData?.email || "your.email@example.com"}</p>
              </div>
              <div className="icon-block">
                <FaPhone className="icon" />
                <p>{formData?.phone || "+123 456 7890"}</p>
              </div>
              <div className="icon-block">
                <FaMapMarkerAlt className="icon" />
                <p>{formData?.address || "Street Address"}</p>
              </div>
              <div className="icon-block">
                <p>{formData?.city || "City / State / Zip Code"}</p>
              </div>
              <div className="icon-block">
                <p>{formData?.country || "Country"}</p>
              </div>
              <div className="icon-block">
                <FaLinkedin className="icon" />
                <p>{formData?.linkedin || "linkedin.com/in/username"}</p>
              </div>
            </div>

            <h3 className="section-heading">Date of Birth</h3>
            <p>{formData?.dob || "DD/MM/YYYY"}</p>

            <h3 className="section-heading">Education (Page 1)</h3>
          </div>

          {page1Education.map(({ edu, idx }) => (
            <div key={idx} className="education-entry border p-2 my-2 rounded">
              <input
                type="checkbox"
                checked={selectedEducations.includes(idx)}
                onChange={() => localToggleCheckbox(idx)}
              />
              <div className="education-details">
                <p className="edu-school">{edu.school}</p>
                <p className="edu-degree">{edu.degree}</p>
                <p className="edu-year">{edu.year}</p>
              </div>
            </div>
          ))}

          {page2Education.length > 0 &&
            page1Education.length > 0 &&
            pageBreakY != null &&
            (1016 - pageBreakY) > 20 && (
              <div
                style={{
                  marginTop: "10px",
                  fontStyle: "italic",
                  textAlign: "center",
                  opacity: 0.7,
                }}
              >
                Continue on Page 2 →
              </div>
            )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 p-4">
          <div className="max-w-2xl mx-auto">
            {/* Job Title Box */}
            <div className="job-title-box text-center mb-6">
              <h1 className="text-2xl font-bold job-title-banner">
                {jobTitle || formData.jobTitle || "Job Title"}
              </h1>
            </div>

            {/* ---- Work Experience Box ---- */}
            <div
              ref={workBoxRef}
              className={`preview-box work-box mb-6 ${isEditing ? "editable-box" : ""}`}
            >
              <h2 className="text-lg font-bold mb-3 border-b pb-2">Work Experience</h2>

              {workExperiences && workExperiences.length > 0 ? (
                workExperiences.map((exp, index) => (
                  <div
                    key={exp.id || index}
                    className="work-exp-item flex items-start mb-2"
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                  >
                    <div className="checkbox-bullet-wrapper flex items-center mr-2">
                      <input
                        type="checkbox"
                        className="exp-checkbox"
                        checked={!!exp.selected}
                        onChange={() =>
                          typeof toggleWorkCheckbox === "function"
                            ? toggleWorkCheckbox(index)
                            : null
                        }
                      />
                      <span className="bullet ml-1">•</span>
                    </div>

                    <div className="exp-text flex-1">
                      {typeof exp === "object" ? exp.title || exp.text || "Experience" : exp}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">No work experience added yet.</p>
              )}
            </div>

            {/* ---- Skills Box (only render on Page 1 when NOT moved) ---- */}
            {!moveSkillsToPage2 && (
              <div
                ref={skillsBoxRef}
                className={`preview-box skills-box mb-6 ${isEditing ? "editable-box" : ""}`}
              >
                <h2 className="text-lg font-bold mb-3 border-b pb-2">Skills</h2>

                {skills && skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <div
                      key={skill.id || index}
                      className="skill-item flex items-start mb-2"
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                    >
                      <div className="checkbox-bullet-wrapper flex items-center mr-2">
                        <input
                          type="checkbox"
                          className="skill-checkbox"
                          checked={!!skill.selected}
                          onChange={() =>
                            typeof toggleSkillCheckbox === "function"
                              ? toggleSkillCheckbox(index)
                              : null
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
            )}
          </div>
        </div>
      </div>

      {/* PAGE 2 */}
      {(page2Education.length > 0 || moveSkillsToPage2) && (
        <div className="preview-section mt-8" style={{ position: "relative" }}>
          <div className="preview-left" style={{ position: "relative" }}>
            {page2Education.length > 0 && <h3 className="section-heading">Education (Page 2)</h3>}
            {page2Education.map(({ edu, idx }) => (
              <div key={idx} className="education-entry border p-2 my-2 rounded">
                <input
                  type="checkbox"
                  checked={selectedEducations.includes(idx)}
                  onChange={() => localToggleCheckbox(idx)}
                />
                <div className="education-details">
                  <p className="edu-school">{edu.school}</p>
                  <p className="edu-degree">{edu.degree}</p>
                  <p className="edu-year">{edu.year}</p>
                </div>
              </div>
            ))}
          </div>




{/* RIGHT SIDE (Page 2) */}
<div className="flex-1 p-4">
  <div className="max-w-2xl mx-auto">

    {/* Work Box on Page 2 */}
    <div className="flex flex-col gap-6 preview-box work-box mb-6">
      <h3 className="section-heading">Work Experience (Page 2)</h3>
      <p style={{ marginBottom: 8 }}>Continued if needed...</p>
    </div>

    {/* Skills Box on Page 2 */}
    {moveSkillsToPage2 && (
      <div className="preview-box skills-box mb-6">
        <h3 className="section-heading">Skills (Page 2)</h3>
        {skills && skills.length > 0 ? (
          skills.map((skill, index) => (
            <div
              key={skill.id || index}
              className="skill-item flex items-start mb-2"
            >
              <div className="checkbox-bullet-wrapper flex items-center mr-2">
                <input
                  type="checkbox"
                  className="skill-checkbox"
                  checked={!!skill.selected}
                  onChange={() =>
                    typeof toggleSkillCheckbox === "function"
                      ? toggleSkillCheckbox(index)
                      : null
                  }
                />
                <span className="bullet ml-1">•</span>
              </div>
              <div className="skill-text flex-1">
                {typeof skill === "object"
                  ? skill.title || skill.text || "Skill"
                  : skill}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 italic">
            No skills added yet.
          </p>
        )}
      </div>
    )}

  </div>
</div>





        </div>
      )}
    </>
  );
}
