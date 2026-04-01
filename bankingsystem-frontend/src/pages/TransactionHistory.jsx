import { useEffect, useState } from "react";
import API from "../services/api";

export default function TransactionHistory() {

  const [data,setData] = useState([]);

  useEffect(() => {
    API.get("/transactions/history")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Transaction History</h2>
      {data.map((t,i)=>(
        <div key={i}>
          <p>{t.fromAccount} → {t.toAccount} : ₹{t.amount}</p>
        </div>
      ))}
    </div>
  );
}
