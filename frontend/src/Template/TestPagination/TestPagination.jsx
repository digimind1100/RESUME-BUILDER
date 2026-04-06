import React, { useEffect, useRef, useState } from "react";
import TemplateLayout from "../TemplateLayout";
import { paginateResumeEntries } from "../../utils/paginateResumeEntries"; // ✅ NEW

export default function TestPagination() {
  const containerRef = useRef(null);

  const [pages, setPages] = useState({
    page1: [],
    page2: [],
  });

  const canEdit = true;
  const isEditable = true;

  const [summary, setSummary] = useState(
    "This is a summary section with some text."
  );

  const [experiences, setExperiences] = useState(
    Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      text: `Experience item ${i + 1} - Lorem ipsum dolor sit amet.`,
    }))
  );

  const [projects, setProjects] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      text: `Project item ${i + 1} - Some project description.`,
    }))
  );

  // ✅ Entries
  const entries = [
    { id: "summary-1", type: "summary", data: summary },

    ...experiences.map((exp) => ({
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

  // ✅ NEW PAGINATION USING REUSABLE FILE
  useEffect(() => {
    const timer = setTimeout(() => {
      const result = paginateResumeEntries({
        containerEl: containerRef.current,
        entries,
        pageHeight: 812,
      });

      setPages(result);
    }, 100);

    return () => clearTimeout(timer);
  }, [summary, experiences, projects]);

  // Handlers
  const handleSummaryChange = (e) => {
    setSummary(e.currentTarget.innerText);
  };

  const handleExpChange = (id, text) => {
    setExperiences((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, text } : item
      )
    );
  };

  const handleProjChange = (id, text) => {
    setProjects((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, text } : item
      )
    );
  };

  // Render helper
  const renderEntry = (entry) => {
    switch (entry.type) {
      case "summary":
        return (
          <div
            contentEditable={canEdit && isEditable}
            suppressContentEditableWarning
            onInput={handleSummaryChange}
            style={{ padding: "10px", background: "#f5f5f5",  width: "972px",
    minWidth: "972px",
    maxWidth: "972px",
    margin: "0 auto",
    background: "white" }}
          >
            <strong>Summary:</strong> {entry.data}
          </div>
        );

      case "experience":
        return (
          <div
            contentEditable={canEdit && isEditable}
            suppressContentEditableWarning
            onInput={(e) =>
              handleExpChange(entry.data.id, e.currentTarget.innerText)
            }
            style={{ padding: "10px", border: "1px solid #ccc",  width: "972px",
    minWidth: "972px",
    maxWidth: "972px",
    margin: "0 auto",
    background: "white" }}
          >
            {entry.data.text}
          </div>
        );

      case "project":
        return (
          <div
            contentEditable={canEdit && isEditable}
            suppressContentEditableWarning
            onInput={(e) =>
              handleProjChange(entry.data.id, e.currentTarget.innerText)
            }
            style={{ padding: "10px", border: "1px dashed #999",  width: "972px",
    minWidth: "972px",
    maxWidth: "972px",
    margin: "0 auto",
    background: "white" }}
          >
            {entry.data.text}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <TemplateLayout
      templateId="TestPagination"
      wrapperClass="test-wrapper"
      resumeClass="test-resume"
    >
      {() => (
        <div>
          {/* HEADER */}
          <div style={{ height: "250px", background: "#ddd",  width: "972px",
    minWidth: "972px",
    maxWidth: "972px",
    margin: "0 auto",
    background: "white",
    border: "1px solid" }}>
            Header (250px)
          </div>

          {/* PAGE 1 */}
          <div style={{ height: "812px", border: "2px solid black", marginBottom: "20px" }}>
            {pages.page1.map((entry) => (
              <div key={entry.id}>{renderEntry(entry)}</div>
            ))}
          </div>

          {/* PAGE 2 */}
          {pages.page2.length > 0 && (
            <div style={{ height: "812px", border: "2px solid red" }}>
              {pages.page2.map((entry) => (
                <div key={entry.id}>{renderEntry(entry)}</div>
              ))}
            </div>
          )}

          {/* 🔥 HIDDEN MEASUREMENT */}
          <div
            ref={containerRef}
            style={{
              position: "absolute",
              visibility: "hidden",
              width: "794px", // ✅ match real A4 width
              boxSizing: "border-box",
            }}
          >
            {entries.map((entry) => (
              <div id={`entry-${entry.id}`} key={entry.id}>
                {renderEntry(entry)}
              </div>
            ))}
          </div>
        </div>
      )}
    </TemplateLayout>
  );
}