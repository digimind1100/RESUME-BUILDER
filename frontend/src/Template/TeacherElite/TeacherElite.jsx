import React, { useEffect, useRef, useState } from "react";
import "./TeacherElite.css";
import TemplateLayout from "../TemplateLayout";
import QRCode from "qrcode";
import { useAuth } from "../../context/AuthContext";
import useProfileImage from "../../hooks/useProfileImage";
import useResumeTemplate from "../../hooks/useResumeTemplate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const TABS = [
  "Kindergarten",
  "Elementary",
  "High School",
  "Language Teacher",
  "Arts Teacher",
  "Science Teacher",
  "Physics Teacher",
  "Chemistry Teacher",
  "Math Teacher",
  "Computer Teacher",
  "IT Related",
];

const TAB_TITLE_MAP = {
  Kindergarten: "KINDERGARTEN TEACHER",
  Elementary: "ELEMENTARY TEACHER",
  "High School": "HIGH SCHOOL TEACHER",
  "Language Teacher": "LANGUAGE TEACHER",
  "Arts Teacher": "ARTS TEACHER",
  "Science Teacher": "SCIENCE TEACHER",
  "Physics Teacher": "PHYSICS TEACHER",
  "Chemistry Teacher": "CHEMISTRY TEACHER",
  "Math Teacher": "MATH TEACHER",
  "Computer Teacher": "COMPUTER TEACHER",
  "IT Related": "IT / CS INSTRUCTOR",
};

export default function TeacherElite() {
  const pdfGeneratingRef = useRef(false);
  const [activeTab, setActiveTab] = useState("High School");

  const defaultData = {
    fullName: "EMMA ROBERTS",
    jobTitle: "HIGH SCHOOL TEACHER",
    profileImage: "/images/minimalaccentprofileimage.png",
    contact: {
      phone: "+1 (555) 908-2211",
      email: "emma.roberts@schoolmail.com",
      location: "New York, NY",
    },
    qrForm: {
      name: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      website: "",
      license: "",
      subject: "",
    },
    qrImage: "",
    summary:
      "Dedicated high school teacher with over 8 years of experience fostering a positive and inclusive learning environment. Skilled in differentiated instruction, integrating technology in the classroom, and collaborating with parents, colleagues, and school leadership to support each student's academic and personal growth.",
    skills: [
      "Lesson Planning & Delivery",
      "Classroom Management",
      "Student Assessment",
      "Parent Communication",
      "Inclusive Education",
    ],
    certifications: [
      "State Teaching License (Active)",
      "ESL / TESOL Certification",
      "Child Psychology Workshop",
    ],
    languages: ["English - Native", "Spanish - Professional", "French - Basic"],
    achievements: [
      "Teacher of the Year - 2022",
      "Reading Program Lead - 2021",
      "Debate Club Mentor",
    ],
    experience: [
      {
        title: "Lead High School Teacher",
        dates: "2018 - Present",
        school: "Bright Future Academy - New York, NY",
        bullets: [
          "Designed engaging lessons aligned with curriculum and state standards.",
          "Used technology, group activities, and projects to support different learning styles.",
          "Communicated regularly with parents and guardians about student progress.",
          "Mentored new teachers and supported classroom management strategies.",
        ],
      },
      {
        title: "Classroom Teacher",
        dates: "2013 - 2018",
        school: "Greenfield Public School - Boston, MA",
        bullets: [
          "Taught core subjects and developed creative assessment methods.",
          "Organized school events, clubs, and after-school programs.",
          "Provided additional academic support through tutoring and small group work.",
        ],
      },
    ],
    education: [
      "M.A. in Education - Columbia University, NY (2011 - 2013)",
      "B.A. in English Literature - Boston University (2007 - 2011)",
    ],
    trainings: [
      "Advanced Classroom Management - 2021",
      "Inclusive Education & Differentiated Instruction - 2019",
      "Digital Tools for Remote Teaching - 2020",
    ],
    subjects: [
      "English Language & Literature",
      "Reading & Writing Skills",
      "Exam Preparation & Study Skills",
    ],
    projects: [
      "Led a school-wide reading initiative improving literacy rates by 20%.",
      "Organized annual book fair and student writing competitions.",
      "Coordinated debate and public speaking events for students.",
    ],
    activities: [
      "Literature Club Advisor",
      "Debate & Public Speaking Coach",
      "Volunteer Community Tutor",
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
  } = useResumeTemplate("TeacherElite", defaultData);

  const { fileInputRef, handleImageUpload, openImagePicker } = useProfileImage(
    setResumeData,
    checkPaymentStatus
  );

  const { isAuthenticated } = useAuth();

  const teacherData = {
    ...defaultData,
    ...resumeData,
    contact: {
      ...defaultData.contact,
      ...(resumeData.contact || {}),
    },
    qrForm: {
      ...defaultData.qrForm,
      ...(resumeData.qrForm || {}),
    },
    skills: Array.isArray(resumeData.skills) ? resumeData.skills : defaultData.skills,
    certifications: Array.isArray(resumeData.certifications)
      ? resumeData.certifications
      : defaultData.certifications,
    languages: Array.isArray(resumeData.languages)
      ? resumeData.languages
      : defaultData.languages,
    achievements: Array.isArray(resumeData.achievements)
      ? resumeData.achievements
      : defaultData.achievements,
    experience: Array.isArray(resumeData.experience)
      ? resumeData.experience
      : defaultData.experience,
    education: Array.isArray(resumeData.education)
      ? resumeData.education
      : defaultData.education,
    trainings: Array.isArray(resumeData.trainings)
      ? resumeData.trainings
      : defaultData.trainings,
    subjects: Array.isArray(resumeData.subjects)
      ? resumeData.subjects
      : defaultData.subjects,
    projects: Array.isArray(resumeData.projects)
      ? resumeData.projects
      : defaultData.projects,
    activities: Array.isArray(resumeData.activities)
      ? resumeData.activities
      : defaultData.activities,
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

  const handleResetTeacherElite = () => {
    localStorage.removeItem("TeacherElite_resumeData");
    setActiveTab("High School");
    setResumeData({
      ...defaultData,
      profileImage: "/images/minimalaccentprofileimage.png",
    });
  };

  const handleTabChange = (tab) => {
    const nextTitle = TAB_TITLE_MAP[tab];
    setActiveTab(tab);
    setResumeData((prev) => ({
      ...prev,
      jobTitle: nextTitle,
      experience: Array.isArray(prev.experience)
        ? prev.experience.map((job, index) =>
            index === 0 ? { ...job, title: `Lead ${tab} Teacher` } : job
          )
        : defaultData.experience,
    }));
  };

  const updateQrForm = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      qrForm: {
        ...(prev.qrForm || defaultData.qrForm),
        [field]: value,
      },
    }));
  };

  const handleGenerateQR = async () => {
    const text = `
Name: ${teacherData.qrForm.name}
Email: ${teacherData.qrForm.email}
Phone: ${teacherData.qrForm.phone}
Address: ${teacherData.qrForm.address}
LinkedIn: ${teacherData.qrForm.linkedin}
Website: ${teacherData.qrForm.website}
Teaching License: ${teacherData.qrForm.license}
Subject: ${teacherData.qrForm.subject}
    `;

    const dataUrl = await QRCode.toDataURL(text);
    handleChange("qrImage", dataUrl);
  };

  const updateListItem = (section, index, value) => {
    const updated = [...teacherData[section]];
    updated[index] = value;

    setResumeData({ ...resumeData, [section]: updated });
  };

  const updateExperience = (index, field, value) => {
    const updated = [...teacherData.experience];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setResumeData({ ...resumeData, experience: updated });
  };

  const updateExperienceBullet = (jobIndex, bulletIndex, value) => {
    const updated = [...teacherData.experience];
    const bullets = [...updated[jobIndex].bullets];
    bullets[bulletIndex] = value;
    updated[jobIndex] = {
      ...updated[jobIndex],
      bullets,
    };

    setResumeData({ ...resumeData, experience: updated });
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
      const originalElement = document.querySelector(".resume-a4.te-a4");

      if (!originalElement) {
        console.error("TeacherElite resume element not found");
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

      const resume = element.querySelector(".te-resume");
      const layout = element.querySelector(".te-layout");
      const sidebar = element.querySelector(".te-sidebar");
      const main = element.querySelector(".te-main");

      if (resume) {
        resume.style.setProperty("width", "794px", "important");
        resume.style.setProperty("height", "1122px", "important");
      }

      if (layout) {
        layout.style.setProperty("display", "flex", "important");
        layout.style.setProperty("flex-direction", "row", "important");
      }

      if (sidebar) {
        sidebar.style.setProperty("width", "260px", "important");
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
      pdf.save("TeacherElite-resume.pdf");
    } catch (error) {
      console.error("TeacherElite PDF download error:", error);
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
      templateId="TeacherElite"
      handleSaveResume={handleSaveResume}
      resumeData={resumeData}
      setResumeData={setResumeData}
      checkPaymentStatus={checkPaymentStatus}
      onReset={handleResetTeacherElite}
      onLoadResume={loadResume}
      onDownloadPDF={handleDownloadPDF}
    >
      <div className="te-wrapper">
        <div className="te-qr-form no-pdf">
          <h3>Personal Info (for QR Code)</h3>
          <div className="te-qr-grid">
            {Object.keys(defaultData.qrForm).map((field) => (
              <input
                key={field}
                name={field}
                placeholder={
                  field === "license"
                    ? "Teaching License / ID"
                    : field === "subject"
                      ? "Main Subject Area"
                      : field.charAt(0).toUpperCase() + field.slice(1)
                }
                value={teacherData.qrForm[field]}
                onChange={(event) => updateQrForm(field, event.target.value)}
              />
            ))}
          </div>
          <button className="te-qr-btn" onClick={handleGenerateQR}>
            Create QR Code
          </button>
        </div>

        <div className="te-tabs no-pdf">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`te-tab ${tab === activeTab ? "active" : ""}`}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="resume-mobile-wrap te-screen-preview">
          <div id="resumeContainer" className="resume-a4 te-a4" style={{ position: "relative" }}>
            <div className="te-resume">
              <header className="te-header">
                <div className="te-header-inner">
                  <div className="te-header-left">
                    <input
                      className="te-header-name"
                      value={teacherData.fullName}
                      onChange={(event) => handleChange("fullName", event.target.value)}
                    />
                    <input
                      className="te-header-role"
                      value={teacherData.jobTitle}
                      onChange={(event) => handleChange("jobTitle", event.target.value)}
                    />

                    <div className="te-header-contact">
                      <input
                        value={teacherData.contact.phone}
                        onChange={(event) => handleContactChange("phone", event.target.value)}
                      />
                      <input
                        value={teacherData.contact.email}
                        onChange={(event) => handleContactChange("email", event.target.value)}
                      />
                      <input
                        value={teacherData.contact.location}
                        onChange={(event) =>
                          handleContactChange("location", event.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="te-header-right">
                    <div className="te-header-wave" />

                    <div className="te-header-photo-wrap" onClick={openImagePicker}>
                      <div className="te-header-photo-bg" />
                      <div className="te-header-photo-circle">
                        <img
                          src={
                            teacherData.profileImage ||
                            "/images/minimalaccentprofileimage.png"
                          }
                          alt="Profile"
                        />
                      </div>
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onClick={(event) => event.stopPropagation()}
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
              </header>

              <div className="te-layout">
                <aside className="te-sidebar">
                  <div className="te-qr-card te-qr-top">
                    {teacherData.qrImage ? (
                      <img src={teacherData.qrImage} alt="QR Code" className="te-qr-img" />
                    ) : (
                      <div className="te-qr-placeholder">QR Code will appear here</div>
                    )}
                  </div>

                  <section className="te-side-section">
                    <h3 className="te-side-heading">CORE TEACHING SKILLS</h3>
                    <ul className="te-side-list">
                      {teacherData.skills.map((skill, index) => (
                        <li key={index}>
                          <input
                            className="te-side-input"
                            value={skill}
                            onChange={(event) =>
                              updateListItem("skills", index, event.target.value)
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="te-side-section">
                    <h3 className="te-side-heading">CERTIFICATIONS</h3>
                    <ul className="te-side-list">
                      {teacherData.certifications.map((item, index) => (
                        <li key={index}>
                          <input
                            className="te-side-input"
                            value={item}
                            onChange={(event) =>
                              updateListItem("certifications", index, event.target.value)
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="te-side-section">
                    <h3 className="te-side-heading">LANGUAGES</h3>
                    <ul className="te-side-list">
                      {teacherData.languages.map((language, index) => (
                        <li key={index}>
                          <input
                            className="te-side-input"
                            value={language}
                            onChange={(event) =>
                              updateListItem("languages", index, event.target.value)
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="te-side-section">
                    <h3 className="te-side-heading">ACHIEVEMENTS</h3>
                    <ul className="te-side-list">
                      {teacherData.achievements.map((achievement, index) => (
                        <li key={index}>
                          <input
                            className="te-side-input"
                            value={achievement}
                            onChange={(event) =>
                              updateListItem("achievements", index, event.target.value)
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  </section>

                  <div className="te-qr-card te-qr-bottom">
                    {teacherData.qrImage ? (
                      <img src={teacherData.qrImage} alt="QR Code" className="te-qr-img" />
                    ) : (
                      <div className="te-qr-placeholder">
                        Add your details above to generate QR.
                      </div>
                    )}
                  </div>
                </aside>

                <main className="te-main">
                  <section className="te-section">
                    <h2 className="te-section-title">PROFESSIONAL SUMMARY</h2>
                    <textarea
                      className="te-section-text"
                      value={teacherData.summary}
                      onChange={(event) => handleChange("summary", event.target.value)}
                    />
                  </section>

                  <section className="te-section">
                    <h2 className="te-section-title">TEACHING EXPERIENCE</h2>

                    {teacherData.experience.map((job, jobIndex) => (
                      <div className="te-job" key={jobIndex}>
                        <div className="te-job-header">
                          <input
                            className="te-job-title"
                            value={job.title}
                            onChange={(event) =>
                              updateExperience(jobIndex, "title", event.target.value)
                            }
                          />
                          <input
                            className="te-job-dates"
                            value={job.dates}
                            onChange={(event) =>
                              updateExperience(jobIndex, "dates", event.target.value)
                            }
                          />
                        </div>
                        <input
                          className="te-job-sub"
                          value={job.school}
                          onChange={(event) =>
                            updateExperience(jobIndex, "school", event.target.value)
                          }
                        />
                        <ul className="te-job-list">
                          {job.bullets.map((bullet, bulletIndex) => (
                            <li key={bulletIndex}>
                              <textarea
                                className="te-job-bullet"
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

                  <section className="te-section te-section-grid">
                    <div>
                      <h2 className="te-section-title">EDUCATION</h2>
                      {teacherData.education.map((education, index) => (
                        <input
                          className="te-edu-line"
                          key={index}
                          value={education}
                          onChange={(event) =>
                            updateListItem("education", index, event.target.value)
                          }
                        />
                      ))}

                      <h2 className="te-section-title">WORKSHOPS & TRAININGS</h2>
                      {teacherData.trainings.map((training, index) => (
                        <input
                          className="te-edu-line"
                          key={index}
                          value={training}
                          onChange={(event) =>
                            updateListItem("trainings", index, event.target.value)
                          }
                        />
                      ))}
                    </div>

                    <div>
                      <h2 className="te-section-title">SUBJECTS TAUGHT</h2>
                      <ul className="te-job-list">
                        {teacherData.subjects.map((subject, index) => (
                          <li key={index}>
                            <input
                              className="te-list-input"
                              value={subject}
                              onChange={(event) =>
                                updateListItem("subjects", index, event.target.value)
                              }
                            />
                          </li>
                        ))}
                      </ul>

                      <h2 className="te-section-title">SCHOOL PROJECTS & ACTIVITIES</h2>
                      <ul className="te-job-list">
                        {teacherData.projects.map((project, index) => (
                          <li key={index}>
                            <textarea
                              className="te-job-bullet"
                              value={project}
                              onChange={(event) =>
                                updateListItem("projects", index, event.target.value)
                              }
                            />
                          </li>
                        ))}
                      </ul>

                      <h2 className="te-section-title">EXTRA ACTIVITIES</h2>
                      <ul className="te-job-list">
                        {teacherData.activities.map((activity, index) => (
                          <li key={index}>
                            <input
                              className="te-list-input"
                              value={activity}
                              onChange={(event) =>
                                updateListItem("activities", index, event.target.value)
                              }
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TemplateLayout>
  );
}
