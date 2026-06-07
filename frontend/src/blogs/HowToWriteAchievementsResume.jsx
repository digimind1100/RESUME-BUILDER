import React from "react";
import AdviceArticle from "./AdviceArticle";

const article = {
  metaTitle: "How to Write Achievements on a Resume (2026 Examples)",
  metaDescription:
    "Learn how to write resume achievements with formulas, examples, action verbs, ATS tips, mistakes, and FAQs for stronger job applications.",
  title: "How to Write Achievements on a Resume",
  intro: [
    "Achievements show the value you created in your previous work, studies, internships, or projects. They make your resume stronger than a simple list of duties.",
    "Many candidates in Pakistan write what they were responsible for, but employers want to know what they improved, solved, completed, or delivered.",
    "This guide explains how to write achievements on a resume with simple formulas, examples, ATS tips, mistakes, and FAQs."
  ],
  sample: {
    heading: "Resume Achievement Examples",
    intro:
      "Strong achievements are specific. They explain action and result, even when the result is not a big number.",
    blocks: [
      {
        heading: "Before",
        text: "Handled customer calls."
      },
      {
        heading: "After",
        text:
          "Handled 70+ customer calls daily and resolved billing, order, and complaint queries while maintaining accurate CRM records."
      },
      {
        heading: "More Examples",
        items: [
          "Reduced monthly reporting errors by improving Excel tracking sheets.",
          "Prepared lesson plans that improved student participation in class activities.",
          "Generated new leads through follow-up calls and market visits.",
          "Organized office records and reduced document search time for the admin team."
        ]
      }
    ]
  },
  skills: {
    heading: "Skills Achievements Can Prove",
    intro:
      "Achievements help prove skills instead of only claiming them. They make soft and hard skills more believable.",
    items: [
      "Leadership",
      "Sales growth",
      "Customer service",
      "Reporting accuracy",
      "Cost saving",
      "Time management",
      "Teaching impact",
      "Problem solving",
      "Process improvement",
      "Technical delivery"
    ]
  },
  howToHeading: "How to Write Resume Achievements",
  howTo: [
    {
      heading: "Use the action plus result formula",
      text:
        "Start with an action verb, explain what you did, and add the result. For example: Improved invoice tracking and reduced payment follow-up delays."
    },
    {
      heading: "Add numbers when possible",
      text:
        "Numbers make achievements easier to understand. Use percentages, rupee amounts, number of customers, reports, students, projects, calls, or deadlines."
    },
    {
      heading: "Use honest estimates carefully",
      text:
        "If exact numbers are not available, use realistic ranges or explain the improvement in words. Never invent results."
    },
    {
      heading: "Include achievements from internships and projects",
      text:
        "Freshers can include university projects, internships, volunteer work, freelance assignments, and competitions if they show useful skills."
    }
  ],
  atsTips: [
    "Use action verbs such as improved, managed, prepared, achieved, coordinated, reduced, increased, and developed.",
    "Include job-specific keywords inside achievement bullets.",
    "Keep bullets short and readable.",
    "Avoid vague achievements that do not explain what changed."
  ],
  mistakes: [
    "Writing only job duties instead of results.",
    "Inventing numbers or exaggerating impact.",
    "Using weak verbs such as helped without explaining how.",
    "Adding achievements unrelated to the target job.",
    "Making every bullet too long."
  ],
  faqs: [
    {
      question: "What if I do not have big achievements?",
      answer:
        "Small improvements still count. Accuracy, deadlines, customer handling, reports completed, and problems solved can all become achievements."
    },
    {
      question: "Can freshers write achievements?",
      answer:
        "Yes. Freshers can use academic projects, internships, presentations, student societies, volunteer work, and coursework outcomes."
    },
    {
      question: "Should every bullet be an achievement?",
      answer:
        "Not every bullet needs a number, but most bullets should show action, responsibility, and value."
    },
    {
      question: "Can I mention confidential results?",
      answer:
        "Avoid confidential details. Use percentages or general wording if exact client, revenue, or internal data cannot be shared."
    }
  ],
  finalHeading: "Make Your Value Visible",
  finalParagraphs: [
    "Achievements help employers understand how you work and what you can contribute. They turn your resume from a duty list into a stronger career story.",
    "Start with your recent roles and rewrite weak bullets into clear action and result statements."
  ]
};

export default function HowToWriteAchievementsResume() {
  return <AdviceArticle article={article} />;
}
