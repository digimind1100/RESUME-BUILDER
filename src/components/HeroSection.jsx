import React from "react";
import HeroMockup from "./HeroMockup";
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
  <HeroMockup width={420} />
</div>

      </div>
    </section>
  );
}
