import React from "react";
import AdviceArticle from "./AdviceArticle";

const article = {
  metaTitle: "Resume Mistakes to Avoid in 2026: Complete Checklist",
  metaDescription:
    "Avoid common resume mistakes in 2026 with practical examples, ATS tips, formatting advice, FAQs, and a final checklist for job seekers.",
  title: "Resume Mistakes to Avoid",
  intro: [
    "Small resume mistakes can reduce your chances of getting shortlisted. A spelling error, unclear job title, weak summary, or poor formatting can make a recruiter move to the next candidate.",
    "In Pakistan, many job seekers apply to dozens of roles with the same resume. This often leads to generic content, missing keywords, and weak presentation.",
    "This guide explains the most common resume mistakes to avoid in 2026 and how to fix them before applying."
  ],
  sample: {
    heading: "Weak vs Strong Resume Example",
    intro:
      "A small change in wording can make your resume more professional and easier to trust.",
    blocks: [
      {
        heading: "Weak Bullet",
        text: "Responsible for office work and helped manager."
      },
      {
        heading: "Strong Bullet",
        text:
          "Prepared daily office reports, maintained client records, and coordinated meeting schedules for the operations manager."
      }
    ]
  },
  skills: {
    heading: "Areas Where Mistakes Often Happen",
    intro:
      "Most resume problems happen in the same sections. Review each area carefully before you apply.",
    items: [
      "Contact information",
      "Professional summary",
      "Work experience",
      "Skills section",
      "Education and certifications",
      "Dates and employment history",
      "File name and format",
      "Spelling and grammar",
      "ATS keywords",
      "Layout and readability"
    ]
  },
  howToHeading: "How to Fix Common Resume Mistakes",
  howTo: [
    {
      heading: "Make your resume specific",
      text:
        "A generic resume does not show why you fit a particular job. Adjust your summary, skills, and experience based on the role."
    },
    {
      heading: "Replace duties with achievements",
      text:
        "Instead of only listing tasks, explain what changed because of your work. Use numbers, deadlines, customers, reports, or improvements."
    },
    {
      heading: "Proofread more than once",
      text:
        "Read your resume slowly, check names and dates, and confirm that your email and phone number are correct."
    },
    {
      heading: "Remove unnecessary details",
      text:
        "Avoid irrelevant personal information, outdated skills, and long school-level details if they do not support your target job."
    }
  ],
  atsTips: [
    "Do not use image-only resume formats.",
    "Avoid keyword stuffing or repeating the same term unnaturally.",
    "Use simple headings and clear job titles.",
    "Check that your resume includes the most important skills from the job post."
  ],
  mistakes: [
    "Using an unprofessional email address.",
    "Sending a resume with spelling mistakes.",
    "Writing a long objective instead of a focused summary.",
    "Adding too many unrelated skills.",
    "Forgetting to tailor the resume for the job."
  ],
  faqs: [
    {
      question: "What is the biggest resume mistake?",
      answer:
        "The biggest mistake is sending a generic resume that does not match the job description or show clear achievements."
    },
    {
      question: "Are spelling mistakes serious?",
      answer:
        "Yes. Spelling mistakes can make employers question your attention to detail, especially in office, finance, data entry, and teaching roles."
    },
    {
      question: "Should I include personal details?",
      answer:
        "Keep personal details limited. Focus on contact information, qualifications, skills, and experience unless the employer asks for more."
    },
    {
      question: "Can a resume be too long?",
      answer:
        "Yes. A resume should be concise. Freshers usually need one page, while experienced candidates often use one to two pages."
    }
  ],
  finalHeading: "Review Before You Apply",
  finalParagraphs: [
    "A strong resume is clear, targeted, and free from avoidable mistakes. Before sending it, check the job description and make sure your resume answers what the employer needs.",
    "A careful final review can improve your chances without changing your actual experience."
  ]
};

export default function ResumeMistakesToAvoid2026() {
  return <AdviceArticle article={article} />;
}
