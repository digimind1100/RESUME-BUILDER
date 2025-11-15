// ResumeBuilder.jsx
import React, { useState } from "react";
import FormPanel from "./FormPanel";
import WorkPopup from "./WorkExpPopup";
import SkillsPopup from "./SkillsPopup";
import ButtonSection from "./ButtonSection";
import FormatButtons from "./FormatButtons";
import ThemeSelector from "./ThemeSelector";
import "./ResumeBuilder.css"

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

  // Theme state (example default)
  const [theme, setTheme] = useState({
    left: "#17639F",
    job: "#F4ECE1",
    text: "#000",
  });

  // --- Education add handler ---
  const addEducation = (education) => {
    setSelectedEducations((prev) => [...prev, education]);
  };

  // --- Format handler (keeps previous behavior) ---
  const handleFormat = (action) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.extractContents();
    const span = document.createElement("span");

    switch (action) {
      case "bold":
        span.style.fontWeight = "bold";
        break;
      case "italic":
        span.style.fontStyle = "italic";
        break;
      case "underline":
        span.style.textDecoration = "underline";
        break;
      case "font":
        span.style.fontFamily = "Georgia, serif";
        break;
      default:
        break;
    }

    span.appendChild(selectedText);
    range.insertNode(span);
  };

  // --- Toggle skill checkbox ---
  const toggleSkillCheckbox = (id) => {
    setSkills((prev) =>
      prev.map((skill) =>
        skill.id === id ? { ...skill, checked: !skill.checked } : skill
      )
    );
  };

  // --- Toggle work checkbox ---
  const toggleWorkCheckbox = (id) => {
    setWorkExperiences((prev) =>
      prev.map((work) =>
        work.id === id ? { ...work, checked: !work.checked } : work
      )
    );
  };

  // --- Education checkbox handler ---
  const handleCheckboxChange = (index) => {
    setSelectedEducations((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // --- Popup handlers ---
  const handleOpenWorkPopup = () => setShowWorkPopup(true);
  const handleCloseWorkPopup = () => setShowWorkPopup(false);
  const handleAddSkillsClick = () => setShowSkillsPopup(true);
  const handleCloseSkillsPopup = () => setShowSkillsPopup(false);

  // --- AI selection handlers (work + skills) ---
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

  // --- Delete selected items (work + skills) ---
  const handleDeleteSelected = () => {
    setWorkExperiences((prev) => prev.filter((exp) => !exp.checked));
    setSkills((prev) => prev.filter((skill) => !skill.checked));
  };

  return (
    <div className="resume-builder-container flex flex-col md:flex-row md:items-start">
      {/* Left side: Form Panel */}
      <div className="form-panel w-full md:w-[40%] p-4">
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

      {/* Right side: Theme + Preview */}
      <div className="right-side w-full lg:w-[60%] flex flex-col">
        <div className="resume-theme w-full flex flex-col p-4" id="resumeContainer">
          <div className="theme-selector-container p-2">
            <ThemeSelector onThemeChange={setTheme} />
          </div>

          {/* Format Buttons (floating below preview if editing) */}
          {isEditing && (
            <div className="format-buttons-wrapper">
              <FormatButtons
                handleFormat={handleFormat}
              />
            </div>
          )}

          {/* Button Section (below resume-theme, but still inside main container) */}
          <div className="button-section-container p-4 mt-4 md:mt-0">
            <ButtonSection
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              handleDeleteSelected={handleDeleteSelected}
              formData={formData}
              selectedEducations={selectedEducations}
              workExperiences={workExperiences}
              skills={skills}
              jobTitle={jobTitle}
            />
          </div>
          <PreviewPanel
            formData={formData}
            selectedEducations={selectedEducations}
            handleCheckboxChange={handleCheckboxChange}
            jobTitle={jobTitle}
            workExperiences={workExperiences}
            skills={skills}
            deleteWorkExperience={(arg) => {
              // keep original behaviour if parent expects call with array or no-arg
              // we pass through to remove selected if provided earlier — unchanged
              console.warn("deleteWorkExperience placeholder - original handler lives in parent/context");
            }}
            deleteSkill={(idOrList) => {
              // parent handles deleting; keep local deleteSkill behavior in parent components
              console.warn("deleteSkill placeholder - original handler lives in parent/context");
            }}
            isEditing={isEditing}
            toggleWorkCheckbox={toggleWorkCheckbox}
            toggleSkillCheckbox={toggleSkillCheckbox}
            handleOpenWorkPopup={handleOpenWorkPopup}
            handleAddSkillsClick={handleAddSkillsClick}
            theme={theme}
          />
        </div>
      </div>
      {/* Popups */}
      {showWorkPopup && (
        <WorkPopup
          jobTitle={jobTitle}
          onClose={handleCloseWorkPopup}
          workExperiences={workExperiences}
          setWorkExperiences={setWorkExperiences}
          onSelect={handleWorkSelect}
        />
      )}

      {showSkillsPopup && (
        <SkillsPopup
          jobTitle={jobTitle}
          onClose={handleCloseSkillsPopup}
          skills={skills}
          setSkills={setSkills}
          onSelect={handleSkillSelect}
        />
      )}
    </div>
  );
};

export default ResumeBuilder;
