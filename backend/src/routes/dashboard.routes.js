import express from "express";
import { getDashboardSummary } from "../controllers/dashboard.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/summary", authenticate, getDashboardSummary);

export default router;
