import React, { useRef, useState } from "react";
import "./NewTemplateModern.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const NewTemplateModern = () => {
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  // Profile Image Upload
  const [profileImage, setProfileImage] = useState("/images/modernprofileimage.png");
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Download PDF
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
    pdf.save("modern-template-resume.pdf");
  };

  // Reset
  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="mt-wrapper">
      {/* Top Buttons */}
      <div className="mt-buttons">
        <button onClick={handleDownloadPDF}>Download PDF</button>
        <button onClick={() => navigate("/templates")}>Back to Templates</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {/* A4 Resume Area */}
      <div className="mt-a4" ref={resumeRef}>
        <div className="mt-resume">
          {/* HEADER WITH PROFILE + NAME + TITLE */}
          <header className="mt-header">
            <div className="mt-header-left">
             <div className="mt-header-photo-wrapper" onClick={triggerFileSelect}>
          <img src={profileImage} className="mt-header-photo" />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>
            </div>


            <div className="mt-header-right">
              <h1 className="mt-header-name" contentEditable suppressContentEditableWarning>
                JONATHON DOE
              </h1>
              <p className="mt-header-title" contentEditable suppressContentEditableWarning>
                GRAPHICS DESIGNER
              </p>
            </div>
          </header>

          {/* YELLOW BAR WITH ANGLE */}
          <div className="mt-header-bar">
            <div class="mt-yellow-bar"></div>

          </div>


          <div className="mt-layout">
            {/* LEFT SIDEBAR */}
            <aside className="mt-sidebar">

              {/* Name + Role in Sidebar */}
              <div className="mt-sidebar-name-block">
                <h1
                  className="mt-sidebar-name"
                  contentEditable
                  suppressContentEditableWarning
                >
                  MICHAEL ANDERSON
                </h1>
                <p
                  className="mt-sidebar-role"
                  contentEditable
                  suppressContentEditableWarning
                >
                  SENIOR GRAPHIC DESIGNER
                </p>
              </div>

              {/* CONTACT */}
              <section className="mt-sidebar-section">
                <h3
                  className="mt-sidebar-heading"
                  contentEditable
                  suppressContentEditableWarning
                >
                  CONTACT
                </h3>

                <ul className="mt-contact-list">
                  <li>
                    <span className="mt-icon-wrapper">
                      {/* Phone SVG */}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 4C5 3.44772 5.44772 3 6 3H9L11 7L9.5 8.5C10.3284 10.3284 11.6716 11.6716 13.5 12.5L15 11L19 13V16C19 16.5523 18.5523 17 18 17C11.9249 17 7 12.0751 7 6C7 5.44772 6.55228 5 6 5C5.44772 5 5 4.55228 5 4Z"
                          fill="#F3A811"
                        />
                      </svg>
                    </span>
                    <span
                      className="mt-contact-text"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      +1 555-789-3320
                    </span>
                  </li>

                  <li>
                    <span className="mt-icon-wrapper">
                      {/* Email SVG */}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z"
                          stroke="#F3A811"
                          strokeWidth="1.4"
                        />
                        <path
                          d="M5 7L12 12L19 7"
                          stroke="#F3A811"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span
                      className="mt-contact-text"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      michael.anderson@mail.com
                    </span>
                  </li>

                  <li>
                    <span className="mt-icon-wrapper">
                      {/* Location SVG */}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 3C9.23858 3 7 5.23858 7 8C7 11.866 12 19 12 19C12 19 17 11.866 17 8C17 5.23858 14.7614 3 12 3Z"
                          stroke="#F3A811"
                          strokeWidth="1.4"
                        />
                        <circle cx="12" cy="8" r="2" fill="#F3A811" />
                      </svg>
                    </span>
                    <span
                      className="mt-contact-text"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      Los Angeles, CA
                    </span>
                  </li>

                  <li>
                    <span className="mt-icon-wrapper">
                      {/* Globe SVG */}
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
                          stroke="#F3A811"
                          strokeWidth="1.4"
                        />
                        <path
                          d="M4 12H20"
                          stroke="#F3A811"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12 4C14 7 15 9.5 15 12C15 14.5 14 17 12 20"
                          stroke="#F3A811"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12 4C10 7 9 9.5 9 12C9 14.5 10 17 12 20"
                          stroke="#F3A811"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <span
                      className="mt-contact-text"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      www.michaelanderson.com
                    </span>
                  </li>
                </ul>
              </section>

              {/* SKILLS */}
              <section className="mt-sidebar-section">
                <h3
                  className="mt-sidebar-heading"
                  contentEditable
                  suppressContentEditableWarning
                >
                  SKILLS
                </h3>
                <ul className="mt-bullet-list">
                  <li contentEditable suppressContentEditableWarning>
                    Branding & Visual Identity
                  </li>
                  <li contentEditable suppressContentEditableWarning>
                    Layout & Typography
                  </li>
                  <li contentEditable suppressContentEditableWarning>
                    Adobe Creative Suite
                  </li>
                  <li contentEditable suppressContentEditableWarning>
                    Print & Digital Design
                  </li>
                </ul>
              </section>

              {/* AWARDS */}
              <section className="mt-sidebar-section">
                <h3
                  className="mt-sidebar-heading"
                  contentEditable
                  suppressContentEditableWarning
                >
                  AWARDS
                </h3>
                <ul className="mt-bullet-list">
                  <li contentEditable suppressContentEditableWarning>
                    AIGA Design Award – 2022
                  </li>
                  <li contentEditable suppressContentEditableWarning>
                    Best Brand Campaign – 2020
                  </li>
                </ul>
              </section>
            </aside>

            {/* RIGHT MAIN CONTENT */}
            <main className="mt-main">
              {/* ABOUT ME */}
              <section className="mt-section">
                <h2
                  className="mt-section-title"
                  contentEditable
                  suppressContentEditableWarning
                >
                  ABOUT ME
                </h2>
                <div className="mt-section-underline" />
                <p
                  className="mt-section-text"
                  contentEditable
                  suppressContentEditableWarning
                >
                  Creative and detail-oriented graphic designer with 8+ years of
                  experience developing visual identities, marketing campaigns,
                  and digital assets for brands across multiple industries.
                  Skilled at translating business goals into compelling visual
                  solutions while maintaining consistency and clarity. Strong
                  collaborator with copywriters, marketers, and developers to
                  deliver efficient, well-crafted work on tight deadlines.
                </p>
              </section>

              {/* EDUCATION */}
              <section className="mt-section">
                <h2
                  className="mt-section-title"
                  contentEditable
                  suppressContentEditableWarning
                >
                  EDUCATION
                </h2>
                <div className="mt-section-underline" />
                <div className="mt-edu-item">
                  <p
                    className="mt-edu-degree"
                    contentEditable
                    suppressContentEditableWarning
                  >
                    Bachelor of Arts in Graphic Design
                  </p>
                  <p
                    className="mt-edu-meta"
                    contentEditable
                    suppressContentEditableWarning
                  >
                    California Institute of the Arts &nbsp;|&nbsp; 2011 – 2015
                  </p>
                </div>
              </section>

              {/* EXPERIENCE */}
              <section className="mt-section mt-section-last">
                <h2
                  className="mt-section-title"
                  contentEditable
                  suppressContentEditableWarning
                >
                  EXPERIENCE
                </h2>
                <div className="mt-section-underline" />

                {/* Job 1 */}
                <div className="mt-job">
                  <div className="mt-job-header">
                    <p
                      className="mt-job-title"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      Senior Graphic Designer
                    </p>
                    <p
                      className="mt-job-dates"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      BrightWave Studio &nbsp;|&nbsp; 2019 – Present
                    </p>
                  </div>
                  <ul className="mt-job-list">
                    <li contentEditable suppressContentEditableWarning>
                      Led visual direction for brand campaigns, packaging, and
                      digital assets for key clients.
                    </li>
                    <li contentEditable suppressContentEditableWarning>
                      Developed design systems, templates, and guidelines to
                      maintain brand consistency.
                    </li>
                    <li contentEditable suppressContentEditableWarning>
                      Mentored junior designers and provided feedback on design
                      concepts and execution.
                    </li>
                  </ul>
                </div>

                {/* Job 2 */}
                <div className="mt-job">
                  <div className="mt-job-header">
                    <p
                      className="mt-job-title"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      Graphic Designer
                    </p>
                    <p
                      className="mt-job-dates"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      Urban Creative Agency &nbsp;|&nbsp; 2015 – 2019
                    </p>
                  </div>
                  <ul className="mt-job-list">
                    <li contentEditable suppressContentEditableWarning>
                      Designed print and digital collateral including brochures,
                      social media graphics, and web banners.
                    </li>
                    <li contentEditable suppressContentEditableWarning>
                      Collaborated with marketing teams to create campaign
                      visuals aligned with strategy.
                    </li>
                    <li contentEditable suppressContentEditableWarning>
                      Prepared artwork for print production ensuring high
                      quality results.
                    </li>
                  </ul>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTemplateModern;
