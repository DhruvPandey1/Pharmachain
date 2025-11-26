import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";

export default function DashboardSidebar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "active-link" : "";

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">PharmaChain Dashboard</h2>
<hr />
      <ul className="sidebar-menu">

        <li><Link to="/dashboard" className={isActive("/dashboard")}>Dashboard</Link></li>

        <li><Link to="/dashboard/patients" className={isActive("/dashboard/patients")}>Patients</Link></li>

        <li><Link to="/dashboard/doctors" className={isActive("/dashboard/doctors")}>Doctors</Link></li>

        <li><Link to="/dashboard/pharmacy" className={isActive("/dashboard/pharmacy")}>Pharmacy</Link></li>

        <li><Link to="/dashboard/reports" className={isActive("/dashboard/reports")}>Reports</Link></li>

        {/* <li><Link to="/dashboard/settings" className={isActive("/dashboard/settings")}>⚙️ Settings</Link></li> */}

      </ul>
    </div>
  );
}
