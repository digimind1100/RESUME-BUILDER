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

 {/* 🌟 Top Header Block */}
      <div className="template-header">
        <h1 className="template-title">Choose Your Resume Template</h1>
        <h2 className="template-subtitle">
          Craft a stunning resume tailored to your style.
        </h2>
        <p className="template-description">
          Each resume template is professionally designed, ATS-friendly, and fully
          customizable. Whether you prefer a clean classic layout or a modern
          professional look, choose the format that reflects your personality — 
          and start building your resume with ease.
        </p>
      </div>






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
