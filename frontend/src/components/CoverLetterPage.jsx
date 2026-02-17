import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CoverLetterPage.css";
import TutorialVideo from "./TutorialVideo";
import TemplatesPreview from "./TemplatesPreview";
import SEOArticle from "./SEOArticle";
import FAQBlock from "./FAQBlock";
import Footer from "./Footer";
import SignupModal from "./auth/SignupModal";
import { useAuth } from "../context/AuthContext";

const CoverLetterPage = () => {
  const [resumeStyle, setResumeStyle] = useState("classic");
  const [showSignup, setShowSignup] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth(); // get logged-in user

  // ===== Handle Start Button =====
  const handleStart = () => {
    if (user) {
      // If already logged in → go directly
      navigate("/coverletter-generator");
    } else {
      // If not logged in → open signup modal
      setShowSignup(true);
    }
  };

  // ===== After Successful Signup/Login =====
  const handleSignupSuccess = () => {
    setShowSignup(false);
    navigate("/coverletter-generator");
  };

  return (
    <>
      <section className="cl-wrapper">

        {/* ===== SubTitle ===== */}
        <h2 className="cl-title">Create a Professional Cover Letter</h2>

        {/* ===== SEO Content Section ===== */}
        <div className="cl-seo-text">
          <p>
            A well-written cover letter is one of the most important parts of a job application.
            While your resume showcases your experience and skills, your cover letter tells your
            story — your motivation, personality, and the reason you are the perfect fit for the role.
          </p>

          <p>
            Recruiters often use cover letters to understand your communication skills, passion,
            and professionalism. Submitting both a resume and cover letter dramatically increases
            your chances of getting shortlisted, especially for professional or competitive positions.
            Our smart Cover Letter Builder helps you create a polished, structured, and impactful letter
            in just a few minutes.
          </p>
        </div>

        {/* ===== CTA Button ===== */}
        <div className="cl-btn-wrap">
          <button className="cl-start-btn" onClick={handleStart}>
            Start Creating Cover Letter
          </button>
        </div>

        <TutorialVideo />

        <TemplatesPreview
          resumeStyle={resumeStyle}
          setResumeStyle={setResumeStyle}
        />

        <SEOArticle />
        <FAQBlock />

        {/* ================= SIGNUP MODAL ================= */}
        {showSignup && (
          <SignupModal
            isOpen={showSignup}
            onClose={() => setShowSignup(false)}
            onSuccess={handleSignupSuccess}
          />
        )}

      </section>

      <div style={{ width: "100%" }}>
        <Footer />
      </div>
    </>
  );
};

export default CoverLetterPage;
