import React, { useEffect, useRef, useState } from "react";
import TemplateLayout from "../TemplateLayout";

export default function TestPagination() {
  const containerRef = useRef(null);

  const [pages, setPages] = useState({
    page1: [],
    page2: [],
  });

  // 🧠 Sample Data (force overflow)
  const summary = "This is a summary section with some text.";

  const experiences = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    text: `Experience item ${i + 1} - Lorem ipsum dolor sit amet.`,
  }));

  const projects = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    text: `Project item ${i + 1} - Some project description.`,
  }));

  // 🧠 STEP 1: Create Entries
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

  // 🧠 STEP 2: Pagination Logic
  useEffect(() => {
    const PAGE_HEIGHT = 812;

    const timer = setTimeout(() => {
      let usedHeight = 0;
      const page1 = [];
      const page2 = [];

      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const el = document.getElementById(`entry-${entry.id}`);

        if (!el) continue;

        const height = el.getBoundingClientRect().height;

        // force first item if empty
        if (page1.length === 0) {
          page1.push(entry);
          usedHeight += height;
          continue;
        }

        if (usedHeight + height <= PAGE_HEIGHT) {
          page1.push(entry);
          usedHeight += height;
        } else {
          page2.push(...entries.slice(i));
          break;
        }
      }

      setPages({ page1, page2 });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // 🧠 Render helper
  const renderEntry = (entry) => {
    switch (entry.type) {
      case "summary":
        return (
          <div style={{ padding: "10px", background: "#f5f5f5" }}>
            <strong>Summary:</strong> {entry.data}
          </div>
        );

      case "experience":
        return (
          <div style={{ padding: "10px", border: "1px solid #ccc" }}>
            {entry.data.text}
          </div>
        );

      case "project":
        return (
          <div style={{ padding: "10px", border: "1px dashed #999" }}>
            {entry.data.text}
          </div>
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
    <div>

      {/* HEADER */}
      <div style={{ height: "250px", background: "#ddd" }}>
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

      {/* 🔥 HIDDEN MEASUREMENT CONTAINER */}
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          width: "600px",
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