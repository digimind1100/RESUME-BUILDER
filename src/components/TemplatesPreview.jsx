import React, { useState } from "react";
import "./TemplatesPreview.css";
import PaymentModal from "../components/payment/PaymentModal"; // adjust path if needed


import { useEffect } from "react";




console.log("PaymentModal:", PaymentModal);


export default function TemplatesPreview({ resumeStyle, setResumeStyle }) {

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isEditingUnlocked, setIsEditingUnlocked] = useState(false);

  const templates = [
    { id: "classic", title: "Classic", img: "/images/classic-template.jpeg" },
    { id: "professional", title: "Professional", img: "/images/professional-template.jpeg" },
    { id: "modern", title: "Modern", img: "/images/simple-1.png" },
    { id: "template4", title: "Creative Bold", img: "/images/simple-2.png" },
    { id: "template5", title: "Clean Professional", img: "/images/simple-3.png" },
    { id: "template6", title: "Template 6", img: "/images/simple-4.png" },
    { id: "template7", title: "Template 7", img: "/images/simple-5.png" },
    { id: "template8", title: "Template 8", img: "/images/simple-6.png" },
    { id: "template9", title: "Template 9", img: "/images/simple-7.png" },
    { id: "template10", title: "Template 10", img: "/images/simple-8.png" },
    { id: "template11", title: "Template 11", img: "/images/simple-9.png" },
    { id: "template12", title: "Template 12", img: "/images/simple-10.png" },
  ];

  const handleTemplateClick = (id) => {
    if (!isEditingUnlocked) {
      setShowPaymentModal(true);
      return;
    }
    setResumeStyle(id);
  };

  useEffect(() => {
    console.log("TemplatesPreview MOUNTED");
    return () => {
      console.log("TemplatesPreview UNMOUNTED");
    };
  }, []);

  useEffect(() => {
  if (showPaymentModal) {
    alert("Payment modal state is TRUE");
  }
}, [showPaymentModal]);


  return (


    <section className="templates-preview-section">

      {/* 🔝 Top Bar */}
<div
  className="template-topbar"
  contentEditable={false}
>
  <button
    onClick={(e) => {
      e.stopPropagation();
      e.preventDefault();
      setShowPaymentModal(true);
    }}
  >
    🔒 Editing: OFF
  </button>

  <img
    src="/avatar.png"
    onClick={(e) => {
      e.stopPropagation();
      e.preventDefault();
      setShowPaymentModal(true);
    }}
  />
</div>


      <h2 className="tp-heading">Choose a Resume Template</h2>
      <p className="tp-description">
        Pick a template style for your resume. You can switch templates anytime.
      </p>

      <div className="tp-grid">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            className={`tp-card ${resumeStyle === tpl.id ? "tp-active" : ""}`}
            onClick={() => handleTemplateClick(tpl.id)}
          >
            <img src={tpl.img} alt={tpl.title} className="tp-image" />
            <h3 className="tp-title">{tpl.title}</h3>
          </div>
        ))}
      </div>

      {/* 💳 Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          onSuccess={() => {
            setIsEditingUnlocked(true);
            setShowPaymentModal(false);
          }}
        />
      )}


      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "red",
          color: "white",
          padding: "20px",
          zIndex: 99999999
        }}
      >
        TEST MODAL BOX
      </div>

    </section>
  );
}
