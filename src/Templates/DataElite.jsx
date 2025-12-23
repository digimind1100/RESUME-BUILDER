// src/Templates/DataElite.jsx
import React, { useRef, useState } from "react";
import "./DataElite.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import QRCode from "qrcode";

import usePaymentGuard from "../hooks/usePaymentGuard";
import PaymentGate from "../components/payment/PaymentGate";
import { useAuth } from "../context/AuthContext";


export default function DataElite() {
  const navigate = useNavigate();
  const resumeRef = useRef(null);

 const { user, setUser } = useAuth();

const {
  isPaid,
  showPaymentModal,
  setShowPaymentModal,
  requirePayment,
  handlePaymentSuccess,
} = usePaymentGuard("DataElite"); // 🔴 TEMPLATE NAME

const canEdit = isPaid;


  /* -------- PROFILE IMAGE UPLOAD -------- */
  const [profileImage, setProfileImage] = useState(
    "/images/creativeboldimage.png"
  );
  const profileInputRef = useRef(null);

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileImage(URL.createObjectURL(file));
  };

  const triggerProfileSelect = () => {
    if (profileInputRef.current) profileInputRef.current.click();
  };

  /* -------- QR CODE GENERATION -------- */
  const [qrContent, setQrContent] = useState(
    "https://your-portfolio-or-dashboard-link.com"
  );
  const [qrDataUrl, setQrDataUrl] = useState("");

  const handleGenerateQR = async () => {
    try {
      const url = await QRCode.toDataURL(qrContent || "https://example.com");
      setQrDataUrl(url);
    } catch (err) {
      console.error("QR generation error:", err);
      alert("QR Code create karte waqt error aaya. Console check karein.");
    }
  };

  /* -------- DOWNLOAD PDF -------- */
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
    pdf.save("data-elite-resume.pdf");
  };

  const handleReset = () => window.location.reload();

  return (
    <div className="de-wrapper">
      {/* ========== TOP BUTTONS ========== */}
      <div className="de-buttons">
        <button onClick={handleDownloadPDF}>Download PDF</button>
        <button onClick={() => navigate("/templates")}>Back to Templates</button>
        <button onClick={handleReset}>Reset</button>

        {/* EDIT BUTTON */}
        <button
  className={canEdit ? "edit-btn on" : "edit-btn off"}
  onClick={() => {
    if (requirePayment()) return;
  }}
>
  {canEdit ? "Editing: ON" : "Editing: OFF"}
</button>

      </div>

      {/* ========== SMALL QR SETTINGS BAR ========== */}
      <div className="de-qr-bar">
        <div className="de-qr-label">
          <strong>QR Code Link</strong>
          <span> (Portfolio / GitHub / Dashboard)</span>
        </div>
        <input
          className="de-qr-input"
          value={qrContent}
          onChange={(e) => setQrContent(e.target.value)}
          placeholder="Paste URL or any text to encode…"
        />
        <button className="de-qr-btn" onClick={handleGenerateQR}>
          Create QR Code
        </button>
      </div>

      {/* ========== A4 RESUME AREA ========== */}
      <div className="de-a4" ref={resumeRef}>
        <div className="de-resume">
          {/* ===== LEFT SIDEBAR ===== */}
          <aside className="de-sidebar">

            {/* Profile image */}
            <div className="de-photo-wrapper" onClick={triggerProfileSelect}>
              <img src={profileImage} alt="Profile" className="de-photo" />
              <input
                type="file"
                accept="image/*"
                ref={profileInputRef}
                style={{ display: "none" }}
                onChange={handleProfileUpload}
              />
            </div>

            {/* CONTACT */}
            <section className="de-side-section">
              <h3 className="de-side-heading">CONTACT</h3>
              <ul className="de-contact-list">

                <li>
                  <span className="de-icon">{/* mail icon */}</span>
                  <span contentEditable={canEdit} className="de-contact-text">
                    laura.williams@datamail.com
                  </span>
                </li>

                <li>
                  <span className="de-icon">{/* phone */}</span>
                  <span contentEditable={canEdit} className="de-contact-text">
                    +1 555-903-4478
                  </span>
                </li>

                <li>
                  <span className="de-icon">{/* location */}</span>
                  <span contentEditable={canEdit} className="de-contact-text">
                    Seattle, WA
                  </span>
                </li>

                <li>
                  <span className="de-icon">{/* LinkedIn */}</span>
                  <span contentEditable={canEdit} className="de-contact-text">
                    linkedin.com/in/lauradata
                  </span>
                </li>

                <li>
                  <span className="de-icon">{/* GitHub */}</span>
                  <span contentEditable={canEdit} className="de-contact-text">
                    github.com/lauradata
                  </span>
                </li>

              </ul>
            </section>

            {/* SKILLS */}
            <section className="de-side-section">
              <h3 className="de-side-heading">CORE SKILLS</h3>
              <ul className="de-side-list">
                <li contentEditable={canEdit}>Exploratory Data Analysis (EDA)</li>
                <li contentEditable={canEdit}>Data Cleaning & Wrangling</li>
                <li contentEditable={canEdit}>Statistical Modeling</li>
                <li contentEditable={canEdit}>A/B Testing & Experimentation</li>
              </ul>
            </section>

            {/* TOOLS */}
            <section className="de-side-section">
              <h3 className="de-side-heading">TOOLS & TECH</h3>
              <ul className="de-side-list">
                <li contentEditable={canEdit}>Python (Pandas, NumPy, SciPy)</li>
                <li contentEditable={canEdit}>SQL (PostgreSQL, BigQuery)</li>
                <li contentEditable={canEdit}>Power BI / Tableau</li>
                <li contentEditable={canEdit}>Scikit-learn, TensorFlow (basic)</li>
              </ul>
            </section>

            {/* CERTIFICATIONS */}
            <section className="de-side-section">
              <h3 className="de-side-heading">CERTIFICATIONS</h3>
              <p className="de-side-text" contentEditable={canEdit}>
                Google Data Analytics Certificate <br />
                Microsoft Power BI Data Analyst <br />
                AWS Cloud Practitioner
              </p>
            </section>

          </aside>

          {/* ===== RIGHT MAIN ===== */}
          <main className="de-main">

            {/* HEADER */}
            <header className="de-header">
              <div className="de-header-left">
                <h1 className="de-name" contentEditable={canEdit}>
                  LAURA WILLIAMS
                </h1>

                <p className="de-title" contentEditable={canEdit}>
                  DATA ANALYST & JUNIOR DATA SCIENTIST
                </p>

                <p className="de-tagline" contentEditable={canEdit}>
                  Turning raw data into clear, actionable insights using Python, SQL & BI tools.
                </p>
              </div>

              <div className="de-header-right">
                {qrDataUrl ? (
                  <img src={qrDataUrl} alt="QR" className="de-header-qr" />
                ) : (
                  <div className="de-header-qr-placeholder">
                    <span>QR</span>
                    <span>Portfolio</span>
                  </div>
                )}
              </div>
            </header>

            {/* SUMMARY */}
            <section className="de-section">
              <h2 className="de-section-title" contentEditable={canEdit}>
                SUMMARY
              </h2>
              <p className="de-section-text" contentEditable={canEdit}>
                Detail-oriented data analyst with 5+ years of experience transforming datasets...
              </p>
            </section>

            {/* EXPERIENCE */}
            <section className="de-section">
              <h2 className="de-section-title" contentEditable={canEdit}>
                EXPERIENCE
              </h2>

              {/* JOB 1 */}
              <div className="de-job">
                <div className="de-job-header">
                  <div>
                    <p className="de-job-title" contentEditable={canEdit}>Senior Data Analyst</p>
                    <p className="de-job-company" contentEditable={canEdit}>
                      InsightLabs Analytics — Seattle, WA
                    </p>
                  </div>
                  <p className="de-job-dates" contentEditable={canEdit}>2021 – Present</p>
                </div>

                <ul className="de-job-list">
                  <li contentEditable={canEdit}>Designed dashboards improving decisions by 40%.</li>
                  <li contentEditable={canEdit}>Built SQL models & Python scripts.</li>
                  <li contentEditable={canEdit}>Led A/B tests with statistically sound insights.</li>
                  <li contentEditable={canEdit}>Reduced reporting errors by 25%.</li>
                </ul>
              </div>

              {/* JOB 2 */}
              <div className="de-job">
                <div className="de-job-header">
                  <div>
                    <p className="de-job-title" contentEditable={canEdit}>Data Analyst</p>
                    <p className="de-job-company" contentEditable={canEdit}>
                      Northline Retail Group — Portland, OR
                    </p>
                  </div>
                  <p className="de-job-dates" contentEditable={canEdit}>2018 – 2021</p>
                </div>

                <ul className="de-job-list">
                  <li contentEditable={canEdit}>
                    Developed Power BI dashboards used in 50+ locations.
                  </li>
                  <li contentEditable={canEdit}>
                    Analyzed customer behavior improving margins by 8%.
                  </li>
                  <li contentEditable={canEdit}>
                    Reduced stockouts via forecasting models.
                  </li>
                </ul>
              </div>

            </section>

            {/* PROJECTS */}
            <section className="de-section">
              <h2 className="de-section-title" contentEditable={canEdit}>
                SELECTED PROJECTS
              </h2>

              <div className="de-project">
                <p className="de-project-title" contentEditable={canEdit}>
                  Customer Churn Prediction Model
                </p>
                <p className="de-project-text" contentEditable={canEdit}>
                  Built Python ML models achieving 86% ROC-AUC...
                </p>
              </div>

              <div className="de-project">
                <p className="de-project-title" contentEditable={canEdit}>
                  Executive KPI Dashboard
                </p>
                <p className="de-project-text" contentEditable={canEdit}>
                  Designed BI dashboards cutting reporting time by 10+ hours/week.
                </p>
              </div>
            </section>

            {/* METHODS */}
            <section className="de-section">
              <h2 className="de-section-title" contentEditable={canEdit}>
                METHODS & TOOLKIT
              </h2>
              <p className="de-section-text" contentEditable={canEdit}>
                SQL, Python, BI Tools, ETL, A/B Testing, Visualization...
              </p>
            </section>

            {/* EDUCATION */}
            <section className="de-section de-last">
              <h2 className="de-section-title" contentEditable={canEdit}>
                EDUCATION
              </h2>

              <div className="de-edu-item">
                <p className="de-edu-degree" contentEditable={canEdit}>
                  M.S. in Data Science
                </p>
                <p className="de-edu-meta" contentEditable={canEdit}>
                  University of Washington — 2016–2018
                </p>
              </div>

              <div className="de-edu-item">
                <p className="de-edu-degree" contentEditable={canEdit}>
                  B.S. in Statistics
                </p>
                <p className="de-edu-meta" contentEditable={canEdit}>
                  Oregon State University — 2012–2016
                </p>
              </div>
            </section>

          </main>

          <PaymentGate
  open={showPaymentModal}
  onClose={() => setShowPaymentModal(false)}
  onSuccess={(user) => {
    setUser(user);              // 🔥 update AuthContext
    handlePaymentSuccess(user); // 🔓 unlock template
  }}
/>

        </div>
      </div>
    </div>
  );
}
