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
                <h3 contentEditable={canEdit && isEditable}>
                  {entry.data.text}
                </h3>
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
            {/* 🔥 HIDDEN MEASURE */}
            <div
              ref={containerRef}
              style={{
                position: "absolute",
                visibility: "hidden",
                width: "540px",
                padding: "40px",
                boxSizing: "border-box",
                fontSize: "13px",
                lineHeight: "1.6",
              }}
            >

              {/* SUMMARY */}
              <div id="entry-summary">
                {renderEntry({ id: "summary", type: "summary", data: summary })}
              </div>

              {/* EXPERIENCE SECTION (IMPORTANT) */}
              <section className="me-block">

                <h2 className="me-block-title">EXPERIENCE</h2>

                {experiences.map((exp) => (
                  <div
                    id={`entry-exp-${exp.id}`}
                    key={exp.id}
                    style={{ marginBottom: "28px" }}
                  >
                    {renderEntry({
                      id: `exp-${exp.id}`,
                      type: "experience-item",
                      data: exp,
                    })}
                  </div>
                ))}
              </section>

            </div>
          </>
        );
      }}
    </TemplateLayout>
  );
};