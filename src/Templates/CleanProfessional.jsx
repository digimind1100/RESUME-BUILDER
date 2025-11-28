import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CleanProfessional.css";

export default function CleanProfessional() {
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

  // Helper to render arrays safely
  const safeArray = (arr) => (Array.isArray(arr) ? arr : []);

  return (
    <div className="clean-wrapper">
      <div className="main-container">
        <div className="clean-top-buttons">
          <button className="download-btn" onClick={handleDownloadPDF}>Download PDF</button>
          <button onClick={handleEdit}>Edit / Back to Templates</button>
        </div>

        <div className="clean-container">
          {/* LEFT SIDEBAR */}
          <aside className="clean-left">
            <div className="left-inner">
              <div className="profile-photo">
                {/* show image if exists else initials */}
                {formData.photo ? (
                  <img src={formData.photo} alt="Profile" />
                ) : (
                  <div className="initials">
                    {(formData.fullName || "Your Name")
                      .split(" ")
                      .map((s) => s[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </div>
                )}
              </div>

              <h1 className="left-name">{formData.fullName || "Your Name"}</h1>
              <p className="left-role">{formData.jobTitle || "Job Title"}</p>

              <div className="left-section">
                <h3>Contact</h3>
                <ul className="contact-list">
                  <li><strong>Email:</strong> {formData.email || "you@example.com"}</li>
                  <li><strong>Phone:</strong> {formData.phone || "+1 000 000 0000"}</li>
                  <li><strong>Location:</strong> {formData.location || "City, Country"}</li>
                </ul>
              </div>

              <div className="left-section">
                <h3>Skills</h3>
                <ul className="skill-list">
                  {safeArray(formData.skills).length
                    ? safeArray(formData.skills).map((s, i) => <li key={i}>{s}</li>)
                    : ["Skill 1", "Skill 2", "Skill 3"].map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>

              <div className="left-section">
                <h3>Links</h3>
                <ul className="links-list">
                  {formData.linkedin && <li>LinkedIn: {formData.linkedin}</li>}
                  {formData.portfolio && <li>Portfolio: {formData.portfolio}</li>}
                </ul>
              </div>
            </div>
          </aside>

          {/* RIGHT MAIN */}
          <main className="clean-right">
            <header className="clean-header">
              <h2 className="clean-title">{formData.fullName || "Your Name"}</h2>
              <p className="clean-subtitle">{formData.jobTitle || "Job Title"}</p>
            </header>

            <section className="clean-section summary">
              <h4>Professional Summary</h4>
              <p>{formData.summary || "Add a brief summary about yourself, your experience, and key skills."}</p>
            </section>

            <section className="clean-section">
              <h4>Work Experience</h4>
              {safeArray(formData.workExperiences).length ? (
                safeArray(formData.workExperiences).map((w, idx) => (
                  <div className="work-item" key={idx}>
                    <div className="work-head">
                      <h5>{w.position || "Position"}</h5>
                      <span className="work-date">{w.duration || "Start - End"}</span>
                    </div>
                    <div className="work-company">{w.company || "Company"}</div>
                    <p className="work-desc">{w.description || "Work description here."}</p>
                  </div>
                ))
              ) : (
                <div className="work-item">
                  <div className="work-head">
                    <h5>Lead Project Manager – Company</h5>
                    <span className="work-date">2019 – Present</span>
                  </div>
                  <div className="work-company">Company</div>
                  <p className="work-desc">Managed cross-functional teams and delivered high-impact solutions.</p>
                </div>
              )}
            </section>

            <section className="clean-section">
              <h4>Education</h4>
              {safeArray(formData.education).length ? (
                safeArray(formData.education).map((e, i) => (
                  <div className="edu-item" key={i}>
                    <h5>{e.degree || "Degree"}</h5>
                    <span className="edu-date">{e.year || "Year"}</span>
                    <div className="edu-school">{e.institution || "Institution"}</div>
                  </div>
                ))
              ) : (
                <>
                  <div className="edu-item">
                    <h5>MBA – Institution</h5>
                    <span className="edu-date">2013 – 2015</span>
                    <div className="edu-school">Institution Name</div>
                  </div>
                </>
              )}
            </section>

            <section className="clean-section">
              <h4>Certifications & Awards</h4>
              <ul className="cert-list">
                {(safeArray(formData.certifications).length ? safeArray(formData.certifications) : ["Certification A", "Award B"]).map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
