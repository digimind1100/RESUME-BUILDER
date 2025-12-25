import React, { useState, useRef } from "react";
import "./CleanProfessional.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import usePaymentGuard from "../hooks/usePaymentGuard";
import PaymentGate from "../components/payment/PaymentGate";
import { useAuth } from "../context/AuthContext";
import Watermark from "../components/Watermark";

const CleanProfessional = () => {
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  const {
    isPaid,
    showPaymentModal,
    setShowPaymentModal,
    requirePayment,
    handlePaymentSuccess,
  } = usePaymentGuard("CleanProfessional"); // 🔴 TEMPLATE NAME

  const canEdit = isPaid;
  /* ---------------- EDIT MODE TOGGLE ---------------- */


  /* ---------------- PROFILE IMAGE UPLOAD ---------------- */
  const [profileImage, setProfileImage] = useState("/images/cleanprofileimage.png");
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    if (!canEdit) return; // 🔒 premium guard

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
          className={canEdit ? "edit-btn on" : "edit-btn off"}
          onClick={() => {
            if (!requirePayment()) return;
          }}
        >
          {canEdit ? "Editing: ON" : "Editing: OFF"}
        </button>
      </div>

      {/* ========= A4 RESUME AREA ========= */}
      <div className="cp-a4" ref={resumeRef} style={{ position: "relative" }}>
        <Watermark show={!canEdit} />
        <div className="cp-resume">


          {/* ============= HEADER ============= */}
          <header className="cp-header">

            {/* Profile Photo Left */}
            <div
              className={`cp-photo-wrapper cp-photo-overlap ${!canEdit ? "locked" : ""}`}
              onClick={triggerFileSelect}
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
              <h1 className="cp-name" contentEditable={canEdit} suppressContentEditableWarning>
                ANTHONY ROBERTS
              </h1>

              <p className="cp-title" contentEditable={canEdit} suppressContentEditableWarning>
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
                <h3 className="cp-sidebar-heading" contentEditable={canEdit}>PROFILE SUMMARY</h3>
                <div className="cp-heading-underline" />
                <p className="cp-sidebar-text" contentEditable={canEdit}>
                  Dynamic senior project manager with expertise in planning,
                  leading, and delivering complex initiatives on time and within
                  budget.
                </p>
              </section>

              <section className="cp-sidebar-section">
                <h3 className="cp-sidebar-heading" contentEditable={canEdit}>EDUCATION</h3>
                <div className="cp-heading-underline" />

                <div className="cp-edu-entry">
                  <p className="cp-edu-degree" contentEditable={canEdit}>
                    Master of Business Admin.
                  </p>
                  <p className="cp-edu-year" contentEditable={canEdit}>2011</p>
                </div>

                <div className="cp-edu-entry">
                  <p className="cp-edu-degree" contentEditable={canEdit}>
                    Bachelor of Science in Business Management
                  </p>
                  <p className="cp-edu-year" contentEditable={canEdit}>2013</p>
                </div>
              </section>

              <section className="cp-sidebar-section">
                <h3 className="cp-sidebar-heading" contentEditable={canEdit}>SKILLS</h3>
                <div className="cp-heading-underline" />

                <ul className="cp-skill-list">
                  <li contentEditable={canEdit}>Project Planning & Execution</li>
                  <li contentEditable={canEdit}>Risk Management</li>
                  <li contentEditable={canEdit}>Budget Management</li>
                  <li contentEditable={canEdit}>Team Leadership</li>
                  <li contentEditable={canEdit}>Agile & Scrum</li>
                </ul>
              </section>
            </aside>

            {/* RIGHT MAIN CONTENT */}
            <main className="cp-main">
              <section className="cp-contact">
                <div className="cp-contact-row">
                  <span className="cp-contact-icon">📞</span>
                  <span className="cp-contact-text" contentEditable={canEdit}>
                    +1 254-878-9700
                  </span>
                </div>

                <div className="cp-contact-row">
                  <span className="cp-contact-icon">✉️</span>
                  <span className="cp-contact-text" contentEditable={canEdit}>
                    anthony.roberta@email.com
                  </span>
                </div>

                <div className="cp-contact-row">
                  <span className="cp-contact-icon">📍</span>
                  <span className="cp-contact-text" contentEditable={canEdit}>
                    New York, NY
                  </span>
                </div>

                <div className="cp-contact-row">
                  <span className="cp-contact-icon">in</span>
                  <span className="cp-contact-text" contentEditable={canEdit}>
                    linkedin.com/in/anthonyroberts
                  </span>
                </div>
              </section>

              {/* EXPERIENCE */}
              <section className="cp-section">
                <h2 className="cp-section-title" contentEditable={canEdit}>EXPERIENCE</h2>
                <div className="cp-section-underline" />

                <div className="cp-job">
                  <div className="cp-job-header">
                    <div className="cp-job-title-wrapper">
                      <h3 className="cp-job-title" contentEditable={canEdit}>
                        Senior Project Manager
                      </h3>
                      <p className="cp-job-company" contentEditable={canEdit}>Company Name</p>
                    </div>
                    <p className="cp-job-dates" contentEditable={canEdit}>2018 – Present</p>
                  </div>

                  <ul className="cp-job-list">
                    <li contentEditable={canEdit}>
                      Lead cross-functional teams to plan, execute, and deliver strategic projects.
                    </li>
                    <li contentEditable={canEdit}>
                      Ensure project scope, timelines, and budgets are met.
                    </li>
                    <li contentEditable={canEdit}>
                      Drive improvements to optimize performance.
                    </li>
                  </ul>
                </div>

                <div className="cp-job">
                  <div className="cp-job-header">
                    <div className="cp-job-title-wrapper">
                      <h3 className="cp-job-title" contentEditable={canEdit}>Project Manager</h3>
                      <p className="cp-job-company" contentEditable={canEdit}>Company Name</p>
                    </div>
                    <p className="cp-job-dates" contentEditable={canEdit}>2014 – 2018</p>
                  </div>

                  <ul className="cp-job-list">
                    <li contentEditable={canEdit}>
                      Managed multiple projects from concept through completion.
                    </li>
                    <li contentEditable={canEdit}>
                      Coordinated with vendors and stakeholders.
                    </li>
                  </ul>
                </div>

                <div className="cp-job">
                  <div className="cp-job-header">
                    <div className="cp-job-title-wrapper">
                      <h3 className="cp-job-title" contentEditable={canEdit}>
                        Assistant Project Manager
                      </h3>
                      <p className="cp-job-company" contentEditable={canEdit}>Company Name</p>
                    </div>
                    <p className="cp-job-dates" contentEditable={canEdit}>2011 – 2014</p>
                  </div>

                  <ul className="cp-job-list">
                    <li contentEditable={canEdit}>
                      Assisted senior project managers with scheduling and documentation.
                    </li>
                    <li contentEditable={canEdit}>
                      Maintained timelines and deliverables.
                    </li>
                  </ul>
                </div>
              </section>

              {/* EDUCATION */}
              <section className="cp-section">
                <h2 className="cp-section-title" contentEditable={canEdit}>EDUCATION</h2>
                <div className="cp-section-underline" />

                <div className="cp-edu-main-entry">
                  <p className="cp-edu-main-degree" contentEditable={canEdit}>
                    Master of Business Administration
                  </p>
                  <p className="cp-edu-main-year" contentEditable={canEdit}>2011</p>
                </div>

                <div className="cp-edu-main-entry">
                  <p className="cp-edu-main-degree" contentEditable={canEdit}>
                    Bachelor of Science in Business Management
                  </p>
                  <p className="cp-edu-main-year" contentEditable={canEdit}>2008</p>
                </div>
              </section>
            </main>
            <PaymentGate
              open={showPaymentModal}
              onClose={() => setShowPaymentModal(false)}
              onSuccess={handlePaymentSuccess}
            />

          </div>

        </div>
      </div>
    </div>
  );
};

export default CleanProfessional;
