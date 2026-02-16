import express from "express";
import { createAnalysisJob } from "../controllers/analysis.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/analyze", authenticate, createAnalysisJob);

export default router;
