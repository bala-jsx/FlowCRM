import { useEffect, useState } from "react";
import { leadsApi } from "../services/api";
import PriorityBadge from "../components/PriorityBadge";

const stages = ["new", "contacted", "qualified", "proposal", "closed"];

const stageColors = {
  new: "bg-slate-600",
  contacted: "bg-blue-600",
  qualified: "bg-teal-600",
  proposal: "bg-orange-500",
  closed: "bg-green-600",
};

function PipelinePage() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    const data = await leadsApi.getAll();
    setLeads(data || []);
  };

  const moveLead = async (id, newStatus) => {
    const updated = await leadsApi.updateStatus(id, newStatus);

    if (updated) {
      setLeads((prev) =>
        prev.map((l) => (l._id === id ? updated : l))
      );
    }
  };

  const grouped = stages.reduce((acc, stage) => {
    acc[stage] = leads.filter((l) => l.status === stage);
    return acc;
  }, {});

  return (
    <div className="p-6">

      {/* HEADER */}
      <h1 className="text-xl font-bold mb-1">Pipeline</h1>
      <p className="text-sm text-slate-500 mb-6">
        {leads.length} leads across {stages.length} stages
      </p>

      {/* TOP STATS */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {stages.map((stage) => (
          <div
            key={stage}
            className={`text-white p-4 rounded-xl text-center ${stageColors[stage]}`}
          >
            <div className="text-2xl font-bold">
              {grouped[stage]?.length || 0}
            </div>
            <div className="text-xs capitalize mt-1">{stage}</div>
          </div>
        ))}
      </div>

      {/* BOARD */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-[1000px]">

          {stages.map((stage) => (
            <div key={stage} className="w-64 flex-shrink-0">

              {/* COLUMN HEADER */}
              <div
                className={`text-white px-3 py-2 rounded-lg text-sm font-semibold flex justify-between ${stageColors[stage]}`}
              >
                <span className="capitalize">{stage}</span>
                <span>{grouped[stage]?.length || 0}</span>
              </div>

              {/* COLUMN BODY */}
              <div className="mt-3 space-y-3">

                {grouped[stage]?.length === 0 ? (
                  <div className="border border-dashed rounded-lg p-4 text-center text-xs text-slate-400">
                    No leads here
                  </div>
                ) : (
                  grouped[stage].map((lead) => (
                    <div
                      key={lead._id}
                      className="bg-white rounded-xl p-3 border shadow-sm"
                    >

                      {/* NAME */}
                      <div className="font-medium text-sm mb-2">
                        {lead.name}
                      </div>

                      {/* BADGES */}
                      <div className="flex justify-between items-center mb-2">
                        <PriorityBadge priority={lead.priority} />

                        <span className="text-xs bg-slate-100 px-2 py-1 rounded">
                          {lead.budget}
                        </span>
                      </div>

                      {/* MOVE */}
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          moveLead(lead._id, e.target.value)
                        }
                        className="w-full mt-2 text-xs border rounded px-2 py-1"
                      >
                        {stages.map((s) => (
                          <option key={s} value={s}>
                            Move to {s}
                          </option>
                        ))}
                      </select>

                    </div>
                  ))
                )}

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default PipelinePage;