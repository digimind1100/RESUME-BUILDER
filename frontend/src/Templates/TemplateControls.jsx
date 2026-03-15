import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShareAlt } from "react-icons/fa";

import { useReview } from "../context/ReviewContext";
import { downloadResumeAndTriggerReview } from "../components/DownloadPDF";

import usePaymentGuard from "../hooks/usePaymentGuard";
import PaymentGate from "../components/payment/PaymentGate";
import ShareResume from "../components/ShareResume";

export default function TemplateControls({
  resumeRef,
  templateId,
  onEditChange,
  onRequirePayment,
  onDownload
}) {

  const navigate = useNavigate();
  const { triggerReview } = useReview();

  const [isEditable, setIsEditable] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const {
    isPaid,
    showPaymentModal,
    setShowPaymentModal,
    requirePayment,
    handlePaymentSuccess
  } = usePaymentGuard(templateId);

  const canEdit = isPaid;

  /* Sync state with parent */
  useEffect(() => {
    if (onEditChange) {
      onEditChange(isEditable, canEdit);
    }
  }, [isEditable, canEdit, onEditChange]);

  /* Download PDF */
  const handleDownloadClick = async () => {

    if (!resumeContainerRef || !resumeContainerRef.current) return;

    await new Promise(resolve => setTimeout(resolve, 200));

    downloadResumeAndTriggerReview({
      element: resumeContainerRef.current,
      onReviewTrigger: triggerReview
    });

  };

  /* Reset template */
  const handleReset = () => {
    window.location.reload();
  };

  /* Toggle edit */
  const toggleEdit = () => {

    if (!requirePayment()) return;

    setIsEditable(prev => !prev);

  };

  useEffect(() => {
  if (onRequirePayment) {
    onRequirePayment(() => requirePayment);
  }
}, [requirePayment]);

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

        <button className="download-btn" onClick={onDownload}>
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

      </div>

      <PaymentGate
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
      />

      {showShare && (
        <ShareResume
          resumeRef={resumeContainerRef}
          onClose={() => setShowShare(false)}
        />
      )}
    </>
  );
}