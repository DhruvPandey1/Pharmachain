import DashboardSidebar from "../components/DashboardSidebar";
import { Outlet } from "react-router-dom";
import "./dashboardLayout.css";

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <DashboardSidebar />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}
