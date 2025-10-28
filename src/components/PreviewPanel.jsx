// PreviewPanel.jsx — minimal fixes: ensure toggleWorkCheckbox & delete wrapper exist
import React, { useEffect, useRef, useState } from "react";
import "./PreviewPanel.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from "react-icons/fa";
import { paginateEntries } from "../utils/paginateEntries";
import { paginateWorkEntries } from "../utils/paginateWorkEntries";
import WorkPreview from "./WorkPreview";
import SkillsPreview from "./SkillsPreview";

export default function PreviewPanel({
  formData,
  selectedEducations,
  handleCheckboxChange,
  jobTitle,
  workExperiences = [],
  deleteWorkExperience, // parent-prop (may accept updated list or be a no-arg handler)
  skills = [],
  deleteSkill,
  isEditing,
  toggleWorkCheckbox, // optional prop from parent
  toggleSkillCheckbox,
  handleOpenWorkPopup,
  handleAddSkillsClick,
}) {
  // ================= REFS =================
  const leftRef = useRef(null);
  const topSectionRef = useRef(null);
  const rightPanelRef = useRef(null);
  const jobTitleRef = useRef(null);


  // ================= STATES =================
  const [page1Education, setPage1Education] = useState([]);
  const [page2Education, setPage2Education] = useState([]);

  const [page1Work, setPage1Work] = useState([]);
  const [page2Work, setPage2Work] = useState([]);
  const [includePage2Work, setIncludePage2Work] = useState(false);

  // ================= EFFECT: EDUCATION PAGINATION =================
  useEffect(() => {
    const eduList = Array.isArray(formData?.education) ? formData.education : [];
    if (eduList.length === 0) {
      setPage1Education([]);
      setPage2Education([]);
      return;
    }

    const timer = setTimeout(() => {
      const { page1, page2 } = paginateEntries({
        containerEl: leftRef.current,
        topSectionEl: topSectionRef.current,
        entryList: eduList,
      });
      setPage1Education(page1);
      setPage2Education(page2);
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

  // ================= EDUCATION CHECKBOX FIX =================
  const localToggleCheckbox = (globalIndex) => {
    if (typeof handleCheckboxChange === "function") {
      handleCheckboxChange(globalIndex);
    }
  };

  // Helper to calculate global index for page 2 education
  const getGlobalEduIndex = (page1Length, localIdx) => page1Length + localIdx;

  // ================================================
  // SAFE WRAPPERS for Work checkbox & delete
  // - These ensure PreviewPanel always has working handlers,
  //   forwarding to parent props if they exist.
  // ================================================
  // Wrapper to toggle a work checkbox (forwards to parent toggle if provided)
  const handleWorkCheckboxToggle = (id) => {
    if (typeof toggleWorkCheckbox === "function") {
      // If parent provided toggle function, forward to it
      toggleWorkCheckbox(id);
      return;
    }

    // No parent toggle provided — attempt to update workExperiences if parent expects us to call deleteWorkExperience
    // We cannot reliably mutate parent state here (no setter), so we just log for debugging.
    console.warn("toggleWorkCheckbox not provided to PreviewPanel. id:", id);
  };

  // Wrapper to delete selected works. Tries two strategies:
  // 1) If parent deleteWorkExperience expects no args (like a handler that reads checked flags), call it.
  // 2) Otherwise attempt to compute a filtered array and pass it to parent.
  const handleDeleteSelectedWork = () => {
    if (typeof deleteWorkExperience === "function") {
      try {
        // Try calling with no args first (most safe)
        const result = deleteWorkExperience();
        // If parent expects an argument and returns undefined, fallback below
        if (result === undefined) return;
      } catch (err) {
        // Parent may expect an updated array argument — compute and pass it
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
            <WorkPreview
              workList={page1Work}
              toggleWorkCheckbox={handleWorkCheckboxToggle} // wrapper used
              handleDeleteSelectedWork={handleDeleteSelectedWork} // wrapper used
              isEditing={isEditing}
            />
           
            {/* Keep Skills on Page 1 for now */}
       {/* ✅ Show Skills only if Work fits on Page 1 */}
{includePage2Work ? null : (
  <SkillsPreview
    skillsList={skills}
    toggleSkillCheckbox={toggleSkillCheckbox}
    handleDeleteSelectedSkills={deleteSkill}
    isEditing={isEditing}
  />
)}

            


          </div>
        </div>
      </div>

      {/* ================= PAGE 2 ================= */}
      {(page2Education.length > 0 || page2Work.length > 0) && (
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

          {/* RIGHT SIDE: WORK PAGE 2 + (Skills in next phase) */}
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
{includePage2Work && (
  <SkillsPreview
    skillsList={skills}
    toggleSkillCheckbox={toggleSkillCheckbox}
    handleDeleteSelectedSkills={deleteSkill}
    isEditing={isEditing}
  />
)}

            </div>
          </div>
        </div>
      )}
    </>
  );
}
