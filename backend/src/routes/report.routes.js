import express from "express";
import { getAnalysisReport } from "../controllers/report.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/analysis/:jobId", authenticate, getAnalysisReport);

export default router;
