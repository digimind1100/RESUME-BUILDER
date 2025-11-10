// FeaturesCoverLetter.jsx
import React from "react";
import "./FeaturesCoverLetter.css"; // external CSS file

const FeaturesCoverLetter = () => {
  return (
    <section id="features-cover-letter" className="cover-letter-section">
      {/* ---------- Section Header ---------- */}
      <div className="cover-letter-container">
        <h2 className="cover-letter-title">Create Your Cover Letter Effortlessly</h2>
        <p className="cover-letter-subtitle">
          Our AI-powered cover letter generator helps you craft personalized and professional cover letters in minutes.
        </p>

        {/* ---------- Cards / Features ---------- */}
        <div className="cover-letter-cards">
          <div className="cover-letter-card">
            <img src="/icons/ai-suggestions.svg" alt="AI Suggestions" className="cover-letter-icon" />
            <h3>AI-Powered Suggestions</h3>
            <p>Automatically generate tailored content based on your job title and experience.</p>
          </div>

          <div className="cover-letter-card">
            <img src="/icons/edit.svg" alt="Easy Edit" className="cover-letter-icon" />
            <h3>Easy Editing</h3>
            <p>Modify any part of your cover letter with our intuitive editor in real time.</p>
          </div>

          <div className="cover-letter-card">
            <img src="/icons/export.svg" alt="Export" className="cover-letter-icon" />
            <h3>Instant Export</h3>
            <p>Download as PDF or DOCX, ready to attach with your resume or share online.</p>
          </div>
        </div>

        {/* ---------- CTA Button ---------- */}
        <div className="cover-letter-cta">
          <a href="/cover-letter" className="cover-letter-button">
            Try Cover Letter Generator
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturesCoverLetter;
