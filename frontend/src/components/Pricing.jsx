import React from "react";
import "./Pricing.css";

export default function Pricing() {
  return (
    <div className="pricing-page">

      <section className="pricing-hero">
        <h1>Simple & Transparent Pricing</h1>
        <p>No hidden charges. No subscriptions. Pay once and unlock premium features.</p>
      </section>

      <section className="pricing-section">

        <div className="pricing-cards">

          {/* Free Plan */}
          <div className="pricing-card free-plan">
            <h3>Free Plan</h3>
            <h2 className="price">Rs 0</h2>
            <ul>
              <li>Access to Free Templates</li>
              <li>Create & Edit Resume</li>
              <li>Basic PDF Download</li>
              <li>Limited Features</li>
            </ul>
            <button className="pricing-btn free-btn">
              Start Free
            </button>
          </div>

          {/* Premium Plan */}
          <div className="pricing-card premium-plan">
            <div className="popular-badge">Most Popular</div>

            <h3>Premium Plan</h3>
            <h2 className="price">Rs 599</h2>
            <p className="duration">
              One-Time Payment • 30 Days Full Access
            </p>

            <ul>
              <li>All Premium Resume Templates</li>
              <li>AI Work Experience Suggestions</li>
              <li>AI Skill Suggestions</li>
              <li>AI Cover Letter Generator</li>
              <li>Download Premium PDF Resume</li>
              <li>Download PDF Cover Letter</li>
            </ul>

            <button className="pricing-btn premium-btn">
              Upgrade to Premium
            </button>

            {/* Payment Methods */}
            <div className="payment-methods">
              <p className="payment-title">Accepted Payment Methods</p>
              <div className="payment-icons">
                <div className="pay-box">💳 Credit / Debit Card</div>
                <div className="pay-box">💚 Easypaisa</div>
                <div className="pay-box">💛 JazzCash</div>
                <div className="pay-box">💙 SadaPay</div>
              </div>
            </div>

          </div>

        </div>

        <p className="pricing-note">
          By purchasing the Premium Plan, you agree to our Terms & Conditions
          and Refund Policy. Refunds are not allowed after premium features
          are used or digital files are downloaded, except in cases of verified
          duplicate payment or technical issues.
        </p>

      </section>
    </div>
  );
}