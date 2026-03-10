import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShareAlt } from "react-icons/fa";

import { useReview } from "../context/ReviewContext";
import { downloadResumeAndTriggerReview } from "../components/DownloadPDF";

import usePaymentGuard from "../hooks/usePaymentGuard";
import PaymentGate from "../components/payment/PaymentGate";
import ShareResume from "../components/ShareResume";

export default function TemplateControls({ resumeRef, templateId, onEditChange }) {

  const navigate = useNavigate();
  const { triggerReview } = useReview();

  const [isEditable, setIsEditable] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showMobileEditMsg, setShowMobileEditMsg] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const {
    isPaid,
    showPaymentModal,
    setShowPaymentModal,
    requirePayment,
    handlePaymentSuccess,
  } = usePaymentGuard(templateId);

  const canEdit = isPaid;

  /* ===== Detect Mobile Screen ===== */
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* ===== Download PDF ===== */
  const handleDownloadClick = () => {
    if (!resumeRef?.current) return;

    downloadResumeAndTriggerReview({
      element: resumeRef.current,
      onReviewTrigger: triggerReview,
    });
  };

  /* ===== Reset Template ===== */
  const handleReset = () => {
    window.location.reload();
  };

  /* ===== Toggle Edit Mode ===== */
  const toggleEdit = () => {

    if (isMobile) {
      setShowMobileEditMsg(true);
      return;
    }

    if (!requirePayment()) return;

    const newState = !isEditable;
    setIsEditable(newState);

    if (onEditChange) {
      onEditChange(newState, canEdit);
    }
  };

  return (
    <>
      {/* ===== TOP CONTROL BUTTONS ===== */}
      <div className="te-buttons" contentEditable={false}>

        <button
          className="te-share-btn"
          onClick={(e) => {
            e.stopPropagation();
            setShowShare(true);
          }}
        >
          <FaShareAlt />
          <span>Share</span>
        </button>

        <button
          className="download-btn"
          onClick={handleDownloadClick}
        >
          Download PDF
        </button>

        <button onClick={() => navigate("/templates")}>
          Back to Templates
        </button>

        <button onClick={handleReset}>
          Reset
        </button>

        <button
          className={isEditable ? "edit-btn on" : "edit-btn off"}
          onClick={toggleEdit}
        >
          {isEditable ? "Editing: ON" : "Editing: OFF"}
          {!canEdit && <span className="edit-crown">👑</span>}
        </button>

        {showMobileEditMsg && (
          <div className="mobile-edit-notice">
            Editing is available on desktop for best experience.
          </div>
        )}

      </div>

      {/* ===== PAYMENT MODAL ===== */}
      <PaymentGate
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
      />

      {/* ===== SHARE MODAL ===== */}
      {showShare && (
        <ShareResume
          resumeRef={resumeRef}
          onClose={() => setShowShare(false)}
        />
      )}
    </>
  );
}