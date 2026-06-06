// ResumeBuilderQR.jsx
import React, { useEffect, useState } from "react";
import FormPanelQR from "./FormPanelQR";
import WorkPopup from "./WorkExpPopup";
import SkillsPopup from "./SkillsPopup";
import ButtonSection from "./ButtonSection";
import FormatButtons from "./FormatButtons";
import ThemeSelector from "./ThemeSelector";
import PreviewPanelQR from "./PreviewPanelQR";
import "./ResumeBuilderQR.css";
import { useAuth } from "../context/AuthContext";
import ReviewPopup from "./review/ReviewPopup";
import SignupModal from "./auth/SignupModal";
import { hasReviewAccess } from "../utils/reviewAccess";


const ResumeBuilderQR = () => {
  const storageKey = "ai-classic-qr_resumeData";
  const databaseTemplateId = "ai-classic-qr";
  const savedBuilderState = (() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || {};
    } catch {
      return {};
    }
  })();

  const [formData, setFormData] = useState(savedBuilderState.formData || {});
  const [selectedEducations, setSelectedEducations] = useState(
    savedBuilderState.selectedEducations || []
  );
  const [jobTitle, setJobTitle] = useState(savedBuilderState.jobTitle || "");
  const [workExperiences, setWorkExperiences] = useState(
    savedBuilderState.workExperiences || []
  );
  const [skills, setSkills] = useState(savedBuilderState.skills || []);
  const [isEditing, setIsEditing] = useState(false);
  const [showWorkPopup, setShowWorkPopup] = useState(false);
  const [showSkillsPopup, setShowSkillsPopup] = useState(false);
  const [pendingAiAction, setPendingAiAction] = useState(null);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const { user } = useAuth();

  const canAccessPremium = hasReviewAccess(user);
  // Theme colors
  const [theme, setTheme] = useState({
    left: savedBuilderState.theme?.left || "#ffffff",
    job: savedBuilderState.theme?.job || "#F4ECE1",
    text: savedBuilderState.theme?.text || "#000",
  });

  // QR Code State
  const [qrData, setQrData] = useState(savedBuilderState.qrData || null);

  const resumeDataForSave = {
    formData,
    selectedEducations,
    jobTitle,
    workExperiences,
    skills,
    theme,
    qrData,
    templateId: "classic-qr",
  };

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(resumeDataForSave));
    localStorage.setItem("resumeData", JSON.stringify(resumeDataForSave));
  }, [
    formData,
    selectedEducations,
    jobTitle,
    workExperiences,
    skills,
    theme,
    qrData,
  ]);

  useEffect(() => {
    const loadSavedResume = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(
          `https://resume-builder-backend-66wy.onrender.com/api/resume/load?templateId=${databaseTemplateId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success || !result.resume) return;

        const savedResume = result.resume.data || result.resume;

        setFormData(savedResume.formData || {});
        setSelectedEducations(savedResume.selectedEducations || []);
        setJobTitle(savedResume.jobTitle || "");
        setWorkExperiences(savedResume.workExperiences || []);
        setSkills(savedResume.skills || []);
        setQrData(savedResume.qrData || null);
        setTheme({
          left: savedResume.theme?.left || "#ffffff",
          job: savedResume.theme?.job || "#F4ECE1",
          text: savedResume.theme?.text || "#000",
        });
      } catch (error) {
        console.error("Load AI QR resume error:", error);
      }
    };

    loadSavedResume();
  }, [databaseTemplateId, user]);

  // --- Checkbox handlers ---
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

  // --- Popup handlers ---
  const handleOpenWorkPopup = () => setShowWorkPopup(true);
  const handleCloseWorkPopup = () => setShowWorkPopup(false);
  const handleAddSkillsClick = () => setShowSkillsPopup(true);
  const handleCloseSkillsPopup = () => setShowSkillsPopup(false);

  // --- AI item selecting handlers ---
  const handleWorkSelect = (item) => {
    const textValue =
      typeof item === "string"
        ? item.trim()
        : item.text || item.title || JSON.stringify(item);

    if (!textValue) return;

    const newWork = {
      id: Date.now(),
      title: textValue,
      text: textValue,
      company: "",
      years: "",
      checked: false,
    };

    setWorkExperiences((prev) => {
      const exists = prev.some((w) => w.text === textValue);
      return exists ? prev : [...prev, newWork];
    });
  };

  const handleSkillSelect = (item) => {
    const textValue = typeof item === "string" ? item.trim() : item.text || "";
    if (!textValue) return;

    const newSkill = { id: Date.now(), text: textValue, checked: false };

    setSkills((prev) => {
      const exists = prev.some((s) => s.text === textValue);
      return exists ? prev : [...prev, newSkill];
    });
  };

  // Delete selected work+skills
  const handleDeleteSelected = () => {
    setWorkExperiences((prev) => prev.filter((exp) => !exp.checked));
    setSkills((prev) => prev.filter((skill) => !skill.checked));
  };

  const handleResetResume = () => {
    localStorage.removeItem(storageKey);
    localStorage.removeItem("resumeData");
    setFormData({});
    setSelectedEducations([]);
    setJobTitle("");
    setWorkExperiences([]);
    setSkills([]);
    setQrData(null);
    setTheme({
      left: "#ffffff",
      job: "#F4ECE1",
      text: "#000",
    });
    setIsEditing(false);
    alert("Saved data removed");
  };

  const openAiPanel = (action) => {
    if (action === "work") {
      setShowWorkPopup(true);
      return;
    }

    if (action === "skills") {
      setShowSkillsPopup(true);
    }
  };

  const requireAiAccess = (action) => {
    setPendingAiAction(action);

    const token = localStorage.getItem("token");
    if (!token || !user) {
      setShowSignupModal(true);
      return;
    }

    if (!canAccessPremium) {
      setShowReviewPopup(true);
      return;
    }

    setPendingAiAction(null);
    openAiPanel(action);
  };

  const handleAiAccessSuccess = () => {
    const action = pendingAiAction;
    setShowSignupModal(false);
    setShowReviewPopup(false);
    setPendingAiAction(null);

    if (action) {
      openAiPanel(action);
    }
  };

  const handleSignupSuccess = () => {
    setShowSignupModal(false);
    setShowReviewPopup(true);
  };

  // --- Generate QR ---
 const handleGenerateQR = () => {
  if (!formData.fullName || !formData.email) {
    alert("Please enter at least Name and Email before generating QR code.");
    return;
  }

  const vCardData = `

FULL NAME:${formData.fullName || ""}
EMAIL:${formData.email || ""}
TEL:${formData.phone || ""}
ADDRESS:${formData.address || ""};${formData.city || ""};;${formData.country || ""}
URL:${formData.linkedin || ""}
DOB:${formData.dob || ""}

`;

  setQrData(vCardData);

  console.log("QR Generated (vCard):", vCardData);
};

  return (
    <div className="resume-builder-container qr-layout">
      {/* LEFT FORM PANEL */}
      

        <FormPanelQR
          formData={formData}
          setFormData={setFormData}
          selectedEducations={selectedEducations}
          setSelectedEducations={setSelectedEducations}
          jobTitle={jobTitle}
          setJobTitle={setJobTitle}
          openWorkPopup={() => openAiPanel("work")}
          onAddSkillsClick={() => openAiPanel("skills")}
          onGenerateQR={handleGenerateQR}
          canEdit={canAccessPremium}
          requirePayment={requireAiAccess}
        />
      

      {/* RIGHT PREVIEW AREA */}
      <div className="preview-panel-container qr-preview-panel">
        <div className="resume-theme w-full flex flex-col p-4" id="resumeContainer">

          <div className="theme-selector-container p-2">
            <ThemeSelector onThemeChange={setTheme} />
          </div>

          {isEditing && (
            <div className="format-buttons-wrapper">
              <FormatButtons handleFormat={() => { }} />
            </div>
          )}

          <div className="button-section-container p-4 mt-4 md:mt-0">
            <ButtonSection
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              handleDeleteSelected={handleDeleteSelected}
              formData={formData}
              selectedEducations={selectedEducations}
              workExperiences={workExperiences}
              skills={skills}
              jobTitle={jobTitle}
              showSaveResume
              saveTemplateId={databaseTemplateId}
              resumeData={resumeDataForSave}
              showResetResume
              onResetResume={handleResetResume}
            />
          </div>

          {/* PREVIEW PANEL */}
          <PreviewPanelQR
            formData={formData}
            setFormData={setFormData}
            selectedEducations={selectedEducations}
            handleCheckboxChange={handleCheckboxChange}
            jobTitle={jobTitle}
            workExperiences={workExperiences}
            skills={skills}
            theme={theme}
            isEditing={isEditing}
            toggleWorkCheckbox={toggleWorkCheckbox}
            toggleSkillCheckbox={toggleSkillCheckbox}
            qrData={qrData}
          />
        </div>
      </div>

      {/* POPUPS */}
      {showWorkPopup && (
        <WorkPopup
          jobTitle={jobTitle}
          onClose={handleCloseWorkPopup}
          workExperiences={workExperiences}
          setWorkExperiences={setWorkExperiences}
          onSelect={handleWorkSelect}
        />
      )}

      {showSkillsPopup && (
        <SkillsPopup
          jobTitle={jobTitle}
          onClose={handleCloseSkillsPopup}
          skills={skills}
          setSkills={setSkills}
          onSelect={handleSkillSelect}
        />
      )}

      {showReviewPopup && (
        <ReviewPopup
          templateId="ClassicPreview"
          onClose={() => setShowReviewPopup(false)}
          onSuccess={handleAiAccessSuccess}
        />
      )}

      {showSignupModal && (
        <SignupModal
          onClose={() => setShowSignupModal(false)}
          onSuccess={handleSignupSuccess}
        />
      )}

    </div>
  );
};

export default ResumeBuilderQR;
