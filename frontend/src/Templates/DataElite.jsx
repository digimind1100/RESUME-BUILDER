// src/Templates/DataElite.jsx
import React, { useRef, useState } from "react";
import "./DataElite.css";
import TemplateLayout from "./TemplateLayout";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import { useAuth } from "../context/AuthContext";

export default function DataElite() {
  const navigate = useNavigate();
  const resumeRef = useRef(null);

  const { user, setUser } = useAuth();


  /* -------- PROFILE IMAGE UPLOAD -------- */
  const [profileImage, setProfileImage] = useState(
    "/images/creativeboldimage.png"
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

  return (
    <TemplateLayout
      templateId="DataElite"
      wrapperClass="de-wrapper"
      resumeClass="de-resume"
    >
      {({ canEdit, isEditable, pdfRef, requirePayment }) => (
        <div className="de-wrapper">
        
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
          <div className="resume-a4 de-a4" ref={pdfRef} style={{ position: "relative" }}>
            
            <div className="de-resume">

              {/* ===== LEFT SIDEBAR ===== */}
              <aside className="de-sidebar">

                {/* Profile image */}
                <div
                  className={`de-photo-wrapper ${!canEdit && isEditable ? "locked" : ""}`}
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
                  title={canEdit && isEditable ? "Click to change photo" : "Unlock to change photo"}
                >
                  <img src={profileImage} alt="Profile" className="de-photo" />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                  {!canEdit && <div className="de-photo-lock">🔒 Premium</div>}
                </div>
                {/* CONTACT */}
                <section className="de-side-section">
                  <h3 className="de-side-heading">CONTACT</h3>
                  <ul className="de-contact-list">

                    <li>
                      <span className="de-icon">{/* mail icon */}</span>
                      <span contentEditable={canEdit && isEditable} className="de-contact-text">
                        laura.williams@datamail.com
                      </span>
                    </li>

                    <li>
                      <span className="de-icon">{/* phone */}</span>
                      <span contentEditable={canEdit && isEditable} className="de-contact-text">
                        +1 555-903-4478
                      </span>
                    </li>

                    <li>
                      <span className="de-icon">{/* location */}</span>
                      <span contentEditable={canEdit && isEditable} className="de-contact-text">
                        Seattle, WA
                      </span>
                    </li>

                    <li>
                      <span className="de-icon">{/* LinkedIn */}</span>
                      <span contentEditable={canEdit && isEditable} className="de-contact-text">
                        linkedin.com/in/lauradata
                      </span>
                    </li>

                    <li>
                      <span className="de-icon">{/* GitHub */}</span>
                      <span contentEditable={canEdit && isEditable} className="de-contact-text">
                        github.com/lauradata
                      </span>
                    </li>

                  </ul>
                </section>

                {/* SKILLS */}
                <section className="de-side-section">
                  <h3 className="de-side-heading">CORE SKILLS</h3>
                  <ul className="de-side-list">
                    <li contentEditable={canEdit && isEditable}>Exploratory Data Analysis (EDA)</li>
                    <li contentEditable={canEdit && isEditable}>Data Cleaning & Wrangling</li>
                    <li contentEditable={canEdit && isEditable}>Statistical Modeling</li>
                    <li contentEditable={canEdit && isEditable}>A/B Testing & Experimentation</li>
                  </ul>
                </section>

                {/* TOOLS */}
                <section className="de-side-section">
                  <h3 className="de-side-heading">TOOLS & TECH</h3>
                  <ul className="de-side-list">
                    <li contentEditable={canEdit && isEditable}>Python (Pandas, NumPy, SciPy)</li>
                    <li contentEditable={canEdit && isEditable}>SQL (PostgreSQL, BigQuery)</li>
                    <li contentEditable={canEdit && isEditable}>Power BI / Tableau</li>
                    <li contentEditable={canEdit && isEditable}>Scikit-learn, TensorFlow (basic)</li>
                  </ul>
                </section>

                {/* CERTIFICATIONS */}
                <section className="de-side-section">
                  <h3 className="de-side-heading">CERTIFICATIONS</h3>
                  <p className="de-side-text" contentEditable={canEdit && isEditable}>
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
                    <h1 className="de-name" contentEditable={canEdit && isEditable}>
                      LAURA WILLIAMS
                    </h1>

                    <p className="de-title" contentEditable={canEdit && isEditable}>
                      DATA ANALYST & JUNIOR DATA SCIENTIST
                    </p>

                    <p className="de-tagline" contentEditable={canEdit && isEditable}>
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
                  <h2 className="de-section-title" contentEditable={canEdit && isEditable}>
                    SUMMARY
                  </h2>
                  <p className="de-section-text" contentEditable={canEdit && isEditable}>
                    Detail-oriented data analyst with 5+ years of experience transforming datasets...
                  </p>
                </section>

                {/* EXPERIENCE */}
                <section className="de-section">
                  <h2 className="de-section-title" contentEditable={canEdit && isEditable}>
                    EXPERIENCE
                  </h2>

                  {/* JOB 1 */}
                  <div className="de-job">
                    <div className="de-job-header">
                      <div>
                        <p className="de-job-title" contentEditable={canEdit && isEditable}>Senior Data Analyst</p>
                        <p className="de-job-company" contentEditable={canEdit && isEditable}>
                          InsightLabs Analytics — Seattle, WA
                        </p>
                      </div>
                      <p className="de-job-dates" contentEditable={canEdit && isEditable}>2021 – Present</p>
                    </div>

                    <ul className="de-job-list">
                      <li contentEditable={canEdit && isEditable}>Designed dashboards improving decisions by 40%.</li>
                      <li contentEditable={canEdit && isEditable}>Built SQL models & Python scripts.</li>
                      <li contentEditable={canEdit && isEditable}>Led A/B tests with statistically sound insights.</li>
                      <li contentEditable={canEdit && isEditable}>Reduced reporting errors by 25%.</li>
                    </ul>
                  </div>

                  {/* JOB 2 */}
                  <div className="de-job">
                    <div className="de-job-header">
                      <div>
                        <p className="de-job-title" contentEditable={canEdit && isEditable}>Data Analyst</p>
                        <p className="de-job-company" contentEditable={canEdit && isEditable}>
                          Northline Retail Group — Portland, OR
                        </p>
                      </div>
                      <p className="de-job-dates" contentEditable={canEdit && isEditable}>2018 – 2021</p>
                    </div>

                    <ul className="de-job-list">
                      <li contentEditable={canEdit && isEditable}>
                        Developed Power BI dashboards used in 50+ locations.
                      </li>
                      <li contentEditable={canEdit && isEditable}>
                        Analyzed customer behavior improving margins by 8%.
                      </li>
                      <li contentEditable={canEdit && isEditable}>
                        Reduced stockouts via forecasting models.
                      </li>
                    </ul>
                  </div>

                </section>

                {/* PROJECTS */}
                <section className="de-section">
                  <h2 className="de-section-title" contentEditable={canEdit && isEditable}>
                    SELECTED PROJECTS
                  </h2>

                  <div className="de-project">
                    <p className="de-project-title" contentEditable={canEdit && isEditable}>
                      Customer Churn Prediction Model
                    </p>
                    <p className="de-project-text" contentEditable={canEdit && isEditable}>
                      Built Python ML models achieving 86% ROC-AUC...
                    </p>
                  </div>

                  <div className="de-project">
                    <p className="de-project-title" contentEditable={canEdit && isEditable}>
                      Executive KPI Dashboard
                    </p>
                    <p className="de-project-text" contentEditable={canEdit && isEditable}>
                      Designed BI dashboards cutting reporting time by 10+ hours/week.
                    </p>
                  </div>
                </section>

                {/* METHODS */}
                <section className="de-section">
                  <h2 className="de-section-title" contentEditable={canEdit && isEditable}>
                    METHODS & TOOLKIT
                  </h2>
                  <p className="de-section-text" contentEditable={canEdit && isEditable}>
                    SQL, Python, BI Tools, ETL, A/B Testing, Visualization...
                  </p>
                </section>

                {/* EDUCATION */}
                <section className="de-section de-last">
                  <h2 className="de-section-title" contentEditable={canEdit && isEditable}>
                    EDUCATION
                  </h2>

                  <div className="de-edu-item">
                    <p className="de-edu-degree" contentEditable={canEdit && isEditable}>
                      M.S. in Data Science
                    </p>
                    <p className="de-edu-meta" contentEditable={canEdit && isEditable}>
                      University of Washington — 2016–2018
                    </p>
                  </div>

                  <div className="de-edu-item">
                    <p className="de-edu-degree" contentEditable={canEdit && isEditable}>
                      B.S. in Statistics
                    </p>
                    <p className="de-edu-meta" contentEditable={canEdit && isEditable}>
                      Oregon State University — 2012–2016
                    </p>
                  </div>
                </section>
              </main>
            </div>
          </div>
        </div>
      )
      }
    </TemplateLayout>
  );
}
