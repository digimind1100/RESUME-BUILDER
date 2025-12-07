import React, { useRef, useState } from "react";
import "./CreativeBold.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const CreativeBold = () => {
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  /* ===== EDIT MODE TOGGLE ===== */
  const [isEditable, setIsEditable] = useState(false);

  // ----- Profile Image Upload -----
  const [profileImage, setProfileImage] = useState("/images/creativeboldimage.png");
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // ----- Download PDF -----
  const handleDownloadPDF = async () => {
    const element = resumeRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
    pdf.save("creative-bold-resume.pdf");
  };

  // ----- Reset Page -----
  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="cb-wrapper">

      {/* Top Buttons */}
      <div className="cb-buttons">
        <button onClick={handleDownloadPDF}>Download PDF</button>
        <button onClick={() => navigate("/templates")}>Back to Templates</button>
        <button onClick={handleReset}>Reset</button>

        {/* EDIT MODE BUTTON */}
        <button
          onClick={() => setIsEditable(!isEditable)}
          className={isEditable ? "edit-toggle on" : "edit-toggle off"}
        >
          {isEditable ? "Editing: ON" : "Editing: OFF"}
        </button>
      </div>

      {/* A4 Resume Area */}
      <div className="cb-a4" ref={resumeRef}>
        <div className="cb-resume">
          
          {/* LEFT RED COLUMN */}
          <aside className="cb-left">
            
            {/* Profile Image */}
            <div className="cb-photo-wrapper" onClick={triggerFileSelect}>
              <img src={profileImage} alt="Profile" className="cb-photo" />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </div>

            {/* Job Title (Left side) */}
            <div className="cb-left-role">
              <h2
                className="cb-left-role-text"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                MARKETING SPECIALIST
              </h2>
            </div>

            {/* Skills */}
            <section className="cb-left-section">
              <h3 className="cb-left-heading" contentEditable={isEditable} suppressContentEditableWarning>
                SKILLS
              </h3>
              <ul className="cb-left-list">
                <li contentEditable={isEditable} suppressContentEditableWarning>SEO and SEM</li>
                <li contentEditable={isEditable} suppressContentEditableWarning>Content Marketing</li>
                <li contentEditable={isEditable} suppressContentEditableWarning>Social Media Management</li>
                <li contentEditable={isEditable} suppressContentEditableWarning>Analytics & Reporting</li>
              </ul>
            </section>

            {/* Contact */}
            <section className="cb-left-section">
              <h3 className="cb-left-heading" contentEditable={isEditable} suppressContentEditableWarning>
                CONTACT
              </h3>
              <div className="cb-left-contact">
                <p contentEditable={isEditable} suppressContentEditableWarning>123-456-7860</p>
                <p contentEditable={isEditable} suppressContentEditableWarning>amanda.smith@mail.com</p>
                <p contentEditable={isEditable} suppressContentEditableWarning>Los Angeles, CA</p>
              </div>
            </section>
          </aside>

          {/* RIGHT WHITE COLUMN */}
          <main className="cb-right">
            
            {/* Name + Title */}
            <header className="cb-header-text">
              <h1
                className="cb-name"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                AMANDA SMITH
              </h1>

              <p
                className="cb-title"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                Marketing Specialist
              </p>
            </header>

            {/* Profile Section */}
            <section className="cb-section">
              <h2 className="cb-section-heading" contentEditable={isEditable}>PROFILE</h2>
              <p className="cb-section-paragraph" contentEditable={isEditable}>
                Dynamic marketing specialist with 6+ years of experience in planning and executing
                multi-channel marketing campaigns...
              </p>
            </section>

            {/* Experience Section */}
            <section className="cb-section">
              <h2 className="cb-section-heading" contentEditable={isEditable}>EXPERIENCE</h2>

              {/* Job 1 */}
              <div className="cb-entry">
                <p className="cb-entry-title" contentEditable={isEditable}>
                  Marketing Specialist
                </p>
                <p className="cb-entry-subtitle" contentEditable={isEditable}>
                  XYZ Corporation | 2020 – Present
                </p>
                <ul className="cb-entry-list">
                  <li contentEditable={isEditable}>Led digital campaigns increasing leads by 38%.</li>
                  <li contentEditable={isEditable}>Managed $180K yearly ad spend.</li>
                  <li contentEditable={isEditable}>Conducted market research & analysis.</li>
                  <li contentEditable={isEditable}>Collaborated with creative teams.</li>
                  <li contentEditable={isEditable}>Improved CTR by 27% via A/B testing.</li>
                </ul>
              </div>

              {/* Job 2 */}
              <div className="cb-entry">
                <p className="cb-entry-title" contentEditable={isEditable}>
                  Marketing Coordinator
                </p>
                <p className="cb-entry-subtitle" contentEditable={isEditable}>
                  ABC Company | 2016 – 2020
                </p>
                <ul className="cb-entry-list">
                  <li contentEditable={isEditable}>Boosted engagement by 45%.</li>
                  <li contentEditable={isEditable}>Assisted with digital & print campaigns.</li>
                  <li contentEditable={isEditable}>Analyzed performance & suggested improvements.</li>
                  <li contentEditable={isEditable}>Supported brand initiatives.</li>
                </ul>
              </div>
            </section>

            {/* Certifications */}
            <section className="cb-section">
              <h2 className="cb-section-heading" contentEditable={isEditable}>CERTIFICATIONS</h2>
              <ul className="cb-entry-list">
                <li contentEditable={isEditable}>Google Analytics Certification</li>
                <li contentEditable={isEditable}>Facebook Blueprint Certified</li>
                <li contentEditable={isEditable}>HubSpot Content Marketing Certification</li>
                <li contentEditable={isEditable}>SEO Specialization – Coursera</li>
              </ul>
            </section>

            {/* Tools */}
            <section className="cb-section">
              <h2 className="cb-section-heading" contentEditable={isEditable}>TOOLS & TECHNOLOGIES</h2>
              <ul className="cb-entry-list">
                <li contentEditable={isEditable}>Google Analytics, Ads Manager</li>
                <li contentEditable={isEditable}>Meta Business Suite, LinkedIn Ads</li>
                <li contentEditable={isEditable}>SEMrush, Ahrefs, Moz</li>
                <li contentEditable={isEditable}>HubSpot, Mailchimp</li>
                <li contentEditable={isEditable}>Figma, Canva</li>
              </ul>
            </section>

            {/* Achievements */}
            <section className="cb-section">
              <h2 className="cb-section-heading" contentEditable={isEditable}>ACHIEVEMENTS</h2>
              <ul className="cb-entry-list">
                <li contentEditable={isEditable}>Increased lead quality by 40%.</li>
                <li contentEditable={isEditable}>Reduced cost-per-lead by 22%.</li>
                <li contentEditable={isEditable}>Managed a digital transformation project.</li>
              </ul>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
};

export default CreativeBold;
