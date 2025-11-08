import React from "react";

/**
 * Lightweight SVG mockup of a resume card.
 * Simple, responsive, and styled via inline SVG.
 */
export default function HeroMockup({ className = "", width = 420 }) {
  return (
    <svg
      className={className}
      width={width}
      viewBox="0 0 720 480"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Resume mockup illustration"
    >
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0" stopColor="#E6F0FA" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
        <filter id="f1" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="18" floodColor="#0f172a" floodOpacity="0.06"/>
        </filter>
      </defs>

      {/* Card shadow + background */}
      <g transform="translate(40,20)">
        <rect width="640" height="420" rx="14" fill="#fff" filter="url(#f1)"/>
        <rect x="0" y="0" width="640" height="140" rx="12" fill="#17639F"/>
        <rect x="20" y="20" width="220" height="40" rx="6" fill="#fff" opacity="0.95"/>

        {/* header text block */}
        <g transform="translate(260,28)">
          <rect x="0" y="0" width="320" height="18" rx="4" fill="#fff" opacity="0.95"/>
          <rect x="0" y="30" width="260" height="12" rx="4" fill="#ffffff" opacity="0.7"/>
        </g>

        {/* left column (avatar + lines) */}
        <g transform="translate(20,80)">
          <circle cx="50" cy="50" r="36" fill="#FFD" stroke="#fff" strokeWidth="4" />
          <rect x="110" y="10" width="110" height="14" rx="6" fill="#eef5fb"/>
          <rect x="110" y="34" width="180" height="10" rx="5" fill="#eef5fb" />
        </g>

        {/* right column details (lines) */}
        <g transform="translate(20,160)">
          <rect x="0" y="0" width="600" height="12" rx="6" fill="url(#g1)"/>
          <rect x="0" y="26" width="520" height="12" rx="6" fill="#f3f7fb"/>
          <rect x="0" y="52" width="580" height="12" rx="6" fill="#f3f7fb"/>
          <rect x="0" y="78" width="420" height="12" rx="6" fill="#f3f7fb"/>
        </g>

        {/* skill chips */}
        <g transform="translate(20,250)">
          <rect x="0" y="0" width="120" height="30" rx="6" fill="#fff2f0" stroke="#ffd6cf"/>
          <rect x="140" y="0" width="120" height="30" rx="6" fill="#eef7f0" stroke="#cffee1"/>
          <rect x="280" y="0" width="120" height="30" rx="6" fill="#eef3ff" stroke="#d5e3ff"/>
        </g>

        {/* small footer lines */}
        <g transform="translate(20,300)">
          <rect x="0" y="0" width="560" height="10" rx="5" fill="#f2f4f8"/>
          <rect x="0" y="20" width="420" height="10" rx="5" fill="#f2f4f8"/>
        </g>
      </g>

      {/* small accent mock card in front */}
      <g transform="translate(460,340) rotate(-6)">
        <rect width="160" height="100" rx="8" fill="#fff" stroke="#e6eef9"/>
        <rect x="12" y="12" width="136" height="12" rx="4" fill="#17639F"/>
        <rect x="12" y="36" width="110" height="10" rx="4" fill="#f3f7fb"/>
        <rect x="12" y="56" width="130" height="8" rx="4" fill="#f3f7fb"/>
      </g>
    </svg>
  );
}
