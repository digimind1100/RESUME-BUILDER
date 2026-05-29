import { useAuth } from "../context/AuthContext";
import React, { useEffect, useState, useRef } from "react";

import SignupModal from "../components/auth/SignupModal";
import PaymentModal from "../components/payment/PaymentModal";
import "./TemplateLayout.css";
import { useNavigate } from "react-router-dom";


const TemplateLayout = ({
  children,
  onPreview,
  handleSaveResume,
  checkPaymentStatus,
   onReset,
    onDownloadPDF,
}) => {

  const [pendingAction, setPendingAction] = useState(null);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const resumeRef = React.useRef(null);
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleReset = () => {
    localStorage.removeItem("FlorenceClassic");
    alert("Saved data removed");
    window.location.reload();
  };



  useEffect(() => {

    const openSignup = () => {
      setShowSignupModal(true);
    };

    const openPayment = () => {
      setShowPaymentModal(true);
    };

    window.addEventListener(
      "openSignupModal",
      openSignup
    );

    window.addEventListener(
      "openPaymentModal",
      openPayment
    );

    return () => {

      window.removeEventListener(
        "openSignupModal",
        openSignup
      );

      window.removeEventListener(
        "openPaymentModal",
        openPayment
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

    if (typeof checkPaymentStatus !== "function") {
      console.error("checkPaymentStatus function missing");
      return;
    }

    const hasPaid = await checkPaymentStatus();
    console.log("HAS PAID:", hasPaid);

    if (!hasPaid) {
      setPendingAction("download");
      window.dispatchEvent(new Event("openPaymentModal"));
      return;
    }

    onDownloadPDF();
  };

  if (typeof onDownloadPDF === "function") {
  onDownloadPDF();
}

  const handleSignupSuccess = async () => {
    setShowSignupModal(false);

    if (pendingAction === "download") {
      setPendingAction(null);

      setTimeout(async () => {
        const hasPaid = await checkPaymentStatus();

        if (hasPaid) {
         onDownloadPDF();
        } else {
          setShowPaymentModal(true);
        }
      }, 500);
    }
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

      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          onSuccess={() => {

            setShowPaymentModal(false);

            // Continue PDF download
            onDownloadPDF();

          }}
        />
      )}

    </div>
  );
};

export default TemplateLayout;