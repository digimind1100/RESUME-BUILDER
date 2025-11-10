import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import "./CounterBlock.css";

const CounterBlock = () => {
  // State for counters (replace with API fetch later if backend available)
  const [counters, setCounters] = useState({
    resumes: 12345,
    templates: 25,
    aiSuggestions: 9876,
  });

  return (
    <section id="counter-block" className="counter-block-section">
      <div className="counter-container">
        <h2 className="counter-title">Our Impact So Far</h2>
        <p className="counter-subtitle">
          Join thousands of users who created professional resumes with ease
        </p>

        <div className="counter-grid">
          <div className="counter-card">
            <CountUp
              end={counters.resumes}
              duration={2.5}
              separator=","
              className="counter-number"
            />
            <p className="counter-label">Resumes Created</p>
          </div>

          <div className="counter-card">
            <CountUp
              end={counters.templates}
              duration={2.5}
              separator=","
              className="counter-number"
            />
            <p className="counter-label">Templates Available</p>
          </div>

          <div className="counter-card">
            <CountUp
              end={counters.aiSuggestions}
              duration={2.5}
              separator=","
              className="counter-number"
            />
            <p className="counter-label">AI Suggestions Generated</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounterBlock;
