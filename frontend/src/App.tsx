import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./components/admin/SideBar";
import Dashboard from "./components/admin/Dashboard";
import Transaction from "./components/admin/Transaction";
import Inventory from "./components/admin/Inventory";
import User from "./components/admin/User";
import Report from "./components/admin/Report";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <SideBar />

        {/* Main content area */}
        <div className="content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cashier" element={<Transaction />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/user" element={<User />} />
            <Route path="/report" element={<Report />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
