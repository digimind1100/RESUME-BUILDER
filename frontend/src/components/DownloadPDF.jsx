const startDownload = async () => {
  const checkboxes = container.querySelectorAll(
    "input[type='checkbox']"
  );
  checkboxes.forEach((cb) => (cb.style.display = "none"));

  const clone = container.cloneNode(true);

  const header = document.createElement("div");
  header.style.width = "100%";
  header.style.borderBottom = "2px solid #000";
  header.style.marginBottom = "1px";
  header.style.textAlign = "center";
  header.style.fontWeight = "bold";
  header.style.fontSize = "14px";
  clone.prepend(header);

  // 🔥 WAIT FOR IMAGES TO LOAD (QR FIX)
  const images = clone.querySelectorAll("img");
  await Promise.all(
    Array.from(images).map((img) => {
      return new Promise((resolve) => {
        if (img.complete) resolve();
        else {
          img.onload = resolve;
          img.onerror = resolve;
        }
      });
    })
  );

  const opt = {
    margin: [10, 8, 10, 8],
    filename: "resume.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    },
    pagebreak: { mode: ["avoid-all", "css", "legacy"] },
  };

  await html2pdf()
    .set(opt)
    .from(clone)
    .toPdf()
    .get("pdf")
    .then((pdf) => {
      if (pdf.internal.getNumberOfPages() > 1) {
        pdf.deletePage(1);
      }

      const totalPages = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setDrawColor(0);
        pdf.setLineWidth(0.5);
        pdf.line(10, 10, 200, 10);
        pdf.line(10, 287, 200, 287);
        pdf.setFontSize(10);
        pdf.text(`Page ${i} of ${totalPages}`, 182, 291);
      }
    })
    .save();

  checkboxes.forEach((cb) => (cb.style.display = ""));
};
