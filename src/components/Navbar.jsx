import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => setMenuOpen(false); // close menu on link click

  return (
    <nav className="navbar fixed-nav">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/" className="logo-text">
          DigiMind
        </Link>
      </div>

      {/* Hamburger */}
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Links */}
      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <li>
          <Link
            to="/"
            className={location.pathname === "/" ? "active" : ""}
            onClick={handleLinkClick}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/templates"
            className={location.pathname === "/templates" ? "active" : ""}
            onClick={handleLinkClick}
          >
            Templates
          </Link>
        </li>
        <li>
          <Link
            to="/features"
            className={location.pathname === "/features" ? "active" : ""}
            onClick={handleLinkClick}
          >
            Features
          </Link>
        </li>
        <li>
          <Link
            to="/coverletter"
            className={location.pathname === "/coverletter" ? "active" : ""}
            onClick={handleLinkClick}
          >
            Cover Letter
          </Link>
        </li>
        <li>
          <Link
            to="/pricing"
            className={location.pathname === "/pricing" ? "active" : ""}
            onClick={handleLinkClick}
          >
            Pricing
          </Link>
        </li>
        <li>
          <Link
            to="/faq"
            className={location.pathname === "/faq" ? "active" : ""}
            onClick={handleLinkClick}
          >
            FAQ
          </Link>
        </li>

        {/* Mobile Resume Button */}
        <li className="mobile-resume-btn">
          <Link to="/resume" className="resume-btn" onClick={handleLinkClick}>
            Start Builder
          </Link>
        </li>

        
      </ul>
    </nav>
  );
}
