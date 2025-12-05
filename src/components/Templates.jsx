import React from "react";
import "./Templates.css";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const SIMPLE_TEMPLATES = Array.from({ length: 11 }, (_, i) => i + 1);

const TEMPLATE_META = {
  1: {
    name: "Modern Template",
    shortLabel: "Modern",
    category: "All Roles",
    tagline: "Crisp layout with bold headings for modern applications.",
  },
  2: {
    name: "Clean Professional",
    shortLabel: "Clean Professional",
    category: "Corporate",
    tagline: "Structured and formal — ideal for corporate roles.",
  },
  3: {
    name: "Creative Bold",
    shortLabel: "Creative Bold",
    category: "Creative",
    tagline: "Strong typography that helps your profile stand out.",
  },
  4: {
    name: "Minimal Accent",
    shortLabel: "Minimal Accent",
    category: "Minimal",
    tagline: "Plenty of white space with soft accent highlights.",
  },
  5: {
    name: "Elegant Classic",
    shortLabel: "Elegant Classic",
    category: "Timeless",
    tagline: "Traditional structure with a refined visual touch.",
  },
  6: {
    name: "Medical Elites",
    shortLabel: "Medical Elites",
    category: "Healthcare",
    tagline: "Designed for doctors, nurses, and clinical roles.",
  },
  7: {
    name: "Engineer Elites",
    shortLabel: "Engineer Elites",
    category: "Engineering",
    tagline: "Showcase complex technical projects clearly.",
  },
  8: {
    name: "Soft-Tech",
    shortLabel: "Soft-Tech",
    category: "Tech & IT",
    tagline: "Clean, tech-focused layout for software roles.",
  },
  9: {
    name: "Data Analyst",
    shortLabel: "Data Analyst",
    category: "Data",
    tagline: "Highlight skills, tools, and metrics for analytics roles.",
  },
  10: {
    name: "Engineer Prime",
    shortLabel: "Engineer Prime",
    category: "Engineering",
    tagline: "Impactful layout for senior technical positions.",
  },
  11: {
    name: "Aviation Pro",
    shortLabel: "Aviation Pro",
    category: "Aviation",
    tagline: "Tailored for pilots, cabin crew, and aviation professionals.",
  },
};

export default function Templates() {
  const navigate = useNavigate();

  // Premium template navigation
  const handleUseClassic = () => navigate("/resume-classic");
  const handleUseProfessional = () => navigate("/resume-professional");

  // Simple template navigation
  const handleUseSimple = (num) => {
    if (num === 1) {
      navigate("/resume-modern");
    } else if (num === 2) {
      navigate("/clean-professional");
    } else if (num === 3) {
      navigate("/creative-bold");
    } else if (num === 4) {
      navigate("/minimal-accent");
    } else if (num === 5) {
      navigate("/elegant-classic");
    } else if (num === 6) {
      navigate("/medical-elites");
    } else if (num === 7) {
      navigate("/engineer-elites");
    } else if (num === 8) {
      navigate("/soft-tech");
    } else if (num === 9) {
      navigate("/data-elite");
    } else if (num === 10) {
      navigate("/engineer-prime");
    } else if (num === 11) {
      navigate("/aviation-pro");
    } else {
      alert("This template is not created yet.");
    }
  };

  return (
    <>
    <section className="templates-page">
      {/* =================== HERO HEADER =================== */}
      <header className="templates-hero">
        <span className="hero-eyebrow">Template Gallery</span>
        <h1 className="hero-title">Choose a resume style that fits your story</h1>
        <p className="hero-subtitle">
          Pick from premium interactive layouts or quick, job‑ready simple templates,
          all designed to be clean, readable, and ATS‑friendly.
        </p>

        <div className="hero-metrics">
          <div className="metric-item">
            <span className="metric-number">2</span>
            <span className="metric-label">Premium layouts</span>
          </div>
          <div className="metric-item">
            <span className="metric-number">11</span>
            <span className="metric-label">Quick templates</span>
          </div>
          <div className="metric-item">
            <span className="metric-number">ATS</span>
            <span className="metric-label">Friendly designs</span>
          </div>
        </div>
      </header>

      {/* =================== PREMIUM TEMPLATES =================== */}
      <section className="templates-section templates-section--premium">
        <div className="section-heading">
          <div>
            <h2 className="section-title">Premium interactive templates</h2>
            <p className="section-subtitle">
              High‑impact resume layouts with strong visual hierarchy. Ideal when
              you want a polished, modern look that still stays professional.
            </p>
          </div>
          <p className="section-note">
            💡 Perfect for experienced candidates, portfolio resumes, and standout profiles.
          </p>
        </div>

        <div className="premium-grid">
          {/* Classic Template */}
          <article className="template-block classic-template">
            <div className="template-chip-row">
              <span className="template-chip">Most Popular</span>
              <span className="template-label">Classic</span>
            </div>

            <video
              className="template-video"
              src="/demo/mockup.mp4"
              autoPlay
              loop
              muted
              playsInline
            />

            <div className="template-footer">
              <div className="template-footer-text">
                <h3 className="template-name">Classic Resume</h3>
                <p className="template-tagline">
                  Timeless layout with clean sections and easy scanability.
                </p>
              </div>
              <button
                onClick={handleUseClassic}
                className="template-btn template-btn--primary"
              >
                Use Classic
              </button>
            </div>
          </article>

          {/* Professional / Clean Template */}
          <article className="template-block professional-template">
            <div className="template-chip-row">
              <span className="template-chip">New</span>
              <span className="template-label">Clean Professional</span>
            </div>

            <video
              className="template-video"
              src="/demo/mockup.mp4"
              autoPlay
              loop
              muted
              playsInline
            />

            <div className="template-footer">
              <div className="template-footer-text">
                <h3 className="template-name">Clean Professional</h3>
                <p className="template-tagline">
                  Subtle accents with a structured, corporate‑friendly layout.
                </p>
              </div>
              <button
                onClick={handleUseProfessional}
                className="template-btn template-btn--primary"
              >
                Use Clean Professional
              </button>
            </div>
          </article>
        </div>
      </section>

      {/* =================== SIMPLE TEMPLATES =================== */}
      <section className="templates-section templates-section--simple">
        <div className="section-heading section-heading--center">
          <h2 className="section-title">Quick & simple templates</h2>
          <p className="section-subtitle">
            Fast to fill and easy to customize. Choose from focused designs suited
            for different industries and experience levels.
          </p>
        </div>

        <div className="template-list">
          {SIMPLE_TEMPLATES.map((num) => {
            const meta = TEMPLATE_META[num];
            return (
              <article key={num} className="template-card">
                <div className="template-card-header">
                  <span className="template-chip">
                    Template {String(num).padStart(2, "0")}
                  </span>
                  {meta?.category && (
                    <span className="template-pill">{meta.category}</span>
                  )}
                </div>

                <img
                  src={`/images/simple-${num}.png`}
                  alt={meta?.name || `Simple Template ${num}`}
                  className="template-thumbnail"
                />

                <div className="template-card-body">
                  <h3 className="template-card-title">{meta?.name}</h3>
                  {meta?.tagline && (
                    <p className="template-card-subtitle">{meta.tagline}</p>
                  )}

                  <button
                    onClick={() => handleUseSimple(num)}
                    className="template-btn template-btn--outline"
                  >
                    Use {meta?.shortLabel || meta?.name}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
   
    </section>
    <div style={{ width: "100%" }}>
        <Footer />
      </div>
      </>
  );
}
