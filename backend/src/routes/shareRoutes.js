import express from "express";
import { sendResumeEmail } from "../utils/sendResumeEmail.js";

const router = express.Router();
router.post("/email", async (req, res) => {
  try {
    const { resumeId, resumeUrl, toEmail } = req.body;

    if (!toEmail) {
      return res.status(400).json({ message: "Recipient email required" });
    }

    await sendResumeEmail({
      resumeId,
      resumeUrl,
      toEmail,
    });

    res.json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Email failed" });
  }
});


export default router;
