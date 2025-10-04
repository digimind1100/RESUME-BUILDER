import React, { useRef, useEffect } from "react";
import "./PreviewPanel.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


export default function PreviewPanel({ formData, selectedEducations, setSelectedEducations, offset }) {
  const educationRef = useRef(null);

  // ✅ Checkbox toggle
const handleCheckboxChange = (globalIndex) => {
    if (selectedEducations.includes(globalIndex)) {
      setSelectedEducations(selectedEducations.filter((i) => i !== globalIndex));
    } else {
      setSelectedEducations([...selectedEducations, globalIndex]);
    }
  };

  useEffect(() => {
    if (educationRef.current) {
      console.log("Education wrapper height:", educationRef.current.offsetHeight);
    }
  }, [formData?.education]);


  
const handleDownloadPDF = async () => {
  const previewElement = document.querySelector(".preview-panel");

  if (!previewElement) {
    alert("Preview not found!");
    return;
  }

  const canvas = await html2canvas(previewElement, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("resume.pdf");
};

  return (
    <div
      className="preview-panel" 
      style={{ width: "794px", height: "1123px", margin: "0 auto", flexShrink: 0 }}
    >
      {/* Left Column */}
      <div className="preview-left">
        <div className="profile-pic-wrapper">
          <img
            id="profilePicPreview"
            src={formData?.profilePic || "https://via.placeholder.com/120"}
            alt="Profile"
          />
        </div>

        <h2 className="preview-name">{formData?.fullName || "Your Name"}</h2>

        {/* Contact Info */}
        <div className="contact-info">
          <div className="icon-block">
            <FaEnvelope className="icon" />
            <p>{formData?.email || "your.email@example.com"}</p>
          </div>
          <div className="icon-block">
            <FaPhone className="icon" />
            <p>{formData?.phone || "+123 456 7890"}</p>
          </div>
          <div className="icon-block">
            <FaMapMarkerAlt className="icon" />
            <p>{formData?.address || "Street Address"}</p>
          </div>
          <div className="icon-block">
            <p>{formData?.city || "City / State"}</p>
          </div>
          <div className="icon-block">
            <p>{formData?.country || "Country"}</p>
          </div>
          <div className="icon-block">
            <FaLinkedin className="icon" />
            <p>{formData?.linkedin || "linkedin.com/in/username"}</p>
          </div>
        </div>

        <h3 className="section-heading">Date of Birth</h3>
        <p>{formData?.dob || "DD/MM/YYYY"}</p>

        {/* Education */}
        <div className="p-4">
          <h2 className="section-heading">Education</h2>
          <div ref={educationRef} className="education-wrapper">
        {formData?.education && formData.education.length > 0 ? (
            formData.education.map((edu, index) => {
              const globalIndex = offset + index; // 👈 actual index maintain
              return (
                <div key={globalIndex} className="education-entry">
                  <input
                    type="checkbox"
                    checked={selectedEducations.includes(globalIndex)}
                    onChange={() => handleCheckboxChange(globalIndex)}
                  />
                  <div className="education-details">
                    <p>{edu.school}</p>
                    <p>{edu.degree}</p>
                    <p>{edu.year}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No education added yet</p>
          )}

          </div>
        </div>
        
      </div>

       
      

      {/* Right Column */}
      <div className="preview-right">
        <h3 className="section-heading">Work Experience</h3>
        <p>Coming soon...</p>
      </div>


      
    </div>





  );
}
