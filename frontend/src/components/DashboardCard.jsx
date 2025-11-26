export default function DashboardCard({ title, value, icon }) {
  return (
    <div className="dashboard-card">
      <div className="card-left">
        <h4>{title}</h4>
        <h2>{value}</h2>
      </div>

      <div className="card-icon">{icon}</div>
    </div>
  );
}
