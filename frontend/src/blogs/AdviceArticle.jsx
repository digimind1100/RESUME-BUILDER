import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function AdviceArticle({ article }) {
  return (
    <>
      <Helmet>
        <title>{article.metaTitle}</title>
        <meta name="description" content={article.metaDescription} />
      </Helmet>

      <main className="blog-post">
        <h1>{article.title}</h1>

        {article.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <div className="blog-cta-box">
          <h2>Create Your Resume Faster</h2>
          <p>
            Use ResumeBuilder.pk to create a professional ATS-friendly resume with ready-made templates.
          </p>
          <Link to="/templates" className="blog-cta-btn">
            Create Resume Now
          </Link>
        </div>

        <h2>{article.sample.heading}</h2>
        <p>{article.sample.intro}</p>
        <div className="resume-example-box">
          {article.sample.blocks.map((block) => (
            <React.Fragment key={block.heading}>
              <h3>{block.heading}</h3>
              {block.text && <p>{block.text}</p>}
              {block.items && (
                <ul>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </div>

        <h2>{article.skills.heading}</h2>
        <p>{article.skills.intro}</p>
        <ul>
          {article.skills.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2>{article.howToHeading}</h2>
        {article.howTo.map((section) => (
          <React.Fragment key={section.heading}>
            <h3>{section.heading}</h3>
            <p>{section.text}</p>
          </React.Fragment>
        ))}

        <h2>ATS and Formatting Tips</h2>
        <p>
          A strong resume should be easy for both people and software to read. Many companies use
          applicant tracking systems before a recruiter reviews applications, so simple formatting and
          relevant wording matter.
        </p>
        <ul>
          {article.atsTips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
        <p>
          You can start with{" "}
          <Link to="/templates">professional resume templates</Link> and compare your structure with
          our{" "}
          <Link to="/blog/software-engineer-resume-example-2026">
            Software Engineer Resume Example
          </Link>{" "}
          or{" "}
          <Link to="/blog/best-cv-format-for-freshers-in-pakistan-2026">
            Best CV Format for Freshers
          </Link>
          .
        </p>

        <h2>Common Mistakes to Avoid</h2>
        <ul>
          {article.mistakes.map((mistake) => (
            <li key={mistake}>{mistake}</li>
          ))}
        </ul>

        <h2>Frequently Asked Questions</h2>
        {article.faqs.map((faq) => (
          <React.Fragment key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </React.Fragment>
        ))}

        <h2>{article.finalHeading}</h2>
        {article.finalParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <Link to="/templates" className="blog-cta-btn">
          Create Your Resume Now
        </Link>
      </main>
    </>
  );
}
