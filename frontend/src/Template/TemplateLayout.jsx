import { useAuth } from "../context/AuthContext";
import React, { useEffect, useState, useRef } from "react";

import SignupModal from "../components/auth/SignupModal";
import ReviewPopup from "../components/review/ReviewPopup";
import "./TemplateLayout.css";
import { useNavigate } from "react-router-dom";
import { hasReviewAccess } from "../utils/reviewAccess";


const TemplateLayout = ({
  templateId,
  children,
  onPreview,
  handleSaveResume,
  checkPaymentStatus,
   onReset,
    onDownloadPDF,
}) => {

  const [pendingAction, setPendingAction] = useState(null);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showReviewPopup, setShowReviewPopup] = useState(false);

  const resumeRef = React.useRef(null);
  
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleReset = () => {
    localStorage.removeItem("FlorenceClassic");
    alert("Saved data removed");
    window.location.reload();
  };



  useEffect(() => {

    const openSignup = (event) => {
      if (event?.detail?.pendingAction) {
        setPendingAction(event.detail.pendingAction);
      }
      setShowSignupModal(true);
    };

    const openReview = (event) => {
      if (event?.detail?.pendingAction) {
        setPendingAction(event.detail.pendingAction);
      }
      setShowReviewPopup(true);
    };

    window.addEventListener(
      "openSignupModal",
      openSignup
    );

    window.addEventListener(
      "openReviewPopup",
      openReview
    );

    return () => {

      window.removeEventListener(
        "openSignupModal",
        openSignup
      );

      window.removeEventListener(
        "openReviewPopup",
        openReview
      );

    };

  }, []);

  const handleDownload = async () => {
    console.log("CLICKED DOWNLOAD");

    const token = localStorage.getItem("token");

    if (!token || !isAuthenticated) {
      setPendingAction("download");
      window.dispatchEvent(new Event("openSignupModal"));
      return;
    }

    const hasReviewed = hasReviewAccess(user);
    console.log("HAS REVIEW ACCESS:", hasReviewed);

    if (!hasReviewed) {
      setPendingAction("download");
      window.dispatchEvent(
        new CustomEvent("openReviewPopup", {
          detail: { pendingAction: "download" },
        })
      );
      return;
    }

    onDownloadPDF();
  };

  const continuePendingAction = () => {
    if (pendingAction === "download") {
      setPendingAction(null);
      onDownloadPDF();
      return;
    }

    if (pendingAction === "profileImage") {
      setPendingAction(null);
      window.dispatchEvent(new Event("openProfileImagePicker"));
    }
  };

  const handleSignupSuccess = async () => {
    setShowSignupModal(false);

    if (pendingAction === "download" || pendingAction === "profileImage") {
      setTimeout(async () => {
        const hasReviewed = hasReviewAccess(user);

        if (hasReviewed) {
          continuePendingAction();
        } else {
          setShowReviewPopup(true);
        }
      }, 500);
    }
  };

  const handleReviewSuccess = () => {
    setShowReviewPopup(false);
    continuePendingAction();
  };


  return (
    <div className="template-layout">

      {/* Top Bar */}
      <div className="toolbar">

        <button onClick={handleSaveResume}>
          Save Resume in Database
        </button>


        <button
          onClick={() => navigate("/templates")}
        >
          Templates
        </button>

        <button onClick={onReset}>
          Reset
        </button>

        <button onClick={handleDownload}>
          Download PDF
        </button>

      </div>

      {/* Resume Content */}
      <div className="content" >
        {children}
      </div>

      {showSignupModal && (
        <SignupModal
          onClose={() => setShowSignupModal(false)}
          onSuccess={handleSignupSuccess}
        />
      )}

      {showReviewPopup && (
        <ReviewPopup
          templateId={templateId}
          onClose={() => setShowReviewPopup(false)}
          onSuccess={handleReviewSuccess}
        />
      )}

    </div>
  );
};

export default TemplateLayout;
