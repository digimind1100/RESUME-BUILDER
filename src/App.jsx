import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./components/Home";
import ResumeBuilderPage from "./components/ResumeBuilderPage";
import Templates from "./components/Templates";
import CoverLetter from "./components/CoverLetter";
import PreviewPanelQRPage from "./components/PreviewPanelQRPage";

// NEW builder pages
import ResumeBuilderQR from "./components/ResumeBuilderQR";     // CLASSIC (QR)
import ResumeBuilder from "./components/ResumeBuilder";         // PROFESSIONAL

function AppContent() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/resume";

  const [formData, setFormData] = useState({});
  const [selectedEducations, setSelectedEducations] = useState([]);
  const [workExperiences, setWorkExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [theme, setTheme] = useState({
    left: "#ffffff",
    job: "#F4ECE1",
    text: "#000",
  });
  const [jobTitle, setJobTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [resumeStyle, setResumeStyle] = useState("Classic");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/resume"
          element={
            <ResumeBuilderPage
              formData={formData}
              setFormData={setFormData}
              selectedEducations={selectedEducations}
              setSelectedEducations={setSelectedEducations}
              workExperiences={workExperiences}
              setWorkExperiences={setWorkExperiences}
              skills={skills}
              setSkills={setSkills}
              theme={theme}
              setTheme={setTheme}
              jobTitle={jobTitle}
              setJobTitle={setJobTitle}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              resumeStyle={resumeStyle}
              setResumeStyle={setResumeStyle}
            />
          }
        />

        {/* NEW Routes */}
        <Route path="/resume-classic" element={<ResumeBuilderQR />} />
        <Route path="/resume-professional" element={<ResumeBuilder />} />

        <Route path="/templates" element={<Templates setResumeStyle={setResumeStyle} />} />
        <Route path="/cover-letter" element={<CoverLetter />} />

        <Route
          path="/preview-classic"
          element={
            <PreviewPanelQRPage
              formData={formData}
              selectedEducations={selectedEducations}
              workExperiences={workExperiences}
              skills={skills}
              theme={theme}
              jobTitle={jobTitle}
              isEditing={isEditing}
            />
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
