import React from "react";
import "./PreviewPanel.css"; // ✅ reuse same CSS


export default function PreviewPanel2({ education, selectedEducations, setSelectedEducations, offset = 0 }) {
  const handleCheckboxChange = (globalIndex) => {
    if (selectedEducations.includes(globalIndex)) {
      setSelectedEducations(selectedEducations.filter((i) => i !== globalIndex));
    } else {
      setSelectedEducations([...selectedEducations, globalIndex]);
    }
  };
return (
    <div className="preview-panel">
      {/* Left Column */}
      <div className="preview-left">
      <h2 className="section-heading">Education (Page 2)</h2>
      {education.map((edu, index) => {
        const globalIndex = offset + index; // 👈 actual index maintain
        return (
          <div key={globalIndex} className="education-entry">
            <input
              type="checkbox"
              checked={selectedEducations.includes(globalIndex)}
              onChange={() => handleCheckboxChange(globalIndex)}
            />
            <div className="education-details">
              <p>{edu.school}</p>
              <p>{edu.degree}</p>
              <p>{edu.year}</p>
            </div>
          </div>
        );
      })}
    </div>
     {/* Right Column */}
      <div className="preview-right">
        <h3 className="section-heading">Work Experience</h3>
        <p>Coming soon...</p>
      </div>
    </div>

    
  );
}