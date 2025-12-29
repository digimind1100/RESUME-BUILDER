// src/Templates/SoftTech.jsx
import React, { useRef, useState } from "react";
import "./SoftTech.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import QRCode from "qrcode";
import usePaymentGuard from "../hooks/usePaymentGuard";
import PaymentGate from "../components/payment/PaymentGate";
import { useAuth } from "../context/AuthContext";
import Watermark from "../components/Watermark";



export default function SoftTech() {
  const navigate = useNavigate();
  const resumeRef = useRef(null);
  const { user, setUser } = useAuth();

  const {
    isPaid,
    showPaymentModal,
    setShowPaymentModal,
    requirePayment,
    handlePaymentSuccess,
  } = usePaymentGuard("SoftTech");

  const canEdit = isPaid;


  /* ---------- GLOBAL EDIT MODE ---------- */

  /* ---------- PROFILE IMAGE ---------- */
  const [profileImage, setProfileImage] = useState(
    "/images/minimalaccentprofileimage.png"
  );
  const profileInputRef = useRef(null);

  const handleProfileUpload = (e) => {
  if (!canEdit) return;   // extra safety
  const file = e.target.files[0];
  if (file) setProfileImage(URL.createObjectURL(file));
};


  const triggerProfileSelect = () => {
    if (profileInputRef.current) profileInputRef.current.click();
  };

  /* ---------- PERSONAL INFO FORM (QR DATA) ---------- */
  const [info, setInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    zip: "",
    linkedin: "",
    github: "",
    portfolio: "",
  });

  const handleInfoChange = (e) => {
    if (!canEdit) return; // prevent typing when not editable
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------- QR CODE ---------- */
  const [qrDataUrl, setQrDataUrl] = useState("");

  const handleCreateQr = async () => {
    const payload = JSON.stringify(info, null, 0);

    try {
      const url = await QRCode.toDataURL(payload);
      setQrDataUrl(url);
    } catch (err) {
      console.error("QR error:", err);
    }
  };

  /* ---------- DOWNLOAD PDF ---------- */
  const handleDownloadPDF = async () => {
    const element = resumeRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2, useCORS: true });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
    pdf.save("softtech-developer-resume.pdf");
  };

  const handleReset = () => window.location.reload();

  return (
    <div className="st-wrapper">

      {/* ---------- TOP BUTTONS ---------- */}
      <div className="st-buttons">
        <button onClick={handleDownloadPDF}>Download PDF</button>
        <button onClick={() => navigate("/templates")}>Back</button>
        <button onClick={handleReset}>Reset</button>

        {/* EDIT TOGGLE BUTTON */}
        <button
          className={canEdit ? "edit-btn on" : "edit-btn off"}
          onClick={() => {
            if (!requirePayment()) return;
          }}
        >
          {canEdit ? "Editing: ON" : "Editing: OFF"}
        </button>

      </div>

      {/* ---------- PERSONAL INFO FORM (QR) ---------- */}
      <div className="st-form">
        <h3 className="st-form-title" >
          Personal Info (QR Code)
        </h3>

        <div className="st-form-grid">

          <div className="st-form-field">
            <label>Full Name</label>
            <input
              name="fullName"
              value={info.fullName}
              onChange={handleInfoChange}
              disabled={!canEdit}
              placeholder="Emma Roberts"
            />
          </div>

          <div className="st-form-field">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={info.email}
              onChange={handleInfoChange}
              disabled={!canEdit}
              placeholder="emma@mail.com"
            />
          </div>

          <div className="st-form-field">
            <label>Telephone</label>
            <input
              name="phone"
              value={info.phone}
              onChange={handleInfoChange}
              disabled={!canEdit}
              placeholder="+1 555-123-4567"
            />
          </div>

          <div className="st-form-field">
            <label>Address</label>
            <input
              name="address"
              value={info.address}
              onChange={handleInfoChange}
              disabled={!canEdit}
              placeholder="123 Main Street"
            />
          </div>

          <div className="st-form-field">
            <label>State</label>
            <input
              name="state"
              value={info.state}
              onChange={handleInfoChange}
              disabled={!canEdit}
              placeholder="CA"
            />
          </div>

          <div className="st-form-field">
            <label>City</label>
            <input
              name="city"
              value={info.city}
              onChange={handleInfoChange}
              disabled={!canEdit}
              placeholder="San Francisco"
            />
          </div>

          <div className="st-form-field">
            <label>Zip Code</label>
            <input
              name="zip"
              value={info.zip}
              onChange={handleInfoChange}
              disabled={!canEdit}
              placeholder="94105"
            />
          </div>

          <div className="st-form-field">
            <label>LinkedIn</label>
            <input
              name="linkedin"
              value={info.linkedin}
              onChange={handleInfoChange}
              disabled={!canEdit}
              placeholder="linkedin.com/in/username"
            />
          </div>

          <div className="st-form-field">
            <label>GitHub</label>
            <input
              name="github"
              value={info.github}
              onChange={handleInfoChange}
              disabled={!canEdit}
              placeholder="github.com/username"
            />
          </div>

          <div className="st-form-field st-form-full">
            <label>Portfolio</label>
            <input
              name="portfolio"
              value={info.portfolio}
              onChange={handleInfoChange}
              disabled={!canEdit}
              placeholder="https://your-portfolio.com"
            />
          </div>
        </div>

        <div className="st-form-actions">
          <button onClick={handleCreateQr} disabled={!canEdit}>
            Create QR Code
          </button>
        </div>
      </div>

      {/* ---------- A4 RESUME ---------- */}
      <div className="st-a4" ref={resumeRef} style={{ position: "relative" }}>
        <Watermark show={!canEdit} />
        <div className="st-resume">


          {/* ===== LEFT SIDEBAR ===== */}
          <aside className="st-sidebar">

            {/* QR TOP */}
            <div className="st-qr-wrapper">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="QR Code" className="st-qr-image" />
              ) : (
                <div className="st-qr-placeholder" contentEditable={canEdit}>
                  QR CODE
                </div>
              )}
            </div>

            {/* CONTACT */}
            <section className="st-side-section">
              <h3 className="st-side-heading" contentEditable={canEdit}>
                CONTACT
              </h3>

              <ul className="st-contact-list">
                <li>
                  <span className="st-contact-text" contentEditable={canEdit}>
                    +1 555-789-3320
                  </span>
                </li>
                <li>
                  <span className="st-contact-text" contentEditable={canEdit}>
                    emma.roberts@mail.com
                  </span>
                </li>
                <li>
                  <span className="st-contact-text" contentEditable={canEdit}>
                    San Francisco, CA
                  </span>
                </li>
                <li>
                  <span className="st-contact-text" contentEditable={canEdit}>
                    www.emmadev.com
                  </span>
                </li>
              </ul>
            </section>

            {/* SKILLS */}
            <section className="st-side-section">
              <h3 className="st-side-heading" contentEditable={canEdit}>SKILLS</h3>
              <ul className="st-side-list">
                <li contentEditable={canEdit}>JavaScript (ES6+)</li>
                <li contentEditable={canEdit}>React & Next.js</li>
                <li contentEditable={canEdit}>Node.js & Express</li>
                <li contentEditable={canEdit}>REST & GraphQL APIs</li>
              </ul>
            </section>

            {/* TECH STACK */}
            <section className="st-side-section">
              <h3 className="st-side-heading" contentEditable={canEdit}>TECH STACK</h3>
              <ul className="st-side-list">
                <li contentEditable={canEdit}>TypeScript</li>
                <li contentEditable={canEdit}>Python / Django</li>
                <li contentEditable={canEdit}>PostgreSQL, MongoDB</li>
                <li contentEditable={canEdit}>AWS / Docker / CI-CD</li>
              </ul>
            </section>

            {/* CERTIFICATIONS */}
            <section className="st-side-section">
              <h3 className="st-side-heading" contentEditable={canEdit}>CERTIFICATIONS</h3>
              <p className="st-side-text" contentEditable={canEdit}>
                AWS Certified Solutions Architect
                Google Cloud Developer
                Scrum Master (PSM I)
              </p>
            </section>

            {/* QR BOTTOM */}
            <div className="st-qr-wrapper st-qr-bottom">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="QR Code" className="st-qr-image" />
              ) : (
                <div className="st-qr-placeholder" contentEditable={canEdit}>
                  QR CODE
                </div>
              )}
            </div>
          </aside>

          {/* ===== RIGHT MAIN ===== */}
          <main className="st-main">

            {/* HEADER */}
            <header className="st-header">
              <div className="st-header-left">
                <h1 className="st-name" contentEditable={canEdit}>
                  EMMA ROBERTS
                </h1>
                <p className="st-title" contentEditable={canEdit}>
                  FULL STACK DEVELOPER
                </p>
                <div className="st-header-line" />
              </div>

              <div
        className={`st-header-photo ${!canEdit ? "locked" : ""}`}
      onClick={() => {if (!requirePayment()) return; triggerProfileSelect();}}>
        <img src={profileImage} alt="Profile" />
          <input
            type="file"
            accept="image/*"
            ref={profileInputRef}
            style={{ display: "none" }}
            onChange={handleProfileUpload}
       />
             </div>
            </header>

            {/* ABOUT ME */}
            <section className="st-section">
              <h2 className="st-section-title" contentEditable={canEdit}>
                ABOUT ME
              </h2>
              <p className="st-section-text" contentEditable={canEdit}>
                Passionate full stack developer with 7+ years of experience
                designing and implementing scalable applications.
              </p>
            </section>

            {/* EXPERIENCE */}
            <section className="st-section">
              <h2 className="st-section-title" contentEditable={canEdit}>
                EXPERIENCE
              </h2>

              <div className="st-job">
                <div className="st-job-header">
                  <div>
                    <p className="st-job-title" contentEditable={canEdit}>
                      Senior Full Stack Developer
                    </p>
                    <p className="st-job-company" contentEditable={canEdit}>
                      Meta — Menlo Park, CA
                    </p>
                  </div>
                  <p className="st-job-dates" contentEditable={canEdit}>
                    2019 – Present
                  </p>
                </div>

                <ul className="st-job-list">
                  <li contentEditable={canEdit}>Lead development of scalable web apps.</li>
                  <li contentEditable={canEdit}>Collaborated with cross-functional teams.</li>
                  <li contentEditable={canEdit}>Improved app performance by 30%.</li>
                  <li contentEditable={canEdit}>Mentored junior developers.</li>
                </ul>
              </div>

              <div className="st-job">
                <div className="st-job-header">
                  <div>
                    <p className="st-job-title" contentEditable={canEdit}>
                      Full Stack Developer
                    </p>
                    <p className="st-job-company" contentEditable={canEdit}>
                      Web Solutions Inc. — San Francisco, CA
                    </p>
                  </div>
                  <p className="st-job-dates" contentEditable={canEdit}>
                    2015 – 2019
                  </p>
                </div>

                <ul className="st-job-list">
                  <li contentEditable={canEdit}>
                    Built responsive applications using Django & React.
                  </li>
                  <li contentEditable={canEdit}>
                    Integrated APIs and payment systems.
                  </li>
                  <li contentEditable={canEdit}>
                    Created CI/CD pipelines for deployments.
                  </li>
                </ul>
              </div>
            </section>

            {/* PROJECTS */}
            <section className="st-section">
              <h2 className="st-section-title" contentEditable={canEdit}>
                FEATURED PROJECTS
              </h2>

              <div className="st-project">
                <p className="st-project-title" contentEditable={canEdit}>
                  Real-Time Analytics Dashboard
                </p>
                <p className="st-project-text" contentEditable={canEdit}>
                  Designed analytics dashboard using React, WebSockets & Node.js.
                </p>
              </div>

              <div className="st-project">
                <p className="st-project-title" contentEditable={canEdit}>
                  Multi-Tenant SaaS Platform
                </p>
                <p className="st-project-text" contentEditable={canEdit}>
                  Developed SaaS platform with RBAC and automated billing.
                </p>
              </div>
            </section>

            {/* TOOLS */}
            <section className="st-section">
              <h2 className="st-section-title" contentEditable={canEdit}>
                TOOLS & TECHNOLOGIES
              </h2>
              <p className="st-section-text" contentEditable={canEdit}>
                React, Node.js, TypeScript, PostgreSQL, Docker, AWS, CI/CD, etc.
              </p>
            </section>

            {/* ACHIEVEMENTS */}
            <section className="st-section">
              <h2 className="st-section-title" contentEditable={canEdit}>
                ACHIEVEMENTS
              </h2>
              <ul className="st-job-list">
                <li contentEditable={canEdit}>
                  Improved conversion rates by 15%.
                </li>
                <li contentEditable={canEdit}>
                  Reduced infrastructure cost by 20%.
                </li>
                <li contentEditable={canEdit}>
                  Delivered internal React performance seminar.
                </li>
              </ul>
            </section>

            {/* EDUCATION */}
            <section className="st-section st-last">
              <h2 className="st-section-title" contentEditable={canEdit}>
                EDUCATION
              </h2>

              <div className="st-edu-item">
                <p className="st-edu-degree" contentEditable={canEdit}>
                  B.S. in Computer Science
                </p>
                <p className="st-edu-meta" contentEditable={canEdit}>
                  UC Berkeley — 2011 – 2015
                </p>
              </div>

              <div className="st-edu-item">
                <p className="st-edu-degree" contentEditable={canEdit}>
                  Full Stack Nanodegree
                </p>
                <p className="st-edu-meta" contentEditable={canEdit}>
                  Udacity — 2016
                </p>
              </div>
            </section>
            <PaymentGate
              open={showPaymentModal}
              onClose={() => setShowPaymentModal(false)}
              onSuccess={handlePaymentSuccess}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
