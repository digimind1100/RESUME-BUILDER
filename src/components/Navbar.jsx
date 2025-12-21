import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import SignupModal from "./auth/SignupModal";
import { useAuth } from "../context/AuthContext";
import { getInitials } from "../utils/getInitials";

export default function Navbar() {
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);
const { user, isAuthenticated, logout } = useAuth();

console.log("FULL NAME:", user?.fullName);
console.log("INITIALS:", getInitials(user?.fullName));


  const [menuOpen, setMenuOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLinkClick = () => setMenuOpen(false);

  console.log("showSignup:", showSignup);


  return (
    <>
      <nav className="navbar fixed-nav">
        {/* LOGO */}
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/" className="logo-text">
          DigiMind
        </Link>
      </div>


        {/* NAV LINKS */}
        <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""} onClick={handleLinkClick}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/templates" className={location.pathname === "/templates" ? "active" : ""} onClick={handleLinkClick}>
              Templates
            </Link>
          </li>
          <li>
            <Link to="/features" className={location.pathname === "/features" ? "active" : ""} onClick={handleLinkClick}>
              Features
            </Link>
          </li>
          <li>
            <Link to="/coverletter" className={location.pathname === "/coverletter" ? "active" : ""} onClick={handleLinkClick}>
              Cover Letter
            </Link>
          </li>
          <li>
            <Link to="/pricing" className={location.pathname === "/pricing" ? "active" : ""} onClick={handleLinkClick}>
              Pricing
            </Link>
          </li>
          <li>
            <Link to="/faq" className={location.pathname === "/faq" ? "active" : ""} onClick={handleLinkClick}>
              FAQ
            </Link>
          </li>
        </ul>
{/* RIGHT SIDE */}
{isAuthenticated && user?.fullName && (

  <div className="avatar-wrapper">
    <div
      className="avatar-circle"
      onClick={() => setShowMenu((prev) => !prev)}
    >
      {getInitials(user.fullName)}
    </div>

    {showMenu && (
      <div className="avatar-dropdown">
        <button
          className="avatar-logout-btn"
          onClick={() => {
            logout();
            setShowMenu(false);
          }}
        >
          Sign Out
        </button>
      </div>
    )}
  </div>
)}

      
      </nav>

      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </>
  );
}