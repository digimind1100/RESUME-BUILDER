import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/Home";
import ResumeBuilder from "./components/ResumeBuilder";
import ResumeBuilderQR from "./components/ResumeBuilderQR";
import Templates from "./components/Templates";
import CoverLetterPanel from "./components/CoverLetterPanel";
import PreviewPanelQRPage from "./components/PreviewPanelQRPage";
import CoverLetterPage from "./components/CoverLetterPage";
import CleanProfessional from "./Template/CleanProfessional/CleanProfessional";
import CreativeBold from "./Template/CreativeBold/CreativeBold";
import MinimalAccent from "./Template/MinimalAccent/MinimalAccent";
import ElegantClassic from "./Template/ElegantClassic/ElegantClassic";
import MedicalElites from "./Template/MedicalElite/MedicalElite";
import EngineerElites from "./Template/EngineerElite/EngineerElite";
import SoftTech from "./Template/SoftTech/SoftTech";
import EngineerPrime from "./Template/EngineerPrime/EngineerPrime";
import DataElite from "./Template/DataElite/DataElite";
import AviationPro from "./Template/AviationPro/AviationPro";
import TeacherElite from "./Template/TeacherElite/TeacherElite";
import BuilderGuard from "./components/guards/BuilderGuard";
import { Toaster } from "react-hot-toast";
import Policies from "./components/Policies";
import Features from "./components/Features";
import Contact from "./components/Contact";
import AdminPendingPayments from "./components/admin/AdminPendingPayments";
import AdminGuard from "./components/admin/AdminGuard";
import AdminReviews from "./components/admin/AdminReviews";
import ReviewsPage from "./components/ReviewsPage";
import BlogPost from "./pages/BlogPost";
import HomePageCvMaker from "./pages/HomePageCvMaker";
import HomePageAiResumeBuilder from "./pages/HomePageAiResumeBuilder";
import HomePageResumeBuilder from "./pages/HomePageResumeBuilder";
import HomePageCoverLetterBuilder from "./pages/HomePageCoverLetterBuilder";
import Pricing from "./components/Pricing";
import ScrollToTop from "./components/ScrollToTop";
import TestPagination from "./Template/TestPagination/TestPagination";
import FlorenceClassic from "./Template/FlorenceClassic/FlorenceClassic";
import Blog from "./pages/Blog";
import BestCvFormatForFreshers from "./blogs/BestCvFormatForFreshers";
import HowToMakeAtsFriendlyResume from "./blogs/HowToMakeAtsFriendlyResume";
import SoftwareEngineerResume2026 from "./blogs/SoftwareEngineerResume2026";
import AccountantResume2026 from "./blogs/AccountantResume2026";
import TeacherResume2026 from "./blogs/TeacherResume2026";
import SalesExecutiveResume2026 from "./blogs/SalesExecutiveResume2026";
import GraphicDesignerResume2026 from "./blogs/GraphicDesignerResume2026";
import CustomerServiceResume2026 from "./blogs/CustomerServiceResume2026";
import HrManagerResume2026 from "./blogs/HrManagerResume2026";
import TextileMerchandiserResume2026 from "./blogs/TextileMerchandiserResume2026";
import ProductionManagerResume2026 from "./blogs/ProductionManagerResume2026";
import DataEntryOperatorResume2026 from "./blogs/DataEntryOperatorResume2026";
import BankJobCvFormatPakistan2026 from "./blogs/BankJobCvFormatPakistan2026";
import HowToWriteWorkExperienceResume from "./blogs/HowToWriteWorkExperienceResume";
import BestSkillsForResume2026 from "./blogs/BestSkillsForResume2026";
import HowToWriteProfessionalSummary from "./blogs/HowToWriteProfessionalSummary";
import AtsResumeGuide from "./blogs/AtsResumeGuide";
import ResumeMistakesToAvoid2026 from "./blogs/ResumeMistakesToAvoid2026";
import HowToWriteAchievementsResume from "./blogs/HowToWriteAchievementsResume";
import OnePageVsTwoPageResume from "./blogs/OnePageVsTwoPageResume";
import ResumeChecklistBeforeApplying from "./blogs/ResumeChecklistBeforeApplying";
import HowToWriteCoverLetter from "./blogs/HowToWriteCoverLetter";
import AtsKeywordsForResumes from "./blogs/AtsKeywordsForResumes";


function AppContent() {
  const location = useLocation();
  // Global form state
  const [formData, setFormData] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  const isLocal = import.meta.env.DEV;



  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Toaster position="top-center" />
      <Routes>
        <Route
          path="/data-elite"
          element={
            <BuilderGuard>
              <DataElite />
            </BuilderGuard>
          }
        />

        <Route
          path="/data-:templateId"
          element={
            <TestPagination
              isEditable={isLocal}
              isLocal={isLocal}
            />
          }
        />

        <Route
          path="/admin/payments"
          element={
            <AdminGuard>
              <AdminPendingPayments />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/review"
          element={
            <AdminGuard>
              <AdminReviews />
            </AdminGuard>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <AdminGuard>
              <AdminReviews />
            </AdminGuard>
          }
        />
        <Route path="/" element={<HomePage />} />
        <Route path="/cv-maker" element={<HomePageCvMaker />} />
        <Route path="/ai-resume-builder" element={<HomePageAiResumeBuilder />} />
        <Route path="/resume-builder" element={<HomePageResumeBuilder />} />
        <Route path="/cover-letter-builder" element={<HomePageCoverLetterBuilder />} />
        {/* Unified builder */}
        <Route
          path="/resume/:templateId?"
          element={<ResumeBuilder formData={formData} setFormData={setFormData} />}
        />
        <Route path="/resume-classic" element={<ResumeBuilderQR />} />

        {/* Templates */}
        <Route path="/templates" element={<Templates />} />
        <Route path="/cv-maker/templates" element={<Templates />} />
        <Route path="/ai-resume-builder/templates" element={<Templates />} />
        <Route path="/resume-builder/templates" element={<Templates />} />
        <Route path="/cover-letter-builder/templates" element={<Templates />} />

        <Route path="/features" element={<Features />} />
        <Route path="/cv-maker/features" element={<Features />} />
        <Route path="/ai-resume-builder/features" element={<Features />} />
        <Route path="/resume-builder/features" element={<Features />} />
        <Route path="/cover-letter-builder/features" element={<Features />} />

        {/* Cover letter */}
        <Route path="/cover-letter" element={<CoverLetterPanel />} />
        <Route path="/cv-maker/cover-letter" element={<CoverLetterPanel />} />
        <Route path="/ai-resume-builder/cover-letter" element={<CoverLetterPanel />} />
        <Route path="/resume-builder/cover-letter" element={<CoverLetterPanel />} />
        <Route path="/cover-letter-builder/cover-letter" element={<CoverLetterPanel />} />

        {/* Terms & policies */}
        <Route path="/policies" element={<Policies />} />
        <Route path="/cv-maker/policies" element={<Policies />} />
        <Route path="/ai-resume-builder/policies" element={<Policies />} />
        <Route path="/resume-builder/policies" element={<Policies />} />
        <Route path="/cover-letter-builder/policies" element={<Policies />} />

        {/* Contact */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/cv-maker/contact" element={<Contact />} />
        <Route path="/ai-resume-builder/contact" element={<Contact />} />
        <Route path="/resume-builder/contact" element={<Contact />} />
        <Route path="/cover-letter-builder/contact" element={<Contact />} />

        <Route path="/blog" element={<Blog />} />
        <Route path="/cv-maker/blog" element={<Blog />} />
        <Route path="/ai-resume-builder/blog" element={<Blog />} />
        <Route path="/resume-builder/blog" element={<Blog />} />
        <Route path="/cover-letter-builder/blog" element={<Blog />} />
        <Route
          path="/blog/best-cv-format-for-freshers-in-pakistan-2026"
          element={<BestCvFormatForFreshers />}
        />
        <Route
          path="/cv-maker/blog/best-cv-format-for-freshers-in-pakistan-2026"
          element={<BestCvFormatForFreshers />}
        />
        <Route
          path="/ai-resume-builder/blog/best-cv-format-for-freshers-in-pakistan-2026"
          element={<BestCvFormatForFreshers />}
        />
        <Route
          path="/resume-builder/blog/best-cv-format-for-freshers-in-pakistan-2026"
          element={<BestCvFormatForFreshers />}
        />
        <Route
          path="/cover-letter-builder/blog/best-cv-format-for-freshers-in-pakistan-2026"
          element={<BestCvFormatForFreshers />}
        />
        <Route
          path="/blog/how-to-make-ats-friendly-resume-in-pakistan-2026"
          element={<HowToMakeAtsFriendlyResume />}
        />
        <Route
          path="/cv-maker/blog/how-to-make-ats-friendly-resume-in-pakistan-2026"
          element={<HowToMakeAtsFriendlyResume />}
        />
        <Route
          path="/ai-resume-builder/blog/how-to-make-ats-friendly-resume-in-pakistan-2026"
          element={<HowToMakeAtsFriendlyResume />}
        />
        <Route
          path="/resume-builder/blog/how-to-make-ats-friendly-resume-in-pakistan-2026"
          element={<HowToMakeAtsFriendlyResume />}
        />
        <Route
          path="/cover-letter-builder/blog/how-to-make-ats-friendly-resume-in-pakistan-2026"
          element={<HowToMakeAtsFriendlyResume />}
        />
        <Route
          path="/blog/software-engineer-resume-example-2026"
          element={<SoftwareEngineerResume2026 />}
        />
        <Route
          path="/cv-maker/blog/software-engineer-resume-example-2026"
          element={<SoftwareEngineerResume2026 />}
        />
        <Route
          path="/ai-resume-builder/blog/software-engineer-resume-example-2026"
          element={<SoftwareEngineerResume2026 />}
        />
        <Route
          path="/resume-builder/blog/software-engineer-resume-example-2026"
          element={<SoftwareEngineerResume2026 />}
        />
        <Route
          path="/cover-letter-builder/blog/software-engineer-resume-example-2026"
          element={<SoftwareEngineerResume2026 />}
        />
        <Route
          path="/blog/accountant-resume-example-2026"
          element={<AccountantResume2026 />}
        />
        <Route
          path="/cv-maker/blog/accountant-resume-example-2026"
          element={<AccountantResume2026 />}
        />
        <Route
          path="/ai-resume-builder/blog/accountant-resume-example-2026"
          element={<AccountantResume2026 />}
        />
        <Route
          path="/resume-builder/blog/accountant-resume-example-2026"
          element={<AccountantResume2026 />}
        />
        <Route
          path="/cover-letter-builder/blog/accountant-resume-example-2026"
          element={<AccountantResume2026 />}
        />
        <Route
          path="/blog/teacher-resume-example-2026"
          element={<TeacherResume2026 />}
        />
        <Route
          path="/cv-maker/blog/teacher-resume-example-2026"
          element={<TeacherResume2026 />}
        />
        <Route
          path="/ai-resume-builder/blog/teacher-resume-example-2026"
          element={<TeacherResume2026 />}
        />
        <Route
          path="/resume-builder/blog/teacher-resume-example-2026"
          element={<TeacherResume2026 />}
        />
        <Route
          path="/cover-letter-builder/blog/teacher-resume-example-2026"
          element={<TeacherResume2026 />}
        />
        <Route
          path="/blog/sales-executive-resume-example-2026"
          element={<SalesExecutiveResume2026 />}
        />
        <Route
          path="/cv-maker/blog/sales-executive-resume-example-2026"
          element={<SalesExecutiveResume2026 />}
        />
        <Route
          path="/ai-resume-builder/blog/sales-executive-resume-example-2026"
          element={<SalesExecutiveResume2026 />}
        />
        <Route
          path="/resume-builder/blog/sales-executive-resume-example-2026"
          element={<SalesExecutiveResume2026 />}
        />
        <Route
          path="/cover-letter-builder/blog/sales-executive-resume-example-2026"
          element={<SalesExecutiveResume2026 />}
        />
        <Route
          path="/blog/graphic-designer-resume-example-2026"
          element={<GraphicDesignerResume2026 />}
        />
        <Route
          path="/cv-maker/blog/graphic-designer-resume-example-2026"
          element={<GraphicDesignerResume2026 />}
        />
        <Route
          path="/ai-resume-builder/blog/graphic-designer-resume-example-2026"
          element={<GraphicDesignerResume2026 />}
        />
        <Route
          path="/resume-builder/blog/graphic-designer-resume-example-2026"
          element={<GraphicDesignerResume2026 />}
        />
        <Route
          path="/cover-letter-builder/blog/graphic-designer-resume-example-2026"
          element={<GraphicDesignerResume2026 />}
        />
        <Route
          path="/blog/customer-service-representative-resume-example-2026"
          element={<CustomerServiceResume2026 />}
        />
        <Route
          path="/cv-maker/blog/customer-service-representative-resume-example-2026"
          element={<CustomerServiceResume2026 />}
        />
        <Route
          path="/ai-resume-builder/blog/customer-service-representative-resume-example-2026"
          element={<CustomerServiceResume2026 />}
        />
        <Route
          path="/resume-builder/blog/customer-service-representative-resume-example-2026"
          element={<CustomerServiceResume2026 />}
        />
        <Route
          path="/cover-letter-builder/blog/customer-service-representative-resume-example-2026"
          element={<CustomerServiceResume2026 />}
        />
        <Route
          path="/blog/hr-manager-resume-example-2026"
          element={<HrManagerResume2026 />}
        />
        <Route
          path="/cv-maker/blog/hr-manager-resume-example-2026"
          element={<HrManagerResume2026 />}
        />
        <Route
          path="/ai-resume-builder/blog/hr-manager-resume-example-2026"
          element={<HrManagerResume2026 />}
        />
        <Route
          path="/resume-builder/blog/hr-manager-resume-example-2026"
          element={<HrManagerResume2026 />}
        />
        <Route
          path="/cover-letter-builder/blog/hr-manager-resume-example-2026"
          element={<HrManagerResume2026 />}
        />
        <Route
          path="/blog/textile-merchandiser-resume-example-2026"
          element={<TextileMerchandiserResume2026 />}
        />
        <Route
          path="/cv-maker/blog/textile-merchandiser-resume-example-2026"
          element={<TextileMerchandiserResume2026 />}
        />
        <Route
          path="/ai-resume-builder/blog/textile-merchandiser-resume-example-2026"
          element={<TextileMerchandiserResume2026 />}
        />
        <Route
          path="/resume-builder/blog/textile-merchandiser-resume-example-2026"
          element={<TextileMerchandiserResume2026 />}
        />
        <Route
          path="/cover-letter-builder/blog/textile-merchandiser-resume-example-2026"
          element={<TextileMerchandiserResume2026 />}
        />
        <Route
          path="/blog/production-manager-resume-example-2026"
          element={<ProductionManagerResume2026 />}
        />
        <Route
          path="/cv-maker/blog/production-manager-resume-example-2026"
          element={<ProductionManagerResume2026 />}
        />
        <Route
          path="/ai-resume-builder/blog/production-manager-resume-example-2026"
          element={<ProductionManagerResume2026 />}
        />
        <Route
          path="/resume-builder/blog/production-manager-resume-example-2026"
          element={<ProductionManagerResume2026 />}
        />
        <Route
          path="/cover-letter-builder/blog/production-manager-resume-example-2026"
          element={<ProductionManagerResume2026 />}
        />
        <Route
          path="/blog/data-entry-operator-resume-example-2026"
          element={<DataEntryOperatorResume2026 />}
        />
        <Route
          path="/cv-maker/blog/data-entry-operator-resume-example-2026"
          element={<DataEntryOperatorResume2026 />}
        />
        <Route
          path="/ai-resume-builder/blog/data-entry-operator-resume-example-2026"
          element={<DataEntryOperatorResume2026 />}
        />
        <Route
          path="/resume-builder/blog/data-entry-operator-resume-example-2026"
          element={<DataEntryOperatorResume2026 />}
        />
        <Route
          path="/cover-letter-builder/blog/data-entry-operator-resume-example-2026"
          element={<DataEntryOperatorResume2026 />}
        />
        <Route
          path="/blog/bank-job-cv-format-in-pakistan-2026"
          element={<BankJobCvFormatPakistan2026 />}
        />
        <Route
          path="/cv-maker/blog/bank-job-cv-format-in-pakistan-2026"
          element={<BankJobCvFormatPakistan2026 />}
        />
        <Route
          path="/ai-resume-builder/blog/bank-job-cv-format-in-pakistan-2026"
          element={<BankJobCvFormatPakistan2026 />}
        />
        <Route
          path="/resume-builder/blog/bank-job-cv-format-in-pakistan-2026"
          element={<BankJobCvFormatPakistan2026 />}
        />
        <Route
          path="/cover-letter-builder/blog/bank-job-cv-format-in-pakistan-2026"
          element={<BankJobCvFormatPakistan2026 />}
        />
        <Route
          path="/blog/how-to-write-work-experience-on-a-resume"
          element={<HowToWriteWorkExperienceResume />}
        />
        <Route
          path="/cv-maker/blog/how-to-write-work-experience-on-a-resume"
          element={<HowToWriteWorkExperienceResume />}
        />
        <Route
          path="/ai-resume-builder/blog/how-to-write-work-experience-on-a-resume"
          element={<HowToWriteWorkExperienceResume />}
        />
        <Route
          path="/resume-builder/blog/how-to-write-work-experience-on-a-resume"
          element={<HowToWriteWorkExperienceResume />}
        />
        <Route
          path="/cover-letter-builder/blog/how-to-write-work-experience-on-a-resume"
          element={<HowToWriteWorkExperienceResume />}
        />
        <Route
          path="/blog/best-skills-for-a-resume-2026"
          element={<BestSkillsForResume2026 />}
        />
        <Route
          path="/cv-maker/blog/best-skills-for-a-resume-2026"
          element={<BestSkillsForResume2026 />}
        />
        <Route
          path="/ai-resume-builder/blog/best-skills-for-a-resume-2026"
          element={<BestSkillsForResume2026 />}
        />
        <Route
          path="/resume-builder/blog/best-skills-for-a-resume-2026"
          element={<BestSkillsForResume2026 />}
        />
        <Route
          path="/cover-letter-builder/blog/best-skills-for-a-resume-2026"
          element={<BestSkillsForResume2026 />}
        />
        <Route
          path="/blog/how-to-write-a-professional-summary"
          element={<HowToWriteProfessionalSummary />}
        />
        <Route
          path="/cv-maker/blog/how-to-write-a-professional-summary"
          element={<HowToWriteProfessionalSummary />}
        />
        <Route
          path="/ai-resume-builder/blog/how-to-write-a-professional-summary"
          element={<HowToWriteProfessionalSummary />}
        />
        <Route
          path="/resume-builder/blog/how-to-write-a-professional-summary"
          element={<HowToWriteProfessionalSummary />}
        />
        <Route
          path="/cover-letter-builder/blog/how-to-write-a-professional-summary"
          element={<HowToWriteProfessionalSummary />}
        />
        <Route
          path="/blog/ats-resume-guide"
          element={<AtsResumeGuide />}
        />
        <Route
          path="/cv-maker/blog/ats-resume-guide"
          element={<AtsResumeGuide />}
        />
        <Route
          path="/ai-resume-builder/blog/ats-resume-guide"
          element={<AtsResumeGuide />}
        />
        <Route
          path="/resume-builder/blog/ats-resume-guide"
          element={<AtsResumeGuide />}
        />
        <Route
          path="/cover-letter-builder/blog/ats-resume-guide"
          element={<AtsResumeGuide />}
        />
        <Route
          path="/blog/resume-mistakes-to-avoid"
          element={<ResumeMistakesToAvoid2026 />}
        />
        <Route
          path="/cv-maker/blog/resume-mistakes-to-avoid"
          element={<ResumeMistakesToAvoid2026 />}
        />
        <Route
          path="/ai-resume-builder/blog/resume-mistakes-to-avoid"
          element={<ResumeMistakesToAvoid2026 />}
        />
        <Route
          path="/resume-builder/blog/resume-mistakes-to-avoid"
          element={<ResumeMistakesToAvoid2026 />}
        />
        <Route
          path="/cover-letter-builder/blog/resume-mistakes-to-avoid"
          element={<ResumeMistakesToAvoid2026 />}
        />
        <Route
          path="/blog/how-to-write-achievements-on-a-resume"
          element={<HowToWriteAchievementsResume />}
        />
        <Route
          path="/cv-maker/blog/how-to-write-achievements-on-a-resume"
          element={<HowToWriteAchievementsResume />}
        />
        <Route
          path="/ai-resume-builder/blog/how-to-write-achievements-on-a-resume"
          element={<HowToWriteAchievementsResume />}
        />
        <Route
          path="/resume-builder/blog/how-to-write-achievements-on-a-resume"
          element={<HowToWriteAchievementsResume />}
        />
        <Route
          path="/cover-letter-builder/blog/how-to-write-achievements-on-a-resume"
          element={<HowToWriteAchievementsResume />}
        />
        <Route
          path="/blog/one-page-vs-two-page-resume"
          element={<OnePageVsTwoPageResume />}
        />
        <Route
          path="/cv-maker/blog/one-page-vs-two-page-resume"
          element={<OnePageVsTwoPageResume />}
        />
        <Route
          path="/ai-resume-builder/blog/one-page-vs-two-page-resume"
          element={<OnePageVsTwoPageResume />}
        />
        <Route
          path="/resume-builder/blog/one-page-vs-two-page-resume"
          element={<OnePageVsTwoPageResume />}
        />
        <Route
          path="/cover-letter-builder/blog/one-page-vs-two-page-resume"
          element={<OnePageVsTwoPageResume />}
        />
        <Route
          path="/blog/resume-checklist-before-applying"
          element={<ResumeChecklistBeforeApplying />}
        />
        <Route
          path="/cv-maker/blog/resume-checklist-before-applying"
          element={<ResumeChecklistBeforeApplying />}
        />
        <Route
          path="/ai-resume-builder/blog/resume-checklist-before-applying"
          element={<ResumeChecklistBeforeApplying />}
        />
        <Route
          path="/resume-builder/blog/resume-checklist-before-applying"
          element={<ResumeChecklistBeforeApplying />}
        />
        <Route
          path="/cover-letter-builder/blog/resume-checklist-before-applying"
          element={<ResumeChecklistBeforeApplying />}
        />
        <Route
          path="/blog/how-to-write-a-cover-letter"
          element={<HowToWriteCoverLetter />}
        />
        <Route
          path="/cv-maker/blog/how-to-write-a-cover-letter"
          element={<HowToWriteCoverLetter />}
        />
        <Route
          path="/ai-resume-builder/blog/how-to-write-a-cover-letter"
          element={<HowToWriteCoverLetter />}
        />
        <Route
          path="/resume-builder/blog/how-to-write-a-cover-letter"
          element={<HowToWriteCoverLetter />}
        />
        <Route
          path="/cover-letter-builder/blog/how-to-write-a-cover-letter"
          element={<HowToWriteCoverLetter />}
        />
        <Route
          path="/blog/ats-keywords-for-resumes"
          element={<AtsKeywordsForResumes />}
        />
        <Route
          path="/cv-maker/blog/ats-keywords-for-resumes"
          element={<AtsKeywordsForResumes />}
        />
        <Route
          path="/ai-resume-builder/blog/ats-keywords-for-resumes"
          element={<AtsKeywordsForResumes />}
        />
        <Route
          path="/resume-builder/blog/ats-keywords-for-resumes"
          element={<AtsKeywordsForResumes />}
        />
        <Route
          path="/cover-letter-builder/blog/ats-keywords-for-resumes"
          element={<AtsKeywordsForResumes />}
        />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/cv-maker/blog/:slug" element={<BlogPost />} />
        <Route path="/ai-resume-builder/blog/:slug" element={<BlogPost />} />
        <Route path="/resume-builder/blog/:slug" element={<BlogPost />} />
        <Route path="/cover-letter-builder/blog/:slug" element={<BlogPost />} />
        <Route path="/pricing" element={<Pricing />} />

        {/* ✅ PUBLIC REVIEWS PAGE */}
        <Route path="/reviews" element={<ReviewsPage />} />

        {/* Preview */}
        <Route
          path="/preview-classic"
          element={<PreviewPanelQRPage formData={formData} />}
        />

        <Route path="/clean-professional" element={<CleanProfessional />} />
        <Route path="/creative-bold" element={<CreativeBold />} />
        <Route path="/minimal-accent" element={<MinimalAccent />} />
        <Route path="/elegant-classic" element={<ElegantClassic />} />
        <Route path="/medical-elites" element={<MedicalElites />} />
        <Route path="/engineer-elites" element={<EngineerElites />} />
        <Route path="/soft-tech" element={<SoftTech />} />
        <Route path="/free-basic" element={<Navigate to="/templates" replace />} />
        <Route path="/royal-designer" element={<Navigate to="/templates" replace />} />
        <Route path="/neoedge-pro" element={<Navigate to="/templates" replace />} />
        <Route path="/neoEdge-pro" element={<Navigate to="/templates" replace />} />
        <Route path="/test-pagination" element={<Navigate to="/templates" replace />} />
        <Route path="/florence-classic" element={<FlorenceClassic />} />


        <Route path="/engineer-prime" element={<EngineerPrime />} />
        <Route path="/aviation-pro" element={<AviationPro />} />
        <Route path="/teacher-elite" element={<TeacherElite />} />
        <Route path="/coverletter" element={<CoverLetterPage />} />
        <Route path="/cv-maker/coverletter" element={<CoverLetterPage />} />
        <Route path="/ai-resume-builder/coverletter" element={<CoverLetterPage />} />
        <Route path="/resume-builder/coverletter" element={<CoverLetterPage />} />
        <Route path="/cover-letter-builder/coverletter" element={<CoverLetterPage />} />
        <Route path="/coverletter-generator" element={<CoverLetterPanel />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default function App() {
  return <AppContent />;
}
