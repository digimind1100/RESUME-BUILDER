import React from "react";
import TemplateLayout from "../TemplateLayout";
import "./NeoEdgePro.css";
import ProfileImageUpload from "../../components/ProfileImageUpload"
import QRCodeBlock from "../../components/QRCodeBlock";

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

            <div className="neo-resume">

              {/* HEADER */}
              <header className="neo-header">

                <div className="neo-header-left">

                  <div className="neo-profile-container">

  <div className="neo-profile-shape"></div>

  <ProfileImageUpload
    canEdit={canEdit}
    isEditable={isEditable}
    requirePayment={requirePayment}
    className="neo-profile-wrapper"
    imgClass="neo-profile"
  />

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

              {/* BODY */}
              <div className="neo-body">

                {/* SIDEBAR */}
                <aside className="neo-sidebar">

                  <section>
                    <h3>CONTACT</h3>
                    <p contentEditable={canEdit && isEditable}>+1 236 569 8745</p>
                    <p contentEditable={canEdit && isEditable}>alex@email.com</p>
                    <p contentEditable={canEdit && isEditable}>New York, USA</p>
                  </section>

                  <section>
                    <h3>SKILLS</h3>
                    <ul>
                      <li>JavaScript (ES6+)</li>
                      <li>React / Next.js</li>
                      <li>Node.js / Express</li>
                      <li>REST APIs</li>
                      <li>MongoDB / SQL</li>
                    </ul>
                  </section>

                  <section>
                    <h3>TOOLS</h3>
                    <ul>
                      <li>Git & GitHub</li>
                      <li>Figma</li>
                      <li>Postman</li>
                      <li>Docker</li>
                    </ul>
                  </section>

                  <section>
                    <h3>LANGUAGES</h3>
                    <ul>
                      <li>English (Fluent)</li>
                      <li>Spanish (Intermediate)</li>
                    </ul>
                  </section>

                </aside>

                {/* MAIN */}
                <main className="neo-main">

                  <section>
                    <h2>SUMMARY</h2>
                    <p contentEditable={canEdit && isEditable}>
                      Results-driven software engineer with 6+ years of experience building scalable web applications and modern user interfaces. Strong expertise in JavaScript ecosystems, API design, and performance optimization. Proven ability to lead projects, collaborate across teams, and deliver high-quality solutions in fast-paced environments.
                    </p>
                  </section>

                  <section>
                    <h2>EXPERIENCE</h2>

                    <div className="neo-job">
                      <h4>Senior Software Engineer</h4>
                      <span>TechCorp Inc. — 2021 – Present</span>
                      <ul>
                        <li>Led development of scalable SaaS platform used by 50K+ users.</li>
                        <li>Improved application performance by 40% through optimization.</li>
                        <li>Designed RESTful APIs and microservices architecture.</li>
                        <li>Mentored junior developers and conducted code reviews.</li>
                      </ul>
                    </div>

                    <div className="neo-job">
                      <h4>Frontend Developer</h4>
                      <span>Creative Labs — 2018 – 2021</span>
                      <ul>
                        <li>Built responsive UI using React and modern CSS frameworks.</li>
                        <li>Collaborated with designers to implement pixel-perfect layouts.</li>
                        <li>Integrated third-party APIs and improved UX flow.</li>
                      </ul>
                    </div>

                  </section>

                  <section>
                    <h2>PROJECTS</h2>
                    <ul>
                      <li>Resume Builder App with AI integration</li>
                      <li>E-commerce platform with payment gateway</li>
                      <li>Task management system using Supabase</li>
                    </ul>
                  </section>

                  <section>
                    <h2>EDUCATION</h2>
                    <p>
                      Bachelor of Computer Science — XYZ University (2014 – 2018)
                    </p>
                  </section>

                </main>

              </div>

            </div>

          </div>

        </div>

      )}
    </TemplateLayout>
  );
}