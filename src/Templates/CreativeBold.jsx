import React, { useRef, useState } from "react";
import "./CreativeBold.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const CreativeBold = () => {
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  // ----- Profile Image Upload -----
  const [profileImage, setProfileImage] = useState("/images/creativeboldimage.png");
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

  // ----- Download PDF -----
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
    pdf.save("creative-bold-resume.pdf");
  };

  // ----- Reset Page -----
  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="cb-wrapper">
      {/* Top Buttons */}
      <div className="cb-buttons">
        <button onClick={handleDownloadPDF}>Download PDF</button>
        <button onClick={() => navigate("/templates")}>Back to Templates</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {/* A4 Resume Area */}
      <div className="cb-a4" ref={resumeRef}>
        <div className="cb-resume">
          
          {/* LEFT RED COLUMN */}
          <aside className="cb-left">
            
            {/* Profile Image */}
            <div className="cb-photo-wrapper" onClick={triggerFileSelect}>
              <img src={profileImage} alt="Profile" className="cb-photo" />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </div>

            {/* Job Title (Left side) */}
            <div className="cb-left-role">
              <h2
                className="cb-left-role-text"
                contentEditable
                suppressContentEditableWarning
              >
                MARKETING SPECIALIST
              </h2>
            </div>

            {/* Skills */}
            <section className="cb-left-section">
              <h3 className="cb-left-heading" contentEditable suppressContentEditableWarning>
                SKILLS
              </h3>
              <ul className="cb-left-list">
                <li contentEditable suppressContentEditableWarning>SEO and SEM</li>
                <li contentEditable suppressContentEditableWarning>Content Marketing</li>
                <li contentEditable suppressContentEditableWarning>Social Media Management</li>
                <li contentEditable suppressContentEditableWarning>Analytics & Reporting</li>
              </ul>
            </section>

            {/* Contact */}
            <section className="cb-left-section">
              <h3 className="cb-left-heading" contentEditable suppressContentEditableWarning>
                CONTACT
              </h3>
              <div className="cb-left-contact">
                <p contentEditable suppressContentEditableWarning>123-456-7860</p>
                <p contentEditable suppressContentEditableWarning>amanda.smith@mail.com</p>
                <p contentEditable suppressContentEditableWarning>Los Angeles, CA</p>
              </div>
            </section>
          </aside>

          {/* RIGHT WHITE COLUMN */}
          <main className="cb-right">
            
            {/* Name + Title */}
            <header className="cb-header-text">
              <h1
                className="cb-name"
                contentEditable
                suppressContentEditableWarning
              >
                AMANDA SMITH
              </h1>

              <p
                className="cb-title"
                contentEditable
                suppressContentEditableWarning
              >
                Marketing Specialist
              </p>
            </header>

            {/* Profile Section */}
            <section className="cb-section">
              <h2 className="cb-section-heading" contentEditable>PROFILE</h2>
              <p className="cb-section-paragraph" contentEditable>
                Dynamic marketing specialist with 6+ years of experience in planning and executing
                multi-channel marketing campaigns. Skilled in SEO, SEM, content strategy, paid
                advertising, and analytics. Proven ability to improve lead generation, strengthen
                brand awareness, and collaborate with cross-functional teams to deliver measurable
                results. Passionate about data-driven optimization, audience insights, and creative
                storytelling that drives engagement.
              </p>
            </section>

            {/* Experience Section */}
            <section className="cb-section">
              <h2 className="cb-section-heading" contentEditable>EXPERIENCE</h2>

              {/* Job 1 */}
              <div className="cb-entry">
                <p className="cb-entry-title" contentEditable>
                  Marketing Specialist
                </p>
                <p className="cb-entry-subtitle" contentEditable>
                  XYZ Corporation &nbsp;&nbsp;|&nbsp;&nbsp; 2020 – Present
                </p>
                <ul className="cb-entry-list">
                  <li contentEditable>
                    Led digital marketing campaigns across Google Ads, Meta Ads, and LinkedIn,
                    increasing qualified leads by 38%.
                  </li>
                  <li contentEditable>
                    Managed a $180K yearly budget, optimizing spending using performance analytics.
                  </li>
                  <li contentEditable>
                    Conducted market research, competitor analysis, and trend forecasting to refine
                    messaging and targeting.
                  </li>
                  <li contentEditable>
                    Collaborated with creative teams to execute content calendars and launch campaigns.
                  </li>
                  <li contentEditable>
                    Created A/B testing strategies that improved CTR by 27% and reduced CPL by 22%.
                  </li>
                </ul>
              </div>

              {/* Job 2 */}
              <div className="cb-entry">
                <p className="cb-entry-title" contentEditable>
                  Marketing Coordinator
                </p>
                <p className="cb-entry-subtitle" contentEditable>
                  ABC Company &nbsp;&nbsp;|&nbsp;&nbsp; 2016 – 2020
                </p>
                <ul className="cb-entry-list">
                  <li contentEditable>
                    Managed social media platforms, increasing engagement by 45% in one year.
                  </li>
                  <li contentEditable>
                    Assisted in planning digital & print campaigns, events, and promotions.
                  </li>
                  <li contentEditable>
                    Analyzed weekly performance reports and suggested optimization strategies.
                  </li>
                  <li contentEditable>
                    Supported brand development initiatives across various marketing channels.
                  </li>
                </ul>
              </div>
            </section>

            {/* Certifications */}
            <section className="cb-section">
              <h2 className="cb-section-heading" contentEditable>CERTIFICATIONS</h2>
              <ul className="cb-entry-list">
                <li contentEditable>Google Analytics Certification</li>
                <li contentEditable>Facebook Blueprint Certified</li>
                <li contentEditable>HubSpot Content Marketing Certification</li>
                <li contentEditable>SEO Specialization – Coursera</li>
              </ul>
            </section>

            {/* Tools */}
            <section className="cb-section">
              <h2 className="cb-section-heading" contentEditable>TOOLS & TECHNOLOGIES</h2>
              <ul className="cb-entry-list">
                <li contentEditable>Google Analytics, Google Ads Manager</li>
                <li contentEditable>Meta Business Suite, LinkedIn Campaign Manager</li>
                <li contentEditable>SEMrush, Ahrefs, Moz</li>
                <li contentEditable>HubSpot, Mailchimp</li>
                <li contentEditable>Figma, Canva, Adobe Express</li>
              </ul>
            </section>

            {/* Achievements */}
            <section className="cb-section">
              <h2 className="cb-section-heading" contentEditable>ACHIEVEMENTS</h2>
              <ul className="cb-entry-list">
                <li contentEditable>Increased lead quality by 40% within 6 months.</li>
                <li contentEditable>Reduced cost-per-lead by 22% through campaign optimization.</li>
                <li contentEditable>Successfully managed a brand-wide digital transformation project.</li>
              </ul>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
};

export default CreativeBold;
