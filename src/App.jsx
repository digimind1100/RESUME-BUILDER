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
import CleanProfessional from "./Templates/CleanProfessional"; 

import CoverLetterPage from "./components/CoverLetterPage";

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/resume";

  // Global form state
  const [formData, setFormData] = useState({});

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Unified builder */}
        <Route
          path="/resume/:templateId?"
          element={<ResumeBuilder formData={formData} setFormData={setFormData} />}
        />
        <Route path="/resume-classic" element={<ResumeBuilderQR />} />
        <Route path="/resume-professional" element={<ResumeBuilder />} />

        {/* Templates */}
        <Route path="/templates" element={<Templates />} />
        <Route path="/templates10" element={<Templates10 />} />

        {/* Cover letter */}
        <Route path="/cover-letter" element={<CoverLetterPanel />} />

        {/* Preview */}
        <Route path="/preview-classic" element={<PreviewPanelQRPage formData={formData} />} />

        {/* New Templates Form */}
        <Route
          path="/new-template-form"
          element={<NewTemplatesFormPanel />}
        />
       <Route path="/resume-modern" element={<NewTemplateModern />} />
<Route path="/clean-professional" element={<CleanProfessional />} />



         <Route path="/coverletter" element={<CoverLetterPage />} />
     <Route path="/coverletter-generator" element={<CoverLetterPanel />} />



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
