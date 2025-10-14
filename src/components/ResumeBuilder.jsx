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
    setFormData((prev) => ({ ...prev, education: [...(prev.education || []), newEntry] }));
  };

  // This is the handler popup will call (onSelect)
  const handleAddWorkExp = (newExp) => {
    console.log("📌 New WorkExp received in ResumeBuilder:", newExp);
    setWorkExperiences((prev) => {
      const updated = [...prev, newExp];
      console.log("✅ Updated workExperiences state:", updated);
      return updated;
    });
  };

  const openWorkPopup = () => {
    setShowWorkPopup(true);
  };

  // ✅ New handler for Skills
  const handleAddSkill = (newSkill) => {
    console.log("📌 New Skill received:", newSkill);
    setSkills((prev) => {
      const updated = [...prev, newSkill];
      console.log("✅ Updated skills state:", updated);
      return updated;
    });
  };

  // Inside ResumeBuilder.jsx
const handleDeleteSelected = () => {
  console.log("🗑 Deleting selected items...");

  // Work Experiences filter
  setWorkExperiences((prev) =>
    prev.filter((exp) => !exp.selected) // remove where exp.selected = true
  );

  // Skills filter
  setSkills((prev) =>
    prev.filter((skill) => !skill.selected) // remove where skill.selected = true
  );
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
            // When form's "+ Add Work Experience" button is clicked
            onAddWorkExp={() => setShowWorkPopup(true)}
            onAddSkillsClick={() => setShowSkillsPopup(true)} // ✅ Skills ke liye
          />
        </div>

        {/* Right: Preview */}
        <div className="w-2/3 p-4" id="resumeContainer">
          {console.log("📌 Passing workExperiences to PreviewPanel:", workExperiences)}
          <PreviewPanel
            formData={formData}
            selectedEducations={selectedEducations}
            handleCheckboxChange={handleCheckboxChange}
            jobTitle={jobTitle}
            workExperiences={workExperiences}   // ✅ real state
            skills={skills}                     // ✅ real state
            isEditing={isEditing}
          />
        </div>
      </div>

      {/* Work Experience Popup (single source of truth) */}
      {showWorkPopup && (
        <WorkExpPopup
          jobTitle={jobTitle}
          onClose={() => setShowWorkPopup(false)}
          onSelect={(newExp) => {
            handleAddWorkExp(newExp);
          }}
        />
      )}

      {showSkillsPopup && (
        <SkillsPopup
          jobTitle={jobTitle}
          onClose={() => setShowSkillsPopup(false)}
          onSelect={(newSkill) => {
            handleAddSkill(newSkill);
          }}
        />
      )}




      {/* Bottom: Buttons */}
      <div className="mt-6">
     <ButtonSection isEditing={isEditing} setIsEditing={setIsEditing} />
      </div>




    </div>
  );
}
