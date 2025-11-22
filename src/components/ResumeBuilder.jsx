// ResumeBuilder.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FormPanel from "./FormPanel";
import WorkPopup from "./WorkExpPopup";
import SkillsPopup from "./SkillsPopup";
import ButtonSection from "./ButtonSection";
import FormatButtons from "./FormatButtons";
import ThemeSelector from "./ThemeSelector";
import PreviewPanel from "./PreviewPanel";
import "./ResumeBuilder.css";

const ResumeBuilder = () => {
  const { templateId } = useParams(); // classic | professional | 1...10

  // --- State ---
  const [formData, setFormData] = useState({});
  const [selectedEducations, setSelectedEducations] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [workExperiences, setWorkExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showWorkPopup, setShowWorkPopup] = useState(false);
  const [showSkillsPopup, setShowSkillsPopup] = useState(false);
  const [theme, setTheme] = useState({
    left: "#17639F",
    job: "#F4ECE1",
    text: "#000",
  });

  const [resumeStyle, setResumeStyle] = useState(templateId || "classic");

  // --- Load CSS dynamically for simple templates ---
  useEffect(() => {
    if (templateId && !["classic", "professional"].includes(templateId)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `/templates/simple-${templateId}.css`; // your template CSS path
      link.id = "dynamic-template-css";
      document.head.appendChild(link);

      return () => {
        const existing = document.getElementById("dynamic-template-css");
        if (existing) existing.remove();
      };
    }
  }, [templateId]);

  // --- Education handler ---
  const addEducation = (education) => {
    setSelectedEducations((prev) => [...prev, education]);
  };

  // --- Format handler ---
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

  const toggleSkillCheckbox = (id) => {
    setSkills((prev) =>
      prev.map((skill) =>
        skill.id === id ? { ...skill, checked: !skill.checked } : skill
      )
    );
  };

  const toggleWorkCheckbox = (id) => {
    setWorkExperiences((prev) =>
      prev.map((work) =>
        work.id === id ? { ...work, checked: !work.checked } : work
      )
    );
  };

  const handleCheckboxChange = (index) => {
    setSelectedEducations((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleOpenWorkPopup = () => setShowWorkPopup(true);
  const handleCloseWorkPopup = () => setShowWorkPopup(false);
  const handleAddSkillsClick = () => setShowSkillsPopup(true);
  const handleCloseSkillsPopup = () => setShowSkillsPopup(false);

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
      if (alreadyExists) return prev;
      return [...prev, newWork];
    });
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
  };

  const handleDeleteSelected = () => {
    setWorkExperiences((prev) => prev.filter((exp) => !exp.checked));
    setSkills((prev) => prev.filter((skill) => !skill.checked));
  };

  return (
    <div className="resume-builder-container flex flex-col md:flex-row md:items-start">
      {/* Left: Form Panel */}
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

      {/* Right: Preview + Theme */}
      <div className="right-side w-full lg:w-[60%] flex flex-col">
        <div className="resume-theme w-full flex flex-col p-4" id="resumeContainer">
          <div className="theme-selector-container p-2">
            <ThemeSelector onThemeChange={setTheme} />
          </div>

          {isEditing && (
            <div className="format-buttons-wrapper">
              <FormatButtons handleFormat={handleFormat} />
            </div>
          )}

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
            deleteWorkExperience={() => {}}
            deleteSkill={() => {}}
            isEditing={isEditing}
            toggleWorkCheckbox={toggleWorkCheckbox}
            toggleSkillCheckbox={toggleSkillCheckbox}
            handleOpenWorkPopup={handleOpenWorkPopup}
            handleAddSkillsClick={handleAddSkillsClick}
            theme={theme}
            resumeStyle={resumeStyle} // Pass dynamic template
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
