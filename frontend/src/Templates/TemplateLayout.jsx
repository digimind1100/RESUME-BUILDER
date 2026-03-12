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

const resumeContainerRef = useRef(null);

const [isEditable, setIsEditable] = useState(false);
const [canEdit, setCanEdit] = useState(false);

const handleEditChange = (editable, paid) => {
setIsEditable(editable);
setCanEdit(paid);
};

const handleDownloadPDF = async () => {


const element = resumeContainerRef.current;
if (!element) return;

// small delay to ensure layout is rendered
await new Promise(resolve => setTimeout(resolve, 300));

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

if (triggerReview) {
  triggerReview();
}
setTimeout(() => {
  triggerReview();
}, 800);

};

return ( <div className={wrapperClass}>


  <TemplateControls
    resumeRef={resumeContainerRef}
    templateId={templateId}
    onEditChange={handleEditChange}
    onDownload={handleDownloadPDF}
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
