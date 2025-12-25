import React, { useRef, useState } from "react";
import "./EngineerPrime.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import QRCode from "qrcode";

import usePaymentGuard from "../hooks/usePaymentGuard";
import PaymentGate from "../components/payment/PaymentGate";
import { useAuth } from "../context/AuthContext";

import Watermark from "../components/Watermark";


export default function EngineerPrime() {
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  const {
    isPaid,
    showPaymentModal,
    setShowPaymentModal,
    requirePayment,
    handlePaymentSuccess,
  } = usePaymentGuard("EngineerPrime"); // 🔴 TEMPLATE NAME

  const canEdit = isPaid;



  // PROFILE IMAGE
  const [profileImage, setProfileImage] = useState("/images/cleanprofileimage.png");
  const fileInputRef = useRef(null);

const handleImageUpload = (event) => {
  if (!canEdit) return; // 🔒 premium lock safety

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
          className={canEdit ? "edit-btn on" : "edit-btn off"}
          onClick={() => {
            if (!requirePayment()) return;
          }}
        >
          {canEdit ? "Editing: ON" : "Editing: OFF"}
        </button>

      </div>

      {/* ==== MINI FORM FOR QR GENERATION ==== */}
      <div className="ep-mini-form">
        <input placeholder="Emma Roberts" onChange={(e) => setFullName(e.target.value)} disabled={!canEdit} />
        <input placeholder="emma@mail.com" onChange={(e) => setEmail(e.target.value)} disabled={!canEdit} />
        <input placeholder="+1 555-123-4567" onChange={(e) => setTelephone(e.target.value)} disabled={!canEdit} />
        <input placeholder="123 Main Street" onChange={(e) => setAddress(e.target.value)} disabled={!canEdit} />
        <div className="ep-mini-row">
          <input placeholder="Los Angeles" onChange={(e) => setCity(e.target.value)} disabled={!canEdit} />
          <input placeholder="CA" onChange={(e) => setState(e.target.value)} disabled={!canEdit} />
          <input placeholder="90001" onChange={(e) => setZip(e.target.value)} disabled={!canEdit} />
        </div>
        <input placeholder="linkedin.com/in/username" onChange={(e) => setLinkedin(e.target.value)} disabled={!canEdit} />

        <button className="ep-qr-btn" onClick={generateQRCode} >
          Create QR Code
        </button>
      </div>

      {/* ==== A4 PAGE ==== */}
     <div className="ep-a4" ref={resumeRef} style={{ position: "relative" }}>
  <Watermark show={!canEdit} />

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
  className={`ep-photo-hex ${!canEdit ? "locked" : ""}`}
  onClick={() => {
    if (!requirePayment()) return; // unpaid → payment modal
    triggerFileSelect();           // paid → file picker
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
              <h3 className="ep-section-heading" contentEditable={canEdit}>
                CORE SKILLS
              </h3>
              <ul className="ep-list">
                <li contentEditable={canEdit}>Structural Analysis</li>
                <li contentEditable={canEdit}>Foundation Design</li>
                <li contentEditable={canEdit}>AutoCAD / Civil 3D</li>
                <li contentEditable={canEdit}>Seismic Load Calculations</li>
                <li contentEditable={canEdit}>Project Coordination</li>
              </ul>
            </section>

            <section className="ep-section">
              <h3 className="ep-section-heading" contentEditable={canEdit}>
                SOFTWARE
              </h3>
              <ul className="ep-list">
                <li contentEditable={canEdit}>ETABS</li>
                <li contentEditable={canEdit}>SAP2000</li>
                <li contentEditable={canEdit}>STAAD Pro</li>
                <li contentEditable={canEdit}>Revit</li>
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
              <h1 className="ep-name" contentEditable={canEdit}>
                JONATHAN KELVIN
              </h1>
              <p className="ep-title" contentEditable={canEdit}>
                CIVIL ENGINEER
              </p>
            </section>

            {/* SUMMARY */}
            <section className="ep-section-block">
              <h2 className="ep-section-title" contentEditable={canEdit}>SUMMARY</h2>
              <p className="ep-text" contentEditable={canEdit}>
                Civil engineer with 8+ years of experience specializing in structural design,
                site planning, and infrastructure development.
              </p>
            </section>

            {/* EXPERIENCE */}
            <section className="ep-section-block">
              <h2 className="ep-section-title" contentEditable={canEdit}>EXPERIENCE</h2>

              {/* Job 1 */}
              <div className="ep-job">
                <div className="ep-job-header">
                  <h3 contentEditable={canEdit}>Senior Civil Engineer</h3>
                  <p contentEditable={canEdit}>2019 – Present</p>
                </div>

                <p className="ep-job-location" contentEditable={canEdit}>
                  BlueStone Engineering, NY
                </p>

                <ul className="ep-job-list">
                  <li contentEditable={canEdit}>Performed seismic load analysis...</li>
                  <li contentEditable={canEdit}>Led a team of 6 engineers...</li>
                  <li contentEditable={canEdit}>Optimized foundation systems...</li>
                  <li contentEditable={canEdit}>Conducted site inspections...</li>
                </ul>
              </div>

              {/* Job 2 */}
              <div className="ep-job">
                <div className="ep-job-header">
                  <h3 contentEditable={canEdit}>Structural Engineer</h3>
                  <p contentEditable={canEdit}>2015 – 2019</p>
                </div>

                <p className="ep-job-location" contentEditable={canEdit}>
                  Skyline Consultants, CA
                </p>

                <ul className="ep-job-list">
                  <li contentEditable={canEdit}>Designed reinforced concrete...</li>
                  <li contentEditable={canEdit}>Performed soil and geotechnical analysis...</li>
                  <li contentEditable={canEdit}>Prepared detailed CAD drawings...</li>
                </ul>
              </div>

              {/* PROJECTS */}
              <section className="ep-section ep-last">
                <h2 className="ep-section-title" contentEditable={canEdit}>MAJOR PROJECTS</h2>

                <div className="ep-edu-item">
                  <p contentEditable={canEdit} className="ep-edu-degree">
                    Downtown Metro Bridge Expansion – Lead Engineer
                  </p>
                  <p contentEditable={canEdit} className="ep-edu-meta">
                    Designed high-load steel components
                  </p>
                </div>

                <div className="ep-edu-item">
                  <p contentEditable={canEdit} className="ep-edu-degree">
                    Coastal Flood Mitigation Project – Team Lead
                  </p>
                  <p contentEditable={canEdit} className="ep-edu-meta">
                    Developed water-channel simulations
                  </p>
                </div>
              </section>

              {/* EXTRA CONTENT */}
              <section className="ep-section">
                <h2 className="ep-section-title" contentEditable={canEdit}>
                  PROJECT HIGHLIGHTS
                </h2>
                <ul className="ep-job-list">
                  <li contentEditable={canEdit}>Structural design lead...</li>
                  <li contentEditable={canEdit}>Improved BIM workflow...</li>
                  <li contentEditable={canEdit}>Conducted soil tests...</li>
                </ul>
              </section>

              <section className="ep-section">
                <h2 className="ep-section-title" contentEditable={canEdit}>
                  TECHNICAL SPECIALIZATION
                </h2>
                <ul className="ep-job-list">
                  <li contentEditable={canEdit}>Finite Element Modeling</li>
                  <li contentEditable={canEdit}>Geotechnical Engineering</li>
                  <li contentEditable={canEdit}>Hydraulic Systems</li>
                  <li contentEditable={canEdit}>Cost Estimation</li>
                </ul>
              </section>

            </section>

            {/* EDUCATION */}
            <section className="ep-section-block ep-last">
              <h2 className="ep-section-title" contentEditable={canEdit}>
                EDUCATION
              </h2>

              <div className="ep-edu-item">
                <p className="ep-edu-degree" contentEditable={canEdit}>
                  M.S. Civil Engineering
                </p>
                <p className="ep-edu-meta" contentEditable={canEdit}>
                  University of California — 2013–2015
                </p>
              </div>

              <div className="ep-edu-item">
                <p className="ep-edu-degree" contentEditable={canEdit}>
                  B.S. Civil Engineering
                </p>
                <p className="ep-edu-meta" contentEditable={canEdit}>
                  University of Texas — 2009–2013
                </p>
              </div>
            </section>

          </main>
          <PaymentGate
            open={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            onSuccess={handlePaymentSuccess}
          />

        </div>
      </div>
    </div>
  );
}
