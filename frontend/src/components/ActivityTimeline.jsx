function ActivityTimeline({ activities }) {
  if (!activities || activities.length === 0) {
    return <div className="text-sm text-gray-400">No activity yet</div>;
  }

  return (
    <div className="space-y-3">
      {activities.map((act, index) => (
        <div key={index} className="border-l-2 pl-3">
          <div className="text-sm">{act.message}</div>
          <div className="text-xs text-gray-400">
            {new Date(act.timestamp).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ActivityTimeline;