import React from "react";
import "./Home.css";
import HeroSection from "./HeroSection";
import FeaturesHowTestimonials from "./FeaturesHowTestimonials";

export default function Home() {
  return (
    <main className="home-page">
      {/* ✅ Hero Section */}
      <HeroSection />
       <FeaturesHowTestimonials />
      {/* Future sections will go here */}
    </main>

    
  );
}
