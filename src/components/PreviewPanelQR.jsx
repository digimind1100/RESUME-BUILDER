// PreviewPanelQR.jsx — QR version of preview panel
import React, { useEffect, useRef, useState } from "react";
import "./PreviewPanel.css";
import { paginateEntries } from "../utils/paginateEntries";
import { paginateWorkEntries } from "../utils/paginateWorkEntries";
import { paginateSkillsEntries } from "../utils/paginateSkillsEntries";
import WorkPreview from "./WorkPreview";
import SkillsPreview from "./SkillsPreview";


// QR Code fixed import for Vite
import { QRCodeCanvas } from "qrcode.react";


export default function PreviewPanelQR({
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
  theme,
  qrData = null, // QR string or JSON
}) {
  const leftRef = useRef(null);
  const topSectionRef = useRef(null);
  const rightPanelRef = useRef(null);
  const jobTitleRef = useRef(null);
  const workPanelRef = useRef(null);
  const skillsPanelRef = useRef(null);

  const [page1Education, setPage1Education] = useState([]);
  const [page2Education, setPage2Education] = useState([]);
  const [pageBreakY, setPageBreakY] = useState(null);

  const [page1Work, setPage1Work] = useState([]);
  const [page2Work, setPage2Work] = useState([]);
  const [includePage2Work, setIncludePage2Work] = useState(false);

  const [page1Skills, setPage1Skills] = useState([]);
  const [page2Skills, setPage2Skills] = useState([]);

  // ========= EDUCATION PAGINATION =========
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

  // ========= WORK PAGINATION =========
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

  // ========= SKILLS PAGINATION =========
  useEffect(() => {
    setPage1Skills(skills);
    setPage2Skills([]);
  }, [skills]);

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

  const localToggleCheckbox = (globalIndex) => {
    if (typeof handleCheckboxChange === "function") {
      handleCheckboxChange(globalIndex);
    }
  };

  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <div className="preview-section" style={{ position: "relative" }}>
        <div
          className="preview-left"
          style={{ backgroundColor: theme.left }}
          ref={leftRef}
        >
          <div ref={topSectionRef}>
            {/* ===== PROFILE PICTURE ONLY (No personal info) ===== */}
            <div className="profile-pic-wrapper">
              <img
                id="profilePicPreview"
                src={formData?.profilePic || "https://via.placeholder.com/120"}
                alt="Profile"
              />
            </div>

         <div className="qr-box">
  {qrData ? (
    <QRCodeCanvas
      value={typeof qrData === "string" ? qrData : JSON.stringify(qrData)}
      size={190}
      bgColor="#ffffff"
      fgColor="#000000"
    />
  ) : (
    <div className="qr-placeholder">QR Code Will Appear Here</div>
  )}
</div>



      

            {/* ===== Education heading for Page 1 ===== */}
            <h3 className="section-heading">Education (Page 1)</h3>
          </div>

          {/* ===== Education Entries Page 1 ===== */}
          {page1Education.map(({ edu, idx }) => (
            <div
              key={idx}
              className="education-entry border p-2 my-2 rounded"
              style={{
                backgroundColor: theme.left,
                color: theme.text,
              }}
            >
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

        {/* ===== RIGHT SIDE: WORK + SKILLS (Page 1) ===== */}
        <div className="flex-1 p-4" ref={rightPanelRef}>
          <div className="max-w-2xl mx-auto">
            <div ref={jobTitleRef} className="job-title-box text-center mb-6">
              <h1
                className="text-2xl font-bold job-title-banner"
                style={{
                  backgroundColor: theme.job,
                  color: theme.text,
                }}
              >
                {jobTitle || formData.jobTitle || "Job Title"}
              </h1>
            </div>

            <div ref={workPanelRef} className="preview-box work-box">
              <WorkPreview
                workList={page1Work}
                toggleWorkCheckbox={toggleWorkCheckbox}
                handleDeleteSelectedWork={deleteWorkExperience}
                isEditing={isEditing}
              />
            </div>

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
      {(page2Education.length > 0 ||
        page2Work.length > 0 ||
        page2Skills.length > 0) && (
          <div className="preview-section mt-8">
            {/* Left side page 2 — only Education */}
            <div className="preview-left" style={{ backgroundColor: theme.left }}>
              <h3 className="section-heading">Education (Page 2)</h3>

              {page2Education.map(({ edu, idx }, localIdx) => {
                const globalIdx = page1Education.length + localIdx;

                return (
                  <div
                    key={globalIdx}
                    className="education-entry border p-2 my-2 rounded"
                    style={{ backgroundColor: theme.left }}
                  >
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

            {/* Right side page 2 — Work + Skills */}
            <div className="flex-1 p-4">
              <div className="max-w-2xl mx-auto">
                {page2Work.length > 0 && (
                  <>
                    <h3 className="section-heading mt-6">Work Experience (Page 2)</h3>
                    <WorkPreview
                      workList={page2Work}
                      toggleWorkCheckbox={toggleWorkCheckbox}
                      handleDeleteSelectedWork={deleteWorkExperience}
                      isEditing={isEditing}
                    />
                  </>
                )}

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
