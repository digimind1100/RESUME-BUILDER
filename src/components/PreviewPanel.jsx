import React, { useEffect, useRef, useState } from "react";
import "./PreviewPanel.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from "react-icons/fa";
import { paginateEntries } from "../utils/paginateEntries";
import { paginateWorkEntries } from "../utils/paginateWorkEntries"; // new util

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

  // --- Education pagination ---
  const [page1Education, setPage1Education] = useState([]);
  const [page2Education, setPage2Education] = useState([]);
  const [pageBreakY, setPageBreakY] = useState(null);

  // --- Work pagination ---
  const [page1Work, setPage1Work] = useState([]);
  const [page2Work, setPage2Work] = useState([]);
  const [workBreakY, setWorkBreakY] = useState(null);

  //===============================

  const rePaginateWork = () => {
  if (!Array.isArray(workExperiences) || workExperiences.length === 0) return;
  const { page1, page2, breakY } = paginateWorkEntries({
    containerEl: rightPanelRef.current,
    topSectionEl: jobTitleRef.current,
    entryList: workExperiences,
  });
  setPage1Work(page1);
  setPage2Work(page2);
  setWorkBreakY(breakY);
};

  //==========================

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

  useEffect(() => {
    if (!Array.isArray(workExperiences) || workExperiences.length === 0) {
      setPage1Work([]);
      setPage2Work([]);
      setWorkBreakY(null);
      return;
    }
    const timer = setTimeout(() => {
      const { page1, page2, breakY } = paginateWorkEntries({
        containerEl: rightPanelRef.current,
        topSectionEl: jobTitleRef.current,
        entryList: workExperiences,
      });
      setPage1Work(page1);
      setPage2Work(page2);
      setWorkBreakY(breakY);
    }, 140);
    return () => clearTimeout(timer);
  }, [workExperiences, jobTitle]);

  const localToggleCheckbox = (globalIndex) => {
    if (typeof handleCheckboxChange === "function") {
      handleCheckboxChange(globalIndex);
    }
  };

  // 🔹 Helper: skills JSX block
  const renderSkillsBox = () => (
    <div className="preview-box skills-box mb-6">
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
  );

  return (
    <>
      {/* PAGE 1 */}
      <div className="preview-section" style={{ position: "relative" }}>
        {/* LEFT SIDE */}
        <div className="preview-left" ref={leftRef} style={{ boxSizing: "border-box", position: "relative" }}>
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
            {/* Job Title - only page 1 */}
            <div ref={jobTitleRef} className="job-title-box text-center mb-6">
              <h1 className="text-2xl font-bold job-title-banner">
                {jobTitle || formData.jobTitle || "Job Title"}
              </h1>
            </div>

            {/* Work Page 1 */}
            <div className="preview-box work-box mb-6">
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
                          typeof toggleWorkCheckbox === "function"
                            ? toggleWorkCheckbox(idx)
                            : null
                        }
                      />
                      <span className="bullet ml-1">•</span>
                    </div>
                    <div className="exp-text flex-1">
                      {typeof work === "object"
                        ? work.title || work.text || "Experience"
                        : work}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No work experience added yet.
                </p>
              )}
            </div>

            {/* Skills - show only if NO overflow to page2 */}
            {page2Work.length === 0 && renderSkillsBox()}
          </div>
        </div>
      </div>

      {/* PAGE 2 */}
      {(page2Education.length > 0 || page2Work.length > 0) && (
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
                            typeof toggleWorkCheckbox === "function"
                              ? toggleWorkCheckbox(idx)
                              : null
                          }
                        />
                        <span className="bullet ml-1">•</span>
                      </div>
                      <div className="exp-text flex-1">
                        {typeof work === "object"
                          ? work.title || work.text || "Experience"
                          : work}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills - if work overflowed, render here under work */}
              {page2Work.length > 0 && renderSkillsBox()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
