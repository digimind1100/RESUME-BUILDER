import React, { useState } from "react";
import "./Templates.css";
import { useNavigate } from "react-router-dom";
import NewTemplatesFormPanel from "./NewTemplatesFormPanel";

export default function Templates({ onSubmit }) {
  const navigate = useNavigate();
  const [activePopup, setActivePopup] = useState(null);
  const simpleTemplates = Array.from({ length: 10 }, (_, i) => i + 1);

  // Classic & Professional handlers
  const handleUseClassic = () => navigate("/resume-classic");
  const handleUseProfessional = () => navigate("/resume-professional");

  // Open popup for selected simple template
  const handleUseSimple = (num) => {
    setActivePopup(num);
  };

  // Close popup
  const closePopup = () => setActivePopup(null);

  // Handle form submission from popup


const handleFormSubmit = (data) => {
  setActivePopup(false);

  // If user selected Template 1 → Open NewTemplateModern
  if (activePopup === 1) {
    navigate("/resume-modern", { state: data });
  }

  // If user selected Template 2 → Open CleanProfessional
  else if (activePopup === 2) {
    navigate("/resume-clean", { state: data });
  }

  // You can add more templates later
  else {
    alert("This template does not have a page yet!");
  }
};





  return (
    <section className="templates-page">
      {/* =================== Premium Templates =================== */}
      <div className="templates-section">
        {/* Classic Template */}
        <div className="template-block classic-template">
          <video
            className="template-video"
            src="/demo/mockup.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="template-footer">
            <button onClick={handleUseClassic} className="btn">
              Use Classic
            </button>
          </div>
        </div>

        {/* Professional Template */}
        <div className="template-block professional-template">
          <video
            className="template-video"
            src="/demo/mockup.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="template-footer">
            <button onClick={handleUseProfessional} className="btn">
               Use Clean Professional
            </button>
          </div>
        </div>
      </div>

      {/* =================== Simple Templates =================== */}
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
              onClick={() => handleUseSimple(num)}
              className="choose-template-btn"
            >
              Use Template {num}
            </button>
          </div>
        ))}
      </div>

      {/* Render popup for the form */}
      {activePopup && (
        <NewTemplatesFormPanel
          closePopup={closePopup}
          templateNumber={activePopup}
          onSubmit={handleFormSubmit}
        />
      )}
    </section>
  );
}
