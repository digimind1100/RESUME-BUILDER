// src/Templates/SoftTech.jsx
import React, { useRef, useState } from "react";
import "./SoftTech.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import QRCode from "qrcode";

export default function SoftTech() {
  const navigate = useNavigate();
  const resumeRef = useRef(null);

  /* ---------- PROFILE IMAGE ---------- */
  const [profileImage, setProfileImage] = useState(
    "/images/minimalaccentprofileimage.png" // apni default image yahan rakhna
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

  /* ---------- PERSONAL INFO FORM (QR DATA) ---------- */
  const [info, setInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    zip: "",
    linkedin: "",
    github: "",
    portfolio: "",
  });

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------- QR CODE STATE ---------- */
  const [qrDataUrl, setQrDataUrl] = useState("");

  const handleCreateQr = async () => {
    const payload = JSON.stringify(
      {
        name: info.fullName,
        email: info.email,
        phone: info.phone,
        address: info.address,
        state: info.state,
        city: info.city,
        zip: info.zip,
        linkedin: info.linkedin,
        github: info.github,
        portfolio: info.portfolio,
      },
      null,
      0
    );

    try {
      const url = await QRCode.toDataURL(payload);
      setQrDataUrl(url);
    } catch (err) {
      console.error("QR error:", err);
      alert("QR Code generate karte waqt error aaya (console check karein).");
    }
  };

  /* ---------- DOWNLOAD PDF ---------- */
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
    pdf.save("softtech-developer-resume.pdf");
  };

  const handleReset = () => window.location.reload();

  return (
    <div className="st-wrapper">
      {/* ---------- TOP BUTTONS ---------- */}
      <div className="st-buttons">
        <button onClick={handleDownloadPDF}>Download PDF</button>
        <button onClick={() => navigate("/templates")}>Back to Templates</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {/* ---------- PERSONAL INFO FORM (FOR QR) ---------- */}
      <div className="st-form">
        <h3 className="st-form-title">Personal Info (QR Code)</h3>
        <div className="st-form-grid">
          <div className="st-form-field">
            <label>Full Name</label>
            <input
              name="fullName"
              value={info.fullName}
              onChange={handleInfoChange}
              placeholder="Emma Roberts"
            />
          </div>
          <div className="st-form-field">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={info.email}
              onChange={handleInfoChange}
              placeholder="emma@mail.com"
            />
          </div>
          <div className="st-form-field">
            <label>Telephone</label>
            <input
              name="phone"
              value={info.phone}
              onChange={handleInfoChange}
              placeholder="+1 555-123-4567"
            />
          </div>
          <div className="st-form-field">
            <label>Address</label>
            <input
              name="address"
              value={info.address}
              onChange={handleInfoChange}
              placeholder="123 Main Street"
            />
          </div>
          <div className="st-form-field">
            <label>State</label>
            <input
              name="state"
              value={info.state}
              onChange={handleInfoChange}
              placeholder="CA"
            />
          </div>
          <div className="st-form-field">
            <label>City</label>
            <input
              name="city"
              value={info.city}
              onChange={handleInfoChange}
              placeholder="San Francisco"
            />
          </div>
          <div className="st-form-field">
            <label>Zip Code</label>
            <input
              name="zip"
              value={info.zip}
              onChange={handleInfoChange}
              placeholder="94105"
            />
          </div>
          <div className="st-form-field">
            <label>LinkedIn</label>
            <input
              name="linkedin"
              value={info.linkedin}
              onChange={handleInfoChange}
              placeholder="linkedin.com/in/username"
            />
          </div>
          <div className="st-form-field">
            <label>GitHub</label>
            <input
              name="github"
              value={info.github}
              onChange={handleInfoChange}
              placeholder="github.com/username"
            />
          </div>
          <div className="st-form-field st-form-full">
            <label>Portfolio</label>
            <input
              name="portfolio"
              value={info.portfolio}
              onChange={handleInfoChange}
              placeholder="https://your-portfolio.com"
            />
          </div>
        </div>

        <div className="st-form-actions">
          <button onClick={handleCreateQr}>Create QR Code</button>
        </div>
      </div>

      {/* ---------- A4 RESUME AREA ---------- */}
      <div className="st-a4" ref={resumeRef}>
        <div className="st-resume">
          {/* ===== LEFT SIDEBAR ===== */}
          <aside className="st-sidebar">
            {/* QR #1 TOP */}
            <div className="st-qr-wrapper">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="QR Code" className="st-qr-image" />
              ) : (
                <div className="st-qr-placeholder">
                  <span>QR CODE</span>
                  <span className="st-qr-small-text">
                    Fill form & Create QR Code
                  </span>
                </div>
              )}
            </div>

            {/* CONTACT */}
            <section className="st-side-section">
              <h3 className="st-side-heading">CONTACT</h3>
              <ul className="st-contact-list">
                <li>
                  <span className="st-icon-wrapper">
                    {/* phone SVG */}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 4C5 3.44772 5.44772 3 6 3H9L11 7L9.5 8.5C10.3284 10.3284 11.6716 11.6716 13.5 12.5L15 11L19 13V16C19 16.5523 18.5523 17 18 17C11.9249 17 7 12.0751 7 6C7 5.44772 6.55228 5 6 5C5.44772 5 5 4.55228 5 4Z"
                        fill="#ffffff"
                      />
                    </svg>
                  </span>
                  <span
                    className="st-contact-text"
                    contentEditable
                    suppressContentEditableWarning
                  >
                    +1 555-789-3320
                  </span>
                </li>

                <li>
                  <span className="st-icon-wrapper">
                    {/* mail svg */}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z"
                        stroke="#ffffff"
                        strokeWidth="1.4"
                      />
                      <path
                        d="M5 7L12 12L19 7"
                        stroke="#ffffff"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span
                    className="st-contact-text"
                    contentEditable
                    suppressContentEditableWarning
                  >
                    emma.roberts@mail.com
                  </span>
                </li>

                <li>
                  <span className="st-icon-wrapper">
                    {/* location svg */}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 3C9.23858 3 7 5.23858 7 8C7 11.866 12 19 12 19C12 19 17 11.866 17 8C17 5.23858 14.7614 3 12 3Z"
                        stroke="#ffffff"
                        strokeWidth="1.4"
                      />
                      <circle cx="12" cy="8" r="2" fill="#ffffff" />
                    </svg>
                  </span>
                  <span
                    className="st-contact-text"
                    contentEditable
                    suppressContentEditableWarning
                  >
                    San Francisco, CA
                  </span>
                </li>

                <li>
                  <span className="st-icon-wrapper">
                    {/* globe svg */}
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
                    className="st-contact-text"
                    contentEditable
                    suppressContentEditableWarning
                  >
                    www.emmadev.com
                  </span>
                </li>
              </ul>
            </section>

            {/* SKILLS */}
            <section className="st-side-section">
              <h3 className="st-side-heading">SKILLS</h3>
              <ul className="st-side-list">
                <li contentEditable>JavaScript (ES6+)</li>
                <li contentEditable>React &amp; Next.js</li>
                <li contentEditable>Node.js &amp; Express</li>
                <li contentEditable>REST &amp; GraphQL APIs</li>
              </ul>
            </section>

            {/* TECH STACK */}
            <section className="st-side-section">
              <h3 className="st-side-heading">TECH STACK</h3>
              <ul className="st-side-list">
                <li contentEditable>TypeScript</li>
                <li contentEditable>Python / Django</li>
                <li contentEditable>PostgreSQL, MongoDB</li>
                <li contentEditable>AWS / Docker / CI-CD</li>
              </ul>
            </section>

            {/* CERTIFICATIONS */}
            <section className="st-side-section">
              <h3 className="st-side-heading">CERTIFICATIONS</h3>
              <p
                className="st-side-text"
                contentEditable
                suppressContentEditableWarning
              >
                AWS Certified Solutions Architect – Associate
                <br />
                Google Cloud Professional Developer
                <br />
                Scrum Master (PSM I)
              </p>
            </section>

            {/* QR #2 BOTTOM */}
            <div className="st-qr-wrapper st-qr-bottom">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="QR Code" className="st-qr-image" />
              ) : (
                <div className="st-qr-placeholder">
                  <span>QR CODE</span>
                </div>
              )}
            </div>
          </aside>

          {/* ===== RIGHT MAIN ===== */}
          <main className="st-main">
            {/* HEADER */}
            <header className="st-header">
              <div className="st-header-left">
                <h1
                  className="st-name"
                  contentEditable
                  suppressContentEditableWarning
                >
                  EMMA ROBERTS
                </h1>
                <p
                  className="st-title"
                  contentEditable
                  suppressContentEditableWarning
                >
                  FULL STACK DEVELOPER
                </p>
                <div className="st-header-line" />
              </div>

              <div className="st-header-photo" onClick={triggerProfileSelect}>
                <img src={profileImage} alt="Profile" />
                <input
                  type="file"
                  accept="image/*"
                  ref={profileInputRef}
                  style={{ display: "none" }}
                  onChange={handleProfileUpload}
                />
              </div>
            </header>

            {/* ABOUT ME */}
            <section className="st-section">
              <h2 className="st-section-title" contentEditable>
                ABOUT ME
              </h2>
              <p
                className="st-section-text"
                contentEditable
                suppressContentEditableWarning
              >
                Passionate full stack developer with 7+ years of experience
                designing and implementing scalable web applications. Proficient
                in React, Node.js, and modern cloud-native architectures.
                Comfortable owning features end-to-end from discovery and
                design through deployment and monitoring.
              </p>
            </section>

            {/* EXPERIENCE */}
            <section className="st-section">
              <h2 className="st-section-title" contentEditable>
                EXPERIENCE
              </h2>

              <div className="st-job">
                <div className="st-job-header">
                  <div>
                    <p
                      className="st-job-title"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      Senior Full Stack Developer
                    </p>
                    <p
                      className="st-job-company"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      Meta &mdash; Menlo Park, CA
                    </p>
                  </div>
                  <p
                    className="st-job-dates"
                    contentEditable
                    suppressContentEditableWarning
                  >
                    2019 &ndash; Present
                  </p>
                </div>
                <ul className="st-job-list">
                  <li contentEditable>
                    Lead development of scalable web applications using React,
                    Node.js, and GraphQL.
                  </li>
                  <li contentEditable>
                    Collaborated with cross-functional teams to deliver highly
                    available, secure solutions.
                  </li>
                  <li contentEditable>
                    Improved application performance, reducing load times by
                    30%.
                  </li>
                  <li contentEditable>
                    Mentored junior developers and introduced best practices for
                    testing and code review.
                  </li>
                </ul>
              </div>

              <div className="st-job">
                <div className="st-job-header">
                  <div>
                    <p
                      className="st-job-title"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      Full Stack Developer
                    </p>
                    <p
                      className="st-job-company"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      Web-Solutions Inc. &mdash; San Francisco, CA
                    </p>
                  </div>
                  <p
                    className="st-job-dates"
                    contentEditable
                    suppressContentEditableWarning
                  >
                    2015 &ndash; 2019
                  </p>
                </div>
                <ul className="st-job-list">
                  <li contentEditable>
                    Built responsive web applications for enterprise clients
                    using Django and React.
                  </li>
                  <li contentEditable>
                    Integrated third-party APIs and payment gateways.
                  </li>
                  <li contentEditable>
                    Established CI/CD pipelines to streamline deployments.
                  </li>
                </ul>
              </div>
            </section>

            {/* PROJECTS */}
            <section className="st-section">
              <h2 className="st-section-title" contentEditable>
                FEATURED PROJECTS
              </h2>

              <div className="st-project">
                <p
                  className="st-project-title"
                  contentEditable
                  suppressContentEditableWarning
                >
                  Real-Time Analytics Dashboard
                </p>
                <p
                  className="st-project-text"
                  contentEditable
                  suppressContentEditableWarning
                >
                  Designed and implemented a real-time analytics dashboard using
                  React, WebSockets, and Node.js to visualize streaming data for
                  10k+ concurrent users. Deployed on AWS using Docker and ECS.
                </p>
              </div>

              <div className="st-project">
                <p
                  className="st-project-title"
                  contentEditable
                  suppressContentEditableWarning
                >
                  Multi-Tenant SaaS Platform
                </p>
                <p
                  className="st-project-text"
                  contentEditable
                  suppressContentEditableWarning
                >
                  Developed a multi-tenant SaaS platform with role-based access
                  control and subscription billing. Implemented RESTful APIs,
                  background jobs, and automated testing.
                </p>
              </div>
            </section>

            {/* TOOLS & ACHIEVEMENTS */}
            <section className="st-section">
              <h2 className="st-section-title" contentEditable>
                TOOLS &amp; TECHNOLOGIES
              </h2>
              <p
                className="st-section-text"
                contentEditable
                suppressContentEditableWarning
              >
                React, Next.js, Node.js, Express, TypeScript, Python, Django,
                PostgreSQL, MongoDB, Redis, Docker, Kubernetes, AWS, Git,
                GitHub Actions, Jest, Cypress.
              </p>
            </section>

            <section className="st-section">
              <h2 className="st-section-title" contentEditable>
                ACHIEVEMENTS
              </h2>
              <ul className="st-job-list">
                <li contentEditable>
                  Increased conversion rate by 15% after redesigning checkout
                  flow.
                </li>
                <li contentEditable>
                  Reduced cloud infrastructure cost by 20% through performance
                  tuning and resource optimization.
                </li>
                <li contentEditable>
                  Presented best practices for React performance at internal
                  engineering meetup.
                </li>
              </ul>
            </section>

            {/* EDUCATION */}
            <section className="st-section st-last">
              <h2 className="st-section-title" contentEditable>
                EDUCATION
              </h2>

              <div className="st-edu-item">
                <p
                  className="st-edu-degree"
                  contentEditable
                  suppressContentEditableWarning
                >
                  B.S. in Computer Science
                </p>
                <p
                  className="st-edu-meta"
                  contentEditable
                  suppressContentEditableWarning
                >
                  University of California, Berkeley &mdash; 2011 &ndash; 2015
                </p>
              </div>

              <div className="st-edu-item">
                <p
                  className="st-edu-degree"
                  contentEditable
                  suppressContentEditableWarning
                >
                  Full Stack Web Development Nanodegree
                </p>
                <p
                  className="st-edu-meta"
                  contentEditable
                  suppressContentEditableWarning
                >
                  Udacity &mdash; 2016
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
