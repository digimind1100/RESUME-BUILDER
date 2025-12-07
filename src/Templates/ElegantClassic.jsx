// src/Templates/ElegantClassic.jsx
import React, { useRef, useState } from "react";
import "./ElegantClassic.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ElegantClassic = () => {
    const resumeRef = useRef(null);
    const navigate = useNavigate();

    /* ========== EDIT MODE ========== */
    const [isEditable, setIsEditable] = useState(false);

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
                    onClick={() => setIsEditable(!isEditable)}
                    className={isEditable ? "edit-toggle on" : "edit-toggle off"}
                >
                    {isEditable ? "Editing: ON" : "Editing: OFF"}
                </button>
            </div>

            {/* A4 Resume */}
            <div className="ec-a4" ref={resumeRef}>
                <div className="ec-resume">

                    {/* HEADER */}
                    <header className="ec-header">
                        <h1
                            className="ec-name"
                            contentEditable={isEditable}
                        >
                            EMERSON REED
                        </h1>
                        <p
                            className="ec-title"
                            contentEditable={isEditable}
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
                                    contentEditable={isEditable}
                                >
                                    CONTACT
                                </h3>

                                <ul className="ec-contact-list">

                                    <li>
                                        <span className="ec-icon-circle">✉</span>
                                        <span
                                            className="ec-contact-text"
                                            contentEditable={isEditable}
                                        >
                                            youremail@mail.com
                                        </span>
                                    </li>

                                    <li>
                                        <span className="ec-icon-circle">✆</span>
                                        <span
                                            className="ec-contact-text"
                                            contentEditable={isEditable}
                                        >
                                            555.555.5555
                                        </span>
                                    </li>

                                    <li>
                                        <span className="ec-icon-circle">📍</span>
                                        <span
                                            className="ec-contact-text"
                                            contentEditable={isEditable}
                                        >
                                            Your City, State
                                        </span>
                                    </li>

                                    <li>
                                        <span className="ec-icon-circle">in</span>
                                        <span
                                            className="ec-contact-text"
                                            contentEditable={isEditable}
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
                                    contentEditable={isEditable}
                                >
                                    SKILLS
                                </h3>

                                <ul className="ec-skill-list">
                                    <li contentEditable={isEditable}>Process Improvement</li>
                                    <li contentEditable={isEditable}>Contracts & Negotiations</li>
                                    <li contentEditable={isEditable}>Project Planning</li>
                                    <li contentEditable={isEditable}>Reporting & Analytics</li>
                                    <li contentEditable={isEditable}>Risk Assessment</li>
                                    <li contentEditable={isEditable}>Resource Management</li>
                                    <li contentEditable={isEditable}>Adaptability</li>
                                    <li contentEditable={isEditable}>Conflict Resolution</li>
                                </ul>
                            </section>

                            {/* EDUCATION */}
                            <section className="ec-sidebar-section">
                                <h3
                                    className="ec-sidebar-heading"
                                    contentEditable={isEditable}
                                >
                                    EDUCATION
                                </h3>

                                <div className="ec-edu-block">
                                    <p
                                        className="ec-edu-degree"
                                        contentEditable={isEditable}
                                    >
                                        NAME OF DEGREE
                                    </p>
                                    <p
                                        className="ec-edu-meta"
                                        contentEditable={isEditable}
                                    >
                                        Concentration (if any)
                                        <br />
                                        University Name
                                        <br />
                                        Graduation Year
                                    </p>
                                </div>

                                <div className="ec-edu-block">
                                    <p className="ec-edu-degree" contentEditable={isEditable}>
                                        CERTIFICATION HERE
                                    </p>
                                    <p className="ec-edu-meta" contentEditable={isEditable}>
                                        Certifying Organization
                                        <br />
                                        Completion Year
                                    </p>
                                </div>

                                <div className="ec-edu-block">
                                    <p className="ec-edu-degree" contentEditable={isEditable}>
                                        CERTIFICATION HERE
                                    </p>
                                    <p className="ec-edu-meta" contentEditable={isEditable}>
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
                                    contentEditable={isEditable}
                                >
                                    SUMMARY
                                </h2>
                                <div className="ec-section-rule" />
                                <p
                                    className="ec-section-text"
                                    contentEditable={isEditable}
                                >
                                    Seasoned professional with a strong background in operations...
                                </p>
                            </section>

                            {/* CORE COMPETENCIES */}
                            <section className="ec-section">
                              <h2 className="ec-section-title" contentEditable={isEditable}>
                                CORE COMPETENCIES
                              </h2>
                              <div className="ec-section-rule" />

                              <p className="ec-section-text" contentEditable={isEditable}>
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
                                    contentEditable={isEditable}
                                >
                                    PROFESSIONAL EXPERIENCE
                                </h2>
                                <div className="ec-section-rule" />

                                {/* Job 1 */}
                                <div className="ec-job">
                                    <div className="ec-job-header">
                                        <div>
                                            <p className="ec-job-title" contentEditable={isEditable}>
                                                POSITION TITLE HERE
                                            </p>
                                            <p className="ec-job-company" contentEditable={isEditable}>
                                                Company, Location
                                            </p>
                                        </div>

                                        <p className="ec-job-dates" contentEditable={isEditable}>
                                            Date – Date
                                        </p>
                                    </div>

                                    <ul className="ec-job-list">
                                        <li contentEditable={isEditable}>
                                            Re-wrote internal process guides to reduce training time...
                                        </li>
                                        <li contentEditable={isEditable}>
                                            Developed reporting dashboards used by leadership...
                                        </li>
                                        <li contentEditable={isEditable}>
                                            Streamlined communication between departments...
                                        </li>
                                        <li contentEditable={isEditable}>
                                            Coordinated project timelines and delivered tasks...
                                        </li>
                                        <li contentEditable={isEditable}>
                                            Led quality assurance reviews...
                                        </li>
                                        <li contentEditable={isEditable}>
                                            Resolved client issues with root-cause analysis...
                                        </li>
                                    </ul>
                                </div>

                                {/* Job 2 */}
                                <div className="ec-job">
                                    <div className="ec-job-header">
                                        <div>
                                            <p className="ec-job-title" contentEditable={isEditable}>
                                                Administrative Assistant
                                            </p>
                                            <p className="ec-job-company" contentEditable={isEditable}>
                                                Prime Solutions • 2014 – 2016
                                            </p>
                                        </div>

                                        <p className="ec-job-dates" contentEditable={isEditable}>
                                            2014 – 2016
                                        </p>
                                    </div>

                                    <ul className="ec-job-list">
                                        <li contentEditable={isEditable}>
                                            Supported office operations including record keeping...
                                        </li>
                                        <li contentEditable={isEditable}>
                                            Organized company events, meetings, travel...
                                        </li>
                                        <li contentEditable={isEditable}>
                                            Maintained confidential documents...
                                        </li>
                                        <li contentEditable={isEditable}>
                                            Provided high-quality customer service...
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            {/* EDUCATION (Main Area) */}
                            <section className="ec-section ec-section-last">
                                <h2
                                    className="ec-section-title"
                                    contentEditable={isEditable}
                                >
                                    EDUCATION
                                </h2>
                                <div className="ec-section-rule" />

                                <div className="ec-main-edu">
                                    <p
                                        className="ec-main-edu-degree"
                                        contentEditable={isEditable}
                                    >
                                        DIPLOMA – (2003–2005)
                                    </p>
                                    <p
                                        className="ec-main-edu-meta"
                                        contentEditable={isEditable}
                                    >
                                        School Name – City, Country
                                    </p>
                                </div>

                                <div className="ec-main-edu">
                                    <p className="ec-main-edu-degree" contentEditable={isEditable}>
                                        Certificate — Project Coordination
                                    </p>
                                    <p className="ec-main-edu-meta" contentEditable={isEditable}>
                                        Online Certification — 2020
                                    </p>
                                </div>

                                <div className="ec-main-edu">
                                    <p
                                        className="ec-main-edu-degree"
                                        contentEditable={isEditable}
                                    >
                                        DIPLOMA – (2000–2003)
                                    </p>
                                    <p
                                        className="ec-main-edu-meta"
                                        contentEditable={isEditable}
                                    >
                                        School Name – City, Country
                                    </p>
                                </div>
                            </section>

                        </main>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ElegantClassic;
