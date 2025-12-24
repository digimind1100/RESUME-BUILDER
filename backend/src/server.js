import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";


dotenv.config();

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json()); // 🔴 VERY IMPORTANT

/* ---------- ROUTES ---------- */
app.use("/api/auth", authRoutes);        // ✅ THIS FIXES 404
app.use("/api/payments", paymentRoutes); // (later use)

/* ---------- TEST ROUTE ---------- */
app.get("/", (req, res) => {
  res.send("API running");
});

/* ---------- DB ---------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

console.log("JWT_SECRET:", process.env.JWT_SECRET);


