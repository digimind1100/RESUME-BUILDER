// src/Templates/ElegantClassic.jsx
import React, { useRef, useState } from "react";
import "./ElegantClassic.css";
import { useNavigate } from "react-router-dom";
import TemplateLayout from "./TemplateLayout";
import { useAuth } from "../context/AuthContext";



const ElegantClassic = () => {
    const resumeRef = useRef(null);
    const navigate = useNavigate();

    const { user, setUser } = useAuth();



    return (
        <TemplateLayout
            templateId="CreativeBold"
            wrapperClass="cb-wrapper"
            resumeClass="cb-resume"
        >
            {({ canEdit, isEditable, pdfRef }) => (
                <div className="ec-wrapper">

                    {/* A4 Resume */}
                    <div className="ec-a4" ref={pdfRef} style={{ position: "relative" }}>
                     
                        <div className="ec-resume">


                            {/* HEADER */}
                            <header className="ec-header">
                                <h1
                                    className="ec-name"
                                    contentEditable={canEdit && isEditable}
                                >
                                    EMERSON REED
                                </h1>
                                <p
                                    className="ec-title"
                                    contentEditable={canEdit && isEditable}
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
                                            contentEditable={canEdit && isEditable}
                                        >
                                            CONTACT
                                        </h3>

                                        <ul className="ec-contact-list">

                                            <li>
                                                <span className="ec-icon-circle">✉</span>
                                                <span
                                                    className="ec-contact-text"
                                                    contentEditable={canEdit && isEditable}
                                                >
                                                    youremail@mail.com
                                                </span>
                                            </li>

                                            <li>
                                                <span className="ec-icon-circle">✆</span>
                                                <span
                                                    className="ec-contact-text"
                                                    contentEditable={canEdit && isEditable}
                                                >
                                                    555.555.5555
                                                </span>
                                            </li>

                                            <li>
                                                <span className="ec-icon-circle">📍</span>
                                                <span
                                                    className="ec-contact-text"
                                                    contentEditable={canEdit && isEditable}
                                                >
                                                    Your City, State
                                                </span>
                                            </li>

                                            <li>
                                                <span className="ec-icon-circle">in</span>
                                                <span
                                                    className="ec-contact-text"
                                                    contentEditable={canEdit && isEditable}
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
                                            contentEditable={canEdit && isEditable}
                                        >
                                            SKILLS
                                        </h3>

                                        <ul className="ec-skill-list">
                                            <li contentEditable={canEdit && isEditable}>Process Improvement</li>
                                            <li contentEditable={canEdit && isEditable}>Contracts & Negotiations</li>
                                            <li contentEditable={canEdit && isEditable}>Project Planning</li>
                                            <li contentEditable={canEdit && isEditable}>Reporting & Analytics</li>
                                            <li contentEditable={canEdit && isEditable}>Risk Assessment</li>
                                            <li contentEditable={canEdit && isEditable}>Resource Management</li>
                                            <li contentEditable={canEdit && isEditable}>Adaptability</li>
                                            <li contentEditable={canEdit && isEditable}>Conflict Resolution</li>
                                        </ul>
                                    </section>

                                    {/* EDUCATION */}
                                    <section className="ec-sidebar-section">
                                        <h3
                                            className="ec-sidebar-heading"
                                            contentEditable={canEdit && isEditable}
                                        >
                                            EDUCATION
                                        </h3>

                                        <div className="ec-edu-block">
                                            <p
                                                className="ec-edu-degree"
                                                contentEditable={canEdit && isEditable}
                                            >
                                                NAME OF DEGREE
                                            </p>
                                            <p
                                                className="ec-edu-meta"
                                                contentEditable={canEdit && isEditable}
                                            >
                                                Concentration (if any)
                                                <br />
                                                University Name
                                                <br />
                                                Graduation Year
                                            </p>
                                        </div>

                                        <div className="ec-edu-block">
                                            <p className="ec-edu-degree" contentEditable={canEdit && isEditable}>
                                                CERTIFICATION HERE
                                            </p>
                                            <p className="ec-edu-meta" contentEditable={canEdit && isEditable}>
                                                Certifying Organization
                                                <br />
                                                Completion Year
                                            </p>
                                        </div>

                                        <div className="ec-edu-block">
                                            <p className="ec-edu-degree" contentEditable={canEdit && isEditable}>
                                                CERTIFICATION HERE
                                            </p>
                                            <p className="ec-edu-meta" contentEditable={canEdit && isEditable}>
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
                                            contentEditable={canEdit && isEditable}
                                        >
                                            SUMMARY
                                        </h2>
                                        <div className="ec-section-rule" />
                                        <p
                                            className="ec-section-text"
                                            contentEditable={canEdit && isEditable}
                                        >
                                            Seasoned professional with a strong background in operations...
                                        </p>
                                    </section>

                                    {/* CORE COMPETENCIES */}
                                    <section className="ec-section">
                                        <h2 className="ec-section-title" contentEditable={canEdit && isEditable}>
                                            CORE COMPETENCIES
                                        </h2>
                                        <div className="ec-section-rule" />

                                        <p className="ec-section-text" contentEditable={canEdit && isEditable}>
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
                                            contentEditable={canEdit && isEditable}
                                        >
                                            PROFESSIONAL EXPERIENCE
                                        </h2>
                                        <div className="ec-section-rule" />

                                        {/* Job 1 */}
                                        <div className="ec-job">
                                            <div className="ec-job-header">
                                                <div>
                                                    <p className="ec-job-title" contentEditable={canEdit && isEditable}>
                                                        POSITION TITLE HERE
                                                    </p>
                                                    <p className="ec-job-company" contentEditable={canEdit && isEditable}>
                                                        Company, Location
                                                    </p>
                                                </div>

                                                <p className="ec-job-dates" contentEditable={canEdit && isEditable}>
                                                    Date – Date
                                                </p>
                                            </div>

                                            <ul className="ec-job-list">
                                                <li contentEditable={canEdit && isEditable}>
                                                    Re-wrote internal process guides to reduce training time...
                                                </li>
                                                <li contentEditable={canEdit && isEditable}>
                                                    Developed reporting dashboards used by leadership...
                                                </li>
                                                <li contentEditable={canEdit && isEditable}>
                                                    Streamlined communication between departments...
                                                </li>
                                                <li contentEditable={canEdit && isEditable}>
                                                    Coordinated project timelines and delivered tasks...
                                                </li>
                                                <li contentEditable={canEdit && isEditable}>
                                                    Led quality assurance reviews...
                                                </li>
                                                <li contentEditable={canEdit && isEditable}>
                                                    Resolved client issues with root-cause analysis...
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Job 2 */}
                                        <div className="ec-job">
                                            <div className="ec-job-header">
                                                <div>
                                                    <p className="ec-job-title" contentEditable={canEdit && isEditable}>
                                                        Administrative Assistant
                                                    </p>
                                                    <p className="ec-job-company" contentEditable={canEdit && isEditable}>
                                                        Prime Solutions • 2014 – 2016
                                                    </p>
                                                </div>

                                                <p className="ec-job-dates" contentEditable={canEdit && isEditable}>
                                                    2014 – 2016
                                                </p>
                                            </div>

                                            <ul className="ec-job-list">
                                                <li contentEditable={canEdit && isEditable}>
                                                    Supported office operations including record keeping...
                                                </li>
                                                <li contentEditable={canEdit && isEditable}>
                                                    Organized company events, meetings, travel...
                                                </li>
                                                <li contentEditable={canEdit && isEditable}>
                                                    Maintained confidential documents...
                                                </li>
                                                <li contentEditable={canEdit && isEditable}>
                                                    Provided high-quality customer service...
                                                </li>
                                            </ul>
                                        </div>
                                    </section>

                                    {/* EDUCATION (Main Area) */}
                                    <section className="ec-section ec-section-last">
                                        <h2
                                            className="ec-section-title"
                                            contentEditable={canEdit && isEditable}
                                        >
                                            EDUCATION
                                        </h2>
                                        <div className="ec-section-rule" />

                                        <div className="ec-main-edu">
                                            <p
                                                className="ec-main-edu-degree"
                                                contentEditable={canEdit && isEditable}
                                            >
                                                DIPLOMA – (2003–2005)
                                            </p>
                                            <p
                                                className="ec-main-edu-meta"
                                                contentEditable={canEdit && isEditable}
                                            >
                                                School Name – City, Country
                                            </p>
                                        </div>

                                        <div className="ec-main-edu">
                                            <p className="ec-main-edu-degree" contentEditable={canEdit && isEditable}>
                                                Certificate — Project Coordination
                                            </p>
                                            <p className="ec-main-edu-meta" contentEditable={canEdit && isEditable}>
                                                Online Certification — 2020
                                            </p>
                                        </div>

                                        <div className="ec-main-edu">
                                            <p
                                                className="ec-main-edu-degree"
                                                contentEditable={canEdit && isEditable}
                                            >
                                                DIPLOMA – (2000–2003)
                                            </p>
                                            <p
                                                className="ec-main-edu-meta"
                                                contentEditable={canEdit && isEditable}
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
            )
            }
        </TemplateLayout>
    );
};

export default ElegantClassic;
