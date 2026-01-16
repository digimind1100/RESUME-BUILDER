import React, { useState } from "react";
import './FAQBlock.css';

const FAQBlock = () => {
  const faqs = [
    {
      question: "Why is a cover letter important along with a CV or Resume?",
      answer:
        "A cover letter complements your CV or resume by providing context and personality. " +
        "While your resume lists your skills and experience, the cover letter allows you to explain why you are a great fit for the role, highlight your enthusiasm, and demonstrate your communication skills. " +
        "It can help you stand out from other candidates and show that you’ve taken the time to tailor your application to the company and position."
    },
    {
      question: "How long should a cover letter be?",
      answer:
        "A cover letter should ideally be one page. Keep it concise, clear, and focused on key achievements that relate to the job."
    },
    {
      question: "Do I need to customize my cover letter for each job?",
      answer:
        "Yes! Tailoring your cover letter to the specific job and company shows genuine interest and increases your chances of getting noticed."
    },
    {
      question: "What is the best way to start a cover letter?",
      answer:
        "Begin with a strong opening addressing the hiring manager by name if possible, and clearly state the position you are applying for."
    },
    {
      question: "Should I repeat my resume in the cover letter?",
      answer:
        "No. Highlight key skills and experiences, but avoid repeating your resume verbatim. Use the cover letter to tell your story."
    },
    {
      question: "How do I end a cover letter?",
      answer:
        "End with a polite call to action, expressing your interest in an interview and thanking the reader for their time."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2 className="faq-heading">Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="faq-toggle">{openIndex === index ? "-" : "+"}</span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQBlock;
