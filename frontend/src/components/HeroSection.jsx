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
            Build a <span>Professional Resume</span> in Minutes
          </h1>

          <h3 className="hero-titleh3">
            <span>Bring Your CV on Top</span>
          </h3>

          <p className="hero-subtitle">
            Create a stunning, job-winning resume effortlessly with our
            AI-powered Resume Builder.
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
