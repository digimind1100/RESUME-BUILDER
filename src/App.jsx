import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./components/Home";
import ResumeBuilder from "./components/ResumeBuilder";         // Unified builder
import ResumeBuilderQR from "./components/ResumeBuilderQR";     // CLASSIC (QR)
import Templates from "./components/Templates";
import Templates10 from "./components/Templates10";
import CoverLetterPanel from "./components/CoverLetterPanel";
import PreviewPanelQRPage from "./components/PreviewPanelQRPage";

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/resume";

  // Shared state for builder
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

  const [resumeStyle, setResumeStyle] = useState("classic"); // default

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Unified Resume Builder */}
        <Route
          path="/resume/:templateId?"
          element={
            <ResumeBuilder
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

        {/* Legacy routes (optional) */}
        <Route path="/resume-classic" element={<ResumeBuilderQR />} />
        <Route path="/resume-professional" element={<ResumeBuilder />} />

        {/* Templates Pages */}
        <Route
          path="/templates"
          element={<Templates setResumeStyle={setResumeStyle} />}
        />
        <Route
          path="/templates10"
          element={<Templates10 setResumeStyle={setResumeStyle} />}
        />

        {/* Cover Letter */}
        <Route
          path="/cover-letter"
          element={<CoverLetterPanel resumeStyle={resumeStyle} />}
        />

        {/* Preview */}
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
