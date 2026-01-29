export default function DownloadPDF() {
  const handleDownload = () => {
    window.print();
  };

  return (
    <button onClick={handleDownload} className="download-btn">
      Download PDF
    </button>
  );
}
