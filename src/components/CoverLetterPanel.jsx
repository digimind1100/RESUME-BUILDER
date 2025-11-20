import React, { useState, useRef } from "react";
import "./CoverLetterPanel.css";

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

  const formattedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleGenerate = async () => {
    if (!companyName || !jobTitle || !yourName) {
      alert("Please fill in Company Name, Job Title, and Your Name");
      return;
    }

    setIsLoading(true);
    setGeneratedText(""); // clear previous content

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

  const execCommand = (cmd, value = null) => {
    document.execCommand(cmd, false, value);
    previewRef.current.focus();
  };

  const handleDownload = () => {
    alert("PDF download logic will go here.");
  };

  return (
    <div className="cover-letter-page">
      <div className="cover-letter-container">

        {/* LEFT FORM PANEL */}
        <div className={`form-panel ${isEditing ? "locked" : ""}`}>
          <h2>Cover Letter Details</h2>

          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            placeholder="e.g., Google, Microsoft"
            onChange={(e) => setCompanyName(e.target.value)}
          />

          <label>Job Title:</label>
          <input
            type="text"
            value={jobTitle}
            placeholder="e.g., Frontend Developer"
            onChange={(e) => setJobTitle(e.target.value)}
          />

          <label>Your Name:</label>
          <input
            type="text"
            value={yourName}
            placeholder="e.g., John Doe"
            onChange={(e) => setYourName(e.target.value)}
          />

          <label>Start Greeting:</label>
          <input
            type="text"
            value={startGreeting}
            placeholder="e.g., Dear Hiring Manager,"
            onChange={(e) => setStartGreeting(e.target.value)}
          />

          <label>End Greeting:</label>
          <input
            type="text"
            value={endGreeting}
            placeholder="e.g., Sincerely,"
            onChange={(e) => setEndGreeting(e.target.value)}
          />

          <label>Self Introduction (Short):</label>
          <textarea
            rows={3}
            value={selfIntro}
            placeholder="e.g., I am a frontend developer with 3 years experience..."
            onChange={(e) => setSelfIntro(e.target.value)}
          />

          <label>Some Important Skills:</label>
          <input
            type="text"
            value={skillsInput}
            placeholder="e.g., React, JavaScript, CSS"
            onChange={(e) => setSkillsInput(e.target.value)}
          />

          <label>Some Important Experience:</label>
          <input
            type="text"
            value={experienceInput}
            placeholder="e.g., Built e-commerce websites, landing pages, React+Tailwind projects"
            onChange={(e) => setExperienceInput(e.target.value)}
          />

          <button className="generate-btn" onClick={handleGenerate}>
            Generate Cover Letter
          </button>
        </div>

        {/* RIGHT PREVIEW PANEL */}
        <div className="preview-panel">
          <div className="preview-btn">
            <div className="preview-buttons">
              <button className="download-btn" onClick={handleDownload}>Download PDF</button>
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

          {/* Cover Letter Preview */}
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
              overflow: "hidden",
              whiteSpace: "pre-line",
              position: "relative"
            }}
          >
            {/* Date Top Right */}
            <div style={{ textAlign: "right", marginBottom: "25px" }}>
              {formattedDate}
            </div>

            {/* Loading Spinner */}
            {isLoading && (
              <div className="spinner-container">
                <div className="spinner"></div>
                <div style={{ marginTop: "10px", textAlign: "center", fontStyle: "italic" }}>Generating...</div>
              </div>
            )}

            {/* AI Generated Cover Letter */}
            {!isLoading && (generatedText || "Your generated cover letter will appear here...")}
          </div>
        </div>
      </div>
    </div>
  );
}
