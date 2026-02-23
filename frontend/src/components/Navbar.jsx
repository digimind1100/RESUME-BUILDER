import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import SignupModal from "./auth/SignupModal";
import { useAuth } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const { user, isAuthenticated, logout, initializing } = useAuth();

  console.log("NAVBAR USER:", user);

  /* ⏳ Avoid render while auth is initializing */
  if (initializing) return null;

  /* ✅ SAFE INITIALS */
  function safeInitials(name) {
    if (!name || typeof name !== "string") return "?";

    const words = name.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return "?";

    return words
      .slice(0, 2)
      .map(word => word[0].toUpperCase())
      .join("");
  }

  const avatarLetter = safeInitials(
    user?.fullName || user?.email || ""
  );

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <nav className="navbar fixed-nav">
        {/* LOGO */}
        <div className="navbar-logo">
  <Link to="/" className="logo-link">
    <img
      src="/logo.png"
      alt="ResumeBuilder.pk Logo"
      className="navbar-logo-img"
    />
  </Link>
</div>

        {/* NAV LINKS */}
        <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
          <li><Link to="/templates" onClick={handleLinkClick}>Templates</Link></li>
          <li><Link to="/features" onClick={handleLinkClick}>Features</Link></li>
          <li><Link to="/coverletter" onClick={handleLinkClick}>Cover Letter</Link></li>
          <li><Link to="/policies" onClick={handleLinkClick}>Policies</Link></li>
          <li><Link to="/blog" onClick={handleLinkClick}>Blog</Link></li>
          <li><Link to="/contact" onClick={handleLinkClick}>Contact</Link></li>


          {/* MOBILE AUTH */}
          <li className="mobile-auth">
            {!isAuthenticated ? (
              <button
                className="mobile-signin-btn"
                onClick={() => {
                  setShowSignup(true);
                  setMenuOpen(false);
                }}
              >
                Sign In
              </button>
            ) : (
              <>
                <div
                  className="mobile-avatar"
                  style={{
                    background: "#111",
                    color: "#fff",
                    fontWeight: "700",
                  }}
                >
                  {avatarLetter}
                </div>
                <button
                  className="mobile-logout-btn"
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                >
                  <FiLogOut size={16} />
                  Logout
                </button>
              </>
            )}
          </li>
        </ul>

        {/* HAMBURGER */}
        <div className="hamburger" onClick={() => setMenuOpen(p => !p)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* RIGHT AVATAR */}
        {!menuOpen && (
          <div className="avatar-wrapper">
            <div
              className={`avatar-circle ${!isAuthenticated ? "guest" : ""}`}
              style={{
                backgroundColor: "#111",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "14px",
              }}
              onClick={() => {
                if (!isAuthenticated) setShowSignup(true);
                else setShowMenu(p => !p);
              }}
            >
              {isAuthenticated ? avatarLetter : <span className="live-ring" />}
            </div>

            {isAuthenticated && showMenu && (
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
