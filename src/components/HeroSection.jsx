import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";

export default function HeroSection() {
  const { openAuthModal, isAuthenticated } = useAuth();
  const navigate = useNavigate();

const handleStartBuilding = () => {
  if (window.openAuth) {
    window.openAuth();
  } else {
    console.warn("Auth system not ready");
  }
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
            AI-powered Resume Builder. Save time. Land interviews. Stand out.
          </p>
          <button onClick={handleStartBuilding} className="hero-btn">
            Start Building
          </button>
        </div>

        <div className="hero-illustration">
          <div className="mockup-box">
            <video
              className="mockup-video"
              src="/public/demo/mockup.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  );
}
