// src/Templates/AviationPro.jsx
import React, { useRef, useState } from "react";
import "./AviationPro.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import QRCode from "qrcode";

export default function AviationPro() {
  const resumeRef = useRef(null);
  const navigate = useNavigate();

  // ---------- PROFILE IMAGE ----------
  const [profileImage, setProfileImage] = useState(
    "/images/cleanProfileImage.png" // put your placeholder here
  );
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileImage(URL.createObjectURL(file));
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  // ---------- QR FORM STATE ----------
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [zip, setZip] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [profileLink, setProfileLink] = useState("");

  const [qrImage, setQrImage] = useState("/images/aviation-qr.png"); // default

  const handleGenerateQR = async () => {
    const qrData = `
Full Name: ${fullName}
Email: ${email}
Phone: ${phone}
Address: ${address}
City: ${city}
State: ${stateVal}
ZIP: ${zip}
LinkedIn: ${linkedin}
Profile: ${profileLink}
    `.trim();

    try {
      const qr = await QRCode.toDataURL(qrData || "Aviation Resume");
      setQrImage(qr);
    } catch (err) {
      console.error("QR generation error:", err);
    }
  };

  // ---------- TABS / ROLES ----------
  const roles = ["pilot", "cabin", "maintenance", "atc", "engineer", "operations"];

  const roleLabels = {
    pilot: "Pilot",
    cabin: "Cabin Crew",
    maintenance: "Maintenance",
    atc: "Air Traffic Controller",
    engineer: "Aeronautical Engineer",
    operations: "Airport Operations",
  };

  const [activeRole, setActiveRole] = useState("pilot");

  const roleData = {
    pilot: {
  title: "Commercial Airline Pilot",
  summary:
    "Highly skilled commercial airline pilot with 4,500+ total flight hours across domestic, regional, and intercontinental routes. Adept in crew resource management, critical decision-making, and flight operations under diverse weather and traffic conditions. Strong focus on passenger safety, regulatory compliance, and maintaining consistent on-time performance. Experienced in long-haul and short-haul operations with proven leadership in cockpit communication and situational awareness.",

  exp1Title: "Captain — Boeing 737 (NG/MAX)",
  exp1Company: "SkyWings Airlines — International & Domestic Operations",
  exp1Dates: "2019 – Present",
  exp1Bullets: [
    "Operate scheduled long-haul and regional flights with responsibility for crew coordination, fuel planning, performance calculations, and safe operation of aircraft systems.",
    "Execute takeoff, climb, cruise, descent, and landing procedures in accordance with aircraft SOPs and ATC instructions.",
    "Lead pre-flight briefings, assign cockpit and cabin crew duties, and coordinate real-time decision-making during abnormal and emergency situations.",
    "Ensure compliance with ICAO, FAA, EASA, and airline-specific safety standards during all phases of flight.",
    "Manage workload distribution using CRM principles to enhance flight safety and reduce operational risks.",
    "Conduct advanced flight monitoring using FMS, weather radar, TCAS, and real-time navigation systems.",
    "Collaborate with engineering teams for MEL/CDL assessments and technical log reports.",
  ],

  exp2Title: "First Officer — Airbus A320 Family",
  exp2Company: "BlueJet Airways — Regional Fleet",
  exp2Dates: "2014 – 2019",
  exp2Bullets: [
    "Assisted the captain in flight operations including FMC programming, route validation, performance checks, and fuel analysis.",
    "Executed takeoffs and landings under both VFR and IFR, including low-visibility operations (CAT II/III).",
    "Maintained accurate flight logs, operational documentation, and incident reports.",
    "Coordinated with ATC, ground handling, and dispatch teams to optimize turnaround times.",
    
  ],

  highlights: [
    "4,500+ total flight hours",
    "Type-rated: Boeing 737 NG/MAX & Airbus A320",
    "Zero safety violations throughout career",
    "Experienced in international, oceanic, and mountainous routes",
    "Certified in Advanced Crew Resource Management (ACRM)",
   
  ],
},

cabin: {
  title: "Senior Cabin Crew Specialist",
  summary:
    "Dedicated cabin crew professional with 10+ years of experience in premium in-flight service, passenger care, and aviation safety operations. Proven track record of handling long-haul and high-pressure cabin environments with professionalism and excellent communication. Expert in emergency procedures, cultural sensitivity, and maintaining smooth cabin flow during routine and irregular operations.",

  exp1Title: "Senior Flight Attendant — Long Haul Fleet",
  exp1Company: "GlobalSky Airlines — Boeing 787 / Airbus A350",
  exp1Dates: "2018 – Present",
  exp1Bullets: [
    "Lead cabin operations for long-haul flights up to 14–16 hours, ensuring seamless passenger experience and regulatory compliance.",
    "Conduct full safety demonstrations, emergency briefings, and equipment checks including oxygen units, doors, and fire extinguishers.",
    "Support medical emergencies, assess passenger conditions, and coordinate with onboard physicians and ground medical teams.",
    "Manage premium cabin service including meal presentation, onboarding of VIP passengers, and handling confidential traveler information.",
    "Train new crew members on service standards, communication protocols, and safety equipment handling.",
  ],

  exp2Title: "Cabin Crew — Regional & Short Haul",
  exp2Company: "CityJet Airlines — A320 / E175 Fleet",
  exp2Dates: "2013 – 2018",
  exp2Bullets: [
    "Delivered high-frequency regional flight service with fast turnaround requirements.",
    "Ensured compliance with safety duties including door arming/disarming, galley security, and cross-checks.",
    "Managed boarding, seating issues, baggage assistance, and conflict resolution.",
    "Executed first-aid procedures and documented incident reports accurately.",
  ],

  highlights: [
    "Certified in Aviation First Aid & CPR",
    "Trained in Advanced Smoke & Fire Fighting",
    "Awarded 'Top Crew Member' twice",
    "Fluent in 3+ international languages",
    "Experienced with VIP and special-needs passenger care",
  ],
},

    maintenance: {
  title: "Aviation Maintenance Technician (AMT)",
  summary:
    "Certified AMT with 9+ years of experience in commercial aircraft maintenance, inspections, troubleshooting, and regulatory compliance. Skilled in both line and heavy maintenance for Airbus and Boeing fleets. Strong understanding of aircraft systems including hydraulics, avionics, powerplant, and structures. Focused on safety, precision, and documentation accuracy.",

  exp1Title: "Senior AMT — Line Maintenance",
  exp1Company: "AeroTech MRO Services",
  exp1Dates: "2019 – Present",
  exp1Bullets: [
    "Perform A-checks, daily inspections, and transit checks on Airbus A320 and Boeing 737 fleets.",
    "Diagnose mechanical, electrical, and hydraulic faults using AMM, TSM, and MEL troubleshooting guidelines.",
    "Coordinate with engineering to review deferred defects, replacements, and component removals.",
    "Perform borescope inspections, leak checks, and engine ground runs when qualified.",
    "Ensure maintenance records meet FAA/EASA airworthiness standards.",
    "Train new technicians on inspection procedures, tooling safety, and documentation practices.",
  ],

  exp2Title: "Heavy Maintenance Technician (C-Checks)",
  exp2Company: "SkyBase Engineering",
  exp2Dates: "2014 – 2019",
  exp2Bullets: [
    "Conducted structural inspections, corrosion removal, and repair of fuselage/wings.",
    "Supported landing gear overhauls, brake system maintenance, and NDT testing.",
    "Assisted engineers with modification bulletins and service bulletins (SB/AD).",
    "Completed electrical harness routing, avionics equipment replacement, and EFIS troubleshooting.",
  ],

  highlights: [
    "FAA A&P Licensed Technician",
    "Skilled with A320 & B737 fleets",
    "NDT Level I (PT/MT) certified",
    "Strong documentation & compliance expertise",
    "Zero rework incidents for 4 consecutive years",
  ],
},

    atc: {
  title: "Air Traffic Controller (ATCO)",
  summary:
    "Experienced ATCO specializing in high-density terminal operations, en-route traffic separation, and emergency coordination. Strong situational awareness with exceptional communication and decision-making in time-critical operations. Proven record of maintaining safety and efficiency under heavy workloads.",

  exp1Title: "Approach / Terminal Radar Controller",
  exp1Company: "Metropolitan International Airport (Class B Airspace)",
  exp1Dates: "2017 – Present",
  exp1Bullets: [
    "Control arrival and departure sequencing while maintaining safe separation minima.",
    "Issue headings, altitudes, speed adjustments, and vectors for traffic management.",
    "Coordinate with area control (ACC), tower control, and ground units for seamless aircraft transitions.",
    "Utilize radar, ADS-B, and advanced surveillance systems for traffic monitoring.",
    "Manage emergencies including aircraft deviations, medical diversions, and communication failures.",
  ],

  exp2Title: "Tower Controller",
  exp2Company: "Regional Airport ATC Unit",
  exp2Dates: "2012 – 2017",
  exp2Bullets: [
    "Managed runway operations including takeoff/landing clearances and runway separation.",
    "Monitored taxi operations, pushback approvals, and ramp movements.",
    "Implemented low-visibility procedures (LVP) and emergency response actions.",
    "Maintained accurate logs, communication transcripts, and incident reports.",
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
    "Aeronautical engineer with expertise in aircraft structural design, performance optimization, testing, and certification support. Skilled in aerodynamic modeling, FEA simulations, and prototype development. Strong background working with multidisciplinary engineering teams.",

  exp1Title: "Flight Structures Engineer",
  exp1Company: "Aerospace Innovations Ltd.",
  exp1Dates: "2018 – Present",
  exp1Bullets: [
    "Perform fatigue, fracture, and stress analysis for wing and fuselage components.",
    "Develop FEA simulations using Nastran / HyperMesh for critical load evaluations.",
    "Coordinate with design teams to implement structural modifications and repairs.",
    "Prepare technical documentation for FAA/EASA submission and certification audits.",
    "Participate in ground testing, static testing, and modal analysis.",
  ],

  exp2Title: "Aerodynamics & Research Engineer",
  exp2Company: "AvioTech Labs",
  exp2Dates: "2014 – 2018",
  exp2Bullets: [
    "Supported wind-tunnel experiments and analyzed aerodynamic performance data.",
    "Developed MATLAB models for lift/drag calculations and flow simulations.",
    "Assisted in UAV prototype development and component testing.",
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
    "Operations specialist with deep expertise in terminal management, airside coordination, safety inspections, and airport stakeholder communication. Strong background ensuring operational continuity, on-time performance, and regulatory compliance in fast-paced airport environments.",

  exp1Title: "Airport Duty Officer",
  exp1Company: "Gateway International Airport",
  exp1Dates: "2019 – Present",
  exp1Bullets: [
    "Supervise daily terminal and airside operations across multiple stands and gates.",
    "Coordinate with airlines, ATC, ground handlers, and emergency services for smooth workflows.",
    "Monitor potential hazards and enforce compliance with ICAO and airport safety regulations.",
    "Respond to irregular operations, diversions, weather disruptions, and flight delays.",
    "Prepare daily operation logs, OTP reports, and incident documentation.",
  ],

  exp2Title: "Operations Coordinator",
  exp2Company: "City Airport Services — Ramp & Terminal",
  exp2Dates: "2013 – 2019",
  exp2Bullets: [
    "Managed aircraft turnarounds, ground handling supervision, and gate assignments.",
    "Ensured baggage flow, passenger boarding, and aircraft servicing were on schedule.",
    "Performed ramp inspections, equipment audits, and FOD checks.",
    "Supported VIP movements, charter flights, and emergency procedures.",
  ],

  highlights: [
    "Experienced with A-CDM processes",
    "Strong knowledge of airport regulations",
    "Excellent communication with multi-agency teams",
    "Works efficiently in 24/7 shift environment",
  ],
},

  };

  const activeData = roleData[activeRole];

  // ---------- PDF DOWNLOAD ----------
  const handleDownloadPDF = async () => {
    const element = resumeRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
    pdf.save("aviation-pro-resume.pdf");
  };

  const handleReset = () => window.location.reload();

  return (
    <div className="av-wrapper">
      {/* TOP BUTTONS */}
      <div className="av-buttons">
        <button onClick={handleDownloadPDF}>Download PDF</button>
        <button onClick={() => navigate("/templates")}>Back to Templates</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {/* QR FORM (UNDER BUTTONS) */}
      <div className="av-qr-form">
        <div className="av-qr-row">
          <input
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="av-qr-row">
          <input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            placeholder="State"
            value={stateVal}
            onChange={(e) => setStateVal(e.target.value)}
          />
          <input
            placeholder="ZIP"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </div>
        <div className="av-qr-row">
          <input
            placeholder="LinkedIn Profile URL"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
          <input
            placeholder="Portfolio / Profile Link"
            value={profileLink}
            onChange={(e) => setProfileLink(e.target.value)}
          />
        </div>
        <button className="av-qr-btn" onClick={handleGenerateQR}>
          Create QR Code
        </button>
      </div>

      {/* TABS (UNDER FORM, ABOVE HEADER) */}
      <div className="av-tabs">
        {roles.map((role) => (
          <button
            key={role}
            className={`av-tab ${activeRole === role ? "av-tab-active" : ""}`}
            onClick={() => setActiveRole(role)}
          >
            {roleLabels[role]}
          </button>
        ))}
      </div>

      {/* A4 PAGE */}
      <div className="av-a4" ref={resumeRef}>
        <div className="av-resume">
          {/* HEADER */}
          <header className="av-header">
            <div className="av-header-left">
              <div className="av-profile-wrapper" onClick={triggerFileSelect}>
                <img src={profileImage} alt="Profile" className="av-profile" />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
              </div>
              <div className="av-header-text">
                <h1
                  className="av-name"
                  contentEditable
                  suppressContentEditableWarning
                >
                  ALEXANDER MORGAN
                </h1>
                <p
                  className="av-role"
                  contentEditable
                  suppressContentEditableWarning
                >
                  {activeData.title.toUpperCase()}
                </p>
              </div>
            </div>

            {/* HEADER QR RIGHT SIDE */}
            <div className="av-header-right">
              <div className="av-qr-block">
                <img src={qrImage} alt="QR Code" className="av-qr-img" />
                <p
                  className="av-qr-text"
                  contentEditable
                  suppressContentEditableWarning
                >
                  Scan for licenses, flight log &amp; full profile
                </p>
              </div>
            </div>
          </header>

          {/* RUNWAY STRIPE */}
          <div className="av-runway-stripe" />

          {/* BODY */}
          <div className="av-body">
            {/* MAIN LEFT COLUMN */}
            <main className="av-main">
              {/* SUMMARY */}
              <section className="av-section">
                <h2
                  className="av-section-title"
                  contentEditable
                  suppressContentEditableWarning
                >
                  PROFESSIONAL SUMMARY
                </h2>
                <p
                  className="av-section-text"
                  contentEditable
                  suppressContentEditableWarning
                >
                  {activeData.summary}
                </p>
              </section>

              {/* EXPERIENCE */}
              <section className="av-section">
                <h2
                  className="av-section-title"
                  contentEditable
                  suppressContentEditableWarning
                >
                  EXPERIENCE
                </h2>

                {/* JOB 1 */}
                <div className="av-job">
                  <div className="av-job-header">
                    <div>
                      <p
                        className="av-job-title"
                        contentEditable
                        suppressContentEditableWarning
                      >
                        {activeData.exp1Title}
                      </p>
                      <p
                        className="av-job-company"
                        contentEditable
                        suppressContentEditableWarning
                      >
                        {activeData.exp1Company}
                      </p>
                    </div>
                    <p
                      className="av-job-dates"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      {activeData.exp1Dates}
                    </p>
                  </div>
                  <ul className="av-job-list">
                    {activeData.exp1Bullets.map((item, idx) => (
                      <li
                        key={idx}
                        contentEditable
                        suppressContentEditableWarning
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* JOB 2 */}
                <div className="av-job">
                  <div className="av-job-header">
                    <div>
                      <p
                        className="av-job-title"
                        contentEditable
                        suppressContentEditableWarning
                      >
                        {activeData.exp2Title}
                      </p>
                      <p
                        className="av-job-company"
                        contentEditable
                        suppressContentEditableWarning
                      >
                        {activeData.exp2Company}
                      </p>
                    </div>
                    <p
                      className="av-job-dates"
                      contentEditable
                      suppressContentEditableWarning
                    >
                      {activeData.exp2Dates}
                    </p>
                  </div>
                  <ul className="av-job-list">
                    {activeData.exp2Bullets.map((item, idx) => (
                      <li
                        key={idx}
                        contentEditable
                        suppressContentEditableWarning
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* HIGHLIGHTS */}
              <section className="av-section av-section-last">
                <h2
                  className="av-section-title"
                  contentEditable
                  suppressContentEditableWarning
                >
                  KEY HIGHLIGHTS
                </h2>
                <ul className="av-highlight-list">
                  {activeData.highlights.map((item, idx) => (
                    <li
                      key={idx}
                      contentEditable
                      suppressContentEditableWarning
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </main>

            {/* RIGHT SIDEBAR */}
            <aside className="av-sidebar">
              {/* CONTACT */}
              <section className="av-side-section">
                <h3 className="av-side-heading">CONTACT</h3>
                <ul className="av-side-list av-contact-list">
                  <li contentEditable suppressContentEditableWarning>
                    ✉️ alex.morgan@mail.com
                  </li>
                  <li contentEditable suppressContentEditableWarning>
                    📞 +1 (555) 214-8790
                  </li>
                  <li contentEditable suppressContentEditableWarning>
                    📍 New York, USA
                  </li>
                  <li contentEditable suppressContentEditableWarning>
                    🌐 linkedin.com/in/alexmorgan
                  </li>
                </ul>
              </section>

              {/* DIGITAL IDENTITY (QR IN SIDEBAR) */}
              <section className="av-side-section">
                <h3 className="av-side-heading">DIGITAL IDENTITY</h3>
                <div className="av-side-qr-box">
                  <img src={qrImage} alt="QR" className="av-side-qr-img" />
                  <p
                    className="av-side-qr-text"
                    contentEditable
                    suppressContentEditableWarning
                  >
                    QR code links to updated digital profile, licenses, and
                    aviation records.
                  </p>
                </div>
              </section>

              {/* SKILLS */}
              <section className="av-side-section">
                <h3 className="av-side-heading">CORE SKILLS</h3>
                <ul className="av-side-list">
                  <li contentEditable suppressContentEditableWarning>
                    Safety &amp; Compliance
                  </li>
                  <li contentEditable suppressContentEditableWarning>
                    Crew Resource Management
                  </li>
                  <li contentEditable suppressContentEditableWarning>
                    Emergency Procedures
                  </li>
                  <li contentEditable suppressContentEditableWarning>
                    Communication &amp; Briefing
                  </li>
                  <li contentEditable suppressContentEditableWarning>
                    Passenger &amp; Client Service
                  </li>
                </ul>
              </section>

              {/* LICENSES */}
              <section className="av-side-section">
                <h3 className="av-side-heading">LICENSES &amp; CERTS</h3>
                <ul className="av-side-list">
                  <li contentEditable suppressContentEditableWarning>
                    Valid Passport &amp; Travel Documents
                  </li>
                  <li contentEditable suppressContentEditableWarning>
                    Medical Certificate – Class 1 / 2
                  </li>
                  <li contentEditable suppressContentEditableWarning>
                    Recurrent Safety &amp; Emergency Training
                  </li>
                </ul>
              </section>

              {/* LANGUAGES */}
              <section className="av-side-section">
                <h3 className="av-side-heading">LANGUAGES</h3>
                <ul className="av-side-list">
                  <li contentEditable suppressContentEditableWarning>
                    English – Native / Fluent
                  </li>
                  <li contentEditable suppressContentEditableWarning>
                    Spanish – Conversational
                  </li>
                  <li contentEditable suppressContentEditableWarning>
                    French – Basic
                  </li>
                </ul>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
