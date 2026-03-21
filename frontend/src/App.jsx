import React, { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/Home";
import ResumeBuilder from "./components/ResumeBuilder";
import ResumeBuilderQR from "./components/ResumeBuilderQR";
import Templates from "./components/Templates";
import CoverLetterPanel from "./components/CoverLetterPanel";
import PreviewPanelQRPage from "./components/PreviewPanelQRPage";
import CoverLetterPage from "./components/CoverLetterPage";
import BuilderGuard from "./components/guards/BuilderGuard";
import { Toaster } from "react-hot-toast";
import Policies from "./components/Policies";
import Features from "./components/Features";
import Contact from "./components/Contact";
import AdminPendingPayments from "./components/admin/AdminPendingPayments";
import AdminGuard from "./components/admin/AdminGuard";
import { ReviewProvider } from "./context/ReviewContext";
import AdminReviews from "./components/admin/AdminReviews";
import ReviewsPage from "./components/ReviewsPage";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";
import Pricing from "./components/Pricing";
import ScrollToTop from "./components/ScrollToTop";
import NewResumeBuilder from "./components/NewResumeBuilder";

// ✅ NEW
import TemplatePage from "./Pages/TemplatePage";

function AppContent() {
  const location = useLocation();

  const [formData, setFormData] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <ReviewProvider user={user}>
        <Navbar />
        <ScrollToTop />
        <Toaster position="top-center" />

        <Routes>

          {/* ADMIN */}
          <Route
            path="/admin/payments"
            element={
              <AdminGuard>
                <AdminPendingPayments />
              </AdminGuard>
            }
          />
          <Route path="/admin/reviews" element={<AdminReviews />} />

          {/* HOME */}
          <Route path="/" element={<HomePage />} />

          {/* BUILDER */}
          <Route
            path="/resume/:templateId?"
            element={
              <ResumeBuilder
                formData={formData}
                setFormData={setFormData}
              />
            }
          />

          <Route path="/resume-classic" element={<ResumeBuilderQR />} />
          <Route path="/builder/:templateId" element={<NewResumeBuilder />} />

          {/* TEMPLATE LIST */}
          <Route path="/templates" element={<Templates />} />

          {/* 🔥 NEW TEMPLATE ROUTE (IMPORTANT) */}
          <Route
  path="/:id"
  element={<TemplatePage formData={formData} />}
/>

          {/* OTHER PAGES */}
          <Route path="/features" element={<Features />} />
          <Route path="/cover-letter" element={<CoverLetterPanel />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/reviews" element={<ReviewsPage />} />

          {/* PREVIEW */}
          <Route
            path="/preview-classic"
            element={<PreviewPanelQRPage formData={formData} />}
          />

          {/* COVER LETTER */}
          <Route path="/coverletter" element={<CoverLetterPage />} />
          <Route path="/coverletter-generator" element={<CoverLetterPanel />} />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </ReviewProvider>
    </>
  );
}

export default function App() {
  return <AppContent />;
}