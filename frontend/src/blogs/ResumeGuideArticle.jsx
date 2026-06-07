import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function ResumeGuideArticle({ article }) {
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

        <h2>{article.exampleHeading}</h2>
        <div className="resume-example-box">
          <h3>{article.sample.name}</h3>
          <p>
            <strong>{article.sample.role}</strong>
          </p>
          <p>
            Email: {article.sample.email} <br />
            Phone: {article.sample.phone} <br />
            Location: {article.sample.location}
          </p>
          <h3>Professional Summary</h3>
          <p>{article.sample.summary}</p>
          <h3>Experience Highlights</h3>
          <ul>
            {article.sample.experience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>Education</h3>
          <p>{article.sample.education}</p>
        </div>

        <h2>Key Skills to Add</h2>
        <p>
          A strong skills section helps recruiters and ATS software understand your fit quickly. Choose
          skills that match the job description and that you can confidently discuss in an interview.
        </p>
        <ul>
          {article.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>

        <h2>How to Write This Resume</h2>
        {article.howTo.map((section) => (
          <React.Fragment key={section.heading}>
            <h3>{section.heading}</h3>
            <p>{section.text}</p>
          </React.Fragment>
        ))}

        <h2>ATS Tips for Better Shortlisting</h2>
        <p>
          Many employers in Pakistan and abroad now use applicant tracking systems before a recruiter
          opens the resume. Keep the format clean, use standard headings, and include the same important
          words that appear in the job post.
        </p>
        <ul>
          {article.atsTips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
        <p>
          If you want a clean starting point, explore our{" "}
          <Link to="/templates">professional resume templates</Link>. Fresh graduates can also review
          the{" "}
          <Link to="/blog/best-cv-format-for-freshers-in-pakistan-2026">
            Best CV Format for Freshers
          </Link>{" "}
          before applying for entry-level roles.
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

        <h2>Create Your Resume Online</h2>
        <p>{article.finalParagraph}</p>
        <p>
          For technical roles, you may also find useful ideas in our{" "}
          <Link to="/blog/software-engineer-resume-example-2026">
            Software Engineer Resume Example
          </Link>
          . For all roles, the right structure, honest achievements, and a clear layout can help you
          apply with more confidence.
        </p>
        <Link to="/templates" className="blog-cta-btn">
          Create Your Resume Now
        </Link>
      </main>
    </>
  );
}
