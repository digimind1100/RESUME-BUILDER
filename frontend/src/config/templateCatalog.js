export const HIDDEN_PRODUCTION_TEMPLATES = new Set([12, 13, 14]);

export const SIMPLE_TEMPLATES = Array.from({ length: 15 }, (_, i) => i + 1).filter(
  (templateId) => !HIDDEN_PRODUCTION_TEMPLATES.has(templateId)
);

export const TEMPLATE_META = {
  1: { name: "Teacher Elite", category: "All Roles" },
  2: { name: "Clean Professional", category: "Corporate" },
  3: { name: "Creative Bold", category: "Creative" },
  4: { name: "Minimal Accent", category: "Minimal" },
  5: { name: "Elegant Classic", category: "Timeless" },
  6: { name: "Medical Elites", category: "Healthcare" },
  7: { name: "Engineer Elites", category: "Engineering" },
  8: { name: "Soft-Tech", category: "Tech & IT" },
  9: { name: "Data Analyst", category: "Data" },
  10: { name: "Engineer Prime", category: "Engineering" },
  11: { name: "Aviation Pro", category: "Aviation" },
  12: { name: "Free Basic", category: "Free Template" },
  13: { name: "Royal Designer", category: "Royal Designer" },
  14: { name: "NeoEdge Pro", category: "NeoEdge Pro" },
  15: { name: "Florence Classic", category: "FlorenceClassic" },
};

export const TEMPLATE_ROUTES = {
  1: "/teacher-elite",
  2: "/clean-professional",
  3: "/creative-bold",
  4: "/minimal-accent",
  5: "/elegant-classic",
  6: "/medical-elites",
  7: "/engineer-elites",
  8: "/soft-tech",
  9: "/data-elite",
  10: "/engineer-prime",
  11: "/aviation-pro",
  12: "/free-basic",
  13: "/royal-designer",
  14: "/neoEdge-pro",
  15: "/florence-classic",
};

export const TEMPLATE_IDS = {
  1: "TeacherElite",
  2: "CleanProfessional",
  3: "CreativeBold",
  4: "MinimalAccent",
  5: "ElegantClassic",
  6: "MedicalElite",
  7: "EngineerElite",
  8: "SoftTech",
  9: "DataElite",
  10: "EngineerPrime",
  11: "AviationPro",
  12: "FreeBasic",
  13: "RoyalBlueDesigner",
  14: "NeoEdgePro",
  15: "FlorenceClassic",
};

export const NON_AI_TEMPLATE_GALLERY = SIMPLE_TEMPLATES.map((templateNumber) => ({
  id: TEMPLATE_IDS[templateNumber],
  name: TEMPLATE_META[templateNumber]?.name,
  category: TEMPLATE_META[templateNumber]?.category,
  route: TEMPLATE_ROUTES[templateNumber],
  thumbnail: `/images/simple-${templateNumber}.png`,
}));

export const PREMIUM_TEMPLATE_COUNT = 2;
export const TEMPLATES_AVAILABLE_COUNT =
  PREMIUM_TEMPLATE_COUNT + SIMPLE_TEMPLATES.length;
