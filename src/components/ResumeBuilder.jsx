import React, { useState } from "react";
import FormPanel from "./FormPanel";
import PreviewPanel from "./PreviewPanel";
import WorkPopup from "./WorkExpPopup";
import SkillsPopup from "./SkillsPopup";
import ButtonSection from "./ButtonSection";

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({});
  const [selectedEducations, setSelectedEducations] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [workExperiences, setWorkExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // Popup visibility states
  const [showWorkPopup, setShowWorkPopup] = useState(false);
  const [showSkillsPopup, setShowSkillsPopup] = useState(false);

  // --- Education ---
  const addEducation = (education) => {
    setSelectedEducations((prev) => [...prev, education]);
  };


  const toggleSkillCheckbox = (id) => {
    setSkills((prev) =>
      prev.map((skill) =>
        skill.id === id ? { ...skill, checked: !skill.checked } : skill
      )
    );
  };
// ================= WORK CHECKBOX FIX =================
const toggleWorkCheckbox = (id) => {
  setWorkExperiences((prev) =>
    prev.map((work) =>
      work.id === id ? { ...work, checked: !work.checked } : work
    )
  );
};

 // Education checkbox handler
  const handleCheckboxChange = (index) => {
    setSelectedEducations((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // --- Popup Handlers ---
  const handleOpenWorkPopup = () => setShowWorkPopup(true);
  const handleCloseWorkPopup = () => setShowWorkPopup(false);
  const handleAddSkillsClick = () => setShowSkillsPopup(true);
  const handleCloseSkillsPopup = () => setShowSkillsPopup(false);

  // --- AI Selection Handlers ---
  const handleWorkSelect = (item) => {
    const textValue =
      typeof item === "string"
        ? item.trim()
        : item.text || item.title || JSON.stringify(item);

    if (!textValue) return;

    const newWork = {
      id: Date.now(),
      title: textValue,
      text: textValue,
      company: "",
      years: "",
      checked: false,
    };

    setWorkExperiences((prev) => {
      const alreadyExists = prev.some((w) => w.text === textValue);
      if (alreadyExists) return prev; // prevent duplicates
      return [...prev, newWork];
    });

    console.log("✅ Added Work:", textValue);

  
  };

  const handleSkillSelect = (item) => {
    const textValue =
      typeof item === "string" ? item.trim() : item.text || "";

    if (!textValue) return;

    const newSkill = {
      id: Date.now(),
      text: textValue,
      checked: false,
    };

    setSkills((prev) => {
      const alreadyExists = prev.some((s) => s.text === textValue);
      if (alreadyExists) return prev;
      return [...prev, newSkill];
    });

    console.log("✅ Added Skill:", textValue);

  };

  // --- Delete Selected Items (Work + Skills) ---
  const handleDeleteSelected = () => {
    setWorkExperiences((prev) => prev.filter((exp) => !exp.checked));
    setSkills((prev) => prev.filter((skill) => !skill.checked));
  };



  return (
    <div className="flex flex-col">
      <div className="flex">
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
            openWorkPopup={handleOpenWorkPopup}
            onAddWorkExp={handleOpenWorkPopup}
            onAddSkillsClick={handleAddSkillsClick}
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
            handleOpenWorkPopup={handleOpenWorkPopup}
            handleAddSkillsClick={handleAddSkillsClick}
          />
        </div>
      </div>

      {/* --- Work Popup --- */}
      {showWorkPopup && (
        <WorkPopup
          jobTitle={jobTitle}
          onClose={handleCloseWorkPopup}
          workExperiences={workExperiences}
          setWorkExperiences={setWorkExperiences}
          onSelect={handleWorkSelect}
        />
      )}

      {/* --- Skills Popup --- */}
      {showSkillsPopup && (
        <SkillsPopup
          jobTitle={jobTitle}
          onClose={handleCloseSkillsPopup}
          skills={skills}
          setSkills={setSkills}
          onSelect={handleSkillSelect}
        />
      )}

      {/* --- Bottom Buttons Section --- */}
      <div className="mt-6 px-4">
        <ButtonSection
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleDeleteSelected={handleDeleteSelected}
        />
      </div>
    </div>
  );
};

export default ResumeBuilder;
