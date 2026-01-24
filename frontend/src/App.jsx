import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>HOME OK</h1>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
