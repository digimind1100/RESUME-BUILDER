import React, { useRef, useState } from "react";
import templates from "./index"
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import TemplateControls from "./TemplateControls";
import Watermark from "../components/Watermark";
import "./TemplateLayout.css";

export default function TemplateLayout({
  children,
  templateId,
  resumeData,
  wrapperClass = "template-wrapper",
  resumeClass = "template-resume"
}) {

  const SelectedTemplate = templates[templateId]

    console.log("templateId:", templateId)
console.log("SelectedTemplate:", SelectedTemplate)

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

  // ✅ universal A4 detection
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
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);

  pdf.save(`${templateId}-resume.pdf`);
};

return (
  <div className={wrapperClass}>

    <div className="editor-area">

      {/* Controls OUTSIDE */}
      <TemplateControls
        resumeRef={resumeContainerRef}
        templateId={templateId}
        onEditChange={handleEditChange}
        onDownload={handleDownloadPDF}
      />

      {/* ✅ PDF AREA */}
      <div id="resume-template">
        <div className={resumeClass} ref={resumeContainerRef}>

          <Watermark show={!canEdit} />

          {SelectedTemplate ? (
  <SelectedTemplate data={resumeData || {}} />
) : (
  <div>No template found</div>
)}

        </div>
      </div>

    </div>

  </div>
);
}