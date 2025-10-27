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
        console.log("✅ AI Skills:", data);

        if (Array.isArray(data.skills) && data.skills.length > 0) {
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
      <div className="popup-content" style={{ position: "relative" }}>
        <button
          className="top-close-btn"
          onClick={onClose}
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

        {loading ? (
          <p>⏳ Fetching skills...</p>
        ) : (
          <ul className="popup-list">
            {skills.map((skill, idx) => {
              const cleanText =
                typeof skill === "string"
                  ? skill.replace(/^[-•\s]+/, "")
                  : skill.text || skill.title || "";

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
                      checked: false,
                    };
                    console.log("👉 Skill selected:", newSkill);
                    if (typeof onSelect === "function") {
                      onSelect(newSkill);
                    }
                    // DO NOT CLOSE POPUP
                  }}
                >
                  <span className="plus-btn">+</span>
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
