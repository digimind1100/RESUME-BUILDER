import React, { useEffect, useRef } from "react";
import "./PreviewPanel.css";
import "./PreviewPanel2.css"

export default function PreviewPane2({
  formData,
  selectedEducations = [],   // ✅ default empty array
  setSelectedEducations = () => {},
  offset = 0,
}) {


  const educationRef = useRef(null);

  useEffect(() => {
    if (educationRef.current) {
      console.log("Education wrapper height (page2):", educationRef.current.offsetHeight);
    }
  }, [formData?.education]);

  const handleCheckboxChange = (globalIndex) => {
    setSelectedEducations(prev =>
      prev.includes(globalIndex) ? prev.filter(i => i !== globalIndex) : [...prev, globalIndex]
    );
  };

  return (
    <div
      className="preview-section"
<<<<<<< HEAD
      style={{ width: "794px", height: "1123px", margin: "24px auto" }}
=======
      style={{ width: "738px", height: "1040px", margin: "0 auto" }}
>>>>>>> 99a9e3f (add)
    >
      {/* Left Column: continued education */}
      <div className="preview-left">
        {/* keep profile circle empty or you can keep small placeholder */}
        

        <h2 className="preview-name"> {/* optional heading */} </h2>

        <div className="p-4">
          <h4 className="section-heading">Education (Continued)</h4>
          <div ref={educationRef} className="education-wrapper">
            {formData?.education && formData.education.length > 0 ? (
              formData.education.map((edu, idx) => {
                const globalIndex = offset + idx;
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
              })
            ) : (
              <p>No more education</p>
            )}
          </div>
        </div>
      </div>

      {/* Right Column left intentionally blank (but same width) */}
        {/* Right Column */}
      <div className="preview-right">
        <h3 className="section-heading">Work Experience</h3>
        <p>Coming soon...</p>
      </div>
    </div>
  );
}
