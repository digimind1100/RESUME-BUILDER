import React, { useEffect, useRef } from "react";
import "./CleanProfessional.css";
import TemplateLayout from "../TemplateLayout";
import { useAuth } from "../../context/AuthContext";
import useProfileImage from "../../hooks/useProfileImage";
import useResumeTemplate from "../../hooks/useResumeTemplate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { savePdfAndUploadCopy } from "../../services/resumePdfCopyService";

const CleanProfessional = () => {
  const pdfGeneratingRef = useRef(false);

  const defaultData = {
    fullName: "ANTHONY ROBERTS",
    jobTitle: "Senior Project Manager",
    profileImage: "/images/cleanprofileimage.png",
    summary:
      "Dynamic senior project manager with expertise in planning, leading, and delivering complex initiatives on time and within budget.",
    contact: {
      phone: "+1 254-878-9700",
      email: "anthony.roberta@email.com",
      location: "New York, NY",
      linkedin: "linkedin.com/in/anthonyroberts",
    },
    sidebarEducation: [
      {
        degree: "Master of Business Admin.",
        year: "2011",
      },
      {
        degree: "Bachelor of Science in Business Management",
        year: "2013",
      },
    ],
    skills: [
      "Project Planning & Execution",
      "Risk Management",
      "Budget Management",
      "Team Leadership",
      "Agile & Scrum",
    ],
    experience: [
      {
        title: "Senior Project Manager",
        company: "Company Name",
        dates: "2018 - Present",
        bullets: [
          "Lead cross-functional teams to plan, execute, and deliver strategic projects.",
          "Ensure project scope, timelines, and budgets are met.",
          "Drive improvements to optimize performance.",
        ],
      },
      {
        title: "Project Manager",
        company: "Company Name",
        dates: "2014 - 2018",
        bullets: [
          "Managed multiple projects from concept through completion.",
          "Coordinated with vendors and stakeholders.",
        ],
      },
      {
        title: "Assistant Project Manager",
        company: "Company Name",
        dates: "2011 - 2014",
        bullets: [
          "Assisted senior project managers with scheduling and documentation.",
          "Maintained timelines and deliverables.",
        ],
      },
    ],
    education: [
      {
        degree: "Master of Business Administration",
        year: "2011",
      },
      {
        degree: "Bachelor of Science in Business Management",
        year: "2008",
      },
    ],
  };

  const {
    resumeData,
    setResumeData,
    handleChange,
    handleContactChange,
    handleSaveResume,
    checkPaymentStatus,
    loadResume,
  } = useResumeTemplate("CleanProfessional", defaultData);

  const { fileInputRef, handleImageUpload, openImagePicker } = useProfileImage(
    setResumeData,
    checkPaymentStatus
  );

  const cleanData = {
    ...defaultData,
    ...resumeData,
    contact: {
      ...defaultData.contact,
      ...(resumeData.contact || {}),
    },
    sidebarEducation: Array.isArray(resumeData.sidebarEducation)
      ? resumeData.sidebarEducation
      : defaultData.sidebarEducation,
    skills: Array.isArray(resumeData.skills) ? resumeData.skills : defaultData.skills,
    experience: Array.isArray(resumeData.experience)
      ? resumeData.experience
      : defaultData.experience,
    education: Array.isArray(resumeData.education)
      ? resumeData.education
      : defaultData.education,
  };

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;

    setTimeout(() => {
      loadResume();
    }, 500);
  }, [isAuthenticated]);

  useEffect(() => {
    const handleUserLoggedIn = async () => {
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

  const handleResetCleanProfessional = () => {
    localStorage.removeItem("CleanProfessional_resumeData");

    setResumeData({
      ...defaultData,
      profileImage: "/images/cleanprofileimage.png",
    });
  };

  const updateSidebarEducation = (index, field, value) => {
    const updated = [...cleanData.sidebarEducation];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setResumeData({ ...resumeData, sidebarEducation: updated });
  };

  const updateSkill = (index, value) => {
    const updated = [...cleanData.skills];
    updated[index] = value;

    setResumeData({ ...resumeData, skills: updated });
  };

  const updateExperience = (index, field, value) => {
    const updated = [...cleanData.experience];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setResumeData({ ...resumeData, experience: updated });
  };

  const updateExperienceBullet = (jobIndex, bulletIndex, value) => {
    const updated = [...cleanData.experience];
    const bullets = [...updated[jobIndex].bullets];
    bullets[bulletIndex] = value;

    updated[jobIndex] = {
      ...updated[jobIndex],
      bullets,
    };

    setResumeData({ ...resumeData, experience: updated });
  };

  const updateEducation = (index, field, value) => {
    const updated = [...cleanData.education];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setResumeData({ ...resumeData, education: updated });
  };

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
      const originalElement = document.querySelector(".resume-a4.cp-a4");

      if (!originalElement) {
        console.error("CleanProfessional resume element not found");
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

      const resume = element.querySelector(".cp-resume");
      const body = element.querySelector(".cp-body");
      const sidebar = element.querySelector(".cp-sidebar");
      const main = element.querySelector(".cp-main");

      if (resume) {
        resume.style.setProperty("width", "794px", "important");
        resume.style.setProperty("height", "1122px", "important");
        resume.style.setProperty("min-height", "1122px", "important");
      }

      if (body) {
        body.style.setProperty("display", "flex", "important");
        body.style.setProperty("flex-direction", "row", "important");
      }

      if (sidebar) {
        sidebar.style.setProperty("width", "270px", "important");
        sidebar.style.setProperty("height", "800px", "important");
      }

      if (main) {
        main.style.setProperty("flex", "1", "important");
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
      await savePdfAndUploadCopy({
        pdf,
        fileName: "CleanProfessional-resume.pdf",
        templateId: "CleanProfessional",
        downloadType: "nonAi",
      });
    } catch (error) {
      console.error("CleanProfessional PDF download error:", error);
    } finally {
      if (wrapper && document.body.contains(wrapper)) {
        document.body.removeChild(wrapper);
      }

      setTimeout(() => {
        pdfGeneratingRef.current = false;
      }, 1000);
    }
  };

  return (
    <TemplateLayout
      templateId="CleanProfessional"
      handleSaveResume={handleSaveResume}
      resumeData={resumeData}
      setResumeData={setResumeData}
      checkPaymentStatus={checkPaymentStatus}
      onReset={handleResetCleanProfessional}
      onLoadResume={loadResume}
      onDownloadPDF={handleDownloadPDF}
    >
      <div className="cp-wrapper">
        <div className="resume-mobile-wrap">
          <div className="resume-a4 cp-a4" style={{ position: "relative" }}>
            <div className="cp-resume">
              <header className="cp-header">
                <div
                  className="cp-photo-wrapper cp-photo-overlap"
                  onClick={openImagePicker}
                  title="Click to change photo"
                >
                  <img
                    src={cleanData.profileImage || "/images/cleanprofileimage.png"}
                    alt="Profile"
                    className="cp-photo"
                  />

                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onClick={(event) => event.stopPropagation()}
                    onChange={handleImageUpload}
                  />
                </div>

                <div className="cp-header-text">
                  <input
                    className="cp-name"
                    value={cleanData.fullName}
                    onChange={(event) => handleChange("fullName", event.target.value)}
                  />

                  <input
                    className="cp-title"
                    value={cleanData.jobTitle}
                    onChange={(event) => handleChange("jobTitle", event.target.value)}
                  />
                </div>
              </header>

              <div className="cp-header-divider" />

              <div className="cp-body">
                <aside className="cp-sidebar">
                  <section className="cp-sidebar-section">
                    <h3 className="cp-sidebar-heading">PROFILE SUMMARY</h3>
                    <div className="cp-heading-underline" />
                    <textarea
                      className="cp-sidebar-text"
                      value={cleanData.summary}
                      onChange={(event) => handleChange("summary", event.target.value)}
                    />
                  </section>

                  <section className="cp-sidebar-section">
                    <h3 className="cp-sidebar-heading">EDUCATION</h3>
                    <div className="cp-heading-underline" />

                    {cleanData.sidebarEducation.map((education, index) => (
                      <div className="cp-edu-entry" key={index}>
                        <input
                          className="cp-edu-degree"
                          value={education.degree}
                          onChange={(event) =>
                            updateSidebarEducation(index, "degree", event.target.value)
                          }
                        />
                        <input
                          className="cp-edu-year"
                          value={education.year}
                          onChange={(event) =>
                            updateSidebarEducation(index, "year", event.target.value)
                          }
                        />
                      </div>
                    ))}
                  </section>

                  <section className="cp-sidebar-section">
                    <h3 className="cp-sidebar-heading">SKILLS</h3>
                    <div className="cp-heading-underline" />

                    <ul className="cp-skill-list">
                      {cleanData.skills.map((skill, index) => (
                        <li key={index}>
                          <input
                            className="cp-skill-input"
                            value={skill}
                            onChange={(event) => updateSkill(index, event.target.value)}
                          />
                        </li>
                      ))}
                    </ul>
                  </section>
                </aside>

                <main className="cp-main">
                  <section className="cp-contact">
                    <div className="cp-contact-row">
                      <span className="cp-contact-icon">Phone</span>
                      <input
                        className="cp-contact-text"
                        value={cleanData.contact.phone}
                        onChange={(event) => handleContactChange("phone", event.target.value)}
                      />
                    </div>

                    <div className="cp-contact-row">
                      <span className="cp-contact-icon">Email</span>
                      <input
                        className="cp-contact-text"
                        value={cleanData.contact.email}
                        onChange={(event) => handleContactChange("email", event.target.value)}
                      />
                    </div>

                    <div className="cp-contact-row">
                      <span className="cp-contact-icon">City</span>
                      <input
                        className="cp-contact-text"
                        value={cleanData.contact.location}
                        onChange={(event) => handleContactChange("location", event.target.value)}
                      />
                    </div>

                    <div className="cp-contact-row">
                      <span className="cp-contact-icon">in</span>
                      <input
                        className="cp-contact-text"
                        value={cleanData.contact.linkedin}
                        onChange={(event) => handleContactChange("linkedin", event.target.value)}
                      />
                    </div>
                  </section>

                  <section className="cp-section">
                    <h2 className="cp-section-title">EXPERIENCE</h2>
                    <div className="cp-section-underline" />

                    {cleanData.experience.map((job, jobIndex) => (
                      <div className="cp-job" key={jobIndex}>
                        <div className="cp-job-header">
                          <div className="cp-job-title-wrapper">
                            <input
                              className="cp-job-title"
                              value={job.title}
                              onChange={(event) =>
                                updateExperience(jobIndex, "title", event.target.value)
                              }
                            />
                            <input
                              className="cp-job-company"
                              value={job.company}
                              onChange={(event) =>
                                updateExperience(jobIndex, "company", event.target.value)
                              }
                            />
                          </div>
                          <input
                            className="cp-job-dates"
                            value={job.dates}
                            onChange={(event) =>
                              updateExperience(jobIndex, "dates", event.target.value)
                            }
                          />
                        </div>

                        <ul className="cp-job-list">
                          {job.bullets.map((bullet, bulletIndex) => (
                            <li key={bulletIndex}>
                              <textarea
                                className="cp-job-bullet"
                                value={bullet}
                                onChange={(event) =>
                                  updateExperienceBullet(
                                    jobIndex,
                                    bulletIndex,
                                    event.target.value
                                  )
                                }
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </section>

                  <section className="cp-section">
                    <h2 className="cp-section-title">EDUCATION</h2>
                    <div className="cp-section-underline" />

                    {cleanData.education.map((education, index) => (
                      <div className="cp-edu-main-entry" key={index}>
                        <input
                          className="cp-edu-main-degree"
                          value={education.degree}
                          onChange={(event) =>
                            updateEducation(index, "degree", event.target.value)
                          }
                        />
                        <input
                          className="cp-edu-main-year"
                          value={education.year}
                          onChange={(event) =>
                            updateEducation(index, "year", event.target.value)
                          }
                        />
                      </div>
                    ))}
                  </section>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TemplateLayout>
  );
};

export default CleanProfessional;
