import { useState } from "react";
import API from "../services/api";

export default function Transfer() {

  const [fromAccount,setFrom] = useState("");
  const [toAccount,setTo] = useState("");
  const [amount,setAmount] = useState("");

  const transferMoney = async () => {
    try {
      const res = await API.post("/transactions/transfer", {
        fromAccount,
        toAccount,
        amount
      });

      alert("Transfer Success");
    } catch (err) {
      alert("Transfer Failed");
    }
  };

  return (
    <div>
      <h2>Transfer Money</h2>
      <input placeholder="From Account" onChange={e=>setFrom(e.target.value)} />
      <input placeholder="To Account" onChange={e=>setTo(e.target.value)} />
      <input placeholder="Amount" onChange={e=>setAmount(e.target.value)} />
      <button onClick={transferMoney}>Send</button>
    </div>
  );
}