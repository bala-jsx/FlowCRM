function PriorityBadge({ priority }) {
  const colors = {
    hot: "bg-red-100 text-red-600",
    warm: "bg-yellow-100 text-yellow-600",
    cold: "bg-blue-100 text-blue-600",
  };

  return (
    <span className={`px-2 py-1 rounded text-xs ${colors[priority]}`}>
      {priority}
    </span>
  );
}

export default PriorityBadge;