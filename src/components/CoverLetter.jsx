// ./CoverLetter.jsx
import React from "react";
import "./CoverLetter.css";


const CoverLetter = () => {
  return (
    <section className="coverletter-section">
      <div className="coverletter-container">
        <h1 className="coverletter-title">AI-Powered Cover Letter Builder</h1>
        <p className="coverletter-intro">
          Create a professional, personalized cover letter in minutes.
          Our AI will analyze your resume and job title to generate a
          tailored cover letter that enhances your application.
        </p>

        <div className="coverletter-preview">
          <img
            src="/images/coverletter-preview.png"
            alt="Cover Letter Example"
            className="coverletter-image"
          />
        </div>

        <button className="coverletter-btn">Start Building Cover Letter</button>
      </div>
    </section>
  );
};

export default CoverLetter;
