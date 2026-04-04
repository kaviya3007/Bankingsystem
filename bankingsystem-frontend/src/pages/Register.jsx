import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { UserPlus, Mail, Lock, User, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await API.post("/auth/register", { name, email, password });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Registration failed. Email might already be in use.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card" 
        style={{ width: "100%", maxWidth: "450px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "0.5rem" }}>Get Started</h2>
          <p style={{ color: "var(--text-muted)" }}>Create your NovaBank account today</p>
        </div>

        {error && (
          <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#ef4444", padding: "1rem", borderRadius: "0.75rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        {success && (
          <div style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", color: "#10b981", padding: "1rem", borderRadius: "0.75rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <CheckCircle size={18} /> Registration successful! Redirecting to login...
          </div>
        )}

        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label className="label">Full Name</label>
            <div style={{ position: "relative" }}>
              <User style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} size={18} />
              <input 
                type="text" 
                required 
                className="input-field" 
                style={{ paddingLeft: "3rem" }} 
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="label">Email Address</label>
            <div style={{ position: "relative" }}>
              <Mail style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} size={18} />
              <input 
                type="email" 
                required 
                className="input-field" 
                style={{ paddingLeft: "3rem" }} 
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="label">Password</label>
            <div style={{ position: "relative" }}>
              <Lock style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} size={18} />
              <input 
                type="password" 
                required 
                className="input-field" 
                style={{ paddingLeft: "3rem" }} 
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" disabled={loading || success} className="btn-primary" style={{ width: "100%", height: "3rem" }}>
            {loading ? "Creating account..." : <><UserPlus size={18} /> Create Account</>}
          </button>
        </form>

        <div style={{ marginTop: "2rem", textAlign: "center", color: "var(--text-muted)" }}>
          Already have an account? {" "}
          <Link to="/login" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: "600" }}>Sign in</Link>
        </div>
      </motion.div>
    </div>
  );
}