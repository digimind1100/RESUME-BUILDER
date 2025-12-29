// ResumeBuilderQR.jsx
import React, { useState } from "react";
import FormPanelQR from "./FormPanelQR";
import WorkPopup from "./WorkExpPopup";
import SkillsPopup from "./SkillsPopup";
import ButtonSection from "./ButtonSection";
import FormatButtons from "./FormatButtons";
import ThemeSelector from "./ThemeSelector";
import PreviewPanelQR from "./PreviewPanelQR";
import "./ResumeBuilder.css";
import PaymentGate from "../components/payment/PaymentGate";
import usePaymentGuard from "../hooks/usePaymentGuard";



const ResumeBuilderQR = () => {
  const [formData, setFormData] = useState({});
  const [selectedEducations, setSelectedEducations] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [workExperiences, setWorkExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
 const [showWorkPopup, setShowWorkPopup] = useState(false);
  const [showSkillsPopup, setShowSkillsPopup] = useState(false);
  // Popup visibility
  const {
  isPaid,
  showPaymentModal,
  setShowPaymentModal,
  requirePayment,
  handlePaymentSuccess,
} = usePaymentGuard("ClassicPreview");

const canEdit = isPaid;

const handleWorkClickWithGuard = () => {
  if (!canEdit) {
    requirePayment();
    return;
  }
  setShowWorkPopup(true);
};

const handleSkillsClickWithGuard = () => {
  if (!canEdit) {
    requirePayment();
    return;
  }
  setShowSkillsPopup(true);
};
//payment Guard End
  // Theme colors
  const [theme, setTheme] = useState({
    left: "#ffffff",
    job: "#F4ECE1",
    text: "#000",
  });

  // QR Code State
  const [qrData, setQrData] = useState(null);

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

  // --- Generate QR ---
  const handleGenerateQR = () => {
    if (!formData.fullName || !formData.email) {
      alert("Please enter at least Name and Email before generating QR code.");
      return;
    }

    const qrContent = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      country: formData.country,
      linkedin: formData.linkedin,
      dob: formData.dob,
    };

    setQrData(qrContent);

    console.log("QR Generated:", qrContent);
  };

  return (
    <div className="resume-builder-container flex flex-col md:flex-row md:items-start">

      {/* LEFT FORM PANEL */}
      <div className="form-panel w-full md:w-[40%] p-4">
        <FormPanelQR
          formData={formData}
          setFormData={setFormData}
          selectedEducations={selectedEducations}
          setSelectedEducations={setSelectedEducations}
          jobTitle={jobTitle}
          setJobTitle={setJobTitle}
          openWorkPopup={handleWorkClickWithGuard}
          onAddSkillsClick={handleSkillsClickWithGuard}
          onGenerateQR={handleGenerateQR}
          canEdit={canEdit}
  requirePayment={requirePayment}
        />
      </div>

      {/* RIGHT PREVIEW AREA */}
      <div className="right-side w-full lg:w-[60%] flex flex-col">
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

<PaymentGate
  open={showPaymentModal}
  onClose={() => setShowPaymentModal(false)}
  onSuccess={handlePaymentSuccess}
/>

    </div>
  );
};

export default ResumeBuilderQR;
