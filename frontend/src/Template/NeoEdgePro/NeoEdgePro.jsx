import React, { useRef, useState, useEffect } from "react";
import TemplateLayout from "../TemplateLayout";
import "./NeoEdgePro.css";
import ProfileImageUpload from "../../components/ProfileImageUpload"
import QRCodeBlock from "../../components/QRCodeBlock";
import { paginateResume } from "../../utils/paginateResume";

export default function NeoEdgePro() {

  const summaryRef = useRef();
  const experienceRef = useRef();
  const projectRef = useRef();
  const mainRef = useRef();

  const [pages, setPages] = useState({
    page1: null,
    page2: null,
  });

  useEffect(() => {
    const result = paginateResume({
      containerEl: document.querySelector(".neo-main"),
      sections: {
        summary: summaryRef.current,
        experience: experienceRef.current,
        projects: projectRef.current,
      },
    });

    setPages(result);
  }, []);
  const { page1, page2 } = pages;

  if (!page1) return null;

  return (
    <div className="neo-wrapper">

  {/* PAGE 1 */}
  <div className="resume-a4 neo-a4">
    <div className="neo-resume">

      <div className="neo-body">

        <aside className="neo-sidebar">
          LEFT SIDEBAR
        </aside>

        <main className="neo-main">
          RIGHT MAIN (68%)
        </main>

      </div>

    </div>
  </div>

  {/* PAGE 2 */}
  <div className="resume-a4 neo-a4">
    <div className="neo-resume">

      <div className="neo-body full-width">

        <main className="neo-main-full">
          PAGE 2 FULL WIDTH
        </main>

      </div>

    </div>
  </div>

</div>
  );
}