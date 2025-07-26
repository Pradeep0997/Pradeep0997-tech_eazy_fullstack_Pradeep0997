import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Orders.css";

function DeliveryOrders() {
  const [orders, setOrders] = useState([]);
  const [vendorFilter, setVendorFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/delivery-orders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:3000/api/delivery-orders/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFile(null);
      setMessage("Upload successful!");
      fetchOrders();
    } catch (error) {
      console.error("Upload failed:", error);
      setMessage("Upload failed. Please try again.");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const vendorMatch = vendorFilter ? order.vendorName.toLowerCase().includes(vendorFilter.toLowerCase()) : true;
    const dateMatch = dateFilter ? order.date === dateFilter : true;
    return vendorMatch && dateMatch;
  });

  return (
    <div className="order-container">
      <h2>Delivery Orders</h2>

      <div className="upload-section">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload} disabled={!file}>
          Upload
        </button>
        {message && (
          <p className={message.includes("successful") ? "success-message" : "error-message"}>
            {message}
          </p>
        )}
      </div>

      <div className="filter-section">
        <input
          placeholder="Vendor Name"
          value={vendorFilter}
          onChange={(e) => setVendorFilter(e.target.value)}
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      <table className="order-table">
        <thead>
          <tr>
            <th>Vendor</th>
            <th>Date</th>
            <th>Total Orders</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((o) => (
            <tr key={o.id}>
              <td>{o.vendorName}</td>
              <td>{o.date}</td>
              <td>{o.totalOrders}</td>
              <td>
                <a
                  href={`http://localhost:3000${o.fileLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeliveryOrders;
