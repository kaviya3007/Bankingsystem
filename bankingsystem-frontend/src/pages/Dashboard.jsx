import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Wallet, ArrowUpRight, ArrowDownLeft, Plus, CreditCard, User, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchAccount();
  }, []);

  const fetchAccount = async () => {
    try {
      const res = await API.get("/accounts/my-account");
      setAccount(res.data);
    } catch (err) {
      console.error("Failed to fetch account", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(account?.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <div className="page-container" style={{ textAlign: "center", paddingTop: "5rem" }}>Loading your dashboard...</div>;

  if (!account) return (
    <div className="page-container" style={{ textAlign: "center", paddingTop: "5rem" }}>
      <div className="glass-card" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h3>No Account Found</h3>
        <p style={{ color: "var(--text-muted)", margin: "1rem 0" }}>You don't have a bank account yet. Let's set one up for you.</p>
        <button className="btn-primary" onClick={async () => {
          // Logic to create a random account for demo purposes
          const accNo = "NOV" + Math.floor(1000000000 + Math.random() * 9000000000);
          await API.post("/accounts", { accountNumber: accNo, balance: 1000.0 });
          fetchAccount();
        }}>
          <Plus size={18} /> Create New Account
        </button>
      </div>
    </div>
  );

  return (
    <div className="page-container animate-fade-in">
      <header style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800" }}>Dashboard</h1>
        <p style={{ color: "var(--text-muted)" }}>Welcome back, {account.user?.name || "Member"}</p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        {/* Balance Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card" 
          style={{ background: "linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(30, 41, 59, 0.7) 100%)", border: "1px solid rgba(37, 99, 235, 0.3)" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
            <Wallet size={32} color="#2563eb" />
            <CreditCard size={24} style={{ opacity: 0.5 }} />
          </div>
          <span className="label" style={{ color: "rgba(255, 255, 255, 0.6)" }}>Current Balance</span>
          <h2 style={{ fontSize: "3rem", fontWeight: "800", margin: "0.25rem 0" }}>${account.balance.toLocaleString()}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem" }}>
            <span style={{ fontSize: "0.875rem", background: "rgba(16, 185, 129, 0.2)", color: "#10b981", padding: "0.25rem 0.75rem", borderRadius: "1rem" }}>Active</span>
          </div>
        </motion.div>

        {/* Account Details */}
        <div className="glass-card">
          <h3 style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <User size={20} className="text-primary" /> Account Details
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <span className="label">Account Number</span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(15, 23, 42, 0.3)", padding: "0.5rem 1rem", borderRadius: "0.75rem", border: "1px solid var(--glass-border)" }}>
                <code style={{ fontSize: "1.125rem", color: "var(--primary)" }}>{account.accountNumber}</code>
                <button onClick={handleCopy} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                  {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                </button>
              </div>
            </div>
            <div>
              <span className="label">Account Type</span>
              <p style={{ fontWeight: "600" }}>Premium Savings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h3 style={{ marginBottom: "1.5rem" }}>Quick Actions</h3>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <button className="btn-primary" onClick={() => window.location.href='/transfer'}>
          <ArrowUpRight size={18} /> Send Money
        </button>
        <button className="btn-primary" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
          <ArrowDownLeft size={18} /> Request Money
        </button>
      </div>
    </div>
  );
}