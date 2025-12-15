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
import CleanProfessional from "./Templates/CleanProfessional";
import CreativeBold from "./Templates/CreativeBold";
import MinimalAccent from "./Templates/MinimalAccent";
import ElegantClassic from "./Templates/ElegantClassic";
import MedicalElites from "./Templates/MedicalElite";
import EngineerElites from "./Templates/EngineerElite";
import SoftTech from "./Templates/SoftTech";
import EngineerPrime from "./Templates/EngineerPrime";
import DataElite from "./Templates/DataElite";
import AviationPro from "./Templates/AviationPro";
import TeacherElite from "./Templates/TeacherElite";
import BuilderGuard from "./components/guards/BuilderGuard";
import { Toaster } from "react-hot-toast";

import PaymentPage from "./components/payment/PaymentPage";





function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/resume";

  // Global form state
  const [formData, setFormData] = useState({});

  return (
    <>
      {!hideNavbar && <Navbar />}
<Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/payment" element={<PaymentPage />} />
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

        <Route path="/clean-professional" element={<CleanProfessional />} />
        <Route path="/creative-bold" element={<CreativeBold />} />
         <Route path="/minimal-accent" element={<MinimalAccent />} />
       <Route path="/elegant-classic" element={<ElegantClassic />} />
       <Route path="/medical-elites" element={<MedicalElites />} />
       <Route path="/engineer-elites" element={<EngineerElites />} />
       <Route path="/soft-tech" element={<SoftTech />} />

       <Route  path="/data-elite"element={<BuilderGuard><DataElite/> </BuilderGuard>} />
       
       <Route path="/engineer-prime" element={<EngineerPrime />} />
       <Route path="/aviation-pro" element={<AviationPro />} />
       <Route path="/teacher-elite" element={<TeacherElite />} />
      
    

        <Route path="/coverletter" element={<CoverLetterPage />} />
        <Route path="/coverletter-generator" element={<CoverLetterPanel />} />


        <Route path="/payment" element={<PaymentPage />} />



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