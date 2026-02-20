import React, { useState, useEffect } from "react";
import "./Home.css";
import HeroSection from "./HeroSection";
import FeaturesHowTestimonials from "./FeaturesHowTestimonials";
import FeaturesCoverLetter from "./FeaturesCoverLetter";
import CounterBlock from "./CounterBlock";
import Footer from "./Footer";
import TemplateShowcase from "./TemplateShowcase";
import AiTutorialVideo from "./AiTutorialVideo";
import HomeReviews from "./HomeReviews";

export default function Home() {
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
        <title>
          Free AI Resume Builder in Pakistan – Create ATS Friendly CV Online | ResumeBuilder.pk
        </title>

        <meta
          name="description"
          content="Create professional ATS-friendly resumes in minutes with ResumeBuilder.pk. Free AI resume builder and CV maker designed for students and professionals in Pakistan."
        />

        <meta
          name="keywords"
          content="Free Resume Builder in Pakistan, AI Resume Builder Pakistan, CV Maker Pakistan, ATS Resume Builder Pakistan, Online CV Builder Pakistan"
        />

        <link rel="canonical" href="https://resumebuilder.pk/" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Free AI Resume Builder in Pakistan | ResumeBuilder.pk" />
        <meta
          property="og:description"
          content="Build professional ATS-friendly resumes instantly with Pakistan's AI-powered resume builder."
        />
        <meta property="og:url" content="https://resumebuilder.pk/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ResumeBuilder.pk" />
      </Helmet>

      <main className="home-page">
        <HeroSection />
        <FeaturesHowTestimonials />
        <TemplateShowcase />
        <AiTutorialVideo />
        <FeaturesCoverLetter />
        <HomeReviews />
        <CounterBlock />
        <Footer />
      </main>
    </>
  );
}