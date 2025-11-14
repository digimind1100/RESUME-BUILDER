import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/Home";
import ResumeBuilderPage from "./components/ResumeBuilderPage";
import Templates from "./components/Templates";
import CoverLetter from "./components/CoverLetter";
import ResumeBuilderQR from "./components/ResumeBuilderQR";

function AppContent() {
  const location = useLocation();

  // Hide Navbar on Resume Builder page
  const hideNavbar = location.pathname === "/resume";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resume" element={<ResumeBuilderPage />} />
        <Route path="/templates" element={<Templates />} />
         <Route path="/cover-letter" element={<CoverLetter />} />
      </Routes>

      <div className="min-h-screen bg-gray-50">
      <ResumeBuilderQR />
    </div>
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
