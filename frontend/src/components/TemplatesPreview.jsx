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
    { id: "modern", title: "Teacher Elite", img: "/images/simple-1.png" },
    { id: "template4", title: "Clean Professional", img: "/images/simple-2.png" },
    { id: "template5", title: "Creative Bold", img: "/images/simple-3.png" },
    { id: "template6", title: "Minimal Accent", img: "/images/simple-4.png" },
    { id: "template7", title: "Elegant Classic", img: "/images/simple-5.png" },
    { id: "template8", title: "Medical Elites", img: "/images/simple-6.png" },
    { id: "template9", title: "Engineer Elite", img: "/images/simple-7.png" },
    { id: "template10", title: "Soft-Tech", img: "/images/simple-8.png" },
    { id: "template11", title: "Data Analyst", img: "/images/simple-9.png" },
    { id: "template12", title: "Engineer Prime", img: "/images/simple-10.png" },
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



    </section>
  );
}
