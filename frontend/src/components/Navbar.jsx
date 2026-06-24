import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import SignupModal from "./auth/SignupModal";
import { useAuth } from "../context/AuthContext";
import {
  FiAward,
  FiChevronDown,
  FiClock,
  FiCpu,
  FiDollarSign,
  FiDownload,
  FiEdit3,
  FiHelpCircle,
  FiImage,
  FiLayers,
  FiLogOut,
  FiMessageCircle,
  FiSearch,
  FiTarget,
  FiUserCheck,
  FiUserPlus,
} from "react-icons/fi";

export default function Navbar() {
  const location = useLocation();
  const isCvMakerFlow = location.pathname === "/cv-maker" || location.pathname.startsWith("/cv-maker/");
  const isAiResumeBuilderFlow =
    location.pathname === "/ai-resume-builder" ||
    location.pathname.startsWith("/ai-resume-builder/");
  const isResumeBuilderFlow =
    location.pathname === "/resume-builder" ||
    location.pathname.startsWith("/resume-builder/");
  const isCoverLetterBuilderFlow =
    location.pathname === "/cover-letter-builder" ||
    location.pathname.startsWith("/cover-letter-builder/");
  const flowBasePath = isCoverLetterBuilderFlow
    ? "/cover-letter-builder"
    : isResumeBuilderFlow
    ? "/resume-builder"
    : isAiResumeBuilderFlow
    ? "/ai-resume-builder"
    : isCvMakerFlow
    ? "/cv-maker"
    : "";
  const homePath = flowBasePath || "/";
  const templatesPath = `${flowBasePath}/templates`;
  const featuresPath = `${flowBasePath}/features`;
  const coverLetterPath = `${flowBasePath}/coverletter`;
  const policiesPath = `${flowBasePath}/policies`;
  const blogPath = `${flowBasePath}/blog`;
  const contactPath = `${flowBasePath}/contact`;

  const [showMenu, setShowMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [resumeMegaMenuOpen, setResumeMegaMenuOpen] = useState(false);
  const [templatesMegaMenuOpen, setTemplatesMegaMenuOpen] = useState(false);
  const [templatesMegaMenuSuppressed, setTemplatesMegaMenuSuppressed] = useState(false);
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

  const handleLinkClick = () => {
    setMenuOpen(false);
    setResumeMegaMenuOpen(false);
    setTemplatesMegaMenuOpen(false);
    setTemplatesMegaMenuSuppressed(true);
    window.setTimeout(() => setTemplatesMegaMenuSuppressed(false), 450);
  };

  const handleHomeClick = () => {
    setMenuOpen(false);
    setResumeMegaMenuOpen(false);
    setTemplatesMegaMenuOpen(false);

    if (
      isCvMakerFlow ||
      isAiResumeBuilderFlow ||
      isResumeBuilderFlow ||
      isCoverLetterBuilderFlow
    ) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSectionScroll = (sectionId) => {
    setMenuOpen(false);
    setResumeMegaMenuOpen(false);
    setTemplatesMegaMenuOpen(false);

    let attempts = 0;

    const scrollToSection = () => {
      const target = document.getElementById(sectionId);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        return;
      }

      attempts += 1;

      if (attempts < 40) {
        window.setTimeout(scrollToSection, 100);
      }
    };

    scrollToSection();
  };

  return (
    <>
      <nav className="navbar fixed-nav">
        {/* LOGO */}
        <div className="navbar-logo">
  <Link to={homePath} className="logo-link" onClick={handleHomeClick}>
    <img
      src="/logo.png"
      alt="ResumeBuilder.pk Logo"
      className="navbar-logo-img"
    />
  </Link>
</div>

        {/* NAV LINKS */}
        <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <li className={`mega-menu-parent ${resumeMegaMenuOpen ? "mega-menu-open" : ""}`}>
            <div className="mega-menu-trigger-wrap">
              <Link to={homePath} className="mega-menu-trigger" onClick={handleHomeClick}>
                Resume Builder
              </Link>
              <button
                type="button"
                className="mega-menu-toggle"
                aria-label={resumeMegaMenuOpen ? "Close Resume Builder menu" : "Open Resume Builder menu"}
                aria-expanded={resumeMegaMenuOpen}
                onClick={() => {
                  setTemplatesMegaMenuOpen(false);
                  setResumeMegaMenuOpen((open) => !open);
                }}
              >
                <FiChevronDown className="mega-menu-arrow" aria-hidden="true" />
              </button>
            </div>

            <div className="resume-mega-menu">
              <button
                type="button"
                className="mega-menu-row"
                onClick={() => {
                  setShowSignup(true);
                  setMenuOpen(false);
                  setResumeMegaMenuOpen(false);
                  setTemplatesMegaMenuOpen(false);
                }}
              >
                <span className="mega-menu-icon mega-menu-icon-signup">
                  <FiUserPlus aria-hidden="true" />
                </span>
                <span className="mega-menu-copy">
                  <span className="mega-menu-heading">Sign Up / Login</span>
                  <span className="mega-menu-text">
                    Sign Up free to access Templates Editing is 100% free
                  </span>
                </span>
              </button>

              <button
                type="button"
                className="mega-menu-row"
                onClick={() => handleSectionScroll("what-our-users-say")}
              >
                <span className="mega-menu-icon mega-menu-icon-reviews">
                  <FiMessageCircle aria-hidden="true" />
                </span>
                <span className="mega-menu-copy">
                  <span className="mega-menu-heading">What our users say</span>
                  <span className="mega-menu-text">
                    You can read our users current reviews and build your trust
                  </span>
                </span>
              </button>

              <button
                type="button"
                className="mega-menu-row"
                onClick={() => handleSectionScroll("frequently-asked-questions")}
              >
                <span className="mega-menu-icon mega-menu-icon-faq">
                  <FiHelpCircle aria-hidden="true" />
                </span>
                <span className="mega-menu-copy">
                  <span className="mega-menu-heading">Frequently ask question</span>
                  <span className="mega-menu-text">
                    You can get answers of immediate Question creates in your mind related To Resume / CV
                  </span>
                </span>
              </button>

              <Link to={featuresPath} className="mega-menu-row" onClick={handleLinkClick}>
                <span className="mega-menu-icon mega-menu-icon-why">
                  <FiSearch aria-hidden="true" />
                </span>
                <span className="mega-menu-copy">
                  <span className="mega-menu-heading">Why us</span>
                  <span className="mega-menu-text">
                    We allow free access to our users with free editing, unique templates, AI suggestions, and nominal pricing.
                  </span>
                </span>
              </Link>
            </div>
          </li>
          <li className={`mega-menu-parent templates-menu-parent ${templatesMegaMenuOpen ? "mega-menu-open" : ""} ${templatesMegaMenuSuppressed ? "mega-menu-suppressed" : ""}`}>
            <div className="mega-menu-trigger-wrap">
              <Link to={templatesPath} className="mega-menu-trigger" onClick={handleLinkClick}>
                Templates
              </Link>
              <button
                type="button"
                className="mega-menu-toggle"
                aria-label={templatesMegaMenuOpen ? "Close Templates menu" : "Open Templates menu"}
                aria-expanded={templatesMegaMenuOpen}
                onClick={() => {
                  setTemplatesMegaMenuSuppressed(false);
                  setResumeMegaMenuOpen(false);
                  setTemplatesMegaMenuOpen((open) => !open);
                }}
              >
                <FiChevronDown className="mega-menu-arrow" aria-hidden="true" />
              </button>
            </div>

            <div className="templates-mega-menu">
              <div className="templates-mega-hero">
                <span className="templates-premium-icon">
                  <FiAward aria-hidden="true" />
                </span>
                <div>
                  <p className="templates-mega-kicker">Premium template library</p>
                  <h3>AI templates built for a professional first impression</h3>
                  <p>
                    Choose smart, modern resume designs that help your CV look sharp,
                    readable, and ready for hiring teams.
                  </p>
                </div>
              </div>

              <div className="templates-mega-grid">
                <Link to={`${templatesPath}#ai-templates`} className="templates-mega-card" onClick={handleLinkClick}>
                  <span><FiCpu aria-hidden="true" /></span>
                  <strong>AI Templates</strong>
                  <p>Start with AI-friendly layouts and premium guidance for faster resume creation.</p>
                </Link>
                <Link to={templatesPath} className="templates-mega-card" onClick={handleLinkClick}>
                  <span><FiImage aria-hidden="true" /></span>
                  <strong>Modern Templates</strong>
                  <p>Unique designs with QR code, profile image, clean sections, and polished spacing.</p>
                </Link>
                <Link to={templatesPath} className="templates-mega-card" onClick={handleLinkClick}>
                  <span><FiLayers aria-hidden="true" /></span>
                  <strong>Job Specific Templates</strong>
                  <p>Pick resume styles shaped for different industries, roles, and career levels.</p>
                </Link>
                <Link to={templatesPath} className="templates-mega-card" onClick={handleLinkClick}>
                  <span><FiDownload aria-hidden="true" /></span>
                  <strong>PDF Download</strong>
                  <p>Prepare templates for clean PDF export that keeps formatting consistent.</p>
                </Link>
                <button
                  type="button"
                  className="templates-mega-card"
                  onClick={() => {
                    setShowSignup(true);
                    setMenuOpen(false);
                    setResumeMegaMenuOpen(false);
                    setTemplatesMegaMenuOpen(false);
                  }}
                >
                  <span><FiEdit3 aria-hidden="true" /></span>
                  <strong>Free Editing Access</strong>
                  <p>Edit templates freely and adjust your content before finalizing your resume.</p>
                </button>
                <Link to="/pricing" className="templates-mega-card" onClick={handleLinkClick}>
                  <span><FiDollarSign aria-hidden="true" /></span>
                  <strong>Competitive Prices</strong>
                  <p>Get premium resume support with market competitive pricing.</p>
                </Link>
                <Link to={featuresPath} className="templates-mega-card" onClick={handleLinkClick}>
                  <span><FiTarget aria-hidden="true" /></span>
                  <strong>Search Suitable Jobs</strong>
                  <p>Use a focused CV style that helps match your strengths to suitable job paths.</p>
                </Link>
                <Link to={templatesPath} className="templates-mega-card" onClick={handleLinkClick}>
                  <span><FiUserCheck aria-hidden="true" /></span>
                  <strong>Professional Look</strong>
                  <p>Drop a confident impression on the hiring person with a clean CV presentation.</p>
                </Link>
                <Link to={templatesPath} className="templates-mega-card templates-mega-card-wide" onClick={handleLinkClick}>
                  <span><FiClock aria-hidden="true" /></span>
                  <strong>Interview Call Faster</strong>
                  <p>Our templates help present your skills clearly, increasing your chance to get interview calls in a short time.</p>
                </Link>
              </div>
            </div>
          </li>
          <li><Link to={featuresPath} onClick={handleLinkClick}>Features</Link></li>
          <li><Link to={coverLetterPath} onClick={handleLinkClick}>Cover Letter</Link></li>
          <li><Link to={policiesPath} onClick={handleLinkClick}>Policies</Link></li>
          {/* Pricing is hidden from the navbar. Restore this line to show it again. */}
          {/* <li><Link to="/pricing" onClick={handleLinkClick}>Pricing</Link></li> */}
          <li><Link to={blogPath} onClick={handleLinkClick}>Blog</Link></li>
          <li><Link to={contactPath} onClick={handleLinkClick}>Contact</Link></li>


          {/* MOBILE AUTH */}
          <li className="mobile-auth">
            {!isAuthenticated ? (
              <button
                className="mobile-signin-btn"
                onClick={() => {
                  setShowSignup(true);
                  setMenuOpen(false);
                  setResumeMegaMenuOpen(false);
                  setTemplatesMegaMenuOpen(false);
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
                    setResumeMegaMenuOpen(false);
                    setTemplatesMegaMenuOpen(false);
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
        <div
          className="hamburger"
          onClick={() => {
            setMenuOpen((open) => {
              if (open) {
                setResumeMegaMenuOpen(false);
                setTemplatesMegaMenuOpen(false);
              }
              return !open;
            });
          }}
        >
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
