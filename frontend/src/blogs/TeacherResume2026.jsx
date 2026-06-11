import React from "react";
import ResumeGuideArticle from "./ResumeGuideArticle";

const article = {
  metaTitle: "Teacher Resume Example (2026): Complete Guide & Template",
  metaDescription:
    "Write a strong Teacher resume for 2026 with classroom examples, teaching skills, ATS keywords, common mistakes, FAQs, and template tips.",
  title: "Teacher Resume Example (2026): Complete Guide & Template",
  intro: [
    "A Teacher resume should show subject knowledge, classroom management, communication skills, and the ability to improve student learning. Schools in Pakistan often receive many applications, so your resume must be clear, professional, and easy to compare.",
    "Whether you teach early years, primary, secondary, O Levels, A Levels, or college students, the resume should explain what you teach, which curriculum you know, and how you support students.",
    "This guide includes a Teacher resume example, key skills, writing advice, ATS tips, mistakes to avoid, and FAQs for 2026."
  ],
  exampleHeading: "Teacher Resume Example",
  sample: {
    name: "Ayesha Khan",
    role: "Secondary School Teacher",
    email: "ayeshakhan@email.com",
    phone: "+92 301 2345678",
    location: "Islamabad, Pakistan",
    summary:
      "Dedicated Teacher with 5 years of experience teaching English and Social Studies to middle and secondary classes. Skilled in lesson planning, classroom management, student assessment, parent communication, and activity-based learning.",
    experience: [
      "Prepared weekly lesson plans aligned with school curriculum and learning outcomes.",
      "Improved student participation through group activities, presentations, and regular feedback.",
      "Maintained class records, assessment sheets, and parent communication notes.",
      "Supported exam preparation through revision plans, worksheets, and individual guidance."
    ],
    education: "M.A. English, B.Ed, Allama Iqbal Open University, 2020"
  },
  skills: [
    "Lesson planning",
    "Classroom management",
    "Student assessment",
    "Subject expertise",
    "Parent communication",
    "Curriculum planning",
    "Activity-based learning",
    "Exam preparation",
    "Online teaching tools",
    "Patience, empathy, and communication"
  ],
  howTo: [
    {
      heading: "Mention your teaching level and subjects",
      text:
        "Recruiters should immediately understand whether you teach preschool, primary, secondary, O Levels, A Levels, matric, intermediate, or university students."
    },
    {
      heading: "Show classroom results",
      text:
        "Add examples such as improved attendance, better class participation, higher test scores, successful board exam preparation, or new learning activities you introduced."
    },
    {
      heading: "Include curriculum knowledge",
      text:
        "Mention Cambridge, Oxford, Punjab Board, Federal Board, Sindh Board, SNC, IB, or other curriculum experience where relevant to the job."
    },
    {
      heading: "Keep the tone professional",
      text:
        "A teaching resume should feel warm but organized. Use short bullet points and avoid long personal statements that do not show classroom value."
    }
  ],
  atsTips: [
    "Use keywords such as lesson planning, classroom management, assessment, curriculum, student progress, and parent meetings.",
    "Add subject names exactly as they appear in the job advertisement.",
    "Use standard headings and avoid placing important details inside images.",
    "Tailor your resume for school teacher, home tutor, coordinator, or lecturer roles."
  ],
  mistakes: [
    "Not mentioning class levels, subjects, or curriculum.",
    "Writing emotional statements without practical teaching evidence.",
    "Leaving out classroom management and assessment experience.",
    "Using a cluttered design that distracts from qualifications.",
    "Adding unrelated courses while missing teaching certifications."
  ],
  faqs: [
    {
      question: "Should a Teacher resume be one page?",
      answer:
        "A one-page resume is best for fresh and junior teachers. Experienced teachers can use two pages if they have multiple schools, leadership duties, or certifications."
    },
    {
      question: "What should fresh teachers include?",
      answer:
        "Fresh teachers should include education, teaching practice, internships, tutoring experience, subject knowledge, classroom activities, and relevant certifications."
    },
    {
      question: "Should I add board exam results?",
      answer:
        "Yes, if you helped students achieve strong results. Use honest numbers and avoid claiming results that were not directly connected to your teaching."
    },
    {
      question: "Are online teaching skills useful?",
      answer:
        "Yes. Skills in Zoom, Google Classroom, Microsoft Teams, LMS platforms, and digital worksheets are useful for many schools and academies."
    }
  ],
  finalParagraph:
    "A strong Teacher resume should clearly show your subjects, class levels, teaching methods, and student impact. Keep it structured, honest, and focused on learning outcomes.",
  relatedArticles: [
    {
      title: "Resume Checklist Before Applying",
      path: "/blog/resume-checklist-before-applying"
    },
    {
      title: "How to Write a Professional Summary",
      path: "/blog/how-to-write-a-professional-summary"
    },
    {
      title: "ATS Keywords for Resumes",
      path: "/blog/ats-keywords-for-resumes"
    },
    {
      title: "How to Write Work Experience",
      path: "/blog/how-to-write-work-experience-on-a-resume"
    }
  ]
};

export default function TeacherResume2026() {
  return <ResumeGuideArticle article={article} />;
}
