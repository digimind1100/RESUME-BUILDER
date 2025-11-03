import React from "react";
import "./ThemeSelector.css";

export default function ThemeSelector({ onThemeChange }) {
  const themes = [
    { left: "#ffffffff", job: "#ffffff", text: "#000" }, // blue + gray
    { left: "#1EC340", job: "#070707", text: "#fff" }, // green + black
    { left: "#DD5025", job: "#DAD0D1", text: "#000" }, // orange + pinky gray
    { left: "#F8DC21", job: "#ffffff", text: "#000" }, // yellow + white
    { left: "#AF5731", job: "#F5D7BF", text: "#000" }, // brown + light pink
    // 5 custom extras
    { left: "#006D77", job: "#EDF6F9", text: "#000" }, // teal
    { left: "#8338EC", job: "#F3E8FF", text: "#000" }, // purple
    { left: "#FF006E", job: "#FFE5EC", text: "#000" }, // pink
    { left: "#3A86FF", job: "#E0EBFF", text: "#000" }, // sky blue
    { left: "#FFBE0B", job: "#FFF6E0", text: "#000" }, // golden yellow
  ];

  return (
    <div className="theme-selector">
      {themes.map((theme, index) => (
        <div
          key={index}
          className="theme-circle"
          style={{ backgroundColor: theme.left }}
          onClick={() => onThemeChange(theme)}
          title={`Theme ${index + 1}`}
        ></div>
      ))}
    </div>
  );
}
