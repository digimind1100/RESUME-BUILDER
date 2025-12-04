import React, { useRef, useState } from "react";
import "./EngineerPrime.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import QRCode from "qrcode";

export default function EngineerPrime() {
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  // PROFILE IMAGE
  const [profileImage, setProfileImage] = useState("/images/cleanprofileimage.png");
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

          <input placeholder="Z90001" onChange={(e) => setZip(e.target.value)} />

          <input placeholder="90001" onChange={(e) => setZip(e.target.value)} />

        </div>
        <input placeholder="linkedin.com/in/username" onChange={(e) => setLinkedin(e.target.value)} />

        <button className="ep-qr-btn" onClick={generateQRCode}>Create QR Code</button>
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
              <h3 className="ep-section-heading">CORE SKILLS</h3>
              <ul className="ep-list">
                <li contentEditable>Structural Analysis</li>
                <li contentEditable>Foundation Design</li>
                <li contentEditable>AutoCAD / Civil 3D</li>
                <li contentEditable>Seismic Load Calculations</li>
                <li contentEditable>Project Coordination</li>
              </ul>
            </section>

            <section className="ep-section">
              <h3 className="ep-section-heading">SOFTWARE</h3>
              <ul className="ep-list">
                <li contentEditable>ETABS</li>
                <li contentEditable>SAP2000</li>
                <li contentEditable>STAAD Pro</li>
                <li contentEditable>Revit</li>
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
              <h1 className="ep-name" contentEditable suppressContentEditableWarning>
                JONATHAN KELVIN
              </h1>
              <p className="ep-title" contentEditable suppressContentEditableWarning>
                CIVIL ENGINEER
              </p>
            </section>

            {/* SUMMARY */}
            <section className="ep-section-block">
              <h2 className="ep-section-title">SUMMARY</h2>
              <p className="ep-text" contentEditable>
                Civil engineer with 8+ years of experience specializing in structural design,
                site planning, and infrastructure development. Skilled in seismic analysis,
                load calculations, and multi-disciplinary coordination.
              </p>
            </section>

            {/* EXPERIENCE */}
            <section className="ep-section-block">
              <h2 className="ep-section-title">EXPERIENCE</h2>

              <div className="ep-job">
                <div className="ep-job-header">
                  <h3 contentEditable>Senior Civil Engineer</h3>
                  <p contentEditable>2019 – Present</p>
                </div>
                <p className="ep-job-location" contentEditable>BlueStone Engineering, NY</p>
                <ul className="ep-job-list">
                  <li contentEditable>Performed seismic load analysis for high-rise structures.</li>
                  <li contentEditable>Led a team of 6 engineers for commercial structural projects.</li>
                  <li contentEditable>Optimized foundation systems reducing cost by 14%.</li>
                  <li contentEditable>Conducted site inspections and ensured regulatory compliance.</li>
                </ul>
              </div>

              <div className="ep-job">
                <div className="ep-job-header">
                  <h3 contentEditable>Structural Engineer</h3>
                  <p contentEditable>2015 – 2019</p>
                </div>
                <p className="ep-job-location" contentEditable>Skyline Consultants, CA</p>
                <ul className="ep-job-list">
                  <li contentEditable>Designed reinforced concrete and steel structural components.</li>
                  <li contentEditable>Performed soil and geotechnical analysis for major bridge projects.</li>
                  <li contentEditable>Prepared detailed CAD drawings and calculation reports.</li>
                </ul>
              </div>

              {/* PROJECTS */}
<section className="ep-section ep-last">
  <h2 className="ep-section-title">MAJOR PROJECTS</h2>

  <div className="ep-edu-item">
    <p contentEditable className="ep-edu-degree">
      Downtown Metro Bridge Expansion – Lead Structural Engineer
    </p>
    <p contentEditable className="ep-edu-meta">
      Designed high-load steel components and coordinated seismic analysis.
    </p>
  </div>

  <div className="ep-edu-item">
    <p contentEditable className="ep-edu-degree">
      Coastal Flood Mitigation Project – Civil Team Lead
    </p>
    <p contentEditable className="ep-edu-meta">
      Developed water-channel flow simulations and optimized protective barriers.
    </p>
  </div>
</section>


              {/* EXTRA ADDED CONTENT FOR FULL PAGE */}
              <section className="ep-section">
                <h2 className="ep-section-title">PROJECT HIGHLIGHTS</h2>
                <ul className="ep-job-list">
                  <li contentEditable>Structural design lead for a $45M commercial tower.</li>
                  <li contentEditable>Improved BIM workflow reducing errors by 18%.</li>
                  <li contentEditable>Conducted soil tests for a major urban bridge expansion.</li>
                </ul>
              </section>

              <section className="ep-section">
                <h2 className="ep-section-title">TECHNICAL SPECIALIZATION</h2>
                <ul className="ep-job-list">
                  <li contentEditable>Finite Element Modeling (FEM)</li>
                  <li contentEditable>Geotechnical Engineering</li>
                  <li contentEditable>Hydraulic Systems</li>
                  <li contentEditable>Cost Estimation</li>
                </ul>
              </section>

            </section>

            {/* EDUCATION */}
            <section className="ep-section-block ep-last">
              <h2 className="ep-section-title">EDUCATION</h2>

              <div className="ep-edu-item">
                <p className="ep-edu-degree" contentEditable>
                  M.S. Civil Engineering
                </p>
                <p className="ep-edu-meta" contentEditable>
                  University of California — 2013–2015
                </p>
              </div>

              <div className="ep-edu-item">
                <p className="ep-edu-degree" contentEditable>
                  B.S. Civil Engineering
                </p>
                <p className="ep-edu-meta" contentEditable>
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
