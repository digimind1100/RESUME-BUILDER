import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "../components/Home.css";
import "../components/HeroSection.css";
import "../components/HomeSEOContent.css";
import FeaturesHowTestimonials from "../components/FeaturesHowTestimonials";
import TemplateShowcase from "../components/TemplateShowcase";
import AiTutorialVideo from "../components/AiTutorialVideo";
import FeaturesCoverLetter from "../components/FeaturesCoverLetter";
import HomeReviews from "../components/HomeReviews";
import HomeFAQ from "../components/HomeFAQ";
import CounterBlock from "../components/CounterBlock";
import Footer from "../components/Footer";

function ResumeBuilderHero() {
  return (
    <section className="hero-container">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Free Resume Builder Online - Create{" "}
            <span>Professional Resumes</span> in Minutes
          </h1>

          <h3 className="hero-titleh3">
            Online Resume Builder with Professional Resume Templates
          </h3>

          <p className="hero-subtitle">
            Build ATS-friendly resumes using professional templates, easy
            editing, and instant PDF download.
          </p>

          <Link to="/resume-builder/templates" className="hero-btn">
            Create Resume Now
          </Link>
        </div>

        <div className="hero-illustration">
          <div className="mockup-box">
            <video
              className="mockup-video"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src="/demo/mockup.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResumeBuilderSEOContent() {
  return (
    <section className="seo-section">
      <div className="seo-container">
        <h2>Free Resume Builder for Job Seekers</h2>

        <p>
          ResumeBuilder.pk is a Free Resume Builder made for students, freshers,
          professionals, and career switchers who want to create polished
          resumes without formatting stress. Use our Resume Builder Online to add
          your experience, skills, education, projects, and achievements in a
          recruiter-friendly structure.
        </p>

        <p>
          Start with{" "}
          <Link to="/resume-builder/templates">Professional Resume Templates</Link>
          , edit your content online, and prepare a resume that is easy to read,
          ATS-friendly, and ready for job applications.
        </p>

        <h2>Create ATS-Friendly Resumes Online</h2>

        <p>
          Our ATS Resume Builder keeps your layout clean so applicant tracking
          systems can read your headings, skills, work history, and education
          sections more reliably. For more guidance, read our{" "}
          <Link to="/resume-builder/blog/how-to-make-ats-friendly-resume-in-pakistan-2026">
            ATS-friendly resume guide for Pakistan
          </Link>
          .
        </p>

        <p>
          You can also improve your resume with our{" "}
          <Link to="/resume-builder/blog/ats-resume-guide">ATS resume guide</Link>
          {" "}and{" "}
          <Link to="/resume-builder/blog/ats-keywords-for-resumes">
            ATS keywords for resumes
          </Link>
          .
        </p>

        <h2>Resume Maker with Professional Templates</h2>

        <p>
          Whether you call it a Resume Maker, Resume Creator, Online Resume
          Builder, or Resume Builder, ResumeBuilder.pk helps you create a clear
          professional document faster. Choose a template, add your details, and
          keep the design consistent across sections.
        </p>

        <h2>Download Your Resume as PDF</h2>

        <p>
          After editing, use Resume Download PDF to save your resume for job
          portals, email applications, recruiter messages, and interviews. PDF
          download helps preserve your formatting when employers open your file
          on different devices.
        </p>

        <p>
          Before applying, compare your skills with our guide to the{" "}
          <Link to="/resume-builder/blog/best-skills-for-a-resume-2026">
            best skills for a resume in 2026
          </Link>
          .
        </p>

        <h2>Why Choose ResumeBuilder.pk?</h2>

        <p>
          ResumeBuilder.pk combines professional resume templates, ATS-friendly
          formatting, easy editing, PDF download, and a Cover Letter Builder in
          one place. It is built for job seekers who want a simple Resume Builder
          that supports fast, polished applications.
        </p>
      </div>
    </section>
  );
}

export default function HomePageResumeBuilder() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="preloader-overlay">
        <div className="preloader-container">
          <div className="spinner"></div>
          <div className="preloader-text">Loading Resume Builder...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Free Resume Builder Online | Create ATS-Friendly Resumes</title>
        <meta
          name="description"
          content="Use our free Resume Builder online to create ATS-friendly resumes with professional templates and instant PDF download."
        />
      </Helmet>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Free Resume Builder Online",
            url: "https://resumebuilder.pk/resume-builder",
            description:
              "Create ATS-friendly resumes online with professional templates, easy editing, and instant PDF download.",
            publisher: {
              "@type": "Organization",
              name: "ResumeBuilder.pk",
              url: "https://resumebuilder.pk"
            }
          })
        }}
      />

      <main className="home-page">
        <ResumeBuilderHero />
        <ResumeBuilderSEOContent />
        <FeaturesHowTestimonials />
        <TemplateShowcase />
        <AiTutorialVideo />
        <FeaturesCoverLetter />
        <HomeReviews />
        <HomeFAQ />
        <CounterBlock />
        <Footer />
      </main>
    </>
  );
}
