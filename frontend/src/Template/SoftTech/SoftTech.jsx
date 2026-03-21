// src/Templates/SoftTech.jsx
import React, { useRef, useState } from "react";
import "./SoftTech.css";
import { useNavigate } from "react-router-dom";
import TemplateLayout from "../TemplateLayout";
import QRCode from "qrcode";
import { useAuth } from "../../context/AuthContext";

export default function SoftTech() {
  const navigate = useNavigate();
  const resumeRef = useRef(null);
  const { user, setUser } = useAuth();

  /* ---------- PROFILE IMAGE ---------- */
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

  
  return (
        <TemplateLayout
          templateId="SoftTech"
          wrapperClass="st-wrapper"
          resumeClass="st-resume"
        >
    
          {({ canEdit, isEditable, pdfRef }) => (
    <div className="st-wrapper">


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
              disabled={!(canEdit && isEditable)}
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
              disabled={!(canEdit && isEditable)}
              placeholder="emma@mail.com"
            />
          </div>

          <div className="st-form-field">
            <label>Telephone</label>
            <input
              name="phone"
              value={info.phone}
              onChange={handleInfoChange}
              disabled={!(canEdit && isEditable)}
              placeholder="+1 555-123-4567"
            />
          </div>

          <div className="st-form-field">
            <label>Address</label>
            <input
              name="address"
              value={info.address}
              onChange={handleInfoChange}
              disabled={!(canEdit && isEditable)}
              placeholder="123 Main Street"
            />
          </div>

          <div className="st-form-field">
            <label>State</label>
            <input
              name="state"
              value={info.state}
              onChange={handleInfoChange}
              disabled={!(canEdit && isEditable)}
              placeholder="CA"
            />
          </div>

          <div className="st-form-field">
            <label>City</label>
            <input
              name="city"
              value={info.city}
              onChange={handleInfoChange}
              disabled={!(canEdit && isEditable)}
              placeholder="San Francisco"
            />
          </div>

          <div className="st-form-field">
            <label>Zip Code</label>
            <input
              name="zip"
              value={info.zip}
              onChange={handleInfoChange}
              disabled={!(canEdit && isEditable)}
              placeholder="94105"
            />
          </div>

          <div className="st-form-field">
            <label>LinkedIn</label>
            <input
              name="linkedin"
              value={info.linkedin}
              onChange={handleInfoChange}
              disabled={!(canEdit && isEditable)}
              placeholder="linkedin.com/in/username"
            />
          </div>

          <div className="st-form-field">
            <label>GitHub</label>
            <input
              name="github"
              value={info.github}
              onChange={handleInfoChange}
              disabled={!(canEdit && isEditable)}
              placeholder="github.com/username"
            />
          </div>

          <div className="st-form-field st-form-full">
            <label>Portfolio</label>
            <input
              name="portfolio"
              value={info.portfolio}
              onChange={handleInfoChange}
              disabled={!(canEdit && isEditable)}
              placeholder="https://your-portfolio.com"
            />
          </div>
        </div>

        <div className="st-form-actions">
          <button onClick={handleCreateQr} disabled={!(canEdit && isEditable)}>
            Create QR Code
          </button>
        </div>
      </div>

      {/* ---------- A4 RESUME ---------- */}
      <div className="resume-a4 st-a4" ref={pdfRef} style={{ position: "relative" }}>
      
        <div className="st-resume">


          {/* ===== LEFT SIDEBAR ===== */}
          <aside className="st-sidebar">

            {/* QR TOP */}
            <div className="st-qr-wrapper">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="QR Code" className="st-qr-image" />
              ) : (
                <div className="st-qr-placeholder" contentEditable={canEdit && isEditable}>
                  QR CODE
                </div>
              )}
            </div>

            {/* CONTACT */}
            <section className="st-side-section">
              <h3 className="st-side-heading" contentEditable={canEdit && isEditable}>
                CONTACT
              </h3>

              <ul className="st-contact-list">
                <li>
                  <span className="st-contact-text" contentEditable={canEdit && isEditable}>
                    +1 555-789-3320
                  </span>
                </li>
                <li>
                  <span className="st-contact-text" contentEditable={canEdit && isEditable}>
                    emma.roberts@mail.com
                  </span>
                </li>
                <li>
                  <span className="st-contact-text" contentEditable={canEdit && isEditable}>
                    San Francisco, CA
                  </span>
                </li>
                <li>
                  <span className="st-contact-text" contentEditable={canEdit && isEditable}>
                    www.emmadev.com
                  </span>
                </li>
              </ul>
            </section>

            {/* SKILLS */}
            <section className="st-side-section">
              <h3 className="st-side-heading" contentEditable={canEdit && isEditable}>SKILLS</h3>
              <ul className="st-side-list">
                <li contentEditable={canEdit && isEditable}>JavaScript (ES6+)</li>
                <li contentEditable={canEdit && isEditable}>React & Next.js</li>
                <li contentEditable={canEdit && isEditable}>Node.js & Express</li>
                <li contentEditable={canEdit && isEditable}>REST & GraphQL APIs</li>
              </ul>
            </section>

            {/* TECH STACK */}
            <section className="st-side-section">
              <h3 className="st-side-heading" contentEditable={canEdit && isEditable}>TECH STACK</h3>
              <ul className="st-side-list">
                <li contentEditable={canEdit && isEditable}>TypeScript</li>
                <li contentEditable={canEdit && isEditable}>Python / Django</li>
                <li contentEditable={canEdit && isEditable}>PostgreSQL, MongoDB</li>
                <li contentEditable={canEdit && isEditable}>AWS / Docker / CI-CD</li>
              </ul>
            </section>

            {/* CERTIFICATIONS */}
            <section className="st-side-section">
              <h3 className="st-side-heading" contentEditable={canEdit && isEditable}>CERTIFICATIONS</h3>
              <p className="st-side-text" contentEditable={canEdit && isEditable}>
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
                <div className="st-qr-placeholder" contentEditable={canEdit && isEditable}>
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
                <h1 className="st-name" contentEditable={canEdit && isEditable}>
                  EMMA ROBERTS
                </h1>
                <p className="st-title" contentEditable={canEdit && isEditable}>
                  FULL STACK DEVELOPER
                </p>
                <div className="st-header-line" />
              </div>

              <div
        className={`st-header-photo ${!canEdit ? "locked" : ""}`}

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
                  }}>
        
        <img src={profileImage} alt="Profile" />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageUpload}
       />
             </div>
            </header>

            {/* ABOUT ME */}
            <section className="st-section">
              <h2 className="st-section-title" contentEditable={canEdit && isEditable}>
                ABOUT ME
              </h2>
              <p className="st-section-text" contentEditable={canEdit && isEditable}>
                Passionate full stack developer with 7+ years of experience
                designing and implementing scalable applications.
              </p>
            </section>

            {/* EXPERIENCE */}
            <section className="st-section">
              <h2 className="st-section-title" contentEditable={canEdit && isEditable}>
                EXPERIENCE
              </h2>

              <div className="st-job">
                <div className="st-job-header">
                  <div>
                    <p className="st-job-title" contentEditable={canEdit && isEditable}>
                      Senior Full Stack Developer
                    </p>
                    <p className="st-job-company" contentEditable={canEdit && isEditable}>
                      Meta — Menlo Park, CA
                    </p>
                  </div>
                  <p className="st-job-dates" contentEditable={canEdit && isEditable}>
                    2019 – Present
                  </p>
                </div>

                <ul className="st-job-list">
                  <li contentEditable={canEdit && isEditable}>Lead development of scalable web apps.</li>
                  <li contentEditable={canEdit && isEditable}>Collaborated with cross-functional teams.</li>
                  <li contentEditable={canEdit && isEditable}>Improved app performance by 30%.</li>
                  <li contentEditable={canEdit && isEditable}>Mentored junior developers.</li>
                </ul>
              </div>

              <div className="st-job">
                <div className="st-job-header">
                  <div>
                    <p className="st-job-title" contentEditable={canEdit && isEditable}>
                      Full Stack Developer
                    </p>
                    <p className="st-job-company" contentEditable={canEdit && isEditable}>
                      Web Solutions Inc. — San Francisco, CA
                    </p>
                  </div>
                  <p className="st-job-dates" contentEditable={canEdit && isEditable}>
                    2015 – 2019
                  </p>
                </div>

                <ul className="st-job-list">
                  <li contentEditable={canEdit && isEditable}>
                    Built responsive applications using Django & React.
                  </li>
                  <li contentEditable={canEdit && isEditable}>
                    Integrated APIs and payment systems.
                  </li>
                  <li contentEditable={canEdit && isEditable}>
                    Created CI/CD pipelines for deployments.
                  </li>
                </ul>
              </div>
            </section>

            {/* PROJECTS */}
            <section className="st-section">
              <h2 className="st-section-title" contentEditable={canEdit && isEditable}>
                FEATURED PROJECTS
              </h2>

              <div className="st-project">
                <p className="st-project-title" contentEditable={canEdit && isEditable}>
                  Real-Time Analytics Dashboard
                </p>
                <p className="st-project-text" contentEditable={canEdit && isEditable}>
                  Designed analytics dashboard using React, WebSockets & Node.js.
                </p>
              </div>

              <div className="st-project">
                <p className="st-project-title" contentEditable={canEdit && isEditable}>
                  Multi-Tenant SaaS Platform
                </p>
                <p className="st-project-text" contentEditable={canEdit && isEditable}>
                  Developed SaaS platform with RBAC and automated billing.
                </p>
              </div>
            </section>

            {/* TOOLS */}
            <section className="st-section">
              <h2 className="st-section-title" contentEditable={canEdit && isEditable}>
                TOOLS & TECHNOLOGIES
              </h2>
              <p className="st-section-text" contentEditable={canEdit && isEditable}>
                React, Node.js, TypeScript, PostgreSQL, Docker, AWS, CI/CD, etc.
              </p>
            </section>

            {/* ACHIEVEMENTS */}
            <section className="st-section">
              <h2 className="st-section-title" contentEditable={canEdit && isEditable}>
                ACHIEVEMENTS
              </h2>
              <ul className="st-job-list">
                <li contentEditable={canEdit && isEditable}>
                  Improved conversion rates by 15%.
                </li>
                <li contentEditable={canEdit && isEditable}>
                  Reduced infrastructure cost by 20%.
                </li>
                <li contentEditable={canEdit && isEditable}>
                  Delivered internal React performance seminar.
                </li>
              </ul>
            </section>

            {/* EDUCATION */}
            <section className="st-section st-last">
              <h2 className="st-section-title" contentEditable={canEdit && isEditable}>
                EDUCATION
              </h2>

              <div className="st-edu-item">
                <p className="st-edu-degree" contentEditable={canEdit && isEditable}>
                  B.S. in Computer Science
                </p>
                <p className="st-edu-meta" contentEditable={canEdit && isEditable}>
                  UC Berkeley — 2011 – 2015
                </p>
              </div>

              <div className="st-edu-item">
                <p className="st-edu-degree" contentEditable={canEdit && isEditable}>
                  Full Stack Nanodegree
                </p>
                <p className="st-edu-meta" contentEditable={canEdit && isEditable}>
                  Udacity — 2016
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
