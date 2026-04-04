import React, { useState, useEffect } from "react";
import API from "../services/api";
import { Send, AlertCircle, CheckCircle, ChevronDown, User, Search, RefreshCw, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Transfer() {
  const [amount, setAmount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [fromAccount, setFromAccount] = useState("");
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [accRes, benRes] = await Promise.all([
        API.get("/accounts/my-account"),
        API.get("/admin/beneficiary")
      ]);
      setFromAccount(accRes.data.accountNumber);
      setBeneficiaries(benRes.data);
    } catch (err) {
      console.error("Failed to load transfer data", err);
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await API.post("/transactions/transfer", {
        fromAccount,
        toAccount,
        amount: parseFloat(amount)
      });

      if (res.data === "Transfer Successful") {
        setSuccess("Transfer of $" + amount + " to account " + toAccount + " was successful!");
        setAmount("");
        setToAccount("");
      } else {
        setError(res.data);
      }
    } catch (err) {
      setError("An unexpected error occurred during transfer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container animate-fade-in">
      <header style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: "800" }}>Fast Transfer</h1>
        <p style={{ color: "var(--text-muted)" }}>Securely move funds between accounts</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2.5rem" }}>
        {/* Transfer Form */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card">
          <form onSubmit={handleTransfer} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <span className="label">Sending From</span>
              <div className="input-field" style={{ opacity: 0.7, background: "rgba(0,0,0,0.2)" }}>
                {fromAccount || "Loading account..."}
              </div>
            </div>

            <div>
              <span className="label">Recipient Account</span>
              <div style={{ position: "relative" }}>
                <Search style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} size={18} />
                <input 
                  type="text" 
                  required 
                  className="input-field" 
                  style={{ paddingLeft: "3rem" }} 
                  placeholder="Enter 10-digit account number"
                  value={toAccount}
                  onChange={(e) => setToAccount(e.target.value)}
                />
              </div>
            </div>

            <div>
              <span className="label">Amount ($)</span>
              <input 
                type="number" 
                required 
                min="1"
                step="0.01"
                className="input-field" 
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} style={{ color: "#ef4444", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <AlertCircle size={16} /> {error}
                </motion.div>
              )}
              {success && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} style={{ color: "#10b981", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CheckCircle size={16} /> {success}
                </motion.div>
              )}
            </AnimatePresence>

            <button type="submit" disabled={loading || !fromAccount} className="btn-primary" style={{ height: "3.5rem", fontSize: "1.125rem" }}>
              {loading ? "Processing..." : <><Send size={20} /> Complete Transfer</>}
            </button>
          </form>
        </motion.div>

        {/* Beneficiaries Selection */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h3 style={{ marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <User size={20} className="text-primary" /> Saved Beneficiaries
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {beneficiaries.length > 0 ? beneficiaries.map((b) => (
              <div 
                key={b.id} 
                onClick={() => setToAccount(b.accountNumber)}
                className="glass-card" 
                style={{ 
                  padding: "1rem", 
                  cursor: "pointer", 
                  background: toAccount === b.accountNumber ? "rgba(37, 99, 235, 0.1)" : "var(--card-bg)",
                  borderColor: toAccount === b.accountNumber ? "var(--primary)" : "var(--card-border)",
                  transition: "all 0.2s"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontWeight: "600", color: toAccount === b.accountNumber ? "var(--primary)" : "white" }}>{b.name}</p>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>ACC: {b.accountNumber}</p>
                  </div>
                  <ChevronDown size={18} style={{ opacity: 0.5 }} />
                </div>
              </div>
            )) : (
              <div className="glass-card" style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                No beneficiaries saved yet.
              </div>
            )}
            
            <button 
              className="btn-primary" 
              style={{ background: "transparent", border: "1px dashed var(--glass-border)", color: "var(--text-muted)" }}
              onClick={async () => {
                const name = prompt("Enter beneficiary name:");
                const acc = prompt("Enter account number:");
                if(name && acc) {
                  await API.post("/admin/beneficiary", { name, accountNumber: acc });
                  fetchInitialData();
                }
              }}
            >
              <Plus size={18} /> Add New Beneficiary
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}