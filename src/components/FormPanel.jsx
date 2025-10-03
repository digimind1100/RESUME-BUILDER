import React, { useState } from "react";
import "./FormPanel.css";

export default function FormPanel({ formData, setFormData, selectedEducations, setSelectedEducations }) {
  const [education, setEducation] = useState({ school: "", degree: "", year: "" });

  // Handle input changes for personal info and education
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Education fields handled separately
    if (name === "school" || name === "degree" || name === "year") {
      setEducation({ ...education, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Add new education
  const handleAddEducation = () => {
    if (!education.school || !education.degree || !education.year) return;
    setFormData({
      ...formData,
      education: [...(formData.education || []), education],
    });
    setEducation({ school: "", degree: "", year: "" });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setFormData({ ...formData, profilePic: reader.result });
      reader.readAsDataURL(file);
    }
  };

  // Handle checkbox selection
  const handleCheckboxChange = (index) => {
    if (selectedEducations.includes(index)) {
      setSelectedEducations(selectedEducations.filter(i => i !== index));
    } else {
      setSelectedEducations([...selectedEducations, index]);
    }
  };

  // Delete selected education
  const handleDeleteSelected = () => {
    setFormData({
      ...formData,
      education: formData.education.filter((_, index) => !selectedEducations.includes(index)),
    });
    setSelectedEducations([]); // reset selection
  };

  return (
    <div className="form-panel">
      <h2>Personal Information</h2>

      <label>Upload Profile Picture</label>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      <label>Job Title</label>
      <input type="text" name="jobTitle" value={formData.jobTitle || ""} onChange={handleChange} placeholder="Frontend Developer" />

      <label>Full Name</label>
      <input type="text" name="fullName" value={formData.fullName || ""} onChange={handleChange} placeholder="John Doe" />

      <label>Email</label>
      <input type="email" name="email" value={formData.email || ""} onChange={handleChange} placeholder="john@example.com" />

      <label>Phone</label>
      <input type="text" name="phone" value={formData.phone || ""} onChange={handleChange} placeholder="+1234567890" />

      <label>Address</label>
      <input type="text" name="address" value={formData.address || ""} onChange={handleChange} placeholder="Street Address" />

      <label>City / State</label>
      <input type="text" name="city" value={formData.city || ""} onChange={handleChange} placeholder="City / State" />

      <label>Country</label>
      <input type="text" name="country" value={formData.country || ""} onChange={handleChange} placeholder="Country" />

      <label>Date of Birth</label>
      <input type="date" name="dob" value={formData.dob || ""} onChange={handleChange} />

      <label>LinkedIn / Portfolio</label>
      <input type="url" name="linkedin" value={formData.linkedin || ""} onChange={handleChange} placeholder="https://linkedin.com/in/johndoe" />

      <h2>Education</h2>
      <input type="text" name="school" value={education.school} onChange={handleChange} placeholder="School" />
      <input type="text" name="degree" value={education.degree} onChange={handleChange} placeholder="Degree" />
      <input type="text" name="year" value={education.year} onChange={handleChange} placeholder="Year" />

      <button onClick={handleAddEducation}>Add Education</button>
      <button onClick={handleDeleteSelected} disabled={selectedEducations.length === 0}>Delete Selected</button>

      {/* Education list with checkboxes */}

    </div>
  );
}
