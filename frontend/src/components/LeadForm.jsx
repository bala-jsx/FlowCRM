import { useState } from "react";
import { X, User } from "lucide-react";

function LeadForm({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "below_5k",
    authority: "unknown",
    need: "",
    timeline: "1_month",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      contact: {
        email: form.email,
        phone: form.phone,
      },
      budget: form.budget,
      authority: form.authority,
      need: form.need,
      timeline: form.timeline,
    };

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <User className="w-4 h-4" />
            ADD NEW LEAD
          </div>

          <button onClick={onClose}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">

          {/* NAME */}
          <div>
            <label className="text-xs font-semibold text-slate-500">LEAD NAME</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter name"
              className="w-full mt-1 p-2 border rounded-lg text-sm"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-xs font-semibold text-slate-500">EMAIL</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="client@email.com"
              className="w-full mt-1 p-2 border rounded-lg text-sm"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="text-xs font-semibold text-slate-500">PHONE</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91..."
              className="w-full mt-1 p-2 border rounded-lg text-sm"
            />
          </div>

          {/* BUDGET */}
          <div>
            <label className="text-xs font-semibold text-slate-500">BUDGET</label>
            <select
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg text-sm"
            >
              <option value="below_5k">Below 5k</option>
              <option value="5k_10k">5k - 10k</option>
              <option value="10k_plus">10k+</option>
            </select>
          </div>

          {/* AUTHORITY */}
          <div>
            <label className="text-xs font-semibold text-slate-500">AUTHORITY</label>
            <select
              name="authority"
              value={form.authority}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg text-sm"
            >
              <option value="decision_maker">Decision Maker</option>
              <option value="influencer">Decision Influencer</option>
              <option value="end-user">End User</option>
            </select>
          </div>

          {/* NEED */}
          <div>
            <label className="text-xs font-semibold text-slate-500">NEED</label>
            <input
              name="need"
              value={form.need}
              onChange={handleChange}
              placeholder="Website, App, CRM..."
              className="w-full mt-1 p-2 border rounded-lg text-sm"
            />
          </div>

          {/* TIMELINE */}
          <div>
            <label className="text-xs font-semibold text-slate-500">TIMELINE</label>
            <select
              name="timeline"
              value={form.timeline}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg text-sm"
            >
              <option value="immediate">Immediate</option>
              <option value="1_month">1 Month</option>
              <option value="3_months">3 Months</option>
              <option value="later">Later</option>
            </select>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-between pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
            >
              Create Lead
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default LeadForm;