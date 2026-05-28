import React, { useRef, useState, useEffect } from "react";
import "./CreativeBold.css";
import TemplateLayout from "../TemplateLayout";
import { QRCodeSVG } from "qrcode.react";


const CreativeBold = () => {

  const STORAGE_KEY = "creativeBold_resumeData";

  const defaultData = {
    fullName: "JENNIFER SMITH",
    jobTitle: "Marketing Specialist",
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


  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
  }, [resumeData]);

  const qrValue = `
Phone: ${resumeData.contact.phone}
Email: ${resumeData.contact.email}
Location: ${resumeData.contact.location}
LinkedIn: ${resumeData.contact.linkedin}
`;


  const handleChange = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContactChange = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (section, index, value) => {
    const updated = [...resumeData[section]];
    updated[index] = value;

    setResumeData((prev) => ({
      ...prev,
      [section]: updated,
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...resumeData.experience];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setResumeData((prev) => ({
      ...prev,
      experience: updated,
    }));
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...resumeData.education];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setResumeData((prev) => ({
      ...prev,
      education: updated,
    }));
  };

  const fileInputRef = useRef(null);


const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const imageUrl = URL.createObjectURL(file);

  setResumeData((prev) => ({
    ...prev,
    profileImage: imageUrl,
  }));
};


  return (
    <TemplateLayout>

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
                  onClick={() => fileInputRef.current?.click()}
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
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
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