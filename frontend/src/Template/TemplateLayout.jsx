import { useAuth } from "../context/AuthContext";
import React, { useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import SignupModal from "../components/auth/SignupModal";

const TemplateLayout = ({
  children,
  onSave,
  onPreview
}) => {

  const handleReset = () => {
    localStorage.removeItem("FlorenceClassic");
    alert("Saved data removed");
    window.location.reload();
  };

  const [pendingAction, setPendingAction] = useState(null);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const resumeRef = React.useRef(null);
  const resumeContainerRef = useRef(null);

  const { isAuthenticated } = useAuth();
  console.log("STATE showSignupModal =", showSignupModal);

  const handleDownload = () => {
    console.log("CLICKED DOWNLOAD");

    if (!isAuthenticated) {
      console.log("OPEN SIGNUP MODAL");

      setPendingAction("download");   // 🔥 ADD THIS
      setShowSignupModal(true);
      return;
    }
     handleDownloadPDF();
  };
const handleDownloadPDF = async () => {
  const root = resumeContainerRef.current;
  if (!root) return;

  const original = root.querySelector(".florence-page");
  if (!original) return;

  // clone template
  const element = original.cloneNode(true);

  // ===============================
  // HEADER FIX
  // ===============================

  const nameInput = element.querySelector(".florence-name");

  if (nameInput) {
    const div = document.createElement("div");

    div.className = "florence-name";

    div.textContent = nameInput.value;

    // ✅ center fix
    div.style.width = "70%";
    div.style.margin = "0 auto";
    div.style.textAlign = "center";

    nameInput.replaceWith(div);
  }

  const titleInput = element.querySelector(".florence-title");

  if (titleInput) {
    const div = document.createElement("div");

    div.className = "florence-title";

    div.textContent = titleInput.value;

    // ✅ center fix
    div.style.width = "40%";
    div.style.margin = "8px auto 0";
    div.style.textAlign = "center";

    titleInput.replaceWith(div);
  }

  // ===============================
  // SUMMARY FIX
  // ===============================

  const summaryInput = element.querySelector(".summary-input");

  if (summaryInput) {
    const div = document.createElement("div");

    div.className = "summary-input pdf-summary-text";

    div.textContent = summaryInput.value;

    summaryInput.replaceWith(div);
  }

  // ===============================
  // HIDDEN WRAPPER
  // ===============================

  const wrapper = document.createElement("div");

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

  // ===============================
  // CAPTURE
  // ===============================

  const canvas = await html2canvas(element, {
    scale: window.devicePixelRatio * 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/jpeg", 1.0);

  const pdf = new jsPDF("p", "mm", "a4");

  pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);

  pdf.save("FlorenceClassic-resume.pdf");

  document.body.removeChild(wrapper);
};

const continueDownload = () => {
  handleDownloadPDF();
};

  const handleSignupSuccess = () => {
    setShowSignupModal(false);

    if (pendingAction === "download") {
      setPendingAction(null);
      continueDownload();
       handleDownloadPDF();
    }
  };


  return (
    <div className="template-layout">

      {/* Top Bar */}
      <div className="toolbar">

        <button
          onClick={onSave}
        >
          Save
        </button>
       

        <button onClick={onPreview}>
          Preview 
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

    </div>
  );
};

export default TemplateLayout;