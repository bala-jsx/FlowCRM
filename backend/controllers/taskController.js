import Task from "../models/Task.js";
import Lead from "../models/Lead.js";

// 🟢 CREATE TASK
export const createTask = async (req, res) => {
  try {
    const { leadId, title, description, dueDate } = req.body;

    // Create task
    const task = await Task.create({
      leadId,
      title,
      description,
      dueDate,
    });

    // Add activity to lead
    await Lead.findByIdAndUpdate(leadId, {
      $push: {
        activities: {
          type: "task_created",
          message: `Task added: ${title}`,
        },
      },
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟡 GET TASKS BY LEAD
export const getTasksByLead = async (req, res) => {
  try {
    const { leadId } = req.params;

    const tasks = await Task.find({ leadId }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔵 UPDATE TASK STATUS
export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    // If task completed → log activity
    if (req.body.status === "completed") {
      await Lead.findByIdAndUpdate(task.leadId, {
        $push: {
          activities: {
            type: "task_completed",
            message: `Task completed: ${task.title}`,
          },
        },
      });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};