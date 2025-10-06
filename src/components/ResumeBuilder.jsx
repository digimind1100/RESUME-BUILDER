import React, { useState } from "react";
import FormPanel from "./FormPanel";
import PreviewPanel from "./PreviewPanel";
import PreviewPanel2 from "./PreviewPanel2";
<<<<<<< HEAD

export default function ResumeBuilder() {
  // ✅ initialize formData.education as an array
=======
import ButtonSection from "./ButtonSection";


export default function ResumeBuilder() {
  // ✅ State initialization
>>>>>>> 99a9e3f (add)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
<<<<<<< HEAD
    education: [], // important!
    // other fields...
=======
    education: [], // important
>>>>>>> 99a9e3f (add)
  });

  const [selectedEducations, setSelectedEducations] = useState([]);

<<<<<<< HEAD
  // Generic safe adder that accepts a newEntry object
=======
  // ✅ Add new education entry
>>>>>>> 99a9e3f (add)
  const addEducation = (newEntry) => {
    if (!newEntry || typeof newEntry !== "object") {
      console.warn("addEducation called with invalid newEntry:", newEntry);
      return;
    }

    setFormData((prev) => ({
      ...prev,
<<<<<<< HEAD
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
=======
      education: [...(prev.education || []), newEntry],
    }));
  };

  // Pagination setup
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
     
     <div id="resumeContainer">
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

      {/* ✅ Bottom: All buttons (PDF, future ones) */}
      <div className="mt-6">
        <ButtonSection />
>>>>>>> 99a9e3f (add)
      </div>
    </div>
  );
}
