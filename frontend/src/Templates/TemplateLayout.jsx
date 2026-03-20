import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import TemplateControls from "./TemplateControls";
import Watermark from "../components/Watermark";
import "./TemplateLayout.css";

export default function TemplateLayout({
  children,
  templateId,
  wrapperClass = "template-wrapper",
  resumeClass = "template-resume"
}) {

  const resumeRef = useRef(null);
  const pdfRef = useRef(null);
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

  const element = root.querySelector(".resume-a4") || root;

  await new Promise((r) => setTimeout(r, 200));

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff"
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = 210;
  const pdfHeight = 297;

  // ✅ margins (adjust if needed)
  const margin = 10;

  const usableWidth = pdfWidth - margin * 2;
  const usableHeight = pdfHeight - margin * 2;

  const imgHeight = (canvas.height * usableWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = margin;

  // First page
  pdf.addImage(imgData, "PNG", margin, position, usableWidth, imgHeight);
  heightLeft -= usableHeight;

  // Next pages
  while (heightLeft > 0) {
    pdf.addPage();

    position = margin - (imgHeight - heightLeft);

    pdf.addImage(imgData, "PNG", margin, position, usableWidth, imgHeight);

    heightLeft -= usableHeight;
  }

  pdf.save(`${templateId}-resume.pdf`);
};

  return (

  <div className={wrapperClass}>

    <div className="editor-area">

      <TemplateControls
        resumeRef={resumeContainerRef}
        templateId={templateId}
        onEditChange={handleEditChange}
        onDownload={handleDownloadPDF}
      />

      <div className={resumeClass} ref={resumeContainerRef}>
        <Watermark show={!canEdit} />

        {typeof children === "function"
          ? children({ canEdit, isEditable, pdfRef: resumeContainerRef })
          : children}

      </div>

    </div>

  </div>

  );
}