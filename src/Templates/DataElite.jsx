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

  /* -------- PROFILE IMAGE UPLOAD -------- */
  const [profileImage, setProfileImage] = useState(
<<<<<<< HEAD
    "/images/dataelite-profile.png" // yahan apni default image rakh lena
=======
    "/images/Softtechprofileimage.png" // yahan apni default image rakh lena
>>>>>>> dd9e698 (add)
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
                  <span className="de-icon">
                    {/* mail icon */}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z"
                        stroke="#ffffff"
                        strokeWidth="1.4"
                      />
                      <path
                        d="M5 7L12 12L19 7"
                        stroke="#ffffff"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="de-contact-text"
                  >
                    laura.williams@datamail.com
                  </span>
                </li>
                <li>
                  <span className="de-icon">
                    {/* phone */}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 4C5 3.44772 5.44772 3 6 3H9L11 7L9.5 8.5C10.3284 10.3284 11.6716 11.6716 13.5 12.5L15 11L19 13V16C19 16.5523 18.5523 17 18 17C11.9249 17 7 12.0751 7 6C7 5.44772 6.55228 5 6 5C5.44772 5 5 4.55228 5 4Z"
                        fill="#ffffff"
                      />
                    </svg>
                  </span>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="de-contact-text"
                  >
                    +1 555-903-4478
                  </span>
                </li>
                <li>
                  <span className="de-icon">
                    {/* location */}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 3C9.23858 3 7 5.23858 7 8C7 11.866 12 19 12 19C12 19 17 11.866 17 8C17 5.23858 14.7614 3 12 3Z"
                        stroke="#ffffff"
                        strokeWidth="1.4"
                      />
                      <circle cx="12" cy="8" r="2" fill="#ffffff" />
                    </svg>
                  </span>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="de-contact-text"
                  >
                    Seattle, WA
                  </span>
                </li>
                <li>
                  <span className="de-icon">
                    {/* LinkedIn */}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="4"
                        y="4"
                        width="16"
                        height="16"
                        rx="2"
                        stroke="#ffffff"
                        strokeWidth="1.4"
                      />
                      <path
                        d="M8 17V11"
                        stroke="#ffffff"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                      <circle cx="8" cy="8" r="1" fill="#ffffff" />
                      <path
                        d="M13 17V13.5C13 12.6716 13.6716 12 14.5 12C15.3284 12 16 12.6716 16 13.5V17"
                        stroke="#ffffff"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="de-contact-text"
                  >
                    linkedin.com/in/lauradata
                  </span>
                </li>
                <li>
                  <span className="de-icon">
                    {/* GitHub */}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 3C7.58172 3 4 6.58172 4 11C4 14.866 6.68629 18.1016 10.205 18.9773C10.441 19.0182 10.5293 18.87 10.5293 18.7397C10.5293 18.6239 10.5244 18.2879 10.5215 17.808C8.24262 18.302 7.73106 16.8242 7.73106 16.8242C7.52097 16.2152 7.15103 15.9746 7.15103 15.9746C6.62054 15.6061 7.19182 15.6123 7.19182 15.6123C7.78141 15.6523 8.09369 16.2141 8.09369 16.2141C8.61029 17.102 9.44449 16.8477 9.7636 16.7166C9.81458 16.3525 9.96271 16.0957 10.1287 15.9507C8.40901 15.8025 6.60641 15.1758 6.60641 12.5308C6.60641 11.7773 6.87503 11.1543 7.33274 10.6641C7.25851 10.5159 7.01788 9.80078 7.4016 8.84766C7.4016 8.84766 7.9841 8.68359 10.5158 10.1055C11.068 9.95117 11.6636 9.87305 12.2592 9.86914C12.8548 9.87305 13.4504 9.95117 14.0026 10.1055C16.5343 8.68359 17.1168 8.84766 17.1168 8.84766C17.5005 9.80078 17.2599 10.5159 17.1856 10.6641C17.6433 11.1543 17.9119 11.7773 17.9119 12.5308C17.9119 15.1875 16.1054 15.7998 14.3798 15.9448C14.6028 16.1367 14.8048 16.5195 14.8048 17.0918C14.8048 17.9082 14.796 18.5674 14.796 18.7397C14.796 18.8721 14.8814 19.0225 15.1233 18.9773C18.636 18.0986 21.3169 14.866 21.3169 11C21.3169 6.58172 17.7352 3 13.3169 3H12Z"
                        fill="#ffffff"
                      />
                    </svg>
                  </span>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="de-contact-text"
                  >
                    github.com/lauradata
                  </span>
                </li>
              </ul>
            </section>

            {/* SKILLS */}
            <section className="de-side-section">
              <h3 className="de-side-heading">CORE SKILLS</h3>
              <ul className="de-side-list">
                <li contentEditable>Exploratory Data Analysis (EDA)</li>
                <li contentEditable>Data Cleaning &amp; Wrangling</li>
                <li contentEditable>Statistical Modeling</li>
                <li contentEditable>A/B Testing &amp; Experimentation</li>
              </ul>
            </section>

            {/* TOOLS */}
            <section className="de-side-section">
              <h3 className="de-side-heading">TOOLS &amp; TECH</h3>
              <ul className="de-side-list">
                <li contentEditable>Python (Pandas, NumPy, SciPy)</li>
                <li contentEditable>SQL (PostgreSQL, BigQuery)</li>
                <li contentEditable>Power BI / Tableau</li>
                <li contentEditable>Scikit-learn, TensorFlow (basic)</li>
              </ul>
            </section>

            {/* CERTIFICATIONS */}
            <section className="de-side-section">
              <h3 className="de-side-heading">CERTIFICATIONS</h3>
              <p
                className="de-side-text"
                contentEditable
                suppressContentEditableWarning
              >
                Google Data Analytics Professional Certificate
                <br />
                Microsoft Certified: Power BI Data Analyst Associate
                <br />
                AWS Cloud Practitioner (Foundational)
              </p>
            </section>
          </aside>

          {/* ===== RIGHT MAIN ===== */}
          <main className="de-main">
            {/* HEADER with QR on right */}
            <header className="de-header">
              <div className="de-header-left">
                <h1
                  className="de-name"
                  contentEditable
                  suppressContentEditableWarning
                >
                  LAURA WILLIAMS
                </h1>
                <p
                  className="de-title"
                  contentEditable
                  suppressContentEditableWarning
                >
                  DATA ANALYST &amp; JUNIOR DATA SCIENTIST
                </p>
                <p
                  className="de-tagline"
                  contentEditable
                  suppressContentEditableWarning
                >
                  Turning raw data into clear, actionable insights using Python,
                  SQL, and modern BI tools.
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
              <h2 className="de-section-title" contentEditable>
                SUMMARY
              </h2>
              <p
                className="de-section-text"
                contentEditable
                suppressContentEditableWarning
              >
                Detail-oriented data analyst with 5+ years of experience
                transforming complex datasets into clear stories and measurable
                business outcomes. Skilled in SQL, Python, and Power BI with a
                strong focus on building dashboards, analyzing trends, and
                partnering with stakeholders to define KPIs that truly matter.
              </p>
            </section>

            {/* EXPERIENCE */}
            <section className="de-section">
              <h2 className="de-section-title" contentEditable>
                EXPERIENCE
              </h2>

              <div className="de-job">
                <div className="de-job-header">
                  <div>
                    <p
                      className="de-job-title"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      Senior Data Analyst
                    </p>
                    <p
                      className="de-job-company"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      InsightLabs Analytics &mdash; Seattle, WA
                    </p>
                  </div>
                  <p
                    className="de-job-dates"
                    contentEditable
                    suppressContentEditableWarning
                  >
                    2021 &ndash; Present
                  </p>
                </div>
                <ul className="de-job-list">
                  <li contentEditable>
                    Designed and maintained end-to-end dashboards for product
                    and marketing teams, improving decision-making speed by 40%.
                  </li>
                  <li contentEditable>
                    Built SQL data models and Python scripts to consolidate data
                    from CRM, web analytics, and transactional sources.
                  </li>
                  <li contentEditable>
                    Led A/B tests on new product features, providing
                    statistically sound recommendations on roll-out.
                  </li>
                  <li contentEditable>
                    Partnered with stakeholders to define KPIs and data quality
                    checks, reducing reporting errors by 25%.
                  </li>
                </ul>
              </div>

              <div className="de-job">
                <div className="de-job-header">
                  <div>
                    <p
                      className="de-job-title"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      Data Analyst
                    </p>
                    <p
                      className="de-job-company"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      Northline Retail Group &mdash; Portland, OR
                    </p>
                  </div>
                  <p
                    className="de-job-dates"
                    contentEditable
                    suppressContentEditableWarning
                  >
                    2018 &ndash; 2021
                  </p>
                </div>
                <ul className="de-job-list">
                  <li contentEditable>
                    Developed sales and inventory dashboards in Power BI used
                    across 50+ retail locations.
                  </li>
                  <li contentEditable>
                    Analyzed customer behavior and pricing elasticity, helping
                    increase margin by 8% in key product lines.
                  </li>
                  <li contentEditable>
                    Collaborated with finance and operations to forecast demand
                    and reduce stockouts.
                  </li>
                </ul>
              </div>
            </section>

            {/* PROJECTS */}
            <section className="de-section">
              <h2 className="de-section-title" contentEditable>
                SELECTED PROJECTS
              </h2>

              <div className="de-project">
                <p
                  className="de-project-title"
                  contentEditable
                  suppressContentEditableWarning
                >
                  Customer Churn Prediction Model
                </p>
                <p
                  className="de-project-text"
                  contentEditable
                  suppressContentEditableWarning
                >
                  Built a logistic regression and random forest model in Python
                  to predict customer churn for a subscription business.
                  Achieved 86% ROC-AUC and helped create a retention campaign
                  that reduced churn by 12%.
                </p>
              </div>

              <div className="de-project">
                <p
                  className="de-project-title"
                  contentEditable
                  suppressContentEditableWarning
                >
                  Executive KPI Dashboard
                </p>
                <p
                  className="de-project-text"
                  contentEditable
                  suppressContentEditableWarning
                >
                  Designed a Power BI dashboard consolidating revenue, funnel,
                  and product usage metrics into a single view for leadership,
                  reducing manual reporting time by 10+ hours per week.
                </p>
              </div>
            </section>

            {/* TOOLS & METHODS */}
            <section className="de-section">
              <h2 className="de-section-title" contentEditable>
                METHODS &amp; TOOLKIT
              </h2>
              <p
                className="de-section-text"
                contentEditable
                suppressContentEditableWarning
              >
                SQL, Python (Pandas, NumPy, SciPy), Power BI, Tableau,
                Excel (advanced), ETL design, A/B testing, hypothesis testing,
                regression, classification, clustering, data storytelling,
                stakeholder communication, Agile delivery.
              </p>
            </section>

            {/* EDUCATION */}
            <section className="de-section de-last">
              <h2 className="de-section-title" contentEditable>
                EDUCATION
              </h2>
              <div className="de-edu-item">
                <p
                  className="de-edu-degree"
                  contentEditable
                  suppressContentEditableWarning
                >
                  M.S. in Data Science
                </p>
                <p
                  className="de-edu-meta"
                  contentEditable
                  suppressContentEditableWarning
                >
                  University of Washington &mdash; 2016 &ndash; 2018
                </p>
              </div>

              <div className="de-edu-item">
                <p
                  className="de-edu-degree"
                  contentEditable
                  suppressContentEditableWarning
                >
                  B.S. in Statistics
                </p>
                <p
                  className="de-edu-meta"
                  contentEditable
                  suppressContentEditableWarning
                >
                  Oregon State University &mdash; 2012 &ndash; 2016
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
