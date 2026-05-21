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

    alert("Download Started")
  };

  const handleDownloadPDF = async () => {
  const root = resumeContainerRef.current;
  if (!root) return;

  const element = root.querySelector(".florence-page");
  if (!element) return;

  element.classList.add("pdf-export");

  await new Promise((r) => setTimeout(r, 300));

  const originalStyle = {
    margin: element.style.margin,
    transform: element.style.transform,
    width: element.style.width,
    height: element.style.height,
    overflow: element.style.overflow,
  };

  element.style.margin = "0";
  element.style.transform = "none";
  element.style.width = "210mm";
  element.style.height = "297mm";
  element.style.overflow = "hidden";

  const canvas = await html2canvas(element, {
    scale: 3,
    useCORS: true,
    backgroundColor: "#ffffff",
    scrollX: 0,
    scrollY: 0,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
  pdf.save("FlorenceClassic-resume.pdf");

  element.classList.remove("pdf-export");

  element.style.margin = originalStyle.margin;
  element.style.transform = originalStyle.transform;
  element.style.width = originalStyle.width;
  element.style.height = originalStyle.height;
  element.style.overflow = originalStyle.overflow;
};

const continueDownload = () => {
  handleDownloadPDF();
};

  const handleSignupSuccess = () => {
    setShowSignupModal(false);

    if (pendingAction === "download") {
      setPendingAction(null);
      continueDownload();
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