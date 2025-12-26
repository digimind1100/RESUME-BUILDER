// src/controllers/openaiController.js
import OpenAI from "openai";

export const generateSuggestions = async (req, res) => {
  try {
    // ✅ SAFETY CHECK (optional but recommended)
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "OpenAI API key not configured on server",
      });
    }

    // ✅ OpenAI client INSIDE function
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { jobTitle, type } = req.body;

    if (!jobTitle || !type) {
      return res.status(400).json({
        success: false,
        message: "jobTitle and type required",
      });
    }

    let prompt = "";

    if (type === "skills") {
      prompt = `Give 8 professional resume skills for a ${jobTitle}`;
    } else if (type === "experience") {
      prompt = `Give 5 resume work experience bullet points for a ${jobTitle}`;
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid type. Use 'skills' or 'experience'",
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text = completion.choices[0].message.content;

    const items = text
      .split("\n")
      .map((i) => i.replace(/^[-•\d.]+/, "").trim())
      .filter(Boolean);

    res.json({
      success: true,
      items,
    });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({
      success: false,
      message: "AI generation failed",
    });
  }
};
