import React, { useRef, useState, useEffect } from "react";
import TemplateLayout from "../TemplateLayout";
import "./NeoEdgePro.css";
import ProfileImageUpload from "../../components/ProfileImageUpload";
import QRCodeBlock from "../../components/QRCodeBlock";
import { paginateResumeEntries } from "../../utils/paginateResumeEntries";

export default function NeoEdgePro() {

  const containerRef = useRef(null);

  // ✅ DATA (move above entries)
  const summaryData = "Your summary text here";

  const workExperiences = [
    { id: 1, title: "Senior Engineer", company: "Company A" },
    { id: 2, title: "Frontend Dev", company: "Company B" },
  ];

  const projects = [
    { id: 1, text: "Resume Builder App" },
    { id: 2, text: "E-commerce Platform" },
  ];

  // ✅ ENTRIES
  const entries = [
    { id: "summary-1", type: "summary", data: summaryData },

    ...workExperiences.map((exp) => ({
      id: `exp-${exp.id}`,
      type: "experience",
      data: exp,
    })),

    ...projects.map((proj) => ({
      id: `proj-${proj.id}`,
      type: "project",
      data: proj,
    })),
  ];

  const [pages, setPages] = useState({
    page1: [],
    page2: [],
  });

  // ✅ PAGINATION
  useEffect(() => {
    const timer = setTimeout(() => {
      const result = paginateResumeEntries({
        containerEl: containerRef.current,
        entries,
        pageHeight: 812,
      });

      setPages(result);
    }, 120);

    return () => clearTimeout(timer);
  }, [summaryData, workExperiences, projects]);

  // ✅ RENDER ENTRY
  const renderEntry = (entry, canEdit, isEditable) => {
    switch (entry.type) {
      case "summary":
        return (
          <section>
            <h2>SUMMARY</h2>
            <p contentEditable={canEdit && isEditable}>
              {entry.data}
            </p>
          </section>
        );

      case "experience":
        return (
          <div className="neo-job">
            <h4 className="main-heading" contentEditable={canEdit && isEditable}>
              {entry.data.title}
            </h4>
            <span contentEditable={canEdit && isEditable}>
              {entry.data.company}
            </span>
          </div>
        );

      case "project":
        return (
          <ul>
            <li contentEditable={canEdit && isEditable}>
              {entry.data.text}
            </li>
          </ul>
        );

      default:
        return null;
    }
  };
 return (
  <TemplateLayout
    templateId="NeoEdgePro"
    wrapperClass="neo-wrapper"
    resumeClass="neo-resume"
  >
    {({ canEdit, isEditable, pdfRef, requirePayment }) => (

      <div className="neo-wrapper">
        <div ref={pdfRef}>

          {/* ================= PAGE 1 ================= */}
          <div className="resume-a4 neo-a4">
            <div className="neo-resume">

              {/* HEADER */}
              <header className="neo-header">

                <div className="neo-profile-shape"></div>

                <div className="neo-profile-inner">
                  <ProfileImageUpload
                    canEdit={canEdit}
                    isEditable={isEditable}
                    requirePayment={requirePayment}
                    className="neo-profile-wrapper"
                    imgClass="neo-profile"
                  />
                </div>

                <div className="neo-header-text">
                  <h1 contentEditable={canEdit && isEditable}>
                    ALEXANDER MORGAN
                  </h1>
                  <p contentEditable={canEdit && isEditable}>
                    SENIOR SOFTWARE ENGINEER
                  </p>
                </div>

                <div className="neo-header-right">
                  <QRCodeBlock
                    canEdit={canEdit}
                    isEditable={isEditable}
                  />
                </div>

              </header>

              {/* BODY */}
              <div className="neo-body">

                {/* SIDEBAR */}
                <aside className="neo-sidebar">

                  <section className="neo-section">
                    <h3>CONTACT</h3>
                    <p contentEditable={canEdit && isEditable}>+1 (555) 245-8890</p>
                    <p contentEditable={canEdit && isEditable}>alex@email.com</p>
                    <p contentEditable={canEdit && isEditable}>New York, USA</p>
                  </section>

                  <section className="neo-section">
                    <h3>SKILLS</h3>
                    <ul>
                      <li>JavaScript</li>
                      <li>React</li>
                      <li>Node.js</li>
                    </ul>
                  </section>

                </aside>

                {/* MAIN */}
                <main className="neo-main">

                  {/* SUMMARY */}
                  <section>
                    <h2>SUMMARY</h2>
                    <p contentEditable={canEdit && isEditable}>
                      Results-driven Senior Software Engineer with 6+ years of experience...
                    </p>
                  </section>

                  {/* EXPERIENCE */}
                  <section>
                    <h2>EXPERIENCE</h2>

                    <div>
                      <h4>Senior Software Engineer</h4>
                      <p>TechCorp — 2021 – Present</p>
                    </div>

                    <div>
                      <h4>Frontend Developer</h4>
                      <p>Creative Labs — 2018 – 2021</p>
                    </div>

                  </section>

                </main>

              </div>

              <div className="neo-page-number">Page 1 of 2</div>

            </div>
          </div>

          {/* ================= PAGE 2 ================= */}
          <div className="resume-a4 neo-a4">
            <div className="neo-resume">

              <div className="neo-body">

                {/* SAME SIDEBAR */}
                <aside className="neo-sidebar">

                  <section className="neo-section">
                    <h3>CONTACT</h3>
                    <p>+1 (555) 245-8890</p>
                    <p>alex@email.com</p>
                    <p>New York, USA</p>
                  </section>

                  <section className="neo-section">
                    <h3>SKILLS</h3>
                    <ul>
                      <li>JavaScript</li>
                      <li>React</li>
                      <li>Node.js</li>
                    </ul>
                  </section>

                </aside>

                {/* MAIN */}
                <main className="neo-main">

                  {/* PROJECTS */}
                  <section>
                    <h2>PROJECTS</h2>

                    <ul>
                      <li>Resume Builder App</li>
                      <li>E-commerce Platform</li>
                      <li>Task Manager</li>
                    </ul>

                  </section>

                </main>

              </div>

              <div className="neo-page-number">Page 2 of 2</div>

            </div>
          </div>

        </div>
      </div>

    )}
  </TemplateLayout>
);
}