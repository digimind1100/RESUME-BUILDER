import { Link } from "react-router-dom";
import Footer from "./Footer";
import "./Blog.css";

export default function Blog() {
  return (
    <>
      <section className="blog-page">
  <div className="blog-container">
    <h1>Resume & CV Writing Tips for Pakistan</h1>

    <div className="blog-grid">

      {/* Blog 1 */}
      <article className="blog-card">
        <h2>Best CV Format for Freshers in Pakistan (2026)</h2>
        <p>
          Discover the ideal CV format for fresh graduates and students in Pakistan.
          Learn how to create an ATS-friendly resume that increases your chances
          of getting shortlisted.
        </p>
        <Link
          to="/blog/best-cv-format-for-freshers-in-pakistan-2026"
          className="blog-read-btn"
        >
          Read Full Guide
        </Link>
      </article>

      {/* Blog 2 */}
      <article className="blog-card">
        <h2>How to Make an ATS Friendly Resume in Pakistan (2026)</h2>
        <p>
          Learn how ATS systems work and how to optimize your resume
          to pass automated screening in Pakistan.
        </p>
        <Link
          to="/blog/how-to-make-ats-friendly-resume-in-pakistan-2026"
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
    to="/blog/how-to-write-professional-cover-letter-in-pakistan-2026"
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
    to="/blog/top-resume-mistakes-to-avoid-in-pakistan-2026"
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