import React from "react";
import "./AiTutorialVideo.css";

export default function TutorialVideo() {
  return (
    <section className="tutorial-section">
      <div className="container tutorial-inner">
        {/* HEADER */}
        <header className="tutorial-header">
          <p className="tutorial-eyebrow">Video Tutorial</p>
          <h2 className="tutorial-title">How to use our AI Template</h2>
          <p className="tutorial-subtitle">
            Watch this short walkthrough to see how quickly you can select a
            template, add your details, and export a job-ready resume using our
            AI.
          </p>
        </header>

        {/* VIDEO CARD */}
        <div className="tutorial-video-wrapper">
          <div className="tutorial-video-card">
            <div className="tutorial-pill-row">
              <span className="tutorial-pill">Step-by-step guide</span>
              <span className="tutorial-pill secondary">Under 3 minutes</span>
            </div>

            <div className="tutorial-video-aspect">
              {/* TODO: apna real video path lagao */}
              <video
                className="tutorial-video"
                src="/videos/tutorial.mp4"
                controls
                poster="/images/tutorial-poster.png" // optional preview image
              />
            </div>

            <div className="tutorial-meta">
              <div className="tutorial-meta-dot" />
              <span className="tutorial-meta-text">
                Tip: You can pause and follow along inside the builder.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
