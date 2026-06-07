import React from "react";
import AdviceArticle from "./AdviceArticle";

const article = {
  metaTitle: "Resume Checklist Before Applying for Jobs in 2026",
  metaDescription:
    "Use this resume checklist before applying for jobs in 2026. Check formatting, ATS keywords, experience, skills, mistakes, and final details.",
  title: "Resume Checklist Before Applying",
  intro: [
    "Before you send a resume, take a few minutes to review it carefully. A final checklist can help you catch mistakes, improve clarity, and make sure the resume matches the job.",
    "Many job seekers in Pakistan apply quickly through WhatsApp, email, LinkedIn, Rozee, Indeed, or company portals. Speed is useful, but sending a weak resume again and again will not help.",
    "Use this checklist before every application to improve your chances of getting shortlisted."
  ],
  sample: {
    heading: "Quick Resume Review Sample",
    intro:
      "Before applying, compare your resume against the job post and confirm that the most important details are visible.",
    blocks: [
      {
        heading: "Top Checks",
        items: [
          "Correct phone number and email address",
          "Target job title appears in summary or experience",
          "Skills match the job description",
          "Recent experience includes achievements",
          "No spelling or date errors",
          "File name looks professional"
        ]
      },
      {
        heading: "Good File Name Example",
        text: "Ayesha-Khan-Teacher-Resume.pdf"
      }
    ]
  },
  skills: {
    heading: "Sections to Review",
    intro:
      "A resume checklist should cover every major section, not only spelling and formatting.",
    items: [
      "Contact details",
      "Professional summary",
      "Skills",
      "Work experience",
      "Achievements",
      "Education",
      "Certifications",
      "Projects",
      "Portfolio or LinkedIn links",
      "File format and file name"
    ]
  },
  howToHeading: "How to Review Your Resume Before Applying",
  howTo: [
    {
      heading: "Compare with the job description",
      text:
        "Check whether your resume includes the important skills, tools, qualifications, and responsibilities mentioned in the job post."
    },
    {
      heading: "Read from top to bottom",
      text:
        "Make sure the first half of your resume clearly shows who you are, what role you want, and why you are suitable."
    },
    {
      heading: "Check every date and title",
      text:
        "Incorrect dates, inconsistent job titles, or missing company names can create confusion and reduce trust."
    },
    {
      heading: "Send the right version",
      text:
        "If you have different resumes for different roles, confirm that you are attaching the correct one before emailing or uploading."
    }
  ],
  atsTips: [
    "Confirm that the resume uses readable text.",
    "Use a standard file type requested by the employer.",
    "Include relevant keywords from the job post.",
    "Avoid complex formatting that may break on job portals."
  ],
  mistakes: [
    "Sending the wrong resume version.",
    "Forgetting to update phone number, email, or city.",
    "Using a file name like finalresume2new.pdf.",
    "Applying without checking job-specific keywords.",
    "Leaving spelling mistakes in headings or job titles."
  ],
  faqs: [
    {
      question: "Should I customize my resume for every job?",
      answer:
        "Yes, at least adjust the summary, skills, and most relevant experience bullets for the role."
    },
    {
      question: "What file name should I use?",
      answer:
        "Use your name and target role, such as Ali-Raza-Accountant-Resume.pdf. Keep it simple and professional."
    },
    {
      question: "Should I check my resume on mobile?",
      answer:
        "Yes. Many recruiters open resumes on phones, so make sure the PDF is readable on both mobile and desktop."
    },
    {
      question: "How often should I update my resume?",
      answer:
        "Update it whenever you gain a new skill, complete a project, change jobs, finish a certification, or target a different role."
    }
  ],
  finalHeading: "Apply With Confidence",
  finalParagraphs: [
    "A final resume checklist helps you avoid simple errors and send a stronger application. The goal is to make your resume accurate, relevant, and easy to read.",
    "Before applying, pause for five minutes and review the details that can decide whether you get shortlisted."
  ]
};

export default function ResumeChecklistBeforeApplying() {
  return <AdviceArticle article={article} />;
}
