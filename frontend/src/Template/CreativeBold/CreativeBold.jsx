import React, { useRef, useState } from "react";
import "./CreativeBold.css";
import TemplateLayout from "../TemplateLayout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";



const CreativeBold = () => {
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  // ----- Profile Image Upload -----
  const [profileImage, setProfileImage] = useState("/images/creativeboldimage.png");
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
          templateId="CreativeBold"
          wrapperClass="cb-wrapper"
          resumeClass="cb-resume"
        >
          {({ canEdit, isEditable, pdfRef, requirePayment }) => (
    <div className="cb-wrapper">


      {/* A4 Resume Area */}
      <div className="resume-a4 cb-a4" ref={pdfRef} style={{ position: "relative" }}>
      
        <div className="cb-resume">
          {/* LEFT RED COLUMN */}
          <aside className="cb-left">

            {/* Profile Image */}
            <div
              className={`cb-photo-wrapper ${!canEdit ? "locked" : ""}`}
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
                contentEditable={canEdit && isEditable}
                suppressContentEditableWarning
                style={{ WebkitUserSelect: "text" }}

              >
                MARKETING SPECIALIST
              </h2>
            </div>

            {/* Skills */}
            <section className="cb-left-section">
              <h3 className="cb-left-heading" contentEditable={canEdit && isEditable} suppressContentEditableWarning>
                SKILLS
              </h3>
              <ul className="cb-left-list">
                <li contentEditable={canEdit && isEditable} suppressContentEditableWarning style={{ WebkitUserSelect: "text" }}
>SEO and SEM</li>
                <li contentEditable={canEdit && isEditable} suppressContentEditableWarning style={{ WebkitUserSelect: "text" }}
>Content Marketing</li>
                <li contentEditable={canEdit && isEditable} suppressContentEditableWarning style={{ WebkitUserSelect: "text" }}
>Social Media Management</li>
                <li contentEditable={canEdit && isEditable} suppressContentEditableWarning style={{ WebkitUserSelect: "text" }}
>Analytics & Reporting</li>
              </ul>
            </section>

            {/* Contact */}
            <section className="cb-left-section">
              <h3 className="cb-left-heading" contentEditable={canEdit && isEditable} suppressContentEditableWarning>
                CONTACT
              </h3>
              <div className="cb-left-contact">
                <p contentEditable={canEdit && isEditable} suppressContentEditableWarning>123-456-7860</p>
                <p contentEditable={canEdit && isEditable} suppressContentEditableWarning>amanda.smith@mail.com</p>
                <p contentEditable={canEdit && isEditable} suppressContentEditableWarning>Los Angeles, CA</p>
              </div>
            </section>
          </aside>

          {/* RIGHT WHITE COLUMN */}
          <main className="cb-right">

            {/* Name + Title */}
            <header className="cb-header-text">
              <h1
                className="cb-name"
                contentEditable={canEdit && isEditable}
                suppressContentEditableWarning
              >
                AMANDA SMITH
              </h1>

              <p
                className="cb-title"
                contentEditable={canEdit && isEditable}
                suppressContentEditableWarning
              >
                Marketing Specialist
              </p>
            </header>

            {/* Profile Section */}
            <section className="cb-section">
              <h2 className="cb-section-heading" contentEditable={canEdit && isEditable}>PROFILE</h2>
              <p className="cb-section-paragraph" contentEditable={canEdit && isEditable}>
                Dynamic marketing specialist with 6+ years of experience in planning and executing
                multi-channel marketing campaigns...
              </p>
            </section>

            {/* Experience Section */}
            <section className="cb-section">
              <h2 className="cb-section-heading" contentEditable={canEdit && isEditable}>EXPERIENCE</h2>

              {/* Job 1 */}
              <div className="cb-entry">
                <p className="cb-entry-title" contentEditable={canEdit && isEditable}>
                  Marketing Specialist
                </p>
                <p className="cb-entry-subtitle" contentEditable={canEdit && isEditable}>
                  XYZ Corporation | 2020 – Present
                </p>
                <ul className="cb-entry-list">
                  <li contentEditable={canEdit && isEditable}>Led digital campaigns increasing leads by 38%.</li>
                  <li contentEditable={canEdit && isEditable}>Managed $180K yearly ad spend.</li>
                  <li contentEditable={canEdit && isEditable}>Conducted market research & analysis.</li>
                  <li contentEditable={canEdit && isEditable}>Collaborated with creative teams.</li>
                  <li contentEditable={canEdit && isEditable}>Improved CTR by 27% via A/B testing.</li>
                </ul>
              </div>

              {/* Job 2 */}
              <div className="cb-entry">
                <p className="cb-entry-title" contentEditable={canEdit && isEditable}>
                  Marketing Coordinator
                </p>
                <p className="cb-entry-subtitle" contentEditable={canEdit && isEditable}>
                  ABC Company | 2016 – 2020
                </p>
                <ul className="cb-entry-list">
                  <li contentEditable={canEdit && isEditable}>Boosted engagement by 45%.</li>
                  <li contentEditable={canEdit && isEditable}>Assisted with digital & print campaigns.</li>
                  <li contentEditable={canEdit && isEditable}>Analyzed performance & suggested improvements.</li>
                  <li contentEditable={canEdit && isEditable}>Supported brand initiatives.</li>
                </ul>
              </div>
            </section>

            {/* Certifications */}
            <section className="cb-section">
              <h2 className="cb-section-heading" contentEditable={canEdit && isEditable}>CERTIFICATIONS</h2>
              <ul className="cb-entry-list">
                <li contentEditable={canEdit && isEditable}>Google Analytics Certification</li>
                <li contentEditable={canEdit && isEditable}>Facebook Blueprint Certified</li>
                <li contentEditable={canEdit && isEditable}>HubSpot Content Marketing Certification</li>
                <li contentEditable={canEdit && isEditable}>SEO Specialization – Coursera</li>
              </ul>
            </section>

            {/* Tools */}
            <section className="cb-section">
              <h2 className="cb-section-heading" contentEditable={canEdit && isEditable}>TOOLS & TECHNOLOGIES</h2>
              <ul className="cb-entry-list">
                <li contentEditable={canEdit && isEditable}>Google Analytics, Ads Manager</li>
                <li contentEditable={canEdit && isEditable}>Meta Business Suite, LinkedIn Ads</li>
                <li contentEditable={canEdit && isEditable}>SEMrush, Ahrefs, Moz</li>
                <li contentEditable={canEdit && isEditable}>HubSpot, Mailchimp</li>
                <li contentEditable={canEdit && isEditable}>Figma, Canva</li>
              </ul>
            </section>

            {/* Achievements */}
            <section className="cb-section">
              <h2 className="cb-section-heading" contentEditable={canEdit && isEditable}>ACHIEVEMENTS</h2>
              <ul className="cb-entry-list">
                <li contentEditable={canEdit && isEditable}>Increased lead quality by 40%.</li>
                <li contentEditable={canEdit && isEditable}>Reduced cost-per-lead by 22%.</li>
                <li contentEditable={canEdit && isEditable}>Managed a digital transformation project.</li>
              </ul>
            </section>
          </main>
        </div>
      </div>
    </div>
    )
          }
        </TemplateLayout>
  );
};

export default CreativeBold;
