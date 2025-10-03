import React, { useState } from "react";
import "./FormPanel.css";

export default function FormPanel({
  formData,
  setFormData,
  selectedEducations,
  setSelectedEducations,
}) {
  const [education, setEducation] = useState({ school: "", degree: "", year: "" });

  // ✅ handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ handleFileChange function
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Add education
  const handleAddEducation = () => {
    if (!education.school || !education.degree || !education.year) return;
    setFormData({
      ...formData,
      education: [...(formData.education || []), education],
    });
    setEducation({ school: "", degree: "", year: "" });
  };

  // Delete selected education(s)
  const handleDeleteSelected = () => {
  setFormData({
    ...formData,
    education: formData.education.filter(
      (_, index) => !selectedEducations.includes(index)
    ),
  });
  setSelectedEducations([]); // reset
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
        value={formData.fullName}
        onChange={handleChange}
      />

      <label>Email</label>
      <input
        type="email"
        name="email"
        placeholder="e.g. john@example.com"
        value={formData.email}
        onChange={handleChange}
      />

      <label>Phone</label>
      <input
        type="text"
        name="phone"
        placeholder="e.g. +1234567890"
        value={formData.phone}
        onChange={handleChange}
      />

      <label>Address</label>
      <input
        type="text"
        name="address"
        placeholder="Street Address"
        value={formData.address}
        onChange={handleChange}
      />

      <label>City / State</label>
      <input
        type="text"
        name="city"
        placeholder="e.g. New York, NY"
        value={formData.city}
        onChange={handleChange}
      />

      <label htmlFor="country">Country</label>
      <input
        type="text"
        id="country"
        name="country"
        placeholder="Enter Country"
        value={formData.country}
        onChange={handleChange}
      />

      <label>Date of Birth</label>
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
      />

      <label>LinkedIn / Portfolio URL</label>
      <input
        type="url"
        name="linkedin"
        placeholder="https://linkedin.com/in/johndoe"
        value={formData.linkedin}
        onChange={handleChange}
      />

      {/* EDUCATION */}
      <h2 className="text-lg font-bold mb-2">Education</h2>
      <input
        type="text"
        placeholder="School"
        value={education.school}
        onChange={(e) => setEducation({ ...education, school: e.target.value })}
      />
      <input
        type="text"
        placeholder="Degree"
        value={education.degree}
        onChange={(e) => setEducation({ ...education, degree: e.target.value })}
      />
      <input
        type="text"
        placeholder="Year"
        value={education.year}
        onChange={(e) => setEducation({ ...education, year: e.target.value })}
      />

      <button type="button" onClick={handleAddEducation}>Add Education</button>
      <button type="button" onClick={handleDeleteSelected}>Delete Selected</button>
    

      {/* ✅ Education list with checkboxes */ }

    </div >
  );
}
