import React, { useState } from "react";
import "./FormPanel.css";
import "./ButtonSection.css";

export default function FormPanel({
  formData = {},
  setFormData = () => {},
  selectedEducations = [],
  setSelectedEducations = () => {},
  jobTitle = "",
  setJobTitle = () => {},
  openWorkPopup = () => {},
  onAddSkillsClick = () => {},
  canEdit = false,
  requirePayment = () => {},
}) {
  const [education, setEducation] = useState({
    school: "",
    degree: "",
    year: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "school" || name === "degree" || name === "year") {
      setEducation((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev = {}) => ({ ...prev, [name]: value }));
    }
  };

  const handleWorkClickWithGuard = () => {
    if (!canEdit) {
      requirePayment();
      return;
    }
    openWorkPopup();
  };

  const handleSkillsClickWithGuard = () => {
    if (!canEdit) {
      requirePayment();
      return;
    }
    onAddSkillsClick();
  };

  const handleAddEducation = () => {
    if (!education.school || !education.degree || !education.year) return;

    setFormData((prev = {}) => ({
      ...prev,
      education: [...(prev.education || []), education],
    }));

    setEducation({ school: "", degree: "", year: "" });
  };

  const handleDeleteSelected = () => {
    setFormData((prev = {}) => ({
      ...prev,
      education: (prev.education || []).filter(
        (_, idx) => !selectedEducations.includes(idx)
      ),
    }));
    setSelectedEducations([]);
  };

  return (
    <div className="form-panel" autoComplete="off">
      <h2>Personal Information</h2>

      <label>Job Title</label>
      <input
        type="text"
        name="jobTitle"
        value={jobTitle}
        onChange={(e) => {
          const v = e.target.value;
          setJobTitle(v);
          setFormData((prev = {}) => ({ ...prev, jobTitle: v }));
        }}
      />

      {/* ---- other inputs unchanged ---- */}

      <h2>Education</h2>

      <input name="school" value={education.school} onChange={handleChange} />
      <input name="degree" value={education.degree} onChange={handleChange} />
      <input name="year" value={education.year} onChange={handleChange} />

      <button type="button" onClick={handleAddEducation}>
        ➕ Add Education
      </button>

      <button
        className="add-exp-btn premium-btn"
        type="button"
        onClick={handleWorkClickWithGuard}
      >
        + Add Work Experience {!canEdit && <span className="lock-icon">🔒</span>}
      </button>

      <button
        type="button"
        className="add-skill-btn premium-btn"
        onClick={handleSkillsClickWithGuard}
      >
        Add Skills {!canEdit && <span className="lock-icon">🔒</span>}
      </button>
    </div>
  );
}
