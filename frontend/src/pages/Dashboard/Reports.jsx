import React from "react";
import "./DashboardPages.css";

export default function Reports() {
  return (
    <div className="page-container">

      <h1 className="page-title">📈 System Analytics & Monthly Reports</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>👨‍⚕️ Total Doctors</h2>
          <p>32</p>
        </div>

        <div className="stat-card">
          <h2>👩‍⚕️ Total Patients</h2>
          <p>120</p>
        </div>

        <div className="stat-card">
          <h2>💊 Medicines</h2>
          <p>58</p>
        </div>

        <div className="stat-card">
          <h2>📅 Appointments</h2>
          <p>89</p>
        </div>
      </div>

      <div className="report-section">
        <h2>📊 Monthly Growth Report</h2>

        <p>
          The healthcare dashboard shows overall stable performance this month,
          with increased patient registrations, more doctor consultations, and
          higher pharmacy sales.
        </p>

        <ul className="report-list">
          <li>✔ Patient registration increased by 12%</li>
          <li>✔ Pharmacy sales up by 18%</li>
          <li>✔ Appointment bookings increased steadily</li>
          <li>✔ Medicine stock shortage reduced by 9%</li>
        </ul>
      </div>
    </div>
  );
}
