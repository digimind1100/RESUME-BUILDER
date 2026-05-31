import React, { useEffect, useRef } from "react";
import "./EngineerElite.css";
import QRCode from "qrcode";
import TemplateLayout from "../TemplateLayout";
import { useAuth } from "../../context/AuthContext";
import useProfileImage from "../../hooks/useProfileImage";
import useResumeTemplate from "../../hooks/useResumeTemplate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function EngineerElite() {
  const pdfGeneratingRef = useRef(false);

  const defaultData = {
    fullName: "EMMA ROBERTS",
    jobTitle: "MECHANICAL ENGINEER",
    profileImage: "/images/engineereliteprofileimage.png",
    info: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      state: "",
      city: "",
      zip: "",
      linkedin: "",
      engineerId: "",
    },
    qrDataUrl: "",
    skills: [
      "CAD Modeling",
      "Thermodynamics",
      "Finite Element Analysis",
      "Problem Solving",
      "Technical Writing",
    ],
    tools: ["SolidWorks", "AutoCAD", "MATLAB", "MS Office"],
    certifications: "Certified SolidWorks Professional (CSWP)\nProfessional Engineer (PE)",
    summary: "Detail-oriented mechanical engineer with 6+ years of experience...",
    experience: [
      {
        title: "Mechanical Engineer",
        company: "ABC Manufacturing - Los Angeles",
        dates: "2018-Present",
        bullets: [
          "Lead design and validation...",
          "Collaborate with cross-functional teams...",
          "Develop detailed CAD models...",
          "Implement design improvements...",
        ],
      },
      {
        title: "Jr. Mechanical Engineer",
        company: "XYZ Technologies - Pasadena",
        dates: "2015-2018",
        bullets: [
          "Assisted in mechanical design...",
          "Supported field installations...",
          "Prepared technical reports...",
        ],
      },
    ],
    projects: [
      {
        title: "Heat Exchanger Optimization",
        year: "2020",
        description: "Led a cross-functional engineering team to redesign...",
      },
    ],
    education: [
      {
        degree: "M.S. in Mechanical Engineering",
        meta: "UC Berkeley - 2015-2018",
      },
      {
        degree: "B.S. in Mechanical Engineering",
        meta: "UT Austin - 2009-2013",
      },
    ],
  };

  const {
    resumeData,
    setResumeData,
    handleChange,
    handleSaveResume,
    checkPaymentStatus,
    loadResume,
  } = useResumeTemplate("EngineerElite", defaultData);

  const { fileInputRef, handleImageUpload, openImagePicker } = useProfileImage(
    setResumeData,
    checkPaymentStatus
  );

  const { isAuthenticated } = useAuth();

  const engineerData = {
    ...defaultData,
    ...resumeData,
    info: {
      ...defaultData.info,
      ...(resumeData.info || {}),
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

  const handleResetEngineerElite = () => {
    localStorage.removeItem("EngineerElite_resumeData");
    setResumeData({
      ...defaultData,
      profileImage: "/images/engineereliteprofileimage.png",
    });
  };

  const updateInfo = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      info: {
        ...(prev.info || defaultData.info),
        [field]: value,
      },
    }));
  };

  const handleCreateQr = async () => {
    try {
      const url = await QRCode.toDataURL(JSON.stringify(engineerData.info));
      handleChange("qrDataUrl", url);
    } catch (error) {
      console.error("QR generation error:", error);
      alert("QR Code generate karte waqt error.");
    }
  };

  const updateListItem = (section, index, value) => {
    const updated = [...engineerData[section]];
    updated[index] = value;
    setResumeData({ ...resumeData, [section]: updated });
  };

  const updateExperience = (index, field, value) => {
    const updated = [...engineerData.experience];
    updated[index] = { ...updated[index], [field]: value };
    setResumeData({ ...resumeData, experience: updated });
  };

  const updateExperienceBullet = (jobIndex, bulletIndex, value) => {
    const updated = [...engineerData.experience];
    const bullets = [...updated[jobIndex].bullets];
    bullets[bulletIndex] = value;
    updated[jobIndex] = { ...updated[jobIndex], bullets };
    setResumeData({ ...resumeData, experience: updated });
  };

  const updateProject = (index, field, value) => {
    const updated = [...engineerData.projects];
    updated[index] = { ...updated[index], [field]: value };
    setResumeData({ ...resumeData, projects: updated });
  };

  const updateEducation = (index, field, value) => {
    const updated = [...engineerData.education];
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
      const originalElement = document.querySelector(".resume-a4.ee-a4");

      if (!originalElement) {
        console.error("EngineerElite resume element not found");
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

      const resume = element.querySelector(".ee-resume");
      const sidebar = element.querySelector(".ee-sidebar");
      const main = element.querySelector(".ee-main");

      if (resume) {
        resume.style.setProperty("display", "flex", "important");
        resume.style.setProperty("flex-direction", "row", "important");
        resume.style.setProperty("height", "100%", "important");
      }

      if (sidebar) {
        sidebar.style.setProperty("width", "28%", "important");
        sidebar.style.setProperty("height", "1122px", "important");
      }

      if (main) {
        main.style.setProperty("width", "72%", "important");
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
      pdf.save("EngineerElite-resume.pdf");
    } catch (error) {
      console.error("EngineerElite PDF download error:", error);
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
      templateId="EngineerElite"
      handleSaveResume={handleSaveResume}
      resumeData={resumeData}
      setResumeData={setResumeData}
      checkPaymentStatus={checkPaymentStatus}
      onReset={handleResetEngineerElite}
      onLoadResume={loadResume}
      onDownloadPDF={handleDownloadPDF}
    >
      <div className="ee-wrapper">
        <div className="ee-form no-pdf">
          <h3 className="ee-form-title">Personal Info (for QR Code)</h3>

          <div className="ee-form-grid">
            {Object.keys(defaultData.info).map((field) => (
              <div
                className={`ee-form-field ${field === "engineerId" ? "ee-form-full" : ""}`}
                key={field}
              >
                <label>{field === "engineerId" ? "Engineer ID" : field}</label>
                <input
                  name={field}
                  value={engineerData.info[field]}
                  onChange={(event) => updateInfo(field, event.target.value)}
                  placeholder={`Enter your ${field}`}
                />
              </div>
            ))}
          </div>

          <div className="ee-form-actions">
            <button onClick={handleCreateQr}>Create QR Code</button>
          </div>
        </div>

        <div className="resume-mobile-wrap ee-screen-preview">
          <div className="resume-a4 ee-a4" style={{ position: "relative" }}>
            <div className="ee-resume">
              <aside className="ee-sidebar">
                <div className="ee-photo-wrapper" onClick={openImagePicker}>
                  <img
                    src={
                      engineerData.profileImage ||
                      "/images/engineereliteprofileimage.png"
                    }
                    alt="Profile"
                    className="ee-photo"
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

                <div className="ee-qr-wrapper">
                  {engineerData.qrDataUrl ? (
                    <img src={engineerData.qrDataUrl} className="ee-qr-image" alt="QR Code" />
                  ) : (
                    <div className="ee-qr-placeholder">
                      <span>QR CODE</span>
                    </div>
                  )}
                </div>

                <div className="ee-engineer-id">
                  <span className="ee-engineer-id-label">ENGINEER ID</span>
                  <span className="ee-engineer-id-value">
                    {engineerData.info.engineerId || "ENG-XXXX-XXX"}
                  </span>
                </div>

                <section className="ee-side-section">
                  <h3 className="ee-side-heading">SKILLS</h3>
                  <ul className="ee-side-list">
                    {engineerData.skills.map((skill, index) => (
                      <li key={index}>
                        <input
                          className="ee-side-input"
                          value={skill}
                          onChange={(event) =>
                            updateListItem("skills", index, event.target.value)
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="ee-side-section">
                  <h3 className="ee-side-heading">TOOLS</h3>
                  <ul className="ee-side-list">
                    {engineerData.tools.map((tool, index) => (
                      <li key={index}>
                        <input
                          className="ee-side-input"
                          value={tool}
                          onChange={(event) =>
                            updateListItem("tools", index, event.target.value)
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="ee-side-section">
                  <h3 className="ee-side-heading">CERTIFICATIONS</h3>
                  <textarea
                    className="ee-side-text"
                    value={engineerData.certifications}
                    onChange={(event) => handleChange("certifications", event.target.value)}
                  />
                </section>
              </aside>

              <main className="ee-main">
                <header className="ee-header">
                  <input
                    className="ee-name"
                    value={engineerData.fullName}
                    onChange={(event) => handleChange("fullName", event.target.value)}
                  />
                  <input
                    className="ee-title"
                    value={engineerData.jobTitle}
                    onChange={(event) => handleChange("jobTitle", event.target.value)}
                  />
                  <div className="ee-header-line" />
                </header>

                <section className="ee-section">
                  <h2 className="ee-section-title">SUMMARY</h2>
                  <textarea
                    className="ee-section-text"
                    value={engineerData.summary}
                    onChange={(event) => handleChange("summary", event.target.value)}
                  />
                </section>

                <section className="ee-section">
                  <h2 className="ee-section-title">EXPERIENCE</h2>

                  {engineerData.experience.map((job, jobIndex) => (
                    <div className="ee-job" key={jobIndex}>
                      <div className="ee-job-header">
                        <div className="ee-job-title-wrapper">
                          <input
                            className="ee-job-title"
                            value={job.title}
                            onChange={(event) =>
                              updateExperience(jobIndex, "title", event.target.value)
                            }
                          />
                          <input
                            className="ee-job-company"
                            value={job.company}
                            onChange={(event) =>
                              updateExperience(jobIndex, "company", event.target.value)
                            }
                          />
                        </div>
                        <input
                          className="ee-job-dates"
                          value={job.dates}
                          onChange={(event) =>
                            updateExperience(jobIndex, "dates", event.target.value)
                          }
                        />
                      </div>

                      <ul className="ee-job-list">
                        {job.bullets.map((bullet, bulletIndex) => (
                          <li key={bulletIndex}>
                            <textarea
                              className="ee-job-bullet"
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

                <section className="ee-section">
                  <h2 className="ee-section-title">PROJECTS</h2>

                  {engineerData.projects.map((project, index) => (
                    <div className="ee-project" key={index}>
                      <div className="ee-project-header">
                        <input
                          className="ee-project-title"
                          value={project.title}
                          onChange={(event) =>
                            updateProject(index, "title", event.target.value)
                          }
                        />
                        <input
                          className="ee-project-year"
                          value={project.year}
                          onChange={(event) =>
                            updateProject(index, "year", event.target.value)
                          }
                        />
                      </div>
                      <textarea
                        className="ee-section-text"
                        value={project.description}
                        onChange={(event) =>
                          updateProject(index, "description", event.target.value)
                        }
                      />
                    </div>
                  ))}
                </section>

                <section className="ee-section ee-last">
                  <h2 className="ee-section-title">EDUCATION</h2>

                  {engineerData.education.map((education, index) => (
                    <div className="ee-edu-item" key={index}>
                      <input
                        className="ee-edu-degree"
                        value={education.degree}
                        onChange={(event) =>
                          updateEducation(index, "degree", event.target.value)
                        }
                      />
                      <input
                        className="ee-edu-meta"
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
