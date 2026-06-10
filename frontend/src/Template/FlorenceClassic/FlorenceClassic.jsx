import React, { useState, useEffect, useRef } from "react";
import "./FlorenceClassic.css";
import TemplateLayout from "../TemplateLayout";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function FlorenceClassic() {

    const STORAGE_KEY = "FlorenceClassic";

    const defaultData = {
        fullName: "FLORENCE STEWART",
        jobTitle: "PROFESSIONAL TITLE",
        profileImage: "/images/cleanprofileimage.png",
        summary:
            "This section is supposed to introduce yourself. Write a few lines that describe your profile and strongest qualities.",

        contact: {
            phone: "+1 123 456 7890",
            email: "yourmail@mail.com",
            location: "New York City",
            linkedin: "linkedin.com/profile"
        },

        education: [
            {
                degree: "MASTER'S DEGREE",
                university: "Name of The University",
                subject: "Enter Your Major",
                year: "2019 - 2021"
            },
            {
                degree: "BACHELOR'S DEGREE",
                university: "Name of The University",
                subject: "Enter Your Major",
                year: "2015 - 2019"
            }
        ],

        skills: [
            "Communication",
            "Project Management",
            "Team Leadership",
            "Problem Solving",
        ],
        experience: [{
            title: "EMPLOYMENT TITLE",
            company: "Company Name",
            location: "location",
            duration: "2020 - Present",
            intro:
                "Brief description of your role and responsibilities under job title.",
            bullets: [
                "Assisted with daily office operations including data entry",
                "Communicated with customers professionally to answer inquiries",
                "Managed inventory by checking stock levels and updating records",
                "Supported sales activities by preparing quotations and following up",
                "Handled administrative tasks such as scheduling meetings,",
                "Worked collaboratively with colleagues on various projects ideas",
            ],
        },
        {
            title: "EMPLOYMENT TITLE HERE",
            company: "Company Name",

            duration: "2018 - 2020",
            intro:
                "Brief description of your role and responsibilities under job title.",
            bullets: [
                "Assisted with daily office operations including data entry, .",
                "Communicated with customers professionally to answer inquiries, resolve",
                "Supported sales activities by preparing quotations, following up with clients,",
                "Handled administrative tasks such as scheduling meetings,",
                "Worked collaboratively with colleagues on various projects, contributing ideas",
            ],
        },
        {
            title: "EMPLOYMENT TITLE HERE",
            company: "Company Name",

            duration: "2018 - 2020",
            intro:
                "Brief description of your role and responsibilities under job title.",
            bullets: [
                "Assisted with daily office operations including data entry, .",
                "Communicated with customers professionally to answer inquiries, resolve",
                "Supported sales activities by preparing quotations, following up with clients,",

            ],
        },]
    };

    const [resumeData, setResumeData] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
        } catch (err) {
            return defaultData;
        }
    });

const resumeContainerRef = useRef(null);
      const fileInputRef = useRef(null);

const [profileImage, setProfileImage] = useState(
  "/images/cleanprofileimage.png"
);

const handleImageUpload = (event) => {
  const file = event.target.files?.[0];

  if (!file) return;

  const imageUrl = URL.createObjectURL(file);

  setProfileImage(imageUrl);
};
  

    // ---------------- AUTO SAVE ----------------
    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(resumeData)
        );
    }, [resumeData]);

    const handleSaveResume = async () => {
        try {
            const token = localStorage.getItem("token");

            // ✅ Anonymous user → open signup modal
            if (!token) {
                window.dispatchEvent(new Event("openSignupModal"));
                return;
            }

            const response = await fetch(
                "https://resume-builder-backend-66wy.onrender.com/api/resume/save",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        templateId: "FlorenceClassic",
                        data: resumeData,
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                console.error("SAVE FAILED:", result);

                alert(result.message || "Save failed");
                return;
            }

            // ✅ Success
            alert("Resume saved to MongoDB successfully");

        } catch (error) {
            console.error("Save resume error:", error);

            alert("Save failed");
        }
    };


    const handleChange = (field, value) => {
        setResumeData((prev) => ({
            ...prev,
            [field]: value
        }));
    };


    const handleNestedChange = (section, field, value) => {
        setResumeData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
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
        updated[index][field] = value;

        setResumeData((prev) => ({
            ...prev,
            experience: updated,
        }));
    };

    const handleBulletChange = (expIndex, bulletIndex, value) => {
        const updated = [...resumeData.experience];
        updated[expIndex].bullets[bulletIndex] = value;

        setResumeData((prev) => ({
            ...prev,
            experience: updated,
        }));
    };

    const loadResume = async () => {
        try {
            const token = localStorage.getItem("token");

            // ✅ Anonymous user: do NOT load MongoDB
            if (!token) {
                return;
            }

            const response = await fetch(
                "https://resume-builder-backend-66wy.onrender.com/api/resume/load",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await response.json();

            if (response.ok && result.success && result.resume) {
                setResumeData({
                    ...defaultData,
                    ...result.resume,
                });

                if (result.resume.profileImage) {
                    setProfileImage(result.resume.profileImage);
                } else {
                    setProfileImage("/images/cleanprofileimage.png");
                }
            }

        } catch (error) {
            console.error("Load Resume Error:", error);
        }
    };

    useEffect(() => {
        loadResume();
    }, []);


    useEffect(() => {
        const handleUserLoggedIn = async () => {
            console.log("✅ userLoggedIn event received");
            await loadResume();
        };

        window.addEventListener("userLoggedIn", handleUserLoggedIn);

        return () => {
            window.removeEventListener("userLoggedIn", handleUserLoggedIn);
        };
    }, []);

    useEffect(() => {
        const checkLoginAndLoadResume = () => {
            const token = localStorage.getItem("token");

            if (token) {
                console.log("✅ Login detected, loading MongoDB resume");
                loadResume();
            }
        };

        window.addEventListener("storage", checkLoginAndLoadResume);

        return () => {
            window.removeEventListener("storage", checkLoginAndLoadResume);
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

    // =======================================================
    useEffect(() => {

        const continuePDFDownload = () => {
            console.log("✅ Payment success → continue PDF");

            generatePDF(); // OR your actual PDF function
        };

        window.addEventListener(
            "paymentSuccess",
            continuePDFDownload
        );

        return () => {
            window.removeEventListener(
                "paymentSuccess",
                continuePDFDownload
            );
        };

    }, []);

    // ======================================================

    useEffect(() => {
        const handleUserLoggedIn = () => {
            loadResume();
        };

        window.addEventListener("userLoggedIn", handleUserLoggedIn);

        return () => {
            window.removeEventListener("userLoggedIn", handleUserLoggedIn);
        };
    }, []);

    // PAYMENT MODULE START

    const checkPaymentStatus = async () => {
        try {

            const token = localStorage.getItem("token");

            if (!token) return false;

            const response = await fetch(
                "https://resume-builder-backend-66wy.onrender.com/api/payments/check",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await response.json();

            console.log("PAYMENT CHECK RESULT:", result);

            return (
                result.isPaid === true ||
                result.canAccessPremium === true ||
                result.plan === "premium" ||
                result.plan === "lifetime" ||
                result.plan === "monthly-pro"
            );

        } catch (error) {

            console.error(
                "Payment check error:",
                error
            );

            return false;
        }
    };
    // PAYMENT MODULE END
    const handleResetFlorence = () => {
  setResumeData({ ...defaultData });

  setProfileImage("/images/cleanprofileimage.png");
};

  const pdfGeneratingRef = useRef(false);

  const handleDownloadPDF = async () => {

    console.log("DOWNLOAD CLICKED");

    if (pdfGeneratingRef.current) return;

    pdfGeneratingRef.current = true;

    let wrapper = null;

    try {
      const originalElement = document.querySelector(".resume-a4.florence-page");

if (!originalElement) {
  console.error("Resume element not found");
  return;
}

const element = originalElement.cloneNode(true);
element.style.position = "relative";
element.style.left = "0";
element.style.top = "0";
element.style.transform = "none";
element.style.transformOrigin = "top left";
element.style.zoom = "1";

element.style.width = "794px";
element.style.height = "1122px";
element.style.minHeight = "1122px";
element.style.maxHeight = "1122px";

element.style.margin = "0";
element.style.overflow = "hidden";

if (!element) {
  console.error("Clone element not created");
  return;
}

      // ===============================
      // HEADER FIX
      // ===============================

      const nameInput = element.querySelector(".florence-name");

      if (nameInput) {
        const div = document.createElement("div");
        div.className = "florence-name";
        div.textContent = nameInput.value || nameInput.textContent;

        div.style.width = "70%";
        div.style.margin = "0 auto";
        div.style.textAlign = "center";

        nameInput.replaceWith(div);
      }

      const titleInput = element.querySelector(".florence-title");

      if (titleInput) {
        const div = document.createElement("div");
        div.className = "florence-title";
        div.textContent = titleInput.value || titleInput.textContent;

        div.style.width = "40%";
        div.style.margin = "8px auto 0";
        div.style.textAlign = "center";

        titleInput.replaceWith(div);
      }

      const summaryInput = element.querySelector(".summary-input");

      if (summaryInput) {
        const div = document.createElement("div");
        div.className = "summary-input pdf-summary-text";
        div.textContent = summaryInput.value || summaryInput.textContent;

        summaryInput.replaceWith(div);
      }

      // ===============================
      // HIDDEN WRAPPER
      // ===============================

   const isMobile = window.innerWidth <= 768;

   wrapper = document.createElement("div");

wrapper.style.position = "fixed";
wrapper.style.left = "0";
wrapper.style.top = "0";
wrapper.style.width = "794px";
wrapper.style.height = "1123px";
wrapper.style.background = "#fff";
wrapper.style.overflow = "hidden";
wrapper.style.opacity = "0";
wrapper.style.pointerEvents = "none";
wrapper.style.zIndex = "-1";

element.style.setProperty("position", "absolute", "important");
element.style.setProperty("left", "0", "important");
element.style.setProperty("top", "0", "important");
element.style.setProperty("width", "794px", "important");
element.style.setProperty("height", "1123px", "important");
element.style.setProperty("transform", "none", "important");
element.style.setProperty("zoom", "1", "important");
element.style.setProperty("margin", "0", "important");
element.style.setProperty("overflow", "hidden", "important");

wrapper.appendChild(element);
document.body.appendChild(wrapper);




if (isMobile) {
  wrapper.style.left = "0";
  wrapper.style.opacity = "0";
  wrapper.style.pointerEvents = "none";
  wrapper.style.zIndex = "-1";
} else {
  wrapper.style.left = "-99999px";
}

      wrapper.appendChild(element);
      document.body.appendChild(wrapper);

      await new Promise((r) => setTimeout(r, 200));

      const canvas = await html2canvas(element, {
        scale: window.devicePixelRatio * 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      const pdf = new jsPDF("p", "mm", "a4");

      pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);

      pdf.save("FlorenceClassic-resume.pdf");

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


    return (
        <TemplateLayout templateId="FlorenceClassic"
            handleSaveResume={handleSaveResume}
            resumeData={resumeData}
            setResumeData={setResumeData}
            checkPaymentStatus={checkPaymentStatus}
            onReset={handleResetFlorence}
            onDownloadPDF={handleDownloadPDF}
        >
         <div className="resume-mobile-wrap">
            <div className= "resume-a4 florence-page" ref={resumeContainerRef} >

                {/* HEADER */}
                <div className="florence-header">
                    <div >
                        <input
                            className="florence-name"
                            value={resumeData.fullName}
                            onChange={(e) =>
                                handleChange("fullName", e.target.value)
                            }
                        />
                    </div>
                    <div >
                        <input
                            className="florence-title"
                            value={resumeData.jobTitle}
                            onChange={(e) => handleChange("jobTitle", e.target.value)}
                        />
                    </div>
                </div>

                {/* HEADER SECTION */}
                <div className="header-section">
                    <div
                        className="photo-wrap"
                        onClick={() => {
                            const token = localStorage.getItem("token");

                            if (!token) {
                                window.dispatchEvent(new Event("openSignupModal"));
                                return;
                            }

                            fileInputRef.current?.click();
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        <img src={profileImage} alt="Profile" />
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            style={{ display: "none" }}
                        />
                    </div>
                    <section className="header-summary">
                        <h4>SUMMARY</h4>
                        <textarea
                            className="summary-input"
                            value={resumeData.summary}
                            onChange={(e) => handleChange("summary", e.target.value)}
                        />
                    </section>
                </div>

                {/* BODY */}
                <div className="florence-body">

                    {/* LEFT */}
                    <aside className="florence-left">

                        {/* CONTACT */}
                        <section className="contact">
                            <h3 className="contact-heading">CONTACT</h3>
                            <div className="contact-row">
                                {/* Phone SVG */}
                                <svg className="cont-icon" width="20" height="20" fill="#0066cc" viewBox="0 0 24 24">
                                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V21a1 1 0 01-1 1C10.52 22 2 13.48 2 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z" />
                                </svg>
                                <input
                                    className="contact-input"
                                    value={resumeData.contact.phone}
                                    onChange={(e) =>
                                        handleNestedChange(
                                            "contact",
                                            "phone",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="contact-row">
                                <svg className="email-icon" width="20" height="20" fill="#0066cc" viewBox="0 0 24 24">
                                    <path d="M4 4h16a2 2 0 012 2v1l-10 6L2 7V6a2 2 0 012-2z" />
                                    <path d="M2 8l10 6 10-6v10a2 2 0 01-2 2H4a2 2 0 01-2-2V8z" />
                                </svg>
                                <input
                                    className="contact-input"
                                    value={resumeData.contact.email}
                                    onChange={(e) =>
                                        handleNestedChange(
                                            "contact",
                                            "email",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="contact-row">
                                <svg className="loc-icon" fill="#0066cc" viewBox="0 0 24 24">
                                    <path d="M12 2a7 7 0 017 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 017-7zm0 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                </svg>
                                <input
                                    className="contact-input"
                                    value={resumeData.contact.location}
                                    onChange={(e) =>
                                        handleNestedChange(
                                            "contact",
                                            "location",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="contact-row">
                                <svg className="linked-icon" fill="#0066cc" viewBox="0 0 24 24">
                                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5zM0.5 8h4V24h-4V8zM7.5 8h3.8v2.2h0.1c0.5-1 1.8-2.2 3.7-2.2 4 0 4.8 2.7 4.8 6.1V24h-4v-7.1c0-1.7 0-3.9-2.4-3.9s-2.7 1.8-2.7 3.8V24h-4V8z" />
                                </svg>
                                <input
                                    className="contact-input"
                                    value={resumeData.contact.linkedin}
                                    onChange={(e) =>
                                        handleNestedChange(
                                            "contact",
                                            "linkedin",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </section>

                        {/* EDUCATION */}
                        <section className="education">
                            <h3 className="edu-heading">EDUCATION</h3>

                            {resumeData.education.map((edu, i) => (
                                <div key={i} className="edu-block">

                                    <input
                                        className="education-input"
                                        value={edu.degree}
                                        onChange={(e) => {
                                            const updated = [...resumeData.education];
                                            updated[i].degree = e.target.value;

                                            setResumeData({
                                                ...resumeData,
                                                education: updated,
                                            });
                                        }}
                                    />

                                    <input
                                        className="education-input"
                                        value={edu.subject}
                                        onChange={(e) => {
                                            const updated = [...resumeData.education];
                                            updated[i].subject = e.target.value;

                                            setResumeData({
                                                ...resumeData,
                                                education: updated,
                                            });
                                        }}
                                    />

                                    <input
                                        className="education-input"
                                        value={edu.university}
                                        onChange={(e) => {
                                            const updated = [...resumeData.education];
                                            updated[i].university = e.target.value;

                                            setResumeData({
                                                ...resumeData,
                                                education: updated,
                                            });
                                        }}
                                    />



                                    <input
                                        className="education-input"
                                        value={edu.year}
                                        onChange={(e) => {
                                            const updated = [...resumeData.education];
                                            updated[i].year = e.target.value;

                                            setResumeData({
                                                ...resumeData,
                                                education: updated,
                                            });
                                        }}
                                    />

                                </div>
                            ))}
                        </section>
                        {/* SKILLS */}
                        <section className="skills">
                            <h3 className="skills-heading">SKILLS</h3>

                            <ul className="skills-list">
                                {resumeData.skills.map((skill, i) => (
                                    <li className="skills-bullet" key={i}>
                                        <input
                                            className="skill-input"
                                            value={skill}
                                            onInput={(e) => handleChange("skills", e.target.value)}
                                            onChange={(e) =>
                                                handleArrayChange("skills", i, e.target.value)
                                            }
                                        />
                                    </li>
                                ))}
                            </ul>
                        </section>

                    </aside>

                    {/* RIGHT */}
                    <main className="florence-right">

                        <section>
                            <h3 className="exp-heading">EXPERIENCE</h3>

                            {resumeData.experience.map((job, i) => (
                                <div key={i} className="job-block">
                                    <div className="exp-title">
                                        <input
                                            value={job.title}
                                            onInput={(e) => handleExperienceChange(i, "title", e.target.value)}
                                            onChange={(e) =>
                                                handleExperienceChange(i, "title", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="exp-date">
                                        <input
                                            className="exp-input"
                                            value={`${job.company} | ${job.location} | ${job.duration}`}
                                            onChange={(e) => {
                                                const parts = e.target.value.split("|");

                                                handleExperienceChange(i, "company", parts[0]?.trim());
                                                handleExperienceChange(i, "location", parts[1]?.trim());
                                                handleExperienceChange(i, "duration", parts[2]?.trim());
                                            }}
                                        />
                                    </div>
                                    <input
                                        className="jon-intro"
                                        value={job.intro}
                                        onChange={(e) =>
                                            handleExperienceChange(i, "intro", e.target.value)
                                        }
                                    />
                                    <ul className="experience-bullet">
                                        {job.bullets.map((bullet, bi) => (
                                            <li key={bi}>
                                                <input
                                                    className="bullet-input"
                                                    value={bullet}
                                                    onChange={(e) => {
                                                        const updated = [...resumeData.experience];
                                                        updated[i].bullets[bi] = e.target.value;

                                                        setResumeData({
                                                            ...resumeData,
                                                            experience: updated
                                                        });
                                                    }}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}

                        </section>

                    </main>

                </div>
            </div>
            </div>

        </TemplateLayout>
    );
}
