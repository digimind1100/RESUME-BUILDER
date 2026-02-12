import React, { useState, useRef, useEffect } from "react";

import "./TeacherElite.css";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import QRCode from "qrcode";
import { useAuth } from "../context/AuthContext";
import usePaymentGuard from "../hooks/usePaymentGuard";
import PaymentGate from "../components/payment/PaymentGate";
import Watermark from "../components/Watermark";
import ShareResume from "../components/ShareResume";
import { FaShareAlt } from "react-icons/fa";
import { useReview } from "../context/ReviewContext";
import { downloadResumeAndTriggerReview } from "../components/DownloadPDF";


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
  Physics: "PHYSICS TEACHER",
  "Physics Teacher": "PHYSICS TEACHER",
  "Chemistry Teacher": "CHEMISTRY TEACHER",
  Math: "MATH TEACHER",
  "Math Teacher": "MATH TEACHER",
  "Computer Teacher": "COMPUTER TEACHER",
  "IT Related": "IT / CS INSTRUCTOR",
};

export default function TeacherElite() {



  const navigate = useNavigate();
  const resumeRef = useRef(null);

  const [isEditable, setIsEditable] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const resumeId = "teacher-elite"; // or user-based later
  const resumePdfUrl = `${window.location.origin}/resumes/${resumeId}.pdf`;

  const isMobile = window.innerWidth <= 768;
  const [showMobileEditMsg, setShowMobileEditMsg] = useState(false);

  const { triggerReview } = useReview();

  const handleDownloadClick = () => {
    downloadResumeAndTriggerReview({
      onReviewTrigger: triggerReview,
    });
  };

  // after PDF download

  const {
    isPaid,
    showPaymentModal,
    setShowPaymentModal,
    requirePayment,
    handlePaymentSuccess,
  } = usePaymentGuard("TeacherElite");

  const canEdit = isPaid;


  console.log("isPaid:", isPaid);

  useEffect(() => {
    if (!canEdit) {
      const editableEls = document.querySelectorAll("[contenteditable]");
      editableEls.forEach(el => {
        el.setAttribute("contenteditable", "false");
      });
    }
  }, [canEdit]);

  useEffect(() => {
    if (!showMobileEditMsg) return;

    const t = setTimeout(() => {
      setShowMobileEditMsg(false);
    }, 3000);

    return () => clearTimeout(t);
  }, [showMobileEditMsg]);


  /* ---------- PROFILE IMAGE ---------- */
  const [profileImage, setProfileImage] = useState(
    "/images/minimalaccentprofileimage.png"
  );
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    if (!canEdit) return;

    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  /* ---------- QR FORM STATE ---------- */
  const [qrForm, setQrForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    website: "",
    license: "",
    subject: "",
  });

  const [qrImage, setQrImage] = useState("");

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setQrForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateQR = async () => {
    const text = `
Name: ${qrForm.name}
Email: ${qrForm.email}
Phone: ${qrForm.phone}
Address: ${qrForm.address}
LinkedIn: ${qrForm.linkedin}
Website: ${qrForm.website}
Teaching License: ${qrForm.license}
Subject: ${qrForm.subject}
    `;
    const dataUrl = await QRCode.toDataURL(text);
    setQrImage(dataUrl);
  };


  /* ---------- PDF DOWNLOAD ---------- */
  const handleDownloadPDF = async () => {
  const element = resumeRef.current;
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = 210;
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
  pdf.save("teacher-elite-resume.pdf");
};


  const handleReset = () => window.location.reload();

  /* ---------- TABS ---------- */
  const [activeTab, setActiveTab] = useState("High School");
  const currentTitle = TAB_TITLE_MAP[activeTab];

  const handleUseTemplate = (route) => {
    navigate(route);
  };



  return (
    <div className="resume-page-wrapper">

      {/* TOP BUTTONS */}
      <div className="te-buttons" contentEditable={false}>
        <button
          className="te-share-btn"
          onClick={(e) => {
            e.stopPropagation();
            setShowShare(true);
          }}
        >
          <FaShareAlt />
          <span>Share</span>
        </button>

        <button className="download-btn" onClick={handleDownloadClick}>
          Download PDF
        </button>

        <button onClick={() => navigate("/templates")}>
          Back to Templates
        </button>
        <button onClick={handleReset}>Reset</button>

        <button
          className={isEditable ? "edit-btn on" : "edit-btn off"}
          onClick={() => {
            console.log("EDIT CLICKED"); // 🔍 debug

            if (isMobile) {
              setShowMobileEditMsg(true);
              return; // ❌ stop here on mobile
            }

            if (!requirePayment()) return;

            setIsEditable((prev) => !prev);
          }}
        >
          {isEditable ? "Editing: ON" : "Editing: OFF"}
          {!canEdit && <span className="edit-crown">👑</span>}
        </button>
        {showMobileEditMsg && (
          <div className="mobile-edit-notice">
            Editing is available on desktop for best experience.
          </div>
        )}



      </div>

      {/* QR FORM */}
      <div className="te-qr-form">
        <h3>Personal Info (for QR Code)</h3>
        <div className="te-qr-grid">
          <input
            name="name"
            placeholder="Full Name"
            value={qrForm.name}
            onChange={handleFormChange}
            disabled={!canEdit}
          />
          <input
            name="email"
            placeholder="Email"
            value={qrForm.email}
            onChange={handleFormChange}
            disabled={!canEdit}
          />
          <input
            name="phone"
            placeholder="Phone"
            value={qrForm.phone}
            onChange={handleFormChange}
            disabled={!canEdit}
          />
          <input
            name="address"
            placeholder="Address"
            value={qrForm.address}
            onChange={handleFormChange}
            disabled={!canEdit}
          />
          <input
            name="linkedin"
            placeholder="LinkedIn Profile Link"
            value={qrForm.linkedin}
            onChange={handleFormChange}
            disabled={!canEdit}
          />
          <input
            name="website"
            placeholder="Personal Website"
            value={qrForm.website}
            onChange={handleFormChange}
            disabled={!canEdit}
          />
          <input
            name="license"
            placeholder="Teaching License / ID"
            value={qrForm.license}
            onChange={handleFormChange}
            disabled={!canEdit}
          />
          <input
            name="subject"
            placeholder="Main Subject Area"
            value={qrForm.subject}
            onChange={handleFormChange}
            disabled={!canEdit}
          />
        </div>
        <button className="te-qr-btn" onClick={handleGenerateQR}>
          Create QR Code
        </button>
      </div>

      {/* TABS */}
      <div className="te-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`te-tab ${tab === activeTab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* A4 RESUME */}
      <div
        id="resumeContainer" className="te-a4" ref={resumeRef} style={{ position: "relative" }}>

        <Watermark show={!canEdit} />
        <div className="te-resume">
          {/* HEADER with decorative wave + profile */}
          <header className="te-header">
            <div className="te-header-inner">
              <div className="te-header-left">
                <h1
                  className="te-header-name"
                  contentEditable={canEdit && isEditable}

                  suppressContentEditableWarning
                >
                  EMMA ROBERTS
                </h1>
                <p
                  className="te-header-role"
                  contentEditable={canEdit && isEditable}
                  suppressContentEditableWarning
                >
                  {currentTitle}
                </p>

                <div className="te-header-contact">
                  <span
                    contentEditable={canEdit && isEditable}
                    suppressContentEditableWarning
                  >
                    +1 (555) 908-2211
                  </span>
                  <span
                    contentEditable={canEdit && isEditable}
                    suppressContentEditableWarning
                  >
                    emma.roberts@schoolmail.com
                  </span>
                  <span
                    contentEditable={canEdit && isEditable}
                    suppressContentEditableWarning
                  >
                    New York, NY
                  </span>
                </div>
              </div>


              <div className="te-header-right">
                <div className="te-header-wave" />

                <div
                  className={`te-header-photo-wrap ${!canEdit ? "locked" : ""}`}
                  contentEditable={false}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (!isPaid) {
                      setShowPaymentModal(true);
                      return;
                    }
                    triggerFileSelect();
                  }}
                >
                  <div className="te-header-photo-bg" />
                  <div className="te-header-photo-circle">
                    <img src={profileImage} alt="Profile" />
                  </div>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                  onClick={() => {
                    if (!isPaid) {
                      e.preventDefault();
                      setShowPaymentModal(true);
                    }
                  }}

                />
              </div>
            </div>
          </header>

          {/* MAIN 2-COLUMN LAYOUT */}
          <div className="te-layout">
            {/* LEFT SIDEBAR (full height) */}
            <aside className="te-sidebar">
              {/* Top QR */}
              <div className="te-qr-card te-qr-top">
                {qrImage ? (
                  <img src={qrImage} alt="QR Code" className="te-qr-img" />
                ) : (
                  <div className="te-qr-placeholder">
                    QR Code will appear here
                  </div>
                )}
              </div>

              {/* Sidebar sections */}
              <section className="te-side-section">
                <h3 className="te-side-heading">CORE TEACHING SKILLS</h3>
                <ul className="te-side-list">
                  <li contentEditable={canEdit && isEditable}>Lesson Planning & Delivery</li>
                  <li contentEditable={canEdit && isEditable}>Classroom Management</li>
                  <li contentEditable={canEdit && isEditable}>Student Assessment</li>
                  <li contentEditable={canEdit && isEditable}>Parent Communication</li>
                  <li contentEditable={canEdit && isEditable}>Inclusive Education</li>
                </ul>
              </section>

              <section className="te-side-section">
                <h3 className="te-side-heading">CERTIFICATIONS</h3>
                <ul className="te-side-list">
                  <li contentEditable={canEdit && isEditable}>State Teaching License (Active)</li>
                  <li contentEditable={canEdit && isEditable}>ESL / TESOL Certification</li>
                  <li contentEditable={canEdit && isEditable}>Child Psychology Workshop</li>
                </ul>
              </section>

              <section className="te-side-section">
                <h3 className="te-side-heading">LANGUAGES</h3>
                <ul className="te-side-list">
                  <li contentEditable={canEdit && isEditable}>English — Native</li>
                  <li contentEditable={canEdit && isEditable}>Spanish — Professional</li>
                  <li contentEditable={canEdit && isEditable}>French — Basic</li>
                </ul>
              </section>

              <section className="te-side-section">
                <h3 className="te-side-heading">ACHIEVEMENTS</h3>
                <ul className="te-side-list">
                  <li contentEditable={canEdit && isEditable}>Teacher of the Year — 2022</li>
                  <li contentEditable={canEdit && isEditable}>Reading Program Lead — 2021</li>
                  <li contentEditable={canEdit && isEditable}>Debate Club Mentor</li>
                </ul>

              </section>

              {/* Bottom QR */}
              <div className="te-qr-card te-qr-bottom">
                {qrImage ? (
                  <img src={qrImage} alt="QR Code" className="te-qr-img" />
                ) : (
                  <div className="te-qr-placeholder">
                    Add your details above to generate QR.
                  </div>
                )}
              </div>
            </aside>

            {/* RIGHT MAIN */}
            <main className="te-main">
              {/* SUMMARY */}
              <section className="te-section">
                <h2 className="te-section-title">PROFESSIONAL SUMMARY</h2>
                <p
                  className="te-section-text"
                  contentEditable={canEdit && isEditable}
                  suppressContentEditableWarning
                >
                  Dedicated {activeTab.toLowerCase()} teacher with over 8 years
                  of experience fostering a positive and inclusive learning
                  environment. Skilled in differentiated instruction, integrating
                  technology in the classroom, and collaborating with parents,
                  colleagues, and school leadership to support each student&apos;s
                  academic and personal growth.
                </p>
              </section>

              {/* EXPERIENCE */}
              <section className="te-section">
                <h2 className="te-section-title">TEACHING EXPERIENCE</h2>

                <div className="te-job">
                  <div className="te-job-header">
                    <h3 contentEditable={canEdit && isEditable}>Lead {activeTab} Teacher</h3>
                    <span contentEditable={canEdit && isEditable}>2018 – Present</span>
                  </div>
                  <p
                    className="te-job-sub"
                    contentEditable={canEdit && isEditable}
                    suppressContentEditableWarning
                  >
                    Bright Future Academy — New York, NY
                  </p>
                  <ul className="te-job-list">
                    <li contentEditable={canEdit && isEditable}>
                      Designed engaging lessons aligned with curriculum and
                      state standards.
                    </li>
                    <li contentEditable={canEdit && isEditable}>
                      Used technology, group activities, and projects to support
                      different learning styles.
                    </li>
                    <li contentEditable={canEdit && isEditable}>
                      Communicated regularly with parents and guardians about
                      student progress.
                    </li>
                    <li contentEditable={canEdit && isEditable}>
                      Mentored new teachers and supported classroom management
                      strategies.
                    </li>
                  </ul>
                </div>

                <div className="te-job">
                  <div className="te-job-header">
                    <h3 contentEditable={canEdit && isEditable}>Classroom Teacher</h3>
                    <span contentEditable>2013 – 2018</span>
                  </div>
                  <p
                    className="te-job-sub"
                    contentEditable={canEdit && isEditable}
                    suppressContentEditableWarning
                  >
                    Greenfield Public School — Boston, MA
                  </p>
                  <ul className="te-job-list">
                    <li contentEditable={canEdit && isEditable}>
                      Taught core subjects and developed creative assessment
                      methods.
                    </li>
                    <li contentEditable={canEdit && isEditable}>
                      Organized school events, clubs, and after-school programs.
                    </li>
                    <li contentEditable={canEdit && isEditable}>
                      Provided additional academic support through tutoring and
                      small group work.
                    </li>
                  </ul>
                </div>
              </section>

              {/* EDUCATION + PROJECTS + EXTRA */}
              <section className="te-section te-section-grid">
                <div>
                  <h2 className="te-section-title">EDUCATION</h2>
                  <p
                    className="te-edu-line"
                    contentEditable={canEdit && isEditable}
                    suppressContentEditableWarning
                  >
                    M.A. in Education — Columbia University, NY (2011 – 2013)
                  </p>
                  <p
                    className="te-edu-line"
                    contentEditable={canEdit && isEditable}
                    suppressContentEditableWarning
                  >
                    B.A. in English Literature — Boston University (2007 – 2011)
                  </p>

                  <h2 className="te-section-title">WORKSHOPS & TRAININGS</h2>
                  <p
                    className="te-edu-line"
                    contentEditable={canEdit && isEditable}
                    suppressContentEditableWarning
                  >
                    Advanced Classroom Management — 2021
                  </p>
                  <p
                    className="te-edu-line"
                    contentEditable={canEdit && isEditable}
                    suppressContentEditableWarning
                  >
                    Inclusive Education & Differentiated Instruction — 2019
                  </p>
                  <p
                    className="te-edu-line"
                    contentEditable={canEdit && isEditable}
                    suppressContentEditableWarning
                  >
                    Digital Tools for Remote Teaching — 2020
                  </p>
                </div>

                <div>
                  <h2 className="te-section-title">SUBJECTS TAUGHT</h2>
                  <ul className="te-job-list">
                    <li contentEditable={canEdit && isEditable}>English Language & Literature</li>
                    <li contentEditable={canEdit && isEditable}>Reading & Writing Skills</li>
                    <li contentEditable={canEdit && isEditable}>Exam Preparation & Study Skills</li>
                  </ul>

                  <h2 className="te-section-title">
                    SCHOOL PROJECTS & ACTIVITIES
                  </h2>
                  <ul className="te-job-list">
                    <li contentEditable={canEdit && isEditable}>
                      Led a school-wide reading initiative improving literacy
                      rates by 20%.
                    </li>
                    <li contentEditable={canEdit && isEditable}>
                      Organized annual book fair and student writing
                      competitions.
                    </li>
                    <li contentEditable={canEdit && isEditable}>
                      Coordinated debate and public speaking events for students.
                    </li>
                  </ul>

                  <h2 className="te-section-title">EXTRA ACTIVITIES</h2>
                  <ul className="te-job-list">
                    <li contentEditable={canEdit && isEditable}>Literature Club Advisor</li>
                    <li contentEditable={canEdit && isEditable}>Debate & Public Speaking Coach</li>
                    <li contentEditable={canEdit && isEditable}>Volunteer Community Tutor</li>
                  </ul>
                </div>
              </section>
            </main>
          </div>
        </div>



        <PaymentGate
          open={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />

        {showShare && (
          <ShareResume
            resumeRef={resumeRef}
            onClose={() => setShowShare(false)}
          />
        )}

      </div>
    </div>
  );
}
