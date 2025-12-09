// src/middleware/authMiddleware.js
const { verifyToken } = require("../utils/jwt");

function requireAuth(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated.",
    });
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const payload = verifyToken(token); // { id, role, iat, exp }
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access only.",
    });
  }
  next();
}

module.exports = { requireAuth, requireAdmin };
