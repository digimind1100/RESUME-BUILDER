import React from "react";
import AdviceArticle from "./AdviceArticle";

const article = {
  metaTitle: "How to Make an ATS Friendly Resume: Complete 2026 Guide",
  metaDescription:
    "Learn how to make an ATS friendly resume with clean formatting, keywords, section structure, examples, mistakes, FAQs, and related resume guides.",
  title: "How to Make an ATS Friendly Resume",
  intro: [
    "An ATS friendly resume is a resume that can be read clearly by Applicant Tracking Systems and human recruiters. Many employers use ATS software to scan resumes before shortlisting candidates.",
    "If your resume uses complex formatting, missing keywords, or unclear sections, it may not be parsed correctly even when your experience is relevant. A Resume Builder, CV Maker, or Online Resume Builder can help you create a clean structure that works for both recruiters and ATS software.",
    "This guide explains how to make an ATS friendly resume with simple formatting, targeted keywords, standard headings, and clear examples. It is also useful if you are comparing CV Format for Freshers, Resume Format for Freshers, Fresh Graduate Resume, or Student Resume Format options."
  ],
  sample: {
    heading: "ATS Friendly Resume Structure Sample",
    intro:
      "A strong ATS resume uses common section names and keeps important information in text format.",
    blocks: [
      {
        heading: "Recommended Section Order",
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
        heading: "Sample ATS Friendly Bullet",
        text:
          "Prepared monthly Excel reports, tracked customer records, and coordinated follow-ups with sales and support teams to improve response time."
      }
    ]
  },
  skills: {
    heading: "What Makes a Resume ATS Friendly",
    intro:
      "ATS friendly resumes are clean, readable, and aligned with the job description. The goal is not to trick software, but to make your qualifications easy to find. Many Professional Resume Templates and ATS Resume Builder tools follow these basics because they match modern hiring expectations.",
    items: [
      "Simple layout with readable fonts",
      "Standard headings such as Summary, Skills, Work Experience, and Education",
      "Relevant keywords from the job description",
      "Text-based content instead of images",
      "Clear job titles, company names, and dates",
      "Bullet points with action verbs and results",
      "Consistent spacing and formatting",
      "Correct file type requested by the employer"
    ]
  },
  howToHeading: "How to Make Your Resume ATS Friendly",
  howTo: [
    {
      heading: "Use a simple resume format",
      text:
        "Avoid heavy graphics, text boxes, icons, and complicated tables. A clean one-column or simple two-column layout is easier for ATS software and recruiters to read. This is especially important for a Resume Builder for Fresh Graduates and a Resume Builder for Job Seekers."
    },
    {
      heading: "Add keywords from the job post",
      text:
        "Read the job description carefully and include matching skills, tools, job duties, and qualifications when they honestly apply to your background."
    },
    {
      heading: "Use standard section headings",
      text:
        "Use headings like Work Experience, Education, Skills, Certifications, and Projects. Creative headings can make it harder for software to understand your resume."
    },
    {
      heading: "Write clear achievement bullets",
      text:
        "Use bullet points that show what you did, which tools or skills you used, and what result you created. Numbers, improvements, and outcomes make bullets stronger."
    }
  ],
  atsTips: [
    "Use common fonts such as Arial, Calibri, or similar readable fonts.",
    "Do not hide keywords or repeat them unnaturally.",
    "Keep your contact details in the main body instead of only in a header or footer.",
    "Use a clear file name such as Ali-Khan-Accountant-Resume.pdf.",
    "Submit PDF or DOCX based on the employer's instructions."
  ],
  mistakes: [
    "Using a resume that is mostly an image.",
    "Adding too many colors, graphics, or decorative elements.",
    "Forgetting to include important skills from the job description.",
    "Using vague bullets that do not show results.",
    "Submitting the same resume for every job without tailoring it."
  ],
  commercialSection: {
    heading: "Create Your Fresher Resume Online",
    text:
      "ResumeBuilder.pk is an Online Resume Builder and CV Maker that helps fresh graduates create ATS-friendly resumes using Professional Resume Templates. Build your resume online and download a PDF version in minutes."
  },
  faqs: [
    {
      question: "What is an ATS friendly resume?",
      answer:
        "An ATS friendly resume is formatted so applicant tracking software can read your text, sections, skills, job titles, dates, and experience correctly."
    },
    {
      question: "Can an ATS read PDF resumes?",
      answer:
        "Many ATS tools can read clean PDFs, but some job portals prefer DOCX. Always follow the file format requested in the job post."
    },
    {
      question: "Should I use a creative resume design?",
      answer:
        "Creative resumes can work for some design roles, but a simple text-based resume is safer for ATS screening. You can share a portfolio link separately."
    },
    {
      question: "How many keywords should I add?",
      answer:
        "Add keywords naturally where they fit your real skills and experience. A focused resume with honest keywords is better than keyword stuffing."
    }
  ],
  relatedArticles: [
    {
      title: "Best CV Format for Freshers",
      href: "/blog/best-cv-format-for-freshers-in-pakistan-2026"
    },
    {
      title: "ATS Keywords for Resumes",
      href: "/blog/ats-keywords-for-resumes"
    },
    {
      title: "Resume Checklist Before Applying",
      href: "/blog/resume-checklist-before-applying"
    }
  ],
  finalHeading: "Create a Resume That Can Be Read Clearly",
  finalParagraphs: [
    "An ATS friendly resume is simple, targeted, and easy to scan. Use clear headings, honest keywords, readable formatting, and achievement-focused bullet points.",
    "When your resume is easy for software and recruiters to understand, your chances of getting shortlisted become stronger. A Free CV Maker, Resume Builder, or CV Maker can help you choose Professional Resume Templates and create a Resume Download PDF file for job applications."
  ]
};

export default function HowToMakeAtsFriendlyResume() {
  return <AdviceArticle article={article} />;
}
