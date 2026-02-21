import { useState } from "react";
import "./HomeFAQ.css";

const faqs = [
  {
    question: "Is ResumeBuilder.pk really free to use?",
    answer:
      "Yes, ResumeBuilder.pk offers a free AI resume builder for users in Pakistan. You can create, edit, and preview professional resumes easily.",
  },
  {
    question: "Is this resume builder ATS-friendly?",
    answer:
      "Yes. Our AI resume builder creates ATS-friendly resumes that follow modern hiring standards used by companies in Pakistan and internationally.",
  },
  {
    question: "Can students and fresh graduates use this CV maker?",
    answer:
      "Absolutely. ResumeBuilder.pk is perfect for students, fresh graduates, and professionals who want to create a professional CV quickly.",
  },
  {
    question: "Does this AI resume builder work for government jobs in Pakistan?",
    answer:
      "Yes. Our templates follow structured formatting that is suitable for private, corporate, and government job applications in Pakistan.",
  },
  {
    question: "How long does it take to create a resume?",
    answer:
      "With our AI-powered system, you can create a professional resume in just a few minutes by entering your information and selecting a template.",
  },
];

export default function HomeFAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2>
          Frequently Asked <span>Questions</span>
        </h2>

        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              {faq.question}
              <span className="faq-icon">
                {activeIndex === index ? "-" : "+"}
              </span>
            </div>

            {activeIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}