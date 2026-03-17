import React, { useState, useRef } from "react";
import "./RoyalBlueDesigner.css";
import TemplateLayout from "./TemplateLayout";


export default function RoyalBlueDesigner() {

  const [profileImage, setProfileImage] = useState("/images/creativeboldimage.png");
  const fileInputRef = useRef(null);


  return (

    <TemplateLayout
      templateId="RoyalBlueDesigner"
      wrapperClass="rb-wrapper"
      resumeClass="rb-resume"
    >

      {({ canEdit, isEditable }) => {

        const handleImageUpload = (event) => {
          if (!canEdit) return;

          const file = event.target.files[0];
          if (!file) return;

          const imageUrl = URL.createObjectURL(file);
          setProfileImage(imageUrl);
        };

        const triggerFileSelect = () => {
          if (!canEdit) return;

          if (fileInputRef.current) {
            fileInputRef.current.click();
          }
        };

        return (
          <>
            <div className="rb-resume" contentEditable={false}>
              {/* ===== HEADER ===== */}
              <header className="rb-header">

                <div
                  className={`cb-photo-wrapper ${!canEdit ? "locked" : ""}`}
                  onClick={triggerFileSelect}
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

                <div className="rb-header-text">

                  <h1
                    contentEditable={canEdit && isEditable}
                    suppressContentEditableWarning
                  >
                    JAMIE CHASTAIN
                  </h1>

                  <h3
                    contentEditable={canEdit && isEditable}
                    suppressContentEditableWarning
                  >
                    Graphic Designer
                  </h3>

                  <p
                    contentEditable={canEdit && isEditable}
                    suppressContentEditableWarning
                  >
                    Hello, I'm Jamie Chastain, a passionate graphic designer
                    with a flair for creating visually stunning and impactful
                    designs. I’ve had the privilege of working on diverse
                    projects from branding and marketing collateral to
                    digital assets and web design.
                  </p>

                </div>

              </header>


              {/* ===== CONTACT BAR ===== */}
              <div className="rb-contact">

                <span
                  contentEditable={canEdit && isEditable}
                  suppressContentEditableWarning
                >
                  📞 123-456-7890
                </span>

                <span
                  contentEditable={canEdit && isEditable}
                  suppressContentEditableWarning
                >
                  ✉ hello@reallygreatsite.com
                </span>

                <span
                  contentEditable={canEdit && isEditable}
                  suppressContentEditableWarning
                >
                  📍 123 Anywhere St, Any City
                </span>

              </div>


              {/* ===== MAIN LAYOUT ===== */}
              <div className="rb-body">

                {/* ===== LEFT COLUMN ===== */}
                <aside className="rb-left">

                  <section className="rb-section">
                    <h2>Skills</h2>

                    <ul>
                      <li contentEditable={canEdit && isEditable} suppressContentEditableWarning>Organized</li>
                      <li contentEditable={canEdit && isEditable} suppressContentEditableWarning>Communication</li>
                      <li contentEditable={canEdit && isEditable} suppressContentEditableWarning>Teamwork</li>
                      <li contentEditable={canEdit && isEditable} suppressContentEditableWarning>Meeting deadlines</li>
                      <li contentEditable={canEdit && isEditable} suppressContentEditableWarning>Creativity</li>
                      <li contentEditable={canEdit && isEditable} suppressContentEditableWarning>Leadership</li>
                    </ul>

                  </section>


                  <section className="rb-section">

                    <h2>Education</h2>

                    <div className="rb-edu">

                      <h4 contentEditable={canEdit && isEditable} suppressContentEditableWarning>
                        Secondary School
                      </h4>

                      <p contentEditable={canEdit && isEditable} suppressContentEditableWarning>
                        Anywhere High School
                      </p>

                      <span contentEditable={canEdit && isEditable} suppressContentEditableWarning>
                        2015 – 2018
                      </span>

                    </div>


                    <div className="rb-edu">

                      <h4 contentEditable={canEdit && isEditable} suppressContentEditableWarning>
                        Bachelor of Technology
                      </h4>

                      <p contentEditable={canEdit && isEditable} suppressContentEditableWarning>
                        AnyTech University
                      </p>

                      <span contentEditable={canEdit && isEditable} suppressContentEditableWarning>
                        2018 – 2022
                      </span>

                    </div>

                  </section>

                </aside>


                {/* ===== RIGHT COLUMN ===== */}
                <main className="rb-right">

                  <h2 className="rb-exp-title">Experience</h2>

                  <div className="rb-job">

                    <h3 contentEditable={canEdit && isEditable} suppressContentEditableWarning>
                      Graphic Designer
                    </h3>

                    <span contentEditable={canEdit && isEditable} suppressContentEditableWarning>
                      Rimberio Company | 2020 – 2021
                    </span>

                    <p contentEditable={canEdit && isEditable} suppressContentEditableWarning>
                      As a seasoned graphic designer at Rimberio Company,
                      I bring a wealth of expertise cultivated during my
                      tenure here.
                    </p>

                  </div>


                  <div className="rb-job">

                    <h3 contentEditable={canEdit && isEditable} suppressContentEditableWarning>
                      Graphic Designer
                    </h3>

                    <span contentEditable={canEdit && isEditable} suppressContentEditableWarning>
                      Liceria & Co. | 2021 – 2022
                    </span>

                    <p contentEditable={canEdit && isEditable} suppressContentEditableWarning>
                      I am proud to have contributed significantly to the
                      visual identity and success of Liceria & Co.
                    </p>

                  </div>

                </main>

              </div>
            </div>
            </>
            );

      }}

          </TemplateLayout >

  );
}