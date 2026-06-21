import React, { useEffect, useRef } from "react";
import "./ElegantClassic.css";
import TemplateLayout from "../TemplateLayout";
import { useAuth } from "../../context/AuthContext";
import useResumeTemplate from "../../hooks/useResumeTemplate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { savePdfAndUploadCopy } from "../../services/resumePdfCopyService";

const ElegantClassic = () => {
  const pdfGeneratingRef = useRef(false);

  const defaultData = {
    fullName: "EMERSON REED",
    jobTitle: "PROFESSIONAL TITLE",
    contact: {
      email: "youremail@mail.com",
      phone: "555.555.5555",
      location: "Your City, State",
      linkedin: "linkedin.com/in/yourusername",
    },
    skills: [
      "Process Improvement",
      "Contracts & Negotiations",
      "Project Planning",
      "Reporting & Analytics",
      "Risk Assessment",
      "Resource Management",
      "Adaptability",
      "Conflict Resolution",
    ],
    sidebarEducation: [
      {
        degree: "NAME OF DEGREE",
        meta: "Concentration (if any)\nUniversity Name\nGraduation Year",
      },
      {
        degree: "CERTIFICATION HERE",
        meta: "Certifying Organization\nCompletion Year",
      },
      {
        degree: "CERTIFICATION HERE",
        meta: "Certifying Organization\nCompletion Year",
      },
    ],
    summary: "Seasoned professional with a strong background in operations...",
    competencies:
      "• Strategic Planning • Workflow Optimization • Coordination\n• Leadership Support • Documentation & Reporting\n• Communication • Problem Solving • Time Management",
    experience: [
      {
        title: "POSITION TITLE HERE",
        company: "Company, Location",
        dates: "Date - Date",
        bullets: [
          "Re-wrote internal process guides to reduce training time...",
          "Developed reporting dashboards used by leadership...",
          "Streamlined communication between departments...",
          "Coordinated project timelines and delivered tasks...",
          "Led quality assurance reviews...",
          "Resolved client issues with root-cause analysis...",
        ],
      },
      {
        title: "Administrative Assistant",
        company: "Prime Solutions • 2014 - 2016",
        dates: "2014 - 2016",
        bullets: [
          "Supported office operations including record keeping...",
          "Organized company events, meetings, travel...",
          "Maintained confidential documents...",
          "Provided high-quality customer service...",
        ],
      },
    ],
    education: [
      {
        degree: "DIPLOMA - (2003-2005)",
        meta: "School Name - City, Country",
      },
      {
        degree: "Certificate - Project Coordination",
        meta: "Online Certification - 2020",
      },
      {
        degree: "DIPLOMA - (2000-2003)",
        meta: "School Name - City, Country",
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
  } = useResumeTemplate("ElegantClassic", defaultData);

  const { isAuthenticated } = useAuth();

  const elegantData = {
    ...defaultData,
    ...resumeData,
    contact: {
      ...defaultData.contact,
      ...(resumeData.contact || {}),
    },
    skills: Array.isArray(resumeData.skills) ? resumeData.skills : defaultData.skills,
    sidebarEducation: Array.isArray(resumeData.sidebarEducation)
      ? resumeData.sidebarEducation
      : defaultData.sidebarEducation,
    experience: Array.isArray(resumeData.experience)
      ? resumeData.experience
      : defaultData.experience,
    education: Array.isArray(resumeData.education)
      ? resumeData.education
      : defaultData.education,
  };

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

  const handleResetElegantClassic = () => {
    localStorage.removeItem("ElegantClassic_resumeData");
    setResumeData({ ...defaultData });
  };

  const updateSkill = (index, value) => {
    const updated = [...elegantData.skills];
    updated[index] = value;

    setResumeData({ ...resumeData, skills: updated });
  };

  const updateSidebarEducation = (index, field, value) => {
    const updated = [...elegantData.sidebarEducation];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setResumeData({ ...resumeData, sidebarEducation: updated });
  };

  const updateExperience = (index, field, value) => {
    const updated = [...elegantData.experience];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setResumeData({ ...resumeData, experience: updated });
  };

  const updateExperienceBullet = (jobIndex, bulletIndex, value) => {
    const updated = [...elegantData.experience];
    const bullets = [...updated[jobIndex].bullets];
    bullets[bulletIndex] = value;
    updated[jobIndex] = {
      ...updated[jobIndex],
      bullets,
    };

    setResumeData({ ...resumeData, experience: updated });
  };

  const updateEducation = (index, field, value) => {
    const updated = [...elegantData.education];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setResumeData({ ...resumeData, education: updated });
  };

  const replaceEditableFieldsForPDF = (element) => {
    element.querySelectorAll("input, textarea").forEach((field) => {
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
      const originalElement = document.querySelector(".resume-a4.ec-a4");

      if (!originalElement) {
        console.error("ElegantClassic resume element not found");
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

      const resume = element.querySelector(".ec-resume");
      const body = element.querySelector(".ec-body");
      const sidebar = element.querySelector(".ec-sidebar");
      const main = element.querySelector(".ec-main");

      if (resume) {
        resume.style.setProperty("height", "100%", "important");
        resume.style.setProperty("min-height", "100%", "important");
      }

      if (body) {
        body.style.setProperty("display", "flex", "important");
        body.style.setProperty("flex-direction", "row", "important");
      }

      if (sidebar) {
        sidebar.style.setProperty("width", "30%", "important");
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
        fileName: "ElegantClassic-resume.pdf",
        templateId: "ElegantClassic",
        downloadType: "nonAi",
      });
    } catch (error) {
      console.error("ElegantClassic PDF download error:", error);
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
      templateId="ElegantClassic"
      handleSaveResume={handleSaveResume}
      resumeData={resumeData}
      setResumeData={setResumeData}
      checkPaymentStatus={checkPaymentStatus}
      onReset={handleResetElegantClassic}
      onLoadResume={loadResume}
      onDownloadPDF={handleDownloadPDF}
    >
      <div className="ec-wrapper">
        <div className="resume-mobile-wrap ec-screen-preview">
          <div className="resume-a4 ec-a4" style={{ position: "relative" }}>
            <div className="ec-resume">
              <header className="ec-header">
                <input
                  className="ec-name"
                  value={elegantData.fullName}
                  onChange={(event) => handleChange("fullName", event.target.value)}
                />
                <input
                  className="ec-title"
                  value={elegantData.jobTitle}
                  onChange={(event) => handleChange("jobTitle", event.target.value)}
                />
              </header>

              <div className="ec-body">
                <aside className="ec-sidebar">
                  <section className="ec-sidebar-section">
                    <h3 className="ec-sidebar-heading">CONTACT</h3>

                    <ul className="ec-contact-list">
                      <li>
                        <span className="ec-icon-circle">@</span>
                        <input
                          className="ec-contact-text"
                          value={elegantData.contact.email}
                          onChange={(event) =>
                            handleContactChange("email", event.target.value)
                          }
                        />
                      </li>

                      <li>
                        <span className="ec-icon-circle">Ph</span>
                        <input
                          className="ec-contact-text"
                          value={elegantData.contact.phone}
                          onChange={(event) =>
                            handleContactChange("phone", event.target.value)
                          }
                        />
                      </li>

                      <li>
                        <span className="ec-icon-circle">Loc</span>
                        <input
                          className="ec-contact-text"
                          value={elegantData.contact.location}
                          onChange={(event) =>
                            handleContactChange("location", event.target.value)
                          }
                        />
                      </li>

                      <li>
                        <span className="ec-icon-circle">in</span>
                        <input
                          className="ec-contact-text"
                          value={elegantData.contact.linkedin}
                          onChange={(event) =>
                            handleContactChange("linkedin", event.target.value)
                          }
                        />
                      </li>
                    </ul>
                  </section>

                  <section className="ec-sidebar-section">
                    <h3 className="ec-sidebar-heading">SKILLS</h3>

                    <ul className="ec-skill-list">
                      {elegantData.skills.map((skill, index) => (
                        <li key={index}>
                          <input
                            className="ec-skill-input"
                            value={skill}
                            onChange={(event) => updateSkill(index, event.target.value)}
                          />
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="ec-sidebar-section">
                    <h3 className="ec-sidebar-heading">EDUCATION</h3>

                    {elegantData.sidebarEducation.map((education, index) => (
                      <div className="ec-edu-block" key={index}>
                        <input
                          className="ec-edu-degree"
                          value={education.degree}
                          onChange={(event) =>
                            updateSidebarEducation(index, "degree", event.target.value)
                          }
                        />
                        <textarea
                          className="ec-edu-meta"
                          value={education.meta}
                          onChange={(event) =>
                            updateSidebarEducation(index, "meta", event.target.value)
                          }
                        />
                      </div>
                    ))}
                  </section>
                </aside>

                <main className="ec-main">
                  <section className="ec-section">
                    <h2 className="ec-section-title">SUMMARY</h2>
                    <div className="ec-section-rule" />
                    <textarea
                      className="ec-section-text"
                      value={elegantData.summary}
                      onChange={(event) => handleChange("summary", event.target.value)}
                    />
                  </section>

                  <section className="ec-section">
                    <h2 className="ec-section-title">CORE COMPETENCIES</h2>
                    <div className="ec-section-rule" />

                    <textarea
                      className="ec-section-text ec-competencies"
                      value={elegantData.competencies}
                      onChange={(event) => handleChange("competencies", event.target.value)}
                    />
                  </section>

                  <section className="ec-section">
                    <h2 className="ec-section-title">PROFESSIONAL EXPERIENCE</h2>
                    <div className="ec-section-rule" />

                    {elegantData.experience.map((job, jobIndex) => (
                      <div className="ec-job" key={jobIndex}>
                        <div className="ec-job-header">
                          <div className="ec-job-title-wrapper">
                            <input
                              className="ec-job-title"
                              value={job.title}
                              onChange={(event) =>
                                updateExperience(jobIndex, "title", event.target.value)
                              }
                            />
                            <input
                              className="ec-job-company"
                              value={job.company}
                              onChange={(event) =>
                                updateExperience(jobIndex, "company", event.target.value)
                              }
                            />
                          </div>

                          <input
                            className="ec-job-dates"
                            value={job.dates}
                            onChange={(event) =>
                              updateExperience(jobIndex, "dates", event.target.value)
                            }
                          />
                        </div>

                        <ul className="ec-job-list">
                          {job.bullets.map((bullet, bulletIndex) => (
                            <li key={bulletIndex}>
                              <textarea
                                className="ec-job-bullet"
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

                  <section className="ec-section ec-section-last">
                    <h2 className="ec-section-title">EDUCATION</h2>
                    <div className="ec-section-rule" />

                    {elegantData.education.map((education, index) => (
                      <div className="ec-main-edu" key={index}>
                        <input
                          className="ec-main-edu-degree"
                          value={education.degree}
                          onChange={(event) =>
                            updateEducation(index, "degree", event.target.value)
                          }
                        />
                        <input
                          className="ec-main-edu-meta"
                          value={education.meta}
                          onChange={(event) =>
                            updateEducation(index, "meta", event.target.value)
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

export default ElegantClassic;
