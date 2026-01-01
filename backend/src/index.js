// backend/src/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");


const app = express();

// middleware
app.use(express.json());

app.use("/api/payments", paymentRoutes);


// CORS - allow Vite dev server at 5173
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "API is running" });
});

// routes
app.use("/api/auth", authRoutes);

// Connect DB and start server only after DB connected
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`);
      console.log(`MongoDB connected: ${process.env.MONGO_URI || "localhost"}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
    process.exit(1);
  });
