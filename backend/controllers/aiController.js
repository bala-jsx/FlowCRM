import { generateInsights } from "../services/aiService.js";
import Lead from "../models/Lead.js";
import Task from "../models/Task.js";

export const getAIInsights = async (req, res) => {
  try {
    const leads = await Lead.find();
    const tasks = await Task.find();

    const insights = await generateInsights(leads, tasks);

    res.json({ insights });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import { generateMessage } from "../services/aiService.js";

export const getGeneratedMessage = async (req, res) => {
  try {
    const { lead, type } = req.body;

    const message = await generateMessage(lead, type);

    res.json({ message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};