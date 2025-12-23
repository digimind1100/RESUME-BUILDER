// src/Templates/ElegantClassic.jsx
import React, { useRef, useState } from "react";
import "./ElegantClassic.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import usePaymentGuard from "../hooks/usePaymentGuard";
import PaymentGate from "../components/payment/PaymentGate";
import { useAuth } from "../context/AuthContext";


const ElegantClassic = () => {
    const resumeRef = useRef(null);
    const navigate = useNavigate();

    const { user, setUser } = useAuth();

const {
  isPaid,
  showPaymentModal,
  setShowPaymentModal,
  requirePayment,
  handlePaymentSuccess,
} = usePaymentGuard("ElegantClassic"); // 🔴 TEMPLATE NAME

const canEdit = isPaid;



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
        pdf.save("elegant-classic-resume.pdf");
    };

    const handleReset = () => {
        window.location.reload();
    };

    return (
        <div className="ec-wrapper">

            {/* Top Buttons */}
            <div className="ec-buttons">
                <button onClick={handleDownloadPDF}>Download PDF</button>
                <button onClick={() => navigate("/templates")}>
                    Back to Templates
                </button>
                <button onClick={handleReset}>Reset</button>

                {/* EDIT BUTTON */}
              <button
  className={canEdit ? "edit-btn on" : "edit-btn off"}
  onClick={() => {
    if (requirePayment()) return;
  }}
>
  {canEdit ? "Editing: ON" : "Editing: OFF"}
</button>

            </div>

            {/* A4 Resume */}
            <div className="ec-a4" ref={resumeRef}>
                <div className="ec-resume">

                    {/* HEADER */}
                    <header className="ec-header">
                        <h1
                            className="ec-name"
                            contentEditable={canEdit}
                        >
                            EMERSON REED
                        </h1>
                        <p
                            className="ec-title"
                            contentEditable={canEdit}
                        >
                            PROFESSIONAL TITLE
                        </p>
                    </header>

                    {/* BODY */}
                    <div className="ec-body">

                        {/* LEFT COLUMN */}
                        <aside className="ec-sidebar">

                            {/* CONTACT */}
                            <section className="ec-sidebar-section">
                                <h3
                                    className="ec-sidebar-heading"
                                    contentEditable={canEdit}
                                >
                                    CONTACT
                                </h3>

                                <ul className="ec-contact-list">

                                    <li>
                                        <span className="ec-icon-circle">✉</span>
                                        <span
                                            className="ec-contact-text"
                                            contentEditable={canEdit}
                                        >
                                            youremail@mail.com
                                        </span>
                                    </li>

                                    <li>
                                        <span className="ec-icon-circle">✆</span>
                                        <span
                                            className="ec-contact-text"
                                            contentEditable={canEdit}
                                        >
                                            555.555.5555
                                        </span>
                                    </li>

                                    <li>
                                        <span className="ec-icon-circle">📍</span>
                                        <span
                                            className="ec-contact-text"
                                            contentEditable={canEdit}
                                        >
                                            Your City, State
                                        </span>
                                    </li>

                                    <li>
                                        <span className="ec-icon-circle">in</span>
                                        <span
                                            className="ec-contact-text"
                                            contentEditable={canEdit}
                                        >
                                            linkedin.com/in/yourusername
                                        </span>
                                    </li>

                                </ul>
                            </section>

                            {/* SKILLS */}
                            <section className="ec-sidebar-section">
                                <h3
                                    className="ec-sidebar-heading"
                                    contentEditable={canEdit}
                                >
                                    SKILLS
                                </h3>

                                <ul className="ec-skill-list">
                                    <li contentEditable={canEdit}>Process Improvement</li>
                                    <li contentEditable={canEdit}>Contracts & Negotiations</li>
                                    <li contentEditable={canEdit}>Project Planning</li>
                                    <li contentEditable={canEdit}>Reporting & Analytics</li>
                                    <li contentEditable={canEdit}>Risk Assessment</li>
                                    <li contentEditable={canEdit}>Resource Management</li>
                                    <li contentEditable={canEdit}>Adaptability</li>
                                    <li contentEditable={canEdit}>Conflict Resolution</li>
                                </ul>
                            </section>

                            {/* EDUCATION */}
                            <section className="ec-sidebar-section">
                                <h3
                                    className="ec-sidebar-heading"
                                    contentEditable={canEdit}
                                >
                                    EDUCATION
                                </h3>

                                <div className="ec-edu-block">
                                    <p
                                        className="ec-edu-degree"
                                        contentEditable={canEdit}
                                    >
                                        NAME OF DEGREE
                                    </p>
                                    <p
                                        className="ec-edu-meta"
                                        contentEditable={canEdit}
                                    >
                                        Concentration (if any)
                                        <br />
                                        University Name
                                        <br />
                                        Graduation Year
                                    </p>
                                </div>

                                <div className="ec-edu-block">
                                    <p className="ec-edu-degree" contentEditable={canEdit}>
                                        CERTIFICATION HERE
                                    </p>
                                    <p className="ec-edu-meta" contentEditable={canEdit}>
                                        Certifying Organization
                                        <br />
                                        Completion Year
                                    </p>
                                </div>

                                <div className="ec-edu-block">
                                    <p className="ec-edu-degree" contentEditable={canEdit}>
                                        CERTIFICATION HERE
                                    </p>
                                    <p className="ec-edu-meta" contentEditable={canEdit}>
                                        Certifying Organization
                                        <br />
                                        Completion Year
                                    </p>
                                </div>

                            </section>
                        </aside>

                        {/* RIGHT MAIN COLUMN */}
                        <main className="ec-main">

                            {/* SUMMARY */}
                            <section className="ec-section">
                                <h2
                                    className="ec-section-title"
                                    contentEditable={canEdit}
                                >
                                    SUMMARY
                                </h2>
                                <div className="ec-section-rule" />
                                <p
                                    className="ec-section-text"
                                    contentEditable={canEdit}
                                >
                                    Seasoned professional with a strong background in operations...
                                </p>
                            </section>

                            {/* CORE COMPETENCIES */}
                            <section className="ec-section">
                              <h2 className="ec-section-title" contentEditable={canEdit}>
                                CORE COMPETENCIES
                              </h2>
                              <div className="ec-section-rule" />

                              <p className="ec-section-text" contentEditable={canEdit}>
                                • Strategic Planning • Workflow Optimization • Coordination  
                                <br />
                                • Leadership Support • Documentation & Reporting  
                                <br />
                                • Communication • Problem Solving • Time Management
                              </p>
                            </section>

                            {/* PROFESSIONAL EXPERIENCE */}
                            <section className="ec-section">
                                <h2
                                    className="ec-section-title"
                                    contentEditable={canEdit}
                                >
                                    PROFESSIONAL EXPERIENCE
                                </h2>
                                <div className="ec-section-rule" />

                                {/* Job 1 */}
                                <div className="ec-job">
                                    <div className="ec-job-header">
                                        <div>
                                            <p className="ec-job-title" contentEditable={canEdit}>
                                                POSITION TITLE HERE
                                            </p>
                                            <p className="ec-job-company" contentEditable={canEdit}>
                                                Company, Location
                                            </p>
                                        </div>

                                        <p className="ec-job-dates" contentEditable={canEdit}>
                                            Date – Date
                                        </p>
                                    </div>

                                    <ul className="ec-job-list">
                                        <li contentEditable={canEdit}>
                                            Re-wrote internal process guides to reduce training time...
                                        </li>
                                        <li contentEditable={canEdit}>
                                            Developed reporting dashboards used by leadership...
                                        </li>
                                        <li contentEditable={canEdit}>
                                            Streamlined communication between departments...
                                        </li>
                                        <li contentEditable={canEdit}>
                                            Coordinated project timelines and delivered tasks...
                                        </li>
                                        <li contentEditable={canEdit}>
                                            Led quality assurance reviews...
                                        </li>
                                        <li contentEditable={canEdit}>
                                            Resolved client issues with root-cause analysis...
                                        </li>
                                    </ul>
                                </div>

                                {/* Job 2 */}
                                <div className="ec-job">
                                    <div className="ec-job-header">
                                        <div>
                                            <p className="ec-job-title" contentEditable={canEdit}>
                                                Administrative Assistant
                                            </p>
                                            <p className="ec-job-company" contentEditable={canEdit}>
                                                Prime Solutions • 2014 – 2016
                                            </p>
                                        </div>

                                        <p className="ec-job-dates" contentEditable={canEdit}>
                                            2014 – 2016
                                        </p>
                                    </div>

                                    <ul className="ec-job-list">
                                        <li contentEditable={canEdit}>
                                            Supported office operations including record keeping...
                                        </li>
                                        <li contentEditable={canEdit}>
                                            Organized company events, meetings, travel...
                                        </li>
                                        <li contentEditable={canEdit}>
                                            Maintained confidential documents...
                                        </li>
                                        <li contentEditable={canEdit}>
                                            Provided high-quality customer service...
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            {/* EDUCATION (Main Area) */}
                            <section className="ec-section ec-section-last">
                                <h2
                                    className="ec-section-title"
                                    contentEditable={canEdit}
                                >
                                    EDUCATION
                                </h2>
                                <div className="ec-section-rule" />

                                <div className="ec-main-edu">
                                    <p
                                        className="ec-main-edu-degree"
                                        contentEditable={canEdit}
                                    >
                                        DIPLOMA – (2003–2005)
                                    </p>
                                    <p
                                        className="ec-main-edu-meta"
                                        contentEditable={canEdit}
                                    >
                                        School Name – City, Country
                                    </p>
                                </div>

                                <div className="ec-main-edu">
                                    <p className="ec-main-edu-degree" contentEditable={canEdit}>
                                        Certificate — Project Coordination
                                    </p>
                                    <p className="ec-main-edu-meta" contentEditable={canEdit}>
                                        Online Certification — 2020
                                    </p>
                                </div>

                                <div className="ec-main-edu">
                                    <p
                                        className="ec-main-edu-degree"
                                        contentEditable={canEdit}
                                    >
                                        DIPLOMA – (2000–2003)
                                    </p>
                                    <p
                                        className="ec-main-edu-meta"
                                        contentEditable={canEdit}
                                    >
                                        School Name – City, Country
                                    </p>
                                </div>
                            </section>

                        </main>
<PaymentGate
  open={showPaymentModal}
  onClose={() => setShowPaymentModal(false)}
  onSuccess={(user) => {
    setUser(user);              // 🔥 update AuthContext
    handlePaymentSuccess(user); // 🔓 unlock template
  }}
/>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ElegantClassic;
