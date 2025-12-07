import React, { useRef, useState } from "react";
import "./EngineerPrime.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import QRCode from "qrcode";

export default function EngineerPrime() {
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  // ⭐ EDITABLE SYSTEM
  const [isEditable, setIsEditable] = useState(false);

  // PROFILE IMAGE
  const [profileImage, setProfileImage] = useState("/images/cleanProfileImage.png");
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setProfileImage(URL.createObjectURL(file));
  };

  const triggerFileSelect = () => fileInputRef.current.click();

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

  // PDF DOWNLOAD
  const handleDownloadPDF = async () => {
    const element = resumeRef.current;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = 210;
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("engineer-prime-resume.pdf");
  };

  const handleReset = () => window.location.reload();

  return (
    <div className="ep-wrapper">

      {/* ==== TOP BUTTONS ==== */}
      <div className="ep-buttons">
        <button onClick={handleDownloadPDF}>Download PDF</button>
        <button onClick={() => navigate("/templates")}>Back</button>
        <button onClick={handleReset}>Reset</button>

        {/* ⭐ NEW EDIT BUTTON */}
        <button
          onClick={() => setIsEditable(!isEditable)}
          className={isEditable ? "edit-toggle on" : "edit-toggle off"}
        >
          {isEditable ? "Editing: ON" : "Editing: OFF"}
        </button>
      </div>

      {/* ==== MINI FORM FOR QR GENERATION ==== */}
      <div className="ep-mini-form">
        <input placeholder="Emma Roberts" onChange={(e) => setFullName(e.target.value)} />
        <input placeholder="emma@mail.com" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="+1 555-123-4567" onChange={(e) => setTelephone(e.target.value)} />
        <input placeholder="123 Main Street" onChange={(e) => setAddress(e.target.value)} />
        <div className="ep-mini-row">
          <input placeholder="Los Angeles" onChange={(e) => setCity(e.target.value)} />
          <input placeholder="CA" onChange={(e) => setState(e.target.value)} />
          <input placeholder="90001" onChange={(e) => setZip(e.target.value)} />
        </div>
        <input placeholder="linkedin.com/in/username" onChange={(e) => setLinkedin(e.target.value)} />

        <button className="ep-qr-btn" onClick={generateQRCode}>
          Create QR Code
        </button>
      </div>

      {/* ==== A4 PAGE ==== */}
      <div className="ep-a4" ref={resumeRef}>
        <div className="ep-resume">

          {/* ==== LEFT SIDEBAR ==== */}
          <aside className="ep-sidebar">

            {/* TOP QR CODE */}
            <div className="ep-qr-top">
              <img src={qrImage} alt="QR Code" className="ep-qr-img" />
            </div>

            {/* HEXAGON PROFILE */}
            <div className="ep-photo-hex" onClick={triggerFileSelect}>
              <img src={profileImage} className="ep-photo" />
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
              <h3 className="ep-section-heading" contentEditable={isEditable}>
                CORE SKILLS
              </h3>
              <ul className="ep-list">
                <li contentEditable={isEditable}>Structural Analysis</li>
                <li contentEditable={isEditable}>Foundation Design</li>
                <li contentEditable={isEditable}>AutoCAD / Civil 3D</li>
                <li contentEditable={isEditable}>Seismic Load Calculations</li>
                <li contentEditable={isEditable}>Project Coordination</li>
              </ul>
            </section>

            <section className="ep-section">
              <h3 className="ep-section-heading" contentEditable={isEditable}>
                SOFTWARE
              </h3>
              <ul className="ep-list">
                <li contentEditable={isEditable}>ETABS</li>
                <li contentEditable={isEditable}>SAP2000</li>
                <li contentEditable={isEditable}>STAAD Pro</li>
                <li contentEditable={isEditable}>Revit</li>
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
              <h1 className="ep-name" contentEditable={isEditable}>
                JONATHAN KELVIN
              </h1>
              <p className="ep-title" contentEditable={isEditable}>
                CIVIL ENGINEER
              </p>
            </section>

            {/* SUMMARY */}
            <section className="ep-section-block">
              <h2 className="ep-section-title" contentEditable={isEditable}>SUMMARY</h2>
              <p className="ep-text" contentEditable={isEditable}>
                Civil engineer with 8+ years of experience specializing in structural design,
                site planning, and infrastructure development.
              </p>
            </section>

            {/* EXPERIENCE */}
            <section className="ep-section-block">
              <h2 className="ep-section-title" contentEditable={isEditable}>EXPERIENCE</h2>

              {/* Job 1 */}
              <div className="ep-job">
                <div className="ep-job-header">
                  <h3 contentEditable={isEditable}>Senior Civil Engineer</h3>
                  <p contentEditable={isEditable}>2019 – Present</p>
                </div>

                <p className="ep-job-location" contentEditable={isEditable}>
                  BlueStone Engineering, NY
                </p>

                <ul className="ep-job-list">
                  <li contentEditable={isEditable}>Performed seismic load analysis...</li>
                  <li contentEditable={isEditable}>Led a team of 6 engineers...</li>
                  <li contentEditable={isEditable}>Optimized foundation systems...</li>
                  <li contentEditable={isEditable}>Conducted site inspections...</li>
                </ul>
              </div>

              {/* Job 2 */}
              <div className="ep-job">
                <div className="ep-job-header">
                  <h3 contentEditable={isEditable}>Structural Engineer</h3>
                  <p contentEditable={isEditable}>2015 – 2019</p>
                </div>

                <p className="ep-job-location" contentEditable={isEditable}>
                  Skyline Consultants, CA
                </p>

                <ul className="ep-job-list">
                  <li contentEditable={isEditable}>Designed reinforced concrete...</li>
                  <li contentEditable={isEditable}>Performed soil and geotechnical analysis...</li>
                  <li contentEditable={isEditable}>Prepared detailed CAD drawings...</li>
                </ul>
              </div>

              {/* PROJECTS */}
              <section className="ep-section ep-last">
                <h2 className="ep-section-title" contentEditable={isEditable}>MAJOR PROJECTS</h2>

                <div className="ep-edu-item">
                  <p contentEditable={isEditable} className="ep-edu-degree">
                    Downtown Metro Bridge Expansion – Lead Engineer
                  </p>
                  <p contentEditable={isEditable} className="ep-edu-meta">
                    Designed high-load steel components
                  </p>
                </div>

                <div className="ep-edu-item">
                  <p contentEditable={isEditable} className="ep-edu-degree">
                    Coastal Flood Mitigation Project – Team Lead
                  </p>
                  <p contentEditable={isEditable} className="ep-edu-meta">
                    Developed water-channel simulations
                  </p>
                </div>
              </section>

              {/* EXTRA CONTENT */}
              <section className="ep-section">
                <h2 className="ep-section-title" contentEditable={isEditable}>
                  PROJECT HIGHLIGHTS
                </h2>
                <ul className="ep-job-list">
                  <li contentEditable={isEditable}>Structural design lead...</li>
                  <li contentEditable={isEditable}>Improved BIM workflow...</li>
                  <li contentEditable={isEditable}>Conducted soil tests...</li>
                </ul>
              </section>

              <section className="ep-section">
                <h2 className="ep-section-title" contentEditable={isEditable}>
                  TECHNICAL SPECIALIZATION
                </h2>
                <ul className="ep-job-list">
                  <li contentEditable={isEditable}>Finite Element Modeling</li>
                  <li contentEditable={isEditable}>Geotechnical Engineering</li>
                  <li contentEditable={isEditable}>Hydraulic Systems</li>
                  <li contentEditable={isEditable}>Cost Estimation</li>
                </ul>
              </section>

            </section>

            {/* EDUCATION */}
            <section className="ep-section-block ep-last">
              <h2 className="ep-section-title" contentEditable={isEditable}>
                EDUCATION
              </h2>

              <div className="ep-edu-item">
                <p className="ep-edu-degree" contentEditable={isEditable}>
                  M.S. Civil Engineering
                </p>
                <p className="ep-edu-meta" contentEditable={isEditable}>
                  University of California — 2013–2015
                </p>
              </div>

              <div className="ep-edu-item">
                <p className="ep-edu-degree" contentEditable={isEditable}>
                  B.S. Civil Engineering
                </p>
                <p className="ep-edu-meta" contentEditable={isEditable}>
                  University of Texas — 2009–2013
                </p>
              </div>
            </section>

          </main>

        </div>
      </div>
    </div>
  );
}
