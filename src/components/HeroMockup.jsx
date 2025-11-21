import React from "react";
import "./HeroSection.css"; // same CSS file

export default function HeroMockup() {
  return (
    <div className="hero-video-wrapper">
      <div className="hero-video">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video-player"
        >
          <source src="/demo/mockup.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
