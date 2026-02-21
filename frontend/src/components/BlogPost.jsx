import { useParams } from "react-router-dom";
import Footer from "./Footer";
import "./Blog.css";

export default function BlogPost() {
  const { slug } = useParams();

  if (slug !== "best-cv-format-for-freshers-in-pakistan-2026") {
    return <div style={{ padding: "80px 20px" }}>Blog not found.</div>;
  }

  return (
    <>
      <article className="blog-article">
        <div className="blog-container">
          <h1>Best CV Format for Freshers in Pakistan (2026)</h1>

          <p>
            Writing your first CV can feel overwhelming, especially if you are
            a fresh graduate or student in Pakistan. Many job seekers struggle
            because they do not know which CV format recruiters prefer or how
            to structure their resume properly.
          </p>

          {/* We will insert full SEO article here next */}

        </div>
      </article>

      <Footer />
    </>
  );
}