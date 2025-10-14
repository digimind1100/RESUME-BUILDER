// FormPanel.jsx
import React, { useState } from "react";
import "./FormPanel.css";
import "./ButtonSection.css"

export default function FormPanel({
formData = {},
  setFormData = () => {},
  selectedEducations = [],
  setSelectedEducations = () => {},
  jobTitle = "",
  setJobTitle = () => {},
  openWorkPopup = () => {},     // Work Exp popup trigger
  onAddSkillsClick = () => {},  // Skills popup trigger

}) {

  // add to top-level state in ResumeBuilder
  const [isWorkExpPopupOpen, setIsWorkExpPopupOpen] = useState(false);

  const [education, setEducation] = useState({ school: "", degree: "", year: "" });

  // Personal info inputs -> update formData
  const handleChange = (e) => {
    const { name, value } = e.target;
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

  // Checkbox toggle for selection
  const handleCheckboxChange = (index) => {
    setSelectedEducations((prev = []) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Delete selected educations
  const handleDeleteSelected = () => {
    setFormData((prev = {}) => ({
      ...prev,
      education: (prev.education || []).filter((_, idx) => !selectedEducations.includes(idx)),
    }));
    setSelectedEducations([]);
  };



const handleOpenWorkPopup = () => {
  if (!jobTitle.trim()) {
    alert("Mention Job Title to get AI suggestions.");
    return;
  }

  // Parent ka handler call karo (ResumeBuilder se aaya hai)
  openWorkPopup();
};

// 🔹 Add Skills button handler
  const handleAddSkillsClick = () => {
    if (!jobTitle.trim()) {
      alert("Mention Job Title to get AI suggestions.");
      return;
    }
    onAddSkillsClick(); // ✅ parent ka state trigger karega
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
        value={jobTitle}
        onChange={(e) => {
          const v = e.target.value;
          setJobTitle(v);
          setFormData(prev => ({ ...(prev || {}), jobTitle: v }));
        }}
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

      <label>City / State / Zip Code</label>
      <input
        type="text"
        name="city"
        placeholder="e.g. New York, NY 10004"
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

      <button className="add-edu-btn" type="button" onClick={handleAddEducation}>
        ➕ Add Education
      </button>

      <button
        className="delete-btn"
        type="button"
        onClick={handleDeleteSelected}
        disabled={(selectedEducations || []).length === 0}
      >
        🗑️ Delete Selected
      </button>

      {/* --- NEW BUTTONS --- */}
      <button
  className="add-exp-btn"
  type="button"
  onClick={handleOpenWorkPopup}
>
  + Add Work Experience
</button>


<button
  type="button"
  className=" add-skill-btn btn btn-primary mt-2"
  onClick={handleAddSkillsClick}
>
  Add Skills
</button>


    </div>
  );
}
