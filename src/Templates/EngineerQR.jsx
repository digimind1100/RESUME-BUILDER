// src/Templates/EngineerQR.jsx
import React, { useRef, useState } from "react";
import "./EngineerQR.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";



export default function EngineerQR() {
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  // QR image upload (no profile photo in this design)
  const [qrImage, setQrImage] = useState("/images/engineer-qr-placeholder.png");
  const qrInputRef = useRef(null);

  const handleQrUpload = (e) => {
    const file = e.target.files[0];
    if (file) setQrImage(URL.createObjectURL(file));
  };

  const triggerQrSelect = () => {
    if (qrInputRef.current) qrInputRef.current.click();
  };

  // PDF download
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
    pdf.save("engineer-qr-resume.pdf");
  };

  const handleReset = () => window.location.reload();

  return (
    <div className="eng-wrapper">
      {/* Top buttons */}
      <div className="eng-buttons">
        <button onClick={handleDownloadPDF}>Download PDF</button>
        <button onClick={() => navigate("/templates")}>Back to Templates</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {/* A4 page */}
      <div className="eng-a4" ref={resumeRef}>
        <div className="eng-resume">
          {/* LEFT SIDE: name strip + dark sidebar */}
          <div className="eng-left">
            {/* Vertical name strip */}
            <div className="eng-name-strip">
              <span
                className="eng-name-vertical"
                contentEditable
                suppressContentEditableWarning
              >
                JOHN RESUMGO
              </span>
            </div>

            {/* Dark sidebar */}
            <aside className="eng-sidebar">
              {/* QR */}
              <div className="eng-qr-block" onClick={triggerQrSelect}>
                <div className="eng-qr-wrapper">
                  <img src={qrImage} alt="QR Code" className="eng-qr-image" />
                </div>
                <p className="eng-qr-hint">Click to upload QR</p>
                <input
                  type="file"
                  accept="image/*"
                  ref={qrInputRef}
                  style={{ display: "none" }}
                  onChange={handleQrUpload}
                />
              </div>

              {/* Contact */}
              <section className="eng-sidebar-section">
                <h3 className="eng-sidebar-heading" contentEditable>
                  CONTACT
                </h3>

                <ul className="eng-contact-list">
                  <li>
                    <span className="eng-icon">
                      {/* Location pin */}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2C8.962 2 6.5 4.462 6.5 7.5C6.5 11.25 12 18 12 18C12 18 17.5 11.25 17.5 7.5C17.5 4.462 15.038 2 12 2Z"
                          stroke="#ffffff"
                          strokeWidth="1.4"
                        />
                        <circle cx="12" cy="7.5" r="2" fill="#ffffff" />
                      </svg>
                    </span>
                    <span
                      className="eng-contact-text"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      Street Address, City, State ZIP Code
                    </span>
                  </li>

                  <li>
                    <span className="eng-icon">
                      {/* Phone */}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V21a1 1 0 01-1 1C10.52 22 2 13.48 2 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z"
                          fill="#ffffff"
                        />
                      </svg>
                    </span>
                    <span
                      className="eng-contact-text"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      (123) 456-7890
                    </span>
                  </li>

                  <li>
                    <span className="eng-icon">
                      {/* Email */}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="3"
                          y="5"
                          width="18"
                          height="14"
                          rx="2"
                          stroke="#ffffff"
                          strokeWidth="1.4"
                        />
                        <path
                          d="M4 7L12 12L20 7"
                          stroke="#ffffff"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span
                      className="eng-contact-text"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      email@address.com
                    </span>
                  </li>

                  <li>
                    <span className="eng-icon">
                      {/* Globe */}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="8"
                          stroke="#ffffff"
                          strokeWidth="1.4"
                        />
                        <path
                          d="M4 12H20"
                          stroke="#ffffff"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12 4C14 7 15 9.5 15 12C15 14.5 14 17 12 20"
                          stroke="#ffffff"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12 4C10 7 9 9.5 9 12C9 14.5 10 17 12 20"
                          stroke="#ffffff"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <span
                      className="eng-contact-text"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      www.yourportfolio.com
                    </span>
                  </li>
                </ul>
              </section>

              {/* PROFILE */}
              <section className="eng-sidebar-section">
                <h3 className="eng-sidebar-heading" contentEditable>
                  PROFILE
                </h3>
                <p
                  className="eng-sidebar-text"
                  contentEditable
                  suppressContentEditableWarning
                >
                  Detail-oriented engineer with strong experience in designing,
                  analyzing, and optimizing technical systems. Adept at managing
                  complex projects, collaborating with cross-functional teams,
                  and delivering high-quality solutions that meet strict safety,
                  cost, and performance requirements.
                </p>
              </section>

              {/* SKILLS */}
              <section className="eng-sidebar-section">
                <h3 className="eng-sidebar-heading" contentEditable>
                  SKILLS
                </h3>
                <ul className="eng-skill-list">
                  <li contentEditable>Project Planning &amp; Coordination</li>
                  <li contentEditable>CAD / AutoCAD / SolidWorks</li>
                  <li contentEditable>Technical Documentation</li>
                  <li contentEditable>Problem Solving &amp; Analysis</li>
                  <li contentEditable>Team Collaboration</li>
                  <li contentEditable>Quality &amp; Safety Compliance</li>
                </ul>
              </section>

              {/* SOFTWARE */}
              <section className="eng-sidebar-section">
                <h3 className="eng-sidebar-heading" contentEditable>
                  TOOLS &amp; SOFTWARE
                </h3>
                <ul className="eng-skill-list">
                  <li contentEditable>AutoCAD, SolidWorks, Revit</li>
                  <li contentEditable>MATLAB, Excel (Advanced)</li>
                  <li contentEditable>JIRA, Trello, MS Project</li>
                </ul>
              </section>

              {/* EDUCATION IN SIDEBAR (SHORT) */}
              <section className="eng-sidebar-section">
                <h3 className="eng-sidebar-heading" contentEditable>
                  EDUCATION
                </h3>
                <p
                  className="eng-sidebar-text"
                  contentEditable
                  suppressContentEditableWarning
                >
                  B.Sc. Mechanical Engineering
                  <br />
                  University Name &mdash; 2010 &ndash; 2014
                </p>
              </section>
            </aside>
          </div>

          {/* RIGHT SIDE: main content */}
          <main className="eng-main">
            {/* EXPERIENCE */}
            <section className="eng-section">
              <h2 className="eng-section-title" contentEditable>
                EXPERIENCE
              </h2>
              <div className="eng-section-rule" />

              {/* Job 1 */}
              <div className="eng-job">
                <div className="eng-job-header">
                  <div>
                    <p
                      className="eng-job-title"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      Senior Mechanical Engineer
                    </p>
                    <p
                      className="eng-job-company"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      Company Name &mdash; City, Country
                    </p>
                  </div>
                  <p
                    className="eng-job-dates"
                    contentEditable
                    suppressContentEditableWarning
                  >
                    DEC 2018 &mdash; PRESENT
                  </p>
                </div>

                <ul className="eng-job-list">
                  <li contentEditable>
                    Led design and optimization of mechanical components for
                    high-volume production, improving efficiency by 18%.
                  </li>
                  <li contentEditable>
                    Coordinated with cross-functional teams (design, QA,
                    manufacturing) to resolve technical issues and implement
                    engineering changes.
                  </li>
                  <li contentEditable>
                    Prepared detailed drawings, specifications, and reports in
                    accordance with industry standards.
                  </li>
                  <li contentEditable>
                    Mentored junior engineers and reviewed design calculations
                    and documentation.
                  </li>
                </ul>
              </div>

              {/* Job 2 */}
              <div className="eng-job">
                <div className="eng-job-header">
                  <div>
                    <p
                      className="eng-job-title"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      Mechanical Engineer
                    </p>
                    <p
                      className="eng-job-company"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      Company Name &mdash; City, Country
                    </p>
                  </div>
                  <p
                    className="eng-job-dates"
                    contentEditable
                    suppressContentEditableWarning
                  >
                    JUN 2014 &mdash; NOV 2018
                  </p>
                </div>

                <ul className="eng-job-list">
                  <li contentEditable>
                    Supported product development across concept, prototype, and
                    final release stages.
                  </li>
                  <li contentEditable>
                    Performed tolerance analysis, material selection, and
                    feasibility studies.
                  </li>
                  <li contentEditable>
                    Assisted in testing, validation, and troubleshooting of
                    mechanical systems.
                  </li>
                  <li contentEditable>
                    Collaborated with vendors and suppliers to ensure component
                    quality and availability.
                  </li>
                </ul>
              </div>
            </section>

            {/* EDUCATION (DETAIL) */}
            <section className="eng-section">
              <h2 className="eng-section-title" contentEditable>
                EDUCATION
              </h2>
              <div className="eng-section-rule" />

              <div className="eng-edu-item">
                <p
                  className="eng-edu-degree"
                  contentEditable
                  suppressContentEditableWarning
                >
                  Bachelor of Science in Mechanical Engineering
                </p>
                <p
                  className="eng-edu-meta"
                  contentEditable
                  suppressContentEditableWarning
                >
                  University Name &mdash; 2010 &ndash; 2014 | City, Country
                </p>
              </div>

              <div className="eng-edu-item">
                <p
                  className="eng-edu-degree"
                  contentEditable
                  suppressContentEditableWarning
                >
                  Diploma in Engineering Design &amp; Drafting
                </p>
                <p
                  className="eng-edu-meta"
                  contentEditable
                  suppressContentEditableWarning
                >
                  Institute Name &mdash; 2008 &ndash; 2010
                </p>
              </div>
            </section>

            {/* ACHIEVEMENTS */}
            <section className="eng-section eng-section-last">
              <h2 className="eng-section-title" contentEditable>
                ACHIEVEMENTS
              </h2>
              <div className="eng-section-rule" />

              <ul className="eng-job-list">
                <li contentEditable>
                  Reduced production defects by 15% through process
                  improvements.
                </li>
                <li contentEditable>
                  Awarded &ldquo;Engineer of the Year&rdquo; for outstanding
                  project delivery.
                </li>
                <li contentEditable>
                  Successfully managed multiple concurrent design projects with
                  on-time completion.
                </li>
              </ul>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
