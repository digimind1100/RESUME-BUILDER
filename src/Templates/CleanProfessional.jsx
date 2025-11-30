import React, { useState, useRef } from "react";
import "./CleanProfessional.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const CleanProfessional = () => {
  const resumeRef = useRef(null);
  const navigate = useNavigate();

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
              <h1 className="cp-name" contentEditable suppressContentEditableWarning>
                ANTHONY ROBERTS
              </h1>

              <p className="cp-title" contentEditable suppressContentEditableWarning>
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
                <h3 className="cp-sidebar-heading" contentEditable>PROFILE SUMMARY</h3>
                <div className="cp-heading-underline" />
                <p className="cp-sidebar-text" contentEditable>
                  Dynamic senior project manager with expertise in planning,
                  leading, and delivering complex initiatives on time and within
                  budget.
                </p>
              </section>

              <section className="cp-sidebar-section">
                <h3 className="cp-sidebar-heading" contentEditable>EDUCATION</h3>
                <div className="cp-heading-underline" />

                <div className="cp-edu-entry">
                  <p className="cp-edu-degree" contentEditable>
                    Master of Business Admin.
                  </p>
                  <p className="cp-edu-year" contentEditable>2011</p>
                </div>

                <div className="cp-edu-entry">
                  <p className="cp-edu-degree" contentEditable>
                    Bachelor of Science in Business Management
                  </p>
                  <p className="cp-edu-year" contentEditable>2013</p>
                </div>
              </section>

              <section className="cp-sidebar-section">
                <h3 className="cp-sidebar-heading" contentEditable>SKILLS</h3>
                <div className="cp-heading-underline" />

                <ul className="cp-skill-list">
                  <li contentEditable>Project Planning & Execution</li>
                  <li contentEditable>Risk Management</li>
                  <li contentEditable>Budget Management</li>
                  <li contentEditable>Team Leadership</li>
                  <li contentEditable>Agile & Scrum</li>
                </ul>
              </section>
            </aside>

            {/* RIGHT MAIN CONTENT */}
            <main className="cp-main">
              <section className="cp-contact">
                <div className="cp-contact-row">
                  <span className="cp-contact-icon">📞</span>
                  <span className="cp-contact-text" contentEditable>
                    +1 254-878-9700
                  </span>
                </div>

                <div className="cp-contact-row">
                  <span className="cp-contact-icon">✉️</span>
                  <span className="cp-contact-text" contentEditable>
                    anthony.roberta@email.com
                  </span>
                </div>

                <div className="cp-contact-row">
                  <span className="cp-contact-icon">📍</span>
                  <span className="cp-contact-text" contentEditable>
                    New York, NY
                  </span>
                </div>

                <div className="cp-contact-row">
                  <span className="cp-contact-icon">in</span>
                  <span className="cp-contact-text" contentEditable>
                    linkedin.com/in/anthonyroberts
                  </span>
                </div>
              </section>

              {/* EXPERIENCE */}
              <section className="cp-section">
                <h2 className="cp-section-title" contentEditable>EXPERIENCE</h2>
                <div className="cp-section-underline" />

                <div className="cp-job">
                  <div className="cp-job-header">
                    <div className="cp-job-title-wrapper">
                      <h3 className="cp-job-title" contentEditable>
                        Senior Project Manager
                      </h3>
                      <p className="cp-job-company" contentEditable>Company Name</p>
                    </div>
                    <p className="cp-job-dates" contentEditable>2018 – Present</p>
                  </div>

                  <ul className="cp-job-list">
                    <li contentEditable>
                      Lead cross-functional teams to plan, execute, and deliver strategic projects.
                    </li>
                    <li contentEditable>
                      Ensure project scope, timelines, and budgets are met.
                    </li>
                    <li contentEditable>
                      Drive improvements to optimize performance.
                    </li>
                  </ul>
                </div>

                <div className="cp-job">
                  <div className="cp-job-header">
                    <div className="cp-job-title-wrapper">
                      <h3 className="cp-job-title" contentEditable>Project Manager</h3>
                      <p className="cp-job-company" contentEditable>Company Name</p>
                    </div>
                    <p className="cp-job-dates" contentEditable>2014 – 2018</p>
                  </div>

                  <ul className="cp-job-list">
                    <li contentEditable>
                      Managed multiple projects from concept through completion.
                    </li>
                    <li contentEditable>
                      Coordinated with vendors and stakeholders.
                    </li>
                  </ul>
                </div>

                <div className="cp-job">
                  <div className="cp-job-header">
                    <div className="cp-job-title-wrapper">
                      <h3 className="cp-job-title" contentEditable>
                        Assistant Project Manager
                      </h3>
                      <p className="cp-job-company" contentEditable>Company Name</p>
                    </div>
                    <p className="cp-job-dates" contentEditable>2011 – 2014</p>
                  </div>

                  <ul className="cp-job-list">
                    <li contentEditable>
                      Assisted senior project managers with scheduling and documentation.
                    </li>
                    <li contentEditable>
                      Maintained timelines and deliverables.
                    </li>
                  </ul>
                </div>
              </section>

              {/* EDUCATION */}
              <section className="cp-section">
                <h2 className="cp-section-title" contentEditable>EDUCATION</h2>
                <div className="cp-section-underline" />

                <div className="cp-edu-main-entry">
                  <p className="cp-edu-main-degree" contentEditable>
                    Master of Business Administration
                  </p>
                  <p className="cp-edu-main-year" contentEditable>2011</p>
                </div>

                <div className="cp-edu-main-entry">
                  <p className="cp-edu-main-degree" contentEditable>
                    Bachelor of Science in Business Management
                  </p>
                  <p className="cp-edu-main-year" contentEditable>2008</p>
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
