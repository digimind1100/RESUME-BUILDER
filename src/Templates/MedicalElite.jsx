import React, { useState, useRef } from "react";
import "./MedicalElite.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

//payment start 
import usePaymentGuard from "../hooks/usePaymentGuard";
import PaymentGate from "../components/payment/PaymentGate";
import { useAuth } from "../context/AuthContext";
//end
import Watermark from "../components/Watermark";


export default function MedicalElites() {
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  const {
    isPaid,
    showPaymentModal,
    setShowPaymentModal,
    requirePayment,
    handlePaymentSuccess,
  } = usePaymentGuard("MedicalElite"); // 🔴 TEMPLATE NAME

  const canEdit = isPaid;


  const [profileImage, setProfileImage] = useState("/images/medicalelitesprofileimage.png");
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
  if (!canEdit) return; // 🔒 safety

  const file = e.target.files[0];
  if (!file) return;

  setProfileImage(URL.createObjectURL(file));
};


  const triggerFileSelect = () => fileInputRef.current.click();

  const handleDownloadPDF = async () => {
    const element = resumeRef.current;
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
    pdf.save("medical-elite-resume.pdf");
  };

  const handleReset = () => window.location.reload();

  return (
    <div className="me-wrapper">
      {/* TOP BUTTONS */}
      <div className="me-buttons">
        <button onClick={handleDownloadPDF}>Download PDF</button>
        <button onClick={() => navigate("/templates")}>Back to Templates</button>
        <button onClick={handleReset}>Reset</button>

        {/* EDIT TOGGLE BUTTON */}
        {/* payment start  */}
        <button
          className={canEdit ? "edit-btn on" : "edit-btn off"}
          onClick={() => {
            if (!requirePayment()) return;
          }}
        >
          {canEdit ? "Editing: ON" : "Editing: OFF"}
        </button>
        {/* end   */}

      </div>

      {/* A4 PAGE */}
      <div className="me-a4" ref={resumeRef} style={{ position: "relative" }}>
        <Watermark show={!canEdit} />

        <div className="me-resume">


          {/* LEFT SIDEBAR */}
          <aside className="me-sidebar">

          {/* PROFILE IMAGE (PREMIUM LOCKED) */}
<div
  className={`me-photo-wrapper ${!canEdit ? "locked" : ""}`}
  onClick={() => {
    if (!requirePayment()) return; // unpaid → payment modal
    triggerFileSelect();           // paid → file picker
  }}
  title={canEdit ? "Click to change photo" : "Unlock to change photo"}
>
  <img src={profileImage} alt="Profile" className="me-photo" />
  <input
    type="file"
    accept="image/*"
    ref={fileInputRef}
    style={{ display: "none" }}
    onChange={handleImageUpload}
  />
</div>


            <h1 className="me-name" contentEditable={canEdit} suppressContentEditableWarning>
              DR. EMMA WILLIAMS
            </h1>

            <p className="me-role" contentEditable={canEdit} suppressContentEditableWarning>
              CONSULTANT CARDIOLOGIST
            </p>

            {/* CONTACT */}
            <section className="me-section">
              <h3 className="me-section-title">CONTACT</h3>
              <ul className="me-list">

                <li>
                  <span className="me-icon">
                    {/* Phone SVG */}
                    <svg width="16" height="16" fill="#0066cc" viewBox="0 0 24 24">
                      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V21a1 1 0 01-1 1C10.52 22 2 13.48 2 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z" />
                    </svg>
                  </span>
                  <span contentEditable={canEdit} suppressContentEditableWarning>
                    +1 (555) 245-8890
                  </span>
                </li>

                <li>
                  <span className="me-icon">
                    {/* Email SVG */}
                    <svg width="16" height="16" fill="#0066cc" viewBox="0 0 24 24">
                      <path d="M4 4h16a2 2 0 012 2v1l-10 6L2 7V6a2 2 0 012-2z" />
                      <path d="M2 8l10 6 10-6v10a2 2 0 01-2 2H4a2 2 0 01-2-2V8z" />
                    </svg>
                  </span>
                  <span contentEditable={canEdit} suppressContentEditableWarning>
                    dr.emma.williams@mail.com
                  </span>
                </li>

                <li>
                  <span className="me-icon">
                    {/* Location SVG */}
                    <svg width="16" height="16" fill="#0066cc" viewBox="0 0 24 24">
                      <path d="M12 2a7 7 0 017 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 017-7zm0 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    </svg>
                  </span>
                  <span contentEditable={canEdit} suppressContentEditableWarning>
                    New York, USA
                  </span>
                </li>

                <li>
                  <span className="me-icon">
                    {/* Globe SVG */}
                    <svg width="16" height="16" fill="#0066cc" viewBox="0 0 24 24">
                      <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 18c-2.12-2.37-3.5-5.68-3.5-9s1.38-6.63 3.5-9c2.12 2.37 3.5 5.68 3.5 9s-1.38 6.63-3.5 9z" />
                      <path d="M2 12h20" stroke="#0066cc" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <span contentEditable={canEdit} suppressContentEditableWarning>
                    www.doctoremma.com
                  </span>
                </li>

              </ul>
            </section>

            {/* SPECIALTIES */}
            <section className="me-section">
              <h3 className="me-section-title">SPECIALTIES</h3>
              <ul className="me-list">
                <li contentEditable={canEdit}>Cardiac Diagnostics & Imaging</li>
                <li contentEditable={canEdit}>Heart Failure Management</li>
                <li contentEditable={canEdit}>Coronary Artery Disease</li>
                <li contentEditable={canEdit}>Post-Operative Cardiac Care</li>
                <li contentEditable={canEdit}>Arrhythmia & ECG Interpretation</li>
              </ul>
            </section>

            {/* CERTIFICATIONS */}
            <section className="me-section">
              <h3 className="me-section-title">CERTIFICATIONS</h3>
              <ul className="me-list">
                <li contentEditable={canEdit}>Advanced Cardiac Life Support (ACLS)</li>
                <li contentEditable={canEdit}>Basic Life Support (BLS)</li>
                <li contentEditable={canEdit}>Board Certified – Cardiology</li>
                <li contentEditable={canEdit}>USMLE Step 1, 2 & 3 Passed</li>
              </ul>
            </section>

            {/* MEMBERSHIPS */}
            <section className="me-section">
              <h3 className="me-section-title">MEMBERSHIPS</h3>
              <ul className="me-list">
                <li contentEditable={canEdit}>American Heart Association (AHA)</li>
                <li contentEditable={canEdit}>American College of Cardiology (ACC)</li>
              </ul>
            </section>

          </aside>

          {/* RIGHT SIDE */}
          <main className="me-main">

            {/* SUMMARY */}
            <section className="me-block">
              <h2 className="me-block-title">SUMMARY</h2>
              <p className="me-block-text" contentEditable={canEdit} suppressContentEditableWarning>
                Dedicated and compassionate cardiologist with over 12 years of clinical experience
                handling complex cardiovascular cases. Expertise includes advanced heart diagnostics,
                emergency cardiac care, patient counseling, and developing long-term treatment plans.
              </p>
            </section>

            {/* EXPERIENCE */}
            <section className="me-block">
              <h2 className="me-block-title">EXPERIENCE</h2>

              <div className="me-job">
                <div className="me-job-header">
                  <h3 contentEditable={canEdit}>Senior Consultant Cardiologist</h3>
                  <p contentEditable={canEdit}>2018 – Present</p>
                </div>
                <p className="me-job-location" contentEditable={canEdit}>New York Heart Institute</p>

                <ul className="me-job-list">
                  <li contentEditable={canEdit}>Managed emergency cardiac interventions.</li>
                  <li contentEditable={canEdit}>Performed catheterizations & stress tests.</li>
                  <li contentEditable={canEdit}>Developed long-term rehabilitation plans.</li>
                  <li contentEditable={canEdit}>Led conferences & awareness workshops.</li>
                  <li contentEditable={canEdit}>Worked in pre/post-operative cardiac care.</li>
                </ul>
              </div>

              <div className="me-job">
                <div className="me-job-header">
                  <h3 contentEditable={canEdit}>Cardiology Resident</h3>
                  <p contentEditable={canEdit}>2014 – 2018</p>
                </div>
                <p className="me-job-location" contentEditable={canEdit}>Mercy General Hospital</p>

                <ul className="me-job-list">
                  <li contentEditable={canEdit}>Assisted in cardiac surgeries & ICU care.</li>
                  <li contentEditable={canEdit}>Followed chronic heart-disease patients.</li>
                  <li contentEditable={canEdit}>Performed ECG, Echo & treadmill tests.</li>
                  <li contentEditable={canEdit}>Conducted patient education sessions.</li>
                </ul>
              </div>
            </section>

            {/* RESEARCH */}
            <section className="me-block">
              <h2 className="me-block-title">RESEARCH & PUBLICATIONS</h2>
              <ul className="me-job-list">
                <li contentEditable={canEdit}>“Modern Approaches to Hypertension Treatment” – 2022</li>
                <li contentEditable={canEdit}>Research on early detection of heart failure – 2021</li>
                <li contentEditable={canEdit}>Contributor to Cardiology Today Journal</li>
              </ul>
            </section>

            {/* EDUCATION */}
            <section className="me-block me-last">
              <h2 className="me-block-title">EDUCATION</h2>

              <div className="me-edu">
                <p className="me-edu-title" contentEditable={canEdit}>
                  Doctor of Medicine (MD) – Cardiology
                </p>
                <p className="me-edu-meta" contentEditable={canEdit}>
                  Harvard Medical School — 2010 – 2014
                </p>
              </div>

              <div className="me-edu">
                <p className="me-edu-title" contentEditable={canEdit}>
                  Bachelor of Science in Biology
                </p>
                <p className="me-edu-meta" contentEditable={canEdit}>
                  University of California — 2006 – 2010
                </p>
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
  );
}
