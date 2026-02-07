import React, { useState, useEffect } from "react";
import "./Home.css";
import HeroSection from "./HeroSection";
import FeaturesHowTestimonials from "./FeaturesHowTestimonials";
import FeaturesCoverLetter from "./FeaturesCoverLetter";
import CounterBlock from "./CounterBlock";
import Footer from "./Footer";
import TemplateShowcase from "./TemplateShowcase";
import AiTutorialVideo from "./AiTutorialVideo"


 import {useReview} from "../context/ReviewContext";

export default function Home() {
  const [loading, setLoading] = useState(true);

const {triggerReview} = useReview();

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

         

          

          <button onClick={triggerReview} style={{ position: "fixed", bottom: 20, right: 20 }}>
            TEST REVIEW POPUP
          </button>

          <div className="spinner"></div>
          <div className="preloader-text">Loading Resume Builder...</div>
        </div>
      </div>
    );
  }

  // ✅ Render actual home page after loading
  return (
    <main className="home-page">
      <HeroSection />
      <FeaturesHowTestimonials />
      <TemplateShowcase />
      <AiTutorialVideo />
      <FeaturesCoverLetter />
      <CounterBlock />
      <Footer />

    </main>
  );
}
