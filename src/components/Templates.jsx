import React from "react";
import "./Templates.css";

export default function Templates() {
  return (
    <div className="templates-page">
      <h1 className="templates-heading">Choose a Resume Template</h1>

      <div className="templates-grid">
        {/* Example template cards */}
        <div className="template-card">Classic Template</div>
        <div className="template-card">Modern Template</div>
        <div className="template-card">Creative Template</div>
      </div>
    </div>
  );
}
