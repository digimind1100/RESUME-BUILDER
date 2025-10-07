import React, { useRef, useEffect } from "react";
import "./PreviewPanel.css";
import ButtonSection from "./ButtonSection";
import "./ButtonSection.css";
import "./ButtonSection.css";


import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from "react-icons/fa";

export default function PreviewPanel({
  formData,
  selectedEducations = [],   // ✅ default empty array
  setSelectedEducations = () => {},
  offset = 0,
}) {
  const educationRef = useRef(null);

  const handleCheckboxChange = (globalIndex) => {
    setSelectedEducations(prev =>
      prev.includes(globalIndex) ? prev.filter(i => i !== globalIndex) : [...prev, globalIndex]
    );
  };

  useEffect(() => {
    if (educationRef.current) {
      console.log("Education wrapper height (page1):", educationRef.current.offsetHeight);
    }
  }, [formData?.education]);

  return (
    <div
  className="preview-section" id="resumePreview"
  style={{ width: "738px", height: "1040px", margin: "0 auto" }}
> 

      {/* Left Column */}
      <div className="preview-left">
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
          <div className="icon-block"><p>{formData?.city || "City / State"}</p></div>
          <div className="icon-block"><p>{formData?.country || "Country"}</p></div>
          <div className="icon-block">
            <FaLinkedin className="icon" />
            <p>{formData?.linkedin || "linkedin.com/in/username"}</p>
          </div>
        </div>

        <h3 className="section-heading">Date of Birth</h3>
        <p>{formData?.dob || "DD/MM/YYYY"}</p>

        {/* Education (page 1) */}
        <div className="p-4">
          <h2 className="section-heading">Education</h2>
          <div ref={educationRef} className="education-wrapper">
            {formData?.education && formData.education.length > 0 ? (
              formData.education.map((edu, idx) => {
                const globalIndex = offset + idx;
                return (
                  <div key={globalIndex} className="education-entry">
                    <input
                      type="checkbox"
                      checked={selectedEducations.includes(globalIndex)}
                      onChange={() => handleCheckboxChange(globalIndex)}
                    />
                    <div className="education-details">
                      <p className="edu-chool">{edu.school}</p>
                      <p className="edu-degree">{edu.degree}</p>
                      <p className="edu-year">{edu.year}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No education added yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="preview-right">
        <h3 className="section-heading">Work Experience</h3>
        <p>Coming soon...</p>
      </div>
    </div>

  );
}
<ButtonSection />
