import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section footer-brand">
          <h2 className="footer-logo">ResumeBuilder.pk</h2>
          <p className="footer-about">
            Build clean, professional resumes and cover letters with templates designed for modern
            job applications.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Product</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/templates">Templates</Link></li>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/coverletter">Cover Letter</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Resources</h3>
          <ul>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/blog/ats-resume-guide">ATS Resume Guide</Link></li>
            <li><Link to="/blog/resume-checklist-before-applying">Resume Checklist</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Contact</h3>
          <p className="footer-contact">
            <a href="mailto:support@resumebuilder.pk">support@resumebuilder.pk</a>
          </p>
          <div className="footer-social">
            <a
              href="https://facebook.com/ResumeBuilderPK"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ResumeBuilder Facebook Page"
            >
              Facebook
            </a>
            <a
              href="https://www.linkedin.com/in/haider-zaidi-4118293b2/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Founder LinkedIn Profile"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright {new Date().getFullYear()} ResumeBuilder.pk. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
