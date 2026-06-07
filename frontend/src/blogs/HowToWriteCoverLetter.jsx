import React from "react";
import AdviceArticle from "./AdviceArticle";

const article = {
  metaTitle: "How to Write a Cover Letter in 2026: Complete Guide",
  metaDescription:
    "Learn how to write a professional cover letter in 2026 with structure, examples, skills, ATS tips, mistakes, FAQs, and template advice.",
  title: "How to Write a Cover Letter",
  intro: [
    "A cover letter is a short letter that explains why you are applying and how your skills match the job. It supports your resume by adding context, motivation, and a more personal introduction.",
    "In Pakistan, not every employer asks for a cover letter, but a good one can help when applying through email, LinkedIn, company websites, NGOs, universities, and multinational companies.",
    "This guide explains how to write a professional cover letter with structure, examples, mistakes to avoid, and practical tips."
  ],
  sample: {
    heading: "Cover Letter Sample Structure",
    intro:
      "A good cover letter is short, focused, and written for one job. Do not copy a generic letter for every application.",
    blocks: [
      {
        heading: "Opening",
        text:
          "I am writing to apply for the Customer Service Representative position at your company. With experience in call handling, CRM documentation, and complaint resolution, I believe I can contribute to your service team."
      },
      {
        heading: "Middle",
        text:
          "In my previous role, I handled daily customer queries, updated support records, and followed up on unresolved complaints. I am comfortable communicating in English and Urdu and working in a target-based environment."
      },
      {
        heading: "Closing",
        text:
          "I would appreciate the opportunity to discuss how my customer support experience can help your team. Thank you for reviewing my application."
      }
    ]
  },
  skills: {
    heading: "What to Include in a Cover Letter",
    intro:
      "Your cover letter should connect your background to the employer's needs without repeating your full resume.",
    items: [
      "Target job title",
      "Reason for applying",
      "Two or three relevant skills",
      "One short achievement or example",
      "Knowledge of the company or role",
      "Professional tone",
      "Contact details",
      "Polite closing",
      "Availability if relevant",
      "Reference to attached resume"
    ]
  },
  howToHeading: "How to Write a Cover Letter Step by Step",
  howTo: [
    {
      heading: "Start with the specific role",
      text:
        "Mention the exact position you are applying for. This immediately tells the employer your letter is targeted."
    },
    {
      heading: "Connect your skills to the job",
      text:
        "Choose two or three skills from the job description and explain how your experience supports them."
    },
    {
      heading: "Keep it concise",
      text:
        "A cover letter should usually be three to five short paragraphs. Avoid long stories and repeated resume details."
    },
    {
      heading: "End with a clear closing",
      text:
        "Thank the employer and express interest in an interview. Keep the closing polite and professional."
    }
  ],
  atsTips: [
    "Use the job title and important keywords naturally.",
    "Keep the format simple if uploading to a portal.",
    "Use plain text in email applications.",
    "Match your cover letter tone with your resume."
  ],
  mistakes: [
    "Sending the same generic letter to every employer.",
    "Writing too much about personal need instead of employer value.",
    "Repeating the resume word for word.",
    "Using casual language or spelling mistakes.",
    "Forgetting to mention the job title."
  ],
  faqs: [
    {
      question: "Is a cover letter necessary?",
      answer:
        "It is necessary when the employer asks for it. Even when optional, it can help if it is targeted and well written."
    },
    {
      question: "How long should a cover letter be?",
      answer:
        "Keep it around half a page to one page. Short, relevant, and polished is better than long and generic."
    },
    {
      question: "Should freshers write a cover letter?",
      answer:
        "Yes. Freshers can explain their education, internship, projects, skills, and interest in the role."
    },
    {
      question: "Can I send a cover letter in an email?",
      answer:
        "Yes. You can write the cover letter in the email body and attach your resume, unless the employer requests a separate file."
    }
  ],
  finalHeading: "Support Your Resume With a Strong Letter",
  finalParagraphs: [
    "A good cover letter does not need to be complicated. It should explain why you fit the role and encourage the employer to read your resume carefully.",
    "Write it for the specific job, keep it professional, and proofread before sending."
  ]
};

export default function HowToWriteCoverLetter() {
  return <AdviceArticle article={article} />;
}
