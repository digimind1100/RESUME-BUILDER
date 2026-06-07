import React from "react";
import AdviceArticle from "./AdviceArticle";

const article = {
  metaTitle: "ATS Keywords for Resumes in 2026: Complete Guide",
  metaDescription:
    "Learn how to use ATS keywords for resumes in 2026 with examples by job type, keyword placement tips, mistakes, FAQs, and templates.",
  title: "ATS Keywords for Resumes",
  intro: [
    "ATS keywords are words and phrases that match the job description. They help applicant tracking systems and recruiters understand whether your resume fits the role.",
    "Keywords are not magic tricks. They should honestly describe your skills, tools, experience, education, and achievements. Used correctly, they make your resume easier to find and evaluate.",
    "This guide explains how to find ATS keywords, where to place them, and how to avoid keyword stuffing."
  ],
  sample: {
    heading: "ATS Keyword Examples",
    intro:
      "The right keywords depend on the job. Use words from the job post only when they match your real background.",
    blocks: [
      {
        heading: "Accounting Keywords",
        items: ["Bookkeeping", "Bank reconciliation", "Accounts payable", "Tax documentation", "Excel", "QuickBooks"]
      },
      {
        heading: "Customer Service Keywords",
        items: ["CRM", "Complaint resolution", "Inbound calls", "Live chat", "Ticketing", "Customer satisfaction"]
      },
      {
        heading: "HR Keywords",
        items: ["Recruitment", "Onboarding", "Employee relations", "Payroll coordination", "HR policies", "Performance management"]
      }
    ]
  },
  skills: {
    heading: "Types of ATS Keywords",
    intro:
      "Look for different keyword types in each job advertisement. A balanced resume includes more than just software names.",
    items: [
      "Job titles",
      "Technical tools",
      "Industry terms",
      "Soft skills",
      "Certifications",
      "Education requirements",
      "Responsibilities",
      "Action verbs",
      "Compliance terms",
      "Location or work mode where relevant"
    ]
  },
  howToHeading: "How to Use ATS Keywords Correctly",
  howTo: [
    {
      heading: "Study the job post",
      text:
        "Read the job description and identify repeated skills, tools, responsibilities, and qualifications. These are often the most important keywords."
    },
    {
      heading: "Place keywords naturally",
      text:
        "Add keywords in your summary, skills, work experience, certifications, and project sections. They should fit the sentence and remain readable."
    },
    {
      heading: "Use exact wording when honest",
      text:
        "If the job post says Microsoft Excel and you have Excel experience, use the same wording. Do not replace important terms with unclear alternatives."
    },
    {
      heading: "Avoid keyword stuffing",
      text:
        "Repeating keywords unnaturally can make your resume look fake. Recruiters still read resumes after ATS screening."
    }
  ],
  atsTips: [
    "Use both acronyms and full terms when useful, such as CRM and customer relationship management.",
    "Add keywords to achievement bullets, not only the skills list.",
    "Customize keywords for every job category.",
    "Do not hide keywords in white text or tiny font."
  ],
  mistakes: [
    "Copying the full job description into the resume.",
    "Adding keywords for skills you do not have.",
    "Putting all keywords in one long skills section.",
    "Ignoring job title keywords.",
    "Using creative synonyms when the job post uses standard terms."
  ],
  faqs: [
    {
      question: "Where should I put ATS keywords?",
      answer:
        "Use them in the summary, skills section, work experience bullets, certifications, and project descriptions."
    },
    {
      question: "How many keywords should a resume have?",
      answer:
        "There is no fixed number. Include the important keywords that match your real skills and the job requirements."
    },
    {
      question: "Can I use keywords without experience?",
      answer:
        "Only use keywords you can support. If you learned a tool through a course or project, mention it honestly in the right section."
    },
    {
      question: "Do ATS keywords guarantee shortlisting?",
      answer:
        "No. Keywords help with matching, but your experience, achievements, formatting, and overall fit still matter."
    }
  ],
  finalHeading: "Use Keywords With Honesty and Strategy",
  finalParagraphs: [
    "ATS keywords help your resume speak the same language as the job description. Use them clearly, naturally, and only when they reflect your real ability.",
    "The best resume combines the right keywords with strong examples and clean formatting."
  ]
};

export default function AtsKeywordsForResumes() {
  return <AdviceArticle article={article} />;
}
