import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Transfer from "./pages/Transfer";
import TransactionHistory from "./pages/TransactionHistory";

function App() {
  return (
    <div>
      <Login />
      <Register />
      <Dashboard />
      <Transfer />
      <TransactionHistory />
    </div>
  );
}

export default App;