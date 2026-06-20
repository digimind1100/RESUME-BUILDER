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

function CvMakerHero() {
  return (
    <section className="hero-container">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Free CV Maker Online - Create <span>Professional CVs</span> in Minutes
          </h1>

          <h3 className="hero-titleh3">
            Online CV Builder with Professional CV Templates
          </h3>

          <p className="hero-subtitle">
            Build a professional CV online with ResumeBuilder.pk. Choose modern
            CV templates, edit your details easily, and download a polished PDF
            CV ready for job applications.
          </p>

          <Link to="/cv-maker/templates" className="hero-btn">
            Create CV Now
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

function CvMakerSEOContent() {
  return (
    <section className="seo-section">
      <div className="seo-container">
        <h2>Free CV Maker Online for Job Seekers</h2>

        <p>
          ResumeBuilder.pk gives job seekers a simple Free CV Maker built for
          fast, professional applications. Our CV Maker Online helps you add
          education, experience, skills, projects, and contact details without
          fighting with formatting. You can start from{" "}
          <Link to="/cv-maker/templates">Professional CV Templates</Link> and create a
          polished CV that is ready for recruiters.
        </p>

        <p>
          Whether you call it a CV Maker, CV Creator, Online CV Builder, or
          Resume Builder, the goal is the same: create a clear document that
          presents your strengths and supports a smooth Resume Download PDF
          workflow.
        </p>

        <h2>Create a Professional CV Without Design Skills</h2>

        <p>
          You do not need graphic design experience to build a professional CV.
          Our CV Creator keeps the layout clean while you focus on writing strong
          content. If you are a fresher, read our guide on{" "}
          <Link to="/blog/best-cv-format-for-freshers-in-pakistan-2026">
            the best CV format for freshers in Pakistan
          </Link>{" "}
          before choosing your template.
        </p>

        <p>
          The editor is designed for students, fresh graduates, experienced
          professionals, and career switchers who want a quick CV Maker Online
          Free experience with modern formatting.
        </p>

        <h2>CV Maker with Professional CV Templates</h2>

        <p>
          Choose from Professional CV Templates that are structured for
          readability, ATS-friendly formatting, and real job applications. A
          strong template helps recruiters scan your career summary, skills, work
          experience, and education quickly.
        </p>

        <p>
          For better screening results, pair your Online CV Builder workflow with
          our guide on{" "}
          <Link to="/blog/how-to-make-ats-friendly-resume-in-pakistan-2026">
            how to make an ATS-friendly resume in Pakistan
          </Link>
          .
        </p>

        <h2>Download Your CV as PDF</h2>

        <p>
          After editing your details, use Resume Download PDF to save a polished
          file for job portals, email applications, LinkedIn messages, and
          walk-in interviews. PDF keeps your CV layout consistent when recruiters
          open it on different devices.
        </p>

        <p>
          Before sending your CV, review the essentials in our{" "}
          <Link to="/blog/resume-checklist-before-applying">
            resume checklist before applying
          </Link>{" "}
          so your document is complete, accurate, and ready to submit.
        </p>

        <h2>Who Can Use Our Online CV Maker?</h2>

        <p>
          Our Free CV Maker is useful for university students, freshers,
          teachers, software engineers, accountants, designers, customer service
          representatives, managers, and professionals applying for local or
          international jobs. ResumeBuilder.pk works as both a Resume Builder and
          CV Maker Online, helping you create applications faster with less
          stress.
        </p>
      </div>
    </section>
  );
}

export default function HomePageCvMaker() {
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
          <div className="preloader-text">Loading CV Maker...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          Free CV Maker Online | Create Professional CVs with ResumeBuilder.pk
        </title>
        <meta
          name="description"
          content="Use our free CV Maker online to create professional CVs with modern templates, easy editing, ATS-friendly formatting, and instant PDF download."
        />
        <link rel="canonical" href="https://resumebuilder.pk/cv-maker" />
      </Helmet>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Free CV Maker Online",
            url: "https://resumebuilder.pk/cv-maker",
            description:
              "Create professional CVs online with modern templates, ATS-friendly formatting, and PDF download.",
            publisher: {
              "@type": "Organization",
              name: "ResumeBuilder.pk",
              url: "https://resumebuilder.pk"
            }
          })
        }}
      />

      <main className="home-page">
        <CvMakerHero />
        <CvMakerSEOContent />
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
