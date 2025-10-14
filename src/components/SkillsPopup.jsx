import React, { useEffect, useState } from "react";
import "./WorkExpPopup.css";

export default function SkillsPopup({ jobTitle, onClose, onSelect }) {
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (!jobTitle) return;

    const fetchSkills = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3001/api/suggest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "skills", jobTitle }),
        });

        const data = await res.json();
        console.log("✅ AI Skills response:", data);

        // Clean & set data
       // Clean & set data
if (data?.skills?.length) {
  setSkills(data.skills);
} else {
  setSkills(["No skills found. Try another Job Title."]);
}

      } catch (err) {
        console.error("❌ Error fetching AI skills:", err);
        setSkills(["Error fetching skills."]);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [jobTitle]);

  return (
    <div className="popup-overlay">
      <div className="popup-content" role="dialog" aria-modal="true" style={{ position: "relative" }}>
        <div className="popup-header">
          
          <button
          className="top-close-btn"
          onClick={() => {
            console.log("📌 Top-right close clicked");
            if (typeof onClose === "function") onClose();
          }}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            border: "none",
            background: "transparent",
            fontSize: "18px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ✖
        </button>
        <h3>AI Suggested Skills for "{jobTitle}"</h3>
        </div>

        {loading ? (
          <p>⏳ Fetching skills...</p>
        ) : (
          <ul className="popup-list">
            {skills.map((skill, idx) => {
              const cleanText = skill.replace(/^[-•\s]+/, ""); // remove bullet/dash if AI adds
              return (
                <li
                  key={idx}
                  className="suggestion-item"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onClick={() => {
                    const newSkill = {
                      id: Date.now() + idx,
                      text: cleanText,
                    };

                    console.log("👉 Popup selected skill:", newSkill);

                    if (typeof onSelect === "function") {
                      onSelect(newSkill);
                    }

                    // DO NOT close popup automatically
                  }}
                >
                  <span className="plus-btn" aria-hidden>
                    +
                  </span>
                  <span className="suggestion-text">{cleanText}</span>
                </li>
              );
            })}
          </ul>
        )}

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
