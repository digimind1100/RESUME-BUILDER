import React from "react";
import "./Templates.css";
import { useNavigate } from "react-router-dom";

export default function Templates() {
  const navigate = useNavigate();
  const simpleTemplates = Array.from({ length: 10 }, (_, i) => i + 1);

  // Classic Template
  const handleUseClassic = () => navigate("/resume-classic");
  const handleUseProfessional = () => navigate("/resume-professional");


const templateNames = {
  1: "Modern Template",
  2: "Clean Professional",
  3: "Creative Bold",
  4: "Template 4 (Coming Soon)",
  5: "Template 5 (Coming Soon)",
  6: "Template 6 (Coming Soon)",
  7: "Template 7 (Coming Soon)",
  8: "Template 8 (Coming Soon)",
  9: "Template 9 (Coming Soon)",
  10: "Template 10 (Coming Soon)",
};




  // Simple Template Navigation (opens direct without popup)

const handleUseSimple = (num) => {
  if (num === 1) {
    navigate("/resume-modern");   // Template 1
  } else if (num === 2) {
    navigate("/clean-professional");  // Template 2
  } else if (num === 3) {
    navigate("/creative-bold");    // Template 3
  } else {
    alert("This template is not created yet.");
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

        {/* Professional (Clean Template) */}
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
        src={`/images/simple-${num}.png`}
        alt={`Simple Template ${num}`}
      />

      <button
        onClick={() => handleUseSimple(num)}
        className="choose-template-btn"
      >
        {templateNames[num]}
      </button>
    </div>
  ))}
</div>



    </section>
  );
}
