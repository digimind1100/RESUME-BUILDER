// FeaturesCoverLetter.jsx
import React from "react";
import "./FeaturesCoverLetter.css";
import { useAuth } from "../context/AuthContext";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FeaturesCoverLetter = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // ✅ Premium Logic (Same as CoverLetterPanel)
  const isPremium =
    user?.isPaid &&
    user?.accessUntil &&
    new Date(user.accessUntil) > new Date();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/cover-letter");
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
            className={`cover-letter-button ${
              !isPremium ? "locked-feature" : ""
            }`}
            onClick={handleClick}
          >
            {!isPremium && <FaLock style={{ marginRight: "8px" }} />}
            Try Cover Letter Generator
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesCoverLetter;
