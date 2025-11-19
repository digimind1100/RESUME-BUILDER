import React, { useState, useRef } from "react";
import "./CoverLetterPanel.css";

export default function CoverLetterPanel() {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [attentionName, setAttentionName] = useState("");
  const [yourName, setYourName] = useState("");

  const [startGreeting, setStartGreeting] = useState("Dear Hiring Manager,");
  const [endGreeting, setEndGreeting] = useState("Sincerely,");

  const [generatedText, setGeneratedText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const previewRef = useRef(null);

  const [selfIntro, setSelfIntro] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [experienceInput, setExperienceInput] = useState("");

  // Generate AI Cover Letter
  const handleGenerate = async () => {
    if (!companyName || !jobTitle || !yourName) {
      alert("Please fill in Company Name, Job Title, and Your Name");
      return;
    }

    setLoading(true); // start loading
    setGeneratedText(""); // clear previous text

    try {
      const res = await fetch("http://localhost:3001/api/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          jobTitle,
          attentionName,
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
    }

    setLoading(false); // stop loading
  };

  const execCommand = (cmd, value = null) => {
    document.execCommand(cmd, false, value);
    previewRef.current.focus();
  };

  const formattedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="cover-letter-page">
      <div className="cover-letter-container">

        {/* LEFT FORM PANEL */}
        <div className={`form-panel ${isEditing ? "locked" : ""}`}>
          <h2>Cover Letter Details</h2>

          <label>Company Name:</label>
          <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />

          <label>Job Title:</label>
          <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />

          <label>Attention Person Name:</label>
          <input type="text" value={attentionName} onChange={(e) => setAttentionName(e.target.value)} />

          <label>Your Name:</label>
          <input type="text" value={yourName} onChange={(e) => setYourName(e.target.value)} />

          <label>Start Greeting:</label>
          <input type="text" value={startGreeting} onChange={(e) => setStartGreeting(e.target.value)} />

          <label>End Greeting:</label>
          <input type="text" value={endGreeting} onChange={(e) => setEndGreeting(e.target.value)} />

          <label>Self Introduction (Short):</label>
          <textarea rows={3} value={selfIntro} onChange={(e) => setSelfIntro(e.target.value)} />

          <label>Some Important Skills:</label>
          <input type="text" value={skillsInput} onChange={(e) => setSkillsInput(e.target.value)} />

          <label>Some Important Experience:</label>
          <input type="text" value={experienceInput} onChange={(e) => setExperienceInput(e.target.value)} />

          <button className="generate-btn" onClick={handleGenerate} disabled={loading}>
            {loading ? "Generating..." : "Generate Cover Letter"}
          </button>
        </div>

        {/* RIGHT PREVIEW PANEL */}
        <div className="preview-panel">
          <div className="preview-btn">
            <div className="preview-buttons">
              <button className="download-btn">Download PDF</button>
              <button className="edit-lock-btn" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Lock Cover Letter" : "Edit Cover Letter"}
              </button>
            </div>

            {isEditing && (
              <div className="format-toolbar">
                <button onClick={() => execCommand("bold")}><b>B</b></button>
                <button onClick={() => execCommand("italic")}><i>I</i></button>
                <button onClick={() => execCommand("underline")}><u>U</u></button>

                <select onChange={(e) => execCommand("fontSize", e.target.value)} defaultValue="3">
                  <option value="2">12px</option>
                  <option value="3">14px</option>
                  <option value="4">16px</option>
                  <option value="5">18px</option>
                </select>

                <select onChange={(e) => execCommand("fontName", e.target.value)} defaultValue="Arial">
                  <option value="Arial">Arial</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Verdana">Verdana</option>
                </select>
              </div>
            )}
          </div>

          {/* A4 PREVIEW */}
          <div
            ref={previewRef}
            className="cover-letter-preview"
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            style={{
              width: "100%",
              maxWidth: "800px",
              minHeight: "1122px",
              padding: "40px",
              background: "white",
              fontFamily: "Arial, sans-serif",
              fontSize: "14px",
              lineHeight: "1.6",
              boxSizing: "border-box",
              margin: "0 auto",
              border: "1px solid #ccc",
              whiteSpace: "pre-line", // ✅ preserve line breaks
              overflow: "hidden",
            }}
          >
            {/* DATE TOP RIGHT */}
            <div className="cover-date" style={{ textAlign: "right", marginBottom: "25px" }}>
              {formattedDate}
            </div>

            {/* COMPANY NAME */}
            {companyName && <div className="company-block" style={{ marginBottom: "25px" }}>{companyName}</div>}

            {/* START GREETING */}
            <div className="cover-greeting" style={{ marginBottom: "20px" }}>
              {startGreeting}
            </div>

            {/* AI CONTENT */}
            <div className="cover-body" style={{ marginBottom: "30px" }}>
              {loading ? "Generating your cover letter..." : generatedText || "Your generated cover letter will appear here..."}
            </div>

            {/* END GREETING + NAME */}
            <div className="cover-ending" style={{ marginTop: "40px" }}>
              {endGreeting} <br />
              {yourName}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
