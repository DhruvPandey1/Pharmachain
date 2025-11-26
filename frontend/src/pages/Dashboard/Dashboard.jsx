import DashboardSidebar from "../../components/DashboardSidebar";
import DashboardNavbar from "../../components/DashboardNavbar";
import DashboardCard from "../../components/DashboardCard";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import "./Dashboard.css";

export default function Dashboard() {
  // ---- Random Chart Data ----
  const monthlyData = [
    { month: "Jan", patients: 120, sales: 80 },
    { month: "Feb", patients: 200, sales: 140 },
    { month: "Mar", patients: 150, sales: 100 },
    { month: "Apr", patients: 300, sales: 220 },
    { month: "May", patients: 260, sales: 180 },
    { month: "Jun", patients: 400, sales: 300 },
  ];

  return (
    <div className="dashboard-container">
      
      {/* Sidebar */}
      {/* <DashboardSidebar /> */}

      {/* Main */}
      <div className="dashboard-main">
        <DashboardNavbar />

        {/* Cards */}
        <div className="dashboard-cards">
          <DashboardCard title="Total Patients" value="1450" icon="👨‍⚕️" />
          <DashboardCard title="Total Doctors" value="120" icon="🩺" />
          <DashboardCard title="Medicines Sold" value="3400" icon="💊" />
          <DashboardCard title="Pending Requests" value="34" icon="⏳" />
        </div>

        {/* Charts Row */}
        <div className="charts-row">
          {/* Line Chart */}
          <div className="chart-box">
            <h3>Patient Growth</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="patients" stroke="#4f46e5" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="chart-box">
            <h3>Medicine Sales</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table */}
        <div className="table-section">
          <h3>Recent Activity</h3>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Activity</th>
                <th>User</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>New Patient Registered</td>
                <td>Rohan Sharma</td>
                <td><span className="status success">Completed</span></td>
                <td>26 Nov 2025</td>
              </tr>

              <tr>
                <td>Prescription Updated</td>
                <td>Dr. Mehta</td>
                <td><span className="status pending">Pending</span></td>
                <td>26 Nov 2025</td>
              </tr>

              <tr>
                <td>Medicine Stock Added</td>
                <td>Pharmacy #44</td>
                <td><span className="status success">Completed</span></td>
                <td>24 Nov 2025</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
