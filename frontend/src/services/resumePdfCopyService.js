import API from "../api/authApi";

const PDF_COPY_CONSENT_KEY = "resumePdfCopyConsent";

function hasPdfCopyConsent() {
  const savedConsent = localStorage.getItem(PDF_COPY_CONSENT_KEY);

  if (savedConsent === "accepted") return true;
  if (savedConsent === "declined") return false;

  const accepted = window.confirm(
    "With your permission, Resume Builder can securely save a copy of your downloaded PDF. This helps us improve templates, fix formatting issues, and prepare future services that may suggest better job opportunities based on your skills and experience. We will not share your PDF with employers without your permission. Do you agree?"
  );

  localStorage.setItem(PDF_COPY_CONSENT_KEY, accepted ? "accepted" : "declined");

  return accepted;
}

function getPdfBlob(pdf) {
  if (!pdf) return null;

  if (typeof pdf.output === "function") {
    return pdf.output("blob");
  }

  return null;
}

export async function uploadResumePdfCopy({
  pdf,
  pdfBlob,
  fileName = "resume.pdf",
  templateId = "resume-builder",
  downloadType = "resume",
} = {}) {
  const token = localStorage.getItem("token");

  if (!token || !hasPdfCopyConsent()) return false;

  const blob = pdfBlob || getPdfBlob(pdf);

  if (!blob) return false;

  const formData = new FormData();
  formData.append("pdf", blob, fileName);
  formData.append("fileName", fileName);
  formData.append("templateId", templateId);
  formData.append("downloadType", downloadType);
  formData.append("consent", "true");
  formData.append(
    "consentPurpose",
    "service_improvement_and_future_job_opportunity_support"
  );

  try {
    await API.post("/resume/download-copy", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return true;
  } catch (error) {
    console.warn(
      "Resume PDF copy upload skipped:",
      error.response?.data || error.message
    );

    return false;
  }
}

export async function savePdfAndUploadCopy({
  pdf,
  fileName = "resume.pdf",
  templateId = "resume-builder",
  downloadType = "resume",
} = {}) {
  await uploadResumePdfCopy({
    pdf,
    fileName,
    templateId,
    downloadType,
  });

  pdf.save(fileName);
}
