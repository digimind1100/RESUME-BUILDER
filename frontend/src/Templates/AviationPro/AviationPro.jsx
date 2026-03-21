// src/Templates/AviationPro.jsx
import React, { useRef, useState } from "react";
import "./AviationPro.css";
import QRCode from "qrcode";

export default function AviationPro({ data }) {

  console.log("AviationPro data:", data);

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
            className={`av-tab ${activeRole === role ? "av-tab-active" : ""}`}
            onClick={() => setActiveRole(role)}
          >
            {roleLabels[role]}
          </button>
        ))}
      </div>

      {/* A4 PAGE */}
      <div className="resume-a4 av-a4">

        <div className="av-resume">

          {/* HEADER */}
          <header className="av-header">

            <div className="av-header-left">

              <div className="av-profile-wrapper">
                <img src={profileImage} alt="Profile" className="av-profile" />
              </div>

              <div className="av-header-text">
                <h1 className="av-name">
                  {data?.name || "ALEXANDER MORGAN"}
                </h1>

                <p className="av-role">
                  {data?.jobTitle || activeData.title}
                </p>
              </div>

            </div>

            <div className="av-header-right">
              <div className="av-qr-block">
                <img src={qrImage} alt="QR Code" className="av-qr-img" />
                <p className="av-qr-text">
                  Scan for profile
                </p>
              </div>
            </div>

          </header>

          <div className="av-runway-stripe" />

          {/* BODY */}
          <div className="av-body">

            {/* MAIN */}
            <main className="av-main">

              <section className="av-section">
                <h2 className="av-section-title">SUMMARY</h2>
                <p className="av-section-text">
                  {activeData.summary}
                </p>
              </section>

              <section className="av-section">
                <h2 className="av-section-title">EXPERIENCE</h2>

                {activeData.experiences.map((exp, i) => (
                  <div key={i} className="av-job">
                    <p className="av-job-title">{exp.title}</p>
                    <p className="av-job-company">{exp.company}</p>
                    <p className="av-job-dates">{exp.dates}</p>

                    <ul>
                      {exp.bullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}

              </section>

              <section className="av-section">
                <h2 className="av-section-title">HIGHLIGHTS</h2>

                <ul>
                  {activeData.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>

              </section>

            </main>

            {/* SIDEBAR */}
            <aside className="av-sidebar">

              <section>
                <h3>CONTACT</h3>
                <p>{data?.email || "email@example.com"}</p>
                <p>{data?.phone || "+123456789"}</p>
              </section>

            </aside>

          </div>

        </div>
      </div>
    </div>
  );
}