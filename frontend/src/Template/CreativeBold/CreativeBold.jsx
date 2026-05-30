import React, { useState, useEffect, useRef } from "react";
import "./CreativeBold.css";
import TemplateLayout from "../TemplateLayout";
import { QRCodeSVG } from "qrcode.react";
import useResumeTemplate from "../../hooks/useResumeTemplate";
import useProfileImage from "../../hooks/useProfileImage";
import { useAuth } from "../../context/AuthContext";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CreativeBold = () => {
  const STORAGE_KEY = "creativeBold_resumeData";

  const defaultData = {
    fullName: "JENNIFER SMITH",
    jobTitle: "Marketing Specialist",
    profileImage: "/images/creativeboldimage.png",
    summary:
      "Creative marketing specialist with experience in digital campaigns, social media strategy, and performance analytics.",

    contact: {
      phone: "+1 123 456 7890",
      email: "hello@email.com",
      location: "New York, USA",
      linkedin: "linkedin.com/in/profile",
    },

    skills: [
      "SEO and SEM",
      "Content Marketing",
      "Social Media Management",
      "Analytics & Reporting",
    ],

    experience: [
      {
        title: "Marketing Manager",
        company: "Creative Agency",
        duration: "2021 - Present",
        description:
          "Managed branding campaigns and social media strategies for multiple clients.",
      },
      {
        title: "Digital Marketing Executive",
        company: "Digital Media House",
        duration: "2019 - 2021",
        description:
          "Worked on SEO optimization and online advertising campaigns.",
      },
      {
        title: "Digital Marketing Executive",
        company: "Digital Media House",
        duration: "2019 - 2021",
        description:
          "Worked on SEO optimization and online advertising campaigns.",
      },
      {
        title: "Digital Marketing Executive",
        company: "Digital Media House",
        duration: "2019 - 2021",
        description:
          "Worked on SEO optimization and online advertising campaigns.",
      },
    ],

    education: [
      {
        institute: "University of California",
        degree: "Bachelor of Business Administration",
        duration: "2015 - 2019",
        location: "California, USA",
        description:
          "Focused on marketing strategy, business communication, and digital branding.",
      },

      {
        institute: "New York Business School",
        degree: "Diploma in Digital Marketing",
        duration: "2019 - 2020",
        location: "New York, USA",
        description:
          "Specialized in SEO, social media campaigns, and analytics.",
      },
    ],

    profileImage: "/images/creativeboldimage.png",
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
  } = useResumeTemplate("CreativeBold", defaultData);
  const {
    fileInputRef,
    handleImageUpload,
    openImagePicker,
  } = useProfileImage(setResumeData, checkPaymentStatus);

  const qrValue = `
  Phone: ${resumeData.contact.phone}
  Email: ${resumeData.contact.email}
  Location: ${resumeData.contact.location}
  LinkedIn: ${resumeData.contact.linkedin}
  `;

  const handleResetCreativeBold = () => {
    localStorage.removeItem("CreativeBold_resumeData");
    localStorage.removeItem("creativeBold_resumeData");

    setResumeData({
      ...defaultData,
      profileImage: "/images/creativeboldimage.png",
    });
  };

  const handleReset = () => {
    localStorage.removeItem("CreativeBold_resumeData");

    setResumeData({
      ...defaultData,
      profileImage: "/creativeboldimage.png",
    });
  };

  // MONGODB SAVE DATA IN DATABASE
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;

    console.log("AUTH READY - LOADING CREATIVEBOLD");

    setTimeout(() => {
      loadResume();
    }, 500);

  }, [isAuthenticated]);



  const [saveStatus, setSaveStatus] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(resumeData)
    );
  }, [resumeData]);


  const syncLocalResumeToMongoDB = async () => {
    try {
      const token = localStorage.getItem("token");
      const localResume = localStorage.getItem(STORAGE_KEY);

      if (!token || !localResume) return;

      await fetch(
        "https://resume-builder-backend-66wy.onrender.com/api/resume/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            templateId: "CreativeBold",
            data: JSON.parse(localResume),
          }),
        }
      );

      console.log("✅ CreativeBold synced to MongoDB");
    } catch (error) {
      console.error("SYNC ERROR:", error);
    }
  };

  // LOAD DATA FROM DATABASE MONGODB
  const loadResume = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsInitialLoad(false);
        return;
      }

      const response = await fetch(
        "https://resume-builder-backend-66wy.onrender.com/api/resume/load?templateId=CreativeBold",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      console.log("CREATIVEBOLD LOAD RESULT:", result);

      if (response.ok && result.success && result.resume) {
        setResumeData({
          ...defaultData,
          ...result.resume,
        });
      }
    } catch (error) {
      console.error("CreativeBold Load Resume Error:", error);
    } finally {
      setIsInitialLoad(false);
    }
  };

  useEffect(() => {
    loadResume();
  }, []);


  useEffect(() => {
    const handleUserLoggedIn = async () => {
      console.log("✅ CreativeBold userLoggedIn event received");
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

  // PDF download block code start 
  const pdfGeneratingRef = useRef(false);

  const handleDownloadPDF = async () => {

    console.log("DOWNLOAD CLICKED");

    if (pdfGeneratingRef.current) return;
 
    pdfGeneratingRef.current = true;

    let wrapper = null;

    try {
      const originalElement = document.querySelector(".cb-resume");

      if (!originalElement) {
        console.error("Resume element not found");
        return;
      }

      // ✅ Clone template, do not move real DOM
      const element = originalElement.cloneNode(true);

      // MOBILE PDF FIX
     const isMobile = window.innerWidth <= 768;

wrapper = document.createElement("div");

wrapper.style.position = "fixed";
wrapper.style.top = "0";
wrapper.style.width = "794px";
wrapper.style.height = "1122px";
wrapper.style.background = "#fff";
wrapper.style.overflow = "hidden";

if (isMobile) {
  wrapper.style.left = "0";
  wrapper.style.opacity = "0";
  wrapper.style.pointerEvents = "none";
  wrapper.style.zIndex = "-1";
} else {
  wrapper.style.left = "-99999px";
}


      // NAME FIX
      const nameInput = element.querySelector(".cb-name");

      if (nameInput) {
        const div = document.createElement("div");
        div.className = "cb-name";
        div.textContent = nameInput.value || nameInput.textContent;

        div.style.width = "100%";
        div.style.textAlign = "center";
        div.style.margin = "0 0 18px 0";

        nameInput.replaceWith(div);
      }

      // LEFT TITLE FIX
      const leftTitleInputs = element.querySelectorAll(".cb-left-role-text");

      leftTitleInputs.forEach((input) => {
        const div = document.createElement("div");
        div.className = "cb-left-role-text";
        div.textContent = input.value || input.textContent;

        div.style.width = "100%";
        div.style.textAlign = "center";

        input.replaceWith(div);
      });

      // SUMMARY FIX
      const summaryInput = element.querySelector(".cb-text-summary");

      if (summaryInput) {
        const div = document.createElement("div");
        div.className = "cb-text-summary pdf-summary-text";
        div.textContent = summaryInput.value || summaryInput.textContent;

        div.style.whiteSpace = "pre-wrap";
        div.style.lineHeight = "1.55";

        summaryInput.replaceWith(div);
      }

      // ===============================
      // HIDDEN WRAPPER
      // ===============================

      wrapper = document.createElement("div");

      wrapper.style.position = "fixed";
      wrapper.style.left = "-99999px";
      wrapper.style.top = "0";
      wrapper.style.width = "210mm";
      wrapper.style.height = "297mm";
      wrapper.style.background = "#fff";


      element.style.position = "relative";
element.style.left = "0";
element.style.top = "0";
element.style.transform = "none";
element.style.transformOrigin = "top left";
element.style.zoom = "1";

element.style.width = "794px";
element.style.minWidth = "794px";
element.style.maxWidth = "794px";

element.style.height = "1123px";
element.style.minHeight = "1123px";
element.style.maxHeight = "1123px";

element.style.margin = "0";
element.style.overflow = "hidden";



      const resume = element.querySelector(".cb-resume");

      if (resume) {
        resume.style.width = "100%";
        resume.style.height = "100%";
        resume.style.display = "flex";
        resume.style.flexDirection = "row";
      }

      wrapper.appendChild(element);
      document.body.appendChild(wrapper);

      await new Promise((r) => setTimeout(r, 200));

      element.querySelectorAll(
        ".cb-section-title-pro, .cb-section-title"
      ).forEach((title) => {
        title.style.textAlign = "center";
        title.style.width = "100%";
        title.style.display = "block";
      });

      console.log(
        element.offsetWidth,
        element.offsetHeight
      );

      element.style.position = "relative";
element.style.left = "0";
element.style.top = "0";
element.style.transform = "none";
element.style.transformOrigin = "top left";
element.style.zoom = "1";
element.style.width = "794px";
element.style.height = "1122px";
element.style.minWidth = "794px";
element.style.minHeight = "1122px";

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);

const pdf = new jsPDF({
  orientation: "portrait",
  unit: "mm",
  format: "a4",
  compress: true,
});

pdf.addImage(
  imgData,
  "JPEG",
  0,
  0,
  210,
  297,
  undefined,
  "FAST"
);

pdf.save("CreativeBold-resume.pdf");

    } catch (error) {
      console.error("PDF download error:", error);
    } finally {
      if (wrapper && document.body.contains(wrapper)) {
        document.body.removeChild(wrapper);
      }

      setTimeout(() => {
        pdfGeneratingRef.current = false;
      }, 1000);
    }

  };

  // PDF download block code end





  return (
    <TemplateLayout
      handleSaveResume={handleSaveResume}
      checkPaymentStatus={checkPaymentStatus}
      onReset={handleResetCreativeBold}
      onDownloadPDF={handleDownloadPDF}
    >

      <div className="cb-wrapper">
        <div className="resume-mobile-wrap">
          {/* A4 Resume Area */}
          <div className="resume-a4 cb-a4">

            <div className="cb-resume">

              {/* LEFT COLUMN */}
              <aside className="cb-left">

                {/* Profile Image */}
                <div
                  className="cb-photo-wrapper"
                  onClick={openImagePicker}
                >
                  <img
                    src={resumeData.profileImage}
                    alt="Profile"
                    className="cb-photo"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onClick={(e) => e.stopPropagation()}
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                </div>

                <div className="left-column">

                  <div className="cb-qr-box">
                    <QRCodeSVG
                      value={qrValue}
                      size={82}
                      bgColor="transparent"
                      fgColor="#ffffff"
                      level="M"
                    />
                  </div>

                  {/* Left Role */}
                  <div className="cb-left-role">
                    <input
                      className="cb-left-role-text"
                      value={resumeData.jobTitle.split(" ")[0] || ""}
                      onChange={(e) =>
                        handleChange(
                          "jobTitle",
                          `${e.target.value} ${resumeData.jobTitle.split(" ").slice(1).join(" ")}`
                        )
                      }
                    />
                    <input
                      className="cb-left-role-text"
                      value={resumeData.jobTitle.split(" ").slice(1).join(" ") || ""}
                      onChange={(e) =>
                        handleChange(
                          "jobTitle",
                          `${resumeData.jobTitle.split(" ")[0] || ""} ${e.target.value}`
                        )
                      }
                    />
                  </div>

                  {/* Contact */}
                  <section className="cb-left-section">
                    <h3 className="cb-left-heading">CONTACT</h3>

                    <ul className="cb-left-list">
                      <li>
                        <input
                          className="cb-left-input"
                          value={resumeData.contact.phone}
                          onChange={(e) =>
                            handleContactChange("phone", e.target.value)
                          }
                        />
                      </li>

                      <li>
                        <input
                          className="cb-left-input"
                          value={resumeData.contact.email}
                          onChange={(e) =>
                            handleContactChange("email", e.target.value)
                          }
                        />
                      </li>

                      <li>
                        <input
                          className="cb-left-input"
                          value={resumeData.contact.location}
                          onChange={(e) =>
                            handleContactChange("location", e.target.value)
                          }
                        />
                      </li>
                      <li>
                        <input
                          className="cb-left-input"
                          value={resumeData.contact.linkedin}
                          onChange={(e) =>
                            handleContactChange("linkedin", e.target.value)
                          }
                        />
                      </li>
                    </ul>
                  </section>

                  {/* Skills */}
                  <section className="cb-left-section">
                    <h3 className="cb-left-heading">SKILLS</h3>

                    <ul className="cb-left-list">
                      {resumeData.skills.map((skill, index) => (
                        <li key={index}>
                          <input
                            className="cb-left-input"
                            value={skill}
                            onChange={(e) =>
                              handleArrayChange("skills", index, e.target.value)
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  </section>

                </div>

              </aside>

              {/* RIGHT COLUMN */}
              <main className="cb-right">

                <header className="cb-header">
                  <input
                    className="cb-name"
                    value={resumeData.fullName}
                    onChange={(e) =>
                      handleChange("fullName", e.target.value)
                    }
                  />


                </header>

                {/* Profile */}
                <section className="cb-section-profile">
                  <h2 className="cb-section-title-pro">PROFILE SUMMARY</h2>

                  <textarea
                    className="cb-text-summary"
                    value={resumeData.summary}
                    onChange={(e) =>
                      handleChange("summary", e.target.value)
                    }
                  />
                </section>

                {/* Experience */}
                <section className="cb-section-exp">
                  <h2 className="cb-section-title">
                    WORK EXPERIENCE
                  </h2>
                  {resumeData.experience.map((exp, index) => (
                    <div className="cb-item" key={index}>

                      <input
                        className="cb-exp-title"
                        value={exp.title}
                        onChange={(e) =>
                          handleExperienceChange(index, "title", e.target.value)
                        }
                      />

                      <input
                        className="cb-date"
                        value={exp.duration}
                        onChange={(e) =>
                          handleExperienceChange(index, "duration", e.target.value)
                        }
                      />

                      <textarea
                        className="cb-text cb-exp-description"
                        value={exp.description}
                        onChange={(e) =>
                          handleExperienceChange(index, "description", e.target.value)
                        }
                      />
                    </div>
                  ))}


                </section>

                {/* Education */}
                {resumeData.education.map((edu, index) => (
                  <div className="cb-item" key={index}>

                    <input
                      className="cb-edu-institute"
                      value={edu.institute}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "institute",
                          e.target.value
                        )
                      }
                    />

                    <input
                      className="cb-edu-degree"
                      value={edu.degree}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "degree",
                          e.target.value
                        )
                      }
                    />

                    <input
                      className="cb-date"
                      value={edu.duration}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "duration",
                          e.target.value
                        )
                      }
                    />

                    <input
                      className="cb-edu-location"
                      value={edu.location}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "location",
                          e.target.value
                        )
                      }
                    />

                    <textarea
                      className="cb-text cb-edu-description"
                      value={edu.description}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                    />

                  </div>
                ))}

              </main>

            </div>

          </div>
        </div>
      </div>

    </TemplateLayout>
  );
};

export default CreativeBold;