import React, { useState } from "react";
import "./PreviewPanel.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from "react-icons/fa";

export default function PreviewPanel({
  formData,
  selectedEducations,
  setSelectedEducations,
}) {

  const toggleSelect = (index) => {
    let updated;
    if (selectedEducations.includes(index)) {
      updated = selectedEducations.filter((i) => i !== index);
    } else {
      updated = [...selectedEducations, index];
    }
    setSelectedEducations(updated); // ✅ parent state update
  };
  // local selected indexes (keeps UI snappy)
  const [selected, setSelected] = useState([]);



  return (
    <div className="preview-panel">
      {/* Left Column - Personal Info + Education */}
      <div className="preview-left">
        {/* Profile picture */}
        <div className="profile-pic-wrapper">
          <img
            id="profilePicPreview"
            src={formData?.profilePic || "https://via.placeholder.com/120"}
            alt="Profile"
          />
        </div>

        {/* Name */}
        <h2 className="preview-name">{formData?.fullName || "Your Name"}</h2>

        {/* Contact Details */}
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
            <p>{formData?.city || "City / State"}</p>
          </div>
          <div className="icon-block">
            <p>{formData?.country || "Country"}</p>
          </div>
          <div className="icon-block">
            <FaLinkedin className="icon" />
            <p>{formData?.linkedin || "linkedin.com/in/username"}</p>
          </div>
        </div>

        {/* Date of Birth */}
        <h3 className="section-heading">Date of Birth</h3>
        <p>{formData?.dob || "DD/MM/YYYY"}</p>

        {/* Education */}
        <div className="p-4">
          <h2 className="section-heading">Education</h2>

          {formData.education.length > 0 ? (
            formData.education.map((edu, index) => (
              <div key={index} className="education-entry bg-red-500">
                <input
                  type="checkbox"
                  checked={selectedEducations.includes(index)} // ✅ synced
                  onChange={() => toggleSelect(index)}
                />
                <div className="education-details">
                  <p>{edu.degree}</p>
                  <p>{edu.school}</p>
                  <p>{edu.year}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No education added yet</p>
          )}

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
