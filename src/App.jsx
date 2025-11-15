import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Templates from "./components/Templates";

import ResumeBuilderQR from "./components/ResumeBuilderQR";   
import ResumeBuilder from "./components/ResumeBuilder";      

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Templates />} />
        <Route path="/resume-classic" element={<ResumeBuilderQR />} />
        <Route path="/resume-professional" element={<ResumeBuilder />} />
      </Routes>
    </Router>
  );
}
