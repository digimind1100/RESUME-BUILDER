// src/components/Templates10.jsx
import React from "react";
import "./Templates.css"; // reuse existing CSS

export default function Templates10() {
  return (
    <div className="templates-page">
      {/* HEADER SECTION */}
      <div className="template-header">
        <h2 className="template-title">Explore More Templates</h2>
        <p className="template-subtitle">
          10 Quick and Simple Resume Templates – Ready to Use!
        </p>
        <p className="template-description">
          Choose from a variety of layouts to quickly create your resume. Each template is fully customizable and mobile-friendly.
        </p>
      </div>

      {/* TEMPLATE GRID */}
      <div className="template-list">
        {/* Template 1 */}
        <div className="template-card">
          <img src="/demo/template1.jpg" alt="Template 1" />
          <h3>Simple Classic</h3>
          <button className="choose-template-btn">Select Template</button>
        </div>

        {/* Template 2 */}
        <div className="template-card">
          <img src="/demo/template2.jpg" alt="Template 2" />
          <h3>Modern Professional</h3>
          <button className="choose-template-btn">Select Template</button>
        </div>

        {/* Template 3 */}
        <div className="template-card">
          <img src="/demo/template3.jpg" alt="Template 3" />
          <h3>Minimal Clean</h3>
          <button className="choose-template-btn">Select Template</button>
        </div>

        {/* Template 4 */}
        <div className="template-card">
          <img src="/demo/template4.jpg" alt="Template 4" />
          <h3>Creative Layout</h3>
          <button className="choose-template-btn">Select Template</button>
        </div>

        {/* Template 5 */}
        <div className="template-card">
          <img src="/demo/template5.jpg" alt="Template 5" />
          <h3>Professional Blue</h3>
          <button className="choose-template-btn">Select Template</button>
        </div>

        {/* Template 6 */}
        <div className="template-card">
          <img src="/demo/template6.jpg" alt="Template 6" />
          <h3>Elegant Gray</h3>
          <button className="choose-template-btn">Select Template</button>
        </div>

        {/* Template 7 */}
        <div className="template-card">
          <img src="/demo/template7.jpg" alt="Template 7" />
          <h3>Simple Two-Column</h3>
          <button className="choose-template-btn">Select Template</button>
        </div>

        {/* Template 8 */}
        <div className="template-card">
          <img src="/demo/template8.jpg" alt="Template 8" />
          <h3>Modern Highlight</h3>
          <button className="choose-template-btn">Select Template</button>
        </div>

        {/* Template 9 */}
        <div className="template-card">
          <img src="/demo/template9.jpg" alt="Template 9" />
          <h3>Classic Minimalist</h3>
          <button className="choose-template-btn">Select Template</button>
        </div>

        {/* Template 10 */}
        <div className="template-card">
          <img src="/demo/template10.jpg" alt="Template 10" />
          <h3>Professional Modern</h3>
          <button className="choose-template-btn">Select Template</button>
        </div>
      </div>
    </div>
  );
}
