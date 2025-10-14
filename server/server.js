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
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // make sure your key is in .env
});

// ✅ Unified suggestion route
app.post("/api/suggest", async (req, res) => {
  try {
    const { jobTitle, type } = req.body;
    console.log(`✅ Received jobTitle: "${jobTitle}", type: "${type}"`);

    if (!type || !jobTitle) {
      return res.status(400).json({ error: "type and jobTitle required" });
    }

    // Prompt
    let prompt;
    if (type === "skills") {
      prompt = `List 10 important professional skills for a ${jobTitle}. Respond only with a plain list.`;
    } else if (type === "work") {
      prompt = `List 10 relevant work experience bullet points for a ${jobTitle}. Respond only with a plain list.`;
    } else {
      return res.status(400).json({ error: 'Invalid type. Must be "skills" or "work"' });
    }

    // ✅ OpenAI API call
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.choices[0]?.message?.content || "";
    console.log("📌 Raw AI Response:", text);

    // ✅ Clean array
    const items = text
      .split("\n")
      .map((line) => line.replace(/^\d+[\).\s-]*/, "").trim())
      .filter((line) => line.length > 0);

    console.log("📌 Parsed Items:", items);

    if (type === "skills") {
      return res.json({ skills: items });
    } else {
      return res.json({ work: items });
    }
  } catch (error) {
    console.error("❌ API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});


// ✅ Example server start
app.listen(3001, () => {
  console.log("🚀 Server running on http://localhost:3001");
});
