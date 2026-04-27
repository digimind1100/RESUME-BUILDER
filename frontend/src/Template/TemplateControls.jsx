import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useReview } from "../context/ReviewContext";
import { downloadResumeAndTriggerReview } from "../components/DownloadPDF";
import usePaymentGuard from "../hooks/usePaymentGuard";
import PaymentGate from "../components/payment/PaymentGate";
import "./TemplateControls.css";


export default function TemplateControls({
  resumeRef,
  templateId,
  onEditChange,
  onSave,
  onRequirePayment,
  onDownload
}) {

  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";


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

    // 🚀 DEV MODE → bypass payment completely
    if (isLocal) {
      setIsEditable(true);
      onEditChange(true, true); // force edit + paid
      return;
    }

    // 🔐 PRODUCTION
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


        <button className="download-btn" onClick={onDownload}>
          Download PDF
        </button>

        <button onClick={() => navigate("/templates")}>
          Back to Templates
        </button>

        <button onClick={handleReset}>
          Reset
        </button>

        <button onClick={onSave}>
          Save
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