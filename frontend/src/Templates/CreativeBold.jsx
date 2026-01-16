import React, { useRef, useState } from "react";
import "./CreativeBold.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import usePaymentGuard from "../hooks/usePaymentGuard";
import PaymentGate from "../components/payment/PaymentGate";
import { useAuth } from "../context/AuthContext";
import Watermark from "../components/Watermark";


const CreativeBold = () => {
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  const {
    isPaid,
    showPaymentModal,
    setShowPaymentModal,
    requirePayment,
    handlePaymentSuccess,
  } = usePaymentGuard("CreativeBold"); // 🔴 TEMPLATE NAME

  const canEdit = isPaid;


  /* ===== EDIT MODE TOGGLE ===== */

  // ----- Profile Image Upload -----
  const [profileImage, setProfileImage] = useState("/images/creativeboldimage.png");
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
          className={canEdit ? "edit-btn on" : "edit-btn off"}
          onClick={() => {
            if (!requirePayment()) return;
          }}
        >
          {canEdit ? "Editing: ON" : "Editing: OFF"}
           {!canEdit && <span className="edit-crown">👑</span>}
        </button>
      </div>

      {/* A4 Resume Area */}
      <div className="cb-a4" ref={resumeRef} style={{ position: "relative" }}>
        <Watermark show={!canEdit} />
        <div className="cb-resume">


          {/* LEFT RED COLUMN */}
          <aside className="cb-left">

            {/* Profile Image */}
            <div
              className={`cb-photo-wrapper ${!canEdit ? "locked" : ""}`}
              onClick={triggerFileSelect}
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
                contentEditable={canEdit}
                suppressContentEditableWarning
              >
                MARKETING SPECIALIST
              </h2>
            </div>

            {/* Skills */}
            <section className="cb-left-section">
              <h3 className="cb-left-heading" contentEditable={canEdit} suppressContentEditableWarning>
                SKILLS
              </h3>
              <ul className="cb-left-list">
                <li contentEditable={canEdit} suppressContentEditableWarning>SEO and SEM</li>
                <li contentEditable={canEdit} suppressContentEditableWarning>Content Marketing</li>
                <li contentEditable={canEdit} suppressContentEditableWarning>Social Media Management</li>
                <li contentEditable={canEdit} suppressContentEditableWarning>Analytics & Reporting</li>
              </ul>
            </section>

            {/* Contact */}
            <section className="cb-left-section">
              <h3 className="cb-left-heading" contentEditable={canEdit} suppressContentEditableWarning>
                CONTACT
              </h3>
              <div className="cb-left-contact">
                <p contentEditable={canEdit} suppressContentEditableWarning>123-456-7860</p>
                <p contentEditable={canEdit} suppressContentEditableWarning>amanda.smith@mail.com</p>
                <p contentEditable={canEdit} suppressContentEditableWarning>Los Angeles, CA</p>
              </div>
            </section>
          </aside>

          {/* RIGHT WHITE COLUMN */}
          <main className="cb-right">

            {/* Name + Title */}
            <header className="cb-header-text">
              <h1
                className="cb-name"
                contentEditable={canEdit}
                suppressContentEditableWarning
              >
                AMANDA SMITH
              </h1>

              <p
                className="cb-title"
                contentEditable={canEdit}
                suppressContentEditableWarning
              >
                Marketing Specialist
              </p>
            </header>

            {/* Profile Section */}
            <section className="cb-section">
              <h2 className="cb-section-heading" contentEditable={canEdit}>PROFILE</h2>
              <p className="cb-section-paragraph" contentEditable={canEdit}>
                Dynamic marketing specialist with 6+ years of experience in planning and executing
                multi-channel marketing campaigns...
              </p>
            </section>

            {/* Experience Section */}
            <section className="cb-section">
              <h2 className="cb-section-heading" contentEditable={canEdit}>EXPERIENCE</h2>

              {/* Job 1 */}
              <div className="cb-entry">
                <p className="cb-entry-title" contentEditable={canEdit}>
                  Marketing Specialist
                </p>
                <p className="cb-entry-subtitle" contentEditable={canEdit}>
                  XYZ Corporation | 2020 – Present
                </p>
                <ul className="cb-entry-list">
                  <li contentEditable={canEdit}>Led digital campaigns increasing leads by 38%.</li>
                  <li contentEditable={canEdit}>Managed $180K yearly ad spend.</li>
                  <li contentEditable={canEdit}>Conducted market research & analysis.</li>
                  <li contentEditable={canEdit}>Collaborated with creative teams.</li>
                  <li contentEditable={canEdit}>Improved CTR by 27% via A/B testing.</li>
                </ul>
              </div>

              {/* Job 2 */}
              <div className="cb-entry">
                <p className="cb-entry-title" contentEditable={canEdit}>
                  Marketing Coordinator
                </p>
                <p className="cb-entry-subtitle" contentEditable={canEdit}>
                  ABC Company | 2016 – 2020
                </p>
                <ul className="cb-entry-list">
                  <li contentEditable={canEdit}>Boosted engagement by 45%.</li>
                  <li contentEditable={canEdit}>Assisted with digital & print campaigns.</li>
                  <li contentEditable={canEdit}>Analyzed performance & suggested improvements.</li>
                  <li contentEditable={canEdit}>Supported brand initiatives.</li>
                </ul>
              </div>
            </section>

            {/* Certifications */}
            <section className="cb-section">
              <h2 className="cb-section-heading" contentEditable={canEdit}>CERTIFICATIONS</h2>
              <ul className="cb-entry-list">
                <li contentEditable={canEdit}>Google Analytics Certification</li>
                <li contentEditable={canEdit}>Facebook Blueprint Certified</li>
                <li contentEditable={canEdit}>HubSpot Content Marketing Certification</li>
                <li contentEditable={canEdit}>SEO Specialization – Coursera</li>
              </ul>
            </section>

            {/* Tools */}
            <section className="cb-section">
              <h2 className="cb-section-heading" contentEditable={canEdit}>TOOLS & TECHNOLOGIES</h2>
              <ul className="cb-entry-list">
                <li contentEditable={canEdit}>Google Analytics, Ads Manager</li>
                <li contentEditable={canEdit}>Meta Business Suite, LinkedIn Ads</li>
                <li contentEditable={canEdit}>SEMrush, Ahrefs, Moz</li>
                <li contentEditable={canEdit}>HubSpot, Mailchimp</li>
                <li contentEditable={canEdit}>Figma, Canva</li>
              </ul>
            </section>

            {/* Achievements */}
            <section className="cb-section">
              <h2 className="cb-section-heading" contentEditable={canEdit}>ACHIEVEMENTS</h2>
              <ul className="cb-entry-list">
                <li contentEditable={canEdit}>Increased lead quality by 40%.</li>
                <li contentEditable={canEdit}>Reduced cost-per-lead by 22%.</li>
                <li contentEditable={canEdit}>Managed a digital transformation project.</li>
              </ul>
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
  );
};

export default CreativeBold;
