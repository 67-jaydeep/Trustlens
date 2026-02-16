import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import analysisRoutes from "./routes/analysis.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", analysisRoutes);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});


// Error handler (must be last)
app.use(errorHandler);

export default app;
