import React, { useState } from "react";
import TemplateDrawer from "./TemplateDrawer";
import NewTemplatesFormPanel from "./NewTemplatesFormPanel";
import "./Templates.css";

export default function Templates10() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Open drawer when user clicks "Use Template"
  const handleUseSimple = (num) => {
    setSelectedTemplate(num);
    setIsDrawerOpen(true);
  };

  return (
    <section className="templates-page">

      <h2 className="template-title">Quick & Simple Templates</h2>

      <div className="template-list">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <div key={num} className="template-card">
            <img
              src={`/templates/simple-${num}.png`}
              alt={`Template ${num}`}
            />
            <button
              className="choose-template-btn"
              onClick={() => handleUseSimple(num)}
            >
              Use Template {num}
            </button>
          </div>
        ))}
      </div>

      {/* Drawer Popup */}
      <TemplateDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <NewTemplatesFormPanel
          selectedTemplate={selectedTemplate}
          onClose={() => setIsDrawerOpen(false)}
        />
      </TemplateDrawer>
    </section>
  );
}
