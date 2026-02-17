import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import analysisRoutes from "./routes/analysis.routes.js";
import reportRoutes from "./routes/report.routes.js";
import historyRoutes from "./routes/history.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Error handler
app.use(errorHandler);

export default app;
