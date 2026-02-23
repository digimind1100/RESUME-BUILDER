// src/components/Footer.jsx
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* ---- Brand Section ---- */}
        <div className="footer-section brand">
          <h2 className="footer-logo">ResumeBuilder</h2>
          <p className="footer-about">
            Build stunning, professional resumes and cover letters in minutes using our AI-powered tools.
          </p>
        </div>

        {/* ---- Quick Links ---- */}
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/resume-builder">Resume Builder</a></li>
            <li><a href="/cover-letter">Cover Letter</a></li>
            <li><a href="/pricing">Features</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* ---- Resources ---- */}
        <div className="footer-section">
          <h3 className="footer-title">Resources</h3>
          <ul>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/templates">Templates</a></li>
            <li><a href="/support">Support</a></li>
          </ul>
        </div>

        {/* ---- Social + Contact ---- */}
        <div className="footer-section">
          <h3 className="footer-title">Connect</h3>
          <div className="footer-social">
            
            <a
  href="https://facebook.com/ResumeBuilderPK"
  target="_blank"
  rel="noopener noreferrer"
  className="footer-social-link"
  aria-label="ResumeBuilder Facebook Page"
>
  <i className="fab fa-facebook-f"></i>
</a>
            
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a
  href="https://www.linkedin.com/in/haider-zaidi-4118293b2/"
  target="_blank"
  rel="noopener noreferrer"
  className="footer-social-link"
  aria-label="Founder LinkedIn Profile"
>
  <i className="fab fa-linkedin"></i>
</a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
          <p className="footer-contact">
            <a href="mailto:support@resumebuilder.com">support@resumebuilder.com</a>
          </p>
        </div>
      </div>

      {/* ---- Bottom Bar ---- */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} ResumeBuilder. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
