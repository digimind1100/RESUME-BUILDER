// src/Templates/MinimalAccent.jsx
import React, { useState, useEffect, useRef } from "react";
import "./MinimalAccent.css";
import TemplateLayout from "../TemplateLayout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useProfileImage from "../../hooks/useProfileImage";
import useResumeTemplate from "../../hooks/useResumeTemplate";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


const MinimalAccent = () => {

  const resumeRef = useRef(null);
  const pdfGeneratingRef = useRef(false);
  const navigate = useNavigate();

  // Object Datat start
  const STORAGE_KEY = "MinimalAccent";

  const defaultData = {
    fullName: "ANNA MARIA",
    jobTitle: "GRAPHIC DESIGNER",
    profileImage: "/images/minimalaccentprofileimage.png",

    profile:
      "Ut enim ad minim veniam, quis nostrud exerc. Iure dolor in reprehenderit.",

    contact: {
      address: "Street Address",
      city: "City, State ZIP Code",
      phone: "(123) 456-7890",
      email: "email@address.com",
    },

    skills: [
      "Skill 1",
      "Skill 2",
      "Skill 3",
      "Skill 4",
    ],

    references: [
      {
        name: "James Smith",
        title: "Job Title – Company Name",
        contact: "Phone / Email",
      },
      {
        name: "Sarah Johnson",
        title: "Job Title – Company Name",
        contact: "Phone / Email",
      },
    ],

    experience: [
      {
        title: "JOB TITLE",
        company: "COMPANY NAME",
        duration: "DEC 2010 – PRESENT",
        description: "Ut enim ad minim veniam, quis nostrud exerc...",
      },
      {
        title: "JOB TITLE",
        company: "COMPANY NAME",
        duration: "DEC 2006 – 2010",
        description: "Ut enim ad minim veniam, quis nostrud exerc...",
      },
    ],

    education: [
      {
        degree: "DIPLOMA",
        school: "SCHOOL NAME",
        duration: "2003 – 2005",
        description: "Ut enim ad minim veniam...",
      },
      {
        degree: "DIPLOMA",
        school: "SCHOOL NAME",
        duration: "2000 – 2003",
        description: "Ut enim ad minim veniam...",
      },
    ],
  };

  const {
    resumeData,
    setResumeData,
    handleChange,
    handleContactChange,
    handleArrayChange,
    handleExperienceChange,
    handleEducationChange,
    handleSaveResume,
    checkPaymentStatus,
    loadResume,
  } = useResumeTemplate("MinimalAccent", defaultData);

  const {
    fileInputRef,
    handleImageUpload,
    openImagePicker,
  } = useProfileImage(setResumeData, checkPaymentStatus);


  // Reset Button
  const handleResetMinimalAccent = () => {
  localStorage.removeItem("MinimalAccent_resumeData");

  setResumeData({
    ...defaultData,
    profileImage: "/images/minimalaccentprofileimage.png",
  });
};

const { isAuthenticated } = useAuth();

useEffect(() => {
  if (!isAuthenticated) return;

  console.log("AUTH READY - LOADING MINIMALACCENT");

  setTimeout(() => {
    loadResume();
  }, 500);
}, [isAuthenticated]);

useEffect(() => {
  const handleUserLoggedIn = async () => {
    console.log("✅ MinimalAccent userLoggedIn event received");
    await loadResume();
  };

  window.addEventListener("userLoggedIn", handleUserLoggedIn);

  return () => {
    window.removeEventListener("userLoggedIn", handleUserLoggedIn);
  };
}, []);

useEffect(() => {
  const interval = setInterval(() => {
    const token = localStorage.getItem("token");

    if (token) {
      loadResume();
      clearInterval(interval);
    }
  }, 500);

  return () => clearInterval(interval);
}, []);

const replaceEditableFieldsForPDF = (element) => {
  element.querySelectorAll("input, textarea").forEach((field) => {
    if (field.type === "file") {
      field.remove();
      return;
    }

    const div = document.createElement("div");
    div.className = field.className;
    div.textContent = field.value || field.textContent || "";

    const computed = window.getComputedStyle(field);
    div.style.width = computed.width;
    div.style.minHeight = computed.height;
    div.style.fontSize = computed.fontSize;
    div.style.fontWeight = computed.fontWeight;
    div.style.lineHeight = computed.lineHeight;
    div.style.color = computed.color;
    div.style.fontFamily = computed.fontFamily;
    div.style.letterSpacing = computed.letterSpacing;
    div.style.textTransform = computed.textTransform;
    div.style.textAlign = computed.textAlign;
    div.style.margin = computed.margin;
    div.style.padding = computed.padding;
    div.style.boxSizing = "border-box";
    div.style.whiteSpace = field.tagName === "TEXTAREA" ? "pre-wrap" : "normal";
    div.style.overflowWrap = "break-word";
    div.style.background = "transparent";
    div.style.border = "none";

    field.replaceWith(div);
  });
};

const handleDownloadPDF = async () => {
  if (pdfGeneratingRef.current) return;

  pdfGeneratingRef.current = true;
  let wrapper = null;

  try {
    const originalElement = document.querySelector(".resume-a4.ma-a4");

    if (!originalElement) {
      console.error("MinimalAccent resume element not found");
      return;
    }

    const element = originalElement.cloneNode(true);
    replaceEditableFieldsForPDF(element);

    wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.left = "-99999px";
    wrapper.style.top = "0";
    wrapper.style.width = "794px";
    wrapper.style.height = "1122px";
    wrapper.style.background = "#ffffff";
    wrapper.style.overflow = "hidden";
    wrapper.style.opacity = "0";
    wrapper.style.pointerEvents = "none";
    wrapper.style.zIndex = "-1";

    element.style.setProperty("position", "relative", "important");
    element.style.setProperty("left", "0", "important");
    element.style.setProperty("top", "0", "important");
    element.style.setProperty("width", "794px", "important");
    element.style.setProperty("min-width", "794px", "important");
    element.style.setProperty("max-width", "794px", "important");
    element.style.setProperty("height", "1122px", "important");
    element.style.setProperty("min-height", "1122px", "important");
    element.style.setProperty("max-height", "1122px", "important");
    element.style.setProperty("margin", "0", "important");
    element.style.setProperty("transform", "none", "important");
    element.style.setProperty("transform-origin", "top left", "important");
    element.style.setProperty("zoom", "1", "important");
    element.style.setProperty("box-shadow", "none", "important");
    element.style.setProperty("overflow", "hidden", "important");

    const resume = element.querySelector(".ma-resume");
    const sidebar = element.querySelector(".ma-sidebar");
    const main = element.querySelector(".ma-main");

    if (resume) {
      resume.style.setProperty("display", "flex", "important");
      resume.style.setProperty("flex-direction", "row", "important");
      resume.style.setProperty("width", "100%", "important");
      resume.style.setProperty("height", "100%", "important");
    }

    if (sidebar) {
      sidebar.style.setProperty("width", "32%", "important");
      sidebar.style.setProperty("height", "1122px", "important");
    }

    if (main) {
      main.style.setProperty("width", "68%", "important");
    }

    wrapper.appendChild(element);
    document.body.appendChild(wrapper);

    await new Promise((resolve) => setTimeout(resolve, 250));

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      width: 794,
      height: 1122,
      windowWidth: 794,
      windowHeight: 1122,
    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");
    pdf.save("MinimalAccent-resume.pdf");
  } catch (error) {
    console.error("MinimalAccent PDF download error:", error);
  } finally {
    if (wrapper && document.body.contains(wrapper)) {
      document.body.removeChild(wrapper);
    }

    setTimeout(() => {
      pdfGeneratingRef.current = false;
    }, 1000);
  }
};

  // Florence HandlerChange end

  return (
    <TemplateLayout
      templateId="MinimalAccent"
      handleSaveResume={handleSaveResume}
      resumeData={resumeData}
      setResumeData={setResumeData}
       checkPaymentStatus={checkPaymentStatus}
       onReset={handleResetMinimalAccent}
       onLoadResume={loadResume}
       onDownloadPDF={handleDownloadPDF}
    >
      <div className="ma-wrapper">
        <div className="resume-mobile-wrap">
          <div
            className="resume-a4 ma-a4"
            ref={resumeRef}
            style={{ position: "relative" }}
          >
            <div className="ma-resume">
              {/* LEFT BLUE SIDEBAR */}
              <aside className="ma-sidebar">
                {/* Profile Photo */}
                <div
  className="ma-photo-wrapper"
  onClick={openImagePicker}
>
  <img
    src={
      resumeData.profileImage ||
      "/images/minimalaccentprofileimage.png"
    }
    alt="Profile"
    className="ma-photo"
  />

  <input
    type="file"
    accept="image/*"
    ref={fileInputRef}
    style={{ display: "none" }}
    onClick={(e) => e.stopPropagation()}
    onChange={handleImageUpload}
  />
</div>


                {/* Contact Card */}
                <section className="ma-card">

                  <input
                    className="ma-card-line"
                    value={resumeData.contact.address}
                    onChange={(e) =>
                      handleContactChange(
                        "address",
                        e.target.value
                      )
                    }
                  />

                  <input
                    className="ma-card-line"
                    value={resumeData.contact.city}
                    onChange={(e) =>
                      handleContactChange(
                        "city",
                        e.target.value
                      )
                    }
                  />

                  <input
                    className="ma-card-line"
                    value={resumeData.contact.phone}
                    onChange={(e) =>
                      handleContactChange(
                        "phone",
                        e.target.value
                      )
                    }
                  />

                  <input
                    className="ma-card-line"
                    value={resumeData.contact.email}
                    onChange={(e) =>
                      handleContactChange(
                        "email",
                        e.target.value
                      )
                    }
                  />

                </section>

                {/* Skills */}
                <section className="ma-sidebar-section">
                  <h3 className="ma-sidebar-heading" >
                    SKILLS
                  </h3>

                  {resumeData.skills.map((skill, i) => (
                    <div className="ma-skill" key={i}>
                      <input
                        className="ma-skill-label"
                        value={skill}
                        onChange={(e) => {
                          const updated = [...resumeData.skills];
                          updated[i] = e.target.value;
                          setResumeData({
                            ...resumeData,
                            skills: updated,
                          });
                        }}
                      />

                      <div className="ma-skill-bar">
                        <div className={`ma-skill-fill ma-skill-fill-${i + 1}`} />
                      </div>
                    </div>
                  ))}
                </section>

                {/* References */}
                <section className="ma-sidebar-section">
                  <h3 className="ma-sidebar-heading" >
                    REFERENCES
                  </h3>

                  {resumeData.references.map((ref, i) => (
                    <div className="ma-ref-block" key={i}>

                      <input
                        className="ma-ref-name"
                        value={ref.name}
                        onChange={(e) => {
                          const updated = [...resumeData.references];
                          updated[i].name = e.target.value;

                          setResumeData({
                            ...resumeData,
                            references: updated,
                          });
                        }}
                      />

                      <input
                        className="ma-ref-line"
                        value={ref.title}
                        onChange={(e) => {
                          const updated = [...resumeData.references];
                          updated[i].title = e.target.value;

                          setResumeData({
                            ...resumeData,
                            references: updated,
                          });
                        }}
                      />

                      <input
                        className="ma-ref-line"
                        value={ref.contact}
                        onChange={(e) => {
                          const updated = [...resumeData.references];
                          updated[i].contact = e.target.value;

                          setResumeData({
                            ...resumeData,
                            references: updated,
                          });
                        }}
                      />

                    </div>
                  ))}
                </section>
              </aside>

              {/* RIGHT MAIN AREA */}
              <div className="ma-main">
                {/* HEADER */}
                <header className="ma-header">
                  <input
                    className="ma-name"
                    value={resumeData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                  />
                  <input
                    className="ma-title"
                    value={resumeData.jobTitle}
                    onChange={(e) => handleChange("jobTitle", e.target.value)}
                  />
                  <div className="ma-header-line" />
                </header>

                {/* PROFILE */}
                <section className="ma-section">
                  <h2 className="ma-section-title" >
                    PROFILE
                  </h2>
                  <textarea
                    className="ma-section-text ma-profile-input"
                    value={resumeData.profile}
                    onChange={(e) => handleChange("profile", e.target.value)}
                  />
                </section>

                {/* EXPERIENCE */}
                <section className="ma-section">
                  <h2 className="ma-section-title" >
                    EXPERIENCE
                  </h2>

                  {/* Job  */}
                  {resumeData.experience.map((job, i) => (
                    <div className="ma-exp-row" key={i}>
                      <div className="ma-exp-timeline">
                        <div className="ma-exp-node" />
                        <div
                          className={
                            i === resumeData.experience.length - 1
                              ? "ma-exp-line ma-exp-line-short"
                              : "ma-exp-line"
                          }
                        />
                      </div>

                      <div className="ma-exp-content">
                        <input
                          className="ma-exp-title"
                          value={`${job.title} – (${job.duration})`}
                          onChange={(e) => {
                            const updated = [...resumeData.experience];
                            updated[i].title = e.target.value;
                            setResumeData({ ...resumeData, experience: updated });
                          }}
                        />

                        <input
                          className="ma-exp-company"
                          value={job.company}
                          onChange={(e) => {
                            const updated = [...resumeData.experience];
                            updated[i].company = e.target.value;
                            setResumeData({ ...resumeData, experience: updated });
                          }}
                        />

                        <textarea
                          className="ma-section-text ma-exp-desc"
                          value={job.description}
                          onChange={(e) => {
                            const updated = [...resumeData.experience];
                            updated[i].description = e.target.value;
                            setResumeData({ ...resumeData, experience: updated });
                          }}
                        />
                      </div>
                    </div>
                  ))}

                </section>

                {/* EDUCATION */}
                <section className="ma-section ma-section-last">
                  <h2 className="ma-section-title" >
                    EDUCATION
                  </h2>

                  {resumeData.education.map((edu, i) => (
                    <div className="ma-exp-row" key={i}>
                      <div className="ma-exp-timeline">
                        <div className="ma-exp-node" />
                        <div className="ma-exp-line ma-exp-line-short" />
                      </div>

                      <div className="ma-exp-content">
                        <input
                          className="ma-exp-title"
                          value={`${edu.degree} – (${edu.duration})`}
                          onChange={(e) => {
                            const updated = [...resumeData.education];
                            updated[i].degree = e.target.value;
                            setResumeData({ ...resumeData, education: updated });
                          }}
                        />

                        <input
                          className="ma-exp-company"
                          value={edu.school}
                          onChange={(e) => {
                            const updated = [...resumeData.education];
                            updated[i].school = e.target.value;
                            setResumeData({ ...resumeData, education: updated });
                          }}
                        />

                        <textarea
                          className="ma-section-text ma-exp-desc"
                          value={edu.description}
                          onChange={(e) => {
                            const updated = [...resumeData.education];
                            updated[i].description = e.target.value;
                            setResumeData({ ...resumeData, education: updated });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

    </TemplateLayout>
  );
};
export default MinimalAccent;
