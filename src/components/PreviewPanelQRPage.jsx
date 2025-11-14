import React from "react";
import "./PreviewPanel.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from "react-icons/fa";
import WorkPreview from "./WorkPreview";
import SkillsPreview from "./SkillsPreview";

export default function PreviewPanelQRPage({
  formData,
  jobTitle,
  workExperiences = [],
  skills = [],
  theme,
  qrCodeDataUrl, // ✅ receive generated QR code from FormPanelQR.jsx
}) {
  return (
    <>
      {/* ================= PAGE 1 ================= */}
      <div className="preview-section" style={{ position: "relative" }}>
        {/* LEFT SIDE: PROFILE + QR + EDUCATION */}
        <div
          className="preview-left"
          style={{
            backgroundColor: theme.left,
            color: theme.text,
          }}
        >
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

          {/* ================= QR CODE AREA ================= */}
          {qrCodeDataUrl && (
            <div
              style={{
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              <h3
                className="section-heading"
                style={{ fontSize: "16px", marginBottom: "8px" }}
              >
                Your Resume QR Code
              </h3>
              <img
                src={qrCodeDataUrl}
                alt="QR Code"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "8px",
                  margin: "0 auto",
                  border: "1px solid #ccc",
                  background: "#fff",
                  padding: "4px",
                }}
              />
              <p style={{ fontSize: "12px", opacity: 0.7 }}>
                Scan to view digital resume
              </p>
            </div>
          )}

          {/* ================= EDUCATION ================= */}
          <h3 className="section-heading mt-4">Education</h3>
          {formData?.education?.length ? (
            formData.education.map((edu, idx) => (
              <div
                key={idx}
                className="education-entry border p-2 my-2 rounded"
                style={{
                  backgroundColor: theme.left,
                  color: theme.text,
                }}
              >
                <div className="education-details">
                  <p className="edu-school">{edu.school}</p>
                  <p className="edu-degree">{edu.degree}</p>
                  <p className="edu-year">{edu.year}</p>
                </div>
              </div>
            ))
          ) : (
            <p style={{ opacity: 0.7, fontSize: "14px" }}>No education added yet.</p>
          )}
        </div>

        {/* RIGHT SIDE: INDICATOR FOR PAGE 2 */}
        <div
          className="flex-1 p-4 flex items-center justify-center"
          style={{
            backgroundColor: "#fafafa",
            textAlign: "center",
          }}
        >
          <p style={{ fontStyle: "italic", opacity: 0.6 }}>
            → Continue to Page 2 for Work Experience & Skills
          </p>
        </div>
      </div>

      {/* ================= PAGE 2 ================= */}
      <div className="preview-section mt-8">
        {/* LEFT SIDE (optional logo or repeat profile info) */}
        <div
          className="preview-left"
          style={{
            backgroundColor: theme.left,
            color: theme.text,
          }}
        >
          <h3 className="section-heading">Profile</h3>
          <p style={{ fontWeight: "bold" }}>{formData?.fullName || "Your Name"}</p>
          <p style={{ fontSize: "13px" }}>{jobTitle || formData.jobTitle || "Job Title"}</p>
        </div>

        {/* RIGHT SIDE: WORK EXPERIENCE + SKILLS */}
        <div className="flex-1 p-4">
          <div className="max-w-2xl mx-auto">
            {/* WORK EXPERIENCE */}
            <h3 className="section-heading mt-6">Work Experience</h3>
            {workExperiences?.length ? (
              <WorkPreview
                workList={workExperiences}
                toggleWorkCheckbox={() => {}}
                handleDeleteSelectedWork={() => {}}
                isEditing={false}
              />
            ) : (
              <p style={{ opacity: 0.7, fontSize: "14px" }}>No work experience added.</p>
            )}

            {/* SKILLS */}
            <h3 className="section-heading mt-6">Skills</h3>
            {skills?.length ? (
              <SkillsPreview
                skillsList={skills}
                toggleSkillCheckbox={() => {}}
                handleDeleteSelectedSkills={() => {}}
                isEditing={false}
              />
            ) : (
              <p style={{ opacity: 0.7, fontSize: "14px" }}>No skills added yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
