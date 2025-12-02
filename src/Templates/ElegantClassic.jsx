// src/Templates/ElegantClassic.jsx
import React, { useRef } from "react";
import "./ElegantClassic.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ElegantClassic = () => {
    const resumeRef = useRef(null);
    const navigate = useNavigate();

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
            </div>

            {/* A4 Resume */}
            <div className="ec-a4" ref={resumeRef}>
                <div className="ec-resume">
                    {/* HEADER */}
                    <header className="ec-header">
                        <h1
                            className="ec-name"
                            contentEditable
                            suppressContentEditableWarning
                        >
                            EMERSON REED
                        </h1>
                        <p
                            className="ec-title"
                            contentEditable
                            suppressContentEditableWarning
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
                                    contentEditable
                                    suppressContentEditableWarning
                                >
                                    CONTACT
                                </h3>

                                <ul className="ec-contact-list">
                                    <li>
                                        <span className="ec-icon-circle">✉</span>
                                        <span
                                            className="ec-contact-text"
                                            contentEditable
                                            suppressContentEditableWarning
                                        >
                                            youremail@mail.com
                                        </span>
                                    </li>
                                    <li>
                                        <span className="ec-icon-circle">✆</span>
                                        <span
                                            className="ec-contact-text"
                                            contentEditable
                                            suppressContentEditableWarning
                                        >
                                            555.555.5555
                                        </span>
                                    </li>
                                    <li>
                                        <span className="ec-icon-circle">📍</span>
                                        <span
                                            className="ec-contact-text"
                                            contentEditable
                                            suppressContentEditableWarning
                                        >
                                            Your City, State
                                        </span>
                                    </li>
                                    <li>
                                        <span className="ec-icon-circle">in</span>
                                        <span
                                            className="ec-contact-text"
                                            contentEditable
                                            suppressContentEditableWarning
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
                                    contentEditable
                                    suppressContentEditableWarning
                                >
                                    SKILLS
                                </h3>
                                <ul className="ec-skill-list">
                                    <li contentEditable suppressContentEditableWarning>
                                        Process Improvement
                                    </li>
                                    <li contentEditable suppressContentEditableWarning>
                                        Contracts &amp; Negotiations
                                    </li>
                                    <li contentEditable suppressContentEditableWarning>
                                        Project Planning
                                    </li>
                                    <li contentEditable suppressContentEditableWarning>
                                        Reporting &amp; Analytics
                                    </li>
                                    <li contentEditable suppressContentEditableWarning>
                                        Risk Assessment
                                    </li>
                                    <li contentEditable suppressContentEditableWarning>
                                        Resource Management
                                    </li>
                                    <li contentEditable suppressContentEditableWarning>
                                        Adaptability
                                    </li>
                                    <li contentEditable suppressContentEditableWarning>
                                        Conflict Resolution
                                    </li>
                                </ul>
                            </section>

                            {/* EDUCATION */}
                            <section className="ec-sidebar-section">
                                <h3
                                    className="ec-sidebar-heading"
                                    contentEditable
                                    suppressContentEditableWarning
                                >
                                    EDUCATION
                                </h3>

                                <div className="ec-edu-block">
                                    <p
                                        className="ec-edu-degree"
                                        contentEditable
                                        suppressContentEditableWarning
                                    >
                                        NAME OF DEGREE
                                    </p>
                                    <p
                                        className="ec-edu-meta"
                                        contentEditable
                                        suppressContentEditableWarning
                                    >
                                        Concentration (if any)
                                        <br />
                                        University Name
                                        <br />
                                        Graduation Year
                                    </p>
                                </div>

                                <div className="ec-edu-block">
                                    <p
                                        className="ec-edu-degree"
                                        contentEditable
                                        suppressContentEditableWarning
                                    >
                                        CERTIFICATION HERE
                                    </p>
                                    <p
                                        className="ec-edu-meta"
                                        contentEditable
                                        suppressContentEditableWarning
                                    >
                                        Certifying Organization
                                        <br />
                                        Completion Year
                                    </p>
                                </div>

                                <div className="ec-edu-block">
                                    <p
                                        className="ec-edu-degree"
                                        contentEditable
                                        suppressContentEditableWarning
                                    >
                                        CERTIFICATION HERE
                                    </p>
                                    <p
                                        className="ec-edu-meta"
                                        contentEditable
                                        suppressContentEditableWarning
                                    >
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
                                    contentEditable
                                    suppressContentEditableWarning
                                >
                                    SUMMARY
                                </h2>
                                <div className="ec-section-rule" />
                                <p
                                    className="ec-section-text"
                                    contentEditable
                                    suppressContentEditableWarning
                                >
                                    Seasoned professional with a strong background in operations, project
                                    coordination, and organizational leadership. Adept at optimizing internal
                                    processes, driving team performance, and developing actionable strategies
                                    that improve efficiency and profitability. Recognized for delivering
                                    high-quality results in fast-paced environments, building strong
                                    cross-functional relationships, and managing complex workflows from
                                    planning through execution. Passionate about continuous improvement,
                                    problem-solving, and providing value that supports company objectives.
                                </p>

                            </section>


                            <section className="ec-section">
  <h2 className="ec-section-title" contentEditable>CORE COMPETENCIES</h2>
  <div className="ec-section-rule" />

  <p className="ec-section-text">
    • Strategic Planning &nbsp;• Workflow Optimization &nbsp;• Coordination  
    <br />
    • Leadership Support &nbsp;• Documentation & Reporting  
    <br />
    • Communication &nbsp;• Problem Solving &nbsp;• Time Management
  </p>
</section>




                            {/* PROFESSIONAL EXPERIENCE */}
                            <section className="ec-section">
                                <h2
                                    className="ec-section-title"
                                    contentEditable
                                    suppressContentEditableWarning
                                >
                                    PROFESSIONAL EXPERIENCE
                                </h2>
                                <div className="ec-section-rule" />

                                {/* Job 1 */}
                                <div className="ec-job">
                                    <div className="ec-job-header">
                                        <div>
                                            <p
                                                className="ec-job-title"
                                                contentEditable
                                                suppressContentEditableWarning
                                            >
                                                POSITION TITLE HERE
                                            </p>
                                            <p
                                                className="ec-job-company"
                                                contentEditable
                                                suppressContentEditableWarning
                                            >
                                                Company, Location
                                            </p>
                                        </div>
                                        <p
                                            className="ec-job-dates"
                                            contentEditable
                                            suppressContentEditableWarning
                                        >
                                            Date – Date
                                        </p>
                                    </div>
                                    <ul className="ec-job-list">
                                        <li contentEditable>Re-wrote internal process guides to reduce training time by 30%.</li>
                                        <li contentEditable>Developed reporting dashboards used by leadership to track KPIs.</li>
                                        <li contentEditable>Streamlined communication between departments, reducing delays.</li>
                                        <li contentEditable>Coordinated project timelines and delivered 95% of tasks on schedule.</li>
                                        <li contentEditable>Led quality assurance reviews to ensure compliance with company standards.</li>
                                        <li contentEditable>Resolved client issues by identifying root causes and implementing sustainable solutions.</li>
                                    </ul>

                                </div>

                                {/* Job 2 */}
                                <div className="ec-job">
                                    <div className="ec-job-header">
                                        <div>
                                            <p className="ec-job-title" contentEditable>Administrative Assistant</p>
                                            <p className="ec-job-company" contentEditable>Prime Solutions • 2014 – 2016</p>
                                        </div>
                                        <p className="ec-job-dates" contentEditable>2014 – 2016</p>
                                    </div>

                                    <ul className="ec-job-list">
                                        <li contentEditable>Supported office operations including record keeping and correspondence.</li>
                                        <li contentEditable>Organized company events, meetings, and travel arrangements.</li>
                                        <li contentEditable>Maintained confidential files and ensured accurate documentation.</li>
                                        <li contentEditable>Provided high-quality customer service to internal and external clients.</li>
                                    </ul>
                                </div>

                            </section>

                            {/* EDUCATION (MAIN SIDE) */}
                            <section className="ec-section ec-section-last">
                                <h2
                                    className="ec-section-title"
                                    contentEditable
                                    suppressContentEditableWarning
                                >
                                    EDUCATION
                                </h2>
                                <div className="ec-section-rule" />

                                <div className="ec-main-edu">
                                    <p
                                        className="ec-main-edu-degree"
                                        contentEditable
                                        suppressContentEditableWarning
                                    >
                                        DIPLOMA – (2003–2005)
                                    </p>
                                    <p
                                        className="ec-main-edu-meta"
                                        contentEditable
                                        suppressContentEditableWarning
                                    >
                                        School Name – City, Country
                                    </p>
                                </div>
                                <div className="ec-main-edu">
  <p className="ec-main-edu-degree" contentEditable>Certificate — Project Coordination</p>
  <p className="ec-main-edu-meta" contentEditable>Online Certification — 2020</p>
</div>


                                <div className="ec-main-edu">
                                    <p
                                        className="ec-main-edu-degree"
                                        contentEditable
                                        suppressContentEditableWarning
                                    >
                                        DIPLOMA – (2000–2003)
                                    </p>
                                    <p
                                        className="ec-main-edu-meta"
                                        contentEditable
                                        suppressContentEditableWarning
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
