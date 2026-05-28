import { useAuth } from "../context/AuthContext";
import React, { useEffect, useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import SignupModal from "../components/auth/SignupModal";
import PaymentModal from "../components/payment/PaymentModal";
import "./TemplateLayout.css";
import { useNavigate } from "react-router-dom";


const TemplateLayout = ({
  children,
  onPreview,
  handleSaveResume,
  checkPaymentStatus,
}) => {

  const [pendingAction, setPendingAction] = useState(null);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const resumeRef = React.useRef(null);
  const resumeContainerRef = useRef(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleReset = () => {
    localStorage.removeItem("FlorenceClassic");
    alert("Saved data removed");
    window.location.reload();
  };

  const pdfGeneratingRef = useRef(false);

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

    handleDownloadPDF();
  };
const handleDownloadPDF = async () => {

  console.log("DOWNLOAD CLICKED");

  if (pdfGeneratingRef.current) return;

  pdfGeneratingRef.current = true;

  let wrapper = null;

  try {
    const originalElement = resumeContainerRef.current?.firstElementChild;

    if (!originalElement) {
      console.error("Resume element not found");
      return;
    }

    // ✅ Clone template, do not move real DOM
    const element = originalElement.cloneNode(true);

    // ===============================
    // HEADER FIX
    // ===============================

    const nameInput = element.querySelector(".florence-name");

    if (nameInput) {
      const div = document.createElement("div");
      div.className = "florence-name";
      div.textContent = nameInput.value || nameInput.textContent;

      div.style.width = "70%";
      div.style.margin = "0 auto";
      div.style.textAlign = "center";

      nameInput.replaceWith(div);
    }

    const titleInput = element.querySelector(".florence-title");

    if (titleInput) {
      const div = document.createElement("div");
      div.className = "florence-title";
      div.textContent = titleInput.value || titleInput.textContent;

      div.style.width = "40%";
      div.style.margin = "8px auto 0";
      div.style.textAlign = "center";

      titleInput.replaceWith(div);
    }

    const summaryInput = element.querySelector(".summary-input");

    if (summaryInput) {
      const div = document.createElement("div");
      div.className = "summary-input pdf-summary-text";
      div.textContent = summaryInput.value || summaryInput.textContent;

      summaryInput.replaceWith(div);
    }

    // ===============================
    // HIDDEN WRAPPER
    // ===============================

    wrapper = document.createElement("div");

    wrapper.style.position = "fixed";
    wrapper.style.left = "-99999px";
    wrapper.style.top = "0";
    wrapper.style.background = "#fff";

    element.style.margin = "0";
    element.style.transform = "none";
    element.style.width = "210mm";
    element.style.height = "297mm";
    element.style.overflow = "hidden";

    wrapper.appendChild(element);
    document.body.appendChild(wrapper);

    await new Promise((r) => setTimeout(r, 200));

    const canvas = await html2canvas(element, {
      scale: window.devicePixelRatio * 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    const pdf = new jsPDF("p", "mm", "a4");

    pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);

    pdf.save("FlorenceClassic-resume.pdf");

  } catch (error) {
    console.error("PDF download error:", error);
  } finally {
    if (wrapper && document.body.contains(wrapper)) {
      document.body.removeChild(wrapper);
    }

    setTimeout(() => {
      pdfGeneratingRef.current = false;
    }, 1000);
  }
};

const handleSignupSuccess = async () => {
  setShowSignupModal(false);

  if (pendingAction === "download") {
    setPendingAction(null);

    setTimeout(async () => {
      const hasPaid = await checkPaymentStatus();

      if (hasPaid) {
        handleDownloadPDF();
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

        <button onClick={handleReset}>
          Reset
        </button>

        <button onClick={handleDownload}>
          Download PDF
        </button>

      </div>

      {/* Resume Content */}
      <div className="content" ref={resumeContainerRef}>
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
            handleDownloadPDF();

          }}
        />
      )}

    </div>
  );
};

export default TemplateLayout;