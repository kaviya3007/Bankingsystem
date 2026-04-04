import React, { useState, useEffect } from "react";
import API from "../services/api";
import { History, ArrowUpRight, ArrowDownLeft, Filter, Search, Download } from "lucide-react";
import { motion } from "framer-motion";

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accRes = await API.get("/accounts/my-account");
        if (accRes.data) {
          setAccountNumber(accRes.data.accountNumber);
          const txnRes = await API.get(`/transactions/${accRes.data.accountNumber}`);
          setTransactions(txnRes.data.reverse()); // Show newest first
        }
      } catch (err) {
        console.error("Error fetching transactions", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="page-container" style={{ textAlign: "center", paddingTop: "5rem" }}>Loading history...</div>;

  return (
    <div className="page-container animate-fade-in">
      <header style={{ marginBottom: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontSize: "2.25rem", fontWeight: "800" }}>Transactions</h1>
          <p style={{ color: "var(--text-muted)" }}>Monitor your recent financial activity</p>
        </div>
        <button className="btn-primary" style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", color: "white" }}>
          <Download size={18} /> Export PDF
        </button>
      </header>

      <div className="glass-card" style={{ padding: "0", overflow: "hidden" }}>
        {/* Table Filters */}
        <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--glass-border)", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
            <Search style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} size={18} />
            <input className="input-field" style={{ paddingLeft: "3rem" }} placeholder="Search transactions..." />
          </div>
          <button style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", color: "white", padding: "0.75rem 1.25rem", borderRadius: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
            <Filter size={18} /> Filters
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead style={{ background: "rgba(255,255,255,0.02)", color: "var(--text-muted)", fontSize: "0.875rem", textTransform: "uppercase" }}>
              <tr>
                <th style={{ padding: "1.25rem 1.5rem" }}>Type</th>
                <th style={{ padding: "1.25rem 1.5rem" }}>Account</th>
                <th style={{ padding: "1.25rem 1.5rem" }}>Status</th>
                <th style={{ padding: "1.25rem 1.5rem", textAlign: "right" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? transactions.map((txn, index) => {
                const isDebit = txn.fromAccount === accountNumber;
                return (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={txn.id} 
                    style={{ borderBottom: "1px solid var(--glass-border)", transition: "background 0.2s" }}
                  >
                    <td style={{ padding: "1.25rem 1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div style={{ padding: "0.5rem", borderRadius: "0.75rem", background: isDebit ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.1)" }}>
                          {isDebit ? <ArrowUpRight color="#ef4444" size={20} /> : <ArrowDownLeft color="#10b981" size={20} />}
                        </div>
                        <div>
                          <p style={{ fontWeight: "600" }}>{isDebit ? "Sent Payment" : "Received Payment"}</p>
                          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>ID: TXN-{txn.id}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "1.25rem 1.5rem" }}>
                      <code style={{ color: "var(--text-muted)" }}>{isDebit ? txn.toAccount : txn.fromAccount}</code>
                    </td>
                    <td style={{ padding: "1.25rem 1.5rem" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: "600", padding: "0.25rem 0.75rem", borderRadius: "1rem", background: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}>
                        {txn.status}
                      </span>
                    </td>
                    <td style={{ padding: "1.25rem 1.5rem", textAlign: "right", fontWeight: "700", color: isDebit ? "#ef4444" : "#10b981", fontSize: "1.125rem" }}>
                      {isDebit ? "-" : "+"}${txn.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </motion.tr>
                );
              }) : (
                <tr>
                  <td colSpan="4" style={{ padding: "4rem", textAlign: "center", color: "var(--text-muted)" }}>
                    <History size={48} style={{ opacity: 0.2, marginBottom: "1rem" }} />
                    <p>No transaction history found for this account.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
