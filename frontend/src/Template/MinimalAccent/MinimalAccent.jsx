// src/Templates/MinimalAccent.jsx
import React, { useRef, useState } from "react";
import "./MinimalAccent.css";
import TemplateLayout from "../TemplateLayout";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
// end

const MinimalAccent = () => {
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  // for payment start
  const { user, setUser } = useAuth();


   // Profile Image
  const [profileImage, setProfileImage] = useState(
    "/images/minimalaccentprofileimage.png"
  );
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    if (!canEdit && isEditable) return; // 🔒 premium guard

    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };


  const triggerFileSelect = () => {
    if (!canEdit) {
      requirePayment(); // 🔥 open payment modal
      return;
    }

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  return (
    <TemplateLayout
          templateId="MinimalAccent"
          wrapperClass="ma-wrapper"
          resumeClass="ma-resume"
        >
          {({ canEdit, isEditable, pdfRef, requirePayment }) => (
    <div className="ma-wrapper">
      {/* A4 Resume Area */}
      <div className="resume-a4 ma-a4" ref={pdfRef} style={{ position: "relative" }}>
  <div className="ma-resume">
          {/* LEFT BLUE SIDEBAR */}
          <aside className="ma-sidebar">
              {/* Profile Photo */}
            <div
              className={`ma-photo-wrapper ${!canEdit ? "locked" : ""}`}
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

            {/* Contact Card */}
            <section className="ma-card">
              <p className="ma-card-line" contentEditable={canEdit && isEditable}>
                Street Address
              </p>
              <p className="ma-card-line" contentEditable={canEdit && isEditable}>
                City, State ZIP Code
              </p>
              <p className="ma-card-line" contentEditable={canEdit && isEditable}>
                (123) 456-7890
              </p>
              <p className="ma-card-line" contentEditable={canEdit && isEditable}>
                email@address.com
              </p>
            </section>

            {/* Skills */}
            <section className="ma-sidebar-section">
              <h3 className="ma-sidebar-heading" contentEditable={canEdit && isEditable}>
                SKILLS
              </h3>

              <div className="ma-skill">
                <div className="ma-skill-label" contentEditable={canEdit && isEditable}>
                  Skill 1
                </div>
                <div className="ma-skill-bar">
                  <div className="ma-skill-fill ma-skill-fill-1" />
                </div>
              </div>

              <div className="ma-skill">
                <div className="ma-skill-label" contentEditable={canEdit && isEditable}>
                  Skill 2
                </div>
                <div className="ma-skill-bar">
                  <div className="ma-skill-fill ma-skill-fill-2" />
                </div>
              </div>

              <div className="ma-skill">
                <div className="ma-skill-label" contentEditable={canEdit && isEditable}>
                  Skill 3
                </div>
                <div className="ma-skill-bar">
                  <div className="ma-skill-fill ma-skill-fill-3" />
                </div>
              </div>

              <div className="ma-skill">
                <div className="ma-skill-label" contentEditable={canEdit && isEditable}>
                  Skill 4
                </div>
                <div className="ma-skill-bar">
                  <div className="ma-skill-fill ma-skill-fill-4" />
                </div>
              </div>
            </section>

            {/* References */}
            <section className="ma-sidebar-section">
              <h3 className="ma-sidebar-heading" contentEditable={canEdit && isEditable}>
                REFERENCES
              </h3>

              <div className="ma-ref-block">
                <p className="ma-ref-name" contentEditable={canEdit && isEditable}>
                  James Smith
                </p>
                <p className="ma-ref-line" contentEditable={canEdit && isEditable}>
                  Job Title – Company Name
                </p>
                <p className="ma-ref-line" contentEditable={canEdit && isEditable}>
                  Phone / Email
                </p>
              </div>

              <div className="ma-ref-block">
                <p className="ma-ref-name" contentEditable={canEdit && isEditable}>
                  Sarah Johnson
                </p>
                <p className="ma-ref-line" contentEditable={canEdit && isEditable}>
                  Job Title – Company Name
                </p>
                <p className="ma-ref-line" contentEditable={canEdit && isEditable}>
                  Phone / Email
                </p>
              </div>
            </section>
          </aside>

          {/* RIGHT MAIN AREA */}
          <div className="ma-main">
            {/* HEADER */}
            <header className="ma-header">
              <h1 className="ma-name" contentEditable={canEdit && isEditable}>
                ANNA MARIA
              </h1>
              <p className="ma-title" contentEditable={canEdit && isEditable}>
                GRAPHIC DESIGNER
              </p>
              <div className="ma-header-line" />
            </header>

            {/* PROFILE */}
            <section className="ma-section">
              <h2 className="ma-section-title" contentEditable={canEdit && isEditable}>
                PROFILE
              </h2>
              <p className="ma-section-text" contentEditable={canEdit && isEditable}>
                Ut enim ad minim veniam, quis nostrud exerc. Iure dolor in
                reprehenderit in voluptate velit esse cillum dolore magna
                aliqua...
              </p>
            </section>

            {/* EXPERIENCE */}
            <section className="ma-section">
              <h2 className="ma-section-title" contentEditable={canEdit && isEditable}>
                EXPERIENCE
              </h2>

              {/* Job 1 */}
              <div className="ma-exp-row">
                <div className="ma-exp-timeline">
                  <div className="ma-exp-node" />
                  <div className="ma-exp-line" />
                </div>

                <div className="ma-exp-content">
                  <p className="ma-exp-title" contentEditable={canEdit && isEditable}>
                    JOB TITLE – (DEC 2010 – PRESENT)
                  </p>
                  <p className="ma-exp-company" contentEditable={canEdit && isEditable}>
                    COMPANY NAME – City, Country
                  </p>
                  <p className="ma-section-text" contentEditable={canEdit && isEditable}>
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
                  <p className="ma-exp-title" contentEditable={canEdit && isEditable}>
                    JOB TITLE – (DEC 2006 – 2010)
                  </p>
                  <p className="ma-exp-company" contentEditable={canEdit && isEditable}>
                    COMPANY NAME – City, Country
                  </p>
                  <p className="ma-section-text" contentEditable={canEdit && isEditable}>
                    Ut enim ad minim veniam, quis nostrud exerc...
                  </p>
                </div>
              </div>
            </section>

            {/* EDUCATION */}
            <section className="ma-section ma-section-last">
              <h2 className="ma-section-title" contentEditable={canEdit && isEditable}>
                EDUCATION
              </h2>

              {/* Diploma 1 */}
              <div className="ma-exp-row">
                <div className="ma-exp-timeline">
                  <div className="ma-exp-node" />
                  <div className="ma-exp-line ma-exp-line-short" />
                </div>

                <div className="ma-exp-content">
                  <p className="ma-exp-title" contentEditable={canEdit && isEditable}>
                    DIPLOMA – (2003–2005)
                  </p>
                  <p className="ma-exp-company" contentEditable={canEdit && isEditable}>
                    SCHOOL NAME – City, Country
                  </p>
                  <p className="ma-section-text" contentEditable={canEdit && isEditable}>
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
                  <p className="ma-exp-title" contentEditable={canEdit && isEditable}>
                    DIPLOMA – (2000–2003)
                  </p>
                  <p className="ma-exp-company" contentEditable={canEdit && isEditable}>
                    SCHOOL NAME – City, Country
                  </p>
                  <p className="ma-section-text" contentEditable={canEdit && isEditable}>
                    Ut enim ad minim veniam...
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
     )
          }
        </TemplateLayout>
  );
};

export default MinimalAccent;
