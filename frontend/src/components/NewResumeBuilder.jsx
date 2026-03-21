import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TemplateLayout from "../Template/TemplateLayout";
import NewFormPanel from "./NewFormPanel";

export default function NewResumeBuilder() {

  const { templateId } = useParams();

  const [formData, setFormData] = useState({});
  const [isEditable, setIsEditable] = useState(true);

  return (
    <div style={{ display: "flex" }}>

      {/* LEFT FORM */}
      <div style={{ width: "40%", padding: "20px" }}>
        <NewFormPanel
          formData={formData}
          setFormData={setFormData}
        />
      </div>

      {/* RIGHT TEMPLATE */}
      <div style={{ width: "60%" }}>
        <TemplateLayout
          templateId={templateId === "aviation-pro" ? "AviationPro" : templateId}
          resumeData={formData}
        />
      </div>

    </div>
  );
}