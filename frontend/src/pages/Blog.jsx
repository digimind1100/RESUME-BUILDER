import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import "./Blog.css";

export default function Blog() {
  const location = useLocation();
  const blogBasePath =
    location.pathname === "/ai-resume-builder/blog" ||
    location.pathname.startsWith("/ai-resume-builder/blog/")
      ? "/ai-resume-builder/blog"
      : location.pathname === "/cv-maker/blog" || location.pathname.startsWith("/cv-maker/blog/")
      ? "/cv-maker/blog"
      : "/blog";
  const blogLink = (slug) => `${blogBasePath}/${slug}`;

  return (
    <>
      <section className="blog-page">
  <div className="blog-container">
    <h1>Resume & CV Writing Tips for Pakistan</h1>

    <div className="blog-grid">

      {/* Blog 1 */}
      <article className="blog-card">
        <h2>Best CV Format for Freshers</h2>
        <p>
          Learn the best CV format for fresh graduates with section order,
          examples, ATS tips, common mistakes, and related resume writing guides.
        </p>
        <Link
          to={blogLink("best-cv-format-for-freshers-in-pakistan-2026")}
          className="blog-read-btn"
        >
          Read Full Guide
        </Link>
      </article>

      {/* Blog 2 */}
      <article className="blog-card">
        <h2>How to Make an ATS Friendly Resume</h2>
        <p>
          Learn how ATS systems read resumes and how to use clean formatting,
          keywords, section headings, and achievement bullets correctly.
        </p>
        <Link
          to={blogLink("how-to-make-ats-friendly-resume-in-pakistan-2026")}
          className="blog-read-btn"
        >
          Read Full Guide
        </Link>
      </article>

      {/* Blog 3 */}
<article className="blog-card">
  <h2>How to Write a Professional Cover Letter in Pakistan (2026)</h2>
  <p>
    Learn how to write a strong and professional cover letter tailored
    for the Pakistani job market. Includes structure, examples, and
    common mistakes to avoid.
  </p>

  <Link
    to={blogLink("how-to-write-professional-cover-letter-in-pakistan-2026")}
    className="blog-read-btn"
  >
    Read Full Guide
  </Link>
</article>


{/* Blog 4 */}
<article className="blog-card">
  <h2>Top Resume Mistakes to Avoid in Pakistan (2026)</h2>
  <p>
    Discover the most common resume mistakes job seekers make in Pakistan
    and learn how to avoid them to improve your chances of getting shortlisted.
  </p>

  <Link
    to={blogLink("top-resume-mistakes-to-avoid-in-pakistan-2026")}
    className="blog-read-btn"
  >
    Read Full Guide
  </Link>
</article>

{/* Blog 5 */}
<article className="blog-card">
  <h2>Best Resume Skills for Jobs in Pakistan (2026)</h2>
  <p>
    Discover the most in-demand hard and soft skills for resumes in Pakistan.
    Learn how to add skills correctly and improve your chances of getting shortlisted.
  </p>

  <Link
    to={blogLink("best-resume-skills-for-jobs-in-pakistan-2026")}
    className="blog-read-btn"
  >
    Read Full Guide
  </Link>
</article>

{/* Blog 6 */}
<article className="blog-card">
  <h2>Resume vs CV – What’s the Difference in Pakistan? (2026)</h2>
  <p>
    Understand the key differences between a resume and CV in Pakistan.
    Learn which format to use for local and international job applications.
  </p>

  <Link
    to={blogLink("resume-vs-cv-difference-in-pakistan-2026")}
    className="blog-read-btn"
  >
    Read Full Guide
  </Link>
</article>
{/* Blog 7 */}
<article className="blog-card">
  <h2>Software Engineer Resume Example (2026)</h2>

  <p>
    Learn how to create a professional Software Engineer resume with
    ATS-friendly formatting, key skills, examples, and resume writing tips.
  </p>

  <Link
    to={blogLink("software-engineer-resume-example-2026")}
    className="blog-read-btn"
  >
    Read Full Guide
  </Link>
</article>

{/* Blog 8 */}
<article className="blog-card">
  <h2>Accountant Resume Example (2026)</h2>
  <p>
    Learn how to create a professional Accountant resume with key skills,
    experience examples, ATS tips, and resume writing guidance.
  </p>
  <Link to={blogLink("accountant-resume-example-2026")} className="blog-read-btn" >
    Read Full Guide
  </Link>
</article>

{/* Blog 9 */}
<article className="blog-card">
  <h2>Teacher Resume Example (2026)</h2>
  <p>
    Build a strong Teacher resume with classroom skills, teaching experience,
    subject expertise, ATS guidance, and practical examples.
  </p>
  <Link
    to={blogLink("teacher-resume-example-2026")}
    className="blog-read-btn"
  >
    Read Full Guide
  </Link>
</article>

{/* Blog 10 */}
<article className="blog-card">
  <h2>Sales Executive Resume Example (2026)</h2>
  <p>
    Learn how to write a results-focused Sales Executive resume with sales
    achievements, CRM skills, target examples, and ATS tips.
  </p>
  <Link
    to={blogLink("sales-executive-resume-example-2026")}
    className="blog-read-btn"
  >
    Read Full Guide
  </Link>
</article>

{/* Blog 11 */}
<article className="blog-card">
  <h2>Graphic Designer Resume Example (2026)</h2>
  <p>
    Create a professional Graphic Designer resume with portfolio guidance,
    design skills, project examples, ATS tips, and common mistakes.
  </p>
  <Link
    to={blogLink("graphic-designer-resume-example-2026")}
    className="blog-read-btn"
  >
    Read Full Guide
  </Link>
</article>

{/* Blog 12 */}
<article className="blog-card">
  <h2>Customer Service Representative Resume Example (2026)</h2>
  <p>
    Write a customer service resume that highlights call handling, complaint
    resolution, CRM tools, communication skills, and service results.
  </p>
  <Link
    to={blogLink("customer-service-representative-resume-example-2026")}
    className="blog-read-btn"
  >
    Read Full Guide
  </Link>
</article>

{/* Blog 13 */}
<article className="blog-card">
  <h2>HR Manager Resume Example (2026)</h2>
  <p>
    Learn how to present HR leadership, recruitment, employee relations,
    payroll coordination, policy work, and HR achievements.
  </p>
  <Link
    to={blogLink("hr-manager-resume-example-2026")}
    className="blog-read-btn"
  >
    Read Full Guide
  </Link>
</article>

{/* Blog 14 */}
<article className="blog-card">
  <h2>Textile Merchandiser Resume Example (2026)</h2>
  <p>
    Build a textile merchandising resume with buyer communication, costing,
    sampling, production follow-up, shipment tracking, and ATS keywords.
  </p>
  <Link
    to={blogLink("textile-merchandiser-resume-example-2026")}
    className="blog-read-btn"
  >
    Read Full Guide
  </Link>
</article>

{/* Blog 15 */}
<article className="blog-card">
  <h2>Production Manager Resume Example (2026)</h2>
  <p>
    Create a Production Manager resume with operations achievements, team
    supervision, quality control, efficiency metrics, and manufacturing skills.
  </p>
  <Link
    to={blogLink("production-manager-resume-example-2026")}
    className="blog-read-btn"
  >
    Read Full Guide
  </Link>
</article>

{/* Blog 16 */}
<article className="blog-card">
  <h2>Data Entry Operator Resume Example (2026)</h2>
  <p>
    Learn how to write a Data Entry Operator resume with typing speed,
    accuracy, Excel skills, record handling, ATS tips, and examples.
  </p>
  <Link
    to={blogLink("data-entry-operator-resume-example-2026")}
    className="blog-read-btn"
  >
    Read Full Guide
  </Link>
</article>

{/* Blog 17 */}
<article className="blog-card">
  <h2>Bank Job CV Format in Pakistan (2026)</h2>
  <p>
    Learn the best CV format for bank jobs in Pakistan with banking skills,
    customer service examples, compliance keywords, and template tips.
  </p>
  <Link
    to={blogLink("bank-job-cv-format-in-pakistan-2026")}
    className="blog-read-btn"
  >
    Read Full Guide
  </Link>
</article>

{/* Blog 18 */}
<article className="blog-card">
  <h2>How to Write Work Experience on a Resume</h2>
  <p>
    Learn how to write strong work experience bullets with action verbs,
    achievements, examples, formatting tips, and ATS-friendly wording.
  </p>
  <Link
    to={blogLink("how-to-write-work-experience-on-a-resume")}
    className="blog-read-btn"
  >
    Read Full Guide
  </Link>
</article>

{/* Blog 19 */}
<article className="blog-card">
  <h2>Best Skills for a Resume in 2026</h2>
  <p>
    Discover the best hard and soft skills to add to your resume in 2026,
    with examples, keyword tips, and common mistakes to avoid.
  </p>
  <Link
    to={blogLink("best-skills-for-a-resume-2026")}
    className="blog-read-btn"
  >
    Read Full Guide
  </Link>
</article>

{/* Blog 20 */}
<article className="blog-card">
  <h2>How to Write a Professional Summary</h2>
  <p>
    Write a clear resume summary that introduces your experience, skills,
    achievements, and target role in a recruiter-friendly way.
  </p>
  <Link
    to={blogLink("how-to-write-a-professional-summary")}
    className="blog-read-btn"
  >
    Read Full Guide
  </Link>
</article>

{/* Blog 21 */}
<article className="blog-card">
  <h2>ATS Resume Guide</h2>
  <p>
    Learn how ATS software reads resumes and how to create a clean,
    keyword-focused, ATS-friendly resume for job applications.
  </p>
  <Link
    to={blogLink("ats-resume-guide")}
    className="blog-read-btn"
  >
    Read Full Guide
  </Link>
</article>

{/* Blog 22 */}
<article className="blog-card">
  <h2>Resume Mistakes to Avoid</h2>
  <p>
    Avoid common resume mistakes that reduce shortlisting chances, including
    weak summaries, poor formatting, missing keywords, and vague bullets.
  </p>
  <Link
    to={blogLink("resume-mistakes-to-avoid")}
    className="blog-read-btn"
  >
    Read Full Guide
  </Link>
</article>

{/* Blog 23 */}
<article className="blog-card">
  <h2>How to Write Achievements on a Resume</h2>
  <p>
    Learn how to turn duties into measurable resume achievements using
    action verbs, results, examples, and practical writing formulas.
  </p>
  <Link
    to={blogLink("how-to-write-achievements-on-a-resume")}
    className="blog-read-btn"
  >
    Read Full Guide
  </Link>
</article>

{/* Blog 24 */}
<article className="blog-card">
  <h2>One Page vs Two Page Resume</h2>
  <p>
    Understand when to use a one-page resume, when two pages are acceptable,
    and how to choose the right length for your experience.
  </p>
  <Link
    to={blogLink("one-page-vs-two-page-resume")}
    className="blog-read-btn"
  >
    Read Full Guide
  </Link>
</article>

{/* Blog 25 */}
<article className="blog-card">
  <h2>Resume Checklist Before Applying</h2>
  <p>
    Use this practical checklist to review your resume before applying,
    including contact details, keywords, formatting, file name, and errors.
  </p>
  <Link
    to={blogLink("resume-checklist-before-applying")}
    className="blog-read-btn"
  >
    Read Full Guide
  </Link>
</article>

{/* Blog 26 */}
<article className="blog-card">
  <h2>How to Write a Cover Letter</h2>
  <p>
    Learn how to write a professional cover letter with the right structure,
    examples, tone, closing, and mistakes to avoid.
  </p>
  <Link
    to={blogLink("how-to-write-a-cover-letter")}
    className="blog-read-btn"
  >
    Read Full Guide
  </Link>
</article>

{/* Blog 27 */}
<article className="blog-card">
  <h2>ATS Keywords for Resumes</h2>
  <p>
    Learn how to find and use ATS keywords naturally in your resume summary,
    skills, work experience, projects, and certifications.
  </p>
  <Link
    to={blogLink("ats-keywords-for-resumes")}
    className="blog-read-btn"
  >
    Read Full Guide
  </Link>
</article>

    </div>
  </div>
</section>

      <Footer />
    </>
  );
}

