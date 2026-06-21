import React, { useEffect, useRef } from "react";
import "./MedicalElite.css";
import TemplateLayout from "../TemplateLayout";
import { useAuth } from "../../context/AuthContext";
import useProfileImage from "../../hooks/useProfileImage";
import useResumeTemplate from "../../hooks/useResumeTemplate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { savePdfAndUploadCopy } from "../../services/resumePdfCopyService";

export default function MedicalElite() {
  const pdfGeneratingRef = useRef(false);

  const defaultData = {
    fullName: "DR. EMMA WILLIAMS",
    jobTitle: "CONSULTANT CARDIOLOGIST",
    profileImage: "/images/medicalelitesprofileimage.png",
    contact: {
      phone: "+1 (555) 245-8890",
      email: "dr.emma.williams@mail.com",
      location: "New York, USA",
      website: "www.doctoremma.com",
    },
    specialties: [
      "Cardiac Diagnostics & Imaging",
      "Heart Failure Management",
      "Coronary Artery Disease",
      "Post-Operative Cardiac Care",
      "Arrhythmia & ECG Interpretation",
    ],
    certifications: [
      "Advanced Cardiac Life Support (ACLS)",
      "Basic Life Support (BLS)",
      "Board Certified - Cardiology",
      "USMLE Step 1, 2 & 3 Passed",
    ],
    memberships: [
      "American Heart Association (AHA)",
      "American College of Cardiology (ACC)",
    ],
    summary:
      "Dedicated and compassionate cardiologist with over 12 years of clinical experience handling complex cardiovascular cases. Expertise includes advanced heart diagnostics, emergency cardiac care, patient counseling, and developing long-term treatment plans.",
    experience: [
      {
        title: "Senior Consultant Cardiologist",
        dates: "2018 - Present",
        location: "New York Heart Institute",
        bullets: [
          "Managed emergency cardiac interventions.",
          "Performed catheterizations & stress tests.",
          "Developed long-term rehabilitation plans.",
          "Led conferences & awareness workshops.",
          "Worked in pre/post-operative cardiac care.",
        ],
      },
      {
        title: "Cardiology Resident",
        dates: "2014 - 2018",
        location: "Mercy General Hospital",
        bullets: [
          "Assisted in cardiac surgeries & ICU care.",
          "Followed chronic heart-disease patients.",
          "Performed ECG, Echo & treadmill tests.",
          "Conducted patient education sessions.",
        ],
      },
    ],
    research: [
      "\"Modern Approaches to Hypertension Treatment\" - 2022",
      "Research on early detection of heart failure - 2021",
      "Contributor to Cardiology Today Journal",
    ],
    education: [
      {
        degree: "Doctor of Medicine (MD) - Cardiology",
        meta: "Harvard Medical School - 2010 - 2014",
      },
      {
        degree: "Bachelor of Science in Biology",
        meta: "University of California - 2006 - 2010",
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
  } = useResumeTemplate("MedicalElite", defaultData);

  const { fileInputRef, handleImageUpload, openImagePicker } = useProfileImage(
    setResumeData,
    checkPaymentStatus
  );

  const { isAuthenticated } = useAuth();

  const medicalData = {
    ...defaultData,
    ...resumeData,
    contact: {
      ...defaultData.contact,
      ...(resumeData.contact || {}),
    },
    specialties: Array.isArray(resumeData.specialties)
      ? resumeData.specialties
      : defaultData.specialties,
    certifications: Array.isArray(resumeData.certifications)
      ? resumeData.certifications
      : defaultData.certifications,
    memberships: Array.isArray(resumeData.memberships)
      ? resumeData.memberships
      : defaultData.memberships,
    experience: Array.isArray(resumeData.experience)
      ? resumeData.experience
      : defaultData.experience,
    research: Array.isArray(resumeData.research)
      ? resumeData.research
      : defaultData.research,
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

  const handleResetMedicalElite = () => {
    localStorage.removeItem("MedicalElite_resumeData");
    setResumeData({
      ...defaultData,
      profileImage: "/images/medicalelitesprofileimage.png",
    });
  };

  const updateListItem = (section, index, value) => {
    const updated = [...medicalData[section]];
    updated[index] = value;
    setResumeData({ ...resumeData, [section]: updated });
  };

  const updateExperience = (index, field, value) => {
    const updated = [...medicalData.experience];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setResumeData({ ...resumeData, experience: updated });
  };

  const updateExperienceBullet = (jobIndex, bulletIndex, value) => {
    const updated = [...medicalData.experience];
    const bullets = [...updated[jobIndex].bullets];
    bullets[bulletIndex] = value;
    updated[jobIndex] = {
      ...updated[jobIndex],
      bullets,
    };
    setResumeData({ ...resumeData, experience: updated });
  };

  const updateEducation = (index, field, value) => {
    const updated = [...medicalData.education];
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
      const originalElement = document.querySelector(".resume-a4.me-a4");

      if (!originalElement) {
        console.error("MedicalElite resume element not found");
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
      element.style.setProperty("zoom", "1", "important");
      element.style.setProperty("box-shadow", "none", "important");
      element.style.setProperty("overflow", "hidden", "important");

      const resume = element.querySelector(".me-resume");
      const sidebar = element.querySelector(".me-sidebar");
      const main = element.querySelector(".me-main");

      if (resume) {
        resume.style.setProperty("display", "flex", "important");
        resume.style.setProperty("flex-direction", "row", "important");
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
      await savePdfAndUploadCopy({
        pdf,
        fileName: "MedicalElite-resume.pdf",
        templateId: "MedicalElite",
        downloadType: "nonAi",
      });
    } catch (error) {
      console.error("MedicalElite PDF download error:", error);
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
      templateId="MedicalElite"
      handleSaveResume={handleSaveResume}
      resumeData={resumeData}
      setResumeData={setResumeData}
      checkPaymentStatus={checkPaymentStatus}
      onReset={handleResetMedicalElite}
      onLoadResume={loadResume}
      onDownloadPDF={handleDownloadPDF}
    >
      <div className="me-wrapper">
        <div className="resume-mobile-wrap me-screen-preview">
          <div className="resume-a4 me-a4" style={{ position: "relative" }}>
            <div className="me-resume">
              <aside className="me-sidebar">
                <div className="me-photo-wrapper" onClick={openImagePicker}>
                  <img
                    src={
                      medicalData.profileImage ||
                      "/images/medicalelitesprofileimage.png"
                    }
                    alt="Profile"
                    className="me-photo"
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

                <input
                  className="me-name"
                  value={medicalData.fullName}
                  onChange={(event) => handleChange("fullName", event.target.value)}
                />

                <input
                  className="me-role"
                  value={medicalData.jobTitle}
                  onChange={(event) => handleChange("jobTitle", event.target.value)}
                />

                <section className="me-section">
                  <h3 className="me-section-title">CONTACT</h3>
                  <ul className="me-list">
                    {[
                      ["phone", "Phone"],
                      ["email", "Mail"],
                      ["location", "Loc"],
                      ["website", "Web"],
                    ].map(([field, label]) => (
                      <li key={field}>
                        <span className="me-icon">{label}</span>
                        <input
                          className="me-list-input"
                          value={medicalData.contact[field]}
                          onChange={(event) =>
                            handleContactChange(field, event.target.value)
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="me-section">
                  <h3 className="me-section-title">SPECIALTIES</h3>
                  <ul className="me-list">
                    {medicalData.specialties.map((item, index) => (
                      <li key={index}>
                        <input
                          className="me-list-input"
                          value={item}
                          onChange={(event) =>
                            updateListItem("specialties", index, event.target.value)
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="me-section">
                  <h3 className="me-section-title">CERTIFICATIONS</h3>
                  <ul className="me-list">
                    {medicalData.certifications.map((item, index) => (
                      <li key={index}>
                        <input
                          className="me-list-input"
                          value={item}
                          onChange={(event) =>
                            updateListItem("certifications", index, event.target.value)
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="me-section">
                  <h3 className="me-section-title">MEMBERSHIPS</h3>
                  <ul className="me-list">
                    {medicalData.memberships.map((item, index) => (
                      <li key={index}>
                        <input
                          className="me-list-input"
                          value={item}
                          onChange={(event) =>
                            updateListItem("memberships", index, event.target.value)
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              </aside>

              <main className="me-main">
                <section className="me-block">
                  <h2 className="me-block-title">SUMMARY</h2>
                  <textarea
                    className="me-block-text"
                    value={medicalData.summary}
                    onChange={(event) => handleChange("summary", event.target.value)}
                  />
                </section>

                <section className="me-block">
                  <h2 className="me-block-title">EXPERIENCE</h2>

                  {medicalData.experience.map((job, jobIndex) => (
                    <div className="me-job" key={jobIndex}>
                      <div className="me-job-header">
                        <input
                          className="me-job-title"
                          value={job.title}
                          onChange={(event) =>
                            updateExperience(jobIndex, "title", event.target.value)
                          }
                        />
                        <input
                          className="me-job-dates"
                          value={job.dates}
                          onChange={(event) =>
                            updateExperience(jobIndex, "dates", event.target.value)
                          }
                        />
                      </div>
                      <input
                        className="me-job-location"
                        value={job.location}
                        onChange={(event) =>
                          updateExperience(jobIndex, "location", event.target.value)
                        }
                      />

                      <ul className="me-job-list">
                        {job.bullets.map((bullet, bulletIndex) => (
                          <li key={bulletIndex}>
                            <textarea
                              className="me-job-bullet"
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

                <section className="me-block">
                  <h2 className="me-block-title">RESEARCH & PUBLICATIONS</h2>
                  <ul className="me-job-list">
                    {medicalData.research.map((item, index) => (
                      <li key={index}>
                        <textarea
                          className="me-job-bullet"
                          value={item}
                          onChange={(event) =>
                            updateListItem("research", index, event.target.value)
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="me-block me-last">
                  <h2 className="me-block-title">EDUCATION</h2>

                  {medicalData.education.map((education, index) => (
                    <div className="me-edu" key={index}>
                      <input
                        className="me-edu-title"
                        value={education.degree}
                        onChange={(event) =>
                          updateEducation(index, "degree", event.target.value)
                        }
                      />
                      <input
                        className="me-edu-meta"
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
