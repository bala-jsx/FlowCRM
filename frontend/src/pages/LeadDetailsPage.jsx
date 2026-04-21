import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  DollarSign,
  UserCheck,
  Clock,
  Trash2,
} from "lucide-react";

import { leadsApi, tasksApi } from "../services/api";
import StatusDropdown from "../components/StatusDropdown";
import TaskList from "../components/TaskList";
import ActivityTimeline from "../components/ActivityTimeline";
import PriorityBadge from "../components/PriorityBadge";
import MessageGenerator from "../components/MessageGenerator";

function LeadDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAll();
  }, [id]);

  const loadAll = async () => {
    try {
      const [leadData, taskData] = await Promise.all([
        leadsApi.getById(id),
        tasksApi.getByLead(id),
      ]);

      setLead(leadData);
      setTasks(taskData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async () => {
    if (!window.confirm("Delete this lead?")) return;

    await leadsApi.remove(id);
    navigate("/leads");
  };

  // STATUS
  const handleStatusChange = async (status) => {
    const updated = await leadsApi.updateStatus(id, status);
    if (updated) setLead(updated);
  };

  // TASKS
  const handleAddTask = async ({ title, dueDate }) => {
    const created = await tasksApi.create({ leadId: id, title, dueDate });

    if (created) {
      setTasks((prev) => [created, ...prev]);
      const refreshed = await leadsApi.getById(id);
      setLead(refreshed);
    }
  };

  const handleToggleTask = async (task) => {
    const updated = await tasksApi.update(task._id, {
      status: task.status === "completed" ? "pending" : "completed",
    });

    if (updated) {
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? updated : t))
      );

      const refreshed = await leadsApi.getById(id);
      setLead(refreshed);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!lead) return <div className="p-10">Lead not found</div>;

  return (
    <div className="p-6 space-y-6">

      {/* BACK */}
      <Link to="/leads" className="flex items-center gap-2 text-sm text-slate-500">
        <ArrowLeft size={16} /> Back to leads
      </Link>

      {/* HEADER */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">

        {/* TOP BAR */}
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2"></div>

        <div className="p-6 flex justify-between items-start">

          {/* LEFT */}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">{lead.name}</h1>
              <PriorityBadge priority={lead.priority} />
            </div>

            <p className="text-xs text-slate-500 mt-1">
              Created {new Date(lead.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <StatusDropdown
              value={lead.status}
              onChange={handleStatusChange}
            />

            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>

        {/* INFO STRIP */}
        <div className="grid grid-cols-3 gap-4 p-6 pt-0">

          <InfoCard
            icon={DollarSign}
            label="BUDGET"
            value={lead.budget}
            color="bg-green-50 border-green-200"
          />

          <InfoCard
            icon={UserCheck}
            label="AUTHORITY"
            value={lead.authority}
            color="bg-blue-50 border-blue-200"
          />

          <InfoCard
            icon={Clock}
            label="TIMELINE"
            value={lead.timeline}
            color="bg-yellow-50 border-yellow-200"
          />

        </div>
      </div>

      {/* TASK + ACTIVITY */}
      <div className="grid grid-cols-2 gap-6">

        {/* TASKS */}
        <div className="bg-white rounded-xl border shadow overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 text-sm font-semibold">
            TASKS
          </div>

          <div className="p-4">
            <TaskList
              tasks={tasks}
              onAdd={handleAddTask}
              onToggle={handleToggleTask}
            />
          </div>
        </div>

        {/* ACTIVITY */}
        <div className="bg-white rounded-xl border shadow overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 text-sm font-semibold">
            ACTIVITY TIMELINE
          </div>

          <div className="p-4">
            <ActivityTimeline activities={lead.activities || []} />
          </div>
        </div>

      </div>

      {/* MESSAGE GENERATOR */}
      <div className="bg-white rounded-xl border shadow overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 text-sm font-semibold">
          MESSAGE GENERATOR
        </div>

        <div className="p-4">
          <MessageGenerator lead={lead} />
        </div>
      </div>

    </div>
  );
}

// ===== INFO CARD =====
function InfoCard({ icon: Icon, label, value, color }) {
  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg border ${color}`}>
      <Icon size={18} />
      <div>
        <div className="text-xs text-slate-500">{label}</div>
        <div className="text-sm font-semibold capitalize">{value}</div>
      </div>
    </div>
  );
}

export default LeadDetailsPage;