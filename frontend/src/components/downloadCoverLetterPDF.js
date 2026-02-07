import html2pdf from "html2pdf.js";

export function downloadCoverLetterPDF({
  elementRef,
  fileName = "Cover-Letter.pdf",
}) {
  if (!elementRef?.current) return;

  const opt = {
    margin: [10, 10, 10, 10],
    filename: fileName,
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  html2pdf()
    .set(opt)
    .from(elementRef.current)
    .save();
}
