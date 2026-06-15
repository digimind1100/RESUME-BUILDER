import React from "react";
import "./FeaturesHowTestimonials.css";

const FeaturesHowTestimonials = () => {
  return (
    <section id="features-how-testimonials" className="features-section">
      {/* ---------- Features Section ---------- */}
      <div className="section-container">
        <h2 className="section-title">Why Choose Our Resume Builder?</h2>
        <div className="card-grid">
          <div className="card">
            <img src="/icons/easy-edit.svg" alt="Easy Editing" className="card-icon" />
            <h3 className="card-heading">Easy to Edit</h3>
            <p className="card-text">
              Intuitive drag-and-drop interface to create your resume in minutes.
            </p>
          </div>
          <div className="card">
            <img src="/icons/ai-suggestions.svg" alt="AI Suggestions" className="card-icon" />
            <h3 className="card-heading">AI-Powered Suggestions</h3>
            <p className="card-text">
              Automatically generate skills and work experience based on your job title.
            </p>
          </div>
          <div className="card">
            <img src="/icons/export.svg" alt="Export" className="card-icon" />
            <h3 className="card-heading">Export Instantly</h3>
            <p className="card-text">
              Download your resume as PDF, or share it online easily.
            </p>
          </div>
        </div>
      </div>

      {/* ---------- How It Works Section ---------- */}
      <div className="section-container">
        <h2 className="section-title">How It Works</h2>
        <div className="card-grid">
          <div className="card step-card">
            <div className="step-number">1</div>
            <h3 className="card-heading">Choose Template</h3>
            <p className="card-text">Select from a variety of professional resume templates.</p>
          </div>
          <div className="card step-card">
            <div className="step-number">2</div>
            <h3 className="card-heading">Customize</h3>
            <p className="card-text">Edit your personal info, work experience, and skills easily.</p>
          </div>
          <div className="card step-card">
            <div className="step-number">3</div>
            <h3 className="card-heading">Download & Share</h3>
            <p className="card-text">Export your resume in multiple formats or share online directly.</p>
          </div>
        </div>
      </div>

    </section>
  );
};

export default FeaturesHowTestimonials;
