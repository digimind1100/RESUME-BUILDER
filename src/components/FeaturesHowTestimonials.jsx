import React from "react";
import "./FeaturesHowTestimonials.css"; // external CSS

const FeaturesHowTestimonials = () => {
  return (
    <section id="features-how-testimonials" className="features-section">

      {/* ---------- Features Section ---------- */}
      <div className="container text-center mb-16">
        <h2 className="section-title">Why Choose Our Resume Builder?</h2>
        <div className="grid-3">
          <div className="card">
            <img src="/icons/easy-edit.svg" alt="Easy Editing" className="card-img"/>
            <h3 className="card-title">Easy to Edit</h3>
            <p className="card-text">Intuitive drag-and-drop interface to create your resume in minutes.</p>
          </div>
          <div className="card">
            <img src="/icons/ai-suggestions.svg" alt="AI Suggestions" className="card-img"/>
            <h3 className="card-title">AI-Powered Suggestions</h3>
            <p className="card-text">Automatically generate skills and work experience based on your job title.</p>
          </div>
          <div className="card">
            <img src="/icons/export.svg" alt="Export" className="card-img"/>
            <h3 className="card-title">Export Instantly</h3>
            <p className="card-text">Download your resume as PDF, DOCX, or share it online easily.</p>
          </div>
        </div>
      </div>

      {/* ---------- How It Works Section ---------- */}
      <div className="container text-center mb-16">
        <h2 className="section-title">How It Works</h2>
        <div className="grid-3 gap-10">
          <div className="card">
            <div className="step-number">1</div>
            <h3 className="card-title">Choose Template</h3>
            <p className="card-text">Select from a variety of professional resume templates.</p>
          </div>
          <div className="card">
            <div className="step-number">2</div>
            <h3 className="card-title">Customize</h3>
            <p className="card-text">Edit your personal info, work experience, and skills easily.</p>
          </div>
          <div className="card">
            <div className="step-number">3</div>
            <h3 className="card-title">Download & Share</h3>
            <p className="card-text">Export your resume in multiple formats or share online directly.</p>
          </div>
        </div>
      </div>

      {/* ---------- Testimonials Section ---------- */}
      <div className="container text-center">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="grid-3">
          <div className="card testimonial">
            <p className="testimonial-text">"This resume builder made applying for jobs so easy. I created a professional resume in minutes!"</p>
            <h4 className="testimonial-author">- Sarah M.</h4>
          </div>
          <div className="card testimonial">
            <p className="testimonial-text">"The AI skill suggestions were spot on! My resume got noticed by recruiters faster."</p>
            <h4 className="testimonial-author">- John D.</h4>
          </div>
          <div className="card testimonial">
            <p className="testimonial-text">"I love how easy it is to export and share my resume. Truly professional results."</p>
            <h4 className="testimonial-author">- Priya K.</h4>
          </div>
        </div>
      </div>

    </section>
  );
};

export default FeaturesHowTestimonials;
