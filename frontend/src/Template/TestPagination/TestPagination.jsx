import React, { useEffect, useRef, useState } from "react";
import { paginateResumeEntries } from "../../utils/paginateResumeEntries";

export default function TestPagination() {
  const containerRef = useRef(null);

  const canEdit = true;
  const isEditable = true;

  const [pages, setPages] = useState({
    page1: [],
    page2: [],
  });

  // ✅ Editable State
  const [summary, setSummary] = useState(
    "This is a summary section. Edit this text to test pagination behavior. Add more lines to push content to next page."
  );

  const [experiences, setExperiences] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      text: `Experience ${i + 1} - Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    }))
  );

  const [projects, setProjects] = useState(
    Array.from({ length: 4 }, (_, i) => ({
      id: i + 1,
      text: `Project ${i + 1} - Sample project description.`,
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

  // ✅ Pagination
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

  // ✅ Handlers
  const handleSummary = (e) => {
    setSummary(e.currentTarget.innerText);
  };

  const handleExp = (id, text) => {
    setExperiences((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, text } : item
      )
    );
  };

  const handleProj = (id, text) => {
    setProjects((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, text } : item
      )
    );
  };

  // ✅ Render Entry
  const renderEntry = (entry) => {
    switch (entry.type) {
      case "summary":
        return (
          <div
            contentEditable={canEdit && isEditable}
            suppressContentEditableWarning
            onInput={handleSummary}
            style={{ padding: "10px", background: "#f5f5f5" }}
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
              handleExp(entry.data.id, e.currentTarget.innerText)
            }
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              marginBottom: "8px",
            }}
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
              handleProj(entry.data.id, e.currentTarget.innerText)
            }
            style={{
              padding: "10px",
              border: "1px dashed #999",
              marginBottom: "8px",
            }}
          >
            {entry.data.text}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ background: "#e5e7eb", padding: "20px" }}>

      {/* ================= PAGE 1 ================= */}
      <div
        style={{
          width: "794px",
          margin: "0 auto",
          background: "white",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          marginBottom: "30px",
        }}
      >
        {/* HEADER */}
        <div style={{ height: "250px", background: "#ddd" }}>
          Header (250px)
        </div>

        {/* CONTENT */}
        <div style={{ height: "812px", padding: "20px" }}>
          {pages.page1.map((entry) => (
            <div key={entry.id}>
              {renderEntry(entry)}
            </div>
          ))}
        </div>
      </div>

      {/* ================= PAGE 2 ================= */}
      {pages.page2.length > 0 && (
        <div
          style={{
            width: "794px",
            margin: "0 auto",
            background: "white",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ height: "812px", padding: "20px" }}>
            {pages.page2.map((entry) => (
              <div key={entry.id}>
                {renderEntry(entry)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🔥 HIDDEN MEASUREMENT */}
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          width: "794px",
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
  );
}