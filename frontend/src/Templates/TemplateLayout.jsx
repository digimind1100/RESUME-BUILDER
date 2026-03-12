import React, { useRef, useState } from "react";
import TemplateControls from "./TemplateControls";
import Watermark from "../components/Watermark";

export default function TemplateLayout({
  children,
  templateId,
  wrapperClass = "template-wrapper",
  resumeClass = "template-resume"
}) {

  const resumeContainerRef = useRef(null);

  const [isEditable, setIsEditable] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  const handleEditChange = (editable, paid) => {
    setIsEditable(editable);
    setCanEdit(paid);
  };

  return (
    <div className={wrapperClass}>

      <TemplateControls
        resumeRef={resumeContainerRef}
        templateId={templateId}
        onEditChange={handleEditChange}
      />

      <div className={resumeClass} ref={resumeContainerRef}>

        <Watermark show={!canEdit} />

        {typeof children === "function"
          ? children({ canEdit, isEditable })
          : children}

      </div>

    </div>
  );
}