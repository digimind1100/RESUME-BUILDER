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

export const PREMIUM_TEMPLATE_COUNT = 2;
export const TEMPLATES_AVAILABLE_COUNT =
  PREMIUM_TEMPLATE_COUNT + SIMPLE_TEMPLATES.length;
