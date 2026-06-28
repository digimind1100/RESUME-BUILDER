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

function AiResumeBuilderHero() {
  return (
    <section className="hero-container">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Free AI Resume - Create{" "}
            <span>ATS-Friendly Resumes</span> Faster
          </h1>

          <h3 className="hero-titleh3">
            AI Resume Generator with Professional Resume Templates
          </h3>

          <p className="hero-subtitle">
            Use ResumeBuilder.pk to create a professional resume with
            AI-assisted guidance, ATS-friendly formatting, modern resume
            templates, and instant PDF download.
          </p>

          <Link to="/ai-resume-builder/templates" className="hero-btn">
            Create AI Resume Now
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

function AiResumeBuilderSEOContent() {
  return (
    <section className="seo-section">
      <div className="seo-container">
        <h2>Free AI Resume for Job Seekers</h2>

        <p>
          ResumeBuilder.pk gives students, fresh graduates, and experienced
          professionals an AI Resume Builder Free workflow for creating job-ready
          documents online. The AI Resume Builder helps you organize experience,
          skills, education, projects, and achievements in a clear format that
          recruiters can scan quickly.
        </p>

        <p>
          Start with our{" "}
          <Link to="/ai-resume-builder/templates">Professional Resume Templates</Link> and use the
          Online Resume Builder to edit your details, improve your wording, and
          prepare a polished resume for local and international job applications.
        </p>

        <h2>Create ATS-Friendly Resumes with AI Assistance</h2>

        <p>
          Our ATS-Friendly Resume Builder keeps your resume structure clean so
          applicant tracking systems can read your sections, headings, and skills
          more reliably. For a deeper checklist, read our guide on{" "}
          <Link to="/ai-resume-builder/blog/how-to-make-ats-friendly-resume-in-pakistan-2026">
            how to make an ATS-friendly resume in Pakistan
          </Link>
          .
        </p>

        <p>
          You can also improve your screening chances with practical advice from
          our{" "}
          <Link to="/ai-resume-builder/blog/ats-resume-guide">ATS resume guide</Link> and our list
          of{" "}
          <Link to="/ai-resume-builder/blog/ats-keywords-for-resumes">
            ATS keywords for resumes
          </Link>
          .
        </p>

        <h2>AI Resume with Professional Templates</h2>

        <p>
          Use the AI Resume Generator as an AI Resume Maker, AI CV Maker, or
          everyday Resume Builder when you want a faster way to prepare a
          professional document. The templates are designed for readable
          summaries, focused skills, clear work history, and strong education
          sections.
        </p>

        <p>
          If you prefer a CV-focused experience, our{" "}
          <Link to="/cv-maker">CV Maker</Link> is available for users who want a
          dedicated AI CV Maker Free style landing page and CV creation workflow.
        </p>

        <h2>Build ai Resume Online and Download PDF</h2>

        <p>
          The AI Resume Builder Online experience lets you create, edit, and
          preview your resume directly in the browser. When your content is
          ready, use Resume Download PDF to save a consistent file for job
          portals, email applications, recruiter messages, and interviews.
        </p>

        <p>
          Before applying, compare your skills section with our guide to the{" "}
          <Link to="/ai-resume-builder/blog/best-skills-for-a-resume-2026">
            best skills for a resume in 2026
          </Link>{" "}
          so your resume highlights the strengths employers expect.
        </p>

        <h2>Who Can Use Our AI Resume Builder?</h2>

        <p>
          ResumeBuilder.pk is useful for freshers, university students, software
          engineers, accountants, teachers, designers, customer service teams,
          managers, and career switchers. Whether you search for an AI Resume
          Builder, AI Resume Maker, AI CV Maker, or Online Resume Builder, the
          goal is the same: create a clear, professional resume faster.
        </p>

        <h2>Why Choose ResumeBuilder.pk?</h2>

        <p>
          ResumeBuilder.pk combines professional resume templates, ATS-friendly
          formatting, easy editing, PDF download, and a Cover Letter Builder in
          one place. It is built for job seekers who want a simple Resume Builder
          that supports both quick applications and polished career documents.
        </p>
      </div>
    </section>
  );
}

export default function HomePageAiResumeBuilder() {
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
          <div className="preloader-text">Loading AI Resume Builder...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          Free AI Resume Builder Online | Create ATS-Friendly Resumes
        </title>
        <meta
          name="description"
          content="Use our free AI Resume Builder online to create ATS-friendly resumes with professional templates, easy editing, resume examples, and instant PDF download."
        />
      </Helmet>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Free AI Resume Builder Online",
            url: "https://www.resumebuilder.pk/ai-resume-builder",
            description:
              "Create ATS-friendly resumes online with AI-assisted guidance, professional templates, and instant PDF download.",
            publisher: {
              "@type": "Organization",
              name: "ResumeBuilder.pk",
              url: "https://www.resumebuilder.pk"
            }
          })
        }}
      />

      <main className="home-page">
        <AiResumeBuilderHero />
        <AiResumeBuilderSEOContent />
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
