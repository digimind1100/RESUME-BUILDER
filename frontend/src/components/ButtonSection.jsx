import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ButtonSection.css";
import { downloadResumeAndTriggerReview } from "./DownloadPDF";
import { useAuth } from "../context/AuthContext";
import ReviewPopup from "./review/ReviewPopup";
import SignupModal from "./auth/SignupModal";
import PaymentModal from "./payment/PaymentModal";
import { hasReviewAccess } from "../utils/reviewAccess";
import API from "../api/authApi";

export default function ButtonSection({
  isEditing,
  setIsEditing,
  handleDeleteSelected,
  showSaveResume = false,
  saveTemplateId = "resume-builder",
  resumeData = null,
  showResetResume = false,
  onResetResume,
}) {
  const { user, isEmailVerified } = useAuth();
  const navigate = useNavigate();
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const canAccessPremium = hasReviewAccess(user);

  const runDownload = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setPendingAction("download");
      setShowSignupModal(true);
      return;
    }

    try {
      const accessRes = await API.get("/stats/download/access", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (
        accessRes.data.paymentRequired ||
        accessRes.data.canDownloadPdf === false
      ) {
        setShowPaymentModal(true);
        return;
      }
    } catch (err) {
      console.error("AI PDF access check error:", err.response?.data || err.message);

      if (err.response?.status === 402 || err.response?.data?.paymentRequired) {
        setShowPaymentModal(true);
        return;
      }

      alert(err.response?.data?.message || "Download not allowed");
      return;
    }

    try {
      const downloaded = await downloadResumeAndTriggerReview({
        downloadType: "ai",
      });

      if (!downloaded) return;

      await API.post(
        "/stats/download",
        { type: "ai" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Download / Review error:", err);
    }
  };

  const handleDownloadClick = async () => {
    const token = localStorage.getItem("token");

    if (!token || !user) {
      setPendingAction("download");
      setShowSignupModal(true);
      return;
    }

    if (!isEmailVerified) {
      setPendingAction("download");
      setShowSignupModal(true);
      return;
    }

    if (!canAccessPremium) {
      setShowReviewPopup(true);
      return;
    }

    await runDownload();
  };

  const runSaveResume = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setPendingAction("save");
        setShowSignupModal(true);
        return;
      }

      const response = await fetch(
        "https://resume-builder-backend-66wy.onrender.com/api/resume/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            templateId: saveTemplateId,
            data: resumeData,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Save failed");
        return;
      }

      alert("Resume saved to MongoDB successfully");
    } catch (err) {
      console.error("Save resume error:", err);
      alert("Save failed");
    }
  };

  const handleSaveResumeClick = async () => {
    if (!resumeData) {
      alert("Nothing to save yet");
      return;
    }

    await runSaveResume();
  };

  const handleReviewSuccess = async () => {
    setShowReviewPopup(false);
    await runDownload();
  };

  const handleSignupSuccess = () => {
    setShowSignupModal(false);

    if (pendingAction === "save") {
      setPendingAction(null);
      runSaveResume();
      return;
    }

    setPendingAction(null);
    setShowReviewPopup(true);
  };

  return (
    <div className="button-section-container button-section">
      <div className="button-section-inner">
        {showSaveResume && (
          <button className="common-btn" onClick={handleSaveResumeClick}>
            Save Resume in Database
          </button>
        )}

        {showResetResume && (
          <button className="common-btn" onClick={onResetResume}>
            Reset
          </button>
        )}

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
          Templates
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
          initialMode={user && !isEmailVerified ? "verify" : "signup"}
          onClose={() => setShowSignupModal(false)}
          onSuccess={handleSignupSuccess}
        />
      )}

      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          onSuccess={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
}
