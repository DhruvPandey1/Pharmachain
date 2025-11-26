export default function DashboardNavbar() {
  return (
    <div className="dashboard-navbar">
      <h2>Welcome Back 👋</h2>

      <div className="navbar-right">
        <input type="text" placeholder="Search..." className="search-box" />
        <span className="profile-icon">👤</span>
      </div>
    </div>
  );
}
