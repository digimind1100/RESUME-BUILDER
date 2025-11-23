import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./components/Home";
import ResumeBuilder from "./components/ResumeBuilder";
import ResumeBuilderQR from "./components/ResumeBuilderQR";
import Templates from "./components/Templates";
import Templates10 from "./components/Templates10";
import CoverLetterPanel from "./components/CoverLetterPanel";
import PreviewPanelQRPage from "./components/PreviewPanelQRPage";

import NewTemplateModern from "./Templates/NewTemplateModern";
import NewTemplatesFormPanel from "./components/NewTemplatesFormPanel";

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/resume";

  // Global shared form state
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
  const [resumeStyle, setResumeStyle] = useState("classic"); // for professional templates

  const navigate = useNavigate();

  // Handle form submission from popup
  const handleModernFormSubmit = (data) => {
    setFormData(data);         // save user data
    navigate("/resume-modern"); // navigate to Modern Resume page
  };

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Unified Builder (Professional + Classic) */}
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

        {/* Optional Legacy Routes */}
        <Route path="/resume-classic" element={<ResumeBuilderQR />} />
        <Route path="/resume-professional" element={<ResumeBuilder />} />

        {/* Templates Pages */}
        <Route path="/templates" element={<Templates onSubmit={handleModernFormSubmit} setResumeStyle={setResumeStyle} />} />
        <Route path="/templates10" element={<Templates10 setResumeStyle={setResumeStyle} />} />

        {/* Cover Letter */}
        <Route path="/cover-letter" element={<CoverLetterPanel resumeStyle={resumeStyle} />} />

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

        {/* New Template Form */}
        <Route
          path="/new-template-form/:templateNumber"
          element={<NewTemplatesFormPanel onSubmit={handleModernFormSubmit} />}
        />

        {/* Modern Resume */}
        <Route
          path="/resume-modern"
          element={<NewTemplateModern data={formData} />}
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
