import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

export const generateResumePDF = async (resumeUrl, resumeId) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });

  const page = await browser.newPage();

  await page.goto(resumeUrl, { waitUntil: "networkidle0" });

  // ✅ IMPORTANT: respect @media print
  await page.emulateMediaType("print");

  // ✅ CLONE resume container like DownloadPDF.jsx
  await page.evaluate(() => {
    const source =
      document.getElementById("resumeContainer") ||
      document.getElementById("coverLetterContainer");

    if (!source) {
      throw new Error("Resume container not found");
    }

    // Clone ONLY the resume
    const clone = source.cloneNode(true);

    // Remove unwanted UI inside clone
    clone
      .querySelectorAll(
        "input, button, .theme-selector, .button-section"
      )
      .forEach((el) => el.remove());

    // Fix QR canvas → image
    const canvas = clone.querySelector("canvas");
    if (canvas) {
      const img = document.createElement("img");
      img.src = canvas.toDataURL("image/png");
      img.style.width = "190px";
      img.style.height = "190px";
      canvas.replaceWith(img);
    }

    // Clean body and inject clone
    document.body.innerHTML = "";
    document.body.appendChild(clone);
    document.body.style.margin = "0";
  });

  const outputDir = path.join(process.cwd(), "public", "resumes");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const pdfPath = path.join(outputDir, `${resumeId}.pdf`);

  // ✅ TRUE A4 — same as html2pdf
  await page.pdf({
    path: pdfPath,
    format: "A4",
    margin: {
      top: "10mm",
      bottom: "10mm",
      left: "8mm",
      right: "8mm",
    },
    printBackground: true,
  });

  await browser.close();
  return pdfPath;
};
