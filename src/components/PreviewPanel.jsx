// PreviewPanel.jsx
import React, { useEffect, useRef, useState } from "react";
import "./PreviewPanel.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from "react-icons/fa";
import { paginateEntries } from "../utils/paginateEntries";
import { paginateWorkEntries } from "../utils/paginateWorkEntries";
import { paginateSkillsEntries } from "../utils/paginateSkillsEntries"; // ✅ NEW util

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
  const rightPanelRef = useRef(null);
  const jobTitleRef = useRef(null);
  const workBoxRef = useRef(null); // 🔹 ref for Work box
  const skillsBoxRef = useRef(null); // ✅ added missing skills box ref

  // --- Education pagination ---
  const [page1Education, setPage1Education] = useState([]);
  const [page2Education, setPage2Education] = useState([]);
  const [pageBreakY, setPageBreakY] = useState(null);

  // --- Work pagination ---
  const [page1Work, setPage1Work] = useState([]);
  const [page2Work, setPage2Work] = useState([]);
  const [workBreakY, setWorkBreakY] = useState(null);

  // --- Skills pagination ---
  const [page1Skills, setPage1Skills] = useState([]);
  const [page2Skills, setPage2Skills] = useState([]);
  const [skillsBreakY, setSkillsBreakY] = useState(null);

  // --- Recalculate Work ---
  const rePaginateWork = () => {
    if (!Array.isArray(workExperiences) || workExperiences.length === 0) {
      setPage1Work([]);
      setPage2Work([]);
      setWorkBreakY(null);
      return;
    }
    const { page1, page2, breakY } = paginateWorkEntries({
      containerEl: rightPanelRef.current,
      topSectionEl: jobTitleRef.current,
      entryList: workExperiences,
    });
    setPage1Work(page1);
    setPage2Work(page2);
    setWorkBreakY(breakY);
  };

  // --- Recalculate Skills ---
  const rePaginateSkills = () => {
    if (!Array.isArray(skills) || skills.length === 0) {
      setPage1Skills([]);
      setPage2Skills([]);
      setSkillsBreakY(null);
      return;
    }
    const { page1, page2, breakY } = paginateSkillsEntries({
      containerEl: rightPanelRef.current,
      topSectionEl: jobTitleRef.current,
      workBoxEl: workBoxRef.current, // pass Work box ref so skills util can compute combined height
      entryList: skills,
    });
    setPage1Skills(page1);
    setPage2Skills(page2);
    setSkillsBreakY(breakY);
  };

  // --- Education effect ---
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

  // --- Work effect ---
  useEffect(() => {
    if (!Array.isArray(workExperiences) || workExperiences.length === 0) {
      setPage1Work([]);
      setPage2Work([]);
      setWorkBreakY(null);
      return;
    }
    const timer = setTimeout(() => {
      rePaginateWork();
    }, 140);
    return () => clearTimeout(timer);
  }, [workExperiences, jobTitle]);

  // --- Skills effect ---
  useEffect(() => {
    if (!Array.isArray(skills) || skills.length === 0) {
      setPage1Skills([]);
      setPage2Skills([]);
      setSkillsBreakY(null);
      return;
    }

    // Run immediately and slightly delayed to stabilize after reflow/paint
    rePaginateSkills();
    const timer = setTimeout(() => {
      rePaginateSkills();
    }, 140);

    return () => clearTimeout(timer);
    // include page1Work/page2Work so skills recompute when work overflows/moves
  }, [skills, jobTitle, page1Work, page2Work]);

  // --- Local checkbox ---
  const localToggleCheckbox = (globalIndex) => {
    if (typeof handleCheckboxChange === "function") {
      handleCheckboxChange(globalIndex);
    }
  };

  // --- Skills JSX block helper (keeps markup consistent) ---
  const renderSkillsBlock = (skillsArr, onInputHandler) => (
    <div className="preview-box skills-box mb-6" ref={skillsBoxRef}>
      <h2 className="text-lg font-bold mb-3 border-b pb-2">Skills</h2>
      {skillsArr && skillsArr.length > 0 ? (
        skillsArr.map(({ skill, idx }) => (
          <div
            key={idx}
            className="skill-item flex items-start mb-2"
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onInput={onInputHandler}
          >
            <div className="checkbox-bullet-wrapper flex items-center mr-2">
              <input
                type="checkbox"
                className="skill-checkbox"
                checked={!!skill.selected}
                onChange={() =>
                  typeof toggleSkillCheckbox === "function"
                    ? toggleSkillCheckbox(idx)
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
  );

  return (
    <>
      {/* PAGE 1 */}
      <div className="preview-section" style={{ position: "relative" }}>
        {/* LEFT SIDE */}
        <div className="preview-left" ref={leftRef}>
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
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 p-4" ref={rightPanelRef}>
          <div className="max-w-2xl mx-auto">
            {/* Job Title */}
            <div ref={jobTitleRef} className="job-title-box text-center mb-6">
              <h1 className="text-2xl font-bold job-title-banner">
                {jobTitle || formData.jobTitle || "Job Title"}
              </h1>
            </div>

            {/* Work Page 1 */}
            <div ref={workBoxRef} className="preview-box work-box mb-6">
              <h2 className="text-lg font-bold mb-3 border-b pb-2">Work Experience</h2>
              {page1Work.length > 0 ? (
                page1Work.map(({ work, idx }) => (
                  <div
                    key={idx}
                    className="work-entry flex items-start mb-2"
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    onInput={rePaginateWork}
                  >
                    <div className="checkbox-bullet-wrapper flex items-center mr-2">
                      <input
                        type="checkbox"
                        className="exp-checkbox"
                        checked={!!work.selected}
                        onChange={() =>
                          typeof toggleWorkCheckbox === "function" ? toggleWorkCheckbox(idx) : null
                        }
                      />
                      <span className="bullet ml-1">•</span>
                    </div>
                    <div className="exp-text flex-1">
                      {typeof work === "object" ? work.title || work.text || "Experience" : work}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">No work experience added yet.</p>
              )}
            </div>

            {/* Skills Page 1 - same structure as Work Page 1 */}
            {page2Work.length === 0 && renderSkillsBlock(page1Skills, rePaginateSkills)}
          </div>
        </div>
      </div>

      {/* PAGE 2 */}
      {(page2Education.length > 0 || page2Work.length > 0 || page2Skills.length > 0) && (
        <div className="preview-section mt-8">
          {/* LEFT SIDE PAGE 2 */}
          <div className="preview-left">
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

          {/* RIGHT SIDE PAGE 2 */}
          <div className="flex-1 p-4">
            <div className="max-w-2xl mx-auto">
              {page2Work.length > 0 && (
                <div className="preview-box work-box mb-6">
                  <h2 className="text-lg font-bold mb-3 border-b pb-2">Work Experience (Page 2)</h2>
                  {page2Work.map(({ work, idx }) => (
                    <div
                      key={idx}
                      className="work-entry flex items-start mb-2"
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      onInput={rePaginateWork}
                    >
                      <div className="checkbox-bullet-wrapper flex items-center mr-2">
                        <input
                          type="checkbox"
                          className="exp-checkbox"
                          checked={!!work.selected}
                          onChange={() =>
                            typeof toggleWorkCheckbox === "function" ? toggleWorkCheckbox(idx) : null
                          }
                        />
                        <span className="bullet ml-1">•</span>
                      </div>
                      <div className="exp-text flex-1">
                        {typeof work === "object" ? work.title || work.text || "Experience" : work}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills Page 2 - same structure as Page1 so input & checkboxes behave the same */}
              {page2Skills.length > 0 && renderSkillsBlock(page2Skills, rePaginateSkills)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
