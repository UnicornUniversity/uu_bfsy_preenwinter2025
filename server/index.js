import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import {
  users,
  findUserByEmail,
  sanitizeUser,
  DEFAULT_PASSWORD,
} from "./users.js";

const app = express();

// Config
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Very simple in-memory token blacklist for logout
const blacklistedTokens = new Set();

function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function extractToken(req) {
  const auth = req.headers.authorization || "";
  const parts = auth.split(" ");
  if (parts.length === 2 && parts[0] === "Bearer") return parts[1];
  return null;
}

function authMiddleware(req, res, next) {
  const token = extractToken(req);
  if (!token) return res.status(401).json({ error: "Missing token" });
  if (blacklistedTokens.has(token))
    return res.status(401).json({ error: "Token is revoked" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // contains id, email
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// Health
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Auth routes
app.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const publicUser = sanitizeUser(user);
  const token = createToken({ id: publicUser.id, email: publicUser.email });
  return res.json({ token, user: publicUser });
});

app.post("/logout", (req, res) => {
  const token = extractToken(req);
  if (token) {
    blacklistedTokens.add(token);
  }
  return res.json({ success: true });
});

// Auth check
app.get("/auth/check", authMiddleware, (req, res) => {
  res.json({ authenticated: true, user: req.user });
});

// Example protected API route
app.get("/api/profile", authMiddleware, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  return res.json({ user: sanitizeUser(user) });
});

// List all users with their mock plain password for simulation
app.get("/api/users", (_req, res) => {
  const list = users.map((u) => ({
    id: u.id,
    email: u.email,
    password: DEFAULT_PASSWORD,
  }));
  return res.json({ users: list });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API server listening on http://localhost:${PORT}`);
});
