import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Parcels.css";

function Parcels() {
  const [parcels, setParcels] = useState([]);
  const [form, setForm] = useState({ trackingId: "", sender: "", receiver: "", status: "in transit" });
  const [filter, setFilter] = useState("all");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchParcels();
  }, []);

  const fetchParcels = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/parcels", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setParcels(res.data);
    } catch (err) {
      console.error("Fetch error:", err.message);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      await axios.post("http://localhost:3000/api/parcels", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ trackingId: "", sender: "", receiver: "", status: "in transit" });
      fetchParcels();
    } catch (err) {
      console.error("Create error:", err.message);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/api/parcels/${form.trackingId}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ trackingId: "", sender: "", receiver: "", status: "in transit" });
      fetchParcels();
    } catch (err) {
      console.error("Update error:", err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/parcels/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchParcels();
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  const handleEdit = (p) => {
    setForm(p);
  };

  const filtered = filter === "all" ? parcels : parcels.filter((p) => p.status === filter);

  return (
    <div className="parcel-container">
      <h2>Parcel Manager</h2>
      <form className="parcel-form">
        <input id="trackingId" value={form.trackingId} onChange={handleChange} placeholder="Tracking ID" required />
        <input id="sender" value={form.sender} onChange={handleChange} placeholder="Sender" required />
        <input id="receiver" value={form.receiver} onChange={handleChange} placeholder="Receiver" required />
        <select id="status" value={form.status} onChange={handleChange}>
          <option value="in transit">In Transit</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <div className="form-buttons">
          <button type="button" onClick={handleCreate}>Create</button>
          <button type="button" onClick={handleUpdate}>Update</button>
        </div>
      </form>

      <select className="status-filter" onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="in transit">In Transit</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>Tracking ID</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.trackingId}>
              <td>{p.trackingId}</td>
              <td>{p.sender}</td>
              <td>{p.receiver}</td>
              <td><span className={`status ${p.status.replace(/\s/g, "-")}`}>{p.status}</span></td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.trackingId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Parcels;
