import React, { useState, useRef, useEffect } from "react";
import "./Templates.css";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { useAuth } from "../context/AuthContext";
import SignupModal from "./auth/SignupModal";

const SIMPLE_TEMPLATES = Array.from({ length: 12 }, (_, i) => i + 1);

const TEMPLATE_META = {
  1: { name: "Teacher Elite", category: "All Roles" },
  2: { name: "Clean Professional", category: "Corporate" },
  3: { name: "Creative Bold", category: "Creative" },
  4: { name: "Minimal Accent", category: "Minimal" },
  5: { name: "Elegant Classic", category: "Timeless" },
  6: { name: "Medical Elites", category: "Healthcare" },
  7: { name: "Engineer Elites", category: "Engineering" },
  8: { name: "Soft-Tech", category: "Tech & IT" },
  9: { name: "Data Analyst", category: "Data" },
  10: { name: "Engineer Prime", category: "Engineering" },
  11: { name: "Aviation Pro", category: "Aviation" },
  12: { name: "Free Basic", category: "Free Template" },
};

export default function Templates() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const [showSignup, setShowSignup] = useState(false);
  const pendingRouteRef = useRef(null);

  // 🔥 Detect Start Building flow
  const isStartBuildingFlow = Boolean(location.state?.startBuilding);

  // 🔥 Auto open signup when coming from Start Building
  useEffect(() => {
    if (isStartBuildingFlow && !isAuthenticated) {
      setShowSignup(true);
    }
  }, [isStartBuildingFlow, isAuthenticated]);

  // 🔥 Template click handler (FIXED)
  const handleUseTemplate = (route) => {
    if (!isAuthenticated) {
      // ✅ store intent safely
      pendingRouteRef.current = route;
      sessionStorage.setItem("pendingTemplateRoute", route);

      setShowSignup(true);
      return;
    }

    navigate(route);
  };

  // 🔥 After signup success (FIXED)
  const handleSignupSuccess = () => {
    // Case 1: Start Building flow
    if (isStartBuildingFlow) {
      sessionStorage.removeItem("pendingTemplateRoute");
      pendingRouteRef.current = null;
      navigate("/resume/professional");
      return;
    }

    // Case 2: Normal template click flow
    const pendingRoute =
      pendingRouteRef.current ||
      sessionStorage.getItem("pendingTemplateRoute");

    if (pendingRoute) {
      sessionStorage.removeItem("pendingTemplateRoute");
      pendingRouteRef.current = null;
      navigate(pendingRoute);
    }
  };

  return (
    <>
      <section className="templates-page">

        {/* ===== SEO HEADER ===== */}
        <div className="templates-seo-header">
          <h1>Resume Templates in Pakistan – Professional & ATS-Friendly Formats</h1>

          <p className="templates-seo-intro">
            Explore professionally designed resume templates tailored for students,
            fresh graduates, and experienced professionals in Pakistan. Our AI-powered
            resume builder offers ATS-friendly CV templates that help you stand out
            in corporate, government, and international job applications.
          </p>
        </div>

        {/* =================== PREMIUM TEMPLATES =================== */}
        <section className="templates-section templates-section--premium">
          <div className="section-heading">
            <div>
              <h2 className="section-title">Premium interactive templates</h2>
              <p className="section-subtitle">
                High-impact resume layouts with strong visual hierarchy. Ideal when
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
                  onClick={() => handleUseTemplate("/resume-classic")}
                  className="template-btn template-btn--primary"
                >
                  Use Classic
                </button>
              </div>
            </article>

            {/* Professional Template */}
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
                    Subtle accents with a structured, corporate-friendly layout.
                  </p>
                </div>
                <button
                  onClick={() => handleUseTemplate("/resume/professional")}
                  className="template-btn template-btn--primary"
                >
                  Use Clean Professional
                </button>
              </div>
            </article>
          </div>
        </section>

        {/* ===== SEO CONTENT BLOCK ===== */}
        <section className="templates-seo-content">
          <div className="templates-seo-container">
            <h2>Choose the Best Resume Template for Your Career</h2>

            <p>
              Selecting the right resume template is essential when applying for jobs
              in Pakistan. Recruiters often spend only a few seconds reviewing each CV,
              so a clean and structured layout can significantly improve your chances
              of getting shortlisted. Our resume templates are designed with clarity,
              readability, and ATS compatibility in mind.
            </p>

            <p>
              Whether you are applying for a banking position, software engineering
              role, healthcare job, aviation industry opportunity, or government
              department vacancy, ResumeBuilder.pk provides modern resume formats
              tailored to different industries.
            </p>

            <h2>ATS-Friendly Resume Templates</h2>

            <p>
              Many companies in Pakistan use Applicant Tracking Systems (ATS) to filter
              resumes automatically. Our professional CV templates are structured to
              meet ATS standards, ensuring your skills, education, and work experience
              are properly recognized by automated systems.
            </p>

            <p>
              With our AI resume builder, you can customize any template, adjust
              sections, and download your professional resume within minutes. No
              design experience required.
            </p>
          </div>
        </section>


        {/* ================= SIMPLE ================= */}
        <section className="templates-section templates-section--simple">
          <h2 className="section-title">Simple Templates</h2>

          <div className="template-list">
            {SIMPLE_TEMPLATES.map((num) => (
              <article
                key={num}
                className={`template-card ${num === 12 ? "free-template-card" : ""}`}
              >
                {num === 12 && (
                  <div className="free-badge">FREE</div>
                )}
                <img
                  src={`/images/simple-${num}.png`}
                  alt={TEMPLATE_META[num]?.name}
                  className="template-thumbnail"
                />

                <h3>{TEMPLATE_META[num]?.name}</h3>

                <button
                  className="template-btn template-btn--outline"
                  onClick={() => {
                    const routes = {
                      1: "/teacher-elite",
                      2: "/clean-professional",
                      3: "/creative-bold",
                      4: "/minimal-accent",
                      5: "/elegant-classic",
                      6: "/medical-elites",
                      7: "/engineer-elites",
                      8: "/soft-tech",
                      9: "/data-elite",
                      10: "/engineer-prime",
                      11: "/aviation-pro",
                      12: "/free-basic",
                    };
                    handleUseTemplate(routes[num]);
                  }}
                >
                  Use {TEMPLATE_META[num]?.name}
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* ================= SIGNUP MODAL ================= */}
        {showSignup && (
          <SignupModal
            isOpen={showSignup}
            onClose={() => setShowSignup(false)}
            onSuccess={handleSignupSuccess}
          />
        )}
      </section>

      <Footer />
    </>
  );
}