import React, { useEffect, useRef } from "react";
import TemplateLayout from "../TemplateLayout";
import "./AviationPro.css";
import QRCode from "qrcode";
import { useAuth } from "../../context/AuthContext";
import useProfileImage from "../../hooks/useProfileImage";
import useResumeTemplate from "../../hooks/useResumeTemplate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { savePdfAndUploadCopy } from "../../services/resumePdfCopyService";

export default function AviationPro() {
  const pdfGeneratingRef = useRef(false);

  const roles = ["pilot", "cabin", "maintenance", "atc", "engineer", "operations"];

  const roleLabels = {
    pilot: "Pilot",
    cabin: "Cabin Crew",
    maintenance: "Maintenance",
    atc: "Air Traffic Controller",
    engineer: "Aeronautical Engineer",
    operations: "Airport Operations",
  };

  const defaultRoles = {
    pilot: {
      title: "Commercial Airline Pilot",
      summary:
        "Highly skilled commercial airline pilot with 4,500+ total flight hours across domestic, regional, and intercontinental routes. Adept in crew resource management, critical decision-making, and flight operations under diverse weather and traffic conditions. Strong focus on passenger safety, regulatory compliance, and maintaining consistent on-time performance.",
      experiences: [
        {
          title: "Captain - Boeing 737 (NG/MAX)",
          company: "SkyWings Airlines - International & Domestic Operations",
          dates: "2019 - Present",
          bullets: [
            "Operate scheduled long-haul and regional flights with responsibility for crew coordination, fuel planning, performance calculations, and safe operation of aircraft systems.",
            "Execute takeoff, climb, cruise, descent, and landing procedures in accordance with aircraft SOPs and ATC instructions.",
            "Lead pre-flight briefings, assign cockpit and cabin crew duties, and coordinate real-time decision-making during abnormal and emergency situations.",
            "Ensure compliance with ICAO, FAA, EASA, and airline-specific safety standards during all phases of flight.",
            "Manage workload distribution using CRM principles to enhance flight safety and reduce operational risks.",
          ],
        },
        {
          title: "First Officer - Airbus A320 Family",
          company: "BlueJet Airways - Regional Fleet",
          dates: "2014 - 2019",
          bullets: [
            "Assisted the captain in flight operations including FMC programming, route validation, performance checks, and fuel analysis.",
            "Executed takeoffs and landings under both VFR and IFR, including low-visibility operations.",
            "Maintained accurate flight logs, operational documentation, and incident reports.",
            "Coordinated with ATC, ground handling, and dispatch teams to optimize turnaround times.",
          ],
        },
      ],
      highlights: [
        "4,500+ total flight hours",
        "Type-rated: Boeing 737 NG/MAX & Airbus A320",
        "Zero safety violations throughout career",
        "Experienced in international, oceanic, and mountainous routes",
        "Certified in Advanced Crew Resource Management",
      ],
    },
    cabin: {
      title: "Senior Cabin Crew Specialist",
      summary:
        "Dedicated cabin crew professional with 10+ years of experience in premium in-flight service, passenger care, and aviation safety operations. Proven track record of handling long-haul and high-pressure cabin environments with professionalism and excellent communication.",
      experiences: [
        {
          title: "Senior Flight Attendant - Long Haul Fleet",
          company: "GlobalSky Airlines - Boeing 787 / Airbus A350",
          dates: "2018 - Present",
          bullets: [
            "Lead cabin operations for long-haul flights, ensuring seamless passenger experience and regulatory compliance.",
            "Conduct full safety demonstrations, emergency briefings, and equipment checks.",
            "Support medical emergencies and coordinate with onboard physicians and ground medical teams.",
            "Manage premium cabin service and VIP passenger care.",
          ],
        },
        {
          title: "Cabin Crew - Regional & Short Haul",
          company: "CityJet Airlines - A320 / E175 Fleet",
          dates: "2013 - 2018",
          bullets: [
            "Delivered high-frequency regional flight service with fast turnaround requirements.",
            "Ensured compliance with safety duties including door arming, galley security, and cross-checks.",
            "Managed boarding, seating issues, baggage assistance, and conflict resolution.",
            "Executed first-aid procedures and documented incident reports accurately.",
          ],
        },
      ],
      highlights: [
        "Certified in Aviation First Aid & CPR",
        "Trained in Advanced Smoke & Fire Fighting",
        "Awarded Top Crew Member twice",
        "Fluent in 3+ international languages",
      ],
    },
    maintenance: {
      title: "Aviation Maintenance Technician (AMT)",
      summary:
        "Certified AMT with 9+ years of experience in commercial aircraft maintenance, inspections, troubleshooting, and regulatory compliance. Skilled in both line and heavy maintenance for Airbus and Boeing fleets.",
      experiences: [
        {
          title: "Senior AMT - Line Maintenance",
          company: "AeroTech MRO Services",
          dates: "2019 - Present",
          bullets: [
            "Perform A-checks, daily inspections, and transit checks on Airbus A320 and Boeing 737 fleets.",
            "Diagnose mechanical, electrical, and hydraulic faults using AMM, TSM, and MEL troubleshooting guidelines.",
            "Coordinate with engineering to review deferred defects, replacements, and component removals.",
            "Ensure maintenance records meet FAA/EASA airworthiness standards.",
          ],
        },
        {
          title: "Heavy Maintenance Technician",
          company: "SkyBase Engineering",
          dates: "2014 - 2019",
          bullets: [
            "Conducted structural inspections, corrosion removal, and fuselage repair.",
            "Supported landing gear overhauls, brake system maintenance, and NDT testing.",
            "Assisted engineers with modification bulletins and service bulletins.",
            "Completed electrical harness routing, avionics replacement, and EFIS troubleshooting.",
          ],
        },
      ],
      highlights: [
        "FAA A&P Licensed Technician",
        "Skilled with A320 & B737 fleets",
        "NDT Level I certified",
        "Strong documentation & compliance expertise",
      ],
    },
    atc: {
      title: "Air Traffic Controller (ATCO)",
      summary:
        "Experienced ATCO specializing in high-density terminal operations, en-route traffic separation, and emergency coordination. Strong situational awareness with exceptional communication and decision-making in time-critical operations.",
      experiences: [
        {
          title: "Approach / Terminal Radar Controller",
          company: "Metropolitan International Airport",
          dates: "2017 - Present",
          bullets: [
            "Control arrival and departure sequencing while maintaining safe separation minima.",
            "Issue headings, altitudes, speed adjustments, and vectors for traffic management.",
            "Coordinate with area control, tower control, and ground units for seamless aircraft transitions.",
            "Manage emergencies including aircraft deviations, medical diversions, and communication failures.",
          ],
        },
        {
          title: "Tower Controller",
          company: "Regional Airport ATC Unit",
          dates: "2012 - 2017",
          bullets: [
            "Managed runway operations including takeoff and landing clearances.",
            "Monitored taxi operations, pushback approvals, and ramp movements.",
            "Implemented low-visibility procedures and emergency response actions.",
            "Maintained accurate logs, communication transcripts, and incident reports.",
          ],
        },
      ],
      highlights: [
        "Licensed ATCO with Radar & Tower Ratings",
        "Expert in ICAO communication standards",
        "Handled up to 40+ movements per hour",
        "Zero operational errors in last 5 years",
      ],
    },
    engineer: {
      title: "Aeronautical / Aerospace Engineer",
      summary:
        "Aeronautical engineer with expertise in aircraft structural design, performance optimization, testing, and certification support. Skilled in aerodynamic modeling, FEA simulations, and prototype development.",
      experiences: [
        {
          title: "Flight Structures Engineer",
          company: "Aerospace Innovations Ltd.",
          dates: "2018 - Present",
          bullets: [
            "Perform fatigue, fracture, and stress analysis for wing and fuselage components.",
            "Develop FEA simulations using Nastran / HyperMesh for critical load evaluations.",
            "Coordinate with design teams to implement structural modifications and repairs.",
            "Prepare technical documentation for FAA/EASA submission and certification audits.",
          ],
        },
        {
          title: "Aerodynamics & Research Engineer",
          company: "AvioTech Labs",
          dates: "2014 - 2018",
          bullets: [
            "Supported wind-tunnel experiments and analyzed aerodynamic performance data.",
            "Developed MATLAB models for lift and drag calculations.",
            "Assisted in UAV prototype development and component testing.",
          ],
        },
      ],
      highlights: [
        "Advanced knowledge of CATIA V5 / SolidWorks",
        "Experienced in FEA, CFD, and load analysis",
        "Strong understanding of EASA CS-25 & FAA Part 25",
        "Passionate about next-gen sustainable aviation",
      ],
    },
    operations: {
      title: "Airport Operations Specialist",
      summary:
        "Operations specialist with deep expertise in terminal management, airside coordination, safety inspections, and airport stakeholder communication. Strong background ensuring operational continuity, on-time performance, and regulatory compliance.",
      experiences: [
        {
          title: "Airport Duty Officer",
          company: "Gateway International Airport",
          dates: "2019 - Present",
          bullets: [
            "Supervise daily terminal and airside operations across multiple stands and gates.",
            "Coordinate with airlines, ATC, ground handlers, and emergency services for smooth workflows.",
            "Monitor potential hazards and enforce compliance with ICAO and airport safety regulations.",
            "Respond to irregular operations, diversions, weather disruptions, and flight delays.",
          ],
        },
        {
          title: "Operations Coordinator",
          company: "City Airport Services - Ramp & Terminal",
          dates: "2013 - 2019",
          bullets: [
            "Managed aircraft turnarounds, ground handling supervision, and gate assignments.",
            "Ensured baggage flow, passenger boarding, and aircraft servicing stayed on schedule.",
            "Performed ramp inspections, equipment audits, and FOD checks.",
            "Supported VIP movements, charter flights, and emergency procedures.",
          ],
        },
      ],
      highlights: [
        "Experienced with A-CDM processes",
        "Strong knowledge of airport regulations",
        "Excellent communication with multi-agency teams",
        "Works efficiently in 24/7 shift environment",
      ],
    },
  };

  const defaultData = {
    fullName: "ALEXANDER MORGAN",
    profileImage: "/images/cleanprofileimage.png",
    activeRole: "pilot",
    info: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      linkedin: "",
      profileLink: "",
    },
    qrDataUrl: "/images/aviation-qr.png",
    qrText: "Scan for licenses, flight log & full profile",
    sideQrText:
      "QR code links to updated digital profile, licenses, and aviation records.",
    contact: [
      "Email: alex.morgan@mail.com",
      "Phone: +1 (555) 214-8790",
      "Location: New York, USA",
      "LinkedIn: linkedin.com/in/alexmorgan",
    ],
    education: ["Safety & Compliance", "Crew Resource Management"],
    skills: [
      "Safety & Compliance",
      "Crew Resource Management",
      "Emergency Procedures",
      "Communication & Briefing",
      "Passenger & Client Service",
    ],
    licenses: [
      "Valid Passport & Travel Documents",
      "Medical Certificate - Class 1 / 2",
      "Recurrent Safety & Emergency Training",
    ],
    languages: [
      "English - Native / Fluent",
      "Spanish - Conversational",
      "French - Basic",
    ],
    roles: defaultRoles,
  };

  const {
    resumeData,
    setResumeData,
    handleChange,
    handleSaveResume,
    checkPaymentStatus,
    loadResume,
  } = useResumeTemplate("AviationPro", defaultData);

  const { fileInputRef, handleImageUpload, openImagePicker } = useProfileImage(
    setResumeData,
    checkPaymentStatus
  );

  const { isAuthenticated } = useAuth();

  const aviationData = {
    ...defaultData,
    ...resumeData,
    info: {
      ...defaultData.info,
      ...(resumeData.info || {}),
    },
    roles: {
      ...defaultData.roles,
      ...(resumeData.roles || {}),
    },
    contact: Array.isArray(resumeData.contact) ? resumeData.contact : defaultData.contact,
    education: Array.isArray(resumeData.education)
      ? resumeData.education
      : defaultData.education,
    skills: Array.isArray(resumeData.skills) ? resumeData.skills : defaultData.skills,
    licenses: Array.isArray(resumeData.licenses)
      ? resumeData.licenses
      : defaultData.licenses,
    languages: Array.isArray(resumeData.languages)
      ? resumeData.languages
      : defaultData.languages,
  };

  const activeRole = roles.includes(aviationData.activeRole)
    ? aviationData.activeRole
    : "pilot";
  const activeData = aviationData.roles[activeRole] || defaultData.roles.pilot;

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

  const handleResetAviationPro = () => {
    localStorage.removeItem("AviationPro_resumeData");
    setResumeData({
      ...defaultData,
      profileImage: "/images/cleanprofileimage.png",
      qrDataUrl: "/images/aviation-qr.png",
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

  const updateListItem = (section, index, value) => {
    const updated = [...aviationData[section]];
    updated[index] = value;
    setResumeData({ ...resumeData, [section]: updated });
  };

  const updateRoleField = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      roles: {
        ...(prev.roles || aviationData.roles),
        [activeRole]: {
          ...activeData,
          [field]: value,
        },
      },
    }));
  };

  const updateExperience = (experienceIndex, field, value) => {
    const experiences = [...(activeData.experiences || [])];
    experiences[experienceIndex] = {
      ...experiences[experienceIndex],
      [field]: value,
    };
    updateRoleField("experiences", experiences);
  };

  const updateExperienceBullet = (experienceIndex, bulletIndex, value) => {
    const experiences = [...(activeData.experiences || [])];
    const bullets = [...(experiences[experienceIndex].bullets || [])];
    bullets[bulletIndex] = value;
    experiences[experienceIndex] = {
      ...experiences[experienceIndex],
      bullets,
    };
    updateRoleField("experiences", experiences);
  };

  const updateHighlight = (index, value) => {
    const highlights = [...(activeData.highlights || [])];
    highlights[index] = value;
    updateRoleField("highlights", highlights);
  };

  const handleGenerateQR = async () => {
    const qrData = `
Full Name: ${aviationData.info.fullName}
Email: ${aviationData.info.email}
Phone: ${aviationData.info.phone}
Address: ${aviationData.info.address}
City: ${aviationData.info.city}
State: ${aviationData.info.state}
ZIP: ${aviationData.info.zip}
LinkedIn: ${aviationData.info.linkedin}
Profile: ${aviationData.info.profileLink}
    `.trim();

    try {
      const qr = await QRCode.toDataURL(qrData || "Aviation Resume");
      handleChange("qrDataUrl", qr);
    } catch (error) {
      console.error("QR generation error:", error);
      alert("QR Code generate karte waqt error.");
    }
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

  let wrapper = null;

  pdfGeneratingRef.current = true;

  try {
    const originalElement = document.querySelector(".resume-a4.av-a4");

    if (!originalElement) {
      console.error("AviationPro resume element not found");
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

      const resume = element.querySelector(".av-resume");
      const body = element.querySelector(".av-body");
      const main = element.querySelector(".av-main");
      const sidebar = element.querySelector(".av-sidebar");

      if (resume) {
        resume.style.setProperty("width", "794px", "important");
        resume.style.setProperty("height", "1122px", "important");
        resume.style.setProperty("min-height", "1122px", "important");
      }

      if (body) {
        body.style.setProperty("display", "flex", "important");
        body.style.setProperty("flex-direction", "row", "important");
      }

      if (main) {
        main.style.setProperty("width", "68%", "important");
        main.style.setProperty("height", "922px", "important");
      }

      if (sidebar) {
        sidebar.style.setProperty("width", "32%", "important");
        sidebar.style.setProperty("height", "922px", "important");
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
        fileName: "AviationPro-resume.pdf",
        templateId: "AviationPro",
        downloadType: "nonAi",
      });
    } catch (error) {
    console.error("AviationPro PDF download error:", error);
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
      templateId="AviationPro"
      handleSaveResume={handleSaveResume}
      resumeData={resumeData}
      setResumeData={setResumeData}
      checkPaymentStatus={checkPaymentStatus}
      onReset={handleResetAviationPro}
      onLoadResume={loadResume}
      onDownloadPDF={handleDownloadPDF}
    >
      <div className="av-wrapper">
        <div className="av-qr-form no-pdf">
          <div className="av-qr-row">
            <input
              placeholder="Full Name"
              value={aviationData.info.fullName}
              onChange={(event) => updateInfo("fullName", event.target.value)}
            />
            <input
              placeholder="Email"
              value={aviationData.info.email}
              onChange={(event) => updateInfo("email", event.target.value)}
            />
            <input
              placeholder="Phone"
              value={aviationData.info.phone}
              onChange={(event) => updateInfo("phone", event.target.value)}
            />
          </div>

          <input
            placeholder="Address"
            value={aviationData.info.address}
            onChange={(event) => updateInfo("address", event.target.value)}
          />

          <div className="av-qr-row">
            <input
              placeholder="City"
              value={aviationData.info.city}
              onChange={(event) => updateInfo("city", event.target.value)}
            />
            <input
              placeholder="State"
              value={aviationData.info.state}
              onChange={(event) => updateInfo("state", event.target.value)}
            />
            <input
              placeholder="ZIP"
              value={aviationData.info.zip}
              onChange={(event) => updateInfo("zip", event.target.value)}
            />
          </div>

          <div className="av-qr-row">
            <input
              placeholder="LinkedIn Profile URL"
              value={aviationData.info.linkedin}
              onChange={(event) => updateInfo("linkedin", event.target.value)}
            />
            <input
              placeholder="Portfolio / Profile Link"
              value={aviationData.info.profileLink}
              onChange={(event) => updateInfo("profileLink", event.target.value)}
            />
          </div>

          <button className="av-qr-btn" onClick={handleGenerateQR}>
            Create QR Code
          </button>
        </div>

        <div className="av-tabs no-pdf">
          {roles.map((role) => (
            <button
              key={role}
              className={`av-tab ${activeRole === role ? "av-tab-active" : ""}`}
              onClick={() => handleChange("activeRole", role)}
            >
              {roleLabels[role]}
            </button>
          ))}
        </div>

        <div className="resume-mobile-wrap av-screen-preview">
          <div className="resume-a4 av-a4" style={{ position: "relative" }}>
            <div className="av-resume">
              <header className="av-header">
                <div className="av-header-left">
                  <div
                    className="av-profile-wrapper"
                    onClick={openImagePicker}
                    title="Click to change photo"
                  >
                    <img
                      src={aviationData.profileImage || "/images/cleanprofileimage.png"}
                      alt="Profile"
                      className="av-profile"
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

                  <div className="av-header-text">
                    <input
                      className="av-name"
                      value={aviationData.fullName}
                      onChange={(event) => handleChange("fullName", event.target.value)}
                    />
                    <input
                      className="av-role"
                      value={activeData.title.toUpperCase()}
                      onChange={(event) => updateRoleField("title", event.target.value)}
                    />
                  </div>
                </div>

                <div className="av-header-right">
                  <div className="av-qr-block">
                    <img
                      src={aviationData.qrDataUrl}
                      alt="QR Code"
                      className="av-qr-img"
                    />
                    <textarea
                      className="av-qr-text"
                      value={aviationData.qrText}
                      onChange={(event) => handleChange("qrText", event.target.value)}
                    />
                  </div>
                </div>
              </header>

              <div className="av-runway-stripe" />

              <div className="av-body">
                <main className="av-main">
                  <section className="av-section">
                    <h2 className="av-section-title">PROFESSIONAL SUMMARY</h2>
                    <textarea
                      className="av-section-text"
                      value={activeData.summary}
                      onChange={(event) => updateRoleField("summary", event.target.value)}
                    />
                  </section>

                  <section className="av-section">
                    <h2 className="av-section-title">EXPERIENCE</h2>

                    {(activeData.experiences || []).map((exp, index) => (
                      <div className="av-job" key={index}>
                        <div className="av-job-header">
                          <div className="av-job-title-wrapper">
                            <input
                              className="av-job-title"
                              value={exp.title}
                              onChange={(event) =>
                                updateExperience(index, "title", event.target.value)
                              }
                            />
                            <input
                              className="av-job-company"
                              value={exp.company}
                              onChange={(event) =>
                                updateExperience(index, "company", event.target.value)
                              }
                            />
                          </div>

                          <input
                            className="av-job-dates"
                            value={exp.dates}
                            onChange={(event) =>
                              updateExperience(index, "dates", event.target.value)
                            }
                          />
                        </div>

                        <ul className="av-job-list">
                          {(exp.bullets || []).map((item, bulletIndex) => (
                            <li key={bulletIndex}>
                              <textarea
                                className="av-job-bullet"
                                value={item}
                                onChange={(event) =>
                                  updateExperienceBullet(
                                    index,
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

                  <section className="av-section av-section-last">
                    <h2 className="av-section-title">KEY HIGHLIGHTS</h2>

                    <ul className="av-highlight-list">
                      {(activeData.highlights || []).map((item, index) => (
                        <li key={index}>
                          <textarea
                            className="av-highlight-item"
                            value={item}
                            onChange={(event) =>
                              updateHighlight(index, event.target.value)
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  </section>
                </main>

                <aside className="av-sidebar">
                  <section className="av-side-section">
                    <h3 className="av-side-heading">CONTACT</h3>
                    <ul className="av-side-list">
                      {aviationData.contact.map((item, index) => (
                        <li key={index}>
                          <input
                            className="av-side-input"
                            value={item}
                            onChange={(event) =>
                              updateListItem("contact", index, event.target.value)
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="av-side-section">
                    <h3 className="av-side-heading">DIGITAL IDENTITY</h3>
                    <div className="av-side-qr-box">
                      <img
                        src={aviationData.qrDataUrl}
                        alt="QR"
                        className="av-side-qr-img"
                      />
                      <textarea
                        className="av-side-qr-text"
                        value={aviationData.sideQrText}
                        onChange={(event) =>
                          handleChange("sideQrText", event.target.value)
                        }
                      />
                    </div>
                  </section>

                  <section className="av-side-section">
                    <h3 className="av-side-heading">EDUCATION</h3>
                    <ul className="av-side-list">
                      {aviationData.education.map((item, index) => (
                        <li key={index}>
                          <input
                            className="av-side-input"
                            value={item}
                            onChange={(event) =>
                              updateListItem("education", index, event.target.value)
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="av-side-section">
                    <h3 className="av-side-heading">CORE SKILLS</h3>
                    <ul className="av-side-list">
                      {aviationData.skills.map((item, index) => (
                        <li key={index}>
                          <input
                            className="av-side-input"
                            value={item}
                            onChange={(event) =>
                              updateListItem("skills", index, event.target.value)
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="av-side-section">
                    <h3 className="av-side-heading">LICENSES & CERTS</h3>
                    <ul className="av-side-list">
                      {aviationData.licenses.map((item, index) => (
                        <li key={index}>
                          <input
                            className="av-side-input"
                            value={item}
                            onChange={(event) =>
                              updateListItem("licenses", index, event.target.value)
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="av-side-section">
                    <h3 className="av-side-heading">LANGUAGES</h3>
                    <ul className="av-side-list">
                      {aviationData.languages.map((item, index) => (
                        <li key={index}>
                          <input
                            className="av-side-input"
                            value={item}
                            onChange={(event) =>
                              updateListItem("languages", index, event.target.value)
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  </section>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TemplateLayout>
  );
}
