import React from "react";
import "./Templates.css";
import { useNavigate } from "react-router-dom";

export default function Templates() {
  const navigate = useNavigate();
  const simpleTemplates = Array.from({ length: 10 }, (_, i) => i + 1);

  // Classic Template
  const handleUseClassic = () => navigate("/resume-classic");
  const handleUseProfessional = () => navigate("/resume-professional");


  // Simple Template Navigation (opens direct without popup)
  
  const handleUseSimple = (num) => {
  navigate(`/simple-template-${num}`);
};

const handleUseCleanProfessional = () => {
  navigate("/clean-professional");
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
        src={`/templates/simple-${num}.png`}
        alt={`Simple Template ${num}`}
      />
      <button
        onClick={() => handleUseSimple(num)}
        className="choose-template-btn"
      >
        Use Template {num}
      </button>
      <button onClick={handleUseCleanProfessional} className="btn">
   Use Clean Professional
</button>


    </div>
  ))}
</div>


    </section>
  );
}
