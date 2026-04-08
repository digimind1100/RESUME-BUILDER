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

      // ✅ MOVE renderEntry INSIDE
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
              <div className="me-job">
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

          default:
            return null;
        }
      };

      return (
        <div className="me-wrapper">

          {/* PAGE 1 */}
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
          {/* PAGE 2 */}
          {pages.page2.length > 0 && (
            <div className="resume-a4 me-a4">
              <div className="me-resume">
                <Sidebar />
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

        </div>
      );
    }}
  </TemplateLayout>
);
};