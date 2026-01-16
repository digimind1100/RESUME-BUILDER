import React from "react";
import "./Policies.css";

export default function Policies() {
  return (
    <div className="policies-page">
      <div className="policies-container">
        <h1 className="policies-title">Policies</h1>

        {/* Privacy Policy */}
        <section className="policy-section">
          <h2>Privacy Policy</h2>
          <p>
            We respect your privacy and are committed to protecting your personal
            information. This Privacy Policy explains how we collect, use, and
            safeguard your data when you use our Resume Builder service.
          </p>

          <ul>
            <li>Full name and email address</li>
            <li>Account login details</li>
            <li>Resume information entered by you</li>
            <li>Subscription and payment status</li>
          </ul>

          <p>
            We do not store any card, wallet, or banking details. All payments are
            processed securely through third-party payment gateways.
          </p>
        </section>

        {/* Terms & Conditions */}
        <section className="policy-section">
          <h2>Terms & Conditions</h2>
          <p>
            By accessing and using our Resume Builder, you agree to the following
            terms and conditions:
          </p>

          <ul>
            <li>The platform provides online resume creation and editing</li>
            <li>Premium features require a paid subscription</li>
            <li>Premium access is activated instantly after successful payment</li>
            <li>Account sharing or misuse is strictly prohibited</li>
            <li>Subscriptions expire automatically after the plan period</li>
          </ul>
        </section>

        {/* Refund Policy */}
        <section className="policy-section">
          <h2>Refund Policy</h2>
          <p>
            Our service is a digital product, therefore refunds are limited.
          </p>

          <ul>
            <li>
              Refunds apply only if payment was successful but premium access was
              not activated
            </li>
            <li>
              Verified technical issues preventing service usage may qualify
            </li>
            <li>
              No refunds for change of mind or partial usage
            </li>
          </ul>

          <p>
            All refund requests must be submitted within <strong>3 days</strong>{" "}
            of payment through our Contact page.
          </p>
        </section>
      </div>
    </div>
  );
}
