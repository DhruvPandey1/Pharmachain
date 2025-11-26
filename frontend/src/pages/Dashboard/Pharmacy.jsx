import React, { useState } from "react";
import "./DashboardPages.css";

export default function Pharmacy() {
  const [search, setSearch] = useState("");

  const inventory = [
    { id: 1, name: "Paracetamol 500mg", stock: 120, expiry: "2026-01-12", price: "₹20" },
    { id: 2, name: "Amoxicillin 250mg", stock: 40, expiry: "2025-11-05", price: "₹75" },
    { id: 3, name: "Cough Syrup", stock: 15, expiry: "2024-09-22", price: "₹55" },
  ];

  const filteredItems = inventory.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>💊 Pharmacy Stock Management</h1>
        <input
          type="text"
          placeholder="Search medicine..."
          className="search-input"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Medicine</th>
              <th>In Stock</th>
              <th>Expires On</th>
              {/* <th>Price</th> */}
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.map((item, index) => {
              const status =
                item.stock < 20 ? "Low Stock" : item.stock < 50 ? "Moderate" : "In Stock";

              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.stock}</td>
                  <td>{item.expiry}</td>
                  {/* <td>{item.price}</td> */}
                  <td>
                    <span
                      className={`status-badge ${
                        status === "Low Stock"
                          ? "low"
                          : status === "Moderate"
                          ? "medium"
                          : "high"
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
    </div>
  );
}
