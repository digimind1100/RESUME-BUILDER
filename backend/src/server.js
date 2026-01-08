import dotenv from "dotenv";
dotenv.config(); // 🔴 MUST be on top

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import "./cron/expiryCron.js";
import adminPromoRoutes from "./routes/adminPromoRoutes.js";
import promoRoutes from "./routes/promoRoutes.js";
import payfastRoutes from "./routes/payfastRoutes.js";
import webhookRoutes from "./routes/payfastWebhook.js";
import shareRoutes from "./routes/shareRoutes.js";
import path from "path";


const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());
app.use("/api/admin", adminPromoRoutes);
/* ---------- ROUTES ---------- */
app.use("/api/auth", authRoutes);
app.use("/api/promo", promoRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/payfast", payfastRoutes);
app.use("/api/payfast", webhookRoutes);
app.use("/api/share", shareRoutes);
app.use("/resumes", express.static(path.join(process.cwd(), "public/resumes")));

/* ---------- TEST ROUTE ---------- */
app.get("/", (req, res) => {
  res.send("Backend API running");
});

/* ---------- DB ---------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

/* ---------- DEBUG ---------- */
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "FOUND" : "MISSING");
