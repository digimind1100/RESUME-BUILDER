import React from "react";
import "./Templates.css";
import { useNavigate } from "react-router-dom";

export default function Templates() {
  const navigate = useNavigate(); // ✅ must be inside the component

  const handleUseClassic = () => {
    navigate("/resume-classic");
  };

  const handleUseProfessional = () => {
    navigate("/resume-professional");
  };

  return (
    <section className="templates-section">
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
          <button onClick={handleUseClassic} className="btn">Use Classic</button>
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
          <button onClick={handleUseProfessional} className="btn">Use Professional</button>
        </div>
      </div>
    </section>
  );
}
