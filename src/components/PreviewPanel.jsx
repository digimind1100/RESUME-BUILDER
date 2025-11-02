// PreviewPanel.jsx — updated for Skills pagination
import React, { useEffect, useRef, useState } from "react";
import "./PreviewPanel.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from "react-icons/fa";
import { paginateEntries } from "../utils/paginateEntries";
import { paginateWorkEntries } from "../utils/paginateWorkEntries";
import { paginateSkillsEntries } from "../utils/paginateSkillsEntries";

import WorkPreview from "./WorkPreview";
import SkillsPreview from "./SkillsPreview";

export default function PreviewPanel({
  formData,
  selectedEducations,
  handleCheckboxChange,
  jobTitle,
  workExperiences = [],
  deleteWorkExperience,
  skills = [],
  deleteSkill,
  isEditing,
  toggleWorkCheckbox,
  toggleSkillCheckbox,
  handleOpenWorkPopup,
  handleAddSkillsClick,
}) {
  // ================= REFS =================
  const leftRef = useRef(null);
  const topSectionRef = useRef(null);
  const rightPanelRef = useRef(null);
  const jobTitleRef = useRef(null);

  // NEW: refs for Work + Skills containers (for pagination)
  const workPanelRef = useRef(null);
  const skillsPanelRef = useRef(null);

  // ================= STATES =================
  const [page1Education, setPage1Education] = useState([]);
  const [page2Education, setPage2Education] = useState([]);
  const [pageBreakY, setPageBreakY] = useState(null);

  const [page1Work, setPage1Work] = useState([]);
  const [page2Work, setPage2Work] = useState([]);
  const [includePage2Work, setIncludePage2Work] = useState(false);

  const [page1Skills, setPage1Skills] = useState([]); // Skills on Page 1
  const [page2Skills, setPage2Skills] = useState([]); // Skills overflow to Page 2

  // ================= EFFECT: EDUCATION PAGINATION =================
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

  // ================= EFFECT: WORK PAGINATION =================
  useEffect(() => {
    if (!Array.isArray(workExperiences) || workExperiences.length === 0) {
      setPage1Work([]);
      setPage2Work([]);
      setIncludePage2Work(false);
      return;
    }

    const timer = setTimeout(() => {
      const { page1, page2, includeSkillsOnPage2 } = paginateWorkEntries({
        containerEl: rightPanelRef.current,
        topSectionEl: jobTitleRef.current,
        entryList: workExperiences,
      });

      setPage1Work(page1);
      setPage2Work(page2);
      setIncludePage2Work(includeSkillsOnPage2);
    }, 140);

    return () => clearTimeout(timer);
  }, [workExperiences]);

  // ================= EFFECT: INITIALIZE SKILLS =================
  useEffect(() => {
    setPage1Skills(skills); // all skills start on Page 1
    setPage2Skills([]);      // clear Page 2
  }, [skills]);

  // ================= EFFECT: SKILLS PAGINATION =================
  useEffect(() => {
    paginateSkillsEntries(
      workPanelRef,
      skillsPanelRef,
      page1Skills,
      page2Skills,
      setPage1Skills,
      setPage2Skills
    );
  }, [page1Skills, page1Work]);
  //================================================= 

//=================== hander ==================

//=======================================

  // ================= EDUCATION CHECKBOX =================
  const localToggleCheckbox = (globalIndex) => {
    if (typeof handleCheckboxChange === "function") {
      handleCheckboxChange(globalIndex);
    }
  };

  const getGlobalEduIndex = (page1Length, localIdx) => page1Length + localIdx;

  // ================= WORK HANDLERS =================
  const handleWorkCheckboxToggle = (id) => {
    if (typeof toggleWorkCheckbox === "function") {
      toggleWorkCheckbox(id);
      return;
    }
    console.warn("toggleWorkCheckbox not provided to PreviewPanel. id:", id);
  };

  const handleDeleteSelectedWork = () => {
    if (typeof deleteWorkExperience === "function") {
      try {
        const result = deleteWorkExperience();
        if (result === undefined) return;
      } catch (err) {
        if (Array.isArray(workExperiences)) {
          const remaining = workExperiences.filter((item) => {
            const w = item.work || item;
            return !w.checked;
          });
          try {
            deleteWorkExperience(remaining);
          } catch (err2) {
            console.warn("deleteWorkExperience failed when passed filtered array:", err2);
          }
        }
      }
    } else {
      console.warn("deleteWorkExperience prop not provided to PreviewPanel.");
    }
  };

  // ================= RENDER =================
  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <div className="preview-section" style={{ position: "relative" }}>
        {/* LEFT SIDE: PROFILE + EDUCATION PAGE 1 */}
        <div className="preview-left" ref={leftRef}>
          <div ref={topSectionRef}>
            {/* Profile Info */}
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

          {/* Education Page 1 Entries */}
          {page1Education.map(({ edu, idx }) => (
            <div key={idx} className="education-entry border p-2 my-2 rounded">
              <input
                type="checkbox"
                checked={selectedEducations?.includes(idx)}
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

        {/* RIGHT SIDE: WORK + SKILLS (PAGE 1) */}
        <div className="flex-1 p-4" ref={rightPanelRef}>
          <div className="max-w-2xl mx-auto">
            {/* Job Title */}
            <div ref={jobTitleRef} className="job-title-box text-center mb-6">
              <h1 className="text-2xl font-bold job-title-banner">
                {jobTitle || formData.jobTitle || "Job Title"}
              </h1>
            </div>

            {/* Paginated Work Section (Page 1) */}
            <div ref={workPanelRef} className="preview-box work-box">
              <WorkPreview
                workList={page1Work}
                toggleWorkCheckbox={handleWorkCheckboxToggle} 
                handleDeleteSelectedWork={handleDeleteSelectedWork} 
                isEditing={isEditing}
              />
            </div>

            {/* ✅ Skills on Page 1 only if Work does not overflow */}
{!includePage2Work && (
  <div ref={skillsPanelRef} className="preview-box skills-box">
    <SkillsPreview
      skillsList={page1Skills.length ? page1Skills : skills}
      toggleSkillCheckbox={toggleSkillCheckbox}
      handleDeleteSelectedSkills={deleteSkill}
      isEditing={isEditing}
    />
  </div>
)}

          </div>
        </div>
      </div>

      {/* ================= PAGE 2 ================= */}
      {(page2Education.length > 0 || page2Work.length > 0 || page2Skills.length > 0) && (
        <div className="preview-section mt-8">
          {/* LEFT SIDE: EDUCATION PAGE 2 */}
          <div className="preview-left">
            <h3 className="section-heading">Education (Page 2)</h3>
            {page2Education.map(({ edu, idx }, localIdx) => {
              const globalIdx = getGlobalEduIndex(page1Education.length, localIdx);
              return (
                <div key={globalIdx} className="education-entry border p-2 my-2 rounded">
                  <input
                    type="checkbox"
                    checked={selectedEducations?.includes(globalIdx)}
                    onChange={() => localToggleCheckbox(globalIdx)}
                  />
                  <div className="education-details">
                    <p className="edu-school">{edu.school}</p>
                    <p className="edu-degree">{edu.degree}</p>
                    <p className="edu-year">{edu.year}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE: WORK PAGE 2 + Skills PAGE 2 */}
          <div className="flex-1 p-4">
            <div className="max-w-2xl mx-auto">
              {page2Work.length > 0 && (
                <>
                  <h3 className="section-heading mt-6">Work Experience (Page 2)</h3>
                  <WorkPreview
                    workList={page2Work}
                    toggleWorkCheckbox={handleWorkCheckboxToggle}
                    handleDeleteSelectedWork={handleDeleteSelectedWork}
                    isEditing={isEditing}
                  />
                </>
              )}

              {/* ✅ If Work overflows, move Skills to Page 2 */}
{(includePage2Work || page2Skills.length > 0) && (
  <>
    <h3 className="section-heading mt-6">Skills (Page 2)</h3>
    <SkillsPreview
      skillsList={page2Skills.length ? page2Skills : skills}
      toggleSkillCheckbox={toggleSkillCheckbox}
      handleDeleteSelectedSkills={deleteSkill}
      isEditing={isEditing}
    />
  </>
)}

            </div>
          </div>
        </div>
      )}
    </>
  );
}
