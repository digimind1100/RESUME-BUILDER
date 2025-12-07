import React, { useState, useRef } from "react";
import "./CleanProfessional.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const CleanProfessional = () => {
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  /* ---------------- EDIT MODE TOGGLE ---------------- */
  const [isEditable, setIsEditable] = useState(false);

  /* ---------------- PROFILE IMAGE UPLOAD ---------------- */
  const [profileImage, setProfileImage] = useState("/images/cleanprofileimage.png");
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  /* ---------------- DOWNLOAD PDF ---------------- */
  const handleDownloadPDF = async () => {
    const element = resumeRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
    pdf.save("clean-professional-resume.pdf");
  };

  /* ---------------- RESET PAGE ---------------- */
  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="cp-wrapper">

      {/* ========= TOP BUTTONS ========= */}
      <div className="cp-buttons">
        <button onClick={handleDownloadPDF}>Download PDF</button>
        <button onClick={() => navigate("/templates")}>Back to Templates</button>
        <button onClick={handleReset}>Reset</button>

        {/* --- EDIT TOGGLE BUTTON --- */}
        <button
          onClick={() => setIsEditable(!isEditable)}
          className={isEditable ? "edit-toggle on" : "edit-toggle off"}
        >
          {isEditable ? "Editing: ON" : "Editing: OFF"}
        </button>
      </div>

      {/* ========= A4 RESUME AREA ========= */}
      <div className="clean-professional-a4" ref={resumeRef}>
        <div className="clean-professional-resume">

          {/* ============= HEADER ============= */}
          <header className="cp-header">

            {/* Profile Photo Left */}
            <div className="cp-photo-wrapper cp-photo-overlap" onClick={triggerFileSelect}>
              <img src={profileImage} alt="Profile" className="cp-photo" />

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </div>

            {/* Name + Title Right */}
            <div className="cp-header-text">
              <h1 className="cp-name" contentEditable={isEditable} suppressContentEditableWarning>
                ANTHONY ROBERTS
              </h1>

              <p className="cp-title" contentEditable={isEditable} suppressContentEditableWarning>
                Senior Project Manager
              </p>
            </div>

          </header>

          {/* Blue Divider */}
          <div className="cp-header-divider"></div>

          {/* ============= BODY ============= */}
          <div className="cp-body">

            {/* LEFT SIDEBAR */}
            <aside className="cp-sidebar">
              <section className="cp-sidebar-section">
                <h3 className="cp-sidebar-heading" contentEditable={isEditable}>PROFILE SUMMARY</h3>
                <div className="cp-heading-underline" />
                <p className="cp-sidebar-text" contentEditable={isEditable}>
                  Dynamic senior project manager with expertise in planning,
                  leading, and delivering complex initiatives on time and within
                  budget.
                </p>
              </section>

              <section className="cp-sidebar-section">
                <h3 className="cp-sidebar-heading" contentEditable={isEditable}>EDUCATION</h3>
                <div className="cp-heading-underline" />

                <div className="cp-edu-entry">
                  <p className="cp-edu-degree" contentEditable={isEditable}>
                    Master of Business Admin.
                  </p>
                  <p className="cp-edu-year" contentEditable={isEditable}>2011</p>
                </div>

                <div className="cp-edu-entry">
                  <p className="cp-edu-degree" contentEditable={isEditable}>
                    Bachelor of Science in Business Management
                  </p>
                  <p className="cp-edu-year" contentEditable={isEditable}>2013</p>
                </div>
              </section>

              <section className="cp-sidebar-section">
                <h3 className="cp-sidebar-heading" contentEditable={isEditable}>SKILLS</h3>
                <div className="cp-heading-underline" />

                <ul className="cp-skill-list">
                  <li contentEditable={isEditable}>Project Planning & Execution</li>
                  <li contentEditable={isEditable}>Risk Management</li>
                  <li contentEditable={isEditable}>Budget Management</li>
                  <li contentEditable={isEditable}>Team Leadership</li>
                  <li contentEditable={isEditable}>Agile & Scrum</li>
                </ul>
              </section>
            </aside>

            {/* RIGHT MAIN CONTENT */}
            <main className="cp-main">
              <section className="cp-contact">
                <div className="cp-contact-row">
                  <span className="cp-contact-icon">📞</span>
                  <span className="cp-contact-text" contentEditable={isEditable}>
                    +1 254-878-9700
                  </span>
                </div>

                <div className="cp-contact-row">
                  <span className="cp-contact-icon">✉️</span>
                  <span className="cp-contact-text" contentEditable={isEditable}>
                    anthony.roberta@email.com
                  </span>
                </div>

                <div className="cp-contact-row">
                  <span className="cp-contact-icon">📍</span>
                  <span className="cp-contact-text" contentEditable={isEditable}>
                    New York, NY
                  </span>
                </div>

                <div className="cp-contact-row">
                  <span className="cp-contact-icon">in</span>
                  <span className="cp-contact-text" contentEditable={isEditable}>
                    linkedin.com/in/anthonyroberts
                  </span>
                </div>
              </section>

              {/* EXPERIENCE */}
              <section className="cp-section">
                <h2 className="cp-section-title" contentEditable={isEditable}>EXPERIENCE</h2>
                <div className="cp-section-underline" />

                <div className="cp-job">
                  <div className="cp-job-header">
                    <div className="cp-job-title-wrapper">
                      <h3 className="cp-job-title" contentEditable={isEditable}>
                        Senior Project Manager
                      </h3>
                      <p className="cp-job-company" contentEditable={isEditable}>Company Name</p>
                    </div>
                    <p className="cp-job-dates" contentEditable={isEditable}>2018 – Present</p>
                  </div>

                  <ul className="cp-job-list">
                    <li contentEditable={isEditable}>
                      Lead cross-functional teams to plan, execute, and deliver strategic projects.
                    </li>
                    <li contentEditable={isEditable}>
                      Ensure project scope, timelines, and budgets are met.
                    </li>
                    <li contentEditable={isEditable}>
                      Drive improvements to optimize performance.
                    </li>
                  </ul>
                </div>

                <div className="cp-job">
                  <div className="cp-job-header">
                    <div className="cp-job-title-wrapper">
                      <h3 className="cp-job-title" contentEditable={isEditable}>Project Manager</h3>
                      <p className="cp-job-company" contentEditable={isEditable}>Company Name</p>
                    </div>
                    <p className="cp-job-dates" contentEditable={isEditable}>2014 – 2018</p>
                  </div>

                  <ul className="cp-job-list">
                    <li contentEditable={isEditable}>
                      Managed multiple projects from concept through completion.
                    </li>
                    <li contentEditable={isEditable}>
                      Coordinated with vendors and stakeholders.
                    </li>
                  </ul>
                </div>

                <div className="cp-job">
                  <div className="cp-job-header">
                    <div className="cp-job-title-wrapper">
                      <h3 className="cp-job-title" contentEditable={isEditable}>
                        Assistant Project Manager
                      </h3>
                      <p className="cp-job-company" contentEditable={isEditable}>Company Name</p>
                    </div>
                    <p className="cp-job-dates" contentEditable={isEditable}>2011 – 2014</p>
                  </div>

                  <ul className="cp-job-list">
                    <li contentEditable={isEditable}>
                      Assisted senior project managers with scheduling and documentation.
                    </li>
                    <li contentEditable={isEditable}>
                      Maintained timelines and deliverables.
                    </li>
                  </ul>
                </div>
              </section>

              {/* EDUCATION */}
              <section className="cp-section">
                <h2 className="cp-section-title" contentEditable={isEditable}>EDUCATION</h2>
                <div className="cp-section-underline" />

                <div className="cp-edu-main-entry">
                  <p className="cp-edu-main-degree" contentEditable={isEditable}>
                    Master of Business Administration
                  </p>
                  <p className="cp-edu-main-year" contentEditable={isEditable}>2011</p>
                </div>

                <div className="cp-edu-main-entry">
                  <p className="cp-edu-main-degree" contentEditable={isEditable}>
                    Bachelor of Science in Business Management
                  </p>
                  <p className="cp-edu-main-year" contentEditable={isEditable}>2008</p>
                </div>
              </section>
            </main>

          </div>

        </div>
      </div>
    </div>
  );
};

export default CleanProfessional;
