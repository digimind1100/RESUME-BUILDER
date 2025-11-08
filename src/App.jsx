import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/Home";
import ResumeBuilderPage from "./components/ResumeBuilderPage";
import Templates from "./components/Templates";

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
