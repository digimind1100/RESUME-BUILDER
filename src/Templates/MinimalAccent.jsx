// src/Templates/MinimalAccent.jsx
import React, { useRef, useState } from "react";
import "./MinimalAccent.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const MinimalAccent = () => {
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  // ⭐ EDIT FEATURE
  const [isEditable, setIsEditable] = useState(false);

  // Profile Image Upload
  const [profileImage, setProfileImage] = useState(
    "/images/minimalaccentprofileimage.png"
  );
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

  // Download PDF
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
    pdf.save("minimal-accent-resume.pdf");
  };

  // Reset
  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="ma-wrapper">
      {/* Top Buttons */}
      <div className="ma-buttons">
        <button onClick={handleDownloadPDF}>Download PDF</button>
        <button onClick={() => navigate("/templates")}>
          Back to Templates
        </button>
        <button onClick={handleReset}>Reset</button>

        {/* ⭐ EDIT BUTTON */}
        <button
          onClick={() => setIsEditable(!isEditable)}
          className={isEditable ? "edit-toggle on" : "edit-toggle off"}
        >
          {isEditable ? "Editing: ON" : "Editing: OFF"}
        </button>
      </div>

      {/* A4 Resume Area */}
      <div className="ma-a4" ref={resumeRef}>
        <div className="ma-resume">
          {/* LEFT BLUE SIDEBAR */}
          <aside className="ma-sidebar">
            {/* Profile Photo */}
            <div className="ma-photo-block">
              <div
                className="ma-photo-wrapper"
                onClick={triggerFileSelect}
                title="Click to change photo"
              >
                <img src={profileImage} alt="Profile" className="ma-photo" />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
              </div>
            </div>

            {/* Contact Card */}
            <section className="ma-card">
              <p className="ma-card-line" contentEditable={isEditable}>
                Street Address
              </p>
              <p className="ma-card-line" contentEditable={isEditable}>
                City, State ZIP Code
              </p>
              <p className="ma-card-line" contentEditable={isEditable}>
                (123) 456-7890
              </p>
              <p className="ma-card-line" contentEditable={isEditable}>
                email@address.com
              </p>
            </section>

            {/* Skills */}
            <section className="ma-sidebar-section">
              <h3 className="ma-sidebar-heading" contentEditable={isEditable}>
                SKILLS
              </h3>

              <div className="ma-skill">
                <div className="ma-skill-label" contentEditable={isEditable}>
                  Skill 1
                </div>
                <div className="ma-skill-bar">
                  <div className="ma-skill-fill ma-skill-fill-1" />
                </div>
              </div>

              <div className="ma-skill">
                <div className="ma-skill-label" contentEditable={isEditable}>
                  Skill 2
                </div>
                <div className="ma-skill-bar">
                  <div className="ma-skill-fill ma-skill-fill-2" />
                </div>
              </div>

              <div className="ma-skill">
                <div className="ma-skill-label" contentEditable={isEditable}>
                  Skill 3
                </div>
                <div className="ma-skill-bar">
                  <div className="ma-skill-fill ma-skill-fill-3" />
                </div>
              </div>

              <div className="ma-skill">
                <div className="ma-skill-label" contentEditable={isEditable}>
                  Skill 4
                </div>
                <div className="ma-skill-bar">
                  <div className="ma-skill-fill ma-skill-fill-4" />
                </div>
              </div>
            </section>

            {/* References */}
            <section className="ma-sidebar-section">
              <h3 className="ma-sidebar-heading" contentEditable={isEditable}>
                REFERENCES
              </h3>

              <div className="ma-ref-block">
                <p className="ma-ref-name" contentEditable={isEditable}>
                  James Smith
                </p>
                <p className="ma-ref-line" contentEditable={isEditable}>
                  Job Title – Company Name
                </p>
                <p className="ma-ref-line" contentEditable={isEditable}>
                  Phone / Email
                </p>
              </div>

              <div className="ma-ref-block">
                <p className="ma-ref-name" contentEditable={isEditable}>
                  Sarah Johnson
                </p>
                <p className="ma-ref-line" contentEditable={isEditable}>
                  Job Title – Company Name
                </p>
                <p className="ma-ref-line" contentEditable={isEditable}>
                  Phone / Email
                </p>
              </div>
            </section>
          </aside>

          {/* RIGHT MAIN AREA */}
          <div className="ma-main">
            {/* HEADER */}
            <header className="ma-header">
              <h1 className="ma-name" contentEditable={isEditable}>
                ANNA MARIA
              </h1>
              <p className="ma-title" contentEditable={isEditable}>
                GRAPHIC DESIGNER
              </p>
              <div className="ma-header-line" />
            </header>

            {/* PROFILE */}
            <section className="ma-section">
              <h2 className="ma-section-title" contentEditable={isEditable}>
                PROFILE
              </h2>
              <p className="ma-section-text" contentEditable={isEditable}>
                Ut enim ad minim veniam, quis nostrud exerc. Iure dolor in
                reprehenderit in voluptate velit esse cillum dolore magna
                aliqua...
              </p>
            </section>

            {/* EXPERIENCE */}
            <section className="ma-section">
              <h2 className="ma-section-title" contentEditable={isEditable}>
                EXPERIENCE
              </h2>

              {/* Job 1 */}
              <div className="ma-exp-row">
                <div className="ma-exp-timeline">
                  <div className="ma-exp-node" />
                  <div className="ma-exp-line" />
                </div>

                <div className="ma-exp-content">
                  <p className="ma-exp-title" contentEditable={isEditable}>
                    JOB TITLE – (DEC 2010 – PRESENT)
                  </p>
                  <p className="ma-exp-company" contentEditable={isEditable}>
                    COMPANY NAME – City, Country
                  </p>
                  <p className="ma-section-text" contentEditable={isEditable}>
                    Ut enim ad minim veniam, quis nostrud exerc...
                  </p>
                </div>
              </div>

              {/* Job 2 */}
              <div className="ma-exp-row">
                <div className="ma-exp-timeline">
                  <div className="ma-exp-node" />
                  <div className="ma-exp-line ma-exp-line-short" />
                </div>

                <div className="ma-exp-content">
                  <p className="ma-exp-title" contentEditable={isEditable}>
                    JOB TITLE – (DEC 2006 – 2010)
                  </p>
                  <p className="ma-exp-company" contentEditable={isEditable}>
                    COMPANY NAME – City, Country
                  </p>
                  <p className="ma-section-text" contentEditable={isEditable}>
                    Ut enim ad minim veniam, quis nostrud exerc...
                  </p>
                </div>
              </div>
            </section>

            {/* EDUCATION */}
            <section className="ma-section ma-section-last">
              <h2 className="ma-section-title" contentEditable={isEditable}>
                EDUCATION
              </h2>

              {/* Diploma 1 */}
              <div className="ma-exp-row">
                <div className="ma-exp-timeline">
                  <div className="ma-exp-node" />
                  <div className="ma-exp-line ma-exp-line-short" />
                </div>

                <div className="ma-exp-content">
                  <p className="ma-exp-title" contentEditable={isEditable}>
                    DIPLOMA – (2003–2005)
                  </p>
                  <p className="ma-exp-company" contentEditable={isEditable}>
                    SCHOOL NAME – City, Country
                  </p>
                  <p className="ma-section-text" contentEditable={isEditable}>
                    Ut enim ad minim veniam...
                  </p>
                </div>
              </div>

              {/* Diploma 2 */}
              <div className="ma-exp-row">
                <div className="ma-exp-timeline">
                  <div className="ma-exp-node" />
                  <div className="ma-exp-line ma-exp-line-short" />
                </div>

                <div className="ma-exp-content">
                  <p className="ma-exp-title" contentEditable={isEditable}>
                    DIPLOMA – (2000–2003)
                  </p>
                  <p className="ma-exp-company" contentEditable={isEditable}>
                    SCHOOL NAME – City, Country
                  </p>
                  <p className="ma-section-text" contentEditable={isEditable}>
                    Ut enim ad minim veniam...
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimalAccent;
