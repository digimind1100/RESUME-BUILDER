import React, { useState } from "react";
import FormPanel from "./FormPanel";
import PreviewPanel from "./PreviewPanel";

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

  const [selectedEducations, setSelectedEducations] = useState([]); // ✅ centralized


  return (
   <div className="resume-builder flex">
      <div className="w-1/3 p-4">
        <FormPanel
          formData={formData}
          setFormData={setFormData}
          selectedEducations={selectedEducations}
          setSelectedEducations={setSelectedEducations}
        />
      </div>

      <div className="w-2/3 p-4">
        <PreviewPanel
          formData={formData}
          selectedEducations={selectedEducations}
          setSelectedEducations={setSelectedEducations}
        />
      </div>
    </div>
  );
}

