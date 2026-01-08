import html2canvas from "html2canvas";

export const shareResumeAsImage = async (resumeRef) => {
  if (!resumeRef || !resumeRef.current) return null;

  const canvas = await html2canvas(resumeRef.current, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  return canvas.toDataURL("image/png");
};
