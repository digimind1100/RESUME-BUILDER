import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CleanProfessional.css";

export default function CleanProfessional() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialState = location.state || JSON.parse(localStorage.getItem("cleanProfessionalData")) || {
    fullName: "Anthony Roberts",
    jobTitle: "Senior Project Manager",
    summary:
      "Experienced project manager with a proven track record delivering complex projects on time and within budget.",
    email: "anthony.rob erta@email.com",
    phone: "+1 254-878-9700",
    location: "New York, NY",
    linkedin: "linkedin.com/in/anthonyroberts",
    photo: null, // dataURL
    skills: ["Project Planning & Execution", "Risk Management", "Budget Management"],
    workExperiences: [
      { position: "Senior Project Manager", company: "Company Name", duration: "2018 - Present", bullets: ["Managed cross-functional teams.", "Delivered enterprise software releases."] },
      { position: "Project Manager", company: "Company Name", duration: "2014 - 2018", bullets: ["Planned projects", "Coordinated resources"] }
    ],
    education: [
      { degree: "Master of Business Administration", institution: "Institution", year: "2011" },
      { degree: "Bachelor of Science in Business Management", institution: "Institution", year: "2008" }
    ],
    certifications: ["Certification A"]
  };

  const [data, setData] = useState(initialState);
  const fileInputRef = useRef(null);

  // persist to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("cleanProfessionalData", JSON.stringify(data));
  }, [data]);

  // helper: update top-level field
  const updateField = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  // skills handlers
  const addSkill = () => setData((p) => ({ ...p, skills: [...(p.skills || []), "New Skill"] }));
  const updateSkill = (idx, value) =>
    setData((p) => ({ ...p, skills: p.skills.map((s, i) => (i === idx ? value : s)) }));
  const removeSkill = (idx) => setData((p) => ({ ...p, skills: p.skills.filter((_, i) => i !== idx) }));

  // experience handlers
  const addExperience = () =>
    setData((p) => ({ ...p, workExperiences: [...(p.workExperiences || []), { position: "New Position", company: "Company", duration: "Year - Year", bullets: ["Responsibility 1"] }] }));
  const removeExperience = (idx) =>
    setData((p) => ({ ...p, workExperiences: p.workExperiences.filter((_, i) => i !== idx) }));
  const updateExperienceField = (idx, field, value) =>
    setData((p) => ({ ...p, workExperiences: p.workExperiences.map((w, i) => (i === idx ? { ...w, [field]: value } : w)) }));
  const addExperienceBullet = (idx) =>
    setData((p) => ({ ...p, workExperiences: p.workExperiences.map((w, i) => (i === idx ? { ...w, bullets: [...(w.bullets||[]), "New bullet"] } : w)) }));
  const updateExperienceBullet = (wIdx, bIdx, value) =>
    setData((p) => ({ ...p, workExperiences: p.workExperiences.map((w, i) => (i === wIdx ? { ...w, bullets: w.bullets.map((b, bi) => (bi === bIdx ? value : b)) } : w)) }));
  const removeExperienceBullet = (wIdx, bIdx) =>
    setData((p) => ({ ...p, workExperiences: p.workExperiences.map((w, i) => (i === wIdx ? { ...w, bullets: w.bullets.filter((_, bi) => bi !== bIdx) } : w)) }));

  // education handlers
  const addEducation = () =>
    setData((p) => ({ ...p, education: [...(p.education || []), { degree: "New Degree", institution: "Institution", year: "" }] }));
  const removeEducation = (idx) => setData((p) => ({ ...p, education: p.education.filter((_, i) => i !== idx) }));
  const updateEducationField = (idx, field, value) => setData((p) => ({ ...p, education: p.education.map((e, i) => (i === idx ? { ...e, [field]: value } : e)) }));

  // certifications
  const addCertification = () => setData((p) => ({ ...p, certifications: [...(p.certifications||[]), "New Certification"] }));
  const updateCertification = (idx, value) => setData((p) => ({ ...p, certifications: p.certifications.map((c, i) => (i === idx ? value : c)) }));
  const removeCertification = (idx) => setData((p) => ({ ...p, certifications: p.certifications.filter((_, i) => i !== idx) }));

  // photo upload
  const triggerPhoto = () => fileInputRef.current && fileInputRef.current.click();
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      updateField("photo", ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  // download (simple print for now)
  const handleDownloadPDF = () => {
    // you can later replace with react-to-print or html2pdf
    window.print();
  };

  // reset to defaults
  const handleReset = () => {
    if (!window.confirm("Reset to default content?")) return;
    localStorage.removeItem("cleanProfessionalData");
    setData(initialState);
  };

  // small helpers for contentEditable change
  const handleContentEdit = (key, e) => {
    updateField(key, e.target.innerText);
  };

  const safeArray = (arr) => (Array.isArray(arr) ? arr : []);

  return (
    <div className="clean-wrapper editable-mode">
      <div className="main-container">
        <div className="clean-top-buttons">
          <button className="download-btn" onClick={handleDownloadPDF}>Download PDF</button>
          <button onClick={() => navigate("/templates")}>Back to Templates</button>
          <button onClick={handleReset} className="muted">Reset</button>
        </div>

        <div className="clean-container" id="print-area">
          {/* LEFT SIDEBAR */}
          <aside className="clean-left">
            <div className="left-inner">
              <div className="profile-photo" onClick={triggerPhoto} title="Click to upload photo">
                {data.photo ? <img src={data.photo} alt="Profile" /> : <div className="initials">
                  {(data.fullName || "Your Name").split(" ").map(n => n[0]).slice(0,2).join("").toUpperCase()}
                </div>}
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} />
              </div>

              <div
                className="left-name editable"
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => handleContentEdit("fullName", e)}
                aria-label="Full name"
              >
                {data.fullName}
              </div>

              <div
                className="left-role editable"
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => handleContentEdit("jobTitle", e)}
                aria-label="Job title"
              >
                {data.jobTitle}
              </div>

              <div className="left-section">
                <h3>Contact</h3>
                <ul className="contact-list">
                  <li><strong>Phone:</strong> <span contentEditable suppressContentEditableWarning onInput={(e)=>updateField("phone", e.target.innerText)}>{data.phone}</span></li>
                  <li><strong>Email:</strong> <span contentEditable suppressContentEditableWarning onInput={(e)=>updateField("email", e.target.innerText)}>{data.email}</span></li>
                  <li><strong>Location:</strong> <span contentEditable suppressContentEditableWarning onInput={(e)=>updateField("location", e.target.innerText)}>{data.location}</span></li>
                  <li><strong>LinkedIn:</strong> <span contentEditable suppressContentEditableWarning onInput={(e)=>updateField("linkedin", e.target.innerText)}>{data.linkedin}</span></li>
                </ul>
              </div>

              <div className="left-section">
                <h3>Skills <button className="small-btn" onClick={addSkill} title="Add skill">+</button></h3>
                <ul className="skill-list">
                  {safeArray(data.skills).map((s, i) => (
                    <li key={i}>
                      <span contentEditable suppressContentEditableWarning onInput={(e)=>updateSkill(i, e.target.innerText)}>{s}</span>
                      <button className="tiny-remove" onClick={()=>removeSkill(i)} title="Remove">✕</button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="left-section">
                <h3>Certifications <button className="small-btn" onClick={addCertification}>+</button></h3>
                <ul className="links-list">
                  {safeArray(data.certifications).map((c, i) => (
                    <li key={i}>
                      <span contentEditable suppressContentEditableWarning onInput={(e)=>updateCertification(i, e.target.innerText)}>{c}</span>
                      <button className="tiny-remove" onClick={()=>removeCertification(i)}>✕</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* RIGHT MAIN */}
          <main className="clean-right">
            <header className="clean-header">
              <h2 className="clean-title" contentEditable suppressContentEditableWarning onInput={(e)=>handleContentEdit("fullName", e)}>{data.fullName}</h2>
              <p className="clean-subtitle" contentEditable suppressContentEditableWarning onInput={(e)=>handleContentEdit("jobTitle", e)}>{data.jobTitle}</p>
            </header>

            <section className="clean-section summary">
              <h4>Profile Summary</h4>
              <p contentEditable suppressContentEditableWarning onInput={(e)=>handleContentEdit("summary", e)}>{data.summary}</p>
            </section>

            <section className="clean-section">
              <div className="section-head">
                <h4>Experience</h4>
                <button className="small-btn" onClick={addExperience}>+ Add</button>
              </div>

              {safeArray(data.workExperiences).map((w, idx) => (
                <div className="work-item" key={idx}>
                  <div className="work-head">
                    <h5 contentEditable suppressContentEditableWarning onInput={(e)=>updateExperienceField(idx, "position", e.target.innerText)}>{w.position}</h5>
                    <span className="work-date" contentEditable suppressContentEditableWarning onInput={(e)=>updateExperienceField(idx, "duration", e.target.innerText)}>{w.duration}</span>
                  </div>

                  <div className="work-company" contentEditable suppressContentEditableWarning onInput={(e)=>updateExperienceField(idx, "company", e.target.innerText)}>{w.company}</div>

                  <ul className="work-bullets">
                    {safeArray(w.bullets).map((b, bi) => (
                      <li key={bi}>
                        <span contentEditable suppressContentEditableWarning onInput={(e)=>updateExperienceBullet(idx, bi, e.target.innerText)}>{b}</span>
                        <button className="tiny-remove" onClick={()=>removeExperienceBullet(idx, bi)}>✕</button>
                      </li>
                    ))}
                  </ul>

                  <div className="work-actions">
                    <button className="tiny-btn" onClick={()=>addExperienceBullet(idx)}>+ Bullet</button>
                    <button className="tiny-remove" onClick={()=>removeExperience(idx)}>Remove Experience</button>
                  </div>
                </div>
              ))}
            </section>

            <section className="clean-section">
              <div className="section-head">
                <h4>Education</h4>
                <button className="small-btn" onClick={addEducation}>+ Add</button>
              </div>

              {safeArray(data.education).map((edu, i) => (
                <div className="edu-item" key={i}>
                  <h5 contentEditable suppressContentEditableWarning onInput={(e)=>updateEducationField(i, "degree", e.target.innerText)}>{edu.degree}</h5>
                  <span className="edu-date" contentEditable suppressContentEditableWarning onInput={(e)=>updateEducationField(i, "year", e.target.innerText)}>{edu.year}</span>
                  <div className="edu-school" contentEditable suppressContentEditableWarning onInput={(e)=>updateEducationField(i, "institution", e.target.innerText)}>{edu.institution}</div>
                  <div className="work-actions">
                    <button className="tiny-remove" onClick={()=>removeEducation(i)}>Remove</button>
                  </div>
                </div>
              ))}
            </section>

            <section className="clean-section">
              <h4>Certifications & Awards</h4>
              <ul className="cert-list">
                {safeArray(data.certifications).map((c, i) => (
                  <li key={i}>
                    <span contentEditable suppressContentEditableWarning onInput={(e)=>updateCertification(i, e.target.innerText)}>{c}</span>
                    <button className="tiny-remove" onClick={()=>removeCertification(i)}>✕</button>
                  </li>
                ))}
              </ul>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
