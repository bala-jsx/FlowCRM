import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex bg-slate-300 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>

    </div>
  );
}

export default Layout;