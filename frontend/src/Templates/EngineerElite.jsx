// src/Templates/EngineerElite.jsx
import React, { useRef, useState } from "react";
import "./EngineerElite.css";
import TemplateLayout from "./TemplateLayout";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";


import { useAuth } from "../context/AuthContext";



export default function EngineerElite() {
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

// ---- Profile image (square - PREMIUM) ----
const [profileImage, setProfileImage] = useState(
  "/images/engineereliteprofileimage.png"
);
const fileInputRef = useRef(null);

const handleProfileUpload = (e) => {
  if (!(canEdit && isEditable)) return; // 🔒 safety
  const file = e.target.files[0];
  if (file) {
    setProfileImage(URL.createObjectURL(file));
  }
};

const handleProfileClick = () => {
  if (!(canEdit && isEditable)) {
    requirePayment(); // 🔥 open payment modal
    return;
  }
  profileInputRef.current?.click();
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
          templateId="DataElite"
          wrapperClass="de-wrapper"
          resumeClass="de-resume"
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
      <div className="ee-a4" ref={pdfRef} style={{ position: "relative" }}>
  

  <div className="ee-resume">


          {/* LEFT SIDEBAR */}
          <aside className="ee-sidebar">

           
           <div
  className={`ee-photo-wrapper ${!(canEdit && isEditable) ? "locked" : ""}`}
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
  title={canEdit ? "Click to change photo" : "Unlock to change photo"}
>
  <img src={profileImage} alt="Profile" className="ee-photo" />

  <input
    type="file"
    accept="image/*"
    ref={fileInputRef}
    style={{ display: "none" }}
    onChange={handleProfileUpload}
  />

  {!(canEdit && isEditable) && (
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
                <li contentEditable={canEdit}>CAD Modeling</li>
                <li contentEditable={canEdit}>Thermodynamics</li>
                <li contentEditable={canEdit}>Finite Element Analysis</li>
                <li contentEditable={canEdit}>Problem Solving</li>
                <li contentEditable={canEdit}>Technical Writing</li>
              </ul>
            </section>

            <section className="ee-side-section">
              <h3 className="ee-side-heading">TOOLS</h3>
              <ul className="ee-side-list">
                <li contentEditable={canEdit}>SolidWorks</li>
                <li contentEditable={canEdit}>AutoCAD</li>
                <li contentEditable={canEdit}>MATLAB</li>
                <li contentEditable={canEdit}>MS Office</li>
              </ul>
            </section>

            <section className="ee-side-section">
              <h3 className="ee-side-heading">CERTIFICATIONS</h3>
              <p className="ee-side-text" contentEditable={canEdit}>
                Certified SolidWorks Professional (CSWP)
                <br />
                Professional Engineer (PE)
              </p>
            </section>
          </aside>

          {/* RIGHT SECTION */}
          <main className="ee-main">

            <header className="ee-header">
              <h1 className="ee-name" contentEditable={canEdit}>EMMA ROBERTS</h1>
              <p className="ee-title" contentEditable={canEdit}>MECHANICAL ENGINEER</p>
              <div className="ee-header-line" />
            </header>

            <section className="ee-section">
              <h2 className="ee-section-title" contentEditable={canEdit}>SUMMARY</h2>
              <p className="ee-section-text" contentEditable={canEdit}>
                Detail-oriented mechanical engineer with 6+ years of experience...
              </p>
            </section>

            <section className="ee-section">
              <h2 className="ee-section-title" contentEditable={canEdit}>EXPERIENCE</h2>

              <div className="ee-job">
                <div className="ee-job-header">
                  <div>
                    <p className="ee-job-title" contentEditable={canEdit}>Mechanical Engineer</p>
                    <p className="ee-job-company" contentEditable={canEdit}>ABC Manufacturing — Los Angeles</p>
                  </div>
                  <p className="ee-job-dates" contentEditable={canEdit}>2018–Present</p>
                </div>

                <ul className="ee-job-list">
                  <li contentEditable={canEdit}>Lead design and validation...</li>
                  <li contentEditable={canEdit}>Collaborate with cross-functional teams...</li>
                  <li contentEditable={canEdit}>Develop detailed CAD models...</li>
                  <li contentEditable={canEdit}>Implement design improvements...</li>
                </ul>
              </div>

              <div className="ee-job">
                <div className="ee-job-header">
                  <div>
                    <p className="ee-job-title" contentEditable={canEdit}>Jr. Mechanical Engineer</p>
                    <p className="ee-job-company" contentEditable={canEdit}>XYZ Technologies — Pasadena</p>
                  </div>
                  <p className="ee-job-dates" contentEditable={canEdit}>2015–2018</p>
                </div>

                <ul className="ee-job-list">
                  <li contentEditable={canEdit}>Assisted in mechanical design...</li>
                  <li contentEditable={canEdit}>Supported field installations...</li>
                  <li contentEditable={canEdit}>Prepared technical reports...</li>
                </ul>
              </div>
            </section>

            <section className="ee-section">
              <h2 className="ee-section-title" contentEditable={canEdit}>PROJECTS</h2>

              <div className="ee-project">
                <div className="ee-project-header">
                  <p className="ee-project-title" contentEditable={canEdit}>Heat Exchanger Optimization</p>
                  <p className="ee-project-year" contentEditable={canEdit}>2020</p>
                </div>
                <p className="ee-section-text" contentEditable={canEdit}>
                  Led a cross-functional engineering team to redesign...
                </p>
              </div>
            </section>

            <section className="ee-section ee-last">
              <h2 className="ee-section-title" contentEditable={canEdit}>EDUCATION</h2>

              <div className="ee-edu-item">
                <p className="ee-edu-degree" contentEditable={canEdit}>M.S. in Mechanical Engineering</p>
                <p className="ee-edu-meta" contentEditable={canEdit}>UC Berkeley — 2015–2018</p>
              </div>

              <div className="ee-edu-item">
                <p className="ee-edu-degree" contentEditable={canEdit}>B.S. in Mechanical Engineering</p>
                <p className="ee-edu-meta" contentEditable={canEdit}>UT Austin — 2009–2013</p>
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
