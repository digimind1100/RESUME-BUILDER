// src/Templates/EngineerElite.jsx
import React, { useRef, useState } from "react";
import "./EngineerElite.css";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import TemplateLayout from "./TemplateLayout";
import { useAuth } from "../context/AuthContext";


export default function EngineerElite() {
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  const { user, setUser } = useAuth();


  /* ================= EDIT MODE ================= */

  // ---- Profile image (square - PREMIUM) ----
  const [profileImage, setProfileImage] = useState(
    "/images/engineereliteprofileimage.png"
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


  // ---- Personal info form state ----
  const [info, setInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    zip: "",
    linkedin: "",
    engineerId: "",
  });

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  // ---- QR Code ----
  const [qrDataUrl, setQrDataUrl] = useState("");

  const handleCreateQr = async () => {
    const qrPayload = JSON.stringify(
      {
        name: info.fullName,
        email: info.email,
        phone: info.phone,
        address: info.address,
        state: info.state,
        city: info.city,
        zip: info.zip,
        linkedin: info.linkedin,
        engineerId: info.engineerId,
      },
      null,
      0
    );

    try {
      const url = await QRCode.toDataURL(qrPayload);
      setQrDataUrl(url);
    } catch (err) {
      console.error("QR generation error:", err);
      alert("QR Code generate karte waqt error.");
    }
  };

  return (
 <TemplateLayout
      templateId="EngineerElite"
      wrapperClass="ee-wrapper"
      resumeClass="ee-resume"
    >
      {({ canEdit, isEditable, pdfRef, requirePayment }) => (

    <div className="ee-wrapper">

      {/* ---------- PERSONAL INFO FORM ---------- */}
      <div className="ee-form">
        <h3 className="ee-form-title">Personal Info (for QR Code)</h3>

        <div className="ee-form-grid">

          <div className="ee-form-field">
            <label>Full Name</label>
            <input name="fullName" value={info.fullName} onChange={handleInfoChange} disabled={!(canEdit && isEditable)}
              placeholder="Enter your full name"
            />

          </div>

          <div className="ee-form-field">
            <label>Email</label>
            <input name="email" value={info.email} onChange={handleInfoChange} disabled={!(canEdit && isEditable)}
             
              placeholder="Enter your Email"
            />
          </div>

          <div className="ee-form-field">
            <label>Telephone</label>
            <input name="phone" value={info.phone} onChange={handleInfoChange} disabled={!(canEdit && isEditable)}
              
              placeholder="Enter your Telephone"
            />
          </div>

          <div className="ee-form-field">
            <label>Address</label>
            <input name="address" value={info.address} onChange={handleInfoChange} disabled={!(canEdit && isEditable)}
              
              placeholder="Address"
            />
          </div>

          <div className="ee-form-field">
            <label>State</label>
            <input name="state" value={info.state} onChange={handleInfoChange} disabled={!(canEdit && isEditable)}
              
              placeholder="Enter your State"
            />
          </div>

          <div className="ee-form-field">
            <label>City</label>
            <input name="city" value={info.city} onChange={handleInfoChange} disabled={!(canEdit && isEditable)}
            
              placeholder="Enter your City"
            />
          </div>

          <div className="ee-form-field">
            <label>Zip Code</label>
            <input name="zip" value={info.zip} onChange={handleInfoChange} disabled={!(canEdit && isEditable)}
            
              placeholder="Enter Zip Code"
            />
          </div>

          <div className="ee-form-field">
            <label>LinkedIn</label>
            <input name="linkedin" value={info.linkedin} onChange={handleInfoChange} disabled={!(canEdit && isEditable)}
            
              placeholder="Enter your LinkedIn Profile link"
            />
          </div>

          <div className="ee-form-field ee-form-full">
            <label>Engineer ID</label>
            <input name="engineerId" value={info.engineerId} onChange={handleInfoChange} disabled={!(canEdit && isEditable)}
       
              placeholder="Enter your eignineer ID"
            />
          </div>

        </div>

        <div className="ee-form-actions">
          <button onClick={handleCreateQr}>Create QR Code</button>
        </div>
      </div>

      {/* ---------- A4 RESUME ---------- */}
      <div className="resume-a4 ee-a4" ref={pdfRef} style={{ position: "relative" }}>


        <div className="ee-resume">


          {/* LEFT SIDEBAR */}
          <aside className="ee-sidebar">


            <div
              className={`ee-photo-wrapper ${!canEdit && isEditable ? "locked" : ""}`}
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
              <img src={profileImage} alt="Profile" className="ee-photo" />

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />

              {!canEdit && (
                <div className="ee-photo-lock">
                  🔒 Premium
                </div>
              )}
            </div>


            <div className="ee-qr-wrapper">
              {qrDataUrl ? (
                <img src={qrDataUrl} className="ee-qr-image" />
              ) : (
                <div className="ee-qr-placeholder">
                  <span>QR CODE</span>
                </div>
              )}
            </div>

            <div className="ee-engineer-id">
              <span className="ee-engineer-id-label">ENGINEER ID</span>
              <span className="ee-engineer-id-value">
                {info.engineerId || "ENG-XXXX-XXX"}
              </span>
            </div>

            <section className="ee-side-section">
              <h3 className="ee-side-heading">SKILLS</h3>
              <ul className="ee-side-list">
                <li contentEditable={canEdit && isEditable}>CAD Modeling</li>
                <li contentEditable={canEdit && isEditable}>Thermodynamics</li>
                <li contentEditable={canEdit && isEditable}>Finite Element Analysis</li>
                <li contentEditable={canEdit && isEditable}>Problem Solving</li>
                <li contentEditable={canEdit && isEditable}>Technical Writing</li>
              </ul>
            </section>

            <section className="ee-side-section">
              <h3 className="ee-side-heading">TOOLS</h3>
              <ul className="ee-side-list">
                <li contentEditable={canEdit && isEditable}>SolidWorks</li>
                <li contentEditable={canEdit && isEditable}>AutoCAD</li>
                <li contentEditable={canEdit && isEditable}>MATLAB</li>
                <li contentEditable={canEdit && isEditable}>MS Office</li>
              </ul>
            </section>

            <section className="ee-side-section">
              <h3 className="ee-side-heading">CERTIFICATIONS</h3>
              <p className="ee-side-text" contentEditable={canEdit && isEditable}>
                Certified SolidWorks Professional (CSWP)
                <br />
                Professional Engineer (PE)
              </p>
            </section>
          </aside>

          {/* RIGHT SECTION */}
          <main className="ee-main">

            <header className="ee-header">
              <h1 className="ee-name" contentEditable={canEdit && isEditable}>EMMA ROBERTS</h1>
              <p className="ee-title" contentEditable={canEdit && isEditable}>MECHANICAL ENGINEER</p>
              <div className="ee-header-line" />
            </header>

            <section className="ee-section">
              <h2 className="ee-section-title" contentEditable={canEdit && isEditable}>SUMMARY</h2>
              <p className="ee-section-text" contentEditable={canEdit && isEditable}>
                Detail-oriented mechanical engineer with 6+ years of experience...
              </p>
            </section>

            <section className="ee-section">
              <h2 className="ee-section-title" contentEditable={canEdit && isEditable}>EXPERIENCE</h2>

              <div className="ee-job">
                <div className="ee-job-header">
                  <div>
                    <p className="ee-job-title" contentEditable={canEdit && isEditable}>Mechanical Engineer</p>
                    <p className="ee-job-company" contentEditable={canEdit && isEditable}>ABC Manufacturing — Los Angeles</p>
                  </div>
                  <p className="ee-job-dates" contentEditable={canEdit && isEditable}>2018–Present</p>
                </div>

                <ul className="ee-job-list">
                  <li contentEditable={canEdit && isEditable}>Lead design and validation...</li>
                  <li contentEditable={canEdit && isEditable}>Collaborate with cross-functional teams...</li>
                  <li contentEditable={canEdit && isEditable}>Develop detailed CAD models...</li>
                  <li contentEditable={canEdit && isEditable}>Implement design improvements...</li>
                </ul>
              </div>

              <div className="ee-job">
                <div className="ee-job-header">
                  <div>
                    <p className="ee-job-title" contentEditable={canEdit && isEditable}>Jr. Mechanical Engineer</p>
                    <p className="ee-job-company" contentEditable={canEdit && isEditable}>XYZ Technologies — Pasadena</p>
                  </div>
                  <p className="ee-job-dates" contentEditable={canEdit && isEditable}>2015–2018</p>
                </div>

                <ul className="ee-job-list">
                  <li contentEditable={canEdit && isEditable}>Assisted in mechanical design...</li>
                  <li contentEditable={canEdit && isEditable}>Supported field installations...</li>
                  <li contentEditable={canEdit && isEditable}>Prepared technical reports...</li>
                </ul>
              </div>
            </section>

            <section className="ee-section">
              <h2 className="ee-section-title" contentEditable={canEdit && isEditable}>PROJECTS</h2>

              <div className="ee-project">
                <div className="ee-project-header">
                  <p className="ee-project-title" contentEditable={canEdit && isEditable}>Heat Exchanger Optimization</p>
                  <p className="ee-project-year" contentEditable={canEdit && isEditable}>2020</p>
                </div>
                <p className="ee-section-text" contentEditable={canEdit && isEditable}>
                  Led a cross-functional engineering team to redesign...
                </p>
              </div>
            </section>

            <section className="ee-section ee-last">
              <h2 className="ee-section-title" contentEditable={canEdit && isEditable}>EDUCATION</h2>

              <div className="ee-edu-item">
                <p className="ee-edu-degree" contentEditable={canEdit && isEditable}>M.S. in Mechanical Engineering</p>
                <p className="ee-edu-meta" contentEditable={canEdit && isEditable}>UC Berkeley — 2015–2018</p>
              </div>

              <div className="ee-edu-item">
                <p className="ee-edu-degree" contentEditable={canEdit && isEditable}>B.S. in Mechanical Engineering</p>
                <p className="ee-edu-meta" contentEditable={canEdit && isEditable}>UT Austin — 2009–2013</p>
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
