import React from "react";

export default function PaginationEngine({
  header,
  sidebar,
  page1,
  page2,
}) {
  return (
    <div className="neo-pages-wrapper">

      {/* PAGE 1 */}
      <div className="resume-a4 neo-a4">
        <div className="neo-resume">

          {header}

          <div className="neo-body">
            {sidebar}

            <main className="neo-main">
              {page1}
            </main>
          </div>

        </div>
      </div>

      {/* PAGE 2 */}
      {page2 && (
        <div className="resume-a4 neo-a4">
          <div className="neo-resume">

            <div className="neo-body full-width">
              <main className="neo-main">
                {page2}
              </main>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}