import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config({ path: "./server/.env" });

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://mern-notes-app-three.vercel.app/', // Replace with your frontend URL
  // 'https://your-frontend-domain.netlify.app' // If using Netlify
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ===== TEST LOG =====
console.log("Backend booting...");
console.log("Environment:", process.env.NODE_ENV || "development");

// ===== ROUTES =====
import authRouter from "./routes/auth.js";
import notesRouter from "./routes/notes.js";

app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

app.get("/", (req, res) => {
  res.send("Notes App API is running");
});

// ===== DB CONNECTION & SERVER START =====
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in .env file");
  process.exit(1);
}

const start = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
};

start();
