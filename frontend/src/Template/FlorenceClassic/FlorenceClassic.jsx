import React, { useState, useEffect, useRef } from "react";
import "./FlorenceClassic.css";
import TemplateLayout from "../TemplateLayout";

export default function FlorenceClassic() {

    const STORAGE_KEY = "FlorenceClassic";

    const defaultData = {
        fullName: "FLORENCE STEWART",
        jobTitle: "PROFESSIONAL TITLE",
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
                "Communicated with customers professionally to answer inquiries, resolve issues",
                "Managed inventory by checking stock levels, updating records, and ensuring quality",
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

   
    const [profileImage, setProfileImage] = useState(
        "/images/cleanprofileimage.png"

    );

    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
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

    const handleSave = () => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(resumeData)
        );

        alert("Saved Successfully");
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

    return (
        <TemplateLayout templateId="FlorenceClassic" onSave={handleSave}>

            <div className="florence-page">

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
                        onClick={() => fileInputRef.current.click()}
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
                            <h3>CONTACT</h3>
                            <div className="contact-row">
                                {/* Phone SVG */}
                                <svg className="cont-icon" width="20" height="20" fill="#0066cc" viewBox="0 0 24 24">
                                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V21a1 1 0 01-1 1C10.52 22 2 13.48 2 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z" />
                                </svg>
                                <input
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
                                            className="skills-input"
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
                                            value={`${job.company} | ${job.location} | ${job.duration}`}
                                            onChange={(e) => {
                                                const parts = e.target.value.split("|");

                                                handleExperienceChange(i, "company", parts[0]?.trim());
                                                handleExperienceChange(i, "location", parts[1]?.trim());
                                                handleExperienceChange(i, "duration", parts[2]?.trim());
                                            }}
                                        />
                                    </div>
                                    <textarea
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

        </TemplateLayout>
    );
}