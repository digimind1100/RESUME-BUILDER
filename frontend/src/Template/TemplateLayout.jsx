import React, { useRef, useState, useEffect } from "react";
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

  const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";
useEffect(() => {
  if (isLocal) {
    setIsEditable(true);
    setCanEdit(true); // 🔥 bypass paid restriction
  }
}, []);


console.log("isEditable:", isEditable);
console.log("canEdit:", canEdit);


  const handleEditChange = (editable, paid) => {

  if (isLocal) {
    setIsEditable(true);
    setCanEdit(true);
    return;
  }

  setIsEditable(editable);
  setCanEdit(paid);
};


  const handleDownloadPDF = async () => {
  const root = resumeContainerRef.current;
  if (!root) return;

  const element = root.querySelector(".resume-a4");
  if (!element) return;

  await new Promise((r) => setTimeout(r, 200));

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = 210;
  const pdfHeight = 297;

  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;

  let position = 0;
  let heightLeft = imgHeight;

  // ✅ FIRST PAGE
  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pdfHeight;

  // ✅ ADD NEW PAGES CORRECTLY
  while (heightLeft > 0) {
    position = - (imgHeight - heightLeft);   // 🔥 KEY FIX
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
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