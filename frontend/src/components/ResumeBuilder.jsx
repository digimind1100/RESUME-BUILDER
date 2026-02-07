// ResumeBuilder.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import FormPanel from "./FormPanel";
import WorkPopup from "./WorkExpPopup";
import SkillsPopup from "./SkillsPopup";
import ButtonSection from "./ButtonSection";
import FormatButtons from "./FormatButtons";
import ThemeSelector from "./ThemeSelector";
import PreviewPanel from "./PreviewPanel";
import usePaymentGuard from "../hooks/usePaymentGuard";
import PaymentGate from "../components/payment/PaymentGate";
import { useReview } from "../context/ReviewContext";
import DownloadPDF from "./DownloadPDF";
import { useAuth } from "../context/AuthContext";





import "./ResumeBuilder.css";

const ResumeBuilder = () => {
  const { templateId } = useParams(); // e.g. classic | professional | creative-bold
const { triggerReview } = useReview();

const { user } = useAuth();

  /* ---------------- TEMPLATE RESOLUTION ---------------- */
  const resolvedTemplate =
    templateId === "professional"
      ? "clean-professional"
      : templateId || "classic";

  const entrySource =
    new URLSearchParams(location.search).get("entry") || "template";

  const isPreviewFlow = entrySource === "start";

  /* ---------------- STATE ---------------- */
  const [formData, setFormData] = useState({});
  const [selectedEducations, setSelectedEducations] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [workExperiences, setWorkExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [showWorkPopup, setShowWorkPopup] = useState(false);
  const [showSkillsPopup, setShowSkillsPopup] = useState(false);

  const [resumeStyle, setResumeStyle] = useState(resolvedTemplate);



  const [theme, setTheme] = useState({
    left: "#17639F",
    job: "#F4ECE1",
    text: "#000",
  });

  const {
    isPaid,
    showPaymentModal,
    setShowPaymentModal,
    requirePayment,
    handlePaymentSuccess,
  } = usePaymentGuard("CleanProfessional");

  /* ---------------- EFFECTS ---------------- */
  useEffect(() => {
    setResumeStyle(resolvedTemplate);
  }, [resolvedTemplate]);

  // Load CSS for simple templates only
  useEffect(() => {
    if (templateId && !["classic", "professional"].includes(templateId)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `/templates/simple-${templateId}.css`;
      link.id = "dynamic-template-css";
      document.head.appendChild(link);

      return () => {
        const existing = document.getElementById("dynamic-template-css");
        if (existing) existing.remove();
      };
    }
  }, [templateId]);

  /* ---------------- HANDLERS ---------------- */
  const addEducation = (education) => {
    setSelectedEducations((prev) => [...prev, education]);
  };

  const handleFormat = (action) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.extractContents();
    const span = document.createElement("span");

    if (action === "bold") span.style.fontWeight = "bold";
    if (action === "italic") span.style.fontStyle = "italic";
    if (action === "underline") span.style.textDecoration = "underline";
    if (action === "font") span.style.fontFamily = "Georgia, serif";

    span.appendChild(selectedText);
    range.insertNode(span);
  };

  const toggleSkillCheckbox = (id) => {
    setSkills((prev) =>
      prev.map((skill) =>
        skill.id === id ? { ...skill, checked: !skill.checked } : skill
      )
    );
  };

  const toggleWorkCheckbox = (id) => {
    setWorkExperiences((prev) =>
      prev.map((work) =>
        work.id === id ? { ...work, checked: !work.checked } : work
      )
    );
  };

  const handleCheckboxChange = (index) => {
    setSelectedEducations((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleWorkSelect = (item) => {
    const text =
      typeof item === "string"
        ? item.trim()
        : item.text || item.title || "";

    if (!text) return;

    setWorkExperiences((prev) =>
      prev.some((w) => w.text === text)
        ? prev
        : [
          ...prev,
          {
            id: Date.now(),
            title: text,
            text,
            company: "",
            years: "",
            checked: false,
          },
        ]
    );
  };

  const handleSkillSelect = (item) => {
    const text = typeof item === "string" ? item.trim() : item.text || "";
    if (!text) return;

    setSkills((prev) =>
      prev.some((s) => s.text === text)
        ? prev
        : [...prev, { id: Date.now(), text, checked: false }]
    );
  };

  const handleDeleteSelected = () => {
    setWorkExperiences((prev) => prev.filter((exp) => !exp.checked));
    setSkills((prev) => prev.filter((skill) => !skill.checked));
  };

  /* ---------------- RENDER ---------------- */
  return (
    <div className="resume-builder-container">

      {/* LEFT: FORM PANEL */}
      <div className="form-panel-container">
        <FormPanel
          formData={formData}
          setFormData={setFormData}
          selectedEducations={selectedEducations}
          setSelectedEducations={setSelectedEducations}
          jobTitle={jobTitle}
          setJobTitle={setJobTitle}
          openWorkPopup={() => setShowWorkPopup(true)}
          onAddSkillsClick={() => setShowSkillsPopup(true)}
          canEdit={isPaid}
          requirePayment={requirePayment}
        />
      </div>

      {/* RIGHT: PREVIEW */}
      <div className="preview-panel-container">
        
        {/* POPUPS */}
        {showWorkPopup && (
          <WorkPopup
            jobTitle={jobTitle}
            onClose={() => setShowWorkPopup(false)}
            workExperiences={workExperiences}
            setWorkExperiences={setWorkExperiences}
            onSelect={handleWorkSelect}
          />
        )}

        {showSkillsPopup && (
          <SkillsPopup
            jobTitle={jobTitle}
            onClose={() => setShowSkillsPopup(false)}
            skills={skills}
            setSkills={setSkills}
            onSelect={handleSkillSelect}
          />
        )}

        <div className="resume-theme w-full flex flex-col p-4" id="resumeContainer">
          <div className="theme-selector-container p-2">
            <ThemeSelector onThemeChange={setTheme} />
          </div>

          {isEditing && (
            <div className="format-buttons-wrapper">
              <FormatButtons handleFormat={handleFormat} />
            </div>
          )}

          <div className="button-section-container p-4">
            <ButtonSection
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              handleDeleteSelected={handleDeleteSelected}
              formData={formData}
              selectedEducations={selectedEducations}
              workExperiences={workExperiences}
              skills={skills}
              jobTitle={jobTitle}
            />
          </div>

          <PreviewPanel
            templateId={templateId}
            entrySource={entrySource}
            formData={formData}
            selectedEducations={selectedEducations}
            handleCheckboxChange={handleCheckboxChange}
            jobTitle={jobTitle}
            workExperiences={workExperiences}
            skills={skills}
            deleteWorkExperience={() => { }}
            deleteSkill={() => { }}
            isEditing={isEditing}
            toggleWorkCheckbox={toggleWorkCheckbox}
            toggleSkillCheckbox={toggleSkillCheckbox}
            handleOpenWorkPopup={() => setShowWorkPopup(true)}
            handleAddSkillsClick={() => setShowSkillsPopup(true)}
            theme={theme}
            resumeStyle={resumeStyle}
          />
        </div>
      </div>


      <PaymentGate
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
      />
<DownloadPDF
        user={user}
        onReviewTrigger={triggerReview}
      />
    </div>


  );
};

export default ResumeBuilder;
