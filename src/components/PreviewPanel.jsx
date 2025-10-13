import React, { useEffect, useRef, useState } from "react";
import "./PreviewPanel.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from "react-icons/fa";
import { paginateEntries } from "../utils/paginateEntries";

const MAX_HEIGHT = 986;

export default function PreviewPanel({
  formData,
  selectedEducations,
  handleCheckboxChange,
  jobTitle,
  workExperiences,
  deleteWorkExperience,
}) {
  const leftRef = useRef(null);
  const topSectionRef = useRef(null);

  const [page1Education, setPage1Education] = useState([]);
  const [page2Education, setPage2Education] = useState([]);
  const [pageBreakY, setPageBreakY] = useState(null);

  const localToggleCheckbox = (globalIndex) => {
    if (typeof handleCheckboxChange === "function") {
      handleCheckboxChange(globalIndex);
    }
  };

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

          {/* Continue marker */}
          {page2Education.length > 0 &&
            page1Education.length > 0 &&
            pageBreakY != null &&
            MAX_HEIGHT - pageBreakY < 20 && (
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
<div className="preview-box work-box mb-6">
  <h2 className="text-lg font-bold mb-3 border-b pb-2">Work Experience</h2>

  {workExperiences && workExperiences.length > 0 ? (
    workExperiences.map((exp, index) => (
      <div key={exp.id || index} className="work-exp-item">
        <div className="checkbox-bullet-wrapper">
          <input type="checkbox" className="exp-checkbox" />
          <span className="bullet">•</span>
        </div>
        <div className="exp-text">
          {typeof exp === "object" ? exp.title || exp.text || "Job Role" : exp}
        </div>
      </div>
    ))
  ) : (
    <p className="text-sm text-gray-500 italic">
      No work experience added yet.
    </p>
  )}
</div>





            {/* ---- Skills Box ---- */}
            <div className="preview-box skills-box">
              <h2 className="text-lg font-bold mb-3 border-b pb-2">Skills</h2>
              {formData.skills && formData.skills.length > 0 ? (
                <ul className="list-disc pl-5">
                  {formData.skills.map((skill, index) => (
                    <li key={index} className="text-sm">
                      {skill}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic">No skills added yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PAGE 2 */}
      {page2Education.length > 0 && (
        <div className="preview-section mt-8" style={{ position: "relative" }}>
          <div className="preview-left" style={{ position: "relative" }}>
            <h3 className="section-heading">Education (Page 2)</h3>
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

          <div className="preview-right">
            <h3 className="section-heading">Work Experience (Page 2)</h3>
            <p>Continued if needed...</p>
          </div>
        </div>
      )}
    </>
  );
}
