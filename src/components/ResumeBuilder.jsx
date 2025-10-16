import React, { useState } from "react";
import FormPanel from "./FormPanel";
import PreviewPanel from "./PreviewPanel";
import ButtonSection from "./ButtonSection";
import WorkExpPopup from "./WorkExpPopup";
import SkillsPopup from "./SkillsPopup";

import "./ButtonSection.css";

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({});
  const [selectedEducations, setSelectedEducations] = useState([]);
  const [jobTitle, setJobTitle] = useState("");

  // Work Experience state + popup toggle
  const [workExperiences, setWorkExperiences] = useState([]);
  const [showWorkPopup, setShowWorkPopup] = useState(false);
  // Skills state + popup toggle
  const [showSkillsPopup, setShowSkillsPopup] = useState(false);
  const [skills, setSkills] = useState([]);

  const [isEditing, setIsEditing] = useState(false);

  const handleToggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  // Education checkbox handler
  const handleCheckboxChange = (index) => {
    setSelectedEducations((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Add education helper
  const addEducation = (newEntry) => {
    if (!newEntry || typeof newEntry !== "object") return;
    setFormData((prev) => ({
      ...prev,
      education: [...(prev.education || []), newEntry],
    }));
  };

  // Work Exp add
  const handleAddWorkExp = (newExp) => {
    setWorkExperiences((prev) => [...prev, { ...newExp, selected: false }]);
  };

  const openWorkPopup = () => {
    setShowWorkPopup(true);
  };

  // Skills add
  const handleAddSkill = (newSkill) => {
    setSkills((prev) => [...prev, { ...newSkill, selected: false }]);
  };

  // Checkbox toggle for work exp
  const toggleWorkCheckbox = (index) => {
    setWorkExperiences((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Checkbox toggle for skills
  const toggleSkillCheckbox = (index) => {
    setSkills((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Delete Selected items
  const handleDeleteSelected = () => {
    console.log("🗑 Deleting selected items...");
    setWorkExperiences((prev) => prev.filter((exp) => !exp.selected));
    setSkills((prev) => prev.filter((skill) => !skill.selected));
  };

  return (
    <div className="resume-builder flex flex-col items-center">
      {/* Top area */}
      <div className="flex w-full">
        {/* Left: Form */}
        <div className="w-1/3 p-4">
          <FormPanel
            formData={formData}
            setFormData={setFormData}
            selectedEducations={selectedEducations}
            setSelectedEducations={setSelectedEducations}
            addEducation={addEducation}
            jobTitle={jobTitle}
            setJobTitle={setJobTitle}
            openWorkPopup={openWorkPopup}
            onAddWorkExp={() => setShowWorkPopup(true)}
            onAddSkillsClick={() => setShowSkillsPopup(true)}
          />
        </div>

        {/* Right: Preview */}
        <div className="w-2/3 p-4" id="resumeContainer">
          <PreviewPanel
            formData={formData}
            selectedEducations={selectedEducations}
            handleCheckboxChange={handleCheckboxChange}
            jobTitle={jobTitle}
            workExperiences={workExperiences}
            skills={skills}
            isEditing={isEditing}
            toggleWorkCheckbox={toggleWorkCheckbox}
            toggleSkillCheckbox={toggleSkillCheckbox}
          />
        </div>
      </div>

      {/* Work Experience Popup */}
      {showWorkPopup && (
        <WorkExpPopup
          jobTitle={jobTitle}
          onClose={() => setShowWorkPopup(false)}
          onSelect={(newExp) => handleAddWorkExp(newExp)}
        />
      )}

      {/* Skills Popup */}
      {showSkillsPopup && (
        <SkillsPopup
          jobTitle={jobTitle}
          onClose={() => setShowSkillsPopup(false)}
          onSelect={(newSkill) => handleAddSkill(newSkill)}
        />
      )}

      {/* Bottom: Buttons */}
      <div className="mt-6">
        <ButtonSection
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onDeleteSelected={handleDeleteSelected} // ✅ new prop
        />
      </div>
    </div>
  );
}
