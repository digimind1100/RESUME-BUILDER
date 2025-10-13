import React, { useState } from "react";
import FormPanel from "./FormPanel";
import PreviewPanel from "./PreviewPanel";
import ButtonSection from "./ButtonSection";
import WorkExpPopup from "./WorkExpPopup";
import "./ButtonSection.css";

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({});
  const [selectedEducations, setSelectedEducations] = useState([]);
  const [jobTitle, setJobTitle] = useState("");

  // Work Experience state + popup toggle
  const [workExperiences, setWorkExperiences] = useState([]);
  const [showWorkPopup, setShowWorkPopup] = useState(false);

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
          />
        </div>

        {/* Right: Preview */}
        <div className="w-2/3 p-4" id="resumeContainer">
          {console.log("📌 Passing workExperiences to PreviewPanel:", workExperiences)}
          <PreviewPanel
            formData={formData}
            jobTitle={jobTitle}
            selectedEducations={selectedEducations}
            handleCheckboxChange={handleCheckboxChange}
            workExperiences={workExperiences}
            deleteWorkExperience={(id) =>
              setWorkExperiences((prev) => prev.filter((exp) => exp.id !== id))
            }
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


      {/* Bottom: Buttons */}
      <div className="mt-6">
        <ButtonSection />
      </div>
    </div>
  );
}
