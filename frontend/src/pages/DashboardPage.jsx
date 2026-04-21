import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { leadsApi, tasksApi, aiApi } from "../services/api";
import InsightCard from "../components/InsightCard";
import {
  Users,
  Flame,
  Trophy,
  Lightbulb,
  ArrowRight,
  CalendarCheck,
  CheckCircle,
} from "lucide-react";

function DashboardPage() {
  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [insights, setInsights] = useState([]);
  const [loadingAI, setLoadingAI] = useState(true);

  useEffect(() => {
    loadData();
    loadInsights();
  }, []);

  const loadData = async () => {
    const leadData = await leadsApi.getAll();
    setLeads(leadData || []);

    let allTasks = [];
    for (let l of leadData) {
      const t = await tasksApi.getByLead(l._id);
      allTasks.push(...t);
    }
    setTasks(allTasks);
  };

const loadInsights = async () => {
  try {
    const res = await aiApi.getInsights();

    const parsed = JSON.parse(res.insights);
    setInsights(parsed);

  } catch (err) {
    console.error("AI parsing error:", err);
    setInsights([]);
  } finally {
    setLoadingAI(false);
  }
};

  const markTaskDone = async (task) => {
    const updated = await tasksApi.update(task._id, {
      status: "completed",
    });

    if (updated) {
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? updated : t))
      );
    }
  };

  const stats = {
    total: leads.length,
    hot: leads.filter((l) => l.priority === "hot").length,
    closed: leads.filter((l) => l.status === "closed").length,
  };

  const pipeline = {
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    qualified: leads.filter((l) => l.status === "qualified").length,
    proposal: leads.filter((l) => l.status === "proposal").length,
    closed: leads.filter((l) => l.status === "closed").length,
  };

  const today = new Date().toDateString();

  const todaysTasks = tasks.filter(
    (t) =>
      t.dueDate &&
      new Date(t.dueDate).toDateString() === today &&
      t.status !== "completed"
  );

  return (
    <div className="p-6 bg-slate-300 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-slate-500">
            Your sales pipeline at a glance
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Manage Leads
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <StatCard icon={<Users />} title="Total Leads" value={stats.total} gradient="from-blue-500 to-indigo-600" />
        <StatCard icon={<Flame />} title="Hot Leads" value={stats.hot} gradient="from-red-500 to-pink-600" />
        <StatCard icon={<Trophy />} title="Closed Deals" value={stats.closed} gradient="from-green-500 to-emerald-600" />
      </div>





{/* ===== MAIN GRID (1 LEFT / 2 RIGHT) ===== */}
<div className="grid grid-cols-3 gap-6 mb-6">

  {/* ===== LEFT: AI INSIGHTS ===== */}
  <div className="col-span-1 bg-white rounded-xl shadow border flex flex-col">

    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4 rounded-t-xl flex items-center gap-2">
      <Lightbulb className="w-4 h-4" />
      <span className="font-semibold text-sm">AI INSIGHTS</span>
    </div>

    <div className="p-4 grid gap-3 flex-1 overflow-auto">

      {loadingAI ? (
        <div className="text-slate-500">Generating insights...</div>
      ) : insights.length === 0 ? (
        <div className="text-slate-500">No insights yet.</div>
      ) : (
        insights.map((item, i) => (
          <InsightCard key={i} item={item} />
        ))
      )}

    </div>
  </div>

  {/* ===== RIGHT SIDE ===== */}
  <div className="col-span-2 flex flex-col gap-6">

    {/* PIPELINE */}
    <div className="bg-white rounded-xl shadow border">
      <div className="bg-gradient-to-r from-emerald-600 to-green-500 text-white p-4 rounded-t-xl flex items-center gap-2">
        <ArrowRight className="w-4 h-4" />
        <span className="font-semibold text-sm">PIPELINE OVERVIEW</span>
      </div>

      <div className="p-4 space-y-3 text-sm">
        {Object.entries(pipeline).map(([key, val]) => (
          <div key={key} className="flex justify-between">
            <span className="capitalize">{key}</span>
            <span className="text-slate-500">{val} leads</span>
          </div>
        ))}

        <button
          onClick={() => navigate("/pipeline")}
          className="text-emerald-600 text-sm mt-2"
        >
          View full pipeline →
        </button>
      </div>
    </div>

    {/* TODAY TASKS */}
    <div className="bg-white rounded-xl shadow border">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-t-xl flex items-center gap-2">
        <CalendarCheck className="w-4 h-4" />
        <span className="font-semibold text-sm">TODAY'S TASKS</span>
      </div>

      <div className="p-4 space-y-3">

        {todaysTasks.length === 0 ? (
          <div className="text-center text-slate-500 py-6">
            <div className="text-green-500 text-3xl">✓</div>
            <div className="font-medium">All caught up!</div>
            <div className="text-sm">No tasks due today.</div>
          </div>
        ) : (
          todaysTasks.map((task) => (
            <div
              key={task._id}
              className="flex justify-between items-center bg-slate-50 p-3 rounded"
            >
              <div>
                <div className="font-medium">{task.title}</div>
                <div className="text-xs text-slate-500">
                  {task.dueDate}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/lead/${task.leadId}`)}
                  className="text-blue-600 text-sm"
                >
                  View
                </button>

                <button
                  onClick={() => markTaskDone(task)}
                  className="text-green-600 text-sm flex items-center gap-1"
                >
                  <CheckCircle className="w-4 h-4" />
                  Done
                </button>
              </div>
            </div>
          ))
        )}

      </div>
    </div>

  </div>
</div>




    </div>
  );
}

function StatCard({ icon, title, value, gradient }) {
  return (
    <div className={`p-6 rounded-xl text-white shadow bg-gradient-to-r ${gradient}`}>
      <div className="flex justify-between mb-3">
        <div>{icon}</div>
        <div className="text-xs opacity-80">All time</div>
      </div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm mt-1 opacity-80">{title}</div>
    </div>
  );
}

export default DashboardPage;