import React, { useEffect, useState, useRef } from "react";

const A4_HEIGHT = 1122; // safe height for splitting

export default function PaginationEngine({ header, sidebar, content }) {
  const contentRef = useRef();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      paginate();
    }, 200);
  }, [content]);

  const paginate = () => {
    const container = contentRef.current;
    if (!container) return;

    const children = Array.from(container.children);

    let currentPage = [];
    let currentHeight = 0;
    let result = [];

    children.forEach((child) => {
      const height = child.offsetHeight;

      if (currentHeight + height > A4_HEIGHT - 120) {
        result.push(currentPage);
        currentPage = [];
        currentHeight = 0;
      }

      currentPage.push(child.outerHTML);
      currentHeight += height;
    });

    if (currentPage.length) {
      result.push(currentPage);
    }

    setPages(result);
  };

  return (
    <div className="neo-pages-wrapper">

      {/* Hidden measurement container */}
      <div
        ref={contentRef}
        style={{ position: "absolute", visibility: "hidden", width: "800px" }}
      >
        {content}
      </div>

      {/* Render Pages */}
      {pages.map((page, index) => (
        <div key={index} className="resume-a4 neo-a4">

          <div className="neo-resume">

            {/* HEADER only on first page */}
            {index === 0 && header}

            <div className="neo-body">

              {/* SIDEBAR only on first page */}
              {index === 0 && sidebar}

              <main
                className="neo-main"
                dangerouslySetInnerHTML={{ __html: page.join("") }}
              />

            </div>

          </div>

        </div>
      ))}

    </div>
  );
}