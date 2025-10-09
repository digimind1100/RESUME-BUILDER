import React, { useState } from "react";
import FormPanel from "./FormPanel";
import PreviewPanel from "./PreviewPanel";
import PreviewPanel2 from "./PreviewPanel2";
import ButtonSection from "./ButtonSection";
import "./ButtonSection.css";

export default function ResumeBuilder() {
  // ✅ State initialization
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    education: [], // important
  });

  const [selectedEducations, setSelectedEducations] = useState([]);

  // ✅ Checkbox handler (must be inside the component)
  const handleCheckboxChange = (index) => {
    setSelectedEducations((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  // ✅ Add new education entry
  const addEducation = (newEntry) => {
    if (!newEntry || typeof newEntry !== "object") {
      console.warn("addEducation called with invalid newEntry:", newEntry);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      education: [...(prev.education || []), newEntry],
    }));
  };

 return (
  <div className="resume-builder flex flex-col items-center">
    {/* Top: Main area (Form + Previews side by side) */}
    <div className="flex w-full">
      {/* Left: Form */}
      <div className="w-1/3 p-4">
        <FormPanel
          formData={formData}
          setFormData={setFormData}
          selectedEducations={selectedEducations}
          setSelectedEducations={setSelectedEducations}
          addEducation={addEducation}
        />
      </div>

      {/* Right: Previews */}
      <div id="resumeContainer" className="w-2/3 p-4">
        <PreviewPanel
  formData={formData}
  selectedEducations={selectedEducations}
  handleCheckboxChange={handleCheckboxChange}
   pageNumber={1}
/>


        {/* ✅ Future Page 2 placeholder (no error) */}
        {selectedEducations.length > 6 && (
          <PreviewPanel
            formData={formData}
            selectedEducations={selectedEducations}
            setSelectedEducations={setSelectedEducations}
            pageNumber={2}
          />
        )}
      </div>
    </div>

    {/* ✅ Bottom: All buttons (PDF, etc.) */}
    <div className="mt-6">
      <ButtonSection />
    </div>
  </div>
);
}
