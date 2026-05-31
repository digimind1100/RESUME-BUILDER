import React, { useEffect, useRef } from "react";
import "./DataElite.css";
import TemplateLayout from "../TemplateLayout";
import QRCode from "qrcode";
import { useAuth } from "../../context/AuthContext";
import useProfileImage from "../../hooks/useProfileImage";
import useResumeTemplate from "../../hooks/useResumeTemplate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function DataElite() {
  const pdfGeneratingRef = useRef(false);

  const defaultData = {
    fullName: "LAURA WILLIAMS",
    jobTitle: "DATA ANALYST & JUNIOR DATA SCIENTIST",
    profileImage: "/images/creativeboldimage.png",
    qrContent: "https://your-portfolio-or-dashboard-link.com",
    qrDataUrl: "",
    tagline: "Turning raw data into clear, actionable insights using Python, SQL & BI tools.",
    contact: {
      email: "laura.williams@datamail.com",
      phone: "+1 555-903-4478",
      location: "Seattle, WA",
      linkedin: "linkedin.com/in/lauradata",
      github: "github.com/lauradata",
    },
    skills: [
      "Exploratory Data Analysis (EDA)",
      "Data Cleaning & Wrangling",
      "Statistical Modeling",
      "A/B Testing & Experimentation",
    ],
    tools: [
      "Python (Pandas, NumPy, SciPy)",
      "SQL (PostgreSQL, BigQuery)",
      "Power BI / Tableau",
      "Scikit-learn, TensorFlow (basic)",
    ],
    certifications:
      "Google Data Analytics Certificate\nMicrosoft Power BI Data Analyst\nAWS Cloud Practitioner",
    summary: "Detail-oriented data analyst with 5+ years of experience transforming datasets...",
    experience: [
      {
        title: "Senior Data Analyst",
        company: "InsightLabs Analytics - Seattle, WA",
        dates: "2021 - Present",
        bullets: [
          "Designed dashboards improving decisions by 40%.",
          "Built SQL models & Python scripts.",
          "Led A/B tests with statistically sound insights.",
          "Reduced reporting errors by 25%.",
        ],
      },
      {
        title: "Data Analyst",
        company: "Northline Retail Group - Portland, OR",
        dates: "2018 - 2021",
        bullets: [
          "Developed Power BI dashboards used in 50+ locations.",
          "Analyzed customer behavior improving margins by 8%.",
          "Reduced stockouts via forecasting models.",
        ],
      },
    ],
    projects: [
      {
        title: "Customer Churn Prediction Model",
        description: "Built Python ML models achieving 86% ROC-AUC...",
      },
      {
        title: "Executive KPI Dashboard",
        description: "Designed BI dashboards cutting reporting time by 10+ hours/week.",
      },
    ],
    methods: "SQL, Python, BI Tools, ETL, A/B Testing, Visualization...",
    education: [
      {
        degree: "M.S. in Data Science",
        meta: "University of Washington - 2016-2018",
      },
      {
        degree: "B.S. in Statistics",
        meta: "Oregon State University - 2012-2016",
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
  } = useResumeTemplate("DataElite", defaultData);

  const { fileInputRef, handleImageUpload, openImagePicker } = useProfileImage(
    setResumeData,
    checkPaymentStatus
  );

  const { isAuthenticated } = useAuth();

  const dataElite = {
    ...defaultData,
    ...resumeData,
    contact: {
      ...defaultData.contact,
      ...(resumeData.contact || {}),
    },
    skills: Array.isArray(resumeData.skills) ? resumeData.skills : defaultData.skills,
    tools: Array.isArray(resumeData.tools) ? resumeData.tools : defaultData.tools,
    experience: Array.isArray(resumeData.experience)
      ? resumeData.experience
      : defaultData.experience,
    projects: Array.isArray(resumeData.projects)
      ? resumeData.projects
      : defaultData.projects,
    education: Array.isArray(resumeData.education)
      ? resumeData.education
      : defaultData.education,
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    setTimeout(() => loadResume(), 500);
  }, [isAuthenticated]);

  useEffect(() => {
    const handleUserLoggedIn = async () => {
      await loadResume();
    };

    window.addEventListener("userLoggedIn", handleUserLoggedIn);
    return () => window.removeEventListener("userLoggedIn", handleUserLoggedIn);
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

  const handleResetDataElite = () => {
    localStorage.removeItem("DataElite_resumeData");
    setResumeData({
      ...defaultData,
      profileImage: "/images/creativeboldimage.png",
    });
  };

  const handleGenerateQR = async () => {
    try {
      const url = await QRCode.toDataURL(dataElite.qrContent || "https://example.com");
      handleChange("qrDataUrl", url);
    } catch (error) {
      console.error("QR generation error:", error);
      alert("QR Code create karte waqt error aaya. Console check karein.");
    }
  };

  const updateListItem = (section, index, value) => {
    const updated = [...dataElite[section]];
    updated[index] = value;
    setResumeData({ ...resumeData, [section]: updated });
  };

  const updateExperience = (index, field, value) => {
    const updated = [...dataElite.experience];
    updated[index] = { ...updated[index], [field]: value };
    setResumeData({ ...resumeData, experience: updated });
  };

  const updateExperienceBullet = (jobIndex, bulletIndex, value) => {
    const updated = [...dataElite.experience];
    const bullets = [...updated[jobIndex].bullets];
    bullets[bulletIndex] = value;
    updated[jobIndex] = { ...updated[jobIndex], bullets };
    setResumeData({ ...resumeData, experience: updated });
  };

  const updateProject = (index, field, value) => {
    const updated = [...dataElite.projects];
    updated[index] = { ...updated[index], [field]: value };
    setResumeData({ ...resumeData, projects: updated });
  };

  const updateEducation = (index, field, value) => {
    const updated = [...dataElite.education];
    updated[index] = { ...updated[index], [field]: value };
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
      const originalElement = document.querySelector(".resume-a4.de-a4");
      if (!originalElement) {
        console.error("DataElite resume element not found");
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
      element.style.setProperty("width", "794px", "important");
      element.style.setProperty("min-width", "794px", "important");
      element.style.setProperty("height", "1122px", "important");
      element.style.setProperty("min-height", "1122px", "important");
      element.style.setProperty("max-height", "1122px", "important");
      element.style.setProperty("margin", "0", "important");
      element.style.setProperty("transform", "none", "important");
      element.style.setProperty("zoom", "1", "important");
      element.style.setProperty("box-shadow", "none", "important");
      element.style.setProperty("overflow", "hidden", "important");

      const resume = element.querySelector(".de-resume");
      const sidebar = element.querySelector(".de-sidebar");
      const main = element.querySelector(".de-main");

      if (resume) {
        resume.style.setProperty("display", "flex", "important");
        resume.style.setProperty("flex-direction", "row", "important");
        resume.style.setProperty("height", "100%", "important");
      }
      if (sidebar) {
        sidebar.style.setProperty("width", "35%", "important");
        sidebar.style.setProperty("height", "1122px", "important");
      }
      if (main) {
        main.style.setProperty("width", "65%", "important");
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
      pdf.save("DataElite-resume.pdf");
    } catch (error) {
      console.error("DataElite PDF download error:", error);
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
      templateId="DataElite"
      handleSaveResume={handleSaveResume}
      resumeData={resumeData}
      setResumeData={setResumeData}
      checkPaymentStatus={checkPaymentStatus}
      onReset={handleResetDataElite}
      onLoadResume={loadResume}
      onDownloadPDF={handleDownloadPDF}
    >
      <div className="de-wrapper">
        <div className="de-qr-bar no-pdf">
          <div className="de-qr-label">
            <strong>QR Code Link</strong>
            <span> (Portfolio / GitHub / Dashboard)</span>
          </div>
          <input
            className="de-qr-input"
            value={dataElite.qrContent}
            onChange={(event) => handleChange("qrContent", event.target.value)}
            placeholder="Paste URL or any text to encode..."
          />
          <button className="de-qr-btn" onClick={handleGenerateQR}>
            Create QR Code
          </button>
        </div>

        <div className="resume-mobile-wrap de-screen-preview">
          <div className="resume-a4 de-a4" style={{ position: "relative" }}>
            <div className="de-resume">
              <aside className="de-sidebar">
                <div className="de-photo-wrapper" onClick={openImagePicker}>
                  <img
                    src={dataElite.profileImage || "/images/creativeboldimage.png"}
                    alt="Profile"
                    className="de-photo"
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

                <section className="de-side-section">
                  <h3 className="de-side-heading">CONTACT</h3>
                  <ul className="de-contact-list">
                    {Object.keys(defaultData.contact).map((field) => (
                      <li key={field}>
                        <span className="de-icon" />
                        <input
                          className="de-contact-text"
                          value={dataElite.contact[field]}
                          onChange={(event) =>
                            handleContactChange(field, event.target.value)
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="de-side-section">
                  <h3 className="de-side-heading">CORE SKILLS</h3>
                  <ul className="de-side-list">
                    {dataElite.skills.map((skill, index) => (
                      <li key={index}>
                        <input
                          className="de-side-input"
                          value={skill}
                          onChange={(event) =>
                            updateListItem("skills", index, event.target.value)
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="de-side-section">
                  <h3 className="de-side-heading">TOOLS & TECH</h3>
                  <ul className="de-side-list">
                    {dataElite.tools.map((tool, index) => (
                      <li key={index}>
                        <input
                          className="de-side-input"
                          value={tool}
                          onChange={(event) =>
                            updateListItem("tools", index, event.target.value)
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="de-side-section">
                  <h3 className="de-side-heading">CERTIFICATIONS</h3>
                  <textarea
                    className="de-side-text"
                    value={dataElite.certifications}
                    onChange={(event) => handleChange("certifications", event.target.value)}
                  />
                </section>
              </aside>

              <main className="de-main">
                <header className="de-header">
                  <div className="de-header-left">
                    <input
                      className="de-name"
                      value={dataElite.fullName}
                      onChange={(event) => handleChange("fullName", event.target.value)}
                    />

                    <input
                      className="de-title"
                      value={dataElite.jobTitle}
                      onChange={(event) => handleChange("jobTitle", event.target.value)}
                    />

                    <textarea
                      className="de-tagline"
                      value={dataElite.tagline}
                      onChange={(event) => handleChange("tagline", event.target.value)}
                    />
                  </div>

                  <div className="de-header-right">
                    {dataElite.qrDataUrl ? (
                      <img src={dataElite.qrDataUrl} alt="QR" className="de-header-qr" />
                    ) : (
                      <div className="de-header-qr-placeholder">
                        <span>QR</span>
                        <span>Portfolio</span>
                      </div>
                    )}
                  </div>
                </header>

                <section className="de-section">
                  <h2 className="de-section-title">SUMMARY</h2>
                  <textarea
                    className="de-section-text"
                    value={dataElite.summary}
                    onChange={(event) => handleChange("summary", event.target.value)}
                  />
                </section>

                <section className="de-section">
                  <h2 className="de-section-title">EXPERIENCE</h2>
                  {dataElite.experience.map((job, jobIndex) => (
                    <div className="de-job" key={jobIndex}>
                      <div className="de-job-header">
                        <div className="de-job-title-wrapper">
                          <input
                            className="de-job-title"
                            value={job.title}
                            onChange={(event) =>
                              updateExperience(jobIndex, "title", event.target.value)
                            }
                          />
                          <input
                            className="de-job-company"
                            value={job.company}
                            onChange={(event) =>
                              updateExperience(jobIndex, "company", event.target.value)
                            }
                          />
                        </div>
                        <input
                          className="de-job-dates"
                          value={job.dates}
                          onChange={(event) =>
                            updateExperience(jobIndex, "dates", event.target.value)
                          }
                        />
                      </div>
                      <ul className="de-job-list">
                        {job.bullets.map((bullet, bulletIndex) => (
                          <li key={bulletIndex}>
                            <textarea
                              className="de-job-bullet"
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

                <section className="de-section">
                  <h2 className="de-section-title">SELECTED PROJECTS</h2>
                  {dataElite.projects.map((project, index) => (
                    <div className="de-project" key={index}>
                      <input
                        className="de-project-title"
                        value={project.title}
                        onChange={(event) =>
                          updateProject(index, "title", event.target.value)
                        }
                      />
                      <textarea
                        className="de-project-text"
                        value={project.description}
                        onChange={(event) =>
                          updateProject(index, "description", event.target.value)
                        }
                      />
                    </div>
                  ))}
                </section>

                <section className="de-section">
                  <h2 className="de-section-title">METHODS & TOOLKIT</h2>
                  <textarea
                    className="de-section-text"
                    value={dataElite.methods}
                    onChange={(event) => handleChange("methods", event.target.value)}
                  />
                </section>

                <section className="de-section de-last">
                  <h2 className="de-section-title">EDUCATION</h2>
                  {dataElite.education.map((education, index) => (
                    <div className="de-edu-item" key={index}>
                      <input
                        className="de-edu-degree"
                        value={education.degree}
                        onChange={(event) =>
                          updateEducation(index, "degree", event.target.value)
                        }
                      />
                      <input
                        className="de-edu-meta"
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
    </TemplateLayout>
  );
}
