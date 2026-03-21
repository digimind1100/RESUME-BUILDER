import { useParams } from "react-router-dom";
import TemplateLayout from "../Template/TemplateLayout";

export default function TemplatePage({ formData }) {

  const { id } = useParams();
const resumeData = JSON.parse(localStorage.getItem("resumeData")) || {};
  const templateMap = {
    "aviation-pro": "AviationPro",
  };

  const templateId = templateMap[id];

  if (!templateId) {
    return <div>Template not found</div>;
  }

  return (
    <TemplateLayout
      templateId={templateId}
      resumeData={formData}   // 🔥 IMPORTANT
    />
  );
}