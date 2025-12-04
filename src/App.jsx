import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";



import Navbar from "./components/Navbar";
import HomePage from "./components/Home";
import ResumeBuilder from "./components/ResumeBuilder";
import ResumeBuilderQR from "./components/ResumeBuilderQR";
import Templates from "./components/Templates";
import CoverLetterPanel from "./components/CoverLetterPanel";
import PreviewPanelQRPage from "./components/PreviewPanelQRPage";
import CoverLetterPage from "./components/CoverLetterPage";

import NewTemplateModern from "./Templates/NewTemplateModern";
import CleanProfessional from "./Templates/CleanProfessional";
import CreativeBold from "./Templates/CreativeBold";
import MinimalAccent from "./Templates/MinimalAccent";
import ElegantClassic from "./Templates/ElegantClassic";
import MedicalElites from "./Templates/MedicalElite";
import EngineerElites from "./Templates/EngineerElite";
<<<<<<< HEAD
import SoftTech from "./Templates/SoftTech";
import DataElite from "./Templates/DataElite";
=======
import DataElite from "./Templates/DataElite";
import EngineerPrime from "./Templates/EngineerPrime";
>>>>>>> dd9e698 (add)


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


        {/* Cover letter */}
        <Route path="/cover-letter" element={<CoverLetterPanel />} />

        {/* Preview */}
        <Route path="/preview-classic" element={<PreviewPanelQRPage formData={formData} />} />

        <Route path="/resume-modern" element={<NewTemplateModern />} />
        <Route path="/clean-professional" element={<CleanProfessional />} />
        <Route path="/creative-bold" element={<CreativeBold />} />
         <Route path="/minimal-accent" element={<MinimalAccent />} />
       <Route path="/elegant-classic" element={<ElegantClassic />} />
       <Route path="/medical-elites" element={<MedicalElites />} />
       <Route path="/engineer-elites" element={<EngineerElites />} />
<<<<<<< HEAD
       <Route path="/soft-tech" element={<SoftTech />} />
       <Route path="/data-elite" element={<DataElite />} />
=======
       <Route path="/data-elite" element={<DataElite />} />
       <Route path="/engineer-prime" element={<EngineerPrime />} />
>>>>>>> dd9e698 (add)



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
