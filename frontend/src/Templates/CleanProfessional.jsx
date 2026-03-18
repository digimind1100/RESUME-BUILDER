import React, { useState, useRef } from "react";
import "./CleanProfessional.css";
import TemplateLayout from "./TemplateLayout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const CleanProfessional = () => {
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  
  /* ---------------- PROFILE IMAGE UPLOAD ---------------- */
  const [profileImage, setProfileImage] = useState("/images/cleanprofileimage.png");
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    if (!!(canEdit && isEditable)) return; // 🔒 premium guard

    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };
  const triggerFileSelect = () => {
    if (!!(canEdit && isEditable)) {
      requirePayment(); // 🔥 open payment modal
      return;
    }

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  /* ---------------- RESET PAGE ---------------- */
  const handleReset = () => {
    window.location.reload();
  };

  return (
    <TemplateLayout
      templateId="CleanProfessional"
      wrapperClass="cp-wrapper"
      resumeClass="cp-resume"
    >

      {({ canEdit, isEditable, pdfRef, requirePayment }) => (
        <div className="cp-wrapper">

          {/* ========= A4 RESUME AREA ========= */}
          <div className="cp-a4" ref={pdfRef} style={{ position: "relative" }}>
            <div className="cp-resume" contentEditable={true}>


              {/* ============= HEADER ============= */}
              <header className="cp-header">

                {/* Profile Photo Left */}
                <div
                  className={`cp-photo-wrapper cp-photo-overlap ${!canEdit ? "locked" : ""}`}
                  onClick={() => {

                    // free user → open payment modal
                    if (!canEdit) {
                      if (requirePayment) requirePayment();
                      return;
                    }

                    // paid but editing OFF
                    if (!isEditable) return;

                    // paid + editing ON
                    if (fileInputRef.current) {
                      fileInputRef.current.click();
                    }

                  }}
                  title={!canEdit ? "Unlock to change profile image" : "Click to change photo"}
                >
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
                  <h1 className="cp-name" contentEditable={!(canEdit && isEditable)} suppressContentEditableWarning>
                    ANTHONY ROBERTS
                  </h1>

                  <p className="cp-title" contentEditable={!(canEdit && isEditable)} suppressContentEditableWarning>
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
                    <h3 className="cp-sidebar-heading" contentEditable={!(canEdit && isEditable)}>PROFILE SUMMARY</h3>
                    <div className="cp-heading-underline" />
                    <p className="cp-sidebar-text" contentEditable={!(canEdit && isEditable)}>
                      Dynamic senior project manager with expertise in planning,
                      leading, and delivering complex initiatives on time and within
                      budget.
                    </p>
                  </section>

                  <section className="cp-sidebar-section">
                    <h3 className="cp-sidebar-heading" contentEditable={!(canEdit && isEditable)}>EDUCATION</h3>
                    <div className="cp-heading-underline" />

                    <div className="cp-edu-entry">
                      <p className="cp-edu-degree" contentEditable={!(canEdit && isEditable)}>
                        Master of Business Admin.
                      </p>
                      <p className="cp-edu-year" contentEditable={!(canEdit && isEditable)}>2011</p>
                    </div>

                    <div className="cp-edu-entry">
                      <p className="cp-edu-degree" contentEditable={!(canEdit && isEditable)}>
                        Bachelor of Science in Business Management
                      </p>
                      <p className="cp-edu-year" contentEditable={!(canEdit && isEditable)}>2013</p>
                    </div>
                  </section>

                  <section className="cp-sidebar-section">
                    <h3 className="cp-sidebar-heading" contentEditable={!(canEdit && isEditable)}>SKILLS</h3>
                    <div className="cp-heading-underline" />

                    <ul className="cp-skill-list">
                      <li contentEditable={!(canEdit && isEditable)}>Project Planning & Execution</li>
                      <li contentEditable={!(canEdit && isEditable)}>Risk Management</li>
                      <li contentEditable={!(canEdit && isEditable)}>Budget Management</li>
                      <li contentEditable={!(canEdit && isEditable)}>Team Leadership</li>
                      <li contentEditable={!(canEdit && isEditable)}>Agile & Scrum</li>
                    </ul>
                  </section>
                </aside>

                {/* RIGHT MAIN CONTENT */}
                <main className="cp-main">
                  <section className="cp-contact">
                    <div className="cp-contact-row">
                      <span className="cp-contact-icon">📞</span>
                      <span className="cp-contact-text" contentEditable={!(canEdit && isEditable)}>
                        +1 254-878-9700
                      </span>
                    </div>

                    <div className="cp-contact-row">
                      <span className="cp-contact-icon">✉️</span>
                      <span className="cp-contact-text" contentEditable={!(canEdit && isEditable)}>
                        anthony.roberta@email.com
                      </span>
                    </div>

                    <div className="cp-contact-row">
                      <span className="cp-contact-icon">📍</span>
                      <span className="cp-contact-text" contentEditable={!(canEdit && isEditable)}>
                        New York, NY
                      </span>
                    </div>

                    <div className="cp-contact-row">
                      <span className="cp-contact-icon">in</span>
                      <span className="cp-contact-text" contentEditable={!(canEdit && isEditable)}>
                        linkedin.com/in/anthonyroberts
                      </span>
                    </div>
                  </section>

                  {/* EXPERIENCE */}
                  <section className="cp-section">
                    <h2 className="cp-section-title" contentEditable={!(canEdit && isEditable)}>EXPERIENCE</h2>
                    <div className="cp-section-underline" />

                    <div className="cp-job">
                      <div className="cp-job-header">
                        <div className="cp-job-title-wrapper">
                          <h3 className="cp-job-title" contentEditable={!(canEdit && isEditable)}>
                            Senior Project Manager
                          </h3>
                          <p className="cp-job-company" contentEditable={!(canEdit && isEditable)}>Company Name</p>
                        </div>
                        <p className="cp-job-dates" contentEditable={!(canEdit && isEditable)}>2018 – Present</p>
                      </div>

                      <ul className="cp-job-list">
                        <li contentEditable={!(canEdit && isEditable)}>
                          Lead cross-functional teams to plan, execute, and deliver strategic projects.
                        </li>
                        <li contentEditable={!(canEdit && isEditable)}>
                          Ensure project scope, timelines, and budgets are met.
                        </li>
                        <li contentEditable={!(canEdit && isEditable)}>
                          Drive improvements to optimize performance.
                        </li>
                      </ul>
                    </div>

                    <div className="cp-job">
                      <div className="cp-job-header">
                        <div className="cp-job-title-wrapper">
                          <h3 className="cp-job-title" contentEditable={!(canEdit && isEditable)}>Project Manager</h3>
                          <p className="cp-job-company" contentEditable={!(canEdit && isEditable)}>Company Name</p>
                        </div>
                        <p className="cp-job-dates" contentEditable={!(canEdit && isEditable)}>2014 – 2018</p>
                      </div>

                      <ul className="cp-job-list">
                        <li contentEditable={!(canEdit && isEditable)}>
                          Managed multiple projects from concept through completion.
                        </li>
                        <li contentEditable={!(canEdit && isEditable)}>
                          Coordinated with vendors and stakeholders.
                        </li>
                      </ul>
                    </div>

                    <div className="cp-job">
                      <div className="cp-job-header">
                        <div className="cp-job-title-wrapper">
                          <h3 className="cp-job-title" contentEditable={!(canEdit && isEditable)}>
                            Assistant Project Manager
                          </h3>
                          <p className="cp-job-company" contentEditable={!(canEdit && isEditable)}>Company Name</p>
                        </div>
                        <p className="cp-job-dates" contentEditable={!(canEdit && isEditable)}>2011 – 2014</p>
                      </div>

                      <ul className="cp-job-list">
                        <li contentEditable={!(canEdit && isEditable)}>
                          Assisted senior project managers with scheduling and documentation.
                        </li>
                        <li contentEditable={!(canEdit && isEditable)}>
                          Maintained timelines and deliverables.
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* EDUCATION */}
                  <section className="cp-section">
                    <h2 className="cp-section-title" contentEditable={!(canEdit && isEditable)}>EDUCATION</h2>
                    <div className="cp-section-underline" />

                    <div className="cp-edu-main-entry">
                      <p className="cp-edu-main-degree" contentEditable={!(canEdit && isEditable)}>
                        Master of Business Administration
                      </p>
                      <p className="cp-edu-main-year" contentEditable={!(canEdit && isEditable)}>2011</p>
                    </div>

                    <div className="cp-edu-main-entry">
                      <p className="cp-edu-main-degree" contentEditable={!(canEdit && isEditable)}>
                        Bachelor of Science in Business Management
                      </p>
                      <p className="cp-edu-main-year" contentEditable={!(canEdit && isEditable)}>2008</p>
                    </div>
                  </section>
                </main>
              </div>
            </div>
          </div>
        </div>
      )
      }
    </TemplateLayout>
  );
};

export default CleanProfessional;
