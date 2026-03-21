import { useParams } from "react-router-dom";
import TemplateLayout from "../template/TemplateLayout";

export default function TemplatePage() {

  const { id } = useParams();

  // 🔥 map URL → template names
  const templateMap = {
    "aviation-pro": "AviationPro",
    "teacher-elite": "TeacherElite",
    "clean-professional": "CleanProfessional",
  };

  const templateId = templateMap[id];

  const resumeData = {}; // later we connect real data

  if (!templateId) {
    return <div>Template not found</div>;
  }

  return (
    <TemplateLayout
      templateId={templateId}
      resumeData={resumeData}
    />
  );
}