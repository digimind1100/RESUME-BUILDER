import React from "react";
import ResumeGuideArticle from "./ResumeGuideArticle";

const article = {
  metaTitle: "Graphic Designer Resume Example (2026): Complete Guide & Template",
  metaDescription:
    "Create a Graphic Designer resume for 2026 with portfolio tips, design skills, ATS guidance, common mistakes, FAQs, and a resume example.",
  title: "Graphic Designer Resume Example (2026): Complete Guide & Template",
  intro: [
    "A Graphic Designer resume must balance creativity with clarity. Your portfolio shows visual talent, but your resume should explain your design skills, tools, project experience, client communication, and ability to deliver professional work on time.",
    "In Pakistan, graphic designers work in agencies, software houses, e-commerce companies, media teams, printing businesses, and freelance marketplaces. A clean resume helps employers understand your style, experience, and technical ability before opening your portfolio.",
    "This guide includes a Graphic Designer resume sample, key skills, writing steps, ATS tips, mistakes to avoid, and FAQs for 2026."
  ],
  exampleHeading: "Graphic Designer Resume Example",
  sample: {
    name: "Sana Javed",
    role: "Graphic Designer",
    email: "sanajaved@email.com",
    phone: "+92 303 4567890",
    location: "Faisalabad, Pakistan",
    summary:
      "Creative Graphic Designer with 4 years of experience designing social media creatives, brand identities, brochures, packaging, and digital ads. Skilled in Adobe Photoshop, Illustrator, Canva, Figma, typography, layout design, and visual branding.",
    experience: [
      "Designed 300+ social media posts, ads, banners, and promotional graphics for multiple brands.",
      "Created brand guidelines, logos, and marketing collateral for startup and retail clients.",
      "Collaborated with marketing teams to improve campaign visuals and audience engagement.",
      "Prepared print-ready files for brochures, packaging, flyers, and business stationery."
    ],
    education: "Bachelor in Design, National College of Arts, 2021"
  },
  skills: [
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Figma and Canva",
    "Brand identity design",
    "Social media creatives",
    "Typography and layout",
    "Print design",
    "Packaging design",
    "Photo editing",
    "Creative communication"
  ],
  howTo: [
    {
      heading: "Add a portfolio link near the top",
      text:
        "Your portfolio is essential. Add Behance, Dribbble, a personal website, Google Drive portfolio, or social media design page near your contact details."
    },
    {
      heading: "Describe design outcomes",
      text:
        "Write about campaigns, brand consistency, engagement, client satisfaction, print production, or faster design delivery instead of only listing software."
    },
    {
      heading: "Match the role type",
      text:
        "A social media designer, UI designer, packaging designer, and print designer need different keywords. Tailor your resume to the exact design job."
    },
    {
      heading: "Keep the resume readable",
      text:
        "A designer resume can look polished, but avoid complex graphics that hide text from ATS software. Let your portfolio carry the most creative visuals."
    }
  ],
  atsTips: [
    "Include design tool names exactly, such as Photoshop, Illustrator, Figma, Canva, InDesign, or After Effects.",
    "Use keywords from the job post, including branding, social media, packaging, UI, print, or motion graphics.",
    "Keep the resume text selectable and easy to scan.",
    "Use standard headings for skills, experience, education, and portfolio."
  ],
  mistakes: [
    "Sending a resume without a portfolio link.",
    "Overdesigning the resume so recruiters cannot quickly read it.",
    "Listing tools without explaining real design projects.",
    "Using low-quality portfolio links or unorganized folders.",
    "Ignoring print, branding, or campaign keywords from the job post."
  ],
  faqs: [
    {
      question: "Does a Graphic Designer need a portfolio?",
      answer:
        "Yes. A portfolio is one of the most important parts of a design application because it proves your visual ability and project range."
    },
    {
      question: "Should the resume be highly creative?",
      answer:
        "It should look clean and professional, but it must remain readable. Use the portfolio for more detailed creative presentation."
    },
    {
      question: "What tools should I add?",
      answer:
        "Add tools you can use well, such as Photoshop, Illustrator, Figma, Canva, InDesign, Premiere Pro, After Effects, or other relevant software."
    },
    {
      question: "Can fresh designers include freelance work?",
      answer:
        "Yes. Freelance projects, university assignments, internships, and personal branding projects can all support a fresh designer resume."
    }
  ],
  finalParagraph:
    "A strong Graphic Designer resume should make your skills easy to understand and your portfolio easy to find. Keep it clean, specific, and connected to real design work."
};

export default function GraphicDesignerResume2026() {
  return <ResumeGuideArticle article={article} />;
}
