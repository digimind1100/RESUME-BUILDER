import React, { useEffect, useRef } from "react";
import "./SoftTech.css";
import TemplateLayout from "../TemplateLayout";
import QRCode from "qrcode";
import { useAuth } from "../../context/AuthContext";
import useProfileImage from "../../hooks/useProfileImage";
import useResumeTemplate from "../../hooks/useResumeTemplate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { savePdfAndUploadCopy } from "../../services/resumePdfCopyService";

export default function SoftTech() {
  const pdfGeneratingRef = useRef(false);

  const defaultData = {
    fullName: "EMMA ROBERTS",
    jobTitle: "FULL STACK DEVELOPER",
    profileImage: "/images/minimalaccentprofileimage.png",
    info: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      state: "",
      city: "",
      zip: "",
      linkedin: "",
      github: "",
      portfolio: "",
    },
    qrDataUrl: "",
    contact: {
      phone: "+1 555-789-3320",
      email: "emma.roberts@mail.com",
      location: "San Francisco, CA",
      website: "www.emmadev.com",
    },
    skills: ["JavaScript (ES6+)", "React & Next.js", "Node.js & Express", "REST & GraphQL APIs"],
    techStack: ["TypeScript", "Python / Django", "PostgreSQL, MongoDB", "AWS / Docker / CI-CD"],
    certifications: "AWS Certified Solutions Architect\nGoogle Cloud Developer\nScrum Master (PSM I)",
    about:
      "Passionate full stack developer with 7+ years of experience designing and implementing scalable applications.",
    experience: [
      {
        title: "Senior Full Stack Developer",
        company: "Meta - Menlo Park, CA",
        dates: "2019 - Present",
        bullets: [
          "Lead development of scalable web apps.",
          "Collaborated with cross-functional teams.",
          "Improved app performance by 30%.",
          "Mentored junior developers.",
        ],
      },
      {
        title: "Full Stack Developer",
        company: "Web Solutions Inc. - San Francisco, CA",
        dates: "2015 - 2019",
        bullets: [
          "Built responsive applications using Django & React.",
          "Integrated APIs and payment systems.",
          "Created CI/CD pipelines for deployments.",
        ],
      },
    ],
    projects: [
      {
        title: "Real-Time Analytics Dashboard",
        description: "Designed analytics dashboard using React, WebSockets & Node.js.",
      },
      {
        title: "Multi-Tenant SaaS Platform",
        description: "Developed SaaS platform with RBAC and automated billing.",
      },
    ],
    tools: "React, Node.js, TypeScript, PostgreSQL, Docker, AWS, CI/CD, etc.",
    achievements: [
      "Improved conversion rates by 15%.",
      "Reduced infrastructure cost by 20%.",
      "Delivered internal React performance seminar.",
    ],
    education: [
      {
        degree: "B.S. in Computer Science",
        meta: "UC Berkeley - 2011 - 2015",
      },
      {
        degree: "Full Stack Nanodegree",
        meta: "Udacity - 2016",
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
  } = useResumeTemplate("SoftTech", defaultData);

  const { fileInputRef, handleImageUpload, openImagePicker } = useProfileImage(
    setResumeData,
    checkPaymentStatus
  );

  const { isAuthenticated } = useAuth();

  const softData = {
    ...defaultData,
    ...resumeData,
    info: {
      ...defaultData.info,
      ...(resumeData.info || {}),
    },
    contact: {
      ...defaultData.contact,
      ...(resumeData.contact || {}),
    },
    skills: Array.isArray(resumeData.skills) ? resumeData.skills : defaultData.skills,
    techStack: Array.isArray(resumeData.techStack)
      ? resumeData.techStack
      : defaultData.techStack,
    experience: Array.isArray(resumeData.experience)
      ? resumeData.experience
      : defaultData.experience,
    projects: Array.isArray(resumeData.projects)
      ? resumeData.projects
      : defaultData.projects,
    achievements: Array.isArray(resumeData.achievements)
      ? resumeData.achievements
      : defaultData.achievements,
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

  const handleResetSoftTech = () => {
    localStorage.removeItem("SoftTech_resumeData");
    setResumeData({
      ...defaultData,
      profileImage: "/images/minimalaccentprofileimage.png",
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
      const url = await QRCode.toDataURL(JSON.stringify(softData.info));
      handleChange("qrDataUrl", url);
    } catch (error) {
      console.error("QR error:", error);
    }
  };

  const updateListItem = (section, index, value) => {
    const updated = [...softData[section]];
    updated[index] = value;
    setResumeData({ ...resumeData, [section]: updated });
  };

  const updateExperience = (index, field, value) => {
    const updated = [...softData.experience];
    updated[index] = { ...updated[index], [field]: value };
    setResumeData({ ...resumeData, experience: updated });
  };

  const updateExperienceBullet = (jobIndex, bulletIndex, value) => {
    const updated = [...softData.experience];
    const bullets = [...updated[jobIndex].bullets];
    bullets[bulletIndex] = value;
    updated[jobIndex] = { ...updated[jobIndex], bullets };
    setResumeData({ ...resumeData, experience: updated });
  };

  const updateProject = (index, field, value) => {
    const updated = [...softData.projects];
    updated[index] = { ...updated[index], [field]: value };
    setResumeData({ ...resumeData, projects: updated });
  };

  const updateEducation = (index, field, value) => {
    const updated = [...softData.education];
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
      const originalElement = document.querySelector(".resume-a4.st-a4");
      if (!originalElement) {
        console.error("SoftTech resume element not found");
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

      const resume = element.querySelector(".st-resume");
      const sidebar = element.querySelector(".st-sidebar");
      const main = element.querySelector(".st-main");

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
        main.style.setProperty("height", "1122px", "important");
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
        fileName: "SoftTech-resume.pdf",
        templateId: "SoftTech",
        downloadType: "nonAi",
      });
    } catch (error) {
      console.error("SoftTech PDF download error:", error);
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
      templateId="SoftTech"
      handleSaveResume={handleSaveResume}
      resumeData={resumeData}
      setResumeData={setResumeData}
      checkPaymentStatus={checkPaymentStatus}
      onReset={handleResetSoftTech}
      onLoadResume={loadResume}
      onDownloadPDF={handleDownloadPDF}
    >
      <div className="st-wrapper">
        <div className="st-form no-pdf">
          <h3 className="st-form-title">Personal Info (QR Code)</h3>

          <div className="st-form-grid">
            {Object.keys(defaultData.info).map((field) => (
              <div
                className={`st-form-field ${field === "portfolio" ? "st-form-full" : ""}`}
                key={field}
              >
                <label>{field}</label>
                <input
                  name={field}
                  value={softData.info[field]}
                  onChange={(event) => updateInfo(field, event.target.value)}
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}
          </div>

          <div className="st-form-actions">
            <button onClick={handleCreateQr}>Create QR Code</button>
          </div>
        </div>

        <div className="resume-mobile-wrap st-screen-preview">
          <div className="resume-a4 st-a4" style={{ position: "relative" }}>
            <div className="st-resume">
              <aside className="st-sidebar">
                <div className="st-qr-wrapper">
                  {softData.qrDataUrl ? (
                    <img src={softData.qrDataUrl} alt="QR Code" className="st-qr-image" />
                  ) : (
                    <div className="st-qr-placeholder">QR CODE</div>
                  )}
                </div>

                <section className="st-side-section">
                  <h3 className="st-side-heading">CONTACT</h3>
                  <ul className="st-contact-list">
                    {[
                      ["phone", "Phone"],
                      ["email", "Email"],
                      ["location", "City"],
                      ["website", "Web"],
                    ].map(([field]) => (
                      <li key={field}>
                        <input
                          className="st-contact-text"
                          value={softData.contact[field]}
                          onChange={(event) =>
                            handleContactChange(field, event.target.value)
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="st-side-section">
                  <h3 className="st-side-heading">SKILLS</h3>
                  <ul className="st-side-list">
                    {softData.skills.map((skill, index) => (
                      <li key={index}>
                        <input
                          className="st-side-input"
                          value={skill}
                          onChange={(event) =>
                            updateListItem("skills", index, event.target.value)
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="st-side-section">
                  <h3 className="st-side-heading">TECH STACK</h3>
                  <ul className="st-side-list">
                    {softData.techStack.map((tech, index) => (
                      <li key={index}>
                        <input
                          className="st-side-input"
                          value={tech}
                          onChange={(event) =>
                            updateListItem("techStack", index, event.target.value)
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="st-side-section">
                  <h3 className="st-side-heading">CERTIFICATIONS</h3>
                  <textarea
                    className="st-side-text"
                    value={softData.certifications}
                    onChange={(event) => handleChange("certifications", event.target.value)}
                  />
                </section>

                <div className="st-qr-wrapper st-qr-bottom">
                  {softData.qrDataUrl ? (
                    <img src={softData.qrDataUrl} alt="QR Code" className="st-qr-image" />
                  ) : (
                    <div className="st-qr-placeholder">QR CODE</div>
                  )}
                </div>
              </aside>

              <main className="st-main">
                <header className="st-header">
                  <div className="st-header-left">
                    <input
                      className="st-name"
                      value={softData.fullName}
                      onChange={(event) => handleChange("fullName", event.target.value)}
                    />
                    <input
                      className="st-title"
                      value={softData.jobTitle}
                      onChange={(event) => handleChange("jobTitle", event.target.value)}
                    />
                    <div className="st-header-line" />
                  </div>

                  <div className="st-header-photo" onClick={openImagePicker}>
                    <img
                      src={
                        softData.profileImage ||
                        "/images/minimalaccentprofileimage.png"
                      }
                      alt="Profile"
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
                </header>

                <section className="st-section">
                  <h2 className="st-section-title">ABOUT ME</h2>
                  <textarea
                    className="st-section-text"
                    value={softData.about}
                    onChange={(event) => handleChange("about", event.target.value)}
                  />
                </section>

                <section className="st-section">
                  <h2 className="st-section-title">EXPERIENCE</h2>
                  {softData.experience.map((job, jobIndex) => (
                    <div className="st-job" key={jobIndex}>
                      <div className="st-job-header">
                        <div className="st-job-title-wrapper">
                          <input
                            className="st-job-title"
                            value={job.title}
                            onChange={(event) =>
                              updateExperience(jobIndex, "title", event.target.value)
                            }
                          />
                          <input
                            className="st-job-company"
                            value={job.company}
                            onChange={(event) =>
                              updateExperience(jobIndex, "company", event.target.value)
                            }
                          />
                        </div>
                        <input
                          className="st-job-dates"
                          value={job.dates}
                          onChange={(event) =>
                            updateExperience(jobIndex, "dates", event.target.value)
                          }
                        />
                      </div>

                      <ul className="st-job-list">
                        {job.bullets.map((bullet, bulletIndex) => (
                          <li key={bulletIndex}>
                            <textarea
                              className="st-job-bullet"
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

                <section className="st-section">
                  <h2 className="st-section-title">FEATURED PROJECTS</h2>
                  {softData.projects.map((project, index) => (
                    <div className="st-project" key={index}>
                      <input
                        className="st-project-title"
                        value={project.title}
                        onChange={(event) =>
                          updateProject(index, "title", event.target.value)
                        }
                      />
                      <textarea
                        className="st-project-text"
                        value={project.description}
                        onChange={(event) =>
                          updateProject(index, "description", event.target.value)
                        }
                      />
                    </div>
                  ))}
                </section>

                <section className="st-section">
                  <h2 className="st-section-title">TOOLS & TECHNOLOGIES</h2>
                  <textarea
                    className="st-section-text"
                    value={softData.tools}
                    onChange={(event) => handleChange("tools", event.target.value)}
                  />
                </section>

                <section className="st-section">
                  <h2 className="st-section-title">ACHIEVEMENTS</h2>
                  <ul className="st-job-list">
                    {softData.achievements.map((achievement, index) => (
                      <li key={index}>
                        <textarea
                          className="st-job-bullet"
                          value={achievement}
                          onChange={(event) =>
                            updateListItem("achievements", index, event.target.value)
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="st-section st-last">
                  <h2 className="st-section-title">EDUCATION</h2>
                  {softData.education.map((education, index) => (
                    <div className="st-edu-item" key={index}>
                      <input
                        className="st-edu-degree"
                        value={education.degree}
                        onChange={(event) => {
                          const updated = [...softData.education];
                          updated[index] = { ...updated[index], degree: event.target.value };
                          setResumeData({ ...resumeData, education: updated });
                        }}
                      />
                      <input
                        className="st-edu-meta"
                        value={education.meta}
                        onChange={(event) => {
                          const updated = [...softData.education];
                          updated[index] = { ...updated[index], meta: event.target.value };
                          setResumeData({ ...resumeData, education: updated });
                        }}
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
