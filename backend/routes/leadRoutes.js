import express from "express";
import { createLead, getLeads, getLeadById, updateLead, deleteLead, updateLeadStatus } from "../controllers/leadController.js";
const router = express.Router();

router.post("/", createLead);
router.get("/", getLeads);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);
router.get("/:id", getLeadById);
router.get("/", getLeads);
router.patch("/:id/status", updateLeadStatus);

export default router;