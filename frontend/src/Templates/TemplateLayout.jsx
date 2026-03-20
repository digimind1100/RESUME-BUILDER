const handleDownloadPDF = async () => {

  const root = resumeContainerRef.current;
  if (!root) return;

  // ✅ universal A4 detection
  const element = root.querySelector(".resume-a4") || root;

  await new Promise((r) => setTimeout(r, 200));

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff"
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = 210;
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);

  pdf.save(`${templateId}-resume.pdf`);
};