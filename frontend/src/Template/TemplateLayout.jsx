import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";

const TemplateLayout = ({ children, onSave, onPreview }) => {
  return (
    <div className="template-layout">

      {/* Top Bar */}
      <div className="toolbar">
        <button onClick={onSave}>Save</button>
        <button onClick={onPreview}>Preview</button>
      </div>

      {/* Resume Content */}
      <div className="content">
        {children}
      </div>

    </div>
  );
};

export default TemplateLayout;
