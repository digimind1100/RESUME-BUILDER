import React, { useState } from "react";
import FormPanel from "./FormPanel";
import PreviewPanel from "./PreviewPanel";
import PreviewPanel2 from "./PreviewPanel2";

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    dob: "",
    linkedin: "",
    profilePic: "",
    education: [],
  });

  const [selectedEducations, setSelectedEducations] = useState([]);

  // ✅ Pagination logic
  const firstPageLimit = 5; // 4 entries ≈ 428px, safe under 530px
  const firstPageEducation = formData.education.slice(0, firstPageLimit);
  const secondPageEducation = formData.education.slice(firstPageLimit);

  return (
    <div className="resume-builder flex">
      {/* Left Panel */}
      <div className="w-1/3 p-4">
        <FormPanel
          formData={formData}
          setFormData={setFormData}
          selectedEducations={selectedEducations}
          setSelectedEducations={setSelectedEducations}
        />
      </div>

      {/* Right Panel */}
      <div className="w-2/3 p-4">
        {/* Page 1 */}
       <PreviewPanel
  formData={{ ...formData, education: firstPageEducation }}
  selectedEducations={selectedEducations}
  setSelectedEducations={setSelectedEducations}
  offset={0}
/>

{secondPageEducation.length > 0 && (
  <PreviewPanel2
    education={secondPageEducation}
    selectedEducations={selectedEducations}
    setSelectedEducations={setSelectedEducations}
    offset={firstPageEducation.length} // 👈 ye add kiya
  />
)}

      </div>
    </div>
  );
}
