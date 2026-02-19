// FeaturesCoverLetter.jsx
import React, { useState } from "react";
import "./FeaturesCoverLetter.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SignupModal from "./auth/SignupModal";

const FeaturesCoverLetter = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showSignup, setShowSignup] = useState(false);

  const handleClick = () => {
    if (!user) {
      setShowSignup(true); // open signup modal
      return;
    }

    // If already logged in → go directly
    navigate("/cover-letter");
  };

  const handleSignupSuccess = () => {
    setShowSignup(false);
    navigate("/cover-letter"); // instantly open cover letter
  };

  return (
    <section id="features-cover-letter" className="cover-letter-section">
      <div className="cover-letter-container">
        <h2 className="cover-letter-title">
          Create Your Cover Letter Effortlessly
        </h2>
        <p className="cover-letter-subtitle">
          Our AI-powered cover letter generator helps you craft personalized
          and professional cover letters in minutes.
        </p>

        {/* ---------- Feature Cards ---------- */}
        <div className="cover-letter-cards">
          <div className="cover-letter-card">
            <img
              src="/icons/ai-suggestions.svg"
              alt="AI Suggestions"
              className="cover-letter-icon"
            />
            <h3>AI-Powered Suggestions</h3>
            <p>
              Automatically generate tailored content based on your job title
              and experience.
            </p>
          </div>

          <div className="cover-letter-card">
            <img
              src="/icons/easy-edit.svg"
              alt="Easy Edit"
              className="cover-letter-icon"
            />
            <h3>Easy Editing</h3>
            <p>
              Modify any part of your cover letter with our intuitive editor in
              real time.
            </p>
          </div>

          <div className="cover-letter-card">
            <img
              src="/icons/export.svg"
              alt="Export"
              className="cover-letter-icon"
            />
            <h3>Instant Export</h3>
            <p>
              Download as PDF or DOCX, ready to attach with your resume or
              share online.
            </p>
          </div>
        </div>

        {/* ---------- CTA Button ---------- */}
        <div className="cover-letter-cta">
          <button
            className="cover-letter-button"
            onClick={handleClick}
          >
            Try Cover Letter Generator
          </button>
        </div>
      </div>

      {/* Signup Modal */}
      {showSignup && (
        <SignupModal
          isOpen={showSignup}
          onClose={() => setShowSignup(false)}
          onSuccess={handleSignupSuccess}
        />
      )}
    </section>
  );
};

export default FeaturesCoverLetter;
