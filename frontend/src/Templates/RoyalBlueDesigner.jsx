import React, { useRef } from "react";
import "./RoyalBlueDesigner.css";

export default function RoyalBlueDesigner() {

  const resumeRef = useRef(null);

  return (
    <div className="rb-wrapper">

      <div className="rb-resume" ref={resumeRef}>

        {/* HEADER */}
        <header className="rb-header">

          <div className="rb-profile">
            <img
              src="/images/profile.jpg"
              alt="profile"
            />
          </div>

          <div className="rb-header-text">
            <h1 contentEditable suppressContentEditableWarning>
              JAMIE CHASTAIN
            </h1>

            <h3 contentEditable suppressContentEditableWarning>
              Graphic Designer
            </h3>

            <p contentEditable suppressContentEditableWarning>
              Hello, I'm Jamie Chastain, a passionate graphic designer
              with a flair for creating visually stunning and impactful
              designs. I’ve had the privilege of working on diverse
              projects from branding and marketing collateral to
              digital assets and web design.
            </p>
          </div>

        </header>


        {/* CONTACT BAR */}
        <div className="rb-contact">

          <span contentEditable suppressContentEditableWarning>
            📞 123-456-7890
          </span>

          <span contentEditable suppressContentEditableWarning>
            ✉ hello@reallygreatsite.com
          </span>

          <span contentEditable suppressContentEditableWarning>
            📍 123 Anywhere St, Any City
          </span>

        </div>


        {/* MAIN LAYOUT */}
        <div className="rb-body">

          {/* LEFT COLUMN */}
          <aside className="rb-left">

            <section className="rb-section">
              <h2>Skills</h2>

              <ul>
                <li contentEditable suppressContentEditableWarning>Organized</li>
                <li contentEditable suppressContentEditableWarning>Communication</li>
                <li contentEditable suppressContentEditableWarning>Teamwork</li>
                <li contentEditable suppressContentEditableWarning>Meeting deadlines</li>
                <li contentEditable suppressContentEditableWarning>Creativity</li>
                <li contentEditable suppressContentEditableWarning>Leadership</li>
              </ul>
            </section>


            <section className="rb-section">
              <h2>Education</h2>

              <div className="rb-edu">
                <h4 contentEditable suppressContentEditableWarning>
                  Secondary School
                </h4>

                <p contentEditable suppressContentEditableWarning>
                  Anywhere High School
                </p>

                <span contentEditable suppressContentEditableWarning>
                  2015 – 2018
                </span>
              </div>

              <div className="rb-edu">
                <h4 contentEditable suppressContentEditableWarning>
                  Bachelor of Technology
                </h4>

                <p contentEditable suppressContentEditableWarning>
                  AnyTech University
                </p>

                <span contentEditable suppressContentEditableWarning>
                  2018 – 2022
                </span>
              </div>

            </section>

          </aside>


          {/* RIGHT COLUMN */}
          <main className="rb-right">

            <h2 className="rb-exp-title">Experience</h2>

            <div className="rb-job">

              <h3 contentEditable suppressContentEditableWarning>
                Graphic Designer
              </h3>

              <span contentEditable suppressContentEditableWarning>
                Rimberio Company | 2020 – 2021
              </span>

              <p contentEditable suppressContentEditableWarning>
                As a seasoned graphic designer at Rimberio Company,
                I bring a wealth of expertise cultivated during my
                tenure here. I have had the privilege of working on
                a multitude of projects contributing to the visual
                identity of the company.
              </p>

            </div>


            <div className="rb-job">

              <h3 contentEditable suppressContentEditableWarning>
                Graphic Designer
              </h3>

              <span contentEditable suppressContentEditableWarning>
                Liceria & Co. | 2021 – 2022
              </span>

              <p contentEditable suppressContentEditableWarning>
                I am proud to have contributed significantly to the
                visual identity and success of Liceria & Co. Through
                my tenure, I have been entrusted with a diverse range
                of projects delivering compelling designs that
                resonate with our target audience.
              </p>

            </div>

          </main>

        </div>

      </div>

    </div>
  );
}