import express from "express";
import {
  createTask,
  getTasksByLead,
  updateTaskStatus,
} from "../controllers/taskController.js";

const router = express.Router();

// Create task
router.post("/", createTask);

// Get tasks for a lead
router.get("/:leadId", getTasksByLead);

// Update task
router.put("/:id", updateTaskStatus);

export default router;