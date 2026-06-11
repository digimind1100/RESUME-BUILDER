import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Footer from "./Footer";

const benefits = [
  {
    title: "Built for Pakistan's job market",
    text: "Clear sections, practical formats, and resume guidance made for real local hiring workflows."
  },
  {
    title: "Professional without the clutter",
    text: "Premium layouts keep your achievements readable for recruiters and applicant tracking systems."
  },
  {
    title: "Edit from any device",
    text: "Start on mobile, refine on laptop, and keep your resume ready whenever an opportunity appears."
  },
  {
    title: "Download-ready output",
    text: "Create a polished PDF resume quickly without fighting document margins or formatting."
  }
];

const steps = [
  "Choose Template",
  "Edit Resume",
  "Download PDF"
];

const features = [
  "ATS Friendly",
  "Mobile Editing",
  "PDF Download",
  "Professional Templates"
];

const templatePreviews = [
  { id: 2, name: "Clean Professional", image: "/images/simple-2.png" },
  { id: 4, name: "Minimal Accent", image: "/images/simple-4.png" },
  { id: 8, name: "Soft-Tech", image: "/images/simple-8.png" }
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "ResumeBuilder.pk",
            url: "https://resumebuilder.pk",
            logo: "https://resumebuilder.pk/logo.png",
            founder: {
              "@type": "Person",
              name: "Haider Zaidi"
            },
            sameAs: [
              "https://www.linkedin.com/in/haider-zaidi-4118293b2/",
              "https://facebook.com/ResumeBuilderPK"
            ]
          })
        }}
      />

      <main className="home-page">
        <section className="home-hero">
          <div className="home-shell home-hero-grid">
            <div className="home-hero-copy reveal-up">
              <p className="home-eyebrow">ResumeBuilder.pk</p>
              <h1>Create a job-ready resume in minutes.</h1>
              <p className="home-hero-text">
                A modern resume builder for professionals, students, and fresh graduates who want a
                clean PDF resume without layout stress.
              </p>
              <div className="home-actions">
                <Link to="/templates" className="home-btn home-btn-primary">
                  Choose a Template
                </Link>
                <Link to="/blog" className="home-btn home-btn-secondary">
                  Read Resume Guides
                </Link>
              </div>
              <div className="home-trust-row" aria-label="Resume builder highlights">
                <span>ATS-friendly</span>
                <span>Mobile-ready</span>
                <span>Fast PDF export</span>
              </div>
            </div>

            <div className="home-preview-wrap reveal-up reveal-delay">
              <div className="home-preview-card" aria-label="Resume preview mockup">
                <div className="home-preview-toolbar">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="home-resume-mock">
                  <div className="mock-sidebar">
                    <div className="mock-avatar" />
                    <div className="mock-pill" />
                    <div className="mock-pill short" />
                    <div className="mock-list">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                  <div className="mock-content">
                    <div className="mock-title" />
                    <div className="mock-subtitle" />
                    <div className="mock-section">
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="mock-section compact">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              </div>
              <div className="home-floating-note">
                <strong>Ready to send</strong>
                <span>Clean layout, clear sections, polished PDF.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="home-section">
          <div className="home-shell">
            <div className="home-section-heading reveal-up">
              <p className="home-eyebrow">Why ResumeBuilder.pk</p>
              <h2>Designed for confident applications.</h2>
            </div>
            <div className="home-benefit-grid">
              {benefits.map((benefit) => (
                <article className="home-card reveal-up" key={benefit.title}>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section home-section-soft">
          <div className="home-shell">
            <div className="home-section-heading reveal-up">
              <p className="home-eyebrow">How it works</p>
              <h2>Three simple steps from blank page to PDF.</h2>
            </div>
            <div className="home-steps">
              {steps.map((step, index) => (
                <article className="home-step reveal-up" key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step}</h3>
                  <p>
                    {index === 0 &&
                      "Pick a clean resume template that matches your role and career level."}
                    {index === 1 &&
                      "Add your details, skills, education, and experience in an easy guided flow."}
                    {index === 2 &&
                      "Export a professional PDF resume and apply with more confidence."}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section">
          <div className="home-shell">
            <div className="home-section-heading reveal-up">
              <p className="home-eyebrow">Templates</p>
              <h2>Preview polished resume styles.</h2>
            </div>
            <div className="home-template-grid">
              {templatePreviews.map((template) => (
                <Link
                  to="/templates"
                  className="home-template-card reveal-up"
                  key={template.id}
                >
                  <img src={template.image} alt={`${template.name} resume template`} />
                  <span>{template.name}</span>
                </Link>
              ))}
            </div>
            <div className="home-centered-action">
              <Link to="/templates" className="home-btn home-btn-secondary">
                View All Templates
              </Link>
            </div>
          </div>
        </section>

        <section className="home-section home-section-soft">
          <div className="home-shell">
            <div className="home-feature-band reveal-up">
              <div>
                <p className="home-eyebrow">Features</p>
                <h2>Everything needed for a clean resume workflow.</h2>
              </div>
              <div className="home-feature-list">
                {features.map((feature) => (
                  <span key={feature}>{feature}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="home-final-cta">
          <div className="home-shell reveal-up">
            <h2>Build a resume that looks ready before you send it.</h2>
            <p>
              Choose a template, add your details, and download a professional PDF resume today.
            </p>
            <Link to="/templates" className="home-btn home-btn-primary">
              Start Building
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
