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

  const {
    isPaid,
    showPaymentModal,
    setShowPaymentModal,
    requirePayment,
    handlePaymentSuccess,
  } = usePaymentGuard(templateId);

  const canEdit = isPaid;

  /* sync state with parent template */
  useEffect(() => {
    if (onEditChange) {
      onEditChange(isEditable, canEdit);
    }
  }, [isEditable, canEdit]);

  /* ===== Download PDF ===== */
  const handleDownloadClick = async () => {

    if (!resumeRef || !resumeRef.current) return;

    await new Promise(resolve => setTimeout(resolve, 200));

    downloadResumeAndTriggerReview({
      element: resumeRef.current,
      onReviewTrigger: triggerReview,
    });
  };

  /* ===== Reset ===== */
  const handleReset = () => {
    window.location.reload();
  };

  /* ===== Edit Toggle ===== */
  const toggleEdit = () => {

    if (!requirePayment()) return;

    setIsEditable(prev => !prev);
  };

  return (
    <>
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

        <button className="download-btn" onClick={handleDownloadClick}>
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

      {/* Payment Modal */}
      <PaymentGate
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
      />

      {/* Share Modal */}
      {showShare && (
        <ShareResume
          resumeRef={resumeRef}
          onClose={() => setShowShare(false)}
        />
      )}
    </>
  );
}