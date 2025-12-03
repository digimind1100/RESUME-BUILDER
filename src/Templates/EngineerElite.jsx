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

  // ---- Profile image (square) ----
  const [profileImage, setProfileImage] = useState(
    "/images/engineereliteprofileimage.png" // put any default square image here
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

  // ---- QR Code data URL ----
  const [qrDataUrl, setQrDataUrl] = useState("");

  const handleCreateQr = async () => {
    // jo data QR me chahiye woh yahan assemble karo
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
      alert("QR Code generate karte waqt error aaya. Console check karein.");
    }
  };

  // ---- Download PDF (sirf A4 area capture) ----
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
    pdf.save("engineer-elite-resume.pdf");
  };

  const handleReset = () => window.location.reload();

  return (
    <div className="ee-wrapper">
      {/* ===== TOP BUTTONS ===== */}
      <div className="ee-buttons">
        <button onClick={handleDownloadPDF}>Download PDF</button>
        <button onClick={() => navigate("/templates")}>Back to Templates</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {/* ===== PERSONAL INFO FORM (for QR) ===== */}
      <div className="ee-form">
        <h3 className="ee-form-title">Personal Info (for QR Code)</h3>
        <div className="ee-form-grid">
          <div className="ee-form-field">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={info.fullName}
              onChange={handleInfoChange}
              placeholder="Emma Roberts"
            />
          </div>
          <div className="ee-form-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={info.email}
              onChange={handleInfoChange}
              placeholder="emma@mail.com"
            />
          </div>
          <div className="ee-form-field">
            <label>Telephone</label>
            <input
              type="tel"
              name="phone"
              value={info.phone}
              onChange={handleInfoChange}
              placeholder="+1 555-123-4567"
            />
          </div>
          <div className="ee-form-field">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={info.address}
              onChange={handleInfoChange}
              placeholder="123 Main Street"
            />
          </div>
          <div className="ee-form-field">
            <label>State</label>
            <input
              type="text"
              name="state"
              value={info.state}
              onChange={handleInfoChange}
              placeholder="CA"
            />
          </div>
          <div className="ee-form-field">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={info.city}
              onChange={handleInfoChange}
              placeholder="Los Angeles"
            />
          </div>
          <div className="ee-form-field">
            <label>Zip Code</label>
            <input
              type="text"
              name="zip"
              value={info.zip}
              onChange={handleInfoChange}
              placeholder="90001"
            />
          </div>
          <div className="ee-form-field">
            <label>LinkedIn Profile</label>
            <input
              type="text"
              name="linkedin"
              value={info.linkedin}
              onChange={handleInfoChange}
              placeholder="linkedin.com/in/username"
            />
          </div>
          <div className="ee-form-field ee-form-full">
            <label>Engineer ID</label>
            <input
              type="text"
              name="engineerId"
              value={info.engineerId}
              onChange={handleInfoChange}
              placeholder="ENG-2025-001"
            />
          </div>
        </div>
        <div className="ee-form-actions">
          <button onClick={handleCreateQr}>Create QR Code</button>
        </div>
      </div>

      {/* ===== A4 RESUME PAGE ===== */}
      <div className="ee-a4" ref={resumeRef}>
        <div className="ee-resume">
          {/* ---------- LEFT SIDEBAR ---------- */}
          <aside className="ee-sidebar">
            {/* Profile photo */}
            <div className="ee-photo-wrapper" onClick={triggerProfileSelect}>
              <img src={profileImage} alt="Profile" className="ee-photo" />
              <input
                type="file"
                accept="image/*"
                ref={profileInputRef}
                style={{ display: "none" }}
                onChange={handleProfileUpload}
              />
            </div>

            {/* QR Code FULL WIDTH */}
            <div className="ee-qr-wrapper">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="QR Code" className="ee-qr-image" />
              ) : (
                <div className="ee-qr-placeholder">
                  <span>QR CODE</span>
                  <span className="ee-qr-small-text">
                    Fill form &amp; click "Create QR Code"
                  </span>
                </div>
              )}
            </div>

            {/* ENGINEER ID BELOW QR */}
            <div className="ee-engineer-id">
              <span className="ee-engineer-id-label">ENGINEER ID</span>
              <span className="ee-engineer-id-value">
                {info.engineerId || "ENG-XXXX-XXX"}
              </span>
            </div>

            {/* SKILLS etc just like design */}
            <section className="ee-side-section">
              <h3 className="ee-side-heading">SKILLS</h3>
              <ul className="ee-side-list">
                <li contentEditable>CAD Modeling</li>
                <li contentEditable>Thermodynamics</li>
                <li contentEditable>Finite Element Analysis</li>
                <li contentEditable>Problem Solving</li>
                <li contentEditable>Technical Writing</li>
              </ul>
            </section>

            <section className="ee-side-section">
              <h3 className="ee-side-heading">TOOLS</h3>
              <ul className="ee-side-list">
                <li contentEditable>SolidWorks</li>
                <li contentEditable>AutoCAD</li>
                <li contentEditable>MATLAB</li>
                <li contentEditable>MS Office</li>
              </ul>
            </section>

            <section className="ee-side-section">
              <h3 className="ee-side-heading">CERTIFICATIONS</h3>
              <p
                className="ee-side-text"
                contentEditable
                suppressContentEditableWarning
              >
                Certified SolidWorks Professional (CSWP)
                <br />
                Professional Engineer (PE)
              </p>
            </section>
          </aside>

          {/* ---------- RIGHT MAIN CONTENT ---------- */}
          <main className="ee-main">
            {/* Header name/title */}
            <header className="ee-header">
              <h1
                className="ee-name"
                contentEditable
                suppressContentEditableWarning
              >
                EMMA ROBERTS
              </h1>
              <p
                className="ee-title"
                contentEditable
                suppressContentEditableWarning
              >
                MECHANICAL ENGINEER
              </p>
              <div className="ee-header-line" />
            </header>

            {/* Summary */}
            <section className="ee-section">
              <h2 className="ee-section-title" contentEditable>
                SUMMARY
              </h2>
              <p
                className="ee-section-text"
                contentEditable
                suppressContentEditableWarning
              >
                Detail-oriented mechanical engineer with 6+ years of experience
                in designing, developing, and testing mechanical systems. Strong
                expertise in CAD modeling, thermal analysis, and cross-functional
                collaboration to deliver reliable, efficient engineering
                solutions.
              </p>
            </section>

            {/* Experience */}
            <section className="ee-section">
              <h2 className="ee-section-title" contentEditable>
                EXPERIENCE
              </h2>

              <div className="ee-job">
                <div className="ee-job-header">
                  <div>
                    <p
                      className="ee-job-title"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      Mechanical Engineer
                    </p>
                    <p
                      className="ee-job-company"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      ABC Manufacturing &mdash; Los Angeles, CA
                    </p>
                  </div>
                  <p
                    className="ee-job-dates"
                    contentEditable
                    suppressContentEditableWarning
                  >
                    2018 &ndash; Present
                  </p>
                </div>

                <ul className="ee-job-list">
                  <li contentEditable>
                    Lead design and validation of mechanical components for
                    industrial equipment.
                  </li>
                  <li contentEditable>
                    Collaborate with cross-functional teams to optimize
                    manufacturability and cost.
                  </li>
                  <li contentEditable>
                    Develop detailed CAD models, drawings, and documentation.
                  </li>
                  <li contentEditable>
                    Implement design improvements that increased reliability by
                    15%.
                  </li>
                </ul>
              </div>

              <div className="ee-job">
                <div className="ee-job-header">
                  <div>
                    <p
                      className="ee-job-title"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      Jr. Mechanical Engineer
                    </p>
                    <p
                      className="ee-job-company"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      XYZ Technologies &mdash; Pasadena, CA
                    </p>
                  </div>
                  <p
                    className="ee-job-dates"
                    contentEditable
                    suppressContentEditableWarning
                  >
                    2015 &ndash; 2018
                  </p>
                </div>

                <ul className="ee-job-list">
                  <li contentEditable>
                    Assisted in mechanical design and testing of prototype
                    systems.
                  </li>
                  <li contentEditable>
                    Supported field installations and troubleshooting
                    activities.
                  </li>
                  <li contentEditable>
                    Prepared technical reports and test summaries for senior
                    engineers.
                  </li>
                </ul>
              </div>
            </section>

            {/* Projects */}
            <section className="ee-section">
              <h2 className="ee-section-title" contentEditable>
                PROJECTS
              </h2>

              <div className="ee-project">
                <div className="ee-project-header">
                  <p
                    className="ee-project-title"
                    contentEditable
                    suppressContentEditableWarning
                  >
                    Heat Exchanger Optimization
                  </p>
                  <p
                    className="ee-project-year"
                    contentEditable
                    suppressContentEditableWarning
                  >
                    2020
                  </p>
                </div>
                <p
                  className="ee-section-text"
                  contentEditable
                  suppressContentEditableWarning
                >
                  Led a cross-functional engineering team to redesign a heat
                  exchanger system, improving thermal efficiency by 18% while
                  reducing material cost by 10%.
                </p>
              </div>
            </section>

            {/* Education */}
            <section className="ee-section ee-last">
              <h2 className="ee-section-title" contentEditable>
                EDUCATION
              </h2>

              <div className="ee-edu-item">
                <p
                  className="ee-edu-degree"
                  contentEditable
                  suppressContentEditableWarning
                >
                  M.S. in Mechanical Engineering
                </p>
                <p
                  className="ee-edu-meta"
                  contentEditable
                  suppressContentEditableWarning
                >
                  University of California, Berkeley &mdash; 2015 &ndash; 2018
                </p>
              </div>

              <div className="ee-edu-item">
                <p
                  className="ee-edu-degree"
                  contentEditable
                  suppressContentEditableWarning
                >
                  B.S. in Mechanical Engineering
                </p>
                <p
                  className="ee-edu-meta"
                  contentEditable
                  suppressContentEditableWarning
                >
                  University of Texas at Austin &mdash; 2009 &ndash; 2013
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
