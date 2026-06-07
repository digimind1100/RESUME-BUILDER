import React from "react";
import ResumeGuideArticle from "./ResumeGuideArticle";

const article = {
  metaTitle: "Sales Executive Resume Example (2026): Complete Guide & Template",
  metaDescription:
    "Build a Sales Executive resume for 2026 with sales achievements, skills, ATS tips, common mistakes, FAQs, and a professional template guide.",
  title: "Sales Executive Resume Example (2026): Complete Guide & Template",
  intro: [
    "A Sales Executive resume should prove that you can find customers, build relationships, close deals, and meet targets. In Pakistan, sales jobs exist in FMCG, real estate, software, telecom, banking, retail, pharmaceuticals, and B2B services.",
    "Hiring managers want more than a list of duties. They want evidence of revenue, client handling, market visits, lead generation, negotiation, and target achievement.",
    "This guide gives you a practical Sales Executive resume example, important skills, writing steps, ATS tips, mistakes, and FAQs for 2026."
  ],
  exampleHeading: "Sales Executive Resume Example",
  sample: {
    name: "Hassan Malik",
    role: "Sales Executive",
    email: "hassanmalik@email.com",
    phone: "+92 302 3456789",
    location: "Karachi, Pakistan",
    summary:
      "Target-driven Sales Executive with 3 years of experience in B2B client acquisition, field sales, customer follow-up, and monthly revenue growth. Skilled in lead generation, negotiation, CRM updates, product presentations, and territory management.",
    experience: [
      "Achieved 110% of quarterly sales target by developing new corporate accounts.",
      "Generated qualified leads through calls, referrals, market visits, and digital follow-ups.",
      "Maintained CRM records and prepared weekly sales pipeline reports for managers.",
      "Improved repeat business by building strong customer relationships after sale closure."
    ],
    education: "BBA Marketing, Iqra University, 2022"
  },
  skills: [
    "Lead generation",
    "Cold calling and prospecting",
    "Negotiation",
    "Client relationship management",
    "CRM software",
    "Sales presentations",
    "Market research",
    "Target achievement",
    "Follow-up discipline",
    "Communication and persuasion"
  ],
  howTo: [
    {
      heading: "Lead with sales results",
      text:
        "Your summary should mention target achievement, revenue growth, new accounts, territory handling, or customer retention. Sales resumes are strongest when they include numbers."
    },
    {
      heading: "Add industry context",
      text:
        "Mention whether your experience is in retail, FMCG, software, banking, real estate, insurance, telecom, or another sector because sales methods differ by industry."
    },
    {
      heading: "Use achievement bullets",
      text:
        "Instead of saying responsible for sales, write achieved monthly targets, opened new accounts, increased repeat orders, or improved conversion rates."
    },
    {
      heading: "Show tools and reporting",
      text:
        "Add CRM, Excel, pipeline tracking, sales dashboards, and reporting experience because managers need salespeople who can organize leads and forecast activity."
    }
  ],
  atsTips: [
    "Use keywords such as sales target, lead generation, CRM, negotiation, client acquisition, revenue, and territory management.",
    "Mention products or industries that match the job advertisement.",
    "Keep job titles simple and searchable, such as Sales Executive or Business Development Executive.",
    "Use measurable achievements wherever possible."
  ],
  mistakes: [
    "Writing vague phrases like hardworking and motivated without sales proof.",
    "Not including targets, revenue, conversion rates, or client numbers.",
    "Ignoring CRM and reporting experience.",
    "Using the same resume for field sales and corporate sales roles.",
    "Listing responsibilities without showing customer or business impact."
  ],
  faqs: [
    {
      question: "What achievements should a Sales Executive include?",
      answer:
        "Include target achievement, revenue growth, new clients, repeat orders, conversion improvement, territory expansion, or successful product launches."
    },
    {
      question: "Should I include sales targets?",
      answer:
        "Yes, if you can share them professionally. Percentages are useful when exact revenue figures are confidential."
    },
    {
      question: "Is field sales experience valuable?",
      answer:
        "Yes. Field sales shows confidence, market knowledge, customer handling, and discipline, especially for FMCG, telecom, pharmaceuticals, and retail roles."
    },
    {
      question: "Should fresh graduates apply for sales roles?",
      answer:
        "Yes. Fresh graduates can highlight internships, university projects, communication skills, presentations, part-time work, and customer-facing experience."
    }
  ],
  finalParagraph:
    "A strong Sales Executive resume should be energetic, specific, and results-focused. Show what you sold, who you served, and how your work helped the company grow."
};

export default function SalesExecutiveResume2026() {
  return <ResumeGuideArticle article={article} />;
}
