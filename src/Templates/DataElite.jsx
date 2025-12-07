// src/Templates/DataElite.jsx
import React, { useRef, useState } from "react";
import "./DataElite.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import QRCode from "qrcode";

export default function DataElite() {
  const navigate = useNavigate();
  const resumeRef = useRef(null);

  /* -------- EDIT TOGGLE -------- */
  const [isEditable, setIsEditable] = useState(false);

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
          onClick={() => setIsEditable(!isEditable)}
          className={isEditable ? "edit-toggle on" : "edit-toggle off"}
        >
          {isEditable ? "Editing: ON" : "Editing: OFF"}
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
                  <span contentEditable={isEditable} className="de-contact-text">
                    laura.williams@datamail.com
                  </span>
                </li>

                <li>
                  <span className="de-icon">{/* phone */}</span>
                  <span contentEditable={isEditable} className="de-contact-text">
                    +1 555-903-4478
                  </span>
                </li>

                <li>
                  <span className="de-icon">{/* location */}</span>
                  <span contentEditable={isEditable} className="de-contact-text">
                    Seattle, WA
                  </span>
                </li>

                <li>
                  <span className="de-icon">{/* LinkedIn */}</span>
                  <span contentEditable={isEditable} className="de-contact-text">
                    linkedin.com/in/lauradata
                  </span>
                </li>

                <li>
                  <span className="de-icon">{/* GitHub */}</span>
                  <span contentEditable={isEditable} className="de-contact-text">
                    github.com/lauradata
                  </span>
                </li>

              </ul>
            </section>

            {/* SKILLS */}
            <section className="de-side-section">
              <h3 className="de-side-heading">CORE SKILLS</h3>
              <ul className="de-side-list">
                <li contentEditable={isEditable}>Exploratory Data Analysis (EDA)</li>
                <li contentEditable={isEditable}>Data Cleaning & Wrangling</li>
                <li contentEditable={isEditable}>Statistical Modeling</li>
                <li contentEditable={isEditable}>A/B Testing & Experimentation</li>
              </ul>
            </section>

            {/* TOOLS */}
            <section className="de-side-section">
              <h3 className="de-side-heading">TOOLS & TECH</h3>
              <ul className="de-side-list">
                <li contentEditable={isEditable}>Python (Pandas, NumPy, SciPy)</li>
                <li contentEditable={isEditable}>SQL (PostgreSQL, BigQuery)</li>
                <li contentEditable={isEditable}>Power BI / Tableau</li>
                <li contentEditable={isEditable}>Scikit-learn, TensorFlow (basic)</li>
              </ul>
            </section>

            {/* CERTIFICATIONS */}
            <section className="de-side-section">
              <h3 className="de-side-heading">CERTIFICATIONS</h3>
              <p className="de-side-text" contentEditable={isEditable}>
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
                <h1 className="de-name" contentEditable={isEditable}>
                  LAURA WILLIAMS
                </h1>

                <p className="de-title" contentEditable={isEditable}>
                  DATA ANALYST & JUNIOR DATA SCIENTIST
                </p>

                <p className="de-tagline" contentEditable={isEditable}>
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
              <h2 className="de-section-title" contentEditable={isEditable}>
                SUMMARY
              </h2>
              <p className="de-section-text" contentEditable={isEditable}>
                Detail-oriented data analyst with 5+ years of experience transforming datasets...
              </p>
            </section>

            {/* EXPERIENCE */}
            <section className="de-section">
              <h2 className="de-section-title" contentEditable={isEditable}>
                EXPERIENCE
              </h2>

              {/* JOB 1 */}
              <div className="de-job">
                <div className="de-job-header">
                  <div>
                    <p className="de-job-title" contentEditable={isEditable}>Senior Data Analyst</p>
                    <p className="de-job-company" contentEditable={isEditable}>
                      InsightLabs Analytics — Seattle, WA
                    </p>
                  </div>
                  <p className="de-job-dates" contentEditable={isEditable}>2021 – Present</p>
                </div>

                <ul className="de-job-list">
                  <li contentEditable={isEditable}>Designed dashboards improving decisions by 40%.</li>
                  <li contentEditable={isEditable}>Built SQL models & Python scripts.</li>
                  <li contentEditable={isEditable}>Led A/B tests with statistically sound insights.</li>
                  <li contentEditable={isEditable}>Reduced reporting errors by 25%.</li>
                </ul>
              </div>

              {/* JOB 2 */}
              <div className="de-job">
                <div className="de-job-header">
                  <div>
                    <p className="de-job-title" contentEditable={isEditable}>Data Analyst</p>
                    <p className="de-job-company" contentEditable={isEditable}>
                      Northline Retail Group — Portland, OR
                    </p>
                  </div>
                  <p className="de-job-dates" contentEditable={isEditable}>2018 – 2021</p>
                </div>

                <ul className="de-job-list">
                  <li contentEditable={isEditable}>
                    Developed Power BI dashboards used in 50+ locations.
                  </li>
                  <li contentEditable={isEditable}>
                    Analyzed customer behavior improving margins by 8%.
                  </li>
                  <li contentEditable={isEditable}>
                    Reduced stockouts via forecasting models.
                  </li>
                </ul>
              </div>

            </section>

            {/* PROJECTS */}
            <section className="de-section">
              <h2 className="de-section-title" contentEditable={isEditable}>
                SELECTED PROJECTS
              </h2>

              <div className="de-project">
                <p className="de-project-title" contentEditable={isEditable}>
                  Customer Churn Prediction Model
                </p>
                <p className="de-project-text" contentEditable={isEditable}>
                  Built Python ML models achieving 86% ROC-AUC...
                </p>
              </div>

              <div className="de-project">
                <p className="de-project-title" contentEditable={isEditable}>
                  Executive KPI Dashboard
                </p>
                <p className="de-project-text" contentEditable={isEditable}>
                  Designed BI dashboards cutting reporting time by 10+ hours/week.
                </p>
              </div>
            </section>

            {/* METHODS */}
            <section className="de-section">
              <h2 className="de-section-title" contentEditable={isEditable}>
                METHODS & TOOLKIT
              </h2>
              <p className="de-section-text" contentEditable={isEditable}>
                SQL, Python, BI Tools, ETL, A/B Testing, Visualization...
              </p>
            </section>

            {/* EDUCATION */}
            <section className="de-section de-last">
              <h2 className="de-section-title" contentEditable={isEditable}>
                EDUCATION
              </h2>

              <div className="de-edu-item">
                <p className="de-edu-degree" contentEditable={isEditable}>
                  M.S. in Data Science
                </p>
                <p className="de-edu-meta" contentEditable={isEditable}>
                  University of Washington — 2016–2018
                </p>
              </div>

              <div className="de-edu-item">
                <p className="de-edu-degree" contentEditable={isEditable}>
                  B.S. in Statistics
                </p>
                <p className="de-edu-meta" contentEditable={isEditable}>
                  Oregon State University — 2012–2016
                </p>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
