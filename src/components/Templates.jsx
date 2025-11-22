import React from "react";
import "./Templates.css";
import { useNavigate } from "react-router-dom";

export default function Templates() {
  const navigate = useNavigate();

  const handleUseClassic = () => {
    navigate("/resume/classic"); // unified route
  };

  const handleUseProfessional = () => {
    navigate("/resume/professional"); // unified route
  };

  const handleUseSimple = (templateNumber) => {
    navigate(`/resume/simple-${templateNumber}`); // unified route
  };

  // Array of 10 simple templates
  const simpleTemplates = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <section className="templates-page">
      {/* 🌟 Top Header Block */}
      <div className="template-header">
        <h1 className="template-title">Choose Your Resume Template</h1>
        <h2 className="template-subtitle">
          Craft a stunning resume tailored to your style.
        </h2>
        <p className="template-description">
          Each resume template is professionally designed, ATS-friendly, and fully
          customizable. Choose a template that suits your style — premium or
          simple — and start building your resume quickly.
        </p>
      </div>

      {/* ==================== Premium Templates ==================== */}
      <div className="templates-section">
        {/* Template 1 - Classic */}
        <div className="template-block classic-template">
          <video
            className="template-video"
            src="/demo/mockup.mp4"
            autoPlay
            loop
            muted
            playsInline
          ></video>
          <div className="template-footer classic-footer">
            <button onClick={handleUseClassic} className="btn">
              Use Classic
            </button>
          </div>
        </div>

        {/* Template 2 - Professional */}
        <div className="template-block professional-template">
          <video
            className="template-video"
            src="/demo/mockup.mp4"
            autoPlay
            loop
            muted
            playsInline
          ></video>
          <div className="template-footer professional-footer">
            <button onClick={handleUseProfessional} className="btn">
              Use Professional
            </button>
          </div>
        </div>
      </div>

      {/* ==================== 10 Simple Templates ==================== */}
      <div className="template-header" style={{ marginTop: "60px" }}>
        <h2 className="template-subtitle">Quick & Simple Templates</h2>
        <p className="template-description">
          Fast to fill, perfect for a quick resume setup. Choose from these 10 simple designs.
        </p>
      </div>

      <div className="template-list">
        {simpleTemplates.map((num) => (
          <div key={num} className="template-card">
            <img
              src={`/templates/simple-${num}.png`}
              alt={`Simple Template ${num}`}
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
    </section>
  );
}
