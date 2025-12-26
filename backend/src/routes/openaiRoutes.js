import express from "express";
import { generateSuggestions } from "../controllers/openaiController.js";
import requireAuth from "../middleware/auth.js";

const router = express.Router();

// 🔐 protected AI endpoint
router.post("/suggest", requireAuth, generateSuggestions);

export default router;
