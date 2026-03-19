import React, { useRef, useState } from "react";
import "./EngineerPrime.css";
import TemplateLayout from "./TemplateLayout";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import { useAuth } from "../context/AuthContext";


export default function EngineerPrime() {
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  // PROFILE IMAGE
  const [profileImage, setProfileImage] = useState("/images/cleanprofileimage.png");
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


  // PERSONAL INFO STATES FOR QR CODE
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const [qrImage, setQrImage] = useState("/images/engineerprime-qr.png");

  // GENERATE QR CODE FUNCTION
  const generateQRCode = async () => {
    const qrData = `
Full Name: ${fullName}
Email: ${email}
Phone: ${telephone}
Address: ${address}
City: ${city}
State: ${state}
ZIP: ${zip}
LinkedIn: ${linkedin}
`;

    try {
      const qr = await QRCode.toDataURL(qrData);
      setQrImage(qr);
    } catch (err) {
      console.error("QR error:", err);
    }
  };


  return (
    <TemplateLayout
      templateId="EngineerPrime"
      wrapperClass="ep-wrapper"
      resumeClass="ep-resume"
    >
      {({ canEdit, isEditable, pdfRef, requirePayment }) => (
        <div className="ep-wrapper">

          {/* ==== MINI FORM FOR QR GENERATION ==== */}
          <div className="ep-mini-form">
            <input placeholder="Emma Roberts" onChange={(e) => setFullName(e.target.value)} disabled={!(canEdit && isEditable)} />
            <input placeholder="emma@mail.com" onChange={(e) => setEmail(e.target.value)} disabled={!(canEdit && isEditable)} />
            <input placeholder="+1 555-123-4567" onChange={(e) => setTelephone(e.target.value)} disabled={!(canEdit && isEditable)} />
            <input placeholder="123 Main Street" onChange={(e) => setAddress(e.target.value)} disabled={!(canEdit && isEditable)} />
            <div className="ep-mini-row">
              <input placeholder="Los Angeles" onChange={(e) => setCity(e.target.value)} disabled={!(canEdit && isEditable)} />
              <input placeholder="CA" onChange={(e) => setState(e.target.value)} disabled={!(canEdit && isEditable)} />
              <input placeholder="90001" onChange={(e) => setZip(e.target.value)} disabled={!(canEdit && isEditable)} />
            </div>
            <input placeholder="linkedin.com/in/username" onChange={(e) => setLinkedin(e.target.value)} disabled={!(canEdit && isEditable)} />

            <button className="ep-qr-btn" onClick={generateQRCode} >
              Create QR Code
            </button>
          </div>

          {/* ==== A4 PAGE ==== */}
          <div className="ep-a4" ref={pdfRef} style={{ position: "relative" }}>


            <div className="ep-resume">


              {/* ==== LEFT SIDEBAR ==== */}
              <aside className="ep-sidebar">

                {/* TOP QR CODE */}
                <div className="ep-qr-top">
                  <img src={qrImage} alt="QR Code" className="ep-qr-img" />
                </div>

                {/* HEXAGON PROFILE */}
                {/* PROFILE IMAGE (PREMIUM LOCKED) */}
                <div
                  className={`ep-photo-hex ${!canEdit && isEditable ? "locked" : ""}`}
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
                  <img src={profileImage} className="ep-photo" alt="Profile" />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                </div>


                {/* SIDEBAR SECTIONS */}
                <section className="ep-section">
                  <h3 className="ep-section-heading" contentEditable={canEdit && isEditable}>
                    CORE SKILLS
                  </h3>
                  <ul className="ep-list">
                    <li contentEditable={canEdit && isEditable}>Structural Analysis</li>
                    <li contentEditable={canEdit && isEditable}>Foundation Design</li>
                    <li contentEditable={canEdit && isEditable}>AutoCAD / Civil 3D</li>
                    <li contentEditable={canEdit && isEditable}>Seismic Load Calculations</li>
                    <li contentEditable={canEdit && isEditable}>Project Coordination</li>
                  </ul>
                </section>

                <section className="ep-section">
                  <h3 className="ep-section-heading" contentEditable={canEdit && isEditable}>
                    SOFTWARE
                  </h3>
                  <ul className="ep-list">
                    <li contentEditable={canEdit && isEditable}>ETABS</li>
                    <li contentEditable={canEdit && isEditable}>SAP2000</li>
                    <li contentEditable={canEdit && isEditable}>STAAD Pro</li>
                    <li contentEditable={canEdit && isEditable}>Revit</li>
                  </ul>
                </section>

                {/* BOTTOM QR CODE */}
                <div className="ep-qr-bottom">
                  <img src={qrImage} alt="QR Code" className="ep-qr-img" />
                </div>

              </aside>

              {/* ==== RIGHT MAIN CONTENT ==== */}
              <main className="ep-main">

                {/* NAME & TITLE */}
                <section className="ep-header-block">
                  <h1 className="ep-name" contentEditable={canEdit && isEditable}>
                    JONATHAN KELVIN
                  </h1>
                  <p className="ep-title" contentEditable={canEdit && isEditable}>
                    CIVIL ENGINEER
                  </p>
                </section>

                {/* SUMMARY */}
                <section className="ep-section-block">
                  <h2 className="ep-section-title" contentEditable={canEdit && isEditable}>SUMMARY</h2>
                  <p className="ep-text" contentEditable={canEdit && isEditable}>
                    Civil engineer with 8+ years of experience specializing in structural design,
                    site planning, and infrastructure development.
                  </p>
                </section>

                {/* EXPERIENCE */}
                <section className="ep-section-block">
                  <h2 className="ep-section-title" contentEditable={canEdit && isEditable}>EXPERIENCE</h2>

                  {/* Job 1 */}
                  <div className="ep-job">
                    <div className="ep-job-header">
                      <h3 contentEditable={canEdit && isEditable}>Senior Civil Engineer</h3>
                      <p contentEditable={canEdit && isEditable}>2019 – Present</p>
                    </div>

                    <p className="ep-job-location" contentEditable={canEdit && isEditable}>
                      BlueStone Engineering, NY
                    </p>

                    <ul className="ep-job-list">
                      <li contentEditable={canEdit && isEditable}>Performed seismic load analysis...</li>
                      <li contentEditable={canEdit && isEditable}>Led a team of 6 engineers...</li>
                      <li contentEditable={canEdit && isEditable}>Optimized foundation systems...</li>
                      <li contentEditable={canEdit && isEditable}>Conducted site inspections...</li>
                    </ul>
                  </div>

                  {/* Job 2 */}
                  <div className="ep-job">
                    <div className="ep-job-header">
                      <h3 contentEditable={canEdit && isEditable}>Structural Engineer</h3>
                      <p contentEditable={canEdit && isEditable}>2015 – 2019</p>
                    </div>

                    <p className="ep-job-location" contentEditable={canEdit && isEditable}>
                      Skyline Consultants, CA
                    </p>

                    <ul className="ep-job-list">
                      <li contentEditable={canEdit && isEditable}>Designed reinforced concrete...</li>
                      <li contentEditable={canEdit && isEditable}>Performed soil and geotechnical analysis...</li>
                      <li contentEditable={canEdit && isEditable}>Prepared detailed CAD drawings...</li>
                    </ul>
                  </div>

                  {/* PROJECTS */}
                  <section className="ep-section ep-last">
                    <h2 className="ep-section-title" contentEditable={canEdit && isEditable}>MAJOR PROJECTS</h2>

                    <div className="ep-edu-item">
                      <p contentEditable={canEdit && isEditable} className="ep-edu-degree">
                        Downtown Metro Bridge Expansion – Lead Engineer
                      </p>
                      <p contentEditable={canEdit && isEditable} className="ep-edu-meta">
                        Designed high-load steel components
                      </p>
                    </div>

                    <div className="ep-edu-item">
                      <p contentEditable={canEdit && isEditable} className="ep-edu-degree">
                        Coastal Flood Mitigation Project – Team Lead
                      </p>
                      <p contentEditable={canEdit && isEditable} className="ep-edu-meta">
                        Developed water-channel simulations
                      </p>
                    </div>
                  </section>

                  {/* EXTRA CONTENT */}
                  <section className="ep-section">
                    <h2 className="ep-section-title" contentEditable={canEdit && isEditable}>
                      PROJECT HIGHLIGHTS
                    </h2>
                    <ul className="ep-job-list">
                      <li contentEditable={canEdit && isEditable}>Structural design lead...</li>
                      <li contentEditable={canEdit && isEditable}>Improved BIM workflow...</li>
                      <li contentEditable={canEdit && isEditable}>Conducted soil tests...</li>
                    </ul>
                  </section>

                  <section className="ep-section">
                    <h2 className="ep-section-title" contentEditable={canEdit && isEditable}>
                      TECHNICAL SPECIALIZATION
                    </h2>
                    <ul className="ep-job-list">
                      <li contentEditable={canEdit && isEditable}>Finite Element Modeling</li>
                      <li contentEditable={canEdit && isEditable}>Geotechnical Engineering</li>
                      <li contentEditable={canEdit && isEditable}>Hydraulic Systems</li>
                      <li contentEditable={canEdit && isEditable}>Cost Estimation</li>
                    </ul>
                  </section>

                </section>

                {/* EDUCATION */}
                <section className="ep-section-block ep-last">
                  <h2 className="ep-section-title" contentEditable={canEdit && isEditable}>
                    EDUCATION
                  </h2>

                  <div className="ep-edu-item">
                    <p className="ep-edu-degree" contentEditable={canEdit && isEditable}>
                      M.S. Civil Engineering
                    </p>
                    <p className="ep-edu-meta" contentEditable={canEdit && isEditable}>
                      University of California — 2013–2015
                    </p>
                  </div>

                  <div className="ep-edu-item">
                    <p className="ep-edu-degree" contentEditable={canEdit && isEditable}>
                      B.S. Civil Engineering
                    </p>
                    <p className="ep-edu-meta" contentEditable={canEdit && isEditable}>
                      University of Texas — 2009–2013
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
