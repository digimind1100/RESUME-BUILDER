import React, { useEffect, useRef, useState } from "react";
import TemplateLayout from "../TemplateLayout";
import { paginateResumeEntries } from "../../utils/paginateResumeEntries";

export default function NeoEdgePro() {
  const containerRef = useRef(null);

  const [pages, setPages] = useState({
    page1: [],
    page2: [],
  });

  const canEdit = true;
  const isEditable = true;

  // 🔹 DATA STATES
  const [summary, setSummary] = useState(
    "Write your professional summary here..."
  );

  const [experiences, setExperiences] = useState(
    Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      text: `Experience ${i + 1} - Describe your role and achievements.`,
    }))
  );

  const [projects, setProjects] = useState(
    Array.from({ length: 4 }, (_, i) => ({
      id: i + 1,
      text: `Project ${i + 1} - Project description.`,
    }))
  );

  // 🔹 ENTRIES COMBINED
  const entries = [
    { id: "summary", type: "summary", data: summary },

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

  // 🔥 PAGINATION LOGIC (SAME AS TEST)
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

  // 🔹 HANDLERS
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

  // 🔹 ENTRY RENDER
  const renderEntry = (entry) => {
    switch (entry.type) {
      case "summary":
        return (
          <div
            contentEditable={canEdit && isEditable}
            suppressContentEditableWarning
            onInput={handleSummaryChange}
            className="section summary"
          >
            <h3>Summary</h3>
            <p>{entry.data}</p>
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
            className="section experience"
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
            className="section project"
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
      templateId="NeoEdgePro"
      wrapperClass="neo-wrapper"
      resumeClass="neo-resume"
    >
      {() => (
        <div>
          {/* 🔥 HEADER */}
          <div className="neo-header">
            Header (250px)
          </div>

          {/* 🔥 PAGE 1 */}
          <div className="neo-page">
            {pages.page1.map((entry) => (
              <div key={entry.id}>{renderEntry(entry)}</div>
            ))}
          </div>

          {/* 🔥 PAGE 2 */}
          {pages.page2.length > 0 && (
            <div className="neo-page page-2">
              {pages.page2.map((entry) => (
                <div key={entry.id}>{renderEntry(entry)}</div>
              ))}
            </div>
          )}

          {/* 🔥 HIDDEN MEASURE CONTAINER */}
          <div ref={containerRef} className="hidden-measure">
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