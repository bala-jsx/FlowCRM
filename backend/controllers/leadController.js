import Lead from "../models/Lead.js";
import { calculateScore, getPriority } from "../utils/scoring.js";

// Create Lead
export const createLead = async (req, res) => {
  try {
    const data = req.body;

    const score = calculateScore(data);
    const priority = getPriority(score);

    const lead = await Lead.create({
      ...data,
      score,
      priority,
      activities: [
        {
          type: "lead_created",
          message: "Lead created",
        },
      ],
    });

    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Leads
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Lead
export const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const score = calculateScore(data);
    const priority = getPriority(score);

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      {
        ...data,
        score,
        priority,
        $push: {
          activities: {
            type: "lead_updated",
            message: "Lead updated",
          },
        },
      },
      { new: true }
    );

    res.json(updatedLead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Lead
export const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    await Lead.findByIdAndDelete(id);

    res.json({ message: "Lead deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLeadById = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const lead = await Lead.findById(id);

    const oldStatus = lead.status;

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      {
        status,
        $push: {
          activities: {
            type: "status_changed",
            message: `Status changed: ${oldStatus} → ${status}`,
          },
        },
      },
      { new: true }
    );

    res.json(updatedLead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};