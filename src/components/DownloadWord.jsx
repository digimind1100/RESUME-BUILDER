import React from "react";
import { saveAs } from "file-saver";
import htmlDocx from "html-docx-js-typescript";

const DownloadWord = () => {
  const handleDownload = () => {
    const resumeContainer = document.getElementById("resumeContainer");
    if (!resumeContainer) return;

    const html = `
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial, sans-serif; }
          </style>
        </head>
        <body>${resumeContainer.outerHTML}</body>
      </html>
    `;

    const blob = htmlDocx.asBlob(html);
    saveAs(blob, "My_Resume.docx");
  };

  return (
    <button className="common-btn" onClick={handleDownload}>
      Download Word Doc
    </button>
  );
};

export default DownloadWord;
