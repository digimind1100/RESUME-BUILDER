import { useAuth } from "../context/AuthContext";
import React, { useEffect, useState, useRef } from "react";

import SignupModal from "../components/auth/SignupModal";
import ReviewPopup from "../components/review/ReviewPopup";
import PaymentModal from "../components/payment/PaymentModal";
import "./TemplateLayout.css";
import { useLocation, useNavigate } from "react-router-dom";
import { hasReviewAccess } from "../utils/reviewAccess";
import API from "../api/authApi";
import { NON_AI_TEMPLATE_GALLERY } from "../config/templateCatalog";


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
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const resumeRef = React.useRef(null);
  
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleReset = () => {
    localStorage.removeItem("FlorenceClassic");
    alert("Saved data removed");
    window.location.reload();
  };

  const runDownloadPDF = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setPendingAction("download");
      window.dispatchEvent(new Event("openSignupModal"));
      return;
    }

    try {
      const accessRes = await API.get(
        "/stats/download/access",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        accessRes.data.paymentRequired ||
        accessRes.data.canDownloadPdf === false
      ) {
        setShowPaymentModal(true);
        return;
      }
    } catch (err) {
      console.error("PDF access check error:", err.response?.data || err.message);

      if (err.response?.status === 402 || err.response?.data?.paymentRequired) {
        setShowPaymentModal(true);
        return;
      }

      alert(err.response?.data?.message || "Download not allowed");
      return;
    }

    await onDownloadPDF();

    try {
      await API.post(
        "/stats/download",
        { type: "nonAi" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("PDF download mark error:", err.response?.data || err.message);
    }
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

    await runDownloadPDF();
  };

  const continuePendingAction = async () => {
    if (pendingAction === "download") {
      setPendingAction(null);
      await runDownloadPDF();
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

  const activeTemplate = NON_AI_TEMPLATE_GALLERY.find(
    (template) =>
      template.id === templateId || template.route === location.pathname
  );

  const layoutTemplateClass = templateId
    ? `template-layout--${templateId.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}`
    : "";

  return (
    <div className={`template-layout template-layout--browser ${layoutTemplateClass}`}>
      {/* Top Bar */}
      <div className="toolbar no-pdf">

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
      <div className="content">
        <div className="template-workspace">
          <aside className="template-picker no-pdf" aria-label="Resume templates">
            <div className="template-picker-list">
              {NON_AI_TEMPLATE_GALLERY.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  className={`template-picker-item${
                    activeTemplate?.id === template.id ? " active" : ""
                  }`}
                  onClick={() => navigate(template.route)}
                  aria-current={activeTemplate?.id === template.id ? "page" : undefined}
                >
                  <img src={template.thumbnail} alt="" loading="lazy" />
                  <span>{template.name}</span>
                </button>
              ))}
            </div>
          </aside>

          <main className="template-preview-stage">
            {children}
          </main>
        </div>
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

      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          onSuccess={() => setShowPaymentModal(false)}
        />
      )}

    </div>
  );
};

export default TemplateLayout;
