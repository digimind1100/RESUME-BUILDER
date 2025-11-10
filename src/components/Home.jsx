import React from "react";
import "./Home.css";
import HeroSection from "./HeroSection";
import FeaturesHowTestimonials from "./FeaturesHowTestimonials";
import FeaturesCoverLetter from "./FeaturesCoverLetter"; 
import CounterBlock from "./CounterBlock";
import Footer from "./Footer";




export default function Home() {
  return (
    <main className="home-page">
      {/* ✅ Hero Section */}
      <HeroSection />
       <FeaturesHowTestimonials />
      {/* Future sections will go here */}
      <FeaturesCoverLetter />
      <CounterBlock />
      <Footer />
    </main>

    
  );
}
