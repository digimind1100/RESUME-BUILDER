import React, { useEffect, useRef, useState } from "react";
import TemplateLayout from "../TemplateLayout";
import { paginateResumeEntries } from "../../utils/paginateResumeEntries";
import "./NeoEdgePro.css";

export default function NeoEdgePro() {
  const containerRef = useRef(null);

  const [pages, setPages] = useState({
    page1: [],
    page2: [],
  });

  const canEdit = true;


  // 🔹 DATA
  const [summary, setSummary] = useState(
    "Professional summary goes here..."
  );

  const [experiences, setExperiences] = useState(
    Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      text: `Experience ${i + 1}`,
    }))
  );

  // 🔹 ENTRIES (RIGHT SIDE ONLY)
  const paginationEntries = [
    { id: "summary", type: "summary", data: summary },

    ...experiences.map((exp) => ({
      id: `exp-${exp.id}`,
      type: "experience-item", // ✅ correct
      data: exp,
    })),
  ];

  // 🔥 PAGINATION (SAME LOGIC)
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const result = paginateResumeEntries({
        containerEl: containerRef.current,
        entries: paginationEntries, // ✅ FIXED
        pageHeight: 1122,
      });

      setPages(result);
    });

    return () => cancelAnimationFrame(frame);
  }, [summary, experiences]);

  const handleSummaryChange = (e) => {
    if (!e?.currentTarget) return;
    setSummary(e.currentTarget.innerText || "");
  };

  const handleExpChange = (id, e) => {
    if (!e?.currentTarget) return;

    const text = e.currentTarget.innerText || "";

    setExperiences((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, text } : item
      )
    );
  };

  return (
    <TemplateLayout
      templateId="NeoEdgePro"
      wrapperClass="me-wrapper"
      resumeClass="me-resume"
    >
      {({ canEdit, isEditable }) => {

        // ✅ Sidebar INSIDE
        const Sidebar = () => (
          <aside className="me-sidebar">
            <h1 contentEditable={canEdit && isEditable}>Your Name</h1>
            <p contentEditable={canEdit && isEditable}>Your Role</p>
          </aside>
        );

        // ✅ renderEntry INSIDE
        const renderEntry = (entry) => {
          if (entry.type === "summary") {
            return (
              <section className="me-block">
                <h2>SUMMARY</h2>
                <p contentEditable={canEdit && isEditable}>
                  {entry.data}
                </p>
              </section>
            );
          }

          if (entry.type === "experience-item") {
            return (
              <div className="me-job">

                {/* ✅ ADD HEADING TO FIRST ITEM */}
                {entry.data.id === 1 && (
                  <h2 className="me-block-title">EXPERIENCE</h2>
                )}

                <div className="me-job-header">
                  <h3
                    contentEditable={canEdit && isEditable}
                    suppressContentEditableWarning
                    onInput={(e) => handleExpChange(entry.data.id, e)}
                  >
                    {entry.data.text}
                  </h3>

                  <p contentEditable={canEdit && isEditable}>
                    2020 – Present
                  </p>
                </div>

                <p className="me-job-location" contentEditable={canEdit && isEditable}>
                  Company Name
                </p>

                <ul className="me-job-list">
                  <li contentEditable={canEdit && isEditable}>Did something important</li>
                  <li contentEditable={canEdit && isEditable}>Worked on project</li>
                </ul>

              </div>
            );
          }
          return null;
        };

        // ✅ EVERYTHING returned INSIDE SAME BLOCK
        return (
          <>
            <div className="me-wrapper">

              <div className="resume-a4 me-a4">
                <div className="me-resume">

                  <Sidebar /> {/* ✅ NOW WORKS */}

                  <main className="me-main">
                    {pages.page1.map(entry => (
                      <div key={entry.id}>{renderEntry(entry)}</div>
                    ))}
                  </main>

                </div>
              </div>

            </div>

            {/* ✅ hidden container also inside */}
            <div
              ref={containerRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                visibility: "hidden",
                pointerEvents: "none",
                width: "794px", // full A4
              }}
            >
              <div style={{ display: "flex" }}>

                {/* Sidebar simulation */}
                <div style={{ width: "32%" }} />

                {/* REAL content area */}
                <div
                  style={{
                    width: "68%",
                    padding: "40px",
                    boxSizing: "border-box",
                    fontSize: "13px",
                    lineHeight: "1.6",
                  }}
                >
                  {paginationEntries.map((entry) => (
                    <div
                      key={entry.id}
                      id={`entry-${entry.id}`}
                      style={{ marginBottom: "28px" }}
                    >
                      {renderEntry(entry)}
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </>
        );
      }}
    </TemplateLayout>
  );
};