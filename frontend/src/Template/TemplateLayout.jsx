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

  // ✅ clone template so visible template does not move
  const clone = original.cloneNode(true);

  clone.classList.add("pdf-export");

  // ✅ Convert header inputs to normal text for perfect PDF capture
const nameInput = clone.querySelector(".florence-name");
const titleInput = clone.querySelector(".florence-title");

if (nameInput) {
  const nameText = document.createElement("div");
  nameText.className = "florence-name pdf-header-text";
  nameText.textContent = nameInput.value || nameInput.getAttribute("value") || "";
  nameInput.replaceWith(nameText);
}

if (titleInput) {
  const titleText = document.createElement("div");
  titleText.className = "florence-title pdf-header-text";
  titleText.textContent = titleInput.value || titleInput.getAttribute("value") || "";
  titleInput.replaceWith(titleText);
}

// ✅ Convert summary textarea to normal text for perfect PDF capture
const summaryInput = clone.querySelector(".summary-input");

if (summaryInput) {
  const summaryText = document.createElement("div");
  summaryText.className = "summary-input pdf-summary-text";

  summaryText.textContent =
    summaryInput.value || summaryInput.textContent || "";

  summaryInput.replaceWith(summaryText);
}


  // ✅ hidden capture area
  const hiddenWrapper = document.createElement("div");
  hiddenWrapper.style.position = "fixed";
  hiddenWrapper.style.left = "-99999px";
  hiddenWrapper.style.top = "0";
  hiddenWrapper.style.width = "210mm";
  hiddenWrapper.style.height = "297mm";
  hiddenWrapper.style.background = "#fff";
  hiddenWrapper.style.zIndex = "-1";

  // ✅ force clone A4 without touching visible page
  clone.style.margin = "0";
  clone.style.transform = "none";
  clone.style.width = "210mm";
  clone.style.height = "297mm";
  clone.style.overflow = "hidden";
  clone.style.background = "#fff";

  hiddenWrapper.appendChild(clone);
  document.body.appendChild(hiddenWrapper);

  await new Promise((r) => setTimeout(r, 300));

  const canvas = await html2canvas(clone, {
    scale: 3,
    useCORS: true,
    backgroundColor: "#ffffff",
    scrollX: 0,
    scrollY: 0,
    windowWidth: clone.scrollWidth,
    windowHeight: clone.scrollHeight,
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  pdf.addImage(imgData, "PNG", 0, 0, 210, 297);

  pdf.save("FlorenceClassic-resume.pdf");

  // ✅ cleanup hidden clone
  document.body.removeChild(hiddenWrapper);
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