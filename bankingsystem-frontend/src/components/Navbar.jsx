import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Home, Send, History, Wallet } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  return (
    <nav className="glass-card" style={{ 
      margin: "1rem", 
      padding: "1rem 2rem", 
      borderRadius: "1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "sticky",
      top: "1rem",
      zIndex: 100
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <Wallet className="text-primary" size={28} color="#2563eb" />
        <span style={{ fontSize: "1.5rem", fontWeight: "800", background: "linear-gradient(to right, #2563eb, #10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          NovaBank
        </span>
      </div>

      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <Link to="/dashboard" className="nav-link" style={{ textDecoration: "none", color: "var(--text-main)", display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "500" }}>
          <Home size={18} /> Dashboard
        </Link>
        <Link to="/transfer" className="nav-link" style={{ textDecoration: "none", color: "var(--text-main)", display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "500" }}>
          <Send size={18} /> Transfer
        </Link>
        <Link to="/transactions" className="nav-link" style={{ textDecoration: "none", color: "var(--text-main)", display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "500" }}>
          <History size={18} /> History
        </Link>
        
        <button 
          onClick={handleLogout}
          className="btn-primary" 
          style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", padding: "0.5rem 1rem" }}
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </nav>
  );
}
