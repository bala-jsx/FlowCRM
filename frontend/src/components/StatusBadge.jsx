function StatusBadge({ status }) {
  const colors = {
    new: "bg-gray-100 text-gray-600",
    contacted: "bg-blue-100 text-blue-600",
    qualified: "bg-yellow-100 text-yellow-600",
    proposal: "bg-purple-100 text-purple-600",
    closed: "bg-green-100 text-green-600",
  };

  return (
    <span className={`px-2 py-1 rounded text-xs ${colors[status]}`}>
      {status}
    </span>
  );
}

export default StatusBadge;