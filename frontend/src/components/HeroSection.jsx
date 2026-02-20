import { useNavigate } from "react-router-dom";
import "./HeroSection.css";

export default function HeroSection() {
  const navigate = useNavigate();

  const handleStartBuilding = () => {
    navigate("/templates", {
      state: { startBuilding: true },
    });
  };

  return (
    <section className="hero-container">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Free AI Resume Builder in Pakistan – Create a <span>Professional CV</span> in Minutes
          </h1>

          <h3 className="hero-titleh3">
            ATS-Friendly Resume Templates for Students & Professionals
          </h3>

          <p className="hero-subtitle">
            Build a job-winning resume instantly with Pakistan’s AI-powered CV maker.
            Choose professional templates and download your ATS-friendly resume in minutes.
          </p>

          <button onClick={handleStartBuilding} className="hero-btn">
            Start Building
          </button>
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