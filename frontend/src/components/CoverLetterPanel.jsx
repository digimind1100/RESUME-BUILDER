import React, { useState, useRef, useEffect } from "react";
import "./CoverLetterPanel.css";
import { downloadCoverLetterPDF } from "./downloadCoverLetterPDF";

export default function CoverLetterPanel() {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [yourName, setYourName] = useState("");

  const [startGreeting, setStartGreeting] = useState("Dear Hiring Manager,");
  const [endGreeting, setEndGreeting] = useState("Sincerely,");

  const [selfIntro, setSelfIntro] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [experienceInput, setExperienceInput] = useState("");

  const [generatedText, setGeneratedText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const previewRef = useRef(null);

  // ✅ Detect mobile ONCE
  const isMobile = window.innerWidth < 768;

  const formattedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 🔥 FORCE EXIT EDIT MODE ON MOBILE
  useEffect(() => {
    if (isMobile && previewRef.current) {
      previewRef.current.blur();
    }
  }, [isMobile]);

  const handleGenerate = async () => {
    if (!companyName || !jobTitle || !yourName) {
      alert("Please fill in Company Name, Job Title, and Your Name");
      return;
    }

    setIsLoading(true);
    setGeneratedText("");

    try {
      const res = await fetch("http://localhost:3001/api/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          jobTitle,
          yourName,
          selfIntro,
          skillsInput,
          experienceInput,
          startGreeting,
          endGreeting,
        }),
      });

      const data = await res.json();
      setGeneratedText(data.coverLetter || "Error generating cover letter.");
    } catch (error) {
      console.error(error);
      setGeneratedText("Error generating cover letter. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="cover-letter-page">
      <div className="cover-letter-container">

        {/* LEFT FORM PANEL */}
        <div className={`form-panel ${isEditing ? "locked" : ""}`}>
          <h2>Cover Letter Details</h2>

          <label>Company Name:</label>
          <input value={companyName} onChange={e => setCompanyName(e.target.value)} />

          <label>Job Title:</label>
          <input value={jobTitle} onChange={e => setJobTitle(e.target.value)} />

          <label>Your Name:</label>
          <input value={yourName} onChange={e => setYourName(e.target.value)} />

          <label>Start Greeting:</label>
          <input value={startGreeting} onChange={e => setStartGreeting(e.target.value)} />

          <label>End Greeting:</label>
          <input value={endGreeting} onChange={e => setEndGreeting(e.target.value)} />

          <label>Self Introduction:</label>
          <textarea rows={3} value={selfIntro} onChange={e => setSelfIntro(e.target.value)} />

          <label>Skills:</label>
          <input value={skillsInput} onChange={e => setSkillsInput(e.target.value)} />

          <label>Experience:</label>
          <input value={experienceInput} onChange={e => setExperienceInput(e.target.value)} />

          <button className="generate-btn" onClick={handleGenerate}>
            Generate Cover Letter
          </button>
        </div>

        {/* RIGHT PREVIEW PANEL */}
        <div className="preview-panel">

          <div className="preview-buttons">
            {!isMobile && isEditing && (
              <div className="format-toolbar">
                <button onClick={() => execCommand("bold")}><b>B</b></button>
                <button onClick={() => execCommand("italic")}><i>I</i></button>
                <button onClick={() => execCommand("underline")}><u>U</u></button>
              </div>
            )}

            <button
  className="download-btn"
  onClick={() =>
    downloadCoverLetterPDF({
      elementRef: previewRef,
      fileName: "Cover-Letter.pdf",
    })
  }
>
  Download PDF
</button>

            {!isMobile && (
              <button
                className="edit-lock-btn"
                onClick={() => setIsEditing(prev => !prev)}
              >
                {isEditing ? "Lock Cover Letter" : "Edit Cover Letter"}
              </button>
            )}
          </div>

          {/* PREVIEW */}
         <div
  ref={previewRef}
  className="cover-letter-preview"
  contentEditable={false}     // 🔒 HARD LOCK
  tabIndex={-1}               // 🔒 no focus = no editing toolbar
  style={{
    width: "100%",
    maxWidth: "210mm",
    minHeight: "276mm",
    padding: "40px",
    background: "white",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    lineHeight: "1.6",
    boxSizing: "border-box",
    margin: "0 auto",
    border: "1px solid #ccc",
    whiteSpace: "pre-line",
    userSelect: "text",
  }}
>


            <div style={{ textAlign: "right", marginBottom: "25px" }}>
              {formattedDate}
            </div>

            {isLoading
              ? "Generating..."
              : generatedText || "Your generated cover letter will appear here..."}
          </div>
        </div>
      </div>
    </div>
  );
}
