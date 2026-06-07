import React from "react";
import AdviceArticle from "./AdviceArticle";

const article = {
  metaTitle: "ATS Resume Guide 2026: How to Make an ATS-Friendly Resume",
  metaDescription:
    "Complete ATS resume guide for 2026 with formatting rules, keyword tips, resume examples, common mistakes, FAQs, and template advice.",
  title: "ATS Resume Guide",
  intro: [
    "An ATS, or Applicant Tracking System, is software many employers use to collect, scan, and filter resumes. If your resume is hard for the system to read, it may not reach a recruiter even if you are qualified.",
    "ATS systems are increasingly common in Pakistan, especially in banks, software houses, multinational companies, recruitment agencies, and large organizations.",
    "This guide explains how to make an ATS-friendly resume with simple formatting, correct keywords, readable sections, and practical examples."
  ],
  sample: {
    heading: "ATS-Friendly Resume Structure Sample",
    intro:
      "An ATS-friendly resume uses simple headings and readable text. Here is a clean structure you can follow.",
    blocks: [
      {
        heading: "Recommended Order",
        items: [
          "Contact Information",
          "Professional Summary",
          "Key Skills",
          "Work Experience",
          "Projects or Certifications",
          "Education"
        ]
      },
      {
        heading: "Example Keyword Bullet",
        text:
          "Managed customer complaints through CRM, resolved service tickets, and maintained accurate follow-up records for quality reporting."
      }
    ]
  },
  skills: {
    heading: "ATS-Friendly Resume Elements",
    intro:
      "ATS-friendly resumes are not complicated. They are clean, specific, and written with the same language employers use in job posts.",
    items: [
      "Standard section headings",
      "Clear job titles",
      "Relevant keywords",
      "Simple fonts",
      "Bullet points",
      "Readable dates and company names",
      "Text-based content",
      "Job-specific skills",
      "Consistent formatting",
      "PDF or DOCX format when requested"
    ]
  },
  howToHeading: "How to Create an ATS-Friendly Resume",
  howTo: [
    {
      heading: "Use simple formatting",
      text:
        "Avoid heavy graphics, text boxes, complicated tables, and image-based resumes. ATS software reads plain text more reliably."
    },
    {
      heading: "Use keywords from the job post",
      text:
        "If a job requires Excel, payroll, reconciliation, React, CRM, or customer service, include those terms only if they honestly match your experience."
    },
    {
      heading: "Use standard headings",
      text:
        "Headings like Summary, Skills, Work Experience, Education, and Certifications are easier for systems and recruiters to understand."
    },
    {
      heading: "Customize each application",
      text:
        "A single general resume is weaker than a targeted resume. Adjust your summary, skills, and experience to match each role."
    }
  ],
  atsTips: [
    "Avoid placing important details in headers or footers.",
    "Use common file names such as Ahmed-Raza-Accountant-Resume.pdf.",
    "Spell out important terms when helpful, such as Applicant Tracking System and ATS.",
    "Keep dates in a simple format such as January 2024 to Present."
  ],
  mistakes: [
    "Using a resume that is mostly an image.",
    "Adding keywords in a hidden or unnatural way.",
    "Using unusual section names that confuse parsing.",
    "Submitting the wrong file type for the job portal.",
    "Forgetting to include the exact skills required by the job."
  ],
  faqs: [
    {
      question: "Does every company use ATS software?",
      answer:
        "No, but many large companies, recruitment agencies, and online job portals use ATS tools. A clean ATS-friendly resume is still easier for humans to read."
    },
    {
      question: "Can creative resumes pass ATS?",
      answer:
        "Some can, but simple text-based resumes are safer. Designers can use a clean resume and share a portfolio link for creative work."
    },
    {
      question: "Should I use PDF or Word format?",
      answer:
        "Use the format requested in the job post. If no format is mentioned, a clean PDF is usually acceptable, but some portals prefer DOCX."
    },
    {
      question: "Can ATS reject my resume automatically?",
      answer:
        "Yes, some systems rank or filter resumes based on keywords, job requirements, and formatting. That is why targeted wording matters."
    }
  ],
  finalHeading: "Make Your Resume Easy to Read",
  finalParagraphs: [
    "An ATS-friendly resume is not about tricking software. It is about making your qualifications clear, searchable, and easy to understand.",
    "Use simple formatting, honest keywords, and targeted content for every job application."
  ]
};

export default function AtsResumeGuide() {
  return <AdviceArticle article={article} />;
}
