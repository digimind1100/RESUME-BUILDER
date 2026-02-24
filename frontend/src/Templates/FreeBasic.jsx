// src/Templates/FreeBasic.jsx
import React, { useRef } from "react";
import "./FreeBasic.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import Watermark from "../components/Watermark";

const FreeBasic = () => {
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  const canEdit = true; // ✅ Always editable (FREE)

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
    pdf.save("free-basic-resume.pdf");
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="fb-wrapper">
      {/* Top Buttons */}
      <div className="fb-buttons">
        <button onClick={handleDownloadPDF}>Download PDF</button>
        <button onClick={() => navigate("/templates")}>
          Back to Templates
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {/* A4 Resume */}
      <div className="fb-a4" ref={resumeRef} style={{ position: "relative" }}>
        {/* ✅ Always show watermark */}
        <Watermark show={true} />

        <div className="fb-resume">

          {/* HEADER (Simplified) */}
          <header className="fb-header">
            <h1 contentEditable={canEdit}>Your Name</h1>
            <p contentEditable={canEdit}>Professional Title</p>
          </header>

          <div className="fb-body">

            {/* LEFT COLUMN */}
            <aside className="fb-sidebar">

              <section>
                <h3 contentEditable={canEdit}>Contact</h3>
                <p contentEditable={canEdit}>email@example.com</p>
                <p contentEditable={canEdit}>+92 300 0000000</p>
                <p contentEditable={canEdit}>Your City, Pakistan</p>
              </section>

              <section>
                <h3 contentEditable={canEdit}>Skills</h3>
                <ul>
                  <li contentEditable={canEdit}>Communication</li>
                  <li contentEditable={canEdit}>Teamwork</li>
                  <li contentEditable={canEdit}>Problem Solving</li>
                  <li contentEditable={canEdit}>Time Management</li>
                </ul>
              </section>

              <section>
                <h3 contentEditable={canEdit}>Education</h3>
                <p contentEditable={canEdit}>
                  Bachelor’s Degree – University Name
                </p>
                <p contentEditable={canEdit}>Graduation Year</p>
              </section>

            </aside>

            {/* RIGHT COLUMN */}
            <main className="fb-main">

              <section>
                <h2 contentEditable={canEdit}>Profile</h2>
                <p contentEditable={canEdit}>
                  Write a short professional summary about yourself here.
                </p>
              </section>

              <section>
                <h2 contentEditable={canEdit}>Work Experience</h2>

                <div className="fb-job">
                  <h4 contentEditable={canEdit}>Job Title</h4>
                  <p contentEditable={canEdit}>
                    Company Name – 2020 to Present
                  </p>
                  <ul>
                    <li contentEditable={canEdit}>
                      Describe your responsibility here.
                    </li>
                    <li contentEditable={canEdit}>
                      Mention achievements or contributions.
                    </li>
                  </ul>
                </div>

                <div className="fb-job">
                  <h4 contentEditable={canEdit}>Previous Job</h4>
                  <p contentEditable={canEdit}>
                    Company Name – 2018 to 2020
                  </p>
                  <ul>
                    <li contentEditable={canEdit}>
                      Describe your role briefly.
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

export default FreeBasic;