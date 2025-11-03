import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/" className="logo-text">
          DigiMind
        </Link>
      </div>

      {/* Nav Links */}
      <ul className="navbar-links">
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/features" className={location.pathname === "/features" ? "active" : ""}>
            Features
          </Link>
        </li>
        <li>
          <Link to="/pricing" className={location.pathname === "/pricing" ? "active" : ""}>
            Pricing
          </Link>
        </li>
        <li>
          <Link to="/faq" className={location.pathname === "/faq" ? "active" : ""}>
            FAQ
          </Link>
        </li>
      </ul>

      {/* Resume Builder Button */}
      <div className="navbar-btn">
        <Link to="/resume" className="resume-btn">
          Start Builder
        </Link>
      </div>
    </nav>
  );
}
