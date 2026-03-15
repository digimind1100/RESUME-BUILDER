import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import TemplateControls from "./TemplateControls";
import Watermark from "../components/Watermark";
import { useReview } from "../context/ReviewContext";

export default function TemplateLayout({
children,
templateId,
wrapperClass = "template-wrapper",
resumeClass = "template-resume"
}) {

const resumeContainerRef = useRef(null);
const { triggerReview } = useReview();

const [isEditable, setIsEditable] = useState(false);
const [canEdit, setCanEdit] = useState(false);
const [requirePaymentFn, setRequirePaymentFn] = useState(null);

const handleEditChange = (editable, paid) => {
setIsEditable(editable);
setCanEdit(paid);
};

const handleDownloadPDF = async () => {

  const element = resumeContainerRef.current;
  if (!element) return;

  // enable pdf mode
  element.classList.add("pdf-mode");

  await new Promise(resolve => setTimeout(resolve, 200));

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff"
  });

  // remove pdf mode
  element.classList.remove("pdf-mode");

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = 210; // A4 width in mm
const pdfHeight = 297; // A4 height in mm

const imgWidth = pdfWidth;
const imgHeight = (canvas.height * imgWidth) / canvas.width;

pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

  pdf.save(`${templateId}-resume.pdf`);

  setTimeout(() => {
    triggerReview();
  }, 1500);

};

return ( <div className={wrapperClass}>


  <TemplateControls
    resumeRef={resumeContainerRef}
    templateId={templateId}
    onEditChange={handleEditChange}
    onRequirePayment={setRequirePaymentFn}
    onDownload={handleDownloadPDF}
  />

  <div className={resumeClass} ref={resumeContainerRef}>

    <Watermark show={!canEdit} />

    {typeof children === "function"
  ? children({
      canEdit,
      isEditable,
      requirePayment: requirePaymentFn
    })
  : children}

  </div>

</div>

);
}
