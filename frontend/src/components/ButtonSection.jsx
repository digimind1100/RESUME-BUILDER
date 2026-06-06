import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ButtonSection.css";
import { downloadResumeAndTriggerReview } from "./DownloadPDF";
import { useAuth } from "../context/AuthContext";
import ReviewPopup from "./review/ReviewPopup";
import SignupModal from "./auth/SignupModal";
import { hasReviewAccess } from "../utils/reviewAccess";

export default function ButtonSection({
  isEditing,
  setIsEditing,
  handleDeleteSelected,
}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const canAccessPremium = hasReviewAccess(user);

  const runDownload = async () => {
    try {
      await downloadResumeAndTriggerReview({});
    } catch (err) {
      console.error("Download / Review error:", err);
    }
  };

  const handleDownloadClick = async () => {
    const token = localStorage.getItem("token");

    if (!token || !user) {
      setShowSignupModal(true);
      return;
    }

    if (!canAccessPremium) {
      setShowReviewPopup(true);
      return;
    }

    await runDownload();
  };

  const handleReviewSuccess = async () => {
    setShowReviewPopup(false);
    await runDownload();
  };

  const handleSignupSuccess = () => {
    setShowSignupModal(false);
    setShowReviewPopup(true);
  };

  return (
    <div className="button-section-container button-section">
      <div className="button-section-inner">
        <button className="common-btn" onClick={handleDownloadClick}>
          Download PDF
        </button>

        <button
          className="common-btn"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? "Lock Preview" : "Edit Preview"}
        </button>

        <button className="common-btn" onClick={handleDeleteSelected}>
          Delete Selected
        </button>

        <button className="common-btn" onClick={() => navigate("/templates")}>
          Template
        </button>
      </div>

      {showReviewPopup && (
        <ReviewPopup
          templateId="resume-builder"
          onClose={() => setShowReviewPopup(false)}
          onSuccess={handleReviewSuccess}
        />
      )}

      {showSignupModal && (
        <SignupModal
          onClose={() => setShowSignupModal(false)}
          onSuccess={handleSignupSuccess}
        />
      )}
    </div>
  );
}
