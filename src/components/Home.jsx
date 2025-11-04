import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to DigiMind Resume Builder</h1>
        <p className="home-subtitle">
          Build your professional resume easily with AI-powered suggestions.
        </p>
        <button className="home-btn">Get Started</button>
      </div>
    </div>
  );
};

export default Home;
