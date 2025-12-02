import React, { useState, useRef } from "react";
import "./MedicalElite.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function MedicalElites() {
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState("/images/medicalelitesprofileimage.png");
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  const triggerFileSelect = () => fileInputRef.current.click();

  const handleDownloadPDF = async () => {
    const element = resumeRef.current;
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
    pdf.save("medical-elite-resume.pdf");
  };

  const handleReset = () => window.location.reload();

  return (
    <div className="me-wrapper">
      {/* TOP BUTTONS */}
      <div className="me-buttons">
        <button onClick={handleDownloadPDF}>Download PDF</button>
        <button onClick={() => navigate("/templates")}>Back to Templates</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {/* A4 PAGE */}
      <div className="me-a4" ref={resumeRef}>
        <div className="me-resume">

          {/* LEFT SIDEBAR */}
          <aside className="me-sidebar">

            <div className="me-photo-wrapper" onClick={triggerFileSelect}>
              <img src={profileImage} alt="Profile" className="me-photo" />
              <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleImageUpload} />
            </div>

            <h1 className="me-name" contentEditable suppressContentEditableWarning>
              DR. EMMA WILLIAMS
            </h1>
            <p className="me-role" contentEditable suppressContentEditableWarning>
              CONSULTANT CARDIOLOGIST
            </p>

            {/* CONTACT */}
            <section className="me-section">
              <h3 className="me-section-title">CONTACT</h3>
              <ul className="me-list">

                <li>
                  <span className="me-icon">
                    {/* Phone SVG */}
                    <svg width="16" height="16" fill="#0066cc" viewBox="0 0 24 24">
                      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V21a1 1 0 01-1 1C10.52 22 2 13.48 2 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z"/>
                    </svg>
                  </span>
                  <span contentEditable suppressContentEditableWarning>
                    +1 (555) 245-8890
                  </span>
                </li>

                <li>
                  <span className="me-icon">
                    {/* Email SVG */}
                    <svg width="16" height="16" fill="#0066cc" viewBox="0 0 24 24">
                      <path d="M4 4h16a2 2 0 012 2v1l-10 6L2 7V6a2 2 0 012-2z" />
                      <path d="M2 8l10 6 10-6v10a2 2 0 01-2 2H4a2 2 0 01-2-2V8z" />
                    </svg>
                  </span>
                  <span contentEditable suppressContentEditableWarning>
                    dr.emma.williams@mail.com
                  </span>
                </li>

                <li>
                  <span className="me-icon">
                    {/* Location SVG */}
                    <svg width="16" height="16" fill="#0066cc" viewBox="0 0 24 24">
                      <path d="M12 2a7 7 0 017 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 017-7zm0 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    </svg>
                  </span>
                  <span contentEditable suppressContentEditableWarning>
                    New York, USA
                  </span>
                </li>

                <li>
                  <span className="me-icon">
                    {/* Globe SVG */}
                    <svg width="16" height="16" fill="#0066cc" viewBox="0 0 24 24">
                      <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 18c-2.12-2.37-3.5-5.68-3.5-9s1.38-6.63 3.5-9c2.12 2.37 3.5 5.68 3.5 9s-1.38 6.63-3.5 9z" />
                      <path d="M2 12h20" stroke="#0066cc" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <span contentEditable suppressContentEditableWarning>
                    www.doctoremma.com
                  </span>
                </li>

              </ul>
            </section>

            {/* SPECIALTIES - EXPANDED */}
            <section className="me-section">
              <h3 className="me-section-title">SPECIALTIES</h3>
              <ul className="me-list">
                <li contentEditable>Cardiac Diagnostics & Imaging</li>
                <li contentEditable>Heart Failure Management</li>
                <li contentEditable>Coronary Artery Disease</li>
                <li contentEditable>Post-Operative Cardiac Care</li>
                <li contentEditable>Arrhythmia & ECG Interpretation</li>
              </ul>
            </section>

            {/* CERTIFICATIONS - EXPANDED */}
            <section className="me-section">
              <h3 className="me-section-title">CERTIFICATIONS</h3>
              <ul className="me-list">
                <li contentEditable>Advanced Cardiac Life Support (ACLS)</li>
                <li contentEditable>Basic Life Support (BLS)</li>
                <li contentEditable>Board Certified – Cardiology</li>
                <li contentEditable>USMLE Step 1, 2 & 3 Passed</li>
              </ul>
            </section>

            {/* MEMBERSHIPS */}
            <section className="me-section">
              <h3 className="me-section-title">MEMBERSHIPS</h3>
              <ul className="me-list">
                <li contentEditable>American Heart Association (AHA)</li>
                <li contentEditable>American College of Cardiology (ACC)</li>
              </ul>
            </section>

          </aside>

          {/* RIGHT SIDE */}
          <main className="me-main">

            {/* SUMMARY - EXPANDED */}
            <section className="me-block">
              <h2 className="me-block-title">SUMMARY</h2>
              <p className="me-block-text" contentEditable suppressContentEditableWarning>
                Dedicated and compassionate cardiologist with over 12 years of
                clinical experience handling complex cardiovascular cases.
                Expertise includes advanced heart diagnostics, emergency cardiac
                care, patient counseling, and developing long-term treatment
                plans. Well-versed in modern medical technologies, evidence-based
                practices, and interdisciplinary collaboration in fast-paced
                healthcare environments.
              </p>
            </section>

            {/* EXPERIENCE - EXPANDED */}
            <section className="me-block">
              <h2 className="me-block-title">EXPERIENCE</h2>

              {/* JOB 1 */}
              <div className="me-job">
                <div className="me-job-header">
                  <h3 contentEditable>Senior Consultant Cardiologist</h3>
                  <p contentEditable>2018 – Present</p>
                </div>
                <p className="me-job-location" contentEditable>New York Heart Institute</p>

                <ul className="me-job-list">
                  <li contentEditable>Managed emergency cardiac interventions and critical care cases.</li>
                  <li contentEditable>Performed cardiac catheterizations, stress tests, and imaging diagnostics.</li>
                  <li contentEditable>Developed long-term disease management and rehabilitation plans.</li>
                  <li contentEditable>Led conferences, seminars, and cardiac awareness workshops.</li>
                  <li contentEditable>Worked with surgeons in pre- and post-operative care.</li>
                </ul>
              </div>

              {/* JOB 2 */}
              <div className="me-job">
                <div className="me-job-header">
                  <h3 contentEditable>Cardiology Resident</h3>
                  <p contentEditable>2014 – 2018</p>
                </div>
                <p className="me-job-location" contentEditable>Mercy General Hospital</p>

                <ul className="me-job-list">
                  <li contentEditable>Assisted in cardiac surgeries and managed ICU cardiac patients.</li>
                  <li contentEditable>Evaluated and followed up on chronic heart disease patients.</li>
                  <li contentEditable>Performed routine ECG, Echo, and treadmill tests.</li>
                  <li contentEditable>Conducted patient education programs about lifestyle and diet.</li>
                </ul>
              </div>
            </section>

            {/* RESEARCH */}
            <section className="me-block">
              <h2 className="me-block-title">RESEARCH & PUBLICATIONS</h2>
              <ul className="me-job-list">
                <li contentEditable>Published: “Modern Approaches to Hypertension Treatment” – 2022</li>
                <li contentEditable>Co-authored research on early detection of heart failure – 2021</li>
                <li contentEditable>Regular contributor to Cardiology Today Journal</li>
              </ul>
            </section>

            {/* EDUCATION */}
            <section className="me-block me-last">
              <h2 className="me-block-title">EDUCATION</h2>

              <div className="me-edu">
                <p className="me-edu-title" contentEditable>
                  Doctor of Medicine (MD) – Cardiology
                </p>
                <p className="me-edu-meta" contentEditable>
                  Harvard Medical School — 2010 – 2014
                </p>
              </div>

              <div className="me-edu">
                <p className="me-edu-title" contentEditable>
                  Bachelor of Science in Biology
                </p>
                <p className="me-edu-meta" contentEditable>
                  University of California — 2006 – 2010
                </p>
              </div>

            </section>

          </main>

        </div>
      </div>
    </div>
  );
}
