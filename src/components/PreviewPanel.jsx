import React, { useEffect, useRef, useState } from "react";
import "./PreviewPanel.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin } from "react-icons/fa";

const MAX_HEIGHT = 986; // usable height (1016 - 30)

export default function PreviewPanel({
  formData = {},
  selectedEducations = [],
  setSelectedEducations,
  handleCheckboxChange,
}) {
  const leftRef = useRef(null);
  const topSectionRef = useRef(null);

  const [page1Education, setPage1Education] = useState([]);
  const [page2Education, setPage2Education] = useState([]);
  const [pageBreakY, setPageBreakY] = useState(null);

  const localToggleCheckbox = (globalIndex) => {
    if (typeof handleCheckboxChange === "function") {
      handleCheckboxChange(globalIndex);
    } else if (typeof setSelectedEducations === "function") {
      setSelectedEducations((prev = []) =>
        prev.includes(globalIndex) ? prev.filter((i) => i !== globalIndex) : [...prev, globalIndex]
      );
    }
  };

  useEffect(() => {
    const eduList = Array.isArray(formData.education) ? formData.education : [];
    if (eduList.length === 0) {
      setPage1Education([]);
      setPage2Education([]);
      setPageBreakY(null);
      return;
    }

    const timer = setTimeout(() => {
      const leftEl = leftRef.current;
      const topEl = topSectionRef.current;
      if (!leftEl || !topEl) {
        setPage1Education(eduList.map((e, i) => ({ edu: e, idx: i })));
        setPage2Education([]);
        return;
      }

      const leftRect = leftEl.getBoundingClientRect();

      const leftStyle = window.getComputedStyle(leftEl);
      const paddingTop = parseFloat(leftStyle.paddingTop) || 0;
      const paddingRight = parseFloat(leftStyle.paddingRight) || 0;
      const paddingBottom = parseFloat(leftStyle.paddingBottom) || 0;
      const paddingLeft = parseFloat(leftStyle.paddingLeft) || 0;

      const tempDiv = document.createElement("div");
      tempDiv.style.position = "absolute";
      tempDiv.style.visibility = "hidden";
      tempDiv.style.width = `${Math.round(leftRect.width)}px`;
      tempDiv.style.padding = `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`;
      tempDiv.style.boxSizing = "border-box";
      tempDiv.style.left = "-9999px";
      tempDiv.style.top = "-9999px";
      document.body.appendChild(tempDiv);

      const topClone = topEl.cloneNode(true);
      topClone.querySelectorAll && topClone.querySelectorAll(".education-entry").forEach((n) => n.remove());
      tempDiv.appendChild(topClone);

      const fit = [];
      let overflow = [];

      for (let i = 0; i < eduList.length; i++) {
        const edu = eduList[i];
        const testEl = document.createElement("div");
        testEl.className = "education-entry border p-2 my-2 rounded";
        testEl.style.boxSizing = "border-box";
        testEl.innerHTML = `
          <input type="checkbox" style="display:none" />
          <div class="education-details">
            <p class="edu-school">${edu.school || ""}</p>
            <p class="edu-degree">${edu.degree || ""}</p>
            <p class="edu-year">${edu.year || ""}</p>
          </div>
        `;

        topClone.appendChild(testEl);

        const totalHeight = tempDiv.getBoundingClientRect().height;

        // ✅ compare with MAX_HEIGHT instead of leftHeight
        if (totalHeight <= MAX_HEIGHT) {
          fit.push({ edu, idx: i });
        } else {
          overflow = eduList.slice(i).map((e, j) => ({ edu: e, idx: i + j }));
          break;
        }
      }

      document.body.removeChild(tempDiv);

      setPage1Education(fit);
      setPage2Education(overflow);
      setPageBreakY(MAX_HEIGHT); // ✅ red line bottom se 15px upar
    }, 140);

    return () => clearTimeout(timer);
  }, [formData]);

  return (
    <>
      {/* PAGE 1 */}
      <div className="preview-section" style={{ position: "relative" }}>
        <div className="preview-left" ref={leftRef} style={{ boxSizing: "border-box", position: "relative" }}>
          {pageBreakY != null && (
            <div
              style={{
                pointerEvents: "none",
                position: "absolute",
                top: `${pageBreakY}px`,
                left: 0,
                right: 0,
                height: "2px",
                background: "red",
                zIndex: 9999,
                opacity: 0.6,
              }}
            />
          )}

          <div ref={topSectionRef}>
            <div className="profile-pic-wrapper">
              <img
                id="profilePicPreview"
                src={formData?.profilePic || "https://via.placeholder.com/120"}
                alt="Profile"
              />
            </div>

            <h2 className="preview-name">{formData?.fullName || "Your Name"}</h2>

            <div className="contact-info">
              <div className="icon-block">
                <FaEnvelope className="icon" />
                <p>{formData?.email || "your.email@example.com"}</p>
              </div>
              <div className="icon-block">
                <FaPhone className="icon" />
                <p>{formData?.phone || "+123 456 7890"}</p>
              </div>
              <div className="icon-block">
                <FaMapMarkerAlt className="icon" />
                <p>{formData?.address || "Street Address"}</p>
              </div>
              <div className="icon-block"><p>{formData?.city || "City / State"}</p></div>
              <div className="icon-block"><p>{formData?.country || "Country"}</p></div>
              <div className="icon-block">
                <FaLinkedin className="icon" />
                <p>{formData?.linkedin || "linkedin.com/in/username"}</p>
              </div>
            </div>

            <h3 className="section-heading">Date of Birth</h3>
            <p>{formData?.dob || "DD/MM/YYYY"}</p>

            <h3 className="section-heading">Education (Page 1)</h3>
          </div>

          {page1Education.map(({ edu, idx }) => (
            <div key={idx} className="education-entry border p-2 my-2 rounded">
              <input
                type="checkbox"
                checked={selectedEducations.includes(idx)}
                onChange={() => localToggleCheckbox(idx)}
              />
              <div className="education-details">
                <p className="edu-school">{edu.school}</p>
                <p className="edu-degree">{edu.degree}</p>
                <p className="edu-year">{edu.year}</p>
              </div>
            </div>
          ))}
          {page2Education.length > 0 && page1Education.length > 0 && (
  <div
    style={{
      marginTop: "20px",
      fontStyle: "italic",
      textAlign: "center",
      opacity: 0.7,
    }}
  >
    Continue on Page 2 →
  </div>
)}
        </div>

        <div className="preview-right">
          <h3 className="section-heading">Work Experience</h3>
          <p>Coming soon...</p>
        </div>
      </div>

      {/* PAGE 2 */}
      {page2Education.length > 0 && (
        <div className="preview-section mt-8" style={{ position: "relative" }}>
          <div className="preview-left" style={{ position: "relative" }}>
            <h3 className="section-heading">Education (Page 2)</h3>
            {page2Education.map(({ edu, idx }) => (
              <div key={idx} className="education-entry border p-2 my-2 rounded">
                <input
                  type="checkbox"
                  checked={selectedEducations.includes(idx)}
                  onChange={() => localToggleCheckbox(idx)}
                />
                <div className="education-details">
                  <p className="edu-school">{edu.school}</p>
                  <p className="edu-degree">{edu.degree}</p>
                  <p className="edu-year">{edu.year}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="preview-right">
            <h3 className="section-heading">Work Experience (Page 2)</h3>
            <p>Coming soon...</p>
          </div>
        </div>
      )}
    </>
  );
}
