import { useState } from "react";
import "./Dashboard.css";

export default function Patients() {
  const [patients, setPatients] = useState([
    { id: 1, name: "Ravi Kumar", age: 32, disease: "Diabetes", contact: "9876543210" },
    { id: 2, name: "Anita Sharma", age: 45, disease: "Heart Issue", contact: "9123456780" },
    { id: 3, name: "Mohit Verma", age: 28, disease: "Fever", contact: "9090909090" }
  ]);

  const [search, setSearch] = useState("");

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <h1 className="page-title">Patients</h1>

      {/* Header bar */}
      <div className="page-header">
        <input
          type="text"
          className="search-input"
          placeholder="Search patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="btn-primary">+ Add New Patient</button>
      </div>

      {/* Table */}
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Disease</th>
            <th>Contact</th>
          </tr>
        </thead>

        <tbody>
          {filteredPatients.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-data">No patients found</td>
            </tr>
          ) : (
            filteredPatients.map(patient => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.disease}</td>
                <td>{patient.contact}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
