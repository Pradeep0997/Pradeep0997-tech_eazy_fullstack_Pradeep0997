import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Parcels from "./pages/Parcels";
import Vendors from "./pages/Vendors";
import DeliveryOrders from "./pages/DeliveryOrders";
import Navbar from "./components/Navbar";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      {token && <Navbar />} {/* Show Navbar only when logged in */}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/parcels" element={<PrivateRoute><Parcels /></PrivateRoute>} />
        <Route path="/vendors" element={<PrivateRoute><Vendors /></PrivateRoute>} />
        <Route path="/orders" element={<PrivateRoute><DeliveryOrders /></PrivateRoute>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
