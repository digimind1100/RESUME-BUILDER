// src/Templates/AviationPro.jsx
import React, { useRef, useState } from "react";
import "./AviationPro.css";

export default function AviationPro({ data, isEditable }) {

  console.log("AviationPro data:", data);

  // ---------- PROFILE IMAGE ----------





  return (
    <div className="av-wrapper">

      {/* A4 PAGE */}
      <div className="resume-a4 av-a4">

        <div className="av-resume">

          {/* HEADER */}
          <header className="av-header">

            <div className="av-header-left">

              {/* PHOTO */}
              <div className="av-profile-wrapper">
  <img
    src={data?.profileImage || "/images/cleanprofileimage.png"}
    alt="Profile"
    className="av-profile"
  />
</div>

              {/* NAME + TITLE */}
              <div className="av-header-text">
                <h1
                  className="av-name"
                  contentEditable={isEditable}
                  suppressContentEditableWarning
                >
                  {data?.name || "Your Name"}
                </h1>

                <p
                  className="av-role"
                  contentEditable={isEditable}
                  suppressContentEditableWarning
                >
                  {data?.jobTitle || "Job Title"}
                </p>
              </div>

            </div>

            {/* HEADER QR */}
            <div className="av-header-right">
              <div className="av-qr-block">
               
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

            {/* MAIN */}
            <main className="av-main">

              {/* SUMMARY */}
              <section className="av-section">
                <h2 className="av-section-title">PROFESSIONAL SUMMARY</h2>
                <p
                  className="av-section-text"
                  contentEditable={isEditable}
                  suppressContentEditableWarning
                >
                  {data?.summary || "Write your professional summary here"}
                </p>
              </section>

              {/* EXPERIENCE */}
              <section className="av-section">
                <h2 className="av-section-title">EXPERIENCE</h2>

                {data?.experience?.length ? (
                  data.experience.map((exp, idx) => (
                    <div className="av-job" key={idx}>
                      <p className="av-job-title">{exp.title}</p>
                      <p className="av-job-company">{exp.company}</p>
                      <p className="av-job-dates">{exp.dates}</p>

                      <ul className="av-job-list">
                        {exp.bullets?.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <p>No experience added</p>
                )}

              </section>

              {/* HIGHLIGHTS */}
              <section className="av-section av-section-last">
                <h2 className="av-section-title">KEY HIGHLIGHTS</h2>

                <ul className="av-highlight-list">
                  {data?.highlights?.length ? (
                    data.highlights.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))
                  ) : (
                    <li>No highlights added</li>
                  )}
                </ul>

              </section>

            </main>

            {/* SIDEBAR */}
            <aside className="av-sidebar">

              {/* CONTACT */}
              <section className="av-side-section">
                <h3 className="av-side-heading">CONTACT</h3>
                <ul className="av-side-list">
                  <li>{data?.email || "email@example.com"}</li>
                  <li>{data?.phone || "+123456789"}</li>
                  <li>{data?.address || "Your Address"}</li>
                  <li>{data?.linkedin || "linkedin.com"}</li>
                </ul>
              </section>

              {/* QR SIDEBAR */}
              <section className="av-side-section">
                <h3 className="av-side-heading">DIGITAL IDENTITY</h3>
                <div className="av-side-qr-box">
                  <img
  src={data?.qrImage || "/images/aviation-qr.png"}
  alt="QR Code"
  className="av-qr-img"
/>
               
                </div>
              </section>

              {/* SKILLS */}
              <section className="av-side-section">
                <h3 className="av-side-heading">CORE SKILLS</h3>
                <ul className="av-side-list">
                  {data?.skills?.length ? (
                    data.skills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))
                  ) : (
                    <li>No skills added</li>
                  )}
                </ul>
              </section>

            </aside>

          </div>

        </div>
      </div>

    </div>
  );
}