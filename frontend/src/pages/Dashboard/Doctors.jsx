import React, { useState } from "react";
import "./DashboardPages.css";

export default function Doctors() {
  const [search, setSearch] = useState("");

  const doctors = [
    { id: 1, name: "Dr. Anil Mehra", specialty: "Cardiologist", phone: "9876543210", email: "anil@hospital.com" },
    { id: 2, name: "Dr. Priya Sharma", specialty: "Dermatologist", phone: "9988776655", email: "priya@clinic.com" },
    { id: 3, name: "Dr. Vikram Singh", specialty: "Neurologist", phone: "9123456780", email: "vikram@neurocare.com" },
  ];

  const filteredDoctors = doctors.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>👨‍⚕️ Doctors Directory</h1>
        <input
          type="text"
          placeholder="Search doctor by name..."
          className="search-input"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Doctor Name</th>
              <th>Specialty</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredDoctors.map((doc, index) => (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.name}</td>
                <td>{doc.specialty}</td>
                <td>{doc.email}</td>
                <td>{doc.phone}</td>
                <td>
                  <button className="btn-view">View</button>
                  <button className="btn-edit">Edit</button>
                  <button className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
