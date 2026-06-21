import React, { useEffect, useRef } from "react";
import "./EngineerPrime.css";
import TemplateLayout from "../TemplateLayout";
import QRCode from "qrcode";
import { useAuth } from "../../context/AuthContext";
import useProfileImage from "../../hooks/useProfileImage";
import useResumeTemplate from "../../hooks/useResumeTemplate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { savePdfAndUploadCopy } from "../../services/resumePdfCopyService";

export default function EngineerPrime() {
  const pdfGeneratingRef = useRef(false);

  const defaultData = {
    fullName: "JONATHAN KELVIN",
    jobTitle: "CIVIL ENGINEER",
    profileImage: "/images/cleanprofileimage.png",
    info: {
      fullName: "",
      email: "",
      telephone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      linkedin: "",
    },
    qrDataUrl: "/images/engineerprime-qr.png",
    skills: [
      "Structural Analysis",
      "Foundation Design",
      "AutoCAD / Civil 3D",
      "Seismic Load Calculations",
      "Project Coordination",
    ],
    software: ["ETABS", "SAP2000", "STAAD Pro", "Revit"],
    summary:
      "Civil engineer with 8+ years of experience specializing in structural design, site planning, and infrastructure development.",
    experience: [
      {
        title: "Senior Civil Engineer",
        dates: "2019 - Present",
        location: "BlueStone Engineering, NY",
        bullets: [
          "Performed seismic load analysis...",
          "Led a team of 6 engineers...",
          "Optimized foundation systems...",
          "Conducted site inspections...",
        ],
      },
      {
        title: "Structural Engineer",
        dates: "2015 - 2019",
        location: "Skyline Consultants, CA",
        bullets: [
          "Designed reinforced concrete...",
          "Performed soil and geotechnical analysis...",
          "Prepared detailed CAD drawings...",
        ],
      },
    ],
    projects: [
      {
        title: "Downtown Metro Bridge Expansion - Lead Engineer",
        description: "Designed high-load steel components",
      },
      {
        title: "Coastal Flood Mitigation Project - Team Lead",
        description: "Developed water-channel simulations",
      },
    ],
    highlights: [
      "Structural design lead...",
      "Improved BIM workflow...",
      "Conducted soil tests...",
    ],
    specializations: [
      "Finite Element Modeling",
      "Geotechnical Engineering",
      "Hydraulic Systems",
      "Cost Estimation",
    ],
    education: [
      {
        degree: "M.S. Civil Engineering",
        meta: "University of California - 2013-2015",
      },
      {
        degree: "B.S. Civil Engineering",
        meta: "University of Texas - 2009-2013",
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
  } = useResumeTemplate("EngineerPrime", defaultData);

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
    software: Array.isArray(resumeData.software)
      ? resumeData.software
      : defaultData.software,
    experience: Array.isArray(resumeData.experience)
      ? resumeData.experience
      : defaultData.experience,
    projects: Array.isArray(resumeData.projects)
      ? resumeData.projects
      : defaultData.projects,
    highlights: Array.isArray(resumeData.highlights)
      ? resumeData.highlights
      : defaultData.highlights,
    specializations: Array.isArray(resumeData.specializations)
      ? resumeData.specializations
      : defaultData.specializations,
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

  const handleResetEngineerPrime = () => {
    localStorage.removeItem("EngineerPrime_resumeData");
    setResumeData({
      ...defaultData,
      profileImage: "/images/cleanprofileimage.png",
      qrDataUrl: "/images/engineerprime-qr.png",
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

  const generateQRCode = async () => {
    const qrData = `
Full Name: ${engineerData.info.fullName}
Email: ${engineerData.info.email}
Phone: ${engineerData.info.telephone}
Address: ${engineerData.info.address}
City: ${engineerData.info.city}
State: ${engineerData.info.state}
ZIP: ${engineerData.info.zip}
LinkedIn: ${engineerData.info.linkedin}
`;

    try {
      const qr = await QRCode.toDataURL(qrData);
      handleChange("qrDataUrl", qr);
    } catch (error) {
      console.error("QR error:", error);
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
      const originalElement = document.querySelector(".resume-a4.ep-a4");

      if (!originalElement) {
        console.error("EngineerPrime resume element not found");
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

      const resume = element.querySelector(".ep-resume");
      const sidebar = element.querySelector(".ep-sidebar");
      const main = element.querySelector(".ep-main");

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
        fileName: "EngineerPrime-resume.pdf",
        templateId: "EngineerPrime",
        downloadType: "nonAi",
      });
    } catch (error) {
      console.error("EngineerPrime PDF download error:", error);
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
      templateId="EngineerPrime"
      handleSaveResume={handleSaveResume}
      resumeData={resumeData}
      setResumeData={setResumeData}
      checkPaymentStatus={checkPaymentStatus}
      onReset={handleResetEngineerPrime}
      onLoadResume={loadResume}
      onDownloadPDF={handleDownloadPDF}
    >
      <div className="ep-wrapper">
        <div className="ep-mini-form no-pdf">
          <input
            placeholder="Emma Roberts"
            value={engineerData.info.fullName}
            onChange={(event) => updateInfo("fullName", event.target.value)}
          />
          <input
            placeholder="emma@mail.com"
            value={engineerData.info.email}
            onChange={(event) => updateInfo("email", event.target.value)}
          />
          <input
            placeholder="+1 555-123-4567"
            value={engineerData.info.telephone}
            onChange={(event) => updateInfo("telephone", event.target.value)}
          />
          <input
            placeholder="123 Main Street"
            value={engineerData.info.address}
            onChange={(event) => updateInfo("address", event.target.value)}
          />
          <div className="ep-mini-row">
            <input
              placeholder="Los Angeles"
              value={engineerData.info.city}
              onChange={(event) => updateInfo("city", event.target.value)}
            />
            <input
              placeholder="CA"
              value={engineerData.info.state}
              onChange={(event) => updateInfo("state", event.target.value)}
            />
            <input
              placeholder="90001"
              value={engineerData.info.zip}
              onChange={(event) => updateInfo("zip", event.target.value)}
            />
          </div>
          <input
            placeholder="linkedin.com/in/username"
            value={engineerData.info.linkedin}
            onChange={(event) => updateInfo("linkedin", event.target.value)}
          />

          <button className="ep-qr-btn" onClick={generateQRCode}>
            Create QR Code
          </button>
        </div>

        <div className="resume-mobile-wrap ep-screen-preview">
          <div className="resume-a4 ep-a4" style={{ position: "relative" }}>
            <div className="ep-resume">
              <aside className="ep-sidebar">
                <div className="ep-qr-top">
                  <img src={engineerData.qrDataUrl} alt="QR Code" className="ep-qr-img" />
                </div>

                <div
                  className="ep-photo-hex"
                  onClick={openImagePicker}
                  title="Click to change photo"
                >
                  <img
                    src={engineerData.profileImage || "/images/cleanprofileimage.png"}
                    className="ep-photo"
                    alt="Profile"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onClick={(event) => event.stopPropagation()}
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                </div>

                <section className="ep-section">
                  <h3 className="ep-section-heading">CORE SKILLS</h3>
                  <ul className="ep-list">
                    {engineerData.skills.map((skill, index) => (
                      <li key={index}>
                        <input
                          className="ep-side-input"
                          value={skill}
                          onChange={(event) =>
                            updateListItem("skills", index, event.target.value)
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="ep-section">
                  <h3 className="ep-section-heading">SOFTWARE</h3>
                  <ul className="ep-list">
                    {engineerData.software.map((tool, index) => (
                      <li key={index}>
                        <input
                          className="ep-side-input"
                          value={tool}
                          onChange={(event) =>
                            updateListItem("software", index, event.target.value)
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </section>

                <div className="ep-qr-bottom">
                  <img src={engineerData.qrDataUrl} alt="QR Code" className="ep-qr-img" />
                </div>
              </aside>

              <main className="ep-main">
                <section className="ep-header-block">
                  <input
                    className="ep-name"
                    value={engineerData.fullName}
                    onChange={(event) => handleChange("fullName", event.target.value)}
                  />
                  <input
                    className="ep-title"
                    value={engineerData.jobTitle}
                    onChange={(event) => handleChange("jobTitle", event.target.value)}
                  />
                </section>

                <section className="ep-section-block">
                  <h2 className="ep-section-title">SUMMARY</h2>
                  <textarea
                    className="ep-text"
                    value={engineerData.summary}
                    onChange={(event) => handleChange("summary", event.target.value)}
                  />
                </section>

                <section className="ep-section-block">
                  <h2 className="ep-section-title">EXPERIENCE</h2>

                  {engineerData.experience.map((job, jobIndex) => (
                    <div className="ep-job" key={jobIndex}>
                      <div className="ep-job-header">
                        <input
                          className="ep-job-title"
                          value={job.title}
                          onChange={(event) =>
                            updateExperience(jobIndex, "title", event.target.value)
                          }
                        />
                        <input
                          className="ep-job-date"
                          value={job.dates}
                          onChange={(event) =>
                            updateExperience(jobIndex, "dates", event.target.value)
                          }
                        />
                      </div>

                      <input
                        className="ep-job-location"
                        value={job.location}
                        onChange={(event) =>
                          updateExperience(jobIndex, "location", event.target.value)
                        }
                      />

                      <ul className="ep-job-list">
                        {job.bullets.map((bullet, bulletIndex) => (
                          <li key={bulletIndex}>
                            <textarea
                              className="ep-job-bullet"
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

                <section className="ep-section">
                  <h2 className="ep-section-title">MAJOR PROJECTS</h2>

                  {engineerData.projects.map((project, index) => (
                    <div className="ep-edu-item" key={index}>
                      <input
                        className="ep-edu-degree"
                        value={project.title}
                        onChange={(event) =>
                          updateProject(index, "title", event.target.value)
                        }
                      />
                      <textarea
                        className="ep-edu-meta ep-project-description"
                        value={project.description}
                        onChange={(event) =>
                          updateProject(index, "description", event.target.value)
                        }
                      />
                    </div>
                  ))}
                </section>

                <section className="ep-section">
                  <h2 className="ep-section-title">PROJECT HIGHLIGHTS</h2>
                  <ul className="ep-job-list">
                    {engineerData.highlights.map((highlight, index) => (
                      <li key={index}>
                        <textarea
                          className="ep-job-bullet"
                          value={highlight}
                          onChange={(event) =>
                            updateListItem("highlights", index, event.target.value)
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="ep-section">
                  <h2 className="ep-section-title">TECHNICAL SPECIALIZATION</h2>
                  <ul className="ep-job-list">
                    {engineerData.specializations.map((specialization, index) => (
                      <li key={index}>
                        <input
                          className="ep-inline-input"
                          value={specialization}
                          onChange={(event) =>
                            updateListItem(
                              "specializations",
                              index,
                              event.target.value
                            )
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="ep-section-block ep-last">
                  <h2 className="ep-section-title">EDUCATION</h2>

                  {engineerData.education.map((education, index) => (
                    <div className="ep-edu-item" key={index}>
                      <input
                        className="ep-edu-degree"
                        value={education.degree}
                        onChange={(event) =>
                          updateEducation(index, "degree", event.target.value)
                        }
                      />
                      <input
                        className="ep-edu-meta"
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
