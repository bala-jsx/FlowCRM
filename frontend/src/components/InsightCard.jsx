function InsightCard({ item }) {
  const styles = {
    priority: "bg-red-50 border-red-200 text-red-700",
    followup: "bg-blue-50 border-blue-200 text-blue-700",
    opportunity: "bg-green-50 border-green-200 text-green-700",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-700",
  };

  return (
    <div className={`p-3 rounded-lg border ${styles[item.type]}`}>
      <div className="font-semibold text-sm mb-1">
        {item.title}
      </div>

      <div className="text-sm text-slate-700">
        {item.description}
      </div>
    </div>
  );
}

export default InsightCard;