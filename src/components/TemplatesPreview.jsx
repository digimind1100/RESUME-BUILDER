import React from "react";
import './TemplatesPreview.css';

export default function TemplatesPreview({ resumeStyle, setResumeStyle }) {

  // List of 12 templates (replace image paths as needed)
  const templates = [
    { id: "classic", title: "Classic", img: "/images/classic-template.jpeg" },
    { id: "professional", title: "Professional", img: "/images/professional-template.jpeg" },
    { id: "modern", title: "Modern", img: "/images/modern-template.jpeg" },
    { id: "template4", title: "Creative Bold", img: "/images/CreativeBoldDesign.png" },
    { id: "template5", title: "Clean Professional", img: "/images/CleanProfessionalResume.png" },
    { id: "template6", title: "Template 6", img: "/images/template6.jpeg" },
    { id: "template7", title: "Template 7", img: "/images/template7.jpeg" },
    { id: "template8", title: "Template 8", img: "/images/template8.jpeg" },
    { id: "template9", title: "Template 9", img: "/images/template9.jpeg" },
    { id: "template10", title: "Template 10", img: "/images/template10.jpeg" },
    { id: "template11", title: "Template 11", img: "/images/template11.jpeg" },
    { id: "template12", title: "Template 12", img: "/images/template12.jpeg" },
  ];

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
            onClick={() => setResumeStyle(tpl.id)}
          >
            <img
              src={tpl.img}
              alt={tpl.title}
              className="tp-image"
            />
            <h3 className="tp-title">{tpl.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
