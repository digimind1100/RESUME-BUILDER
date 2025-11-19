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

// ✅ Initialize OpenAI client
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

    if (type === "skills") return res.json({ skills: items });
    return res.json({ work: items });
  } catch (error) {
    console.error("❌ API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});

// ===== Cover Letter Route =====
app.post("/api/cover-letter", async (req, res) => {
  const { companyName, jobTitle, attentionName, yourName } = req.body;

  if (!companyName || !jobTitle || !yourName) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Example simple cover letter
    const coverLetter = `Dear ${attentionName || "Hiring Manager"} at ${companyName},

I am excited to apply for the ${jobTitle} position.

Sincerely,
${yourName}`;

    res.json({ coverLetter });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate cover letter" });
  }
});



// ===== Start Server =====
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
