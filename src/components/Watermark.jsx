import React from "react";
import "./Watermark.css";
import logo from "../assets/templatelogo.png";

export default function Watermark({ show }) {
  if (!show) return null;

  return (
    <div className="resume-watermark">
      <img src={logo} alt="Watermark Logo" />
    </div>
  );
}
