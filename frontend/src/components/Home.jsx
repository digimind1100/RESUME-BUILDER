import React, { useState, useEffect } from "react";
import "./Home.css";
import HeroSection from "./HeroSection";
import FeaturesHowTestimonials from "./FeaturesHowTestimonials";
import FeaturesCoverLetter from "./FeaturesCoverLetter";
import CounterBlock from "./CounterBlock";
import Footer from "./Footer";
import TemplateShowcase from "./TemplateShowcase";
import AiTutorialVideo from "./AiTutorialVideo"
import HomeReviews from "./HomeReviews";
import HomeSEOContent from "./HomeSEOContent";
import HomeFAQ from "./HomeFAQ";



export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading or wait for API/data
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Render preloader while loading
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

  // ✅ Render actual home page after loading
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "ResumeBuilder.pk",
          "url": "https://resumebuilder.pk",
          "logo": "https://resumebuilder.pk/logo.png",
          "founder": {
            "@type": "Person",
            "name": "Haider Zaidi"
          },
          "sameAs": [
            "https://www.linkedin.com/in/haider-zaidi-4118293b2/",
            "https://facebook.com/ResumeBuilderPK"
          ]
        })
      }}
    />
  <main className="home-page">
    <HeroSection />
    <HomeSEOContent />
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
