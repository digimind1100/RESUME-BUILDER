import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import TemplateControls from "./TemplateControls";
import Watermark from "../components/Watermark";
import "./TemplateLayout.css";

export default function TemplateLayout({
  children,   // 👈 IMPORTANT (we use this now)
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

  const handleDownloadPDF = async () => {
  const root = resumeContainerRef.current;
  if (!root) return;

  const pages = root.querySelectorAll(".resume-a4");

  if (!pages.length) return;

  const pdf = new jsPDF("p", "mm", "a4");

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];

    await new Promise((r) => setTimeout(r, 100));

    const canvas = await html2canvas(page, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdfWidth = 210;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    if (i !== 0) {
      pdf.addPage();   // ✅ ADD NEW PAGE
    }

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
  }

  pdf.save(`${templateId}-resume.pdf`);
};

  return (
    <div className={wrapperClass}>

      <div className="editor-area">

        {/* ✅ TOOLBAR */}
        <TemplateControls
          resumeRef={resumeContainerRef}
          templateId={templateId}
          onEditChange={handleEditChange}
          onDownload={handleDownloadPDF}
        />

        {/* ✅ TEMPLATE AREA */}
        <div id="resume-template">
          <div className={resumeClass} ref={resumeContainerRef}>

            <Watermark show={!canEdit} />

            {/* ✅ OLD SYSTEM: render children */}
            {typeof children === "function"
              ? children({ isEditable, canEdit })
              : children}

          </div>
        </div>

      </div>

    </div>
  );
}