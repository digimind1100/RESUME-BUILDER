// FormPanel.jsx
import React, { useState } from "react";
import "./FormPanel.css";

export default function FormPanel({
  formData = {},                  // safe default
  setFormData = () => {},         // safe default
  selectedEducations = [],        // safe default
  setSelectedEducations = () => {}, // safe default
}) {
  const [education, setEducation] = useState({ school: "", degree: "", year: "" });

  // Personal info inputs -> update formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    // education local fields handled separately
    if (name === "school" || name === "degree" || name === "year") {
      setEducation((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev = {}) => ({ ...prev, [name]: value }));
    }
  };

  // File upload
  const handleFileChange = (e) => {
    const file = e.target?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev = {}) => ({ ...prev, profilePic: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Add new education (safe)
  const handleAddEducation = () => {
    if (!education.school || !education.degree || !education.year) return;
    setFormData((prev = {}) => ({
      ...prev,
      education: [...(prev.education || []), education],
    }));
    setEducation({ school: "", degree: "", year: "" });
  };

  // Checkbox toggle for selection (functional updates)
  const handleCheckboxChange = (index) => {
    setSelectedEducations((prev = []) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Delete selected educations (safe)
  const handleDeleteSelected = () => {
    setFormData((prev = {}) => ({
      ...prev,
      education: (prev.education || []).filter((_, idx) => !selectedEducations.includes(idx)),
    }));
    setSelectedEducations([]); // reset selection
  };

  return (
    <div className="form-panel">
      <h2>Personal Information</h2>

      <label>Upload Profile Picture</label>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      <label>Job Title</label>
      <input
        type="text"
        name="jobTitle"
        placeholder="e.g. Frontend Developer"
        value={formData?.jobTitle || ""}
        onChange={handleChange}
      />

      <label>Full Name</label>
      <input
        type="text"
        name="fullName"
        placeholder="e.g. John Doe"
        value={formData?.fullName || ""}
        onChange={handleChange}
      />

      <label>Email</label>
      <input
        type="email"
        name="email"
        placeholder="e.g. john@example.com"
        value={formData?.email || ""}
        onChange={handleChange}
      />

      <label>Phone</label>
      <input
        type="text"
        name="phone"
        placeholder="e.g. +1234567890"
        value={formData?.phone || ""}
        onChange={handleChange}
      />

      <label>Address</label>
      <input
        type="text"
        name="address"
        placeholder="Street Address"
        value={formData?.address || ""}
        onChange={handleChange}
      />

      <label>City / State</label>
      <input
        type="text"
        name="city"
        placeholder="e.g. New York, NY"
        value={formData?.city || ""}
        onChange={handleChange}
      />

      <label>Country</label>
      <input
        type="text"
        name="country"
        placeholder="Enter Country"
        value={formData?.country || ""}
        onChange={handleChange}
      />

      <label>Date of Birth</label>
      <input
        type="date"
        name="dob"
        value={formData?.dob || ""}
        onChange={handleChange}
      />

      <label>LinkedIn / Portfolio</label>
      <input
        type="url"
        name="linkedin"
        placeholder="https://linkedin.com/in/johndoe"
        value={formData?.linkedin || ""}
        onChange={handleChange}
      />

      <h2>Education</h2>
      <input
        type="text"
        name="school"
        value={education.school}
        onChange={handleChange}
        placeholder="School"
      />
      <input
        type="text"
        name="degree"
        value={education.degree}
        onChange={handleChange}
        placeholder="Degree"
      />
      <input
        type="text"
        name="year"
        value={education.year}
        onChange={handleChange}
        placeholder="Year"
      />

      <div className="edu-buttons">
        <button type="button" onClick={handleAddEducation}>
          Add Education
        </button>

        <button
          type="button"
          onClick={handleDeleteSelected}
          disabled={(selectedEducations || []).length === 0}
        >
          Delete Selected
        </button>
      </div>

      {/* NOTE: we intentionally do NOT render the full education list here to avoid duplication.
          The preview panel handles displaying entries with checkboxes.
          If you want to render a small list inside the form as well, map safely:
            (formData.education || []).map(...)
      */}
    </div>
  );
}
