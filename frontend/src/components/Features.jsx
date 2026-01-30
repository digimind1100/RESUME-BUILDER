// src/pages/Features.jsx
import React from "react";
import "./Features.css";
import Footer from "./Footer";

export default function Features() {
    return (
        <div className="features-page">

            {/* HERO */}
            <section className="features-hero">
                <h1>Powerful Features to Build a Job-Winning Resume</h1>
                <p>
                    resumebuilder.pk helps you create professional, ATS-friendly resumes
                    with AI assistance, modern templates, and instant PDF export.
                </p>
                <div className="features-hero-actions">
                    <a href="/builder" className="btn-primary">Create Resume Free</a>
                    <a href="/templates" className="btn-outline">View Templates</a>
                </div>
            </section>

            {/* FEATURES GRID */}
            <section className="features-section">
                <h2 className="section-title">Everything You Need</h2>

                <div className="features-grid">
                    <Feature
                        title="AI-Powered Content"
                        desc="Get smart skill and work-experience suggestions based on your job title."
                    />
                    <Feature
                        title="Live Resume Preview"
                        desc="See changes instantly while editing — no refresh required."
                    />
                    <Feature
                        title="Professional Templates"
                        desc="Clean, modern, ATS-friendly resume templates trusted by recruiters."
                    />
                    <Feature
                        title="PDF Export"
                        desc="Download high-quality, print-ready PDF with page numbers."
                    />
                    <Feature
                        title="QR Resume Support"
                        desc="Generate QR-based resumes for quick profile sharing."
                    />
                    <Feature
                        title="Privacy First"
                        desc="Your data stays private. No sharing, no selling."
                    />
                </div>
            </section>

            {/* AI HIGHLIGHT */}
            <section className="features-highlight">
                <h2>Smart AI That Understands Your Career</h2>
                <p>
                    Our AI analyzes your job title and helps you write professional,
                    relevant resume content in seconds — saving hours of manual work.
                </p>
                <ul>
                    <li>Job-specific skills</li>
                    <li>AI-generated work experience</li>
                    <li>ATS-optimized wording</li>
                    <li>Perfect for freshers & professionals</li>
                </ul>
            </section>

            {/* CTA */}
            <section className="features-cta">
                <h2>Start Building Your Resume Today</h2>
                <p>Create a professional resume in minutes — no design skills required.</p>
                <a href="/builder" className="btn-primary">Get Started Free</a>
            </section>



        </div>
    );
}

function Feature({ title, desc }) {
    return (
        <div className="feature-card">
            <h3>{title}</h3>
            <p>{desc}</p>
        </div>
    );
}
<div style={{ width: "100%" }}>
    <Footer />
</div>