import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import FormPanel from "./FormPanel";
import PreviewPanel from "./PreviewPanel";
import PreviewPanel2 from "./PreviewPanel2";
import "./ResumeBuilder.css";

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    education: [],
    profilePic: "",
  });

  const [selectedEducations, setSelectedEducations] = useState([]);

  // ✅ PDF Download Function (Button hidden during capture)
  const handleDownloadPDF = async () => {
    const previewArea = document.querySelector(".preview-section");
    const downloadBtn = document.querySelector(".download-container");

    if (!previewArea) {
      alert("Preview not found!");
      return;
    }

    // 🔹 Hide download button temporarily
    if (downloadBtn) downloadBtn.style.display = "none";

    // Wait a moment to ensure layout updates
    await new Promise((resolve) => setTimeout(resolve, 100));

    const canvas = await html2canvas(previewArea, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume.pdf");

    // 🔹 Show button again after capture
    if (downloadBtn) downloadBtn.style.display = "flex";
  };

  // ✅ Pagination Logic
  const firstPageLimit = 5;
  const firstPageEducation = formData.education.slice(0, firstPageLimit);
  const secondPageEducation = formData.education.slice(firstPageLimit);

  return (
    <div className="resume-builder">
      <div className="builder-container">
        {/* ✅ Left Side - Form */}
        <div className="form-section">
          <h2 className="panel-title">Form Panel</h2>
          <FormPanel
            formData={formData}
            setFormData={setFormData}
            selectedEducations={selectedEducations}
            setSelectedEducations={setSelectedEducations}
          />
        </div>

        {/* ✅ Right Side - Preview */}
        <div className="preview-section">
          <PreviewPanel
            formData={{ ...formData, education: firstPageEducation }}
            selectedEducations={selectedEducations}
            setSelectedEducations={setSelectedEducations}
          />

          {secondPageEducation.length > 0 && (
            <PreviewPanel2
              education={secondPageEducation}
              selectedEducations={selectedEducations}
              setSelectedEducations={setSelectedEducations}
              offset={firstPageLimit}
            />
          )}

          {/* ✅ Download Button — hidden during PDF generation */}
          <div className="download-container">
            <button className="download-btn" onClick={handleDownloadPDF}>
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
