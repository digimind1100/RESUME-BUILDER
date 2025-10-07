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

  // ✅ Pagination setup
  const entriesPerPage = 3;
  const firstPageEducation = formData.education.slice(0, entriesPerPage);
  const secondPageEducation = formData.education.slice(entriesPerPage);

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
            formData={{ ...formData, education: firstPageEducation }}
            selectedEducations={selectedEducations}
            setSelectedEducations={setSelectedEducations}
            pageNumber={1}
          />
          {formData.education.length > entriesPerPage && (
            <PreviewPanel2
              formData={{ ...formData, education: secondPageEducation }}
              selectedEducations={selectedEducations}
              setSelectedEducations={setSelectedEducations}
              offset={entriesPerPage}
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
