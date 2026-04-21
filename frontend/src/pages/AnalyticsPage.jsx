import { useEffect, useState } from "react";
import { leadsApi } from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { BarChart3, PieChart as PieIcon, DollarSign, TrendingUp } from "lucide-react";

function AnalyticsPage() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    const data = await leadsApi.getAll();
    setLeads(data || []);
  };

  // ===== DATA =====
  const stageData = ["new", "contacted", "qualified", "proposal", "closed"].map(
    (stage) => ({
      name: stage,
      value: leads.filter((l) => l.status === stage).length,
    })
  );

  const priorityData = ["hot", "warm", "cold"].map((p) => ({
    name: p,
    value: leads.filter((l) => l.priority === p).length,
  }));

  const revenue = leads.reduce((sum, l) => {
    if (l.budget === "10k_plus") return sum + 10000;
    if (l.budget === "5k_10k") return sum + 7000;
    if (l.budget === "below_5k") return sum + 3000;
    return sum;
  }, 0);

  const conversion =
    leads.length === 0
      ? 0
      : Math.round(
          (leads.filter((l) => l.status === "closed").length / leads.length) *
            100
        );

  const COLORS = ["#ef4444", "#f59e0b", "#3b82f6"];

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-sm text-slate-500">
          Understand your pipeline performance
        </p>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-4 gap-6">

        <MetricCard
          icon={<BarChart3 />}
          title="Total Leads"
          value={leads.length}
          gradient="from-blue-500 to-indigo-600"
        />

        <MetricCard
          icon={<TrendingUp />}
          title="Conversion Rate"
          value={`${conversion}%`}
          gradient="from-purple-500 to-indigo-600"
        />

        <MetricCard
          icon={<DollarSign />}
          title="Estimated Revenue"
          value={`$${revenue}`}
          gradient="from-green-500 to-emerald-600"
        />

        <MetricCard
          icon={<PieIcon />}
          title="Hot Leads"
          value={leads.filter((l) => l.priority === "hot").length}
          gradient="from-red-500 to-pink-600"
        />

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-2 gap-6">

        {/* BAR CHART */}
        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 text-sm font-semibold">
            Leads by Stage
          </div>

          <div className="p-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stageData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART */}
        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-2 text-sm font-semibold">
            Priority Distribution
          </div>

          <div className="p-4 flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={priorityData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                >
                  {priorityData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}

// ===== METRIC CARD =====
function MetricCard({ icon, title, value, gradient }) {
  return (
    <div className={`p-5 rounded-xl text-white shadow bg-gradient-to-r ${gradient}`}>
      <div className="flex justify-between items-center mb-3">
        <div className="opacity-90">{icon}</div>
        <div className="text-xs opacity-80">Overview</div>
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm mt-1 opacity-80">{title}</div>
    </div>
  );
}

export default AnalyticsPage;