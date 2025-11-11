import React from "react";
import "./Templates.css";

export default function Templates() {
  return (
    <section className="templates-section">
      {/* Template 1 - Classic */}
      <div className="template-block classic-template">
        <video
          className="template-video"
          src="public/demo/mockup.mp4"
          autoPlay
          loop
          muted
          playsInline
        ></video>
        <div className="template-footer classic-footer">
          <button className="template-btn classic-btn">Use Classic</button>
        </div>
      </div>

      {/* Template 2 - Professional (QR Code Version) */}
      <div className="template-block professional-template">
        <video
          className="template-video"
          src="public/demo/mockup.mp4"
          autoPlay
          loop
          muted
          playsInline
        ></video>
        <div className="template-footer professional-footer">
          <button className="template-btn professional-btn">
            Use Professional
          </button>
        </div>
      </div>
    </section>
  );
}
