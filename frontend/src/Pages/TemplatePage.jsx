import { useParams } from "react-router-dom";
import TemplateLayout from "../Template/TemplateLayout";

export default function TemplatePage() {

  const { id } = useParams();

  // 🔥 map URL → template names
const templateMap = {
  "aviation-pro": "AviationPro",
  "teacher-elite": "TeacherElite",
  "clean-professional": "CleanProfessional",
  "creative-bold": "CreativeBold",
  "minimal-accent": "MinimalAccent",
  "elegant-classic": "ElegantClassic",
  "medical-elites": "MedicalElites",
  "engineer-elites": "EngineerElites",
  "soft-tech": "SoftTech",
  "data-elite": "DataElite",
  "engineer-prime": "EngineerPrime",
  "free-basic": "FreeBasic",
  "royal-designer": "RoyalBlueDesigner",
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