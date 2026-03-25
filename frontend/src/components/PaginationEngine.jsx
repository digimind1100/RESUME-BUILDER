import React, { useEffect, useRef, useState } from "react";

export default function PaginationEngine({ header, sidebar, content }) {
  const measureRef = useRef();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    setTimeout(() => paginate(), 200);
  }, [content]);

  const paginate = () => {
    const container = measureRef.current;
    if (!container) return;

    const children = Array.from(container.children);

    // 🔥 Create hidden clone (same as your paginateEntries idea)
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.visibility = "hidden";
    tempDiv.style.width = "800px";
    tempDiv.style.left = "-9999px";
    tempDiv.style.top = "-9999px";

    document.body.appendChild(tempDiv);

    const MAX_HEIGHT = 1122; // A4 height

    let currentPage = [];
    let result = [];

    tempDiv.innerHTML = "";

    children.forEach((child, index) => {
      const clone = child.cloneNode(true);
      tempDiv.appendChild(clone);

      const height = tempDiv.getBoundingClientRect().height;

      if (height > MAX_HEIGHT - 80) {
        // remove last added
        tempDiv.removeChild(clone);

        // push current page
        result.push([...currentPage]);

        // reset
        currentPage = [child.outerHTML];
        tempDiv.innerHTML = "";
        tempDiv.appendChild(child.cloneNode(true));
      } else {
        currentPage.push(child.outerHTML);
      }
    });

    if (currentPage.length) {
      result.push(currentPage);
    }

    document.body.removeChild(tempDiv);

    setPages(result);
  };

  return (
    <div className="neo-pages-wrapper">

      {/* hidden measure container */}
      <div
        ref={measureRef}
        style={{ position: "absolute", visibility: "hidden", width: "800px" }}
      >
        {content}
      </div>

      {pages.map((page, index) => (
        <div key={index} className="resume-a4 neo-a4">

          <div className="neo-resume">

            {index === 0 && header}

            <div className={`neo-body ${index > 0 ? "full-width" : ""}`}>

              {index === 0 && sidebar}

              <main className="neo-main">
                {page.map((item, i) => (
                  <div key={i} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </main>

            </div>

          </div>

        </div>
      ))}

    </div>
  );
}