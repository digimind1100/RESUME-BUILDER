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

  // ✅ Hide no-pdf elements temporarily
  const noPdfElements = root.querySelectorAll(".no-pdf");
  noPdfElements.forEach(el => el.style.display = "none");

  await new Promise((r) => setTimeout(r, 100));

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff"
  });

  // ✅ Restore elements
  noPdfElements.forEach(el => el.style.display = "");

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = 210;
  const pdfHeight = 297;

  const marginTop = 10;
  const marginBottom = 10;

  const usableHeight = pdfHeight - marginTop - marginBottom;

  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = marginTop;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= usableHeight;

  while (heightLeft > 0) {
    pdf.addPage();

    pdf.addImage(
      imgData,
      "PNG",
      0,
      marginTop - (imgHeight - heightLeft),
      imgWidth,
      imgHeight
    );

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