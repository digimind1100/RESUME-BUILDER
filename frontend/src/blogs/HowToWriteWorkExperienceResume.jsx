import React from "react";
import AdviceArticle from "./AdviceArticle";

const article = {
  metaTitle: "How to Write Work Experience on a Resume (2026 Guide)",
  metaDescription:
    "Learn how to write work experience on a resume with examples, action verbs, achievement bullets, ATS tips, mistakes, and FAQs for 2026.",
  title: "How to Write Work Experience on a Resume",
  intro: [
    "The work experience section is usually the most important part of a resume. It tells employers what you have done, where you have worked, which responsibilities you handled, and what results you created.",
    "For job seekers in Pakistan, this section is often the difference between being shortlisted and being ignored. Recruiters want to see practical experience, but they also want it written in a clear and professional way.",
    "This guide explains how to write work experience on a resume using simple steps, examples, ATS-friendly wording, and common mistakes to avoid."
  ],
  sample: {
    heading: "Work Experience Sample",
    intro:
      "A strong work experience section uses job title, company name, dates, location, and bullet points that show impact.",
    blocks: [
      {
        heading: "Sales Executive",
        text: "ABC Distribution, Lahore | January 2023 to Present"
      },
      {
        heading: "Strong Experience Bullets",
        items: [
          "Achieved 115% of monthly sales target by developing new retail accounts.",
          "Maintained customer follow-up records in CRM and improved repeat orders.",
          "Prepared weekly sales reports for management with pipeline and recovery updates.",
          "Coordinated with warehouse and accounts teams to resolve delivery and payment issues."
        ]
      }
    ]
  },
  skills: {
    heading: "Skills to Highlight Through Experience",
    intro:
      "Do not only list skills in a separate section. Your work experience should prove that you used those skills in real situations.",
    items: [
      "Team coordination",
      "Customer handling",
      "Reporting and documentation",
      "Sales, operations, finance, teaching, or technical skills relevant to the role",
      "Problem solving",
      "Time management",
      "Software tools used in daily work",
      "Communication with clients, managers, or departments"
    ]
  },
  howToHeading: "How to Write Work Experience Step by Step",
  howTo: [
    {
      heading: "Start with your most recent job",
      text:
        "Use reverse chronological order. Put your current or most recent job first, then list older roles below it. This helps recruiters quickly understand your career path."
    },
    {
      heading: "Use achievement-focused bullet points",
      text:
        "Avoid writing only routine duties. A good bullet point explains what you did and why it mattered. Use results, numbers, improvements, or outcomes wherever possible."
    },
    {
      heading: "Match the job description",
      text:
        "Read the job post and notice repeated skills or duties. If you have that experience, include similar wording naturally in your bullet points."
    },
    {
      heading: "Keep each bullet concise",
      text:
        "One bullet should usually be one line or two short lines. Long paragraphs make your resume harder to scan and reduce the strength of your achievements."
    }
  ],
  atsTips: [
    "Use standard headings such as Work Experience or Professional Experience.",
    "Include job titles that match common industry wording.",
    "Add keywords from the job post naturally in your bullets.",
    "Avoid placing experience inside images, icons, or complex tables."
  ],
  mistakes: [
    "Writing responsibilities only and not showing results.",
    "Using the same bullets for every job application.",
    "Leaving out dates, job titles, or company names.",
    "Adding too many old or unrelated jobs.",
    "Using vague phrases such as worked hard or handled tasks."
  ],
  faqs: [
    {
      question: "How many bullet points should each job have?",
      answer:
        "Use three to six bullet points for recent and relevant roles. Older or less relevant jobs may need only one to three bullets."
    },
    {
      question: "Should fresh graduates include internships?",
      answer:
        "Yes. Internships, projects, volunteer work, part-time jobs, and university activities can show practical skills when full-time experience is limited."
    },
    {
      question: "Can I include unpaid work?",
      answer:
        "Yes, if it is relevant. Freelance work, family business support, volunteer projects, and internships can all be useful when written professionally."
    },
    {
      question: "Should I mention salary in work experience?",
      answer:
        "No. Salary information should not be included in your resume. Discuss salary later during the hiring process."
    }
  ],
  finalHeading: "Create a Strong Work Experience Section",
  finalParagraphs: [
    "Your work experience should show clear value. Focus on what you did, which skills you used, and how your work helped the company, customers, students, or team.",
    "A clean layout and focused bullet points will make your resume easier to read and stronger for both Pakistani and international job applications."
  ]
};

export default function HowToWriteWorkExperienceResume() {
  return <AdviceArticle article={article} />;
}
