import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { getUserHistory } from "../controllers/history.controller.js";

const router = express.Router();

router.get("/history", authenticate, getUserHistory);

export default router;
