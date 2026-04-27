import React, { useRef, useState, useEffect } from "react";
import "./CreativeBold.css";
import TemplateLayout from "../TemplateLayout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { isLocal } from "../../utils/editMode";


const CreativeBold = () => {
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  // ----- Profile Image Upload -----
  const [profileImage, setProfileImage] = useState("/images/creativeboldimage.png");
  const [isPreview, setIsPreview] = useState(false);



  const [resumeData, setResumeData] = useState({
    name: "AMANDA SMITH",
    title: "Marketing Specialist",
    profile: "Dynamic marketing specialist with 6+ years of experience...",
    skills: [
      "SEO and SEM",
      "Content Marketing",
      "Social Media Management",
      "Analytics & Reporting"
    ],
    contact: {
    phone: "123-456-7860",
    email: "amanda.smith@mail.com",
    location: "Los Angeles, CA"
  },
    experience: [
      {
        title: "Marketing Specialist",
        company: "XYZ Corporation",
        duration: "2020 – Present",
        points: [
          "Led digital campaigns increasing leads by 38%",
          "Managed $180K yearly ad spend"
        ]
      }
    ],
  certifications: [
    "Google Analytics Certification",
    "Facebook Blueprint Certified"
  ],
  tools: [
  "Google Analytics, Ads Manager",
  "Meta Business Suite, LinkedIn Ads",
  "SEMrush, Ahrefs, Moz",
  "HubSpot, Mailchimp",
  "Figma, Canva"
],
achievements: [
  "Increased lead quality by 40%",
  "Reduced cost-per-lead by 22%",
  "Managed a digital transformation project"
]



  });


  useEffect(() => {
  try {
    const saved = localStorage.getItem("CreativeBold");

    const defaultData = {
      name: "AMANDA SMITH",
      title: "Marketing Specialist",
      profile: "",
      contact: {
        phone: "123-456-7860",
        email: "amanda.smith@mail.com",
        location: "Los Angeles, CA"
      },
      skills: [
        "SEO and SEM",
        "Content Marketing",
        "Social Media Management",
        "Analytics & Reporting"
      ],
      experience: [
        {
          title: "Marketing Specialist",
          company: "XYZ Corporation",
          duration: "2020 – Present",
          points: [
            "Led digital campaigns increasing leads by 38%",
            "Managed $180K yearly ad spend"
          ]
        }
      ],
      certifications: [],
      tools: [],
      achievements: []
    };

    if (saved) {
      const data = JSON.parse(saved); // ✅ renamed (NO parsed confusion)

      setResumeData({
        ...defaultData,

        name: data.name || defaultData.name,
        title: data.title || defaultData.title,
        profile: data.profile || defaultData.profile,

        contact: {
          ...defaultData.contact,
          ...data.contact
        },

        skills: Array.isArray(data.skills) ? data.skills : defaultData.skills,

        experience:
          Array.isArray(data.experience) && data.experience.length > 0
            ? data.experience
            : defaultData.experience,

        certifications: Array.isArray(data.certifications)
          ? data.certifications
          : defaultData.certifications,

        tools: Array.isArray(data.tools)
          ? data.tools
          : defaultData.tools,

        achievements: Array.isArray(data.achievements)
          ? data.achievements
          : defaultData.achievements
      });
    } else {
      setResumeData(defaultData);
    }
  } catch (err) {
    console.error("Load failed:", err);
  }
}, []);


  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    if (!canEdit && isEditable) return; // 🔒 premium guard

    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  const canEdit = true;
  const isEditable = true;
  const requirePayment = () => { };



  const triggerFileSelect = () => {
    if (!canEdit) {
      requirePayment(); // 🔥 open payment modal
      return;
    }

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSave = () => {
    localStorage.setItem(
      "CreativeBold",
      JSON.stringify(resumeData)
    );

    alert("Saved successfully ✅");
  };


  return (
    <TemplateLayout
      templateId="CreativeBold"
      onSave={handleSave}
      onPreview={() => console.log("preview")}
    >

      <div className="cb-wrapper">

        {/* A4 Resume Area */}
        <div className="resume-a4 cb-a4"  >

          <div className="cb-resume">
            {/* LEFT RED COLUMN */}
            <aside className="cb-left">

              {/* Profile Image */}
              <div
                className={`cb-photo-wrapper ${!canEdit ? "locked" : ""}`}
                onClick={() => {

                  // free user → open payment modal
                  if (!canEdit) {
                    if (requirePayment) requirePayment();
                    return;
                  }

                  // paid but editing OFF
                  if (!isEditable) return;

                  // paid + editing ON
                  if (fileInputRef.current) {
                    fileInputRef.current.click();
                  }

                }}
                title={!canEdit ? "Unlock to change profile image" : "Click to change photo"}
              >
                <img src={profileImage} alt="Profile" className="cb-photo" />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
              </div>


              {/* Job Title (Left side) */}
              <div className="cb-left-role">
                <h2
                  className="cb-left-role-text"
                  contentEditable={canEdit && isEditable}
                  suppressContentEditableWarning >
                  MARKETING SPECIALIST
                </h2>
              </div>

              {/* Skills */}
              <section className="cb-left-section">
                <h3 className="cb-left-heading" contentEditable={canEdit && isEditable} suppressContentEditableWarning >
                  SKILLS
                </h3>

                <ul className="cb-left-list">
                  {(resumeData.skills || []).map((skill, index) => (
                    <li key={index} className="cb-skill-item">

                      <input
                        value={skill}
                        onChange={(e) => {
                          const updated = [...resumeData.skills];
                          updated[index] = e.target.value;

                          setResumeData({
                            ...resumeData,
                            skills: updated
                          });
                        }}
                      />

                      <button
                        className="cb-delete-btn"
                        onClick={() => {
                          const updated = resumeData.skills.filter(
                            (_, i) => i !== index
                          );

                          setResumeData({
                            ...resumeData,
                            skills: updated
                          });
                        }}
                      >
                        ✕
                      </button>

                    </li>
                  ))}
                </ul>



                <button
                  className="cb-add-btn"
                  onClick={() => {
                    setResumeData({
                      ...resumeData,
                      skills: [...resumeData.skills, "New Skill"]
                    });
                  }}
                >
                  + Add Skill
                </button>


              </section>

              {/* Contact */}
              <section className="cb-left-section">
                <h3 className="cb-left-heading" contentEditable={canEdit && isEditable} suppressContentEditableWarning>
                  CONTACT
                </h3>
                <div className="cb-left-contact">

  <input
    value={resumeData.contact?.phone || ""}
    onChange={(e) => {
      setResumeData({
        ...resumeData,
        contact: {
          ...resumeData.contact,
          phone: e.target.value
        }
      });
    }}
  />

  <input
    value={resumeData.contact?.email || ""}
    onChange={(e) => {
      setResumeData({
        ...resumeData,
        contact: {
          ...resumeData.contact,
          email: e.target.value
        }
      });
    }}
  />

  <input
    value={resumeData.contact?.location || ""}
    onChange={(e) => {
      setResumeData({
        ...resumeData,
        contact: {
          ...resumeData.contact,
          location: e.target.value
        }
      });
    }}
  />

</div>

              </section>
            </aside>

            {/* RIGHT WHITE COLUMN */}
            <main className="cb-right">

              {/* Name + Title */}
              <header className="cb-header-text">
                <input
                  className="cb-name"
                  value={resumeData.name}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      name: e.target.value
                    })
                  }
                />

                <input
                  className="cb-title"
                  value={resumeData.title}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      title: e.target.value
                    })
                  }
                />


              </header>

              {/* Profile Section */}
              <section className="cb-section">
                <h2 className="cb-section-heading" contentEditable={canEdit && isEditable} suppressContentEditableWarning >PROFILE</h2>
                
                <textarea
  className="cb-section-paragraph"
  value={resumeData.profile || ""}
  onChange={(e) => {
    setResumeData({
      ...resumeData,
      profile: e.target.value
    });
  }}
/>

              </section>

              {/* Experience Section */}

              <section className="cb-section">
  <h2 className="cb-section-heading">EXPERIENCE</h2>

  {(resumeData.experience || []).map((job, jobIndex) => (
    <div key={jobIndex} className="cb-entry">

      {/* TITLE */}
      <input
        className="cb-entry-title"
        value={job.title}
        onChange={(e) => {
          const updated = [...resumeData.experience];
          updated[jobIndex].title = e.target.value;
          setResumeData({ ...resumeData, experience: updated });
        }}
      />

      {/* COMPANY */}
      <input
        className="cb-entry-subtitle"
        value={`${job.company} | ${job.duration}`}
        onChange={(e) => {
          const updated = [...resumeData.experience];
          const parts = e.target.value.split("|");

          updated[jobIndex].company = parts[0]?.trim() || "";
          updated[jobIndex].duration = parts[1]?.trim() || "";

          setResumeData({ ...resumeData, experience: updated });
        }}
      />

      {/* POINTS */}
      <ul className="cb-entry-list">
        {(job.points || []).map((point, pointIndex) => (
          <li key={pointIndex} className="cb-skill-item">

  <input
    value={point}
    onChange={(e) => {
      const updated = [...resumeData.experience];
      updated[jobIndex].points[pointIndex] = e.target.value;

      setResumeData({ ...resumeData, experience: updated });
    }}
  />

  <button
    className="cb-delete-btn"
    onClick={() => {
      const updated = [...resumeData.experience];

      updated[jobIndex].points = updated[jobIndex].points.filter(
        (_, i) => i !== pointIndex
      );

      setResumeData({ ...resumeData, experience: updated });
    }}
  >
    ✕
  </button>

</li>

        ))}
      </ul>

      {/* ✅ ADD POINT (INSIDE JOB) */}
      <button
        className="cb-add-btn"
        onClick={() => {
          const updated = [...resumeData.experience];

          updated[jobIndex].points = [
            ...(updated[jobIndex].points || []),
            "New responsibility"
          ];

          setResumeData({ ...resumeData, experience: updated });
        }}
      >
        + Add Point
      </button>

      {/* DELETE JOB */}
      <button
        className="cb-delete-job-btn"
        onClick={() => {
          const updated = resumeData.experience.filter(
            (_, i) => i !== jobIndex
          );

          setResumeData({ ...resumeData, experience: updated });
        }}
      >
        ✕ Remove Job
      </button>

    </div>
  ))}

  {/* ✅ ADD JOB (OUTSIDE LOOP) */}
  <button
    className="cb-add-btn"
    onClick={() => {
      setResumeData({
        ...resumeData,
        experience: [
          ...(resumeData.experience || []),
          {
            title: "New Job Title",
            company: "Company Name",
            duration: "Year – Year",
            points: ["New responsibility"]
          }
        ]
      });
    }}
  >
    + Add Job
  </button>

</section>


              {/* Certifications */}
              <section className="cb-section">
                <h2 className="cb-section-heading" contentEditable={canEdit && isEditable} suppressContentEditableWarning>CERTIFICATIONS</h2>
                <ul className="cb-entry-list">
  {(resumeData.certifications || []).map((cert, index) => (
    <li key={index} className="cb-skill-item">

      <input
        value={cert}
        disabled={isPreview}
        onChange={(e) => {
          const updated = [...resumeData.certifications];
          updated[index] = e.target.value;

          setResumeData({
            ...resumeData,
            certifications: updated
          });
        }}
      />

      {!isPreview && (
        <button
          className="cb-delete-btn"
          onClick={() => {
            const updated = resumeData.certifications.filter(
              (_, i) => i !== index
            );

            setResumeData({
              ...resumeData,
              certifications: updated
            });
          }}
        >
          ✕
        </button>
      )}

    </li>
  ))}
</ul>
{!isPreview && (
  <button
    className="cb-add-btn"
    onClick={() => {
      setResumeData({
        ...resumeData,
        certifications: [
          ...(resumeData.certifications || []),
          "New Certification"
        ]
      });
    }}
  >
    + Add Certification
  </button>
)}


              </section>

              {/* Tools */}
              <section className="cb-section">
                <h2 className="cb-section-heading" contentEditable={canEdit && isEditable} suppressContentEditableWarning>TOOLS & TECHNOLOGIES</h2>
                <ul className="cb-entry-list">
  {(resumeData.tools || []).map((tool, index) => (
    <li key={index} className="cb-skill-item">

      <input
        value={tool}
        disabled={isPreview}
        onChange={(e) => {
          const updated = [...resumeData.tools];
          updated[index] = e.target.value;

          setResumeData({
            ...resumeData,
            tools: updated
          });
        }}
      />

      {!isPreview && (
        <button
          className="cb-delete-btn"
          onClick={() => {
            const updated = resumeData.tools.filter(
              (_, i) => i !== index
            );

            setResumeData({
              ...resumeData,
              tools: updated
            });
          }}
        >
          ✕
        </button>
      )}

    </li>
  ))}
</ul>
{!isPreview && (
  <button
    className="cb-add-btn"
    onClick={() => {
      setResumeData({
        ...resumeData,
        tools: [
          ...(resumeData.tools || []),
          "New Tool"
        ]
      });
    }}
  >
    + Add Tool
  </button>
)}

              </section>

              {/* Achievements */}
              <section className="cb-section">
                <h2 className="cb-section-heading" contentEditable={canEdit && isEditable} suppressContentEditableWarning>ACHIEVEMENTS</h2>
                <ul className="cb-entry-list">
  {(resumeData.achievements || []).map((item, index) => (
    <li key={index} className="cb-skill-item">

      <input
        value={item}
        disabled={isPreview}
        onChange={(e) => {
          const updated = [...resumeData.achievements];
          updated[index] = e.target.value;

          setResumeData({
            ...resumeData,
            achievements: updated
          });
        }}
      />

      {!isPreview && (
        <button
          className="cb-delete-btn"
          onClick={() => {
            const updated = resumeData.achievements.filter(
              (_, i) => i !== index
            );

            setResumeData({
              ...resumeData,
              achievements: updated
            });
          }}
        >
          ✕
        </button>
      )}

    </li>
  ))}
</ul>
{!isPreview && (
  <button
    className="cb-add-btn"
    onClick={() => {
      setResumeData({
        ...resumeData,
        achievements: [
          ...(resumeData.achievements || []),
          "New Achievement"
        ]
      });
    }}
  >
    + Add Achievement
  </button>
)}

              </section>
            </main>
          </div>
        </div>
      </div>
    </TemplateLayout>
  );
}


export default CreativeBold;
