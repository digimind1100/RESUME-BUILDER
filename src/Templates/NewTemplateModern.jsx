import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./NewTemplateModern.css";

export default function NewTemplateModern() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state; // Get data passed from form submission

  // If no data, show message or redirect back
  if (!formData) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>No resume data found.</h2>
        <button onClick={() => navigate("/templates")} style={{ marginTop: "20px" }}>
          Back to Templates
        </button>
      </div>
    );
  }

  const handleEdit = () => navigate("/templates");
  const handleDownloadPDF = () => {
    // TODO: implement PDF download/export
    console.log("Download PDF clicked");
    alert("Download PDF functionality will be implemented here.");
  };

  return (
    <div className="modern-wrapper">

        
      {/* ================= TOP BUTTONS ================= */}
      <div className="main-container">
      <div className="modern-top-buttons">
        <button className="download-btn" onClick={handleDownloadPDF}>Download PDF</button>
        <button onClick={handleEdit}>Edit / Back to Templates</button>
      </div>

      <div className="modern-container">
        {/* ================= HEADER ================= */}
        <header className="modern-header">
          <h1 className="modern-name">{formData.fullName || "Your Name"}</h1>
          <p className="modern-job-title">{formData.jobTitle || "Job Title"}</p>

          <div className="modern-contact-row">
            <span>Email: {formData.email || "you@example.com"}</span>
            <span>Phone: {formData.phone || "+1 000 000 0000"}</span>
            <span>LinkedIn / Portfolio: {formData.linkedin || "-"}</span>
          </div>
        </header>

        {/* ================= SUMMARY ================= */}
        <section className="modern-section">
          <h2 className="modern-section-title">Professional Summary</h2>
          <p className="modern-summary-text">
            {formData.summary ||
              "Add a brief summary about yourself, your experience, and key skills."}
          </p>
        </section>

        {/* ================= SKILLS ================= */}
        <section className="modern-section">
          <h2 className="modern-section-title">Skills</h2>
          <ul className="modern-skill-list">
            {(formData.skills || ["Skill 1", "Skill 2", "Skill 3"]).map(
              (skill, idx) => (
                <li key={idx}>{skill}</li>
              )
            )}
          </ul>
        </section>

        {/* ================= EXPERIENCE ================= */}
        <section className="modern-section">
          <h2 className="modern-section-title">Work Experience</h2>
          {(formData.workExperiences || []).map((work, idx) => (
            <div key={idx} className="modern-experience-block">
              <div className="modern-exp-header">
                <h3>
                  {work.position || "Position"} – {work.company || "Company"}
                </h3>
                <span>{work.duration || "Start – End"}</span>
              </div>
              <p>{work.description || "Work description here."}</p>
            </div>
          ))}
        </section>

        {/* ================= EDUCATION ================= */}
        <section className="modern-section">
          <h2 className="modern-section-title">Education</h2>
          {(formData.education || []).map((edu, idx) => (
            <div key={idx} className="modern-edu-block">
              <h3>{edu.degree || "Degree"}</h3>
              <span>
                {edu.institution || "Institution"} – {edu.year || "Year"}
              </span>
            </div>
          ))}
        </section>
      </div>
      </div>
    </div>
  );
}
