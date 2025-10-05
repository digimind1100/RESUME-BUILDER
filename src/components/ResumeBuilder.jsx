import React, { useState } from "react";
import FormPanel from "./FormPanel";
import PreviewPanel from "./PreviewPanel";
import PreviewPanel2 from "./PreviewPanel2";

export default function ResumeBuilder() {
  // ✅ initialize formData.education as an array
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    education: [], // important!
    // other fields...
  });

  const [selectedEducations, setSelectedEducations] = useState([]);

  // Generic safe adder that accepts a newEntry object
  const addEducation = (newEntry) => {
    if (!newEntry || typeof newEntry !== "object") {
      console.warn("addEducation called with invalid newEntry:", newEntry);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      education: [...(prev.education || []), newEntry], // safe append
    }));
  };

  // Example handler if you have local inputs in this component; otherwise
  // call addEducation from FormPanel and pass newEntry from there.
  const handleAddClickExample = () => {
    const newEntry = {
      school: "New School",
      degree: "BSc",
      year: "2025",
    };
    addEducation(newEntry);
  };

  // Pagination / page-splitting
  const entriesPerPage = 4;
  const firstPageEducation = formData.education.slice(0, entriesPerPage);
  const secondPageEducation = formData.education.slice(entriesPerPage);

  // debug helper
  // console.log("Education count:", formData.education.length);

  return (
    <div className="resume-builder flex">
      {/* Left: Form */}
      <div className="w-1/3 p-4">
        {/* Option A: Give FormPanel direct access to setFormData (your current approach) */}
        <FormPanel
          formData={formData}
          setFormData={setFormData}
          selectedEducations={selectedEducations}
          setSelectedEducations={setSelectedEducations}
          // Option B: or pass addEducation to FormPanel and let it call addEducation(newEntry)
          addEducation={addEducation}
        />

        
      </div>

      {/* Right: Previews */}
      <div className="w-2/3 p-4">
        {/* Page 1 */}
        <PreviewPanel
          formData={{ ...formData, education: firstPageEducation }}
          selectedEducations={selectedEducations}
          setSelectedEducations={setSelectedEducations}
          pageNumber={1}
        />

        {/* Page 2 (render only when > entriesPerPage) */}
        {(formData.education?.length || 0) > entriesPerPage && (
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
  );
}
