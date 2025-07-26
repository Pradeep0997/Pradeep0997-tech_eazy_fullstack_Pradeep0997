import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">📦 TechEazy</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/parcels">Parcels</Link>
        <Link to="/vendors">Vendors</Link>
        <Link to="/orders">Orders</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
