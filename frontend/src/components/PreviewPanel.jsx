// PreviewPanel.jsx — dynamic template support
import React, { useEffect, useRef, useState } from "react";
import "./PreviewPanel.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from "react-icons/fa";
import { paginateEntries } from "../utils/paginateEntries";
import { paginateWorkEntries } from "../utils/paginateWorkEntries";
import { paginateSkillsEntries } from "../utils/paginateSkillsEntries";
import WorkPreview from "./WorkPreview";
import SkillsPreview from "./SkillsPreview";
import usePaymentGuard from "../hooks/usePaymentGuard";
import PaymentGate from "../components/payment/PaymentGate";
import { useAuth } from "../context/AuthContext";


export default function PreviewPanel({
  formData,
  setFormData,
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
  theme,
  resumeStyle = "professional" // NEW: template ID from builder
}) {
  // ================= REFS =================
  const leftRef = useRef(null);
  const topSectionRef = useRef(null);
  const rightPanelRef = useRef(null);
  const jobTitleRef = useRef(null);
  const fileInputRef = useRef(null);
  const workPanelRef = useRef(null);
  const skillsPanelRef = useRef(null);

  // ================= STATES =================
  const [page1Education, setPage1Education] = useState([]);
  const [page2Education, setPage2Education] = useState([]);
  const [pageBreakY, setPageBreakY] = useState(null);

  const [page1Work, setPage1Work] = useState([]);
  const [page2Work, setPage2Work] = useState([]);
  const [includePage2Work, setIncludePage2Work] = useState(false);

  const [page1Skills, setPage1Skills] = useState([]);
  const [page2Skills, setPage2Skills] = useState([]);


  const { user, setUser } = useAuth();

  const {
  isPaid,
  showPaymentModal,
  setShowPaymentModal,
  requirePayment,
  handlePaymentSuccess,
} = usePaymentGuard("CleanProfessional");

  const canEdit = isPaid;

  const triggerProfileSelect = () => {
    if (!canEdit) {
      requirePayment();
      return;
    }
    fileInputRef.current?.click();
  };


  const handleProfileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData(prev => ({
        ...prev,
        profilePic: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  // ================= EFFECTS =================
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

  // ================= HELPER FUNCTIONS =================
  const localToggleCheckbox = (globalIndex) => {
    if (typeof handleCheckboxChange === "function") {
      handleCheckboxChange(globalIndex);
    }
  };

  const getGlobalEduIndex = (page1Length, localIdx) => page1Length + localIdx;

  const handleWorkCheckboxToggle = (id) => {
    if (typeof toggleWorkCheckbox === "function") {
      toggleWorkCheckbox(id);
    }
  };

  // ================= DYNAMIC TEMPLATE CLASS =================
  const templateClass = `preview-template template-${resumeStyle}`;

  // ================= RENDER =================
  return (
    <div className={templateClass}>
      {/* ================= PAGE 1 ================= */}
      <div className="preview-section" style={{ position: "relative" }}>
        {/* LEFT PANEL */}
        <div className="preview-left" style={{ backgroundColor: theme.left }} ref={leftRef}>
          <div ref={topSectionRef}>
            {/* Profile Info */}

            <div 
            className="profile-pic-wrapper" 
            onClick={triggerProfileSelect}>
              <img
                src={formData?.profilePic || "/images/engineereliteprofileimage.png"}
                alt="Profile"
                style={{ cursor: "pointer" }}
              />

              {!canEdit && (
                <div className="lock-overlay" style={{ pointerEvents: "none" }}>
                  🔒
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleProfileUpload}
            />
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
            <div
              key={idx}
              className="education-entry border p-2 my-2 rounded"
              style={{ backgroundColor: theme.left, color: theme.text }}
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

        {/* RIGHT PANEL */}
        <div className="flex-1 p-4" ref={rightPanelRef}>
          <div className="max-w-2xl mx-auto">
            <div ref={jobTitleRef} className="job-title-box text-center mb-6">
              <h1 className="text-2xl font-bold job-title-banner" style={{ backgroundColor: theme.job, color: theme.text }}>
                {jobTitle || formData.jobTitle || "Job Title"}
              </h1>
            </div>

            <div ref={workPanelRef} className="preview-box work-box">
              <WorkPreview
                workList={page1Work}
                toggleWorkCheckbox={handleWorkCheckboxToggle}
                handleDeleteSelectedWork={deleteWorkExperience}
                isEditing={isEditing}
              />
            </div>

            {!includePage2Work && (
                          <div
                            ref={skillsPanelRef}
                            className="preview-box skills-box"
                            style={{ display: page1Skills.length === 0 && page2Skills.length > 0 ? "none" : "block" }}
                          >
                            <SkillsPreview
                              skillsList={page1Skills.length > 0 ? page1Skills : skills}
                              toggleSkillCheckbox={toggleSkillCheckbox}
                              handleDeleteSelectedSkills={deleteSkill}
                              isEditing={isEditing}
                            />
                          </div>
                        )}
            <PaymentGate
  open={showPaymentModal}
  onClose={() => setShowPaymentModal(false)}
  onSuccess={handlePaymentSuccess}
/>

          </div>
        </div>
      </div>

      {/* ================= PAGE 2 ================= */}
      {(page2Education.length > 0 || page2Work.length > 0 || page2Skills.length > 0) && (
        <div className="preview-section mt-8">
          <div className="preview-left" style={{ backgroundColor: theme.left, color: theme.text }}>
            <h3 className="section-heading">Education (Page 2)</h3>
            {page2Education.map(({ edu, idx }, localIdx) => {
              const globalIdx = page1Education.length + localIdx;
              return (
                <div key={globalIdx} className="education-entry border p-2 my-2 rounded"
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

          <div className="flex-1 p-4">
            <div className="max-w-2xl mx-auto">
              {page2Work.length > 0 && (
                <>
                  <h3 className="section-heading mt-6">Work Experience (Page 2)</h3>
                  <WorkPreview
                    workList={page2Work}
                    toggleWorkCheckbox={handleWorkCheckboxToggle}
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


    </div>
  );
}