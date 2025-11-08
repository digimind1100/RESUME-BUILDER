import React from "react";
import "./HeroSection.css";

export default function HeroSection() {
  return (
    <section className="hero-container">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Build a <span>Professional Resume</span> in Minutes
          </h1>
          <h3 className="hero-titleh3">
            <span>Bring Your CV on Top</span>
          </h3>
          <p className="hero-subtitle">
            Create a stunning, job-winning resume effortlessly with our AI-powered
            Resume Builder. Save time. Land interviews. Stand out.
          </p>
          <button className="hero-btn">Start Building</button>
        </div>

        <div className="hero-illustration">
          {/* ✅ Inline SVG (no external image needed) */}
          <svg
            viewBox="0 0 200 160"
            xmlns="http://www.w3.org/2000/svg"
            className="hero-svg"
          >
            <rect x="10" y="20" width="180" height="120" rx="10" fill="#f3f4f6" stroke="#d1d5db" />
            <rect x="30" y="40" width="80" height="8" fill="#60a5fa" rx="2" />
            <rect x="30" y="55" width="130" height="8" fill="#e5e7eb" rx="2" />
            <rect x="30" y="70" width="130" height="8" fill="#e5e7eb" rx="2" />
            <circle cx="50" cy="110" r="14" fill="#93c5fd" />
            <rect x="70" y="100" width="100" height="8" fill="#e5e7eb" rx="2" />
            <rect x="70" y="115" width="90" height="8" fill="#e5e7eb" rx="2" />
          </svg>
        </div>
      </div>
    </section>
  );
}
