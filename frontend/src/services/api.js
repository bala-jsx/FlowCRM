import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ================= LEADS =================

export const leadsApi = {
  async getAll() {
    const res = await API.get("/leads");
    return res.data;
  },

  async getById(id) {
    const res = await API.get("/leads");
    return res.data.find((lead) => lead._id === id);
  },

  async create(data) {
    const res = await API.post("/leads", data);
    return res.data;
  },

  async update(id, data) {
    const res = await API.put(`/leads/${id}`, data);
    return res.data;
  },

  async remove(id) {
    await API.delete(`/leads/${id}`);
    return true;
  },

  async updateStatus(id, status) {
    const res = await API.patch(`/leads/${id}/status`, { status });
    return res.data;
  },
};

// ================= TASKS =================

export const tasksApi = {
  async getByLead(leadId) {
    const res = await API.get(`/tasks/${leadId}`);
    return res.data;
  },

  async create({ leadId, title, dueDate }) {
    const res = await API.post("/tasks", {
      leadId,
      title,
      dueDate,
    });
    return res.data;
  },

  async update(id, data) {
    const res = await API.put(`/tasks/${id}`, data);
    return res.data;
  },
};

export const aiApi = {
  async getInsights() {
    const res = await API.get("/ai/insights");
    return res.data;
  },

  async generateMessage(data) {
    const res = await API.post("/ai/message", data);
    return res.data;
  },
};