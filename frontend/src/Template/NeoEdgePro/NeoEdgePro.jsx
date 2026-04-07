import React, { useEffect, useRef, useState } from "react";
import TemplateLayout from "../TemplateLayout";
import { paginateResumeEntries } from "../../utils/paginateResumeEntries";
import "../MedicalElite/MedicalElite.css";

export default function NeoEdgePro() {
  const containerRef = useRef(null);

  const [pages, setPages] = useState({
    page1: [],
    page2: [],
  });

  const canEdit = true;
  const isEditable = true;

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

  // 🔹 RENDER ENTRY (RIGHT SIDE BLOCKS)
  const renderEntry = (entry) => {
    switch (entry.type) {

      case "summary":
        return (
          <section className="me-block">
            <h2 className="me-block-title">SUMMARY</h2>
            <p
              className="me-block-text"
              contentEditable={canEdit && isEditable}
              suppressContentEditableWarning
              onInput={(e) => handleSummaryChange(e)}
            >
              {entry.data}
            </p>
          </section>
        );

      case "experience-item":
        return (
          <div
            className="me-job"
            contentEditable={canEdit && isEditable}
            suppressContentEditableWarning
            onInput={(e) => handleExpChange(entry.data.id, e)}
          >
            {entry.data.text}
          </div>
        );

      default:
        return null;
    }
  };

  // 🔥 SIDEBAR (REUSED EXACT STRUCTURE)
  const Sidebar = () => (
    <aside className="me-sidebar">
      <h1 className="me-name" contentEditable>
        Your Name
      </h1>
      <p className="me-role" contentEditable>
        Your Role
      </p>

      <section className="me-section">
        <h3 className="me-section-title">CONTACT</h3>
        <ul className="me-list">
          <li contentEditable>Email</li>
          <li contentEditable>Phone</li>
        </ul>
      </section>

      <section className="me-section">
        <h3 className="me-section-title">SKILLS</h3>
        <ul className="me-list">
          <li contentEditable>Skill 1</li>
          <li contentEditable>Skill 2</li>
        </ul>
      </section>
    </aside>
  );

  return (
    <TemplateLayout
      templateId="NeoEdgePro"
      wrapperClass="me-wrapper"
      resumeClass="me-resume"
    >
      {() => (
        <div className="me-wrapper">

          {/* 🔥 PAGE 1 */}
          <div className="resume-a4 me-a4">
            <div className="me-resume">

              <Sidebar />

              <main className="me-main">

                {/* SUMMARY */}
                {pages.page1
                  .filter(e => e.type === "summary")
                  .map(entry => (
                    <div key={entry.id}>{renderEntry(entry)}</div>
                  ))
                }

                {/* EXPERIENCE */}
                {pages.page1.some(e => e.type === "experience-item") && (
                  <section className="me-block">
                    <h2 className="me-block-title">EXPERIENCE</h2>

                    {pages.page1
                      .filter(e => e.type === "experience-item")
                      .map(entry => (
                        <div key={entry.id}>{renderEntry(entry)}</div>
                      ))
                    }
                  </section>
                )}

              </main>

            </div>
          </div>

          {/* 🔥 PAGE 2 */}
          {pages.page2.length > 0 && (
            <div className="resume-a4 me-a4">
              <div className="me-resume">

                <Sidebar /> {/* SAME SIDEBAR */}

                <main className="me-main">

                  {pages.page2.some(e => e.type === "experience-item") && (
                    <section className="me-block">
                      <h2 className="me-block-title">EXPERIENCE</h2>

                      {pages.page2
                        .filter(e => e.type === "experience-item")
                        .map(entry => (
                          <div key={entry.id}>{renderEntry(entry)}</div>
                        ))
                      }
                    </section>
                  )}

                </main>

              </div>
            </div>
          )}

          {/* 🔥 HIDDEN MEASURE (RIGHT SIDE ONLY) */}
          <div
            ref={containerRef}
            style={{
              position: "absolute",
              visibility: "hidden",

              width: "540px",
              padding: "40px",              // ✅ MUST MATCH
              boxSizing: "border-box",      // ✅ MUST MATCH
              fontSize: "13px",             // ✅ MATCH TEXT SIZE
              lineHeight: "1.6",            // ✅ MATCH TEXT
            }}
          >
            {paginationEntries.map((entry) => (
              <div
                id={`entry-${entry.id}`}
                key={entry.id}
                style={{ marginBottom: "28px" }} // match .me-block
              >
                {renderEntry(entry)}
              </div>
            ))}
          </div>

        </div>
      )}
    </TemplateLayout>
  );
}