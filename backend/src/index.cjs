require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// DB connection
connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

// test route (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("Backend is running on Vercel");
});
app.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});


// ❌ REMOVE app.listen()
// ❌ DO NOT start server manually

module.exports = app;
