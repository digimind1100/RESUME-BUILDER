import React, { useState, useRef } from "react";
import "./CoverLetterPanel.css";

export default function CoverLetterPanel() {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [attentionName, setAttentionName] = useState("");
  const [yourName, setYourName] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [isEditing, setIsEditing] = useState(false); // controls format panel
  const previewRef = useRef(null);

  // ✅ Generate cover letter from server
  const handleGenerate = async () => {
    if (!companyName || !jobTitle || !yourName) {
      alert("Please fill in Company Name, Job Title, and Your Name");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName, jobTitle, attentionName, yourName }),
      });

      const data = await res.json();
      setGeneratedText(data.coverLetter || "Error generating cover letter.");
    } catch (error) {
      console.error(error);
      setGeneratedText("Error generating cover letter. Please try again.");
    }
  };

  // ✅ Download PDF (placeholder)
  const handleDownload = () => {
    if (!previewRef.current) return;
    alert("Download PDF logic will go here.");
  };

  // ✅ Execute formatting commands
  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    previewRef.current.focus();
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
            onChange={(e) => setCompanyName(e.target.value)}
          />

          <label>Job Title:</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />

          <label>Attention Person Name:</label>
          <input
            type="text"
            value={attentionName}
            onChange={(e) => setAttentionName(e.target.value)}
          />

          <label>Your Name:</label>
          <input
            type="text"
            value={yourName}
            onChange={(e) => setYourName(e.target.value)}
          />

          <button className="generate-btn" onClick={handleGenerate}>
            Create Cover Letter
          </button>
        </div>

        {/* RIGHT PREVIEW PANEL */}
        <div className="preview-panel">
          {/* Top Buttons */}
          <div className="preview-btn">
            <div className="preview-buttons">
              <button className="download-btn" onClick={handleDownload}>
                Download PDF
              </button>

              <button
                className="edit-lock-btn"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Lock Cover Letter" : "Edit Cover Letter"}
              </button>
            </div>

            {/* Format Toolbar */}
            {isEditing && (
              <div className="format-toolbar">
                <button onClick={() => execCommand("bold")}>
                  <b>B</b>
                </button>
                <button onClick={() => execCommand("italic")}>
                  <i>I</i>
                </button>
                <button onClick={() => execCommand("underline")}>
                  <u>U</u>
                </button>

                <select
                  onChange={(e) => execCommand("fontSize", e.target.value)}
                  defaultValue="3"
                >
                  <option value="1">10px</option>
                  <option value="2">12px</option>
                  <option value="3">14px</option>
                  <option value="4">16px</option>
                  <option value="5">18px</option>
                  <option value="6">20px</option>
                  <option value="7">24px</option>
                </select>

                <select
                  onChange={(e) => execCommand("fontName", e.target.value)}
                  defaultValue="Arial"
                >
                  <option value="Arial">Arial</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Tahoma">Tahoma</option>
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
          >
            {generatedText || "Your generated cover letter will appear here..."}
          </div>
        </div>
      </div>
    </div>
  );
}
