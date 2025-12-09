// src/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// connect DB
connectDB();

// middleware
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

// health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "API is running" });
});

// routes
app.use("/api/auth", authRoutes);

// global error handler (optional, can add later)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
