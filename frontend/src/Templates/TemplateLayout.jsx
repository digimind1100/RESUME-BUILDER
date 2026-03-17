import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import TemplateControls from "./TemplateControls";
import Watermark from "../components/Watermark";

export default function TemplateLayout({
  children,
  templateId,
  wrapperClass = "template-wrapper",
  resumeClass = "template-resume"
}) {

  const resumeRef = useRef(null);
  const pdfRef = useRef(null);

  const [isEditable, setIsEditable] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  const handleEditChange = (editable, paid) => {
    setIsEditable(editable);
    setCanEdit(paid);
  };

  const handleDownloadPDF = async () => {

    const element = pdfRef.current;
    if (!element) return;

    await new Promise(r => setTimeout(r, 300));

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff"
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);

    pdf.save(`${templateId}-resume.pdf`);
  };

  return (

    <div className={wrapperClass}>

      {/* TOOLBAR */}
      <div style={{ position: "relative", zIndex: 2000 }}>
        <TemplateControls
          resumeRef={resumeRef}
          templateId={templateId}
          onEditChange={handleEditChange}
          onDownload={handleDownloadPDF}
        />
      </div>

      {/* RESUME CONTAINER */}
      <div
        className={resumeClass}
        ref={resumeRef}
        contentEditable={false}
        style={{
          position: "relative",
          zIndex: 1
        }}
      >

        <Watermark show={!canEdit} />

        {typeof children === "function"
          ? children({ canEdit, isEditable, pdfRef })
          : children}

      </div>

    </div>

  );
}