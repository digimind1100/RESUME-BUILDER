import React, { useRef, useState } from "react";
import TemplateControls from "./TemplateControls";
import Watermark from "../components/Watermark";

export default function TemplateLayout({
  children,
  templateId,
  wrapperClass = "template-wrapper",
  resumeClass = "template-resume"
}) {

  const resumeRef = useRef(null);

  const [isEditable, setIsEditable] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  const handleEditChange = (editable, paid) => {
    setIsEditable(editable);
    setCanEdit(paid);
  };

  return (
    <div className={wrapperClass}>

      {/* Toolbar */}
      <TemplateControls
        resumeRef={resumeRef}
        templateId={templateId}
        onEditChange={handleEditChange}
      />

      {/* Resume Container */}
      <div className={resumeClass} ref={resumeRef}>

        <Watermark show={!canEdit} />

        {typeof children === "function"
          ? children({ canEdit, isEditable })
          : children}

      </div>

    </div>
  );
}