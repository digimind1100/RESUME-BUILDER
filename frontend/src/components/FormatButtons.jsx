// FormatButton.jsx
import React from "react";
import "./FormatButtons.css"; // Import the CSS file

export default function FormatButton() {
  const applyFormat = (command, value = null) => {
    try {
      // ⚠️ execCommand is deprecated but still works
      document.execCommand(command, false, value);
    } catch (err) {
      console.warn(`Formatting failed: ${command}`, err);
    }
  };

  return (
    <div className="format-buttons-container">
      {/* Font Style */}
      <button
        className="format-btn bold-btn"
        onClick={() => applyFormat("bold")}
        title="Bold"
      >
        B
      </button>
      <button
        className="format-btn italic-btn"
        onClick={() => applyFormat("italic")}
        title="Italic"
      >
        I
      </button>
      <button
        className="format-btn underline-btn"
        onClick={() => applyFormat("underline")}
        title="Underline"
      >
        U
      </button>

      {/* Font Size */}
      <select
        className="format-select font-size-select"
        onChange={(e) => applyFormat("fontSize", e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>
          Font Size
        </option>
        <option value="1">10px</option>
        <option value="2">13px</option>
        <option value="3">16px</option>
        <option value="4">18px</option>
        <option value="5">24px</option>
        <option value="6">32px</option>
        <option value="7">48px</option>
      </select>

      {/* Font Family */}
      <select
        className="format-select font-family-select"
        onChange={(e) => applyFormat("fontName", e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>
          Font Family
        </option>
        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
        <option value="Tahoma">Tahoma</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times New Roman</option>
      </select>
    </div>
  );
}
