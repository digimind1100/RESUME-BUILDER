import { Link } from "react-router-dom";
import Footer from "./Footer";
import "./Blog.css";

export default function Blog() {
  return (
    <>
      <section className="blog-page">
        <div className="blog-container">
          <h1>Resume & CV Writing Tips for Pakistan</h1>

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
        </div>
      </section>

      <Footer />
    </>
  );
}