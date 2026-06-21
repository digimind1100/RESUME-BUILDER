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

function CoverLetterBuilderHero() {
  return (
    <section className="hero-container">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Free Cover Letter Builder Online - Create{" "}
            <span>Professional Cover Letters</span> in Minutes
          </h1>

          <h3 className="hero-titleh3">
            Online Cover Letter Maker for Job Applications
          </h3>

          <p className="hero-subtitle">
            Write a professional cover letter faster with guided sections,
            polished wording, easy editing, and instant download for job
            applications.
          </p>

          <Link to="/cover-letter-builder/coverletter" className="hero-btn">
            Create Cover Letter Now
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

function CoverLetterBuilderSEOContent() {
  return (
    <section className="seo-section">
      <div className="seo-container">
        <h2>Free Cover Letter Builder for Job Seekers</h2>

        <p>
          ResumeBuilder.pk gives job seekers a Free Cover Letter Builder for
          creating clear, professional application letters online. Use the Cover
          Letter Builder to introduce your experience, explain your interest in a
          role, and show employers why you are a strong fit.
        </p>

        <p>
          The Online Cover Letter Builder is useful for fresh graduates,
          experienced professionals, career switchers, and anyone who wants a
          polished cover letter without starting from a blank page.
        </p>

        <h2>Create a Professional Cover Letter Online</h2>

        <p>
          A strong cover letter should connect your resume to the job
          description. Our Cover Letter Maker helps you organize your opening,
          experience, skills, motivation, and closing in a recruiter-friendly
          structure.
        </p>

        <p>
          For practical writing guidance, read our{" "}
          <Link to="/cover-letter-builder/blog/how-to-write-a-cover-letter">
            how to write a cover letter
          </Link>{" "}
          guide before sending your application.
        </p>

        <h2>Cover Letter Generator with Easy Editing</h2>

        <p>
          Use the Cover Letter Generator to build a draft quickly, then edit the
          details so your letter matches the company, job title, and experience
          level. A focused letter can make your application feel more personal
          and complete.
        </p>

        <p>
          Pair your letter with one of our{" "}
          <Link to="/cover-letter-builder/templates">
            Professional Resume Templates
          </Link>{" "}
          so your resume and cover letter look consistent.
        </p>

        <h2>Cover Letter Builder for Freshers and Professionals</h2>

        <p>
          Freshers can use the Cover Letter Creator to highlight education,
          internships, projects, and motivation. Experienced professionals can
          focus on achievements, leadership, industry knowledge, and the value
          they bring to the role.
        </p>

        <h2>Build Your Resume and Cover Letter Together</h2>

        <p>
          ResumeBuilder.pk also includes a{" "}
          <Link to="/cover-letter-builder/templates">Resume Builder</Link> for
          creating ATS-friendly resumes with professional templates and PDF
          download. For stronger applications, review our{" "}
          <Link to="/cover-letter-builder/blog/resume-checklist-before-applying">
            resume checklist before applying
          </Link>
          .
        </p>

        <h2>Why Choose ResumeBuilder.pk?</h2>

        <p>
          ResumeBuilder.pk combines a Cover Letter Builder, Resume Builder,
          professional resume templates, easy editing, and PDF download in one
          place. It is designed for job seekers who want polished documents
          faster without losing control over the final wording.
        </p>
      </div>
    </section>
  );
}

export default function HomePageCoverLetterBuilder() {
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
          <div className="preloader-text">Loading Cover Letter Builder...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          Free Cover Letter Builder Online | Create Professional Cover Letters
        </title>
        <meta
          name="description"
          content="Use our free Cover Letter Builder online to create professional cover letters with guided writing, easy editing, and instant download."
        />
        <link
          rel="canonical"
          href="https://resumebuilder.pk/cover-letter-builder"
        />
      </Helmet>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Free Cover Letter Builder Online",
            url: "https://resumebuilder.pk/cover-letter-builder",
            description:
              "Create professional cover letters online with guided sections, easy editing, and instant download.",
            publisher: {
              "@type": "Organization",
              name: "ResumeBuilder.pk",
              url: "https://resumebuilder.pk"
            }
          })
        }}
      />

      <main className="home-page">
        <CoverLetterBuilderHero />
        <CoverLetterBuilderSEOContent />
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
