// src/Templates/AviationPro.jsx
import React, { useRef, useState } from "react";
import "./AviationPro.css";
import QRCode from "qrcode";

export default function AviationPro({ data, isEditable }) {

  console.log("AviationPro data:", data);

  const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");


  // ---------- PROFILE IMAGE ----------
  const [profileImage, setProfileImage] = useState(
    "/images/cleanprofileimage.png"
  );

  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  // ---------- QR ----------
  const [qrImage, setQrImage] = useState("/images/aviation-qr.png");

  const handleGenerateQR = async () => {
    try {
      const qr = await QRCode.toDataURL("Aviation Resume");
      setQrImage(qr);
    } catch (err) {
      console.error("QR generation error:", err);
    }
  };

  // ---------- ROLES ----------
  const roles = ["pilot", "cabin", "maintenance", "atc", "engineer", "operations"];
  const [activeRole, setActiveRole] = useState("pilot");

  const roleLabels = {
    pilot: "Pilot",
    cabin: "Cabin Crew",
    maintenance: "Maintenance",
    atc: "Air Traffic Controller",
    engineer: "Aeronautical Engineer",
    operations: "Airport Operations",
  };

  // ---------- STATIC DATA ----------
  const roleData = {
    pilot: {
      title: "Commercial Airline Pilot",
      summary: "Experienced airline pilot with strong safety and operational background.",
      experiences: [
        {
          title: "Captain — Boeing 737",
          company: "SkyWings Airlines",
          dates: "2019 – Present",
          bullets: ["Operate commercial flights", "Ensure safety compliance"]
        }
      ],
      highlights: ["4500+ flight hours", "Type rated B737"]
    }
  };

  const activeData = roleData[activeRole] || roleData.pilot;

  return (

        <div className="av-wrapper">

          {/* TABS */}
          <div className="av-tabs no-pdf">
            {roles.map((role) => (
              <button
                key={role}
                className={`av-tab ${activeRole === role ? "av-tab-active" : ""
                  }`}
                onClick={() => setActiveRole(role)}
              >
                {roleLabels[role]}
              </button>
            ))}
          </div>

          {/* A4 PAGE */}
          <div className="resume-a4 av-a4" ref={pdfRef} style={{ position: "relative" }}>

            <div className="av-resume" contentEditable={false}>

              {/* HEADER */}
              <header className="av-header">

                <div className="av-header-left">
                  {/* PHOTO */}
                  <div
                    className={`av-profile-wrapper ${!canEdit ? "locked" : ""}`}
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

                    title={!canEdit ? "Unlock to change profile image" : "Click to change photo"}
                  >

                    <img src={profileImage} alt="Profile" className="av-profile" />

                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />

                  </div>


                  {/* NAME + TITLE */}
                  <div className="av-header-text">
                    <h1
                      className="av-name"
                      contentEditable={isEditable}
                      suppressContentEditableWarning
                    >
                      ALEXANDER MORGAN
                    </h1>

                    <p
                      className="av-role"
                      contentEditable={isEditable}
                      suppressContentEditableWarning
                    >
                      {activeData.title.toUpperCase()}
                    </p>
                  </div>
                </div>

                {/* HEADER QR */}
                <div className="av-header-right">
                  <div className="av-qr-block">
                    <img 
  src={data?.qrImage || qrImage} 
  alt="QR Code" 
  className="av-qr-img" 
/>
                    <p
                      className="av-qr-text"
                      contentEditable={isEditable}
                      suppressContentEditableWarning
                    >
                      Scan for licenses, flight log &amp; full profile
                    </p>
                  </div>
                </div>
              </header>

              <div className="av-runway-stripe" />

              {/* BODY */}
              <div className="av-body">
                {/* MAIN COLUMN */}
                <main className="av-main">
                  {/* SUMMARY */}
                  <section className="av-section">
                    <h2
                      className="av-section-title"
                      contentEditable={isEditable}
                      suppressContentEditableWarning
                    >
                      PROFESSIONAL SUMMARY
                    </h2>
                    <p
                      className="av-section-text"
                      contentEditable={isEditable}
                      suppressContentEditableWarning
                    >
                      {activeData.summary}
                    </p>
                  </section>

                  {/* EXPERIENCE */}
                  <section className="av-section">
                    <h2
                      className="av-section-title"
                      contentEditable={isEditable}
                      suppressContentEditableWarning
                    >
                      EXPERIENCE
                    </h2>

                    {activeData.experiences.map((exp, idx) => (
                      <div className="av-job" key={idx}>
                        <div className="av-job-header">
                          <div>
                            <p
                              className="av-job-title"
                              contentEditable={isEditable}
                              suppressContentEditableWarning
                            >
                              {exp.title}
                            </p>
                            <p
                              className="av-job-company"
                              contentEditable={isEditable}
                              suppressContentEditableWarning
                            >
                              {exp.company}
                            </p>
                          </div>

                          <p
                            className="av-job-dates"
                            contentEditable={isEditable}
                            suppressContentEditableWarning
                          >
                            {exp.dates}
                          </p>
                        </div>

                        <ul className="av-job-list">
                          {exp.bullets.map((item, bIndex) => (
                            <li
                              key={bIndex}
                              contentEditable={isEditable}
                              suppressContentEditableWarning
                            >
                              {item}
                            </li>
                          ))}
                        </ul>

                      </div>
                    ))}


                  </section>

                  {/* HIGHLIGHTS */}
                  <section className="av-section av-section-last">
                    <h2
                      className="av-section-title"
                      contentEditable={isEditable}
                      suppressContentEditableWarning
                    >
                      KEY HIGHLIGHTS
                    </h2>

                    <ul className="av-highlight-list">
                      {activeData.highlights.map((item, idx) => (
                        <li
                          key={idx}
                          contentEditable={isEditable}
                          suppressContentEditableWarning
                        >
                          {item}
                        </li>
                      ))}
                    </ul>

                  </section>
                </main>

                {/* SIDEBAR */}
                <aside className="av-sidebar">
                  {/* CONTACT */}
                  <section className="av-side-section">
                    <h3 className="av-side-heading">CONTACT</h3>
                    <ul className="av-side-list">
                      <li contentEditable={isEditable} suppressContentEditableWarning>
                        ✉️ alex.morgan@mail.com
                      </li>
                      <li contentEditable={isEditable} suppressContentEditableWarning>
                        📞 +1 (555) 214-8790
                      </li>
                      <li contentEditable={isEditable} suppressContentEditableWarning>
                        📍 New York, USA
                      </li>
                      <li contentEditable={isEditable} suppressContentEditableWarning>
                        🌐 linkedin.com/in/alexmorgan
                      </li>
                    </ul>
                  </section>

                  {/* QR IN SIDEBAR */}
                  <section className="av-side-section">
                    <h3 className="av-side-heading">DIGITAL IDENTITY</h3>
                    <div className="av-side-qr-box">
                      <img src={qrImage} alt="QR" className="av-side-qr-img" />
                      <p
                        className="av-side-qr-text"
                        contentEditable={isEditable}
                        suppressContentEditableWarning
                      >
                        QR code links to updated digital profile, licenses, and
                        aviation records.
                      </p>
                    </div>
                  </section>

                  {/* SKILLS */}
                  <section className="av-side-section">
                    <h3 className="av-side-heading">CORE SKILLS</h3>
                    <ul className="av-side-list">
                      <li contentEditable={isEditable} suppressContentEditableWarning>
                        Safety &amp; Compliance
                      </li>
                      <li contentEditable={isEditable} suppressContentEditableWarning>
                        Crew Resource Management
                      </li>
                      <li contentEditable={isEditable} suppressContentEditableWarning>
                        Emergency Procedures
                      </li>
                      <li contentEditable={isEditable} suppressContentEditableWarning>
                        Communication &amp; Briefing
                      </li>
                      <li contentEditable={isEditable} suppressContentEditableWarning>
                        Passenger &amp; Client Service
                      </li>
                    </ul>
                  </section>

                  {/* LICENSES */}
                  <section className="av-side-section">
                    <h3 className="av-side-heading">LICENSES &amp; CERTS</h3>
                    <ul className="av-side-list">
                      <li contentEditable={isEditable} suppressContentEditableWarning>
                        Valid Passport &amp; Travel Documents
                      </li>
                      <li contentEditable={isEditable} suppressContentEditableWarning>
                        Medical Certificate – Class 1 / 2
                      </li>
                      <li contentEditable={isEditable} suppressContentEditableWarning>
                        Recurrent Safety &amp; Emergency Training
                      </li>
                    </ul>
                  </section>

                  {/* LANGUAGES */}
                  <section className="av-side-section">
                    <h3 className="av-side-heading">LANGUAGES</h3>
                    <ul className="av-side-list">
                      <li contentEditable={isEditable} suppressContentEditableWarning>
                        English — Native / Fluent
                      </li>
                      <li contentEditable={isEditable} suppressContentEditableWarning>
                        Spanish — Conversational
                      </li>
                      <li contentEditable={isEditable} suppressContentEditableWarning>
                        French — Basic
                      </li>
                    </ul>
                  </section>
                </aside>

              </div>
            </div>
          </div>

        </div>

  );
}
