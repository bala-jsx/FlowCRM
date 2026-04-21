import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Kanban, ChartBar, Funnel, ChartBarDecreasing, ChartCandlestick, ChartColumnBig } from "lucide-react";

function Navbar() {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#020617] text-white flex flex-col">
      {/* LOGO */}
      <div className="p-5 border-b border-white/10">
        <h1 className="text-lg font-bold">FlowCRM</h1>
        <p className="text-xs text-slate-400">Lead Management</p>
      </div>

      {/* NAV */}
      <div className="flex-1 p-3 space-y-2">

        <NavItem to="/" icon={LayoutDashboard} label="Dashboard" />
        <NavItem to="/leads" icon={Users} label="Leads" />
        <NavItem to="/pipeline" icon={Funnel} label="Pipeline" />
        <NavItem to="/analytics" icon={ChartColumnBig} label="Analytics" />

      </div>

      {/* FOOTER */}
      {/* <div className="p-4 text-xs text-slate-500 border-t border-white/10">
        FlowCRM v1.0
      </div> */}
    </div>
  );
}

// ===== NAV ITEM =====
function NavItem({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition 
        ${isActive
          ? "bg-blue-600 text-white"
          : "text-slate-300 hover:bg-white/10 hover:text-white"}`
      }
    >
      <Icon size={16} />
      {label}
    </NavLink>
  );
}

export default Navbar;