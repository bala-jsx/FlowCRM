// function AIInsights({ leads, tasks }) {
//   const insights = [];

//   // Hot leads
//   const hotLeads = leads.filter((l) => l.priority === "hot");
//   if (hotLeads.length > 0) {
//     insights.push(`🔥 You have ${hotLeads.length} hot leads. Follow up immediately.`);
//   }

//   // Proposal stage
//   const proposalLeads = leads.filter((l) => l.status === "proposal");
//   if (proposalLeads.length > 0) {
//     insights.push(`📄 ${proposalLeads.length} leads are in proposal stage. Push for closure.`);
//   }

//   // No recent leads
//   const recent = leads.filter((l) => {
//     const created = new Date(l.createdAt);
//     const diff = (Date.now() - created) / (1000 * 60 * 60 * 24);
//     return diff < 3;
//   });

//   if (recent.length === 0) {
//     insights.push("⚠️ No new leads in last 3 days. Consider outreach.");
//   }

//   // Tasks today
//   const todayTasks = tasks.filter((t) => {
//     if (!t.dueDate) return false;
//     const today = new Date().toDateString();
//     return new Date(t.dueDate).toDateString() === today && t.status !== "completed";
//   });

//   if (todayTasks.length > 0) {
//     insights.push(`📞 ${todayTasks.length} tasks due today. Stay on track.`);
//   }

//   return (
//     <div className="bg-white p-5 rounded-xl border">
//       <h2 className="font-semibold mb-4">AI Insights</h2>

//       {insights.length === 0 ? (
//         <div className="text-sm text-gray-500">
//           Everything looks good 🚀
//         </div>
//       ) : (
//         <ul className="space-y-2 text-sm">
//           {insights.map((text, index) => (
//             <li key={index} className="bg-slate-100 p-2 rounded">
//               {text}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default AIInsights;

import { useEffect, useState } from "react";
import { aiApi } from "../services/api";

function AIInsights() {
  const [insights, setInsights] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    try {
      const res = await aiApi.getInsights();
      setInsights(res.insights);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 grid gap-3">

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
  );
}

export default AIInsights;