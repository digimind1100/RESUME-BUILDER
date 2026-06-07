import React from "react";
import AdviceArticle from "./AdviceArticle";

const article = {
  metaTitle: "How to Write a Professional Summary for a Resume (2026)",
  metaDescription:
    "Learn how to write a professional resume summary with examples for freshers and experienced candidates, ATS tips, mistakes, and FAQs.",
  title: "How to Write a Professional Summary",
  intro: [
    "A professional summary is the short paragraph at the top of your resume that introduces your strongest qualifications. It gives recruiters a quick reason to keep reading.",
    "In Pakistan and international job markets, recruiters often review many resumes quickly. A clear summary can show your role, experience level, key skills, and career direction in a few seconds.",
    "This guide explains how to write a professional summary, what to include, what to avoid, and how to make it useful for ATS screening."
  ],
  sample: {
    heading: "Professional Summary Examples",
    intro:
      "A good summary is specific, short, and connected to the job. It should not sound like a personal essay.",
    blocks: [
      {
        heading: "Experienced Candidate Example",
        text:
          "Detail-oriented Accountant with 4 years of experience in bookkeeping, bank reconciliation, accounts payable, tax documentation, and monthly reporting. Skilled in Excel, QuickBooks, and maintaining accurate financial records for management review."
      },
      {
        heading: "Fresh Graduate Example",
        text:
          "Motivated BBA graduate with strong communication, MS Excel, customer service, and documentation skills. Completed internship in branch operations and seeking an entry-level banking role."
      }
    ]
  },
  skills: {
    heading: "What to Mention in a Summary",
    intro:
      "Your summary should quickly combine your role, experience, strongest skills, and the value you offer.",
    items: [
      "Current job title or target role",
      "Years of experience if you have them",
      "Industry or department knowledge",
      "Two to four key skills",
      "Important tools or software",
      "One clear achievement or strength",
      "Career goal for freshers",
      "Keywords from the job description"
    ]
  },
  howToHeading: "How to Write a Professional Summary Step by Step",
  howTo: [
    {
      heading: "Identify your target job",
      text:
        "A summary should be written for a specific direction. Decide whether you are targeting accounting, teaching, HR, banking, sales, design, or another field."
    },
    {
      heading: "Start with your professional identity",
      text:
        "Begin with a phrase such as Customer Service Representative, Software Engineer, Fresh B.Com Graduate, or HR Manager. This helps recruiters understand you immediately."
    },
    {
      heading: "Add your strongest skills",
      text:
        "Choose the most relevant skills from the job post. Do not list too many. A summary should feel focused, not overloaded."
    },
    {
      heading: "Keep it between three and five lines",
      text:
        "A professional summary should be short. If it becomes a long paragraph, recruiters may skip it and move directly to experience."
    }
  ],
  atsTips: [
    "Use the target job title naturally in the summary.",
    "Include important keywords such as Excel, customer service, reconciliation, teaching, CRM, or project management where relevant.",
    "Avoid first-person wording such as I am or my objective is.",
    "Do not use graphics, icons, or unusual formatting in the summary section."
  ],
  mistakes: [
    "Writing a generic objective that says you want to grow.",
    "Using emotional claims without skills or evidence.",
    "Making the summary too long.",
    "Adding skills that do not match the job.",
    "Using the same summary for every application."
  ],
  faqs: [
    {
      question: "Is a professional summary necessary?",
      answer:
        "It is highly recommended. A summary helps recruiters quickly understand your profile, especially when your experience is relevant to the job."
    },
    {
      question: "Should freshers use a summary or objective?",
      answer:
        "Freshers can use a short summary that includes education, skills, internship experience, and target role. This is usually stronger than an old-style objective."
    },
    {
      question: "How many sentences should a summary have?",
      answer:
        "Two to four sentences are usually enough. The goal is to introduce your value, not explain your full career history."
    },
    {
      question: "Should I include achievements in the summary?",
      answer:
        "Yes, if you have a strong and relevant achievement. A result such as improved sales, reduced errors, or managed a team can make the summary stronger."
    }
  ],
  finalHeading: "Write a Summary That Opens the Door",
  finalParagraphs: [
    "Your professional summary should help the recruiter understand your value quickly. Make it specific, honest, and connected to the job you want.",
    "Once the summary is strong, make sure your skills and experience sections support the same message."
  ]
};

export default function HowToWriteProfessionalSummary() {
  return <AdviceArticle article={article} />;
}
