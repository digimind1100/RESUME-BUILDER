import React from "react";
import TemplateLayout from "../TemplateLayout";
import "./NeoEdgePro.css";
import ProfileImageUpload from "../../components/ProfileImageUpload"
import QRCodeBlock from "../../components/QRCodeBlock";
import PaginationEngine from "../../components/PaginationEngine";

export default function NeoEdgePro() {
  return (
    <TemplateLayout
      templateId="NeoEdgePro"
      wrapperClass="neo-wrapper"
      resumeClass="neo-resume"
    >
      {({ canEdit, isEditable, pdfRef, requirePayment }) => (

        <div className="neo-wrapper">
          <div className="resume-a4 neo-a4" ref={pdfRef}>


            <PaginationEngine
              header={<header className="neo-header">

                <div className="neo-header-left">

                  <div className="neo-profile-container">
                    <div className="neo-profile-global">
                      <div className="neo-profile-shape"></div>

                      <div className="neo-profile-inner">
                        <ProfileImageUpload
                          canEdit={canEdit}
                          isEditable={isEditable}
                          requirePayment={requirePayment}
                          className="neo-profile-wrapper"
                          imgClass="neo-profile"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="neo-header-text">
                    <h1 contentEditable={canEdit && isEditable}>
                      ALEXANDER MORGAN
                    </h1>
                    <p contentEditable={canEdit && isEditable}>
                      SENIOR SOFTWARE ENGINEER
                    </p>
                  </div>

                </div>

                <div className="neo-header-right">
                  <QRCodeBlock
                    canEdit={canEdit}
                    isEditable={isEditable}
                  />
                </div>

              </header>
              }
              sidebar={<aside className="neo-sidebar">

                <section className="neo-section">
                  <h3 className="neo-section-title">CONTACT</h3>

                  <ul className="neo-list">

                    <li>
                      <span className="neo-icon">
                        <svg width="16" height="16" fill="#4472c4" viewBox="0 0 24 24">
                          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V21a1 1 0 01-1 1C10.52 22 2 13.48 2 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z" />
                        </svg>
                      </span>
                      <span contentEditable={canEdit && isEditable}>
                        +1 (555) 245-8890
                      </span>
                    </li>

                    <li>
                      <span className="neo-icon">
                        <svg width="16" height="16" fill="#4472c4" viewBox="0 0 24 24">
                          <path d="M4 4h16a2 2 0 012 2v1l-10 6L2 7V6a2 2 0 012-2z" />
                          <path d="M2 8l10 6 10-6v10a2 2 0 01-2 2H4a2 2 0 01-2-2V8z" />
                        </svg>
                      </span>
                      <span contentEditable={canEdit && isEditable}>
                        alex.morgan@email.com
                      </span>
                    </li>

                    <li>
                      <span className="neo-icon">
                        <svg width="16" height="16" fill="#4472c4" viewBox="0 0 24 24">
                          <path d="M12 2a7 7 0 017 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 017-7zm0 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                        </svg>
                      </span>
                      <span contentEditable={canEdit && isEditable}>
                        New York, USA
                      </span>
                    </li>

                    <li>
                      <span className="neo-icon">
                        <svg width="16" height="16" fill="#4472c4" viewBox="0 0 24 24">
                          <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                        </svg>
                      </span>
                      <span contentEditable={canEdit && isEditable}>
                        www.alexmorgan.dev
                      </span>
                    </li>

                  </ul>
                </section>

                <section className="neo-section">
                  <h3 className="neo-section-title">CORE SKILLS</h3>

                  <div className="neo-skill-tags">
                    <span contentEditable={canEdit && isEditable}>JavaScript</span>
                    <span contentEditable={canEdit && isEditable}>React</span>
                    <span contentEditable={canEdit && isEditable}>Next.js</span>
                    <span contentEditable={canEdit && isEditable}>Node.js</span>
                    <span contentEditable={canEdit && isEditable}>REST APIs</span>
                    <span contentEditable={canEdit && isEditable}>MongoDB</span>
                    <span contentEditable={canEdit && isEditable}>UI/UX</span>
                    <span contentEditable={canEdit && isEditable}>Performance</span>
                  </div>
                </section>

                <section className="neo-section">
                  <h3 className="neo-section-title">TOOLS</h3>

                  <ul className="neo-list">
                    <li contentEditable={canEdit && isEditable}>Git & GitHub</li>
                    <li contentEditable={canEdit && isEditable}>Figma</li>
                    <li contentEditable={canEdit && isEditable}>Postman</li>
                    <li contentEditable={canEdit && isEditable}>Docker</li>
                    <li contentEditable={canEdit && isEditable}>VS Code</li>
                  </ul>
                </section>

                <section className="neo-section">
                  <h3 className="neo-section-title">LANGUAGES</h3>

                  <ul className="neo-list">
                    <li contentEditable={canEdit && isEditable}>English — Fluent</li>
                    <li contentEditable={canEdit && isEditable}>Spanish — Intermediate</li>
                    <li contentEditable={canEdit && isEditable}>French — Basic</li>
                  </ul>
                </section>

                <section className="neo-section">
                  <h3 className="neo-section-title">CERTIFICATIONS</h3>

                  <ul className="neo-list">
                    <li contentEditable={canEdit && isEditable}>AWS Certified Developer</li>
                    <li contentEditable={canEdit && isEditable}>Google UX Certification</li>
                    <li contentEditable={canEdit && isEditable}>Meta Frontend Certificate</li>
                  </ul>
                </section>

              </aside>}


              content={<>

                <section>
                  <h2>SUMMARY</h2>
                  <p contentEditable={canEdit && isEditable}>
                    Results-driven Senior Software Engineer with 6+ years of experience designing, developing, and optimizing high-performance web applications. Expertise in modern JavaScript frameworks, scalable architecture, and user-centric design. Proven ability to lead cross-functional teams, improve system performance, and deliver impactful digital solutions in fast-paced environments.
                  </p>
                </section>

                <section>
                  <h2>EXPERIENCE</h2>

                  <div className="neo-job">
                    <h4 className="main-heading" contentEditable={canEdit && isEditable}>Senior Software Engineer</h4>
                    <span contentEditable={canEdit && isEditable}>TechCorp Inc. — 2021 – Present</span>

                    <ul>
                      <li contentEditable={canEdit && isEditable}>Led development of scalable SaaS platform serving 50,000+ users globally.</li>
                      <li contentEditable={canEdit && isEditable}>Improved application performance by 40% through optimization techniques.</li>
                      <li contentEditable={canEdit && isEditable}>Designed and implemented RESTful APIs and microservices architecture.</li>
                      <li contentEditable={canEdit && isEditable}>Collaborated with UI/UX teams to deliver high-quality user experiences.</li>
                      <li contentEditable={canEdit && isEditable}>Mentored junior developers and conducted code reviews.</li>
                    </ul>
                  </div>

                  <div className="neo-job">
                    <h4 className="main-heading" contentEditable={canEdit && isEditable}>Frontend Developer</h4>
                    <span>Creative Labs — 2018 – 2021</span>

                    <ul>
                      <li contentEditable={canEdit && isEditable}>Built responsive web applications using React and modern CSS frameworks.</li>
                      <li contentEditable={canEdit && isEditable}>Integrated APIs and improved user interaction flows.</li>
                      <li contentEditable={canEdit && isEditable}>Worked closely with designers to implement pixel-perfect interfaces.</li>
                    </ul>
                  </div>

                  <div className="neo-job">
                    <h4 className="main-heading" contentEditable={canEdit && isEditable}>Junior Web Developer</h4>
                    <span contentEditable={canEdit && isEditable}>StartUp Hub — 2016 – 2018</span>

                    <ul>
                      <li contentEditable={canEdit && isEditable}>Developed small-scale web applications and landing pages.</li>
                      <li contentEditable={canEdit && isEditable}>Maintained legacy systems and improved performance.</li>
                      <li contentEditable={canEdit && isEditable}>Assisted in debugging and testing across multiple browsers.</li>
                    </ul>
                  </div>

                </section>

                <section>
                  <h2>PROJECTS</h2>

                  <ul>
                    <li contentEditable={canEdit && isEditable}>
                      Resume Builder Web App — Developed a dynamic resume builder with live preview and AI-powered suggestions.
                    </li>
                    <li contentEditable={canEdit && isEditable}>
                      E-commerce Platform — Built full-stack application with payment integration and user authentication.
                    </li>
                    <li contentEditable={canEdit && isEditable}>
                      Task Management System — Created a real-time task manager using Supabase backend.
                    </li>
                  </ul>
                </section>

              </>
              }

            />







          </div>  {/*  pdf dive close */}
        </div>

      )}
    </TemplateLayout>
  );
}