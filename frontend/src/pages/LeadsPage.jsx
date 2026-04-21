import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Eye, Trash2 } from "lucide-react";
import { leadsApi } from "../services/api";
import LeadForm from "../components/LeadForm";
import PriorityBadge from "../components/PriorityBadge";
import StatusBadge from "../components/StatusBadge";

// ===== FORMAT HELPERS =====
const formatBudget = (val) => {
  const map = {
    below_5k: "Low",
    "5k_10k": "Medium",
    "10k_plus": "High",
  };
  return map[val] || val;
};

const formatTimeline = (val) => {
  const map = {
    immediate: "Immediate",
    "1_month": "1 Month",
    "3_months": "3 Months",
    later: "Later",
  };
  return map[val] || val;
};

function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const data = await leadsApi.getAll();
      setLeads(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    const created = await leadsApi.create(formData);
    if (created) {
      setLeads((prev) => [created, ...prev]);
      setShowForm(false);
    }
  };



  const filteredLeads = leads.filter((l) => {
    if (statusFilter !== "all" && l.status !== statusFilter) return false;
    if (priorityFilter !== "all" && l.priority !== priorityFilter) return false;
    if (search && !l.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: leads.length,
    hot: leads.filter((l) => l.priority === "hot").length,
    closed: leads.filter((l) => l.status === "closed").length,
  };

  return (
    <div className="p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Leads</h1>
          <p className="text-sm text-slate-500">
            Manage and track your sales pipeline
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
        >
          <Plus size={16} />
          Add Lead
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <GradientCard title="Total Leads" value={stats.total} color="blue" />
        <GradientCard title="Hot Leads" value={stats.hot} color="red" />
        <GradientCard title="Closed Deals" value={stats.closed} color="green" />
      </div>

      {/* FILTER BAR */}
      <div className="bg-[#1e293b] rounded-xl p-3 flex gap-3 mb-4">

        <input
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg text-sm bg-[#0f172a] text-white border border-slate-600"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#0f172a] text-white border border-slate-600 rounded-lg px-3 py-2 text-sm"
        >
          <option value="all">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="proposal">Proposal</option>
          <option value="closed">Closed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="bg-[#0f172a] text-white border border-slate-600 rounded-lg px-3 py-2 text-sm"
        >
          <option value="all">All Priorities</option>
          <option value="hot">Hot</option>
          <option value="warm">Warm</option>
          <option value="cold">Cold</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl overflow-hidden border shadow-sm">

        {loading ? (
          <div className="p-10 text-center text-slate-500">Loading...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Budget</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Priority</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead._id} className="border-b hover:bg-slate-50">

                  <td className="px-6 py-4">
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-xs text-slate-500">
                      {formatTimeline(lead.timeline)}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="bg-slate-100 px-2 py-1 rounded text-xs">
                      {formatBudget(lead.budget)}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={lead.status} />
                  </td>

                  <td className="px-6 py-4">
                    <PriorityBadge priority={lead.priority} />
                  </td>

                  <td className="px-6 py-4 flex justify-end gap-2">
                    <Link to={`/lead/${lead._id}`}>
                      <Eye size={16} />
                    </Link>

                    
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL */}
      {showForm && (
        <LeadForm
          onClose={() => setShowForm(false)}
          onSubmit={handleCreate}
        />
      )}
    </div>
  );
}

// ===== GRADIENT CARD =====
function GradientCard({ title, value, color }) {
  const colors = {
    blue: "from-blue-500 to-indigo-600",
    red: "from-red-500 to-pink-600",
    green: "from-green-500 to-emerald-600",
  };

  return (
    <div className={`p-6 text-white rounded-xl bg-gradient-to-r ${colors[color]}`}>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm opacity-80">{title}</div>
    </div>
  );
}

export default LeadsPage;