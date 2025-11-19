import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Initialize OpenAI client
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ===== Unified Suggestion Route =====
app.post("/api/suggest", async (req, res) => {
  try {
    const { jobTitle, type } = req.body;

    if (!type || !jobTitle) {
      return res.status(400).json({ error: "type and jobTitle required" });
    }

    let prompt;
    if (type === "skills") {
      prompt = `List 10 important professional skills for a ${jobTitle}. Respond only with a plain list.`;
    } else if (type === "work") {
      prompt = `List 10 relevant work experience bullet points for a ${jobTitle}. Respond only with a plain list.`;
    } else {
      return res.status(400).json({ error: 'Invalid type. Must be "skills" or "work"' });
    }

    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.choices[0]?.message?.content || "";

    const items = text
      .split("\n")
      .map((line) => line.replace(/^\d+[\).\s-]*/, "").trim())
      .filter((line) => line.length > 0);

    res.json({ items });
  } catch (error) {
    console.error("❌ API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});

// ===== Cover Letter Route =====
app.post("/api/cover-letter", async (req, res) => {
  try {
    const {
      companyName,
      jobTitle,
      attentionName,
      yourName,
      selfIntro,
      skillsInput,
      experienceInput,
      startGreeting,
      endGreeting,
    } = req.body;

    if (!companyName || !jobTitle || !yourName) {
      return res.status(400).json({ error: "Company Name, Job Title, and Your Name are required" });
    }

    // Explicit multi-paragraph prompt
    const prompt = `
You are an expert professional resume and cover letter writer.

Write a **full professional cover letter** for the following details:

Company Name: ${companyName}
Job Title: ${jobTitle}
Attention Name: ${attentionName || 'Hiring Manager'}
Applicant Name: ${yourName}
Self Introduction: ${selfIntro}
Skills: ${skillsInput}
Experience: ${experienceInput}

**Requirements:**
- Start with "${startGreeting}".
- Include an introduction paragraph, at least two body paragraphs describing skills, experience, and achievements, and a closing paragraph.
- End with "${endGreeting}" followed by the applicant's name.
- Make it suitable for an A4 page when printed.
- Use proper paragraph breaks, professional tone, and formal language.
- Return the cover letter as plain text preserving line breaks.
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1200, // allow multi-paragraph output
    });

    const coverLetter = completion.choices[0]?.message?.content || "";

    res.json({ coverLetter });

  } catch (error) {
    console.error("❌ Cover Letter API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate cover letter" });
  }
});

// ===== Start Server =====
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
