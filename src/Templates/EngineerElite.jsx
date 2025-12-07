// src/Templates/EngineerElite.jsx
import React, { useRef, useState } from "react";
import "./EngineerElite.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import QRCode from "qrcode";

export default function EngineerElite() {
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  /* ================= EDIT MODE ================= */
  const [isEditable, setIsEditable] = useState(false);

  // ---- Profile image (square) ----
  const [profileImage, setProfileImage] = useState(
    "/images/engineereliteprofileimage.png"
  );
  const profileInputRef = useRef(null);

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const triggerProfileSelect = () => {
    if (profileInputRef.current) profileInputRef.current.click();
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

  // ---- Download PDF ----
  const handleDownloadPDF = async () => {
    const element = resumeRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2, useCORS: true });

    const pdf = new jsPDF("p", "mm", "a4");
    const imgData = canvas.toDataURL("image/png");
    const pdfWidth = 210;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
    pdf.save("engineer-elite-resume.pdf");
  };

  const handleReset = () => window.location.reload();

  return (
    <div className="ee-wrapper">

      {/* ---------- TOP BUTTONS ---------- */}
      <div className="ee-buttons">
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

      {/* ---------- PERSONAL INFO FORM ---------- */}
      <div className="ee-form">
        <h3 className="ee-form-title">Personal Info (for QR Code)</h3>

        <div className="ee-form-grid">

          <div className="ee-form-field">
            <label>Full Name</label>
            <input name="fullName" value={info.fullName} onChange={handleInfoChange} />
          </div>

          <div className="ee-form-field">
            <label>Email</label>
            <input name="email" value={info.email} onChange={handleInfoChange} />
          </div>

          <div className="ee-form-field">
            <label>Telephone</label>
            <input name="phone" value={info.phone} onChange={handleInfoChange} />
          </div>

          <div className="ee-form-field">
            <label>Address</label>
            <input name="address" value={info.address} onChange={handleInfoChange} />
          </div>

          <div className="ee-form-field">
            <label>State</label>
            <input name="state" value={info.state} onChange={handleInfoChange} />
          </div>

          <div className="ee-form-field">
            <label>City</label>
            <input name="city" value={info.city} onChange={handleInfoChange} />
          </div>

          <div className="ee-form-field">
            <label>Zip Code</label>
            <input name="zip" value={info.zip} onChange={handleInfoChange} />
          </div>

          <div className="ee-form-field">
            <label>LinkedIn</label>
            <input name="linkedin" value={info.linkedin} onChange={handleInfoChange} />
          </div>

          <div className="ee-form-field ee-form-full">
            <label>Engineer ID</label>
            <input name="engineerId" value={info.engineerId} onChange={handleInfoChange} />
          </div>

        </div>

        <div className="ee-form-actions">
          <button onClick={handleCreateQr}>Create QR Code</button>
        </div>
      </div>

      {/* ---------- A4 RESUME ---------- */}
      <div className="ee-a4" ref={resumeRef}>
        <div className="ee-resume">

          {/* LEFT SIDEBAR */}
          <aside className="ee-sidebar">

            <div className="ee-photo-wrapper" onClick={triggerProfileSelect}>
              <img src={profileImage} alt="Profile" className="ee-photo" />
              <input type="file" accept="image/*" ref={profileInputRef} style={{ display: "none" }} onChange={handleProfileUpload} />
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
                <li contentEditable={isEditable}>CAD Modeling</li>
                <li contentEditable={isEditable}>Thermodynamics</li>
                <li contentEditable={isEditable}>Finite Element Analysis</li>
                <li contentEditable={isEditable}>Problem Solving</li>
                <li contentEditable={isEditable}>Technical Writing</li>
              </ul>
            </section>

            <section className="ee-side-section">
              <h3 className="ee-side-heading">TOOLS</h3>
              <ul className="ee-side-list">
                <li contentEditable={isEditable}>SolidWorks</li>
                <li contentEditable={isEditable}>AutoCAD</li>
                <li contentEditable={isEditable}>MATLAB</li>
                <li contentEditable={isEditable}>MS Office</li>
              </ul>
            </section>

            <section className="ee-side-section">
              <h3 className="ee-side-heading">CERTIFICATIONS</h3>
              <p className="ee-side-text" contentEditable={isEditable}>
                Certified SolidWorks Professional (CSWP)
                <br />
                Professional Engineer (PE)
              </p>
            </section>
          </aside>

          {/* RIGHT SECTION */}
          <main className="ee-main">

            <header className="ee-header">
              <h1 className="ee-name" contentEditable={isEditable}>EMMA ROBERTS</h1>
              <p className="ee-title" contentEditable={isEditable}>MECHANICAL ENGINEER</p>
              <div className="ee-header-line" />
            </header>

            <section className="ee-section">
              <h2 className="ee-section-title" contentEditable={isEditable}>SUMMARY</h2>
              <p className="ee-section-text" contentEditable={isEditable}>
                Detail-oriented mechanical engineer with 6+ years of experience...
              </p>
            </section>

            <section className="ee-section">
              <h2 className="ee-section-title" contentEditable={isEditable}>EXPERIENCE</h2>

              <div className="ee-job">
                <div className="ee-job-header">
                  <div>
                    <p className="ee-job-title" contentEditable={isEditable}>Mechanical Engineer</p>
                    <p className="ee-job-company" contentEditable={isEditable}>ABC Manufacturing — Los Angeles</p>
                  </div>
                  <p className="ee-job-dates" contentEditable={isEditable}>2018–Present</p>
                </div>

                <ul className="ee-job-list">
                  <li contentEditable={isEditable}>Lead design and validation...</li>
                  <li contentEditable={isEditable}>Collaborate with cross-functional teams...</li>
                  <li contentEditable={isEditable}>Develop detailed CAD models...</li>
                  <li contentEditable={isEditable}>Implement design improvements...</li>
                </ul>
              </div>

              <div className="ee-job">
                <div className="ee-job-header">
                  <div>
                    <p className="ee-job-title" contentEditable={isEditable}>Jr. Mechanical Engineer</p>
                    <p className="ee-job-company" contentEditable={isEditable}>XYZ Technologies — Pasadena</p>
                  </div>
                  <p className="ee-job-dates" contentEditable={isEditable}>2015–2018</p>
                </div>

                <ul className="ee-job-list">
                  <li contentEditable={isEditable}>Assisted in mechanical design...</li>
                  <li contentEditable={isEditable}>Supported field installations...</li>
                  <li contentEditable={isEditable}>Prepared technical reports...</li>
                </ul>
              </div>
            </section>

            <section className="ee-section">
              <h2 className="ee-section-title" contentEditable={isEditable}>PROJECTS</h2>

              <div className="ee-project">
                <div className="ee-project-header">
                  <p className="ee-project-title" contentEditable={isEditable}>Heat Exchanger Optimization</p>
                  <p className="ee-project-year" contentEditable={isEditable}>2020</p>
                </div>
                <p className="ee-section-text" contentEditable={isEditable}>
                  Led a cross-functional engineering team to redesign...
                </p>
              </div>
            </section>

            <section className="ee-section ee-last">
              <h2 className="ee-section-title" contentEditable={isEditable}>EDUCATION</h2>

              <div className="ee-edu-item">
                <p className="ee-edu-degree" contentEditable={isEditable}>M.S. in Mechanical Engineering</p>
                <p className="ee-edu-meta" contentEditable={isEditable}>UC Berkeley — 2015–2018</p>
              </div>

              <div className="ee-edu-item">
                <p className="ee-edu-degree" contentEditable={isEditable}>B.S. in Mechanical Engineering</p>
                <p className="ee-edu-meta" contentEditable={isEditable}>UT Austin — 2009–2013</p>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
