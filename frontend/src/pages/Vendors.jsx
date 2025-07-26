// frontend/src/pages/Vendors.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Vendors.css";

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/vendors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setVendors(res.data);
    } catch (err) {
      setError("Failed to load vendors. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vendor-container">
      <h2>Vendor List</h2>

      {loading && <p>Loading vendors...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && vendors.length === 0 && (
        <p>No vendors available.</p>
      )}

      {!loading && !error && vendors.length > 0 && (
        <table className="vendor-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subscription</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => (
              <tr key={v.id}>
                <td>{v.name}</td>
                <td>{v.email}</td>
                <td>{v.subscription}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Vendors;
