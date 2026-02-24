import React from "react";
import "./FreeBasicTemplate.css";

export default function FreeBasicTemplate({ resumeData }) {
  const {
    fullName,
    email,
    phone,
    address,
    jobTitle,
    summary,
    experience = []
  } = resumeData;

  return (
    <div className="free-template-wrapper">

      {/* WATERMARK */}
      <div className="watermark">
        ResumeBuilder.pk
      </div>

      {/* HEADER */}
      <div className="free-header">
        <h1>{fullName || "Your Name"}</h1>
        <p className="job-title">{jobTitle || "Your Job Title"}</p>
        <div className="contact-info">
          <span>{email}</span> | <span>{phone}</span> | <span>{address}</span>
        </div>
      </div>

      {/* SUMMARY */}
      {summary && (
        <div className="free-section">
          <h2>Profile</h2>
          <p>{summary}</p>
        </div>
      )}

      {/* WORK EXPERIENCE */}
      <div className="free-section">
        <h2>Work Experience</h2>

        {experience.length === 0 && (
          <p>No experience added yet.</p>
        )}

        {experience.map((exp, index) => (
          <div key={index} className="experience-item">
            <h3>{exp.jobRole || "Job Role"}</h3>
            <p className="company">
              {exp.company} | {exp.startDate} - {exp.endDate}
            </p>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>

    </div>
  );
}