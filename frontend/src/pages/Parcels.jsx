import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Parcels.css";

const API_URL = "http://localhost:3000/parcels";

export default function Parcels() {
  const [form, setForm] = useState({
    trackingId: "",
    sender: "",
    receiver: "",
    status: "in transit",
  });

  const [parcels, setParcels] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchParcels = async () => {
    const res = await axios.get(API_URL);
    setParcels(res.data);
  };

  const handleChange = (e) => {
  const key = e.target.id || e.target.name;
  setForm({ ...form, [key]: e.target.value });
};

  const handleCreate = async () => {
    try {
      await axios.post(API_URL, form);
      alert("Parcel created!");
      setForm({ trackingId: "", sender: "", receiver: "", status: "in transit" });
      fetchParcels();
    } catch (err) {
      alert("Create error");
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/${form.trackingId}`, form);
      alert("Parcel updated!");
      setForm({ trackingId: "", sender: "", receiver: "", status: "in transit" });
      fetchParcels();
    } catch (err) {
      alert("Update error");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchParcels();
  };

  const handleEdit = (p) => {
    setForm(p);
  };

  const filteredParcels = filterStatus === "all"
    ? parcels
    : parcels.filter((p) => p.status === filterStatus);

  useEffect(() => {
    fetchParcels();
  }, []);

  return (
    <div className="container">
      <h1>Parcel Management</h1>

      <form className="form">
        <input id="trackingId" value={form.trackingId} onChange={handleChange} placeholder="Tracking ID" />
        <input id="sender" value={form.sender} onChange={handleChange} placeholder="Sender" />
        <input id="receiver" value={form.receiver} onChange={handleChange} placeholder="Receiver" />
        <select id="status" value={form.status} onChange={handleChange}>
          <option value="in transit">In Transit</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <div>
          <button type="button" onClick={handleCreate}>Create</button>
          <button type="button" onClick={handleUpdate}>Update</button>
        </div>
      </form>

      <select onChange={(e) => setFilterStatus(e.target.value)}>
        <option value="all">Filter by Status</option>
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
          {filteredParcels.map((p) => (
            <tr key={p.trackingId}>
              <td>{p.trackingId}</td>
              <td>{p.sender}</td>
              <td>{p.receiver}</td>
              <td className={p.status.replace(/\s/g, "-")}>{p.status}</td>
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
