function StatusDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded"
    >
      <option value="new">New</option>
      <option value="contacted">Contacted</option>
      <option value="qualified">Qualified</option>
      <option value="proposal">Proposal</option>
      <option value="closed">Closed</option>
    </select>
  );
}

export default StatusDropdown;