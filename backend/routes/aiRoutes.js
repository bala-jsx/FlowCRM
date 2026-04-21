import express from "express";
import { getAIInsights, getGeneratedMessage } from "../controllers/aiController.js";

const router = express.Router();

router.get("/insights", getAIInsights);
router.post("/message", getGeneratedMessage);

export default router;